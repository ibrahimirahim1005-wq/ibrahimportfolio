import React, { useEffect, useRef } from 'react';
import './GlowCursor.css';

export interface GlowCursorProps {
  color?: string;
  secondaryColor?: string;
  intensity?: number;
  trailWidth?: number;
  linger?: number;
  glow?: number;
  hotspot?: number;
  followSpeed?: number;
  clickBurst?: boolean;
  quality?: 'low' | 'medium' | 'high';
  theme?: 'dark' | 'light';
  className?: string;
}

export const GlowCursor: React.FC<GlowCursorProps> = ({
  color = '#22d3ee',
  secondaryColor = '#0891b2',
  intensity = 1.3,
  trailWidth = 3,
  linger = 1.4,
  glow = 1.2,
  hotspot = 0.8,
  followSpeed = 0.6,
  clickBurst = true,
  quality = 'medium',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect WebGL2 support
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    });

    // Fallback gracefully if WebGL2 is not supported
    if (!gl) {
      // 2D Canvas Fallback
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let animId: number;
      let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
      let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

      const trail: { x: number; y: number; age: number; maxAge: number; size: number }[] = [];
      let mouse = { x: width / 2, y: height / 2 };
      let current = { x: width / 2, y: height / 2 };

      const onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      };

      const onClick = (e: MouseEvent) => {
        if (!clickBurst) return;
        const rect = canvas.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        for (let i = 0; i < 18; i++) {
          const angle = (Math.PI * 2 * i) / 18;
          const dist = Math.random() * 25 + 10;
          trail.push({
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * dist,
            age: 0,
            maxAge: linger * 40,
            size: trailWidth * 2.5 * hotspot,
          });
        }
      };

      window.addEventListener('mousemove', onMouseMove, { passive: true });
      if (clickBurst) window.addEventListener('click', onClick, { passive: true });

      const render2d = () => {
        ctx.clearRect(0, 0, width, height);

        current.x += (mouse.x - current.x) * followSpeed;
        current.y += (mouse.y - current.y) * followSpeed;

        trail.push({
          x: current.x,
          y: current.y,
          age: 0,
          maxAge: Math.max(15, linger * 50),
          size: trailWidth * 4,
        });

        for (let i = trail.length - 1; i >= 0; i--) {
          const pt = trail[i];
          pt.age++;
          if (pt.age >= pt.maxAge) {
            trail.splice(i, 1);
            continue;
          }

          const life = 1 - pt.age / pt.maxAge;
          const radius = pt.size * life * (1 + glow * 0.4);

          const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, Math.max(1, radius));
          grad.addColorStop(0, color);
          grad.addColorStop(0.4, secondaryColor);
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.globalAlpha = life * intensity * 0.6;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(1, radius), 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
        animId = requestAnimationFrame(render2d);
      };

      render2d();

      const onResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      };
      window.addEventListener('resize', onResize);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onMouseMove);
        if (clickBurst) window.removeEventListener('click', onClick);
        window.removeEventListener('resize', onResize);
      };
    }

    // --- WebGL2 Implementation ---
    let animId: number;
    let width = 0;
    let height = 0;

    const scaleFactor = quality === 'low' ? 0.5 : quality === 'high' ? 1.0 : 0.75;

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * scaleFactor);
      canvas.height = Math.floor(height * scaleFactor);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();

    // Parse Hex colors to normalized RGB [0..1]
    const hexToRgb = (hex: string): [number, number, number] => {
      let c = hex.replace('#', '');
      if (c.length === 3) c = c.split('').map((x) => x + x).join('');
      const num = parseInt(c, 16);
      return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
    };

    const primRgb = hexToRgb(color);
    const secRgb = hexToRgb(secondaryColor);

    // Particle / Trail Buffer
    const MAX_POINTS = 300;
    const pointData = new Float32Array(MAX_POINTS * 4); // x, y, life, size
    let pointCount = 0;

    let targetX = width * 0.5;
    let targetY = height * 0.5;
    let curX = targetX;
    let curY = targetY;

    // Vertex Shader
    const vsSource = `#version 300 es
      precision highp float;
      layout(location = 0) in vec4 a_point; // x, y, life, size
      uniform vec2 u_resolution;
      out float v_life;
      out float v_size;

      void main() {
        v_life = a_point.z;
        v_size = a_point.w;
        vec2 clipSpace = (a_point.xy / u_resolution) * 2.0 - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);
        gl_PointSize = a_point.w;
      }
    `;

    // Fragment Shader
    const fsSource = `#version 300 es
      precision highp float;
      in float v_life;
      in float v_size;
      uniform vec3 u_color;
      uniform vec3 u_secColor;
      uniform float u_intensity;
      uniform float u_hotspot;
      uniform float u_glow;
      out vec4 outColor;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord) * 2.0;
        if (dist > 1.0) discard;

        float alpha = (1.0 - smoothstep(0.0, 1.0, dist)) * v_life;
        float core = exp(-dist * (6.0 - u_hotspot * 3.5));
        float glowFactor = exp(-dist * 2.0) * u_glow;

        vec3 mixedCol = mix(u_secColor, u_color, smoothstep(0.0, 0.6, v_life));
        vec3 finalCol = mix(mixedCol, vec3(1.0), core * u_hotspot);

        outColor = vec4(finalCol * u_intensity, (core + glowFactor) * alpha * u_intensity);
      }
    `;

    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const uResLoc = gl.getUniformLocation(program, 'u_resolution');
    const uColLoc = gl.getUniformLocation(program, 'u_color');
    const uSecColLoc = gl.getUniformLocation(program, 'u_secColor');
    const uIntLoc = gl.getUniformLocation(program, 'u_intensity');
    const uHotLoc = gl.getUniformLocation(program, 'u_hotspot');
    const uGlowLoc = gl.getUniformLocation(program, 'u_glow');

    gl.uniform3fv(uColLoc, primRgb);
    gl.uniform3fv(uSecColLoc, secRgb);
    gl.uniform1f(uIntLoc, intensity);
    gl.uniform1f(uHotLoc, hotspot);
    gl.uniform1f(uGlowLoc, glow);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, pointData.byteLength, gl.DYNAMIC_DRAW);

    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // Additive blending for glow effect

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const onClick = (e: MouseEvent) => {
      if (!clickBurst) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const burstSize = trailWidth * 12;
      for (let i = 0; i < 20; i++) {
        if (pointCount < MAX_POINTS) {
          const angle = Math.random() * Math.PI * 2;
          const rad = Math.random() * 30 + 5;
          const idx = pointCount * 4;
          pointData[idx] = cx + Math.cos(angle) * rad;
          pointData[idx + 1] = cy + Math.sin(angle) * rad;
          pointData[idx + 2] = 1.0; // life
          pointData[idx + 3] = burstSize * (Math.random() * 0.6 + 0.4);
          pointCount++;
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    if (clickBurst) window.addEventListener('click', onClick, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Follow cursor with smoothing
      curX += (targetX - curX) * followSpeed;
      curY += (targetY - curY) * followSpeed;

      // Emit new point
      if (pointCount < MAX_POINTS) {
        const idx = pointCount * 4;
        pointData[idx] = curX;
        pointData[idx + 1] = curY;
        pointData[idx + 2] = 1.0; // full life
        pointData[idx + 3] = trailWidth * 14 * (quality === 'high' ? 1.2 : 1.0);
        pointCount++;
      }

      // Age points
      const decay = dt / Math.max(0.2, linger);
      let aliveCount = 0;
      for (let i = 0; i < pointCount; i++) {
        const idx = i * 4;
        const newLife = pointData[idx + 2] - decay;
        if (newLife > 0.0) {
          const targetIdx = aliveCount * 4;
          pointData[targetIdx] = pointData[idx];
          pointData[targetIdx + 1] = pointData[idx + 1];
          pointData[targetIdx + 2] = newLife;
          pointData[targetIdx + 3] = pointData[idx + 3];
          aliveCount++;
        }
      }
      pointCount = aliveCount;

      // Draw
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform2f(uResLoc, width, height);

      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, pointData.subarray(0, pointCount * 4));

      gl.bindVertexArray(vao);
      gl.drawArrays(gl.POINTS, 0, pointCount);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      if (clickBurst) window.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
    };
  }, [
    color,
    secondaryColor,
    intensity,
    trailWidth,
    linger,
    glow,
    hotspot,
    followSpeed,
    clickBurst,
    quality,
  ]);

  return (
    <div className={`glow-cursor-container ${className}`}>
      <canvas ref={canvasRef} className="glow-cursor-canvas" />
    </div>
  );
};

export default GlowCursor;
