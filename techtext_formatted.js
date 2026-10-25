import { r as et, j as ee } from "./preload-helper-gVl0bFl0.js";
const oe = "10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  ne = 8,
  Ct = 320,
  Ie = /^(currentcolor|inherit)$/i,
  We = 0.15,
  je = 0.62,
  O = (E, S, U, J) => E + (S - E) * (1 - Math.exp(-U / J)),
  ct = (E) => Math.min(1, Math.max(0, Number(E) || 0)),
  ot = (E, S, U) => {
    const J = ct((U - E) / (S - E));
    return J * J * (3 - 2 * J);
  },
  Y = (...E) => {
    let S = 2166136261;
    for (const U of E)
      ((S = Math.imul(S ^ (U | 0), 16777619)),
        (S ^= S >>> 13),
        (S = Math.imul(S, 1540483477)),
        (S ^= S >>> 15));
    return (S >>> 0) / 4294967296;
  },
  se = (E) => (E > 0 ? `+${E}` : E < 0 ? `−${-E}` : "0"),
  Ye = ({
    text: E = "React Bits",
    fontFamily: S = "",
    fontWeight: U = 600,
    fontSize: J = 150,
    letterSpacing: ae = -0.05,
    color: ie = "currentColor",
    accentColor: re = "currentColor",
    align: ce = "center",
    reach: le = 200,
    softness: fe = 0.7,
    dashLength: de = 4,
    dashGap: ue = 2,
    strokeWidth: xe = 1.5,
    lineStyle: he = "dashed",
    reveal: me = "letter",
    specks: pe = 15,
    selection: be = !0,
    labels: ge = !0,
    draggable: ye = !0,
    bounce: Me = 0.4,
    sweep: ve = !0,
    speed: Be = 1,
    clickKick: Ae = !0,
    intro: we = "none",
    introDuration: ke = 2,
    guides: Re = !1,
    className: Ce = "",
    style: Ee,
  }) => {
    const Et = et.useRef(null),
      Lt = et.useRef(null),
      lt = et.useRef(null),
      nt = et.useRef(() => {});
    return (
      et.useEffect(() => {
        ((lt.current = {
          text: E,
          fontFamily: S,
          fontWeight: U,
          fontSize: J,
          letterSpacing: ae,
          color: ie,
          accentColor: re,
          align: ce,
          reach: le,
          softness: fe,
          dashLength: de,
          dashGap: ue,
          strokeWidth: xe,
          lineStyle: he,
          reveal: me,
          specks: pe,
          selection: be,
          labels: ge,
          draggable: ye,
          bounce: Me,
          sweep: ve,
          speed: Be,
          clickKick: Ae,
          intro: we,
          introDuration: ke,
          guides: Re,
        }),
          nt.current());
      }),
      et.useEffect(() => {
        var Vt, Zt, Qt, te;
        const g = Et.current,
          D = Lt.current,
          n = D == null ? void 0 : D.getContext("2d"),
          H = document.createElement("canvas"),
          F = H.getContext("2d");
        if (!g || !D || !n || !F) return;
        const bt =
          (Zt =
            (Vt = window.matchMedia) == null
              ? void 0
              : Vt.call(window, "(prefers-reduced-motion: reduce)")) == null
            ? void 0
            : Zt.matches;
        let K = 1,
          st = 1,
          b = 1,
          at = 0,
          gt = performance.now(),
          yt = !1,
          Mt = !0,
          ft = "",
          St = "",
          X = null,
          A = [],
          V = 0,
          vt = 0,
          Q = 0,
          Tt = !1,
          T = -1,
          zt = "",
          Bt = 0,
          q = "",
          z = !1,
          Ot = !document.fonts,
          tt = 0;
        const G = [],
          P = { x: 0, y: 0, time: 0, index: -1 },
          k = { x: 0, y: 0, inside: !1 },
          dt = { x: 0, y: 0 },
          I = { x: 0, y: 0 },
          d = { x1: 0, y1: 0, x2: 0, y2: 0, alpha: 0, index: -1 },
          At = () => {
            ((ft = ""), nt.current());
          },
          Ft = () => {
            ((Ot = !0), At());
          },
          $t = (t) =>
            t.fontFamily || getComputedStyle(g).fontFamily || "sans-serif",
          Dt = (t, o) => `${t.fontWeight} ${o}px ${$t(t)}`,
          Le = (t) => {
            const o = getComputedStyle(g).color || "#000000",
              e = (s) => (!s || Ie.test(String(s).trim()) ? o : s);
            return { ink: e(t.color), accent: e(t.accentColor) };
          },
          wt = (t, o, e) => {
            ((t.font = Dt(o, e)),
              "letterSpacing" in t &&
                (t.letterSpacing = `${o.letterSpacing * e}px`),
              (t.textAlign = "left"),
              (t.textBaseline = "alphabetic"));
          },
          Pt = (t, o, e, s, r) => {
            const a = Math.ceil(t.strokeWidth * 2 + 4),
              u = e.box.x1 - a,
              l = e.box.y1 - a,
              c = e.box.x2 - e.box.x1 + a * 2,
              h = e.box.y2 - e.box.y1 + a * 2,
              x = document.createElement("canvas");
            ((x.width = Math.max(1, Math.ceil(c * b))),
              (x.height = Math.max(1, Math.ceil(h * b))));
            const f = x.getContext("2d");
            return f
              ? (f.setTransform(b, 0, 0, b, -u * b, -l * b),
                wt(f, t, o.size),
                s
                  ? ((f.lineJoin = "round"),
                    (f.lineWidth = t.strokeWidth * 2),
                    (f.lineCap = "butt"),
                    (f.strokeStyle = r),
                    t.lineStyle !== "solid" &&
                      f.setLineDash([
                        Math.max(1, t.dashLength),
                        Math.max(1, t.dashGap),
                      ]),
                    f.strokeText(e.char, e.x, o.baseline),
                    f.setLineDash([]),
                    (f.globalCompositeOperation = "destination-out"),
                    (f.fillStyle = "#000000"),
                    f.fillText(e.char, e.x, o.baseline),
                    (f.globalCompositeOperation = "source-over"))
                  : ((f.fillStyle = r), f.fillText(e.char, e.x, o.baseline)),
                { image: x, left: u, top: l })
              : { image: x, left: u, top: l };
          },
          Se = (t, o) => {
            const e = [
              t.text,
              $t(t),
              t.fontWeight,
              t.fontSize,
              t.letterSpacing,
              t.align,
              o,
              t.dashLength,
              t.dashGap,
              t.strokeWidth,
              t.lineStyle,
              K,
              st,
              b,
            ].join("|");
            if (e === ft && X) return X;
            ft = e;
            const s = Dt(t, 64);
            document.fonts &&
              s !== St &&
              ((St = s), document.fonts.load(s, t.text).then(At, At));
            const r = F;
            wt(r, t, t.fontSize);
            let a = r.measureText(t.text);
            const u = Math.min(
                1,
                (K * 0.9) /
                  Math.max(
                    a.actualBoundingBoxLeft + a.actualBoundingBoxRight,
                    1,
                  ),
                (st * 0.66) /
                  Math.max(
                    a.actualBoundingBoxAscent + a.actualBoundingBoxDescent,
                    1,
                  ),
              ),
              l = t.fontSize * u;
            (wt(r, t, l), (a = r.measureText(t.text)));
            const c = a.actualBoundingBoxLeft + a.actualBoundingBoxRight,
              h = a.actualBoundingBoxAscent + a.actualBoundingBoxDescent,
              x = K * 0.05,
              p =
                (t.align === "left"
                  ? x
                  : t.align === "right"
                    ? K - x - c
                    : (K - c) / 2) + a.actualBoundingBoxLeft,
              m = (st - h) / 2 + a.actualBoundingBoxAscent,
              R = m - r.measureText("x").actualBoundingBoxAscent,
              w = m - r.measureText("H").actualBoundingBoxAscent,
              v = m - r.measureText("d").actualBoundingBoxAscent,
              C = m + r.measureText("p").actualBoundingBoxDescent,
              L = m - a.actualBoundingBoxAscent,
              i = m + a.actualBoundingBoxDescent,
              y = Math.min(L, w) - 2,
              M = Math.max(i, m) + 2,
              B = {
                size: l,
                baseline: m,
                left: p - a.actualBoundingBoxLeft,
                right: p + a.actualBoundingBoxRight,
                top: L,
                bottom: i,
                lines: [
                  { y: m, label: "baseline" },
                  { y: R, label: "x-height" },
                  { y: w, label: "cap height" },
                  ...(w - v > Math.max(11, l * 0.06)
                    ? [{ y: v, label: "ascender" }]
                    : []),
                  { y: C, label: "descender" },
                ],
                bands: [
                  { y0: R, y1: m, up: !0, order: 0 },
                  { y0: w, y1: R, up: !0, order: 1 },
                  { y0: y, y1: w, up: !0, order: 2 },
                  { y0: m, y1: M, up: !1, order: 1 },
                ].filter(($) => $.y1 - $.y0 > 0.5),
              };
            X = B;
            const N = Array.from(t.text),
              _ = A;
            A = [];
            let ht = "";
            return (
              N.forEach(($, mt) => {
                ht += $;
                const rt = r.measureText($),
                  kt = p + r.measureText(ht).width - rt.width;
                if (!$.trim()) return;
                const Rt = {
                    char: $,
                    x: kt,
                    box: {
                      x1: kt - rt.actualBoundingBoxLeft,
                      y1: m - rt.actualBoundingBoxAscent,
                      x2: kt + rt.actualBoundingBoxRight,
                      y2: m + rt.actualBoundingBoxDescent,
                    },
                  },
                  pt = _[A.length];
                A.push({
                  ...Rt,
                  offset:
                    (pt == null ? void 0 : pt.char) === $
                      ? pt.offset
                      : { x: 0, y: 0 },
                  velocity: { x: 0, y: 0 },
                  outline: 0,
                  shown: 1,
                  cells: null,
                  assembled: 0,
                  index: mt,
                  fill: Pt(t, B, Rt, !1, o),
                  dashes: Pt(t, B, Rt, !0, o),
                });
              }),
              (T = -1),
              (d.index = -1),
              B
            );
          },
          It = (t, o) => {
            if (!X || o < X.top - 24 || o > X.bottom + 24) return -1;
            let e = -1,
              s = 1 / 0;
            return (
              A.forEach((r, a) => {
                const u = r.box.x1 + r.offset.x,
                  l = r.box.x2 + r.offset.x,
                  c = t < u ? u - t : t > l ? t - l : 0;
                c < s && ((s = c), (e = a));
              }),
              s < 28 ? e : -1
            );
          },
          Wt = (t, o, e, s, r, a) => {
            const u = Math.min(1, Math.max(0, 1 - a)),
              l = t.createRadialGradient(o, e, 0, o, e, s);
            if ((l.addColorStop(0, `rgba(0, 0, 0, ${r})`), u > 0.995))
              return (
                l.addColorStop(0.995, `rgba(0, 0, 0, ${r})`),
                l.addColorStop(1, "rgba(0, 0, 0, 0)"),
                l
              );
            for (let c = 0; c <= ne; c++) {
              const h = c / ne,
                x = h * h * (3 - 2 * h);
              l.addColorStop(u + (1 - u) * h, `rgba(0, 0, 0, ${r * (1 - x)})`);
            }
            return l;
          },
          Z = (t, o, e, s, r, a) => {
            t.drawImage(
              o.image,
              Math.round((o.left + e) * b - r),
              Math.round((o.top + s) * b - a),
            );
          },
          Te = (t) => {
            const o = t.reach * b,
              e = I.x * b,
              s = I.y * b;
            ((n.globalCompositeOperation = "destination-out"),
              (n.fillStyle = Wt(n, e, s, o, V, t.softness)),
              n.fillRect(e - o, s - o, o * 2, o * 2),
              (n.globalCompositeOperation = "source-over"));
            const r = Math.max(0, Math.floor(e - o)),
              a = Math.max(0, Math.floor(s - o)),
              u = Math.min(D.width, Math.ceil(e + o)),
              l = Math.min(D.height, Math.ceil(s + o));
            if (u <= r || l <= a) return;
            const c = u - r,
              h = l - a;
            ((H.width < c || H.height < h) &&
              ((H.width = Math.max(H.width, c)),
              (H.height = Math.max(H.height, h))),
              F.setTransform(1, 0, 0, 1, 0, 0),
              (F.globalCompositeOperation = "source-over"),
              F.clearRect(0, 0, c, h));
            for (const x of A) Z(F, x.dashes, x.offset.x, x.offset.y, r, a);
            ((F.globalCompositeOperation = "destination-in"),
              (F.fillStyle = Wt(F, e - r, s - a, o, 1, t.softness)),
              F.fillRect(0, 0, c, h),
              (F.globalCompositeOperation = "source-over"),
              (n.globalAlpha = V),
              n.drawImage(H, 0, 0, c, h, r, a, c, h),
              (n.globalAlpha = 1));
          },
          it = (t) => (Math.round(t * b) + 0.5) / b,
          jt = (t, o, e) => {
            let s = ((t % (2 * (o + e))) + 2 * (o + e)) % (2 * (o + e));
            return s < o
              ? [d.x1 + s, d.y1, 0, -1]
              : ((s -= o),
                s < e
                  ? [d.x2, d.y1 + s, 1, 0]
                  : ((s -= e),
                    s < o
                      ? [d.x2 - s, d.y2, 0, 1]
                      : ((s -= o), [d.x1, d.y2 - s, -1, 0])));
          },
          ze = (t, o, e) => {
            const s = d.x2 - d.x1,
              r = d.y2 - d.y1;
            if (s < 2 || r < 2) return;
            const a = 2 * (s + r),
              u = d.index + 1,
              l = 3;
            ((n.fillStyle = e), (n.strokeStyle = e));
            for (let c = 0; c < t.specks; c++) {
              const h = 0.5 + Y(u, c, 11) * 1.2,
                x = Q / h + Y(u, c, 17),
                f = Math.floor(x),
                p = x - f;
              if (p > 0.7) continue;
              const [m, R, w, v] = jt(Y(u, c, f) * a, s, r),
                C = Y(u, c, f, 2),
                L =
                  C < 0.46 ? 2 : C < 0.7 ? 3 : C < 0.84 ? 5 : C < 0.94 ? 8 : 11,
                i = L >= 8,
                y = (i ? 9 : 4) + Math.floor(Y(u, c, f, 1) * 5) * l,
                M = d.x1 + Math.round((m + w * y - d.x1) / l) * l,
                B = d.y1 + Math.round((R + v * y - d.y1) / l) * l,
                N = Y(u, c, f, 3),
                _ = p < 0.06 || (p > 0.32 && p < 0.36) ? 0.35 : 1,
                ht = o * (i ? 0.3 + 0.4 * N : 0.3 + 0.6 * N) * _,
                $ = Math.round(M - L / 2),
                mt = Math.round(B - L / 2);
              ((n.globalAlpha = ht),
                N < 0.26 || (i && N < 0.78)
                  ? (n.strokeRect($ + 0.5, mt + 0.5, L, L),
                    i &&
                      N > 0.5 &&
                      n.fillRect(Math.round(M) - 1, Math.round(B) - 1, 2, 2))
                  : n.fillRect($, mt, L, L));
            }
            for (let c = 0; c < 2; c++) {
              const h = (Q * 0.42 * t.speed + c * 0.5) * a;
              for (let x = 0; x < 4; x++) {
                const [f, p] = jt(h - x * 6, s, r),
                  m = x === 0 ? 3 : 2;
                ((n.globalAlpha = o * [0.95, 0.55, 0.32, 0.16][x]),
                  n.fillRect(
                    Math.round(f - m / 2),
                    Math.round(p - m / 2),
                    m,
                    m,
                  ));
              }
            }
            n.globalAlpha = 1;
          },
          Oe = (t, o) => {
            const e = A[d.index];
            if (!e || d.alpha < 0.01) return;
            const s = d.alpha,
              r = it(d.x1),
              a = it(d.y1),
              u = it(d.x2),
              l = it(d.y2);
            (n.setTransform(b, 0, 0, b, 0, 0),
              (n.fillStyle = o),
              (n.strokeStyle = o),
              (n.lineWidth = 1));
            const c = Math.hypot(e.offset.x, e.offset.y);
            if (c > 1) {
              const x = (e.box.x1 + e.box.x2) / 2,
                f = (e.box.y1 + e.box.y2) / 2;
              (n.beginPath(),
                n.moveTo(x, f),
                n.lineTo(x + e.offset.x, f + e.offset.y),
                n.setLineDash([3, 4]),
                (n.globalAlpha = 0.45 * s),
                n.stroke(),
                n.setLineDash([]),
                n.beginPath(),
                n.rect(Math.round(x) - 2, Math.round(f) - 2, 4, 4),
                (n.globalAlpha = 0.7 * s),
                n.fill());
            }
            (n.beginPath(),
              n.rect(r, a, u - r, l - a),
              (n.globalAlpha = 0.5 * s),
              n.stroke(),
              n.beginPath());
            for (const [x, f] of [
              [r, a],
              [u, a],
              [u, l],
              [r, l],
            ])
              n.rect(Math.round(x) - 2, Math.round(f) - 2, 5, 5);
            if (
              ((n.globalAlpha = 0.95 * s),
              n.fill(),
              (n.globalAlpha = 1),
              t.specks > 0 && ze(t, s, o),
              !t.labels)
            )
              return;
            ((n.font = oe),
              (n.textAlign = "left"),
              (n.textBaseline = "bottom"),
              (n.fillStyle = o),
              (n.globalAlpha = 0.62 * s));
            const h =
              c > 1
                ? `${se(Math.round(e.offset.x))}, ${se(Math.round(-e.offset.y))}`
                : `${e.char}  ${Math.round(e.box.x2 - e.box.x1)} × ${Math.round(e.box.y2 - e.box.y1)}`;
            (n.fillText(h, Math.round(d.x1), Math.round(d.y1) - 7),
              (n.globalAlpha = 1));
          },
          Nt = (t, o, e, s, r) => {
            const a = Math.max(12, o.size * 0.12),
              u = Math.round(o.left - a),
              l = Math.round(o.right + a),
              c = K - l > u;
            (n.setTransform(b, 0, 0, b, 0, 0),
              (n.strokeStyle = e),
              (n.fillStyle = e),
              (n.lineWidth = 1),
              (n.font = oe),
              (n.textBaseline = "middle"),
              (n.textAlign = c ? "left" : "right"),
              o.lines.forEach((h, x) => {
                const f = r(x);
                if (f <= 0.001) return;
                const p = it(h.y),
                  m = u + (l - u) * f;
                ((n.globalAlpha = s * 0.4),
                  n.beginPath(),
                  n.moveTo(u, p),
                  n.lineTo(m, p),
                  n.stroke(),
                  (n.globalAlpha = s * 0.9),
                  n.fillRect(u - 1, Math.round(h.y) - 1, 3, 3),
                  n.fillRect(Math.round(m) - 1, Math.round(h.y) - 1, 3, 3),
                  t.labels &&
                    ((n.globalAlpha = s * 0.62 * ot(0.7, 1, f)),
                    n.fillText(h.label, c ? l + 8 : u - 8, Math.round(h.y))));
              }),
              (n.textAlign = "left"),
              n.setTransform(1, 0, 0, 1, 0, 0),
              (n.globalAlpha = 1));
          },
          Fe = (t, o) => {
            if (t.cells) return t.cells;
            const e = t.fill,
              s = Math.max(3, Math.round(o.size / 26)),
              r = e.image.width,
              a = e.image.height,
              u = e.image.getContext("2d"),
              l = [];
            if (((t.cells = l), (t.assembled = 0), !u || r < 2 || a < 2))
              return l;
            const c = u.getImageData(0, 0, r, a).data,
              h = Math.floor(e.left / s) * s,
              x = Math.floor(e.top / s) * s,
              f = Math.ceil((e.left + r / b - h) / s) + 1,
              p = Math.ceil((e.top + a / b - x) / s) + 1,
              m = new Uint8Array(f * p);
            for (let v = 0; v < a; v++)
              for (let C = 0; C < r; C++) {
                if (c[(v * r + C) * 4 + 3] < 24) continue;
                const L = Math.floor((e.left + C / b - h) / s),
                  i = Math.floor((e.top + v / b - x) / s);
                m[i * f + L] = 1;
              }
            const R = (t.box.x1 + t.box.x2) / 2,
              w = ct((R - o.left) / Math.max(1, o.right - o.left));
            for (let v = 0; v < m.length; v++) {
              if (!m[v]) continue;
              const C = Y(t.index, v, 1) * Math.PI * 2,
                L = o.size * (0.25 + 0.6 * Y(t.index, v, 2)),
                i = 0.03 + 0.36 * w + 0.12 * Y(t.index, v, 3),
                y = i + 0.3 + 0.14 * Y(t.index, v, 4);
              (l.push({
                x: h + (v % f) * s,
                y: x + Math.floor(v / f) * s,
                size: s,
                dx: Math.cos(C) * L,
                dy: Math.sin(C) * L * 0.7,
                start: i,
                land: y,
              }),
                (t.assembled = Math.max(t.assembled, y)));
            }
            return l;
          },
          Yt = (t, o, e) => {
            const s = Math.round(t * b),
              r = Math.round(o * b);
            return [
              s,
              r,
              Math.round((t + e) * b) - s,
              Math.round((o + e) * b) - r,
            ];
          },
          $e = (t, o, e) => {
            const s = t.cells || [];
            (n.save(), n.beginPath());
            let r = 0;
            for (const a of s) {
              if (o < a.land) continue;
              const [u, l, c, h] = Yt(a.x, a.y, a.size);
              (n.rect(u, l, c, h), r++);
            }
            (r && (n.clip(), Z(n, t.fill, 0, 0, 0, 0)),
              n.restore(),
              (n.fillStyle = e));
            for (const a of s) {
              if (o < a.start || o >= a.land) continue;
              const u = (o - a.start) / (a.land - a.start),
                l = 1 - Math.pow(1 - u, 4),
                c = a.size * (0.4 + 0.6 * l),
                h = a.x + (a.size - c) / 2 + a.dx * (1 - l),
                x = a.y + (a.size - c) / 2 + a.dy * (1 - l),
                [f, p, m, R] = Yt(h, x, c);
              ((n.globalAlpha = Math.min(1, u * 4) * (0.55 + 0.45 * l)),
                n.fillRect(f, p, Math.max(1, m), Math.max(1, R)));
            }
            n.globalAlpha = 1;
          },
          De = (t, o, e, s) => {
            const r = t.fill,
              a = Math.floor(r.left * b),
              u = Math.floor(r.top * b),
              l = r.image.width + 2,
              c = r.image.height + 2,
              h = ct((e - 0.24 - 0.28 * o) / 0.48),
              x = [];
            for (const p of s.bands) {
              const m = ot(0.3 * p.order, 0.3 * p.order + 0.4, h);
              if (m <= 0) continue;
              const R = (p.y1 - p.y0) * m,
                w = Math.round((p.up ? p.y1 - R : p.y0) * b),
                v = Math.round((p.up ? p.y1 : p.y0 + R) * b);
              v > w && x.push([w, v - w]);
            }
            const f = ot(0.08 + 0.2 * o, 0.22 + 0.2 * o, e);
            if (f > 0.001) {
              (n.save(), n.beginPath(), n.rect(a - 2, u - 2, l + 2, c + 2));
              for (const [p, m] of x) n.rect(a - 2, p, l + 2, m);
              (n.clip("evenodd"),
                (n.globalAlpha = f),
                Z(n, t.dashes, 0, 0, 0, 0),
                n.restore());
            }
            if (x.length) {
              (n.save(), n.beginPath());
              for (const [p, m] of x) n.rect(a - 2, p, l + 2, m);
              (n.clip(), Z(n, t.fill, 0, 0, 0, 0), n.restore());
            }
            n.globalAlpha = 1;
          },
          Pe = (t) => {
            const o = (X ? X.size : 120) * 11;
            G.push({ index: t, at: Q, velocity: o });
            for (let e = 1; e < A.length; e++) {
              const s = o * Math.pow(je, e);
              if (s < 30) break;
              for (const r of [t - e, t + e])
                r >= 0 &&
                  r < A.length &&
                  G.push({ index: r, at: Q + e * 0.055, velocity: s });
            }
            nt.current();
          },
          Ht = (t) => {
            at = 0;
            const o = lt.current;
            if (!o) return;
            const e = Math.min(0.05, Math.max(0.001, (t - gt) / 1e3));
            gt = t;
            const { ink: s, accent: r } = Le(o),
              a = Se(o, s),
              u = 2 * Math.sqrt(Ct) * (1 - ct(o.bounce) * 0.96);
            o.intro !== q && ((q = o.intro), (Bt = 0));
            const l = q !== "none" && !bt && A.length > 0;
            l && Ot && (Bt += e);
            const c = l ? ct((Bt - We) / Math.max(0.3, o.introDuration)) : 1;
            z = l && c < 1;
            const h = !z && o.sweep && !bt && !k.inside && T < 0;
            (h && (vt += e * o.speed), (Q += e));
            let x = k.x,
              f = k.y;
            h &&
              ((x =
                a.left +
                (a.right - a.left) * (0.5 - 0.5 * Math.cos(vt * 0.45))),
              (f =
                a.top +
                (a.bottom - a.top) * (0.45 + 0.1 * Math.sin(vt * 0.8))));
            const p = !z && (k.inside || h || T >= 0);
            if ((p && !Tt && ((I.x = x), (I.y = f)), p)) {
              const i = k.inside ? 0.05 : 0.22;
              ((I.x = O(I.x, x, e, i)), (I.y = O(I.y, f, e, i)));
            }
            ((Tt = p),
              (V = O(V, o.reveal === "area" && p && T < 0 ? 1 : 0, e, 0.16)));
            for (let i = G.length - 1; i >= 0; i--) {
              if (G[i].at > Q) continue;
              const y = A[G[i].index];
              (y && (y.velocity.y -= G[i].velocity), G.splice(i, 1));
            }
            let m = !1;
            A.forEach((i, y) => {
              if (y === T) {
                ((i.offset.x = O(i.offset.x, k.x - dt.x, e, 0.03)),
                  (i.offset.y = O(i.offset.y, k.y - dt.y, e, 0.03)),
                  (i.velocity.x = 0),
                  (i.velocity.y = 0),
                  (m = !0));
                return;
              }
              const { offset: M, velocity: B } = i;
              if (
                Math.abs(M.x) < 0.05 &&
                Math.abs(M.y) < 0.05 &&
                Math.hypot(B.x, B.y) < 0.5
              ) {
                ((M.x = 0), (M.y = 0), (B.x = 0), (B.y = 0));
                return;
              }
              ((B.x += (-Ct * M.x - u * B.x) * e),
                (B.y += (-Ct * M.y - u * B.y) * e),
                (M.x += B.x * e),
                (M.y += B.y * e),
                (m = !0));
            });
            let R = -1;
            if (z && q === "type") {
              const i = 0.86 / A.length,
                y = Math.min(A.length - 1, Math.floor(c / i));
              ((R = c < 0.93 ? y : -1),
                A.forEach((M, B) => {
                  M.shown = B < y ? 1 : B === y ? ot(0, i * 0.3, c - B * i) : 0;
                }));
            } else
              A.forEach((i) => {
                i.shown = 1;
              });
            const w = z ? R : T >= 0 ? T : p ? It(I.x, I.y) : -1;
            if (w >= 0 && o.selection) {
              const i = A[w],
                y = i.box.x1 + i.offset.x - 6,
                M = i.box.y1 + i.offset.y - 6,
                B = i.box.x2 + i.offset.x + 6,
                N = i.box.y2 + i.offset.y + 6;
              (d.index < 0 || d.alpha < 0.02) &&
                ((d.x1 = y), (d.y1 = M), (d.x2 = B), (d.y2 = N));
              const _ = w === T ? 0.02 : 0.08;
              ((d.x1 = O(d.x1, y, e, _)),
                (d.y1 = O(d.y1, M, e, _)),
                (d.x2 = O(d.x2, B, e, _)),
                (d.y2 = O(d.y2, N, e, _)),
                (d.index = w));
            }
            ((d.alpha = O(d.alpha, w >= 0 && o.selection ? 1 : 0, e, 0.1)),
              A.forEach((i, y) => {
                const M = z
                  ? q === "type" && (y === R || (R >= 0 && y > R))
                    ? 1
                    : 0
                  : o.reveal === "letter" && y === w && y !== T
                    ? 1
                    : 0;
                (z && i.shown === 0 && (i.outline = M),
                  (i.outline = O(i.outline, M, e, 0.09)),
                  Math.abs(i.outline - M) > 0.002 ? (m = !0) : (i.outline = M));
              }),
              (tt = O(
                tt,
                o.guides && !z && (w >= 0 || V > 0.4) ? 1 : 0,
                e,
                0.14,
              )));
            const v = !z && w >= 0 && k.inside,
              C =
                T >= 0
                  ? "grabbing"
                  : v && o.draggable
                    ? "grab"
                    : v && o.clickKick
                      ? "pointer"
                      : "";
            (C !== zt && ((zt = C), (g.style.cursor = C)),
              n.setTransform(1, 0, 0, 1, 0, 0),
              (n.globalCompositeOperation = "source-over"),
              (n.globalAlpha = 1),
              n.clearRect(0, 0, D.width, D.height));
            for (const i of A) {
              const y = Math.hypot(i.offset.x, i.offset.y);
              y > 1 &&
                ((n.globalAlpha = Math.min(1, y / 24) * 0.55),
                Z(n, i.dashes, 0, 0, 0, 0),
                (n.globalAlpha = 1));
            }
            (z && q === "metrics"
              ? Nt(o, a, r, 1 - ot(0.84, 1, c), (i) =>
                  ot(0.02 + 0.04 * i, 0.2 + 0.04 * i, c),
                )
              : tt > 0.005 && Nt(o, a, r, tt * 0.6, () => 1),
              A.forEach((i, y) => {
                if (z && q === "assemble" && (Fe(i, a), c < i.assembled)) {
                  $e(i, c, r);
                  return;
                }
                if (z && q === "metrics") {
                  const M = A.length > 1 ? y / (A.length - 1) : 0;
                  if (c < 0.72 + 0.28 * M) {
                    De(i, M, c, a);
                    return;
                  }
                }
                i.shown < 0.001 ||
                  (i.outline < 0.999 &&
                    ((n.globalAlpha = (1 - i.outline) * i.shown),
                    Z(n, i.fill, i.offset.x, i.offset.y, 0, 0)),
                  i.outline > 0.001 &&
                    ((n.globalAlpha = i.outline * i.shown),
                    Z(n, i.dashes, i.offset.x, i.offset.y, 0, 0)),
                  (n.globalAlpha = 1));
              }),
              V > 0.001 && Te(o),
              Oe(o, r));
            const L =
              m ||
              z ||
              G.length > 0 ||
              (tt > 0.005 && tt < 0.995) ||
              Math.abs(V - (o.reveal === "area" && p && T < 0 ? 1 : 0)) >
                0.002 ||
              (d.alpha > 0.01 && d.alpha < 0.99);
            (p || L) && yt && Mt && (at = requestAnimationFrame(Ht));
          },
          W = () => {
            at ||
              !yt ||
              !Mt ||
              ((gt = performance.now()), (at = requestAnimationFrame(Ht)));
          };
        nt.current = W;
        const Kt = () => {
            ((K = Math.max(1, g.clientWidth)),
              (st = Math.max(1, g.clientHeight)),
              (b = Math.min(window.devicePixelRatio || 1, 2)),
              (D.width = Math.round(K * b)),
              (D.height = Math.round(st * b)),
              (ft = ""),
              W());
          },
          Xt = (t) => {
            const o = g.getBoundingClientRect();
            ((k.x = t.clientX - o.left), (k.y = t.clientY - o.top));
          },
          ut = (t) => {
            (Xt(t), (k.inside = !0), W());
          },
          qt = () => {
            T >= 0 || ((k.inside = !1), W());
          },
          Gt = (t) => {
            var r;
            (Xt(t), (k.inside = !0));
            const o = lt.current,
              e = t.pointerType !== "mouse" || t.button === 0,
              s = z || !e ? -1 : It(k.x, k.y);
            ((P.x = k.x),
              (P.y = k.y),
              (P.time = performance.now()),
              (P.index = s),
              o != null &&
                o.draggable &&
                s >= 0 &&
                ((T = s),
                (dt.x = k.x - A[s].offset.x),
                (dt.y = k.y - A[s].offset.y),
                (r = g.setPointerCapture) == null || r.call(g, t.pointerId)),
              W());
          },
          xt = (t) => {
            var o, e;
            if (T >= 0) {
              ((T = -1),
                (o = g.releasePointerCapture) == null ||
                  o.call(g, t.pointerId));
              const s = g.getBoundingClientRect();
              k.inside =
                t.clientX >= s.left &&
                t.clientX <= s.right &&
                t.clientY >= s.top &&
                t.clientY <= s.bottom;
            }
            if (
              t.type === "pointerup" &&
              P.index >= 0 &&
              (e = lt.current) != null &&
              e.clickKick &&
              !bt &&
              performance.now() - P.time < 450
            ) {
              const s = g.getBoundingClientRect();
              Math.hypot(t.clientX - s.left - P.x, t.clientY - s.top - P.y) <
                6 && Pe(P.index);
            }
            ((P.index = -1), W());
          };
        (g.addEventListener("pointermove", ut, { passive: !0 }),
          g.addEventListener("pointerenter", ut, { passive: !0 }),
          g.addEventListener("pointerdown", Gt, { passive: !0 }),
          g.addEventListener("pointerup", xt, { passive: !0 }),
          g.addEventListener("pointercancel", xt, { passive: !0 }),
          g.addEventListener("pointerleave", qt, { passive: !0 }));
        const _t = new ResizeObserver(Kt);
        _t.observe(g);
        const Ut = new IntersectionObserver(([t]) => {
          ((yt = t.isIntersecting), W());
        });
        Ut.observe(g);
        const Jt = new MutationObserver(W);
        for (const t of [document.documentElement, document.body])
          t &&
            Jt.observe(t, {
              attributes: !0,
              attributeFilter: ["class", "style", "data-theme"],
            });
        const j =
          (Qt = window.matchMedia) == null
            ? void 0
            : Qt.call(window, "(prefers-color-scheme: dark)");
        return (
          (te = j == null ? void 0 : j.addEventListener) == null ||
            te.call(j, "change", W),
          document.fonts && document.fonts.ready.then(Ft, Ft),
          Kt(),
          () => {
            var t;
            ((Mt = !1),
              cancelAnimationFrame(at),
              (nt.current = () => {}),
              _t.disconnect(),
              Ut.disconnect(),
              Jt.disconnect(),
              (t = j == null ? void 0 : j.removeEventListener) == null ||
                t.call(j, "change", W),
              (g.style.cursor = ""),
              g.removeEventListener("pointermove", ut),
              g.removeEventListener("pointerenter", ut),
              g.removeEventListener("pointerdown", Gt),
              g.removeEventListener("pointerup", xt),
              g.removeEventListener("pointercancel", xt),
              g.removeEventListener("pointerleave", qt));
          }
        );
      }, []),
      ee.jsx("div", {
        ref: Et,
        className: `tech-text ${Ce}`.trim(),
        style: Ee,
        role: "img",
        "aria-label": E,
        children: ee.jsx("canvas", { ref: Lt, className: "tech-text-canvas" }),
      })
    );
  };
export { Ye as default };
