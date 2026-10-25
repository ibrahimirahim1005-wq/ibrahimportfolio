import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Compass,
  Eye,
  Activity,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// Pre-allocated reusable vectors for zero-GC render loop
const _vec3 = new THREE.Vector3();
const _targetPos = new THREE.Vector3();
const _euler = new THREE.Euler();

interface ThreeCanvasProps {
  className?: string;
  activeSection?: string;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ className, activeSection }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [modelMode, setModelMode] = useState<'core' | 'football' | 'galaxy'>('core');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [particlesActive, setParticlesActive] = useState<boolean>(true);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState<number>(1);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);

  // References to keep across renders without reinitializing WebGL
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectsGroupRef = useRef<THREE.Group | null>(null);
  const cyberCoreRef = useRef<THREE.Group | null>(null);
  const footballGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const materialsRef = useRef<THREE.Material[]>([]);

  // Mouse tracking
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  // Camera presets
  const handleCameraPreset = (preset: 'front' | 'isometric' | 'top') => {
    if (!cameraRef.current) return;
    if (preset === 'front') {
      _targetPos.set(0, 0, 7.5);
    } else if (preset === 'isometric') {
      _targetPos.set(4.5, 3.5, 6);
    } else if (preset === 'top') {
      _targetPos.set(0, 7, 3);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x020617, 0.05);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);
    _targetPos.copy(camera.position);
    cameraRef.current = camera;

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (Cyan-500 Key Light, Cyan-400 Rim, Light Blue Fill)
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x06b6d4, 3.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    fillLight.position.set(-6, -3, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x22d3ee, 3.5);
    rimLight.position.set(0, -6, 5);
    scene.add(rimLight);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    objectsGroupRef.current = rootGroup;

    // Track materials for wireframe toggling & disposal
    const trackMaterial = <T extends THREE.Material>(mat: T): T => {
      materialsRef.current.push(mat);
      return mat;
    };

    // ==========================================
    // 5. SUBJECT 1: CYBER DEVELOPER CORE (3-12 parts)
    // ==========================================
    const cyberCore = new THREE.Group();
    cyberCoreRef.current = cyberCore;
    rootGroup.add(cyberCore);

    // Part 1: Central Quantum Nucleus (Icosahedron with high refraction)
    const nucleusGeo = new THREE.IcosahedronGeometry(1.0, 1);
    const nucleusMat = trackMaterial(
      new THREE.MeshPhysicalMaterial({
        color: 0x00f0ff,
        emissive: 0x004488,
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: false,
      })
    );
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    cyberCore.add(nucleusMesh);

    // Part 2: Inner Wireframe Cage
    const innerCageGeo = new THREE.IcosahedronGeometry(1.25, 2);
    const innerCageMat = trackMaterial(
      new THREE.MeshStandardMaterial({
        color: 0x9333ea,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        roughness: 0.3,
      })
    );
    const innerCageMesh = new THREE.Mesh(innerCageGeo, innerCageMat);
    cyberCore.add(innerCageMesh);

    // Part 3: Inner Torus Gimbal (Cyan metallic)
    const torusInnerGeo = new THREE.TorusGeometry(1.7, 0.04, 16, 100);
    const torusInnerMat = trackMaterial(
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.9,
        roughness: 0.2,
      })
    );
    const torusInner = new THREE.Mesh(torusInnerGeo, torusInnerMat);
    torusInner.rotation.x = Math.PI / 4;
    cyberCore.add(torusInner);

    // Part 4: Mid Torus Gimbal (Purple metallic)
    const torusMidGeo = new THREE.TorusGeometry(2.1, 0.05, 16, 100);
    const torusMidMat = trackMaterial(
      new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        metalness: 0.85,
        roughness: 0.25,
      })
    );
    const torusMid = new THREE.Mesh(torusMidGeo, torusMidMat);
    torusMid.rotation.y = Math.PI / 3;
    cyberCore.add(torusMid);

    // Part 5: Outer Celestial Ring (Segmented)
    const torusOuterGeo = new THREE.TorusGeometry(2.5, 0.03, 16, 100);
    const torusOuterMat = trackMaterial(
      new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        metalness: 0.95,
        roughness: 0.15,
      })
    );
    const torusOuter = new THREE.Mesh(torusOuterGeo, torusOuterMat);
    torusOuter.rotation.x = Math.PI / 2;
    cyberCore.add(torusOuter);

    // Part 6-8: Orbital Satellites / Data Nodes
    const satelliteGroup = new THREE.Group();
    cyberCore.add(satelliteGroup);
    const satGeo = new THREE.OctahedronGeometry(0.18, 0);
    const satMat = trackMaterial(
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
      })
    );
    for (let i = 0; i < 4; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / 4) * Math.PI * 2;
      sat.position.set(Math.cos(angle) * 2.1, Math.sin(angle) * 2.1, 0);
      satelliteGroup.add(sat);
    }

    // Part 9: Top & Bottom Cyber Brackets
    const bracketGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.8, 16);
    const bracketMat = trackMaterial(
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.9,
        roughness: 0.3,
      })
    );
    const bracket = new THREE.Mesh(bracketGeo, bracketMat);
    cyberCore.add(bracket);

    // ==========================================
    // 6. SUBJECT 2: 3D CYBER FOOTBALL (Football Zone tribute)
    // ==========================================
    const footballGroup = new THREE.Group();
    footballGroupRef.current = footballGroup;
    footballGroup.visible = false;
    rootGroup.add(footballGroup);

    // Main Geodesic Polyhedron (Soccer ball structure)
    const ballGeo = new THREE.IcosahedronGeometry(1.8, 2);
    const ballMat = trackMaterial(
      new THREE.MeshStandardMaterial({
        color: 0x090d16,
        roughness: 0.35,
        metalness: 0.85,
        flatShading: true,
      })
    );
    const ballMesh = new THREE.Mesh(ballGeo, ballMat);
    footballGroup.add(ballMesh);

    // Glowing Holographic Seams (Ballon d'Or Cyan/Gold accent)
    const seamsGeo = new THREE.IcosahedronGeometry(1.82, 2);
    const seamsMat = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      })
    );
    const seamsMesh = new THREE.Mesh(seamsGeo, seamsMat);
    footballGroup.add(seamsMesh);

    // Equatorial Analytics Halo Ring
    const haloGeo = new THREE.TorusGeometry(2.4, 0.03, 16, 120);
    const haloMat = trackMaterial(
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0x6b21a8,
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.1,
      })
    );
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2.3;
    footballGroup.add(haloMesh);

    // Second Analytic Ring
    const haloGeo2 = new THREE.TorusGeometry(2.7, 0.02, 16, 120);
    const haloMat2 = trackMaterial(
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.9,
        roughness: 0.2,
      })
    );
    const haloMesh2 = new THREE.Mesh(haloGeo2, haloMat2);
    haloMesh2.rotation.y = Math.PI / 2.5;
    footballGroup.add(haloMesh2);

    // ==========================================
    // 7. SUBTLE NEON PARTICLES / STARFIELD
    // ==========================================
    const particleCount = 700;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const colorCyan = new THREE.Color(0x06b6d4);
    const colorWhite = new THREE.Color(0xffffff);
    const colorCyanLight = new THREE.Color(0x22d3ee);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 18;

      const mixedColor =
        Math.random() > 0.6 ? colorCyan : Math.random() > 0.3 ? colorCyanLight : colorWhite;
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = trackMaterial(
      new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      })
    );
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    particlesRef.current = particleSystem;

    // Contact Grounding Shadow
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowMat = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      })
    );
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.8;
    scene.add(shadowMesh);

    // Pre-warm renderer shaders
    renderer.compile(scene, camera);

    // 8. Event Listeners
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseRef.current.targetX = (clientX / rect.width) * 2 - 1;
      mouseRef.current.targetY = -(clientY / rect.height) * 2 + 1;
    };

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 9. Render Loop with Exponential Damping & Clock
    const clock = new THREE.Clock();
    let animFrameId: number;

    const tick = () => {
      animFrameId = requestAnimationFrame(tick);
      if (document.hidden) return;
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Exponential damping on mouse coordinates
      mouseRef.current.x = THREE.MathUtils.damp(
        mouseRef.current.x,
        mouseRef.current.targetX,
        4.0,
        delta
      );
      mouseRef.current.y = THREE.MathUtils.damp(
        mouseRef.current.y,
        mouseRef.current.targetY,
        4.0,
        delta
      );

      // Camera position damping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetPos.x, 3.0, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetPos.y, 3.0, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetPos.z, 3.0, delta);

      // Subtle parallax camera tilt
      camera.lookAt(0, 0, 0);
      camera.position.x += mouseRef.current.x * 0.4 * delta;
      camera.position.y += mouseRef.current.y * 0.3 * delta;

      // Animate Cyber Core
      if (cyberCore.visible) {
        cyberCore.rotation.y += 0.4 * delta * autoRotateSpeed;
        innerCageMesh.rotation.x -= 0.6 * delta * autoRotateSpeed;
        innerCageMesh.rotation.y += 0.5 * delta * autoRotateSpeed;
        torusInner.rotation.z += 0.7 * delta * autoRotateSpeed;
        torusMid.rotation.x += 0.5 * delta * autoRotateSpeed;
        torusOuter.rotation.y += 0.3 * delta * autoRotateSpeed;
        satelliteGroup.rotation.z += 0.6 * delta * autoRotateSpeed;
        // Subtle levitation
        cyberCore.position.y = Math.sin(elapsedTime * 1.5) * 0.12;
      }

      // Animate Football Zone
      if (footballGroup.visible) {
        footballGroup.rotation.y += 0.5 * delta * autoRotateSpeed;
        footballGroup.rotation.x += 0.25 * delta * autoRotateSpeed;
        haloMesh.rotation.z += 0.6 * delta * autoRotateSpeed;
        haloMesh2.rotation.z -= 0.4 * delta * autoRotateSpeed;
        footballGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.15;
      }

      // Animate Particles
      if (particleSystem.visible) {
        particleSystem.rotation.y += 0.05 * delta;
        particleSystem.rotation.x += 0.02 * delta;
      }

      renderer.render(scene, camera);
    };

    tick();

    // 10. Clean-up
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Geometries & Materials
      nucleusGeo.dispose();
      innerCageGeo.dispose();
      torusInnerGeo.dispose();
      torusMidGeo.dispose();
      torusOuterGeo.dispose();
      satGeo.dispose();
      bracketGeo.dispose();
      ballGeo.dispose();
      seamsGeo.dispose();
      haloGeo.dispose();
      haloGeo2.dispose();
      particleGeo.dispose();
      shadowGeo.dispose();

      materialsRef.current.forEach((m) => m.dispose());
      materialsRef.current = [];

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Model Visibility based on state
  useEffect(() => {
    if (!cyberCoreRef.current || !footballGroupRef.current) return;
    if (modelMode === 'core') {
      cyberCoreRef.current.visible = true;
      footballGroupRef.current.visible = false;
    } else if (modelMode === 'football') {
      cyberCoreRef.current.visible = false;
      footballGroupRef.current.visible = true;
    } else if (modelMode === 'galaxy') {
      cyberCoreRef.current.visible = false;
      footballGroupRef.current.visible = false;
    }
  }, [modelMode]);

  // Toggle wireframe on materials
  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      if ('wireframe' in mat) {
        (mat as THREE.MeshStandardMaterial).wireframe = wireframe;
      }
    });
  }, [wireframe]);

  // Toggle particles
  useEffect(() => {
    if (particlesRef.current) {
      particlesRef.current.visible = particlesActive;
    }
  }, [particlesActive]);

  // Automatically switch model if section changes to work/projects
  useEffect(() => {
    if (activeSection === 'work' || activeSection === 'projects') {
      setModelMode('football');
    } else if (activeSection === 'home' || activeSection === 'about') {
      setModelMode('core');
    }
  }, [activeSection]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className || ''}`}>
      {/* Isolated WebGL Mount Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Ambient Backdrop Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Sleek Ergonomic Collapsible Bottom Dock (SKILL standard) */}
      <div
        className={`fixed z-30 transition-all duration-300 pointer-events-auto left-1/2 -translate-x-1/2 ${
          isDockCollapsed ? 'bottom-2' : 'bottom-5'
        } max-w-[94vw] w-auto`}
      >
        <div className="relative flex flex-col items-center">
          {/* Collapse/Expand Toggle Button */}
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono tracking-wider uppercase text-cyan-400 bg-[#0f172a] border border-[#1e293b] hover:border-cyan-400 transition-colors shadow-lg cursor-pointer"
            title="Toggle 3D Viewport Dock"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>3D Engine Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                <span>Hide Controls</span>
              </>
            )}
          </button>

          {/* Unified Controls Dock */}
          {!isDockCollapsed && (
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-[#0f172a] border border-[#1e293b] shadow-2xl">
              {/* 3D Mode Selector */}
              <div className="flex items-center bg-[#020617] p-1 border border-[#1e293b]">
                <button
                  onClick={() => setModelMode('core')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
                    modelMode === 'core'
                      ? 'bg-[#06b6d4] text-slate-950 shadow-[0_0_10px_#06b6d4]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Quantum Dev Core"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Dev Core</span>
                </button>

                <button
                  onClick={() => setModelMode('football')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
                    modelMode === 'football'
                      ? 'bg-[#06b6d4] text-slate-950 shadow-[0_0_10px_#06b6d4]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Football Zone 3D"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Football Zone</span>
                </button>

                <button
                  onClick={() => setModelMode('galaxy')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
                    modelMode === 'galaxy'
                      ? 'bg-[#06b6d4] text-slate-950 shadow-[0_0_10px_#06b6d4]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Particle Nebula"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Nebula</span>
                </button>
              </div>

              {/* Camera Presets */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-900/80 rounded-lg p-1 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-500 px-1">CAM:</span>
                <button
                  onClick={() => handleCameraPreset('front')}
                  className="px-2 py-1 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Front
                </button>
                <button
                  onClick={() => handleCameraPreset('isometric')}
                  className="px-2 py-1 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Iso
                </button>
                <button
                  onClick={() => handleCameraPreset('top')}
                  className="px-2 py-1 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Top
                </button>
              </div>

              {/* Toggles: Wireframe & Particles */}
              <div className="flex items-center gap-1 bg-slate-900/80 rounded-lg p-1 border border-slate-800">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`px-2 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                    wireframe
                      ? 'bg-cyan-500/30 text-cyan-300'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Toggle wireframe rendering"
                >
                  Wireframe
                </button>
                <button
                  onClick={() => setParticlesActive(!particlesActive)}
                  className={`px-2 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                    particlesActive
                      ? 'bg-purple-500/30 text-purple-300'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Toggle floating particles"
                >
                  Particles
                </button>
              </div>

              {/* Rotation Speed Multiplier */}
              <button
                onClick={() => setAutoRotateSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1))}
                className="hidden md:flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-slate-400 hover:text-cyan-300 bg-slate-900/80 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Toggle rotation speed"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>{autoRotateSpeed}x Speed</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
