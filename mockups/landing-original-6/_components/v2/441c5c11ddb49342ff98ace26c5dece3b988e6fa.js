const Qh = () => Promise.resolve().then(() => qh), io = globalThis.__GLOBALS__.ReactJSXRuntime, { Fragment: td, jsx: d, jsxs: p } = io;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
globalThis.__GLOBALS__.React.Children;
globalThis.__GLOBALS__.React.cloneElement;
({
  ...globalThis.__GLOBALS__.React
});
const { Component: ro, createContext: Dt, createElement: ae, createFactory: ed, createRef: nd, forwardRef: rn, Fragment: mi, isValidElement: sd, lazy: id, memo: rd, Profiler: od, PureComponent: ad, startTransition: ld, StrictMode: cd, Suspense: ud, use: hd, useCallback: on, useContext: B, useDebugValue: dd, useDeferredValue: fd, useEffect: ot, useId: oo, useImperativeHandle: md, useInsertionEffect: ao, useLayoutEffect: lo, useMemo: me, useReducer: pd, useRef: it, useState: Ct, useSyncExternalStore: gd, useTransition: yd, version: xd, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: vd } = globalThis.__GLOBALS__.React, pi = Dt({});
function pe(t) {
  const e = it(null);
  return e.current === null && (e.current = t()), e.current;
}
const an = typeof window < "u", ln = an ? lo : ot, cn = /* @__PURE__ */ Dt(null);
function un(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function hn(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const et = (t, e, n) => n > e ? e : n < t ? t : n;
let _t = () => {
};
const nt = {}, gi = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function yi(t) {
  return typeof t == "object" && t !== null;
}
const xi = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function dn(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const W = /* @__NO_SIDE_EFFECTS__ */ (t) => t, co = (t, e) => (n) => e(t(n)), Kt = (...t) => t.reduce(co), St = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const s = e - t;
  return s === 0 ? 1 : (n - t) / s;
};
class fn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return un(this.subscriptions, e), () => hn(this.subscriptions, e);
  }
  notify(e, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1)
        this.subscriptions[0](e, n, s);
      else
        for (let o = 0; o < i; o++) {
          const r = this.subscriptions[o];
          r && r(e, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Q = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, G = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function mn(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const vi = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, uo = 1e-7, ho = 12;
function fo(t, e, n, s, i) {
  let o, r, a = 0;
  do
    r = e + (n - e) / 2, o = vi(r, s, i) - t, o > 0 ? n = r : e = r;
  while (Math.abs(o) > uo && ++a < ho);
  return r;
}
function Gt(t, e, n, s) {
  if (t === e && n === s)
    return W;
  const i = (o) => fo(o, 0, 1, t, n);
  return (o) => o === 0 || o === 1 ? o : vi(i(o), e, s);
}
const bi = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, wi = (t) => (e) => 1 - t(1 - e), Ti = /* @__PURE__ */ Gt(0.33, 1.53, 0.69, 0.99), pn = /* @__PURE__ */ wi(Ti), Ai = /* @__PURE__ */ bi(pn), Ci = (t) => (t *= 2) < 1 ? 0.5 * pn(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), gn = (t) => 1 - Math.sin(Math.acos(t)), Si = wi(gn), Pi = bi(gn), mo = /* @__PURE__ */ Gt(0.42, 0, 1, 1), po = /* @__PURE__ */ Gt(0, 0, 0.58, 1), Di = /* @__PURE__ */ Gt(0.42, 0, 0.58, 1), go = (t) => Array.isArray(t) && typeof t[0] != "number", Ei = (t) => Array.isArray(t) && typeof t[0] == "number", yo = {
  linear: W,
  easeIn: mo,
  easeInOut: Di,
  easeOut: po,
  circIn: gn,
  circInOut: Pi,
  circOut: Si,
  backIn: pn,
  backInOut: Ai,
  backOut: Ti,
  anticipate: Ci
}, xo = (t) => typeof t == "string", Xn = (t) => {
  if (Ei(t)) {
    _t(t.length === 4);
    const [e, n, s, i] = t;
    return Gt(e, n, s, i);
  } else if (xo(t))
    return yo[t];
  return t;
}, Jt = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function vo(t, e) {
  let n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), i = !1, o = !1;
  const r = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(c) {
    r.has(c) && (u.schedule(c), t()), c(a);
  }
  const u = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, h = !1, f = !1) => {
      const g = f && i ? n : s;
      return h && r.add(c), g.has(c) || g.add(c), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      s.delete(c), r.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (a = c, i) {
        o = !0;
        return;
      }
      i = !0, [n, s] = [s, n], n.forEach(l), n.clear(), i = !1, o && (o = !1, u.process(c));
    }
  };
  return u;
}
const bo = 40;
function Vi(t, e) {
  let n = !1, s = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, o = () => n = !0, r = Jt.reduce((x, S) => (x[S] = vo(o), x), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: c, update: h, preRender: f, render: m, postRender: g } = r, b = () => {
    const x = nt.useManualTiming ? i.timestamp : performance.now();
    n = !1, nt.useManualTiming || (i.delta = s ? 1e3 / 60 : Math.max(Math.min(x - i.timestamp, bo), 1)), i.timestamp = x, i.isProcessing = !0, a.process(i), l.process(i), u.process(i), c.process(i), h.process(i), f.process(i), m.process(i), g.process(i), i.isProcessing = !1, n && e && (s = !1, t(b));
  }, v = () => {
    n = !0, s = !0, i.isProcessing || t(b);
  };
  return { schedule: Jt.reduce((x, S) => {
    const A = r[S];
    return x[S] = (D, L = !1, C = !1) => (n || v(), A.schedule(D, L, C)), x;
  }, {}), cancel: (x) => {
    for (let S = 0; S < Jt.length; S++)
      r[Jt[S]].cancel(x);
  }, state: i, steps: r };
}
const { schedule: P, cancel: q, state: k, steps: be } = /* @__PURE__ */ Vi(typeof requestAnimationFrame < "u" ? requestAnimationFrame : W, !0);
let te;
function wo() {
  te = void 0;
}
const _ = {
  now: () => (te === void 0 && _.set(k.isProcessing || nt.useManualTiming ? k.timestamp : performance.now()), te),
  set: (t) => {
    te = t, queueMicrotask(wo);
  }
}, Mi = (t) => (e) => typeof e == "string" && e.startsWith(t), yn = /* @__PURE__ */ Mi("--"), To = /* @__PURE__ */ Mi("var(--"), xn = (t) => To(t) ? Ao.test(t.split("/*")[0].trim()) : !1, Ao = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, Et = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, Wt = {
  ...Et,
  transform: (t) => et(0, 1, t)
}, qt = {
  ...Et,
  default: 1
}, Rt = (t) => Math.round(t * 1e5) / 1e5, vn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Co(t) {
  return t == null;
}
const So = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, bn = (t, e) => (n) => !!(typeof n == "string" && So.test(n) && n.startsWith(t) || e && !Co(n) && Object.prototype.hasOwnProperty.call(n, e)), Ni = (t, e, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [i, o, r, a] = s.match(vn);
  return {
    [t]: parseFloat(i),
    [e]: parseFloat(o),
    [n]: parseFloat(r),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Po = (t) => et(0, 255, t), we = {
  ...Et,
  transform: (t) => Math.round(Po(t))
}, ht = {
  test: /* @__PURE__ */ bn("rgb", "red"),
  parse: /* @__PURE__ */ Ni("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + we.transform(t) + ", " + we.transform(e) + ", " + we.transform(n) + ", " + Rt(Wt.transform(s)) + ")"
};
function Do(t) {
  let e = "", n = "", s = "", i = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), i = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), i = t.substring(4, 5), e += e, n += n, s += s, i += i), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const Be = {
  test: /* @__PURE__ */ bn("#"),
  parse: Do,
  transform: ht.transform
}, Yt = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), st = /* @__PURE__ */ Yt("deg"), tt = /* @__PURE__ */ Yt("%"), T = /* @__PURE__ */ Yt("px"), Eo = /* @__PURE__ */ Yt("vh"), Vo = /* @__PURE__ */ Yt("vw"), Jn = {
  ...tt,
  parse: (t) => tt.parse(t) / 100,
  transform: (t) => tt.transform(t * 100)
}, yt = {
  test: /* @__PURE__ */ bn("hsl", "hue"),
  parse: /* @__PURE__ */ Ni("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + tt.transform(Rt(e)) + ", " + tt.transform(Rt(n)) + ", " + Rt(Wt.transform(s)) + ")"
}, N = {
  test: (t) => ht.test(t) || Be.test(t) || yt.test(t),
  parse: (t) => ht.test(t) ? ht.parse(t) : yt.test(t) ? yt.parse(t) : Be.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? ht.transform(t) : yt.transform(t),
  getAnimatableNone: (t) => {
    const e = N.parse(t);
    return e.alpha = 0, N.transform(e);
  }
}, Mo = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function No(t) {
  return isNaN(t) && typeof t == "string" && (t.match(vn)?.length || 0) + (t.match(Mo)?.length || 0) > 0;
}
const Li = "number", ki = "color", Lo = "var", ko = "var(", qn = "${}", Ro = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ut(t) {
  const e = t.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let o = 0;
  const a = e.replace(Ro, (l) => (N.test(l) ? (s.color.push(o), i.push(ki), n.push(N.parse(l))) : l.startsWith(ko) ? (s.var.push(o), i.push(Lo), n.push(l)) : (s.number.push(o), i.push(Li), n.push(parseFloat(l))), ++o, qn)).split(qn);
  return { values: n, split: a, indexes: s, types: i };
}
function Ri(t) {
  return Ut(t).values;
}
function Fi(t) {
  const { split: e, types: n } = Ut(t), s = e.length;
  return (i) => {
    let o = "";
    for (let r = 0; r < s; r++)
      if (o += e[r], i[r] !== void 0) {
        const a = n[r];
        a === Li ? o += Rt(i[r]) : a === ki ? o += N.transform(i[r]) : o += i[r];
      }
    return o;
  };
}
const Fo = (t) => typeof t == "number" ? 0 : N.test(t) ? N.getAnimatableNone(t) : t;
function Bo(t) {
  const e = Ri(t);
  return Fi(t)(e.map(Fo));
}
const rt = {
  test: No,
  parse: Ri,
  createTransformer: Fi,
  getAnimatableNone: Bo
};
function Te(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Io({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let i = 0, o = 0, r = 0;
  if (!e)
    i = o = r = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    i = Te(l, a, t + 1 / 3), o = Te(l, a, t), r = Te(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(r * 255),
    alpha: s
  };
}
function le(t, e) {
  return (n) => n > 0 ? e : t;
}
const E = (t, e, n) => t + (e - t) * n, Ae = (t, e, n) => {
  const s = t * t, i = n * (e * e - s) + s;
  return i < 0 ? 0 : Math.sqrt(i);
}, Oo = [Be, ht, yt], jo = (t) => Oo.find((e) => e.test(t));
function Zn(t) {
  const e = jo(t);
  if (!e)
    return !1;
  let n = e.parse(t);
  return e === yt && (n = Io(n)), n;
}
const Qn = (t, e) => {
  const n = Zn(t), s = Zn(e);
  if (!n || !s)
    return le(t, e);
  const i = { ...n };
  return (o) => (i.red = Ae(n.red, s.red, o), i.green = Ae(n.green, s.green, o), i.blue = Ae(n.blue, s.blue, o), i.alpha = E(n.alpha, s.alpha, o), ht.transform(i));
}, Ie = /* @__PURE__ */ new Set(["none", "hidden"]);
function _o(t, e) {
  return Ie.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function Wo(t, e) {
  return (n) => E(t, e, n);
}
function wn(t) {
  return typeof t == "number" ? Wo : typeof t == "string" ? xn(t) ? le : N.test(t) ? Qn : zo : Array.isArray(t) ? Bi : typeof t == "object" ? N.test(t) ? Qn : Uo : le;
}
function Bi(t, e) {
  const n = [...t], s = n.length, i = t.map((o, r) => wn(o)(o, e[r]));
  return (o) => {
    for (let r = 0; r < s; r++)
      n[r] = i[r](o);
    return n;
  };
}
function Uo(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const i in n)
    t[i] !== void 0 && e[i] !== void 0 && (s[i] = wn(t[i])(t[i], e[i]));
  return (i) => {
    for (const o in s)
      n[o] = s[o](i);
    return n;
  };
}
function $o(t, e) {
  const n = [], s = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < e.values.length; i++) {
    const o = e.types[i], r = t.indexes[o][s[o]], a = t.values[r] ?? 0;
    n[i] = a, s[o]++;
  }
  return n;
}
const zo = (t, e) => {
  const n = rt.createTransformer(e), s = Ut(t), i = Ut(e);
  return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? Ie.has(t) && !i.values.length || Ie.has(e) && !s.values.length ? _o(t, e) : Kt(Bi($o(s, i), i.values), n) : le(t, e);
};
function Ii(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? E(t, e, n) : wn(t)(t, e);
}
const Ho = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: (n = !0) => P.update(e, n),
    stop: () => q(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => k.isProcessing ? k.timestamp : _.now()
  };
}, Oi = (t, e, n = 10) => {
  let s = "";
  const i = Math.max(Math.round(e / n), 2);
  for (let o = 0; o < i; o++)
    s += Math.round(t(o / (i - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, ce = 2e4;
function Tn(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < ce; )
    e += n, s = t.next(e);
  return e >= ce ? 1 / 0 : e;
}
function Ko(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), i = Math.min(Tn(s), ce);
  return {
    type: "keyframes",
    ease: (o) => s.next(i * o).value / e,
    duration: /* @__PURE__ */ G(i)
  };
}
const Go = 5;
function ji(t, e, n) {
  const s = Math.max(e - Go, 0);
  return mn(n - t(s), e - s);
}
const V = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, Ce = 1e-3;
function Yo({ duration: t = V.duration, bounce: e = V.bounce, velocity: n = V.velocity, mass: s = V.mass }) {
  let i, o, r = 1 - e;
  r = et(V.minDamping, V.maxDamping, r), t = et(V.minDuration, V.maxDuration, /* @__PURE__ */ G(t)), r < 1 ? (i = (u) => {
    const c = u * r, h = c * t, f = c - n, m = Oe(u, r), g = Math.exp(-h);
    return Ce - f / m * g;
  }, o = (u) => {
    const h = u * r * t, f = h * n + n, m = Math.pow(r, 2) * Math.pow(u, 2) * t, g = Math.exp(-h), b = Oe(Math.pow(u, 2), r);
    return (-i(u) + Ce > 0 ? -1 : 1) * ((f - m) * g) / b;
  }) : (i = (u) => {
    const c = Math.exp(-u * t), h = (u - n) * t + 1;
    return -Ce + c * h;
  }, o = (u) => {
    const c = Math.exp(-u * t), h = (n - u) * (t * t);
    return c * h;
  });
  const a = 5 / t, l = Jo(i, o, a);
  if (t = /* @__PURE__ */ Q(t), isNaN(l))
    return {
      stiffness: V.stiffness,
      damping: V.damping,
      duration: t
    };
  {
    const u = Math.pow(l, 2) * s;
    return {
      stiffness: u,
      damping: r * 2 * Math.sqrt(s * u),
      duration: t
    };
  }
}
const Xo = 12;
function Jo(t, e, n) {
  let s = n;
  for (let i = 1; i < Xo; i++)
    s = s - t(s) / e(s);
  return s;
}
function Oe(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const qo = ["duration", "bounce"], Zo = ["stiffness", "damping", "mass"];
function ts(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function Qo(t) {
  let e = {
    velocity: V.velocity,
    stiffness: V.stiffness,
    damping: V.damping,
    mass: V.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!ts(t, Zo) && ts(t, qo))
    if (t.visualDuration) {
      const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), i = s * s, o = 2 * et(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(i);
      e = {
        ...e,
        mass: V.mass,
        stiffness: i,
        damping: o
      };
    } else {
      const n = Yo(t);
      e = {
        ...e,
        ...n,
        mass: V.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function ue(t = V.visualDuration, e = V.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: s, restDelta: i } = n;
  const o = n.keyframes[0], r = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: o }, { stiffness: l, damping: u, mass: c, duration: h, velocity: f, isResolvedFromDuration: m } = Qo({
    ...n,
    velocity: -/* @__PURE__ */ G(n.velocity || 0)
  }), g = f || 0, b = u / (2 * Math.sqrt(l * c)), v = r - o, y = /* @__PURE__ */ G(Math.sqrt(l / c)), w = Math.abs(v) < 5;
  s || (s = w ? V.restSpeed.granular : V.restSpeed.default), i || (i = w ? V.restDelta.granular : V.restDelta.default);
  let x;
  if (b < 1) {
    const A = Oe(y, b);
    x = (D) => {
      const L = Math.exp(-b * y * D);
      return r - L * ((g + b * y * v) / A * Math.sin(A * D) + v * Math.cos(A * D));
    };
  } else if (b === 1)
    x = (A) => r - Math.exp(-y * A) * (v + (g + y * v) * A);
  else {
    const A = y * Math.sqrt(b * b - 1);
    x = (D) => {
      const L = Math.exp(-b * y * D), C = Math.min(A * D, 300);
      return r - L * ((g + b * y * v) * Math.sinh(C) + A * v * Math.cosh(C)) / A;
    };
  }
  const S = {
    calculatedDuration: m && h || null,
    next: (A) => {
      const D = x(A);
      if (m)
        a.done = A >= h;
      else {
        let L = A === 0 ? g : 0;
        b < 1 && (L = A === 0 ? /* @__PURE__ */ Q(g) : ji(x, A, D));
        const C = Math.abs(L) <= s, O = Math.abs(r - D) <= i;
        a.done = C && O;
      }
      return a.value = a.done ? r : D, a;
    },
    toString: () => {
      const A = Math.min(Tn(S), ce), D = Oi((L) => S.next(A * L).value, A, 30);
      return A + "ms " + D;
    },
    toTransition: () => {
    }
  };
  return S;
}
ue.applyToOptions = (t) => {
  const e = Ko(t, 100, ue);
  return t.ease = e.ease, t.duration = /* @__PURE__ */ Q(e.duration), t.type = "keyframes", t;
};
function je({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: i = 10, bounceStiffness: o = 500, modifyTarget: r, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const h = t[0], f = {
    done: !1,
    value: h
  }, m = (C) => a !== void 0 && C < a || l !== void 0 && C > l, g = (C) => a === void 0 ? l : l === void 0 || Math.abs(a - C) < Math.abs(l - C) ? a : l;
  let b = n * e;
  const v = h + b, y = r === void 0 ? v : r(v);
  y !== v && (b = y - h);
  const w = (C) => -b * Math.exp(-C / s), x = (C) => y + w(C), S = (C) => {
    const O = w(C), $ = x(C);
    f.done = Math.abs(O) <= u, f.value = f.done ? y : $;
  };
  let A, D;
  const L = (C) => {
    m(f.value) && (A = C, D = ue({
      keyframes: [f.value, g(f.value)],
      velocity: ji(x, C, f.value),
      // TODO: This should be passing * 1000
      damping: i,
      stiffness: o,
      restDelta: u,
      restSpeed: c
    }));
  };
  return L(0), {
    calculatedDuration: null,
    next: (C) => {
      let O = !1;
      return !D && A === void 0 && (O = !0, S(C), L(C)), A !== void 0 && C >= A ? D.next(C - A) : (!O && S(C), f);
    }
  };
}
function ta(t, e, n) {
  const s = [], i = n || nt.mix || Ii, o = t.length - 1;
  for (let r = 0; r < o; r++) {
    let a = i(t[r], t[r + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[r] || W : e;
      a = Kt(l, a);
    }
    s.push(a);
  }
  return s;
}
function An(t, e, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const o = t.length;
  if (_t(o === e.length), o === 1)
    return () => e[0];
  if (o === 2 && e[0] === e[1])
    return () => e[1];
  const r = t[0] === t[1];
  t[0] > t[o - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = ta(e, s, i), l = a.length, u = (c) => {
    if (r && c < t[0])
      return e[0];
    let h = 0;
    if (l > 1)
      for (; h < t.length - 2 && !(c < t[h + 1]); h++)
        ;
    const f = /* @__PURE__ */ St(t[h], t[h + 1], c);
    return a[h](f);
  };
  return n ? (c) => u(et(t[0], t[o - 1], c)) : u;
}
function ea(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const i = /* @__PURE__ */ St(0, e, s);
    t.push(E(n, 1, i));
  }
}
function _i(t) {
  const e = [0];
  return ea(e, t.length - 1), e;
}
function na(t, e) {
  return t.map((n) => n * e);
}
function sa(t, e) {
  return t.map(() => e || Di).splice(0, t.length - 1);
}
function Ft({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const i = go(s) ? s.map(Xn) : Xn(s), o = {
    done: !1,
    value: e[0]
  }, r = na(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : _i(e),
    t
  ), a = An(r, e, {
    ease: Array.isArray(i) ? i : sa(e, i)
  });
  return {
    calculatedDuration: t,
    next: (l) => (o.value = a(l), o.done = l >= t, o)
  };
}
const ia = (t) => t !== null;
function Cn(t, { repeat: e, repeatType: n = "loop" }, s, i = 1) {
  const o = t.filter(ia), a = i < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : o.length - 1;
  return !a || s === void 0 ? o[a] : s;
}
const ra = {
  decay: je,
  inertia: je,
  tween: Ft,
  keyframes: Ft,
  spring: ue
};
function Wi(t) {
  typeof t.type == "string" && (t.type = ra[t.type]);
}
class Sn {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((e) => {
      this.resolve = e;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
}
const oa = (t) => t / 100;
class Pn extends Sn {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== _.now() && this.tick(_.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    Wi(e);
    const { type: n = Ft, repeat: s = 0, repeatDelay: i = 0, repeatType: o, velocity: r = 0 } = e;
    let { keyframes: a } = e;
    const l = n || Ft;
    l !== Ft && typeof a[0] != "number" && (this.mixKeyframes = Kt(oa, Ii(a[0], a[1])), a = [0, 100]);
    const u = l({ ...e, keyframes: a });
    o === "mirror" && (this.mirroredGenerator = l({
      ...e,
      keyframes: [...a].reverse(),
      velocity: -r
    })), u.calculatedDuration === null && (u.calculatedDuration = Tn(u));
    const { calculatedDuration: c } = u;
    this.calculatedDuration = c, this.resolvedDuration = c + i, this.totalDuration = this.resolvedDuration * (s + 1) - i, this.generator = u;
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(e, n = !1) {
    const { generator: s, totalDuration: i, mixKeyframes: o, mirroredGenerator: r, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: u = 0, keyframes: c, repeat: h, repeatType: f, repeatDelay: m, type: g, onUpdate: b, finalKeyframe: v } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - i / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
    const y = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), w = this.playbackSpeed >= 0 ? y < 0 : y > i;
    this.currentTime = Math.max(y, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = i);
    let x = this.currentTime, S = s;
    if (h) {
      const C = Math.min(this.currentTime, i) / a;
      let O = Math.floor(C), $ = C % 1;
      !$ && C >= 1 && ($ = 1), $ === 1 && O--, O = Math.min(O, h + 1), !!(O % 2) && (f === "reverse" ? ($ = 1 - $, m && ($ -= m / a)) : f === "mirror" && (S = r)), x = et(0, 1, $) * a;
    }
    const A = w ? { done: !1, value: c[0] } : S.next(x);
    o && (A.value = o(A.value));
    let { done: D } = A;
    !w && l !== null && (D = this.playbackSpeed >= 0 ? this.currentTime >= i : this.currentTime <= 0);
    const L = this.holdTime === null && (this.state === "finished" || this.state === "running" && D);
    return L && g !== je && (A.value = Cn(c, this.options, v, this.speed)), b && b(A.value), L && this.finish(), A;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
  get duration() {
    return /* @__PURE__ */ G(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ G(e);
  }
  get time() {
    return /* @__PURE__ */ G(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ Q(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    this.updateTime(_.now());
    const n = this.playbackSpeed !== e;
    this.playbackSpeed = e, n && (this.time = /* @__PURE__ */ G(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = Ho, startTime: n } = this.options;
    this.driver || (this.driver = e((i) => this.tick(i))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = n ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(_.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
  attachTimeline(e) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
  }
}
function aa(t) {
  for (let e = 1; e < t.length; e++)
    t[e] ?? (t[e] = t[e - 1]);
}
const dt = (t) => t * 180 / Math.PI, _e = (t) => {
  const e = dt(Math.atan2(t[1], t[0]));
  return We(e);
}, la = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: _e,
  rotateZ: _e,
  skewX: (t) => dt(Math.atan(t[1])),
  skewY: (t) => dt(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, We = (t) => (t = t % 360, t < 0 && (t += 360), t), es = _e, ns = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), ss = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), ca = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: ns,
  scaleY: ss,
  scale: (t) => (ns(t) + ss(t)) / 2,
  rotateX: (t) => We(dt(Math.atan2(t[6], t[5]))),
  rotateY: (t) => We(dt(Math.atan2(-t[2], t[0]))),
  rotateZ: es,
  rotate: es,
  skewX: (t) => dt(Math.atan(t[4])),
  skewY: (t) => dt(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function Ue(t) {
  return t.includes("scale") ? 1 : 0;
}
function $e(t, e) {
  if (!t || t === "none")
    return Ue(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, i;
  if (n)
    s = ca, i = n;
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = la, i = a;
  }
  if (!i)
    return Ue(e);
  const o = s[e], r = i[1].split(",").map(ha);
  return typeof o == "function" ? o(r) : r[o];
}
const ua = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return $e(n, e);
};
function ha(t) {
  return parseFloat(t.trim());
}
const Vt = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], Mt = new Set(Vt), is = (t) => t === Et || t === T, da = /* @__PURE__ */ new Set(["x", "y", "z"]), fa = Vt.filter((t) => !da.has(t));
function ma(t) {
  const e = [];
  return fa.forEach((n) => {
    const s = t.getValue(n);
    s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const ft = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: (t, { transform: e }) => $e(e, "x"),
  y: (t, { transform: e }) => $e(e, "y")
};
ft.translateX = ft.x;
ft.translateY = ft.y;
const mt = /* @__PURE__ */ new Set();
let ze = !1, He = !1, Ke = !1;
function Ui() {
  if (He) {
    const t = Array.from(mt).filter((s) => s.needsMeasurement), e = new Set(t.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const i = ma(s);
      i.length && (n.set(s, i), s.render());
    }), t.forEach((s) => s.measureInitialState()), e.forEach((s) => {
      s.render();
      const i = n.get(s);
      i && i.forEach(([o, r]) => {
        s.getValue(o)?.set(r);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  He = !1, ze = !1, mt.forEach((t) => t.complete(Ke)), mt.clear();
}
function $i() {
  mt.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (He = !0);
  });
}
function pa() {
  Ke = !0, $i(), Ui(), Ke = !1;
}
class Dn {
  constructor(e, n, s, i, o, r = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = i, this.element = o, this.isAsync = r;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (mt.add(this), ze || (ze = !0, P.read($i), P.resolveKeyframes(Ui))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: s, motionValue: i } = this;
    if (e[0] === null) {
      const o = i?.get(), r = e[e.length - 1];
      if (o !== void 0)
        e[0] = o;
      else if (s && n) {
        const a = s.readValue(n, r);
        a != null && (e[0] = a);
      }
      e[0] === void 0 && (e[0] = r), i && o === void 0 && i.set(e[0]);
    }
    aa(e);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(e = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), mt.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (mt.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const ga = (t) => t.startsWith("--");
function ya(t, e, n) {
  ga(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
const zi = /* @__PURE__ */ dn(() => window.ScrollTimeline !== void 0), xa = {};
function va(t, e) {
  const n = /* @__PURE__ */ dn(t);
  return () => xa[e] ?? n();
}
const Hi = /* @__PURE__ */ va(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), kt = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`, rs = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ kt([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ kt([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ kt([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ kt([0.33, 1.53, 0.69, 0.99])
};
function Ki(t, e) {
  if (t)
    return typeof t == "function" ? Hi() ? Oi(t, e) : "ease-out" : Ei(t) ? kt(t) : Array.isArray(t) ? t.map((n) => Ki(n, e) || rs.easeOut) : rs[t];
}
function ba(t, e, n, { delay: s = 0, duration: i = 300, repeat: o = 0, repeatType: r = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const c = {
    [e]: n
  };
  l && (c.offset = l);
  const h = Ki(a, i);
  Array.isArray(h) && (c.easing = h);
  const f = {
    delay: s,
    duration: i,
    easing: Array.isArray(h) ? "linear" : h,
    fill: "both",
    iterations: o + 1,
    direction: r === "reverse" ? "alternate" : "normal"
  };
  return u && (f.pseudoElement = u), t.animate(c, f);
}
function Gi(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function wa({ type: t, ...e }) {
  return Gi(t) && Hi() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class Ta extends Sn {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !e)
      return;
    const { element: n, name: s, keyframes: i, pseudoElement: o, allowFlatten: r = !1, finalKeyframe: a, onComplete: l } = e;
    this.isPseudoElement = !!o, this.allowFlatten = r, this.options = e, _t(typeof e.type != "string");
    const u = wa(e);
    this.animation = ba(n, s, i, u, o), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !o) {
        const c = Cn(i, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(c) : ya(n, s, c), this.animation.cancel();
      }
      l?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: e } = this;
    e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    this.isPseudoElement || this.animation.commitStyles?.();
  }
  get duration() {
    const e = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ G(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ G(e);
  }
  get time() {
    return /* @__PURE__ */ G(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Q(e);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(e) {
    this.animation.startTime = e;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: e, observe: n }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && zi() ? (this.animation.timeline = e, W) : n(this);
  }
}
const Yi = {
  anticipate: Ci,
  backInOut: Ai,
  circInOut: Pi
};
function Aa(t) {
  return t in Yi;
}
function Ca(t) {
  typeof t.ease == "string" && Aa(t.ease) && (t.ease = Yi[t.ease]);
}
const os = 10;
class Sa extends Ta {
  constructor(e) {
    Ca(e), Wi(e), super(e), e.startTime && (this.startTime = e.startTime), this.options = e;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read commited styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(e) {
    const { motionValue: n, onUpdate: s, onComplete: i, element: o, ...r } = this.options;
    if (!n)
      return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const a = new Pn({
      ...r,
      autoplay: !1
    }), l = /* @__PURE__ */ Q(this.finishedTime ?? this.time);
    n.setWithVelocity(a.sample(l - os).value, a.sample(l).value, os), a.stop();
  }
}
const as = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(rt.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function Pa(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function Da(t, e, n, s) {
  const i = t[0];
  if (i === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const o = t[t.length - 1], r = as(i, e), a = as(o, e);
  return !r || !a ? !1 : Pa(t) || (n === "spring" || Gi(n)) && s;
}
function Ge(t) {
  t.duration = 0, t.type = "keyframes";
}
const Ea = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), Va = /* @__PURE__ */ dn(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Ma(t) {
  const { motionValue: e, name: n, repeatDelay: s, repeatType: i, damping: o, type: r } = t;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: u } = e.owner.getProps();
  return Va() && n && Ea.has(n) && (n !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !s && i !== "mirror" && o !== 0 && r !== "inertia";
}
const Na = 40;
class La extends Sn {
  constructor({ autoplay: e = !0, delay: n = 0, type: s = "keyframes", repeat: i = 0, repeatDelay: o = 0, repeatType: r = "loop", keyframes: a, name: l, motionValue: u, element: c, ...h }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = _.now();
    const f = {
      autoplay: e,
      delay: n,
      type: s,
      repeat: i,
      repeatDelay: o,
      repeatType: r,
      name: l,
      motionValue: u,
      element: c,
      ...h
    }, m = c?.KeyframeResolver || Dn;
    this.keyframeResolver = new m(a, (g, b, v) => this.onKeyframesResolved(g, b, f, !v), l, u, c), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, n, s, i) {
    this.keyframeResolver = void 0;
    const { name: o, type: r, velocity: a, delay: l, isHandoff: u, onUpdate: c } = s;
    this.resolvedAt = _.now(), Da(e, o, r, a) || ((nt.instantAnimations || !l) && c?.(Cn(e, s, n)), e[0] = e[e.length - 1], Ge(s), s.repeat = 0);
    const f = {
      startTime: i ? this.resolvedAt ? this.resolvedAt - this.createdAt > Na ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...s,
      keyframes: e
    }, m = !u && Ma(f) ? new Sa({
      ...f,
      element: f.motionValue.owner.current
    }) : new Pn(f);
    m.finished.then(() => this.notifyFinished()).catch(W), this.pendingTimeline && (this.stopTimeline = m.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = m;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), pa()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
const ka = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Ra(t) {
  const e = ka.exec(t);
  if (!e)
    return [,];
  const [, n, s, i] = e;
  return [`--${n ?? s}`, i];
}
function Xi(t, e, n = 1) {
  const [s, i] = Ra(t);
  if (!s)
    return;
  const o = window.getComputedStyle(e).getPropertyValue(s);
  if (o) {
    const r = o.trim();
    return gi(r) ? parseFloat(r) : r;
  }
  return xn(i) ? Xi(i, e, n + 1) : i;
}
function En(t, e) {
  return t?.[e] ?? t?.default ?? t;
}
const Ji = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Vt
]), Fa = {
  test: (t) => t === "auto",
  parse: (t) => t
}, qi = (t) => (e) => e.test(t), Zi = [Et, T, tt, st, Vo, Eo, Fa], ls = (t) => Zi.find(qi(t));
function Ba(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || xi(t) : !0;
}
const Ia = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Oa(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(vn) || [];
  if (!s)
    return t;
  const i = n.replace(s, "");
  let o = Ia.has(e) ? 1 : 0;
  return s !== n && (o *= 100), e + "(" + o + i + ")";
}
const ja = /\b([a-z-]*)\(.*?\)/gu, Ye = {
  ...rt,
  getAnimatableNone: (t) => {
    const e = t.match(ja);
    return e ? e.map(Oa).join(" ") : t;
  }
}, cs = {
  ...Et,
  transform: Math.round
}, _a = {
  rotate: st,
  rotateX: st,
  rotateY: st,
  rotateZ: st,
  scale: qt,
  scaleX: qt,
  scaleY: qt,
  scaleZ: qt,
  skew: st,
  skewX: st,
  skewY: st,
  distance: T,
  translateX: T,
  translateY: T,
  translateZ: T,
  x: T,
  y: T,
  z: T,
  perspective: T,
  transformPerspective: T,
  opacity: Wt,
  originX: Jn,
  originY: Jn,
  originZ: T
}, Vn = {
  // Border props
  borderWidth: T,
  borderTopWidth: T,
  borderRightWidth: T,
  borderBottomWidth: T,
  borderLeftWidth: T,
  borderRadius: T,
  radius: T,
  borderTopLeftRadius: T,
  borderTopRightRadius: T,
  borderBottomRightRadius: T,
  borderBottomLeftRadius: T,
  // Positioning props
  width: T,
  maxWidth: T,
  height: T,
  maxHeight: T,
  top: T,
  right: T,
  bottom: T,
  left: T,
  // Spacing props
  padding: T,
  paddingTop: T,
  paddingRight: T,
  paddingBottom: T,
  paddingLeft: T,
  margin: T,
  marginTop: T,
  marginRight: T,
  marginBottom: T,
  marginLeft: T,
  // Misc
  backgroundPositionX: T,
  backgroundPositionY: T,
  ..._a,
  zIndex: cs,
  // SVG
  fillOpacity: Wt,
  strokeOpacity: Wt,
  numOctaves: cs
}, Wa = {
  ...Vn,
  // Color props
  color: N,
  backgroundColor: N,
  outlineColor: N,
  fill: N,
  stroke: N,
  // Border props
  borderColor: N,
  borderTopColor: N,
  borderRightColor: N,
  borderBottomColor: N,
  borderLeftColor: N,
  filter: Ye,
  WebkitFilter: Ye
}, Qi = (t) => Wa[t];
function tr(t, e) {
  let n = Qi(t);
  return n !== Ye && (n = rt), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const Ua = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function $a(t, e, n) {
  let s = 0, i;
  for (; s < t.length && !i; ) {
    const o = t[s];
    typeof o == "string" && !Ua.has(o) && Ut(o).values.length && (i = t[s]), s++;
  }
  if (i && n)
    for (const o of e)
      t[o] = tr(n, i);
}
class za extends Dn {
  constructor(e, n, s, i, o) {
    super(e, n, s, i, o, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: s } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < e.length; l++) {
      let u = e[l];
      if (typeof u == "string" && (u = u.trim(), xn(u))) {
        const c = Xi(u, n.current);
        c !== void 0 && (e[l] = c), l === e.length - 1 && (this.finalKeyframe = u);
      }
    }
    if (this.resolveNoneKeyframes(), !Ji.has(s) || e.length !== 2)
      return;
    const [i, o] = e, r = ls(i), a = ls(o);
    if (r !== a)
      if (is(r) && is(a))
        for (let l = 0; l < e.length; l++) {
          const u = e[l];
          typeof u == "string" && (e[l] = parseFloat(u));
        }
      else ft[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, s = [];
    for (let i = 0; i < e.length; i++)
      (e[i] === null || Ba(e[i])) && s.push(i);
    s.length && $a(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = ft[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && e.getValue(s, i).jump(i, !1);
  }
  measureEndState() {
    const { element: e, name: n, unresolvedKeyframes: s } = this;
    if (!e || !e.current)
      return;
    const i = e.getValue(n);
    i && i.jump(this.measuredOrigin, !1);
    const o = s.length - 1, r = s[o];
    s[o] = ft[n](e.measureViewportBox(), window.getComputedStyle(e.current)), r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r), this.removedTransforms?.length && this.removedTransforms.forEach(([a, l]) => {
      e.getValue(a).set(l);
    }), this.resolveNoneKeyframes();
  }
}
function Mn(t, e, n) {
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    const i = document.querySelectorAll(t);
    return i ? Array.from(i) : [];
  }
  return Array.from(t);
}
const er = (t, e) => e && typeof t == "number" ? e.transform(t) : t;
function nr(t) {
  return yi(t) && "offsetHeight" in t;
}
const us = 30, Ha = (t) => !isNaN(parseFloat(t)), Bt = {
  current: void 0
};
class Ka {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const i = _.now();
      if (this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = _.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Ha(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new fn());
    const s = this.events[e].add(n);
    return e === "change" ? () => {
      s(), P.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e) {
    this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
  }
  setWithVelocity(e, n, s) {
    this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, n = !0) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(e) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return Bt.current && Bt.current.push(this), this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const e = _.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > us)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, us);
    return mn(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function J(t, e) {
  return new Ka(t, e);
}
const { schedule: Nn } = /* @__PURE__ */ Vi(queueMicrotask, !1), X = {
  x: !1,
  y: !1
};
function sr() {
  return X.x || X.y;
}
function Ga(t) {
  return t === "x" || t === "y" ? X[t] ? null : (X[t] = !0, () => {
    X[t] = !1;
  }) : X.x || X.y ? null : (X.x = X.y = !0, () => {
    X.x = X.y = !1;
  });
}
function ir(t, e) {
  const n = Mn(t), s = new AbortController(), i = {
    passive: !0,
    ...e,
    signal: s.signal
  };
  return [n, i, () => s.abort()];
}
function hs(t) {
  return !(t.pointerType === "touch" || sr());
}
function Ya(t, e, n = {}) {
  const [s, i, o] = ir(t, n), r = (a) => {
    if (!hs(a))
      return;
    const { target: l } = a, u = e(l, a);
    if (typeof u != "function" || !l)
      return;
    const c = (h) => {
      hs(h) && (u(h), l.removeEventListener("pointerleave", c));
    };
    l.addEventListener("pointerleave", c, i);
  };
  return s.forEach((a) => {
    a.addEventListener("pointerenter", r, i);
  }), o;
}
const rr = (t, e) => e ? t === e ? !0 : rr(t, e.parentElement) : !1, Ln = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Xa = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Ja(t) {
  return Xa.has(t.tagName) || t.tabIndex !== -1;
}
const ee = /* @__PURE__ */ new WeakSet();
function ds(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function Se(t, e) {
  t.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const qa = (t, e) => {
  const n = t.currentTarget;
  if (!n)
    return;
  const s = ds(() => {
    if (ee.has(n))
      return;
    Se(n, "down");
    const i = ds(() => {
      Se(n, "up");
    }), o = () => Se(n, "cancel");
    n.addEventListener("keyup", i, e), n.addEventListener("blur", o, e);
  });
  n.addEventListener("keydown", s, e), n.addEventListener("blur", () => n.removeEventListener("keydown", s), e);
};
function fs(t) {
  return Ln(t) && !sr();
}
function Za(t, e, n = {}) {
  const [s, i, o] = ir(t, n), r = (a) => {
    const l = a.currentTarget;
    if (!fs(a))
      return;
    ee.add(l);
    const u = e(l, a), c = (m, g) => {
      window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", f), ee.has(l) && ee.delete(l), fs(m) && typeof u == "function" && u(m, { success: g });
    }, h = (m) => {
      c(m, l === window || l === document || n.useGlobalTarget || rr(l, m.target));
    }, f = (m) => {
      c(m, !1);
    };
    window.addEventListener("pointerup", h, i), window.addEventListener("pointercancel", f, i);
  };
  return s.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", r, i), nr(a) && (a.addEventListener("focus", (u) => qa(u, i)), !Ja(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), o;
}
function kn(t) {
  return yi(t) && "ownerSVGElement" in t;
}
const ne = /* @__PURE__ */ new WeakMap();
let se;
const or = (t, e, n) => (s, i) => i && i[0] ? i[0][t + "Size"] : kn(s) && "getBBox" in s ? s.getBBox()[e] : s[n], Qa = /* @__PURE__ */ or("inline", "width", "offsetWidth"), tl = /* @__PURE__ */ or("block", "height", "offsetHeight");
function el({ target: t, borderBoxSize: e }) {
  ne.get(t)?.forEach((n) => {
    n(t, {
      get width() {
        return Qa(t, e);
      },
      get height() {
        return tl(t, e);
      }
    });
  });
}
function nl(t) {
  t.forEach(el);
}
function sl() {
  typeof ResizeObserver > "u" || (se = new ResizeObserver(nl));
}
function il(t, e) {
  se || sl();
  const n = Mn(t);
  return n.forEach((s) => {
    let i = ne.get(s);
    i || (i = /* @__PURE__ */ new Set(), ne.set(s, i)), i.add(e), se?.observe(s);
  }), () => {
    n.forEach((s) => {
      const i = ne.get(s);
      i?.delete(e), i?.size || se?.unobserve(s);
    });
  };
}
const ie = /* @__PURE__ */ new Set();
let xt;
function rl() {
  xt = () => {
    const t = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    ie.forEach((e) => e(t));
  }, window.addEventListener("resize", xt);
}
function ol(t) {
  return ie.add(t), xt || rl(), () => {
    ie.delete(t), !ie.size && typeof xt == "function" && (window.removeEventListener("resize", xt), xt = void 0);
  };
}
function al(t, e) {
  return typeof t == "function" ? ol(t) : il(t, e);
}
function ar(t, e) {
  let n;
  const s = () => {
    const { currentTime: i } = e, r = (i === null ? 0 : i.value) / 100;
    n !== r && t(r), n = r;
  };
  return P.preUpdate(s, !0), () => q(s);
}
function ll(t) {
  return kn(t) && t.tagName === "svg";
}
function cl(...t) {
  const e = !Array.isArray(t[0]), n = e ? 0 : -1, s = t[0 + n], i = t[1 + n], o = t[2 + n], r = t[3 + n], a = An(i, o, r);
  return e ? a(s) : a;
}
const F = (t) => !!(t && t.getVelocity), ul = [...Zi, N, rt], hl = (t) => ul.find(qi(t)), Rn = Dt({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function dl(t = !0) {
  const e = B(cn);
  if (e === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: s, register: i } = e, o = oo();
  ot(() => {
    if (t)
      return i(o);
  }, [t]);
  const r = on(() => t && s && s(o), [o, s, t]);
  return !n && s ? [!1, r] : [!0];
}
const lr = Dt({ strict: !1 }), ms = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, Pt = {};
for (const t in ms)
  Pt[t] = {
    isEnabled: (e) => ms[t].some((n) => !!e[n])
  };
function fl(t) {
  for (const e in t)
    Pt[e] = {
      ...Pt[e],
      ...t[e]
    };
}
const ml = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function he(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || ml.has(t);
}
let cr = (t) => !he(t);
function pl(t) {
  typeof t == "function" && (cr = (e) => e.startsWith("on") ? !he(e) : t(e));
}
try {
  pl(require("@emotion/is-prop-valid").default);
} catch {
}
function gl(t, e, n) {
  const s = {};
  for (const i in t)
    i === "values" && typeof t.values == "object" || (cr(i) || n === !0 && he(i) || !e && !he(i) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && i.startsWith("onDrag")) && (s[i] = t[i]);
  return s;
}
const ge = /* @__PURE__ */ Dt({});
function ye(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function $t(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Fn = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Bn = ["initial", ...Fn];
function xe(t) {
  return ye(t.animate) || Bn.some((e) => $t(t[e]));
}
function ur(t) {
  return !!(xe(t) || t.variants);
}
function yl(t, e) {
  if (xe(t)) {
    const { initial: n, animate: s } = t;
    return {
      initial: n === !1 || $t(n) ? n : void 0,
      animate: $t(s) ? s : void 0
    };
  }
  return t.inherit !== !1 ? e : {};
}
function xl(t) {
  const { initial: e, animate: n } = yl(t, B(ge));
  return me(() => ({ initial: e, animate: n }), [ps(e), ps(n)]);
}
function ps(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const zt = {};
function vl(t) {
  for (const e in t)
    zt[e] = t[e], yn(e) && (zt[e].isCSSVariable = !0);
}
function hr(t, { layout: e, layoutId: n }) {
  return Mt.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!zt[t] || t === "opacity");
}
const bl = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, wl = Vt.length;
function Tl(t, e, n) {
  let s = "", i = !0;
  for (let o = 0; o < wl; o++) {
    const r = Vt[o], a = t[r];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (r.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const u = er(a, Vn[r]);
      if (!l) {
        i = !1;
        const c = bl[r] || r;
        s += `${c}(${u}) `;
      }
      n && (e[r] = u);
    }
  }
  return s = s.trim(), n ? s = n(e, i ? "" : s) : i && (s = "none"), s;
}
function In(t, e, n) {
  const { style: s, vars: i, transformOrigin: o } = t;
  let r = !1, a = !1;
  for (const l in e) {
    const u = e[l];
    if (Mt.has(l)) {
      r = !0;
      continue;
    } else if (yn(l)) {
      i[l] = u;
      continue;
    } else {
      const c = er(u, Vn[l]);
      l.startsWith("origin") ? (a = !0, o[l] = c) : s[l] = c;
    }
  }
  if (e.transform || (r || n ? s.transform = Tl(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = o;
    s.transformOrigin = `${l} ${u} ${c}`;
  }
}
const On = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function dr(t, e, n) {
  for (const s in e)
    !F(e[s]) && !hr(s, n) && (t[s] = e[s]);
}
function Al({ transformTemplate: t }, e) {
  return me(() => {
    const n = On();
    return In(n, e, t), Object.assign({}, n.vars, n.style);
  }, [e]);
}
function Cl(t, e) {
  const n = t.style || {}, s = {};
  return dr(s, n, t), Object.assign(s, Al(t, e)), s;
}
function Sl(t, e) {
  const n = {}, s = Cl(t, e);
  return t.drag && t.dragListener !== !1 && (n.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0), n.style = s, n;
}
const Pl = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Dl = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function El(t, e, n = 1, s = 0, i = !0) {
  t.pathLength = 1;
  const o = i ? Pl : Dl;
  t[o.offset] = T.transform(-s);
  const r = T.transform(e), a = T.transform(n);
  t[o.array] = `${r} ${a}`;
}
function fr(t, {
  attrX: e,
  attrY: n,
  attrScale: s,
  pathLength: i,
  pathSpacing: o = 1,
  pathOffset: r = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, u, c) {
  if (In(t, a, u), l) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: h, style: f } = t;
  h.transform && (f.transform = h.transform, delete h.transform), (f.transform || h.transformOrigin) && (f.transformOrigin = h.transformOrigin ?? "50% 50%", delete h.transformOrigin), f.transform && (f.transformBox = c?.transformBox ?? "fill-box", delete h.transformBox), e !== void 0 && (h.x = e), n !== void 0 && (h.y = n), s !== void 0 && (h.scale = s), i !== void 0 && El(h, i, o, r, !1);
}
const mr = () => ({
  ...On(),
  attrs: {}
}), pr = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Vl(t, e, n, s) {
  const i = me(() => {
    const o = mr();
    return fr(o, e, pr(s), t.transformTemplate, t.style), {
      ...o.attrs,
      style: { ...o.style }
    };
  }, [e]);
  if (t.style) {
    const o = {};
    dr(o, t.style, t), i.style = { ...o, ...i.style };
  }
  return i;
}
const Ml = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function jn(t) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof t != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    t.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(Ml.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function Nl(t, e, n, { latestValues: s }, i, o = !1) {
  const a = (jn(t) ? Vl : Sl)(e, s, i, t), l = gl(e, typeof t == "string", o), u = t !== mi ? { ...l, ...a, ref: n } : {}, { children: c } = e, h = me(() => F(c) ? c.get() : c, [c]);
  return ae(t, {
    ...u,
    children: h
  });
}
function gs(t) {
  const e = [{}, {}];
  return t?.values.forEach((n, s) => {
    e[0][s] = n.get(), e[1][s] = n.getVelocity();
  }), e;
}
function _n(t, e, n, s) {
  if (typeof e == "function") {
    const [i, o] = gs(s);
    e = e(n !== void 0 ? n : t.custom, i, o);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [i, o] = gs(s);
    e = e(n !== void 0 ? n : t.custom, i, o);
  }
  return e;
}
function re(t) {
  return F(t) ? t.get() : t;
}
function Ll({ scrapeMotionValuesFromProps: t, createRenderState: e }, n, s, i) {
  return {
    latestValues: kl(n, s, i, t),
    renderState: e()
  };
}
function kl(t, e, n, s) {
  const i = {}, o = s(t, {});
  for (const f in o)
    i[f] = re(o[f]);
  let { initial: r, animate: a } = t;
  const l = xe(t), u = ur(t);
  e && u && !l && t.inherit !== !1 && (r === void 0 && (r = e.initial), a === void 0 && (a = e.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || r === !1;
  const h = c ? a : r;
  if (h && typeof h != "boolean" && !ye(h)) {
    const f = Array.isArray(h) ? h : [h];
    for (let m = 0; m < f.length; m++) {
      const g = _n(t, f[m]);
      if (g) {
        const { transitionEnd: b, transition: v, ...y } = g;
        for (const w in y) {
          let x = y[w];
          if (Array.isArray(x)) {
            const S = c ? x.length - 1 : 0;
            x = x[S];
          }
          x !== null && (i[w] = x);
        }
        for (const w in b)
          i[w] = b[w];
      }
    }
  }
  return i;
}
const gr = (t) => (e, n) => {
  const s = B(ge), i = B(cn), o = () => Ll(t, e, s, i);
  return n ? o() : pe(o);
};
function Wn(t, e, n) {
  const { style: s } = t, i = {};
  for (const o in s)
    (F(s[o]) || e.style && F(e.style[o]) || hr(o, t) || n?.getValue(o)?.liveStyle !== void 0) && (i[o] = s[o]);
  return i;
}
const Rl = /* @__PURE__ */ gr({
  scrapeMotionValuesFromProps: Wn,
  createRenderState: On
});
function yr(t, e, n) {
  const s = Wn(t, e, n);
  for (const i in t)
    if (F(t[i]) || F(e[i])) {
      const o = Vt.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      s[o] = t[i];
    }
  return s;
}
const Fl = /* @__PURE__ */ gr({
  scrapeMotionValuesFromProps: yr,
  createRenderState: mr
}), Bl = Symbol.for("motionComponentSymbol");
function vt(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function Il(t, e, n) {
  return on(
    (s) => {
      s && t.onMount && t.onMount(s), e && (s ? e.mount(s) : e.unmount()), n && (typeof n == "function" ? n(s) : vt(n) && (n.current = s));
    },
    /**
     * Include externalRef in dependencies to ensure the callback updates
     * when the ref changes, allowing proper ref forwarding.
     */
    [e]
  );
}
const Un = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), Ol = "framerAppearId", xr = "data-" + Un(Ol), vr = Dt({});
function jl(t, e, n, s, i) {
  const { visualElement: o } = B(ge), r = B(lr), a = B(cn), l = B(Rn).reducedMotion, u = it(null);
  s = s || r.renderer, !u.current && s && (u.current = s(t, {
    visualState: e,
    parent: o,
    props: n,
    presenceContext: a,
    blockInitialAnimation: a ? a.initial === !1 : !1,
    reducedMotionConfig: l
  }));
  const c = u.current, h = B(vr);
  c && !c.projection && i && (c.type === "html" || c.type === "svg") && _l(u.current, n, i, h);
  const f = it(!1);
  ao(() => {
    c && f.current && c.update(n, a);
  });
  const m = n[xr], g = it(!!m && !window.MotionHandoffIsComplete?.(m) && window.MotionHasOptimisedAnimation?.(m));
  return ln(() => {
    c && (f.current = !0, window.MotionIsMounted = !0, c.updateFeatures(), c.scheduleRenderMicrotask(), g.current && c.animationState && c.animationState.animateChanges());
  }), ot(() => {
    c && (!g.current && c.animationState && c.animationState.animateChanges(), g.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(m);
    }), g.current = !1), c.enteringChildren = void 0);
  }), c;
}
function _l(t, e, n, s) {
  const { layoutId: i, layout: o, drag: r, dragConstraints: a, layoutScroll: l, layoutRoot: u, layoutCrossfade: c } = e;
  t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : br(t.parent)), t.projection.setOptions({
    layoutId: i,
    layout: o,
    alwaysMeasureLayout: !!r || a && vt(a),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof o == "string" ? o : "both",
    initialPromotionConfig: s,
    crossfade: c,
    layoutScroll: l,
    layoutRoot: u
  });
}
function br(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : br(t.parent);
}
function Pe(t, { forwardMotionProps: e = !1 } = {}, n, s) {
  n && fl(n);
  const i = jn(t) ? Fl : Rl;
  function o(a, l) {
    let u;
    const c = {
      ...B(Rn),
      ...a,
      layoutId: Wl(a)
    }, { isStatic: h } = c, f = xl(a), m = i(a, h);
    if (!h && an) {
      Ul();
      const g = $l(c);
      u = g.MeasureLayout, f.visualElement = jl(t, m, c, s, g.ProjectionNode);
    }
    return p(ge.Provider, { value: f, children: [u && f.visualElement ? d(u, { visualElement: f.visualElement, ...c }) : null, Nl(t, a, Il(m, f.visualElement, l), m, h, e)] });
  }
  o.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const r = rn(o);
  return r[Bl] = t, r;
}
function Wl({ layoutId: t }) {
  const e = B(pi).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function Ul(t, e) {
  B(lr).strict;
}
function $l(t) {
  const { drag: e, layout: n } = Pt;
  if (!e && !n)
    return {};
  const s = { ...e, ...n };
  return {
    MeasureLayout: e?.isEnabled(t) || n?.isEnabled(t) ? s.MeasureLayout : void 0,
    ProjectionNode: s.ProjectionNode
  };
}
function zl(t, e) {
  if (typeof Proxy > "u")
    return Pe;
  const n = /* @__PURE__ */ new Map(), s = (o, r) => Pe(o, r, t, e), i = (o, r) => s(o, r);
  return new Proxy(i, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (o, r) => r === "create" ? s : (n.has(r) || n.set(r, Pe(r, void 0, t, e)), n.get(r))
  });
}
function wr({ top: t, left: e, right: n, bottom: s }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: s }
  };
}
function Hl({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function Kl(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), s = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: s.y,
    right: s.x
  };
}
function De(t) {
  return t === void 0 || t === 1;
}
function Xe({ scale: t, scaleX: e, scaleY: n }) {
  return !De(t) || !De(e) || !De(n);
}
function ut(t) {
  return Xe(t) || Tr(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function Tr(t) {
  return ys(t.x) || ys(t.y);
}
function ys(t) {
  return t && t !== "0%";
}
function de(t, e, n) {
  const s = t - n, i = e * s;
  return n + i;
}
function xs(t, e, n, s, i) {
  return i !== void 0 && (t = de(t, i, s)), de(t, n, s) + e;
}
function Je(t, e = 0, n = 1, s, i) {
  t.min = xs(t.min, e, n, s, i), t.max = xs(t.max, e, n, s, i);
}
function Ar(t, { x: e, y: n }) {
  Je(t.x, e.translate, e.scale, e.originPoint), Je(t.y, n.translate, n.scale, n.originPoint);
}
const vs = 0.999999999999, bs = 1.0000000000001;
function Gl(t, e, n, s = !1) {
  const i = n.length;
  if (!i)
    return;
  e.x = e.y = 1;
  let o, r;
  for (let a = 0; a < i; a++) {
    o = n[a], r = o.projectionDelta;
    const { visualElement: l } = o.options;
    l && l.props.style && l.props.style.display === "contents" || (s && o.options.layoutScroll && o.scroll && o !== o.root && wt(t, {
      x: -o.scroll.offset.x,
      y: -o.scroll.offset.y
    }), r && (e.x *= r.x.scale, e.y *= r.y.scale, Ar(t, r)), s && ut(o.latestValues) && wt(t, o.latestValues));
  }
  e.x < bs && e.x > vs && (e.x = 1), e.y < bs && e.y > vs && (e.y = 1);
}
function bt(t, e) {
  t.min = t.min + e, t.max = t.max + e;
}
function ws(t, e, n, s, i = 0.5) {
  const o = E(t.min, t.max, i);
  Je(t, e, n, o, s);
}
function wt(t, e) {
  ws(t.x, e.x, e.scaleX, e.scale, e.originX), ws(t.y, e.y, e.scaleY, e.scale, e.originY);
}
function Cr(t, e) {
  return wr(Kl(t.getBoundingClientRect(), e));
}
function Yl(t, e, n) {
  const s = Cr(t, n), { scroll: i } = e;
  return i && (bt(s.x, i.offset.x), bt(s.y, i.offset.y)), s;
}
const Ts = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Tt = () => ({
  x: Ts(),
  y: Ts()
}), As = () => ({ min: 0, max: 0 }), M = () => ({
  x: As(),
  y: As()
}), qe = { current: null }, Sr = { current: !1 };
function Xl() {
  if (Sr.current = !0, !!an)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => qe.current = t.matches;
      t.addEventListener("change", e), e();
    } else
      qe.current = !1;
}
const Jl = /* @__PURE__ */ new WeakMap();
function ql(t, e, n) {
  for (const s in e) {
    const i = e[s], o = n[s];
    if (F(i))
      t.addValue(s, i);
    else if (F(o))
      t.addValue(s, J(i, { owner: t }));
    else if (o !== i)
      if (t.hasValue(s)) {
        const r = t.getValue(s);
        r.liveStyle === !0 ? r.jump(i) : r.hasAnimated || r.set(i);
      } else {
        const r = t.getStaticValue(s);
        t.addValue(s, J(r !== void 0 ? r : i, { owner: t }));
      }
  }
  for (const s in n)
    e[s] === void 0 && t.removeValue(s);
  return e;
}
const Cs = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class Zl {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n, s) {
    return {};
  }
  constructor({ parent: e, props: n, presenceContext: s, reducedMotionConfig: i, blockInitialAnimation: o, visualState: r }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Dn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const f = _.now();
      this.renderScheduledAt < f && (this.renderScheduledAt = f, P.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u } = r;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = i, this.options = a, this.blockInitialAnimation = !!o, this.isControllingVariants = xe(n), this.isVariantNode = ur(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: c, ...h } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const f in h) {
      const m = h[f];
      l[f] !== void 0 && F(m) && m.set(l[f]);
    }
  }
  mount(e) {
    this.current = e, Jl.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), Sr.current || Xl(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : qe.current, this.parent?.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), q(this.notifyUpdate), q(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  addChild(e) {
    this.children.add(e), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(e);
  }
  removeChild(e) {
    this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
  }
  bindToMotionValue(e, n) {
    this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
    const s = Mt.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (r) => {
      this.latestValues[e] = r, this.props.onUpdate && P.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let o;
    window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      i(), o && o(), n.owner && n.stop();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in Pt) {
      const n = Pt[e];
      if (!n)
        continue;
      const { isEnabled: s, Feature: i } = n;
      if (!this.features[e] && i && s(this.props) && (this.features[e] = new i(this)), this.features[e]) {
        const o = this.features[e];
        o.isMounted ? o.update() : (o.mount(), o.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : M();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let s = 0; s < Cs.length; s++) {
      const i = Cs[s];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const o = "on" + i, r = e[o];
      r && (this.propEventSubscriptions[i] = this.on(i, r));
    }
    this.prevMotionValues = ql(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    const s = this.values.get(e);
    n !== s && (s && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let s = this.values.get(e);
    return s === void 0 && n !== void 0 && (s = J(n === null ? void 0 : n, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    let s = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return s != null && (typeof s == "string" && (gi(s) || xi(s)) ? s = parseFloat(s) : !hl(s) && rt.test(n) && (s = tr(e, n)), this.setBaseTarget(e, F(s) ? s.get() : s)), F(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    const { initial: n } = this.props;
    let s;
    if (typeof n == "string" || typeof n == "object") {
      const o = _n(this.props, n, this.presenceContext?.custom);
      o && (s = o[e]);
    }
    if (n && s !== void 0)
      return s;
    const i = this.getBaseTargetFromProps(this.props, e);
    return i !== void 0 && !F(i) ? i : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new fn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    Nn.render(this.render);
  }
}
class Pr extends Zl {
  constructor() {
    super(...arguments), this.KeyframeResolver = za;
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    return e.style ? e.style[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: s }) {
    delete n[e], delete s[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    F(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function Dr(t, { style: e, vars: n }, s, i) {
  const o = t.style;
  let r;
  for (r in e)
    o[r] = e[r];
  i?.applyProjectionStyles(o, s);
  for (r in n)
    o.setProperty(r, n[r]);
}
function Ql(t) {
  return window.getComputedStyle(t);
}
class tc extends Pr {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Dr;
  }
  readValueFromInstance(e, n) {
    if (Mt.has(n))
      return this.projection?.isProjecting ? Ue(n) : ua(e, n);
    {
      const s = Ql(e), i = (yn(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return Cr(e, n);
  }
  build(e, n, s) {
    In(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return Wn(e, n, s);
  }
}
const Er = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function ec(t, e, n, s) {
  Dr(t, e, void 0, s);
  for (const i in e.attrs)
    t.setAttribute(Er.has(i) ? i : Un(i), e.attrs[i]);
}
class nc extends Pr {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = M;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (Mt.has(n)) {
      const s = Qi(n);
      return s && s.default || 0;
    }
    return n = Er.has(n) ? n : Un(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return yr(e, n, s);
  }
  build(e, n, s) {
    fr(e, n, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, n, s, i) {
    ec(e, n, s, i);
  }
  mount(e) {
    this.isSVGTag = pr(e.tagName), super.mount(e);
  }
}
const sc = (t, e) => jn(t) ? new nc(e) : new tc(e, {
  allowProjection: t !== mi
});
function At(t, e, n) {
  const s = t.getProps();
  return _n(s, e, n !== void 0 ? n : s.custom, t);
}
const Ze = (t) => Array.isArray(t);
function ic(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, J(n));
}
function rc(t) {
  return Ze(t) ? t[t.length - 1] || 0 : t;
}
function oc(t, e) {
  const n = At(t, e);
  let { transitionEnd: s = {}, transition: i = {}, ...o } = n || {};
  o = { ...o, ...s };
  for (const r in o) {
    const a = rc(o[r]);
    ic(t, r, a);
  }
}
function ac(t) {
  return !!(F(t) && t.add);
}
function Qe(t, e) {
  const n = t.getValue("willChange");
  if (ac(n))
    return n.add(e);
  if (!n && nt.WillChange) {
    const s = new nt.WillChange("auto");
    t.addValue("willChange", s), s.add(e);
  }
}
function Vr(t) {
  return t.props[xr];
}
const lc = (t) => t !== null;
function cc(t, { repeat: e, repeatType: n = "loop" }, s) {
  const i = t.filter(lc), o = e && n !== "loop" && e % 2 === 1 ? 0 : i.length - 1;
  return i[o];
}
const uc = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, hc = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), dc = {
  type: "keyframes",
  duration: 0.8
}, fc = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, mc = (t, { keyframes: e }) => e.length > 2 ? dc : Mt.has(t) ? t.startsWith("scale") ? hc(e[1]) : uc : fc;
function pc({ when: t, delay: e, delayChildren: n, staggerChildren: s, staggerDirection: i, repeat: o, repeatType: r, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
const $n = (t, e, n, s = {}, i, o) => (r) => {
  const a = En(s, t) || {}, l = a.delay || s.delay || 0;
  let { elapsed: u = 0 } = s;
  u = u - /* @__PURE__ */ Q(l);
  const c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (f) => {
      e.set(f), a.onUpdate && a.onUpdate(f);
    },
    onComplete: () => {
      r(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: o ? void 0 : i
  };
  pc(a) || Object.assign(c, mc(t, c)), c.duration && (c.duration = /* @__PURE__ */ Q(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ Q(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let h = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (Ge(c), c.delay === 0 && (h = !0)), (nt.instantAnimations || nt.skipAnimations) && (h = !0, Ge(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, h && !o && e.get() !== void 0) {
    const f = cc(c.keyframes, a);
    if (f !== void 0) {
      P.update(() => {
        c.onUpdate(f), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Pn(c) : new La(c);
};
function gc({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function Mr(t, e, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  let { transition: o = t.getDefaultTransition(), transitionEnd: r, ...a } = e;
  s && (o = s);
  const l = [], u = i && t.animationState && t.animationState.getState()[i];
  for (const c in a) {
    const h = t.getValue(c, t.latestValues[c] ?? null), f = a[c];
    if (f === void 0 || u && gc(u, c))
      continue;
    const m = {
      delay: n,
      ...En(o || {}, c)
    }, g = h.get();
    if (g !== void 0 && !h.isAnimating && !Array.isArray(f) && f === g && !m.velocity)
      continue;
    let b = !1;
    if (window.MotionHandoffAnimation) {
      const y = Vr(t);
      if (y) {
        const w = window.MotionHandoffAnimation(y, c, P);
        w !== null && (m.startTime = w, b = !0);
      }
    }
    Qe(t, c), h.start($n(c, h, f, t.shouldReduceMotion && Ji.has(c) ? { type: !1 } : m, t, b));
    const v = h.animation;
    v && l.push(v);
  }
  return r && Promise.all(l).then(() => {
    P.update(() => {
      r && oc(t, r);
    });
  }), l;
}
function Nr(t, e, n, s = 0, i = 1) {
  const o = Array.from(t).sort((u, c) => u.sortNodePosition(c)).indexOf(e), r = t.size, a = (r - 1) * s;
  return typeof n == "function" ? n(o, r) : i === 1 ? o * s : a - o * s;
}
function tn(t, e, n = {}) {
  const s = At(t, e, n.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: i = t.getDefaultTransition() || {} } = s || {};
  n.transitionOverride && (i = n.transitionOverride);
  const o = s ? () => Promise.all(Mr(t, s, n)) : () => Promise.resolve(), r = t.variantChildren && t.variantChildren.size ? (l = 0) => {
    const { delayChildren: u = 0, staggerChildren: c, staggerDirection: h } = i;
    return yc(t, e, l, u, c, h, n);
  } : () => Promise.resolve(), { when: a } = i;
  if (a) {
    const [l, u] = a === "beforeChildren" ? [o, r] : [r, o];
    return l().then(() => u());
  } else
    return Promise.all([o(), r(n.delay)]);
}
function yc(t, e, n = 0, s = 0, i = 0, o = 1, r) {
  const a = [];
  for (const l of t.variantChildren)
    l.notify("AnimationStart", e), a.push(tn(l, e, {
      ...r,
      delay: n + (typeof s == "function" ? 0 : s) + Nr(t.variantChildren, l, s, i, o)
    }).then(() => l.notify("AnimationComplete", e)));
  return Promise.all(a);
}
function xc(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let s;
  if (Array.isArray(e)) {
    const i = e.map((o) => tn(t, o, n));
    s = Promise.all(i);
  } else if (typeof e == "string")
    s = tn(t, e, n);
  else {
    const i = typeof e == "function" ? At(t, e, n.custom) : e;
    s = Promise.all(Mr(t, i, n));
  }
  return s.then(() => {
    t.notify("AnimationComplete", e);
  });
}
function Lr(t, e) {
  if (!Array.isArray(e))
    return !1;
  const n = e.length;
  if (n !== t.length)
    return !1;
  for (let s = 0; s < n; s++)
    if (e[s] !== t[s])
      return !1;
  return !0;
}
const vc = Bn.length;
function kr(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const n = t.parent ? kr(t.parent) || {} : {};
    return t.props.initial !== void 0 && (n.initial = t.props.initial), n;
  }
  const e = {};
  for (let n = 0; n < vc; n++) {
    const s = Bn[n], i = t.props[s];
    ($t(i) || i === !1) && (e[s] = i);
  }
  return e;
}
const bc = [...Fn].reverse(), wc = Fn.length;
function Tc(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: s }) => xc(t, n, s)));
}
function Ac(t) {
  let e = Tc(t), n = Ss(), s = !0;
  const i = (l) => (u, c) => {
    const h = At(t, c, l === "exit" ? t.presenceContext?.custom : void 0);
    if (h) {
      const { transition: f, transitionEnd: m, ...g } = h;
      u = { ...u, ...g, ...m };
    }
    return u;
  };
  function o(l) {
    e = l(t);
  }
  function r(l) {
    const { props: u } = t, c = kr(t.parent) || {}, h = [], f = /* @__PURE__ */ new Set();
    let m = {}, g = 1 / 0;
    for (let v = 0; v < wc; v++) {
      const y = bc[v], w = n[y], x = u[y] !== void 0 ? u[y] : c[y], S = $t(x), A = y === l ? w.isActive : null;
      A === !1 && (g = v);
      let D = x === c[y] && x !== u[y] && S;
      if (D && s && t.manuallyAnimateOnMount && (D = !1), w.protectedKeys = { ...m }, // If it isn't active and hasn't *just* been set as inactive
      !w.isActive && A === null || // If we didn't and don't have any defined prop for this animation type
      !x && !w.prevProp || // Or if the prop doesn't define an animation
      ye(x) || typeof x == "boolean")
        continue;
      const L = Cc(w.prevProp, x);
      let C = L || // If we're making this variant active, we want to always make it active
      y === l && w.isActive && !D && S || // If we removed a higher-priority variant (i is in reverse order)
      v > g && S, O = !1;
      const $ = Array.isArray(x) ? x : [x];
      let pt = $.reduce(i(y), {});
      A === !1 && (pt = {});
      const { prevResolvedValues: Kn = {} } = w, no = {
        ...Kn,
        ...pt
      }, Gn = (R) => {
        C = !0, f.has(R) && (O = !0, f.delete(R)), w.needsAnimating[R] = !0;
        const z = t.getValue(R);
        z && (z.liveStyle = !1);
      };
      for (const R in no) {
        const z = pt[R], lt = Kn[R];
        if (m.hasOwnProperty(R))
          continue;
        let gt = !1;
        Ze(z) && Ze(lt) ? gt = !Lr(z, lt) : gt = z !== lt, gt ? z != null ? Gn(R) : f.add(R) : z !== void 0 && f.has(R) ? Gn(R) : w.protectedKeys[R] = !0;
      }
      w.prevProp = x, w.prevResolvedValues = pt, w.isActive && (m = { ...m, ...pt }), s && t.blockInitialAnimation && (C = !1);
      const Yn = D && L;
      C && (!Yn || O) && h.push(...$.map((R) => {
        const z = { type: y };
        if (typeof R == "string" && s && !Yn && t.manuallyAnimateOnMount && t.parent) {
          const { parent: lt } = t, gt = At(lt, R);
          if (lt.enteringChildren && gt) {
            const { delayChildren: so } = gt.transition || {};
            z.delay = Nr(lt.enteringChildren, t, so);
          }
        }
        return {
          animation: R,
          options: z
        };
      }));
    }
    if (f.size) {
      const v = {};
      if (typeof u.initial != "boolean") {
        const y = At(t, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        y && y.transition && (v.transition = y.transition);
      }
      f.forEach((y) => {
        const w = t.getBaseTarget(y), x = t.getValue(y);
        x && (x.liveStyle = !0), v[y] = w ?? null;
      }), h.push({ animation: v });
    }
    let b = !!h.length;
    return s && (u.initial === !1 || u.initial === u.animate) && !t.manuallyAnimateOnMount && (b = !1), s = !1, b ? e(h) : Promise.resolve();
  }
  function a(l, u) {
    if (n[l].isActive === u)
      return Promise.resolve();
    t.variantChildren?.forEach((h) => h.animationState?.setActive(l, u)), n[l].isActive = u;
    const c = r(l);
    for (const h in n)
      n[h].protectedKeys = {};
    return c;
  }
  return {
    animateChanges: r,
    setActive: a,
    setAnimateFunction: o,
    getState: () => n,
    reset: () => {
      n = Ss();
    }
  };
}
function Cc(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !Lr(e, t) : !1;
}
function ct(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Ss() {
  return {
    animate: ct(!0),
    whileInView: ct(),
    whileHover: ct(),
    whileTap: ct(),
    whileDrag: ct(),
    whileFocus: ct(),
    exit: ct()
  };
}
class at {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
class Sc extends at {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = Ac(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    ye(e) && (this.unmountControls = e.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let Pc = 0;
class Dc extends at {
  constructor() {
    super(...arguments), this.id = Pc++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: e, onExitComplete: n } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === s)
      return;
    const i = this.node.animationState.setActive("exit", !e);
    n && !e && i.then(() => {
      n(this.id);
    });
  }
  mount() {
    const { register: e, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), e && (this.unmount = e(this.id));
  }
  unmount() {
  }
}
const Ec = {
  animation: {
    Feature: Sc
  },
  exit: {
    Feature: Dc
  }
};
function Ht(t, e, n, s = { passive: !0 }) {
  return t.addEventListener(e, n, s), () => t.removeEventListener(e, n);
}
function Xt(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
const Vc = (t) => (e) => Ln(e) && t(e, Xt(e));
function It(t, e, n, s) {
  return Ht(t, e, Vc(n), s);
}
const Rr = 1e-4, Mc = 1 - Rr, Nc = 1 + Rr, Fr = 0.01, Lc = 0 - Fr, kc = 0 + Fr;
function I(t) {
  return t.max - t.min;
}
function Rc(t, e, n) {
  return Math.abs(t - e) <= n;
}
function Ps(t, e, n, s = 0.5) {
  t.origin = s, t.originPoint = E(e.min, e.max, t.origin), t.scale = I(n) / I(e), t.translate = E(n.min, n.max, t.origin) - t.originPoint, (t.scale >= Mc && t.scale <= Nc || isNaN(t.scale)) && (t.scale = 1), (t.translate >= Lc && t.translate <= kc || isNaN(t.translate)) && (t.translate = 0);
}
function Ot(t, e, n, s) {
  Ps(t.x, e.x, n.x, s ? s.originX : void 0), Ps(t.y, e.y, n.y, s ? s.originY : void 0);
}
function Ds(t, e, n) {
  t.min = n.min + e.min, t.max = t.min + I(e);
}
function Fc(t, e, n) {
  Ds(t.x, e.x, n.x), Ds(t.y, e.y, n.y);
}
function Es(t, e, n) {
  t.min = e.min - n.min, t.max = t.min + I(e);
}
function jt(t, e, n) {
  Es(t.x, e.x, n.x), Es(t.y, e.y, n.y);
}
function K(t) {
  return [t("x"), t("y")];
}
const Br = ({ current: t }) => t ? t.ownerDocument.defaultView : null, Vs = (t, e) => Math.abs(t - e);
function Bc(t, e) {
  const n = Vs(t.x, e.x), s = Vs(t.y, e.y);
  return Math.sqrt(n ** 2 + s ** 2);
}
class Ir {
  constructor(e, n, { transformPagePoint: s, contextWindow: i = window, dragSnapToOrigin: o = !1, distanceThreshold: r = 3 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const f = Ve(this.lastMoveEventInfo, this.history), m = this.startEvent !== null, g = Bc(f.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!m && !g)
        return;
      const { point: b } = f, { timestamp: v } = k;
      this.history.push({ ...b, timestamp: v });
      const { onStart: y, onMove: w } = this.handlers;
      m || (y && y(this.lastMoveEvent, f), this.startEvent = this.lastMoveEvent), w && w(this.lastMoveEvent, f);
    }, this.handlePointerMove = (f, m) => {
      this.lastMoveEvent = f, this.lastMoveEventInfo = Ee(m, this.transformPagePoint), P.update(this.updatePoint, !0);
    }, this.handlePointerUp = (f, m) => {
      this.end();
      const { onEnd: g, onSessionEnd: b, resumeAnimation: v } = this.handlers;
      if (this.dragSnapToOrigin && v && v(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const y = Ve(f.type === "pointercancel" ? this.lastMoveEventInfo : Ee(m, this.transformPagePoint), this.history);
      this.startEvent && g && g(f, y), b && b(f, y);
    }, !Ln(e))
      return;
    this.dragSnapToOrigin = o, this.handlers = n, this.transformPagePoint = s, this.distanceThreshold = r, this.contextWindow = i || window;
    const a = Xt(e), l = Ee(a, this.transformPagePoint), { point: u } = l, { timestamp: c } = k;
    this.history = [{ ...u, timestamp: c }];
    const { onSessionStart: h } = n;
    h && h(e, Ve(l, this.history)), this.removeListeners = Kt(It(this.contextWindow, "pointermove", this.handlePointerMove), It(this.contextWindow, "pointerup", this.handlePointerUp), It(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), q(this.updatePoint);
  }
}
function Ee(t, e) {
  return e ? { point: e(t.point) } : t;
}
function Ms(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function Ve({ point: t }, e) {
  return {
    point: t,
    delta: Ms(t, Or(e)),
    offset: Ms(t, Ic(e)),
    velocity: Oc(e, 0.1)
  };
}
function Ic(t) {
  return t[0];
}
function Or(t) {
  return t[t.length - 1];
}
function Oc(t, e) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let n = t.length - 1, s = null;
  const i = Or(t);
  for (; n >= 0 && (s = t[n], !(i.timestamp - s.timestamp > /* @__PURE__ */ Q(e))); )
    n--;
  if (!s)
    return { x: 0, y: 0 };
  const o = /* @__PURE__ */ G(i.timestamp - s.timestamp);
  if (o === 0)
    return { x: 0, y: 0 };
  const r = {
    x: (i.x - s.x) / o,
    y: (i.y - s.y) / o
  };
  return r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r;
}
function jc(t, { min: e, max: n }, s) {
  return e !== void 0 && t < e ? t = s ? E(e, t, s.min) : Math.max(t, e) : n !== void 0 && t > n && (t = s ? E(n, t, s.max) : Math.min(t, n)), t;
}
function Ns(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
  };
}
function _c(t, { top: e, left: n, bottom: s, right: i }) {
  return {
    x: Ns(t.x, n, i),
    y: Ns(t.y, e, s)
  };
}
function Ls(t, e) {
  let n = e.min - t.min, s = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, s] = [s, n]), { min: n, max: s };
}
function Wc(t, e) {
  return {
    x: Ls(t.x, e.x),
    y: Ls(t.y, e.y)
  };
}
function Uc(t, e) {
  let n = 0.5;
  const s = I(t), i = I(e);
  return i > s ? n = /* @__PURE__ */ St(e.min, e.max - s, t.min) : s > i && (n = /* @__PURE__ */ St(t.min, t.max - i, e.min)), et(0, 1, n);
}
function $c(t, e) {
  const n = {};
  return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n;
}
const en = 0.35;
function zc(t = en) {
  return t === !1 ? t = 0 : t === !0 && (t = en), {
    x: ks(t, "left", "right"),
    y: ks(t, "top", "bottom")
  };
}
function ks(t, e, n) {
  return {
    min: Rs(t, e),
    max: Rs(t, n)
  };
}
function Rs(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const Hc = /* @__PURE__ */ new WeakMap();
class Kc {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = M(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: n = !1, distanceThreshold: s } = {}) {
    const { presenceContext: i } = this.visualElement;
    if (i && i.isPresent === !1)
      return;
    const o = (h) => {
      const { dragSnapToOrigin: f } = this.getProps();
      f ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(Xt(h).point);
    }, r = (h, f) => {
      const { drag: m, dragPropagation: g, onDragStart: b } = this.getProps();
      if (m && !g && (this.openDragLock && this.openDragLock(), this.openDragLock = Ga(m), !this.openDragLock))
        return;
      this.latestPointerEvent = h, this.latestPanInfo = f, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), K((y) => {
        let w = this.getAxisMotionValue(y).get() || 0;
        if (tt.test(w)) {
          const { projection: x } = this.visualElement;
          if (x && x.layout) {
            const S = x.layout.layoutBox[y];
            S && (w = I(S) * (parseFloat(w) / 100));
          }
        }
        this.originPoint[y] = w;
      }), b && P.postRender(() => b(h, f)), Qe(this.visualElement, "transform");
      const { animationState: v } = this.visualElement;
      v && v.setActive("whileDrag", !0);
    }, a = (h, f) => {
      this.latestPointerEvent = h, this.latestPanInfo = f;
      const { dragPropagation: m, dragDirectionLock: g, onDirectionLock: b, onDrag: v } = this.getProps();
      if (!m && !this.openDragLock)
        return;
      const { offset: y } = f;
      if (g && this.currentDirection === null) {
        this.currentDirection = Gc(y), this.currentDirection !== null && b && b(this.currentDirection);
        return;
      }
      this.updateAxis("x", f.point, y), this.updateAxis("y", f.point, y), this.visualElement.render(), v && v(h, f);
    }, l = (h, f) => {
      this.latestPointerEvent = h, this.latestPanInfo = f, this.stop(h, f), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, u = () => K((h) => this.getAnimationState(h) === "paused" && this.getAxisMotionValue(h).animation?.play()), { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new Ir(e, {
      onSessionStart: o,
      onStart: r,
      onMove: a,
      onSessionEnd: l,
      resumeAnimation: u
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: c,
      distanceThreshold: s,
      contextWindow: Br(this.visualElement)
    });
  }
  /**
   * @internal
   */
  stop(e, n) {
    const s = e || this.latestPointerEvent, i = n || this.latestPanInfo, o = this.isDragging;
    if (this.cancel(), !o || !i || !s)
      return;
    const { velocity: r } = i;
    this.startAnimation(r);
    const { onDragEnd: a } = this.getProps();
    a && P.postRender(() => a(s, i));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    e && (e.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const { dragPropagation: s } = this.getProps();
    !s && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  updateAxis(e, n, s) {
    const { drag: i } = this.getProps();
    if (!s || !Zt(e, i, this.currentDirection))
      return;
    const o = this.getAxisMotionValue(e);
    let r = this.originPoint[e] + s[e];
    this.constraints && this.constraints[e] && (r = jc(r, this.constraints[e], this.elastic[e])), o.set(r);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: n } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, i = this.constraints;
    e && vt(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && s ? this.constraints = _c(s.layoutBox, e) : this.constraints = !1, this.elastic = zc(n), i !== this.constraints && s && this.constraints && !this.hasMutatedConstraints && K((o) => {
      this.constraints !== !1 && this.getAxisMotionValue(o) && (this.constraints[o] = $c(s.layoutBox[o], this.constraints[o]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !vt(e))
      return !1;
    const s = e.current, { projection: i } = this.visualElement;
    if (!i || !i.layout)
      return !1;
    const o = Yl(s, i.root, this.visualElement.getTransformPagePoint());
    let r = Wc(i.layout.layoutBox, o);
    if (n) {
      const a = n(Hl(r));
      this.hasMutatedConstraints = !!a, a && (r = wr(a));
    }
    return r;
  }
  startAnimation(e) {
    const { drag: n, dragMomentum: s, dragElastic: i, dragTransition: o, dragSnapToOrigin: r, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, u = K((c) => {
      if (!Zt(c, n, this.currentDirection))
        return;
      let h = l && l[c] || {};
      r && (h = { min: 0, max: 0 });
      const f = i ? 200 : 1e6, m = i ? 40 : 1e7, g = {
        type: "inertia",
        velocity: s ? e[c] : 0,
        bounceStiffness: f,
        bounceDamping: m,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...o,
        ...h
      };
      return this.startAxisValueAnimation(c, g);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(e, n) {
    const s = this.getAxisMotionValue(e);
    return Qe(this.visualElement, e), s.start($n(e, s, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    K((e) => this.getAxisMotionValue(e).stop());
  }
  pauseAnimation() {
    K((e) => this.getAxisMotionValue(e).animation?.pause());
  }
  getAnimationState(e) {
    return this.getAxisMotionValue(e).animation?.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(e) {
    const n = `_drag${e.toUpperCase()}`, s = this.visualElement.getProps(), i = s[n];
    return i || this.visualElement.getValue(e, (s.initial ? s.initial[e] : void 0) || 0);
  }
  snapToCursor(e) {
    K((n) => {
      const { drag: s } = this.getProps();
      if (!Zt(n, s, this.currentDirection))
        return;
      const { projection: i } = this.visualElement, o = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: r, max: a } = i.layout.layoutBox[n];
        o.set(e[n] - E(r, a, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: e, dragConstraints: n } = this.getProps(), { projection: s } = this.visualElement;
    if (!vt(n) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    K((r) => {
      const a = this.getAxisMotionValue(r);
      if (a && this.constraints !== !1) {
        const l = a.get();
        i[r] = Uc({ min: l, max: l }, this.constraints[r]);
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    this.visualElement.current.style.transform = o ? o({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.resolveConstraints(), K((r) => {
      if (!Zt(r, e, null))
        return;
      const a = this.getAxisMotionValue(r), { min: l, max: u } = this.constraints[r];
      a.set(E(l, u, i[r]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Hc.set(this.visualElement, this);
    const e = this.visualElement.current, n = It(e, "pointerdown", (l) => {
      const { drag: u, dragListener: c = !0 } = this.getProps();
      u && c && this.start(l);
    }), s = () => {
      const { dragConstraints: l } = this.getProps();
      vt(l) && l.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: i } = this.visualElement, o = i.addEventListener("measure", s);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), P.read(s);
    const r = Ht(window, "resize", () => this.scalePositionWithinConstraints()), a = i.addEventListener("didUpdate", (({ delta: l, hasLayoutChanged: u }) => {
      this.isDragging && u && (K((c) => {
        const h = this.getAxisMotionValue(c);
        h && (this.originPoint[c] += l[c].translate, h.set(h.get() + l[c].translate));
      }), this.visualElement.render());
    }));
    return () => {
      r(), n(), o(), a && a();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: s = !1, dragPropagation: i = !1, dragConstraints: o = !1, dragElastic: r = en, dragMomentum: a = !0 } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: s,
      dragPropagation: i,
      dragConstraints: o,
      dragElastic: r,
      dragMomentum: a
    };
  }
}
function Zt(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function Gc(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n;
}
class Yc extends at {
  constructor(e) {
    super(e), this.removeGroupControls = W, this.removeListeners = W, this.controls = new Kc(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || W;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const Fs = (t) => (e, n) => {
  t && P.postRender(() => t(e, n));
};
class Xc extends at {
  constructor() {
    super(...arguments), this.removePointerDownListener = W;
  }
  onPointerDown(e) {
    this.session = new Ir(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Br(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: s, onPanEnd: i } = this.node.getProps();
    return {
      onSessionStart: Fs(e),
      onStart: Fs(n),
      onMove: s,
      onEnd: (o, r) => {
        delete this.session, i && P.postRender(() => i(o, r));
      }
    };
  }
  mount() {
    this.removePointerDownListener = It(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const oe = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
};
function Bs(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const Nt = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (T.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = Bs(t, e.target.x), s = Bs(t, e.target.y);
    return `${n}% ${s}%`;
  }
}, Jc = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const s = t, i = rt.parse(t);
    if (i.length > 5)
      return s;
    const o = rt.createTransformer(t), r = typeof i[0] != "number" ? 1 : 0, a = n.x.scale * e.x, l = n.y.scale * e.y;
    i[0 + r] /= a, i[1 + r] /= l;
    const u = E(a, l, 0.5);
    return typeof i[2 + r] == "number" && (i[2 + r] /= u), typeof i[3 + r] == "number" && (i[3 + r] /= u), o(i);
  }
};
let Me = !1;
class qc extends ro {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: s, layoutId: i } = this.props, { projection: o } = e;
    vl(Zc), o && (n.group && n.group.add(o), s && s.register && i && s.register(o), Me && o.root.didUpdate(), o.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), o.setOptions({
      ...o.options,
      onExitComplete: () => this.safeToRemove()
    })), oe.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: s, drag: i, isPresent: o } = this.props, { projection: r } = s;
    return r && (r.isPresent = o, Me = !0, i || e.layoutDependency !== n || n === void 0 || e.isPresent !== o ? r.willUpdate() : this.safeToRemove(), e.isPresent !== o && (o ? r.promote() : r.relegate() || P.postRender(() => {
      const a = r.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e && (e.root.didUpdate(), Nn.postRender(() => {
      !e.currentAnimation && e.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: s } = this.props, { projection: i } = e;
    Me = !0, i && (i.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(i), s && s.deregister && s.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function jr(t) {
  const [e, n] = dl(), s = B(pi);
  return d(qc, { ...t, layoutGroup: s, switchLayoutGroup: B(vr), isPresent: e, safeToRemove: n });
}
const Zc = {
  borderRadius: {
    ...Nt,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Nt,
  borderTopRightRadius: Nt,
  borderBottomLeftRadius: Nt,
  borderBottomRightRadius: Nt,
  boxShadow: Jc
};
function Qc(t, e, n) {
  const s = F(t) ? t : J(t);
  return s.start($n("", s, e, n)), s.animation;
}
const tu = (t, e) => t.depth - e.depth;
class eu {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    un(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    hn(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(tu), this.isDirty = !1, this.children.forEach(e);
  }
}
function nu(t, e) {
  const n = _.now(), s = ({ timestamp: i }) => {
    const o = i - n;
    o >= e && (q(s), t(o - e));
  };
  return P.setup(s, !0), () => q(s);
}
const _r = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], su = _r.length, Is = (t) => typeof t == "string" ? parseFloat(t) : t, Os = (t) => typeof t == "number" || T.test(t);
function iu(t, e, n, s, i, o) {
  i ? (t.opacity = E(0, n.opacity ?? 1, ru(s)), t.opacityExit = E(e.opacity ?? 1, 0, ou(s))) : o && (t.opacity = E(e.opacity ?? 1, n.opacity ?? 1, s));
  for (let r = 0; r < su; r++) {
    const a = `border${_r[r]}Radius`;
    let l = js(e, a), u = js(n, a);
    if (l === void 0 && u === void 0)
      continue;
    l || (l = 0), u || (u = 0), l === 0 || u === 0 || Os(l) === Os(u) ? (t[a] = Math.max(E(Is(l), Is(u), s), 0), (tt.test(u) || tt.test(l)) && (t[a] += "%")) : t[a] = u;
  }
  (e.rotate || n.rotate) && (t.rotate = E(e.rotate || 0, n.rotate || 0, s));
}
function js(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const ru = /* @__PURE__ */ Wr(0, 0.5, Si), ou = /* @__PURE__ */ Wr(0.5, 0.95, W);
function Wr(t, e, n) {
  return (s) => s < t ? 0 : s > e ? 1 : n(/* @__PURE__ */ St(t, e, s));
}
function _s(t, e) {
  t.min = e.min, t.max = e.max;
}
function H(t, e) {
  _s(t.x, e.x), _s(t.y, e.y);
}
function Ws(t, e) {
  t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin;
}
function Us(t, e, n, s, i) {
  return t -= e, t = de(t, 1 / n, s), i !== void 0 && (t = de(t, 1 / i, s)), t;
}
function au(t, e = 0, n = 1, s = 0.5, i, o = t, r = t) {
  if (tt.test(e) && (e = parseFloat(e), e = E(r.min, r.max, e / 100) - r.min), typeof e != "number")
    return;
  let a = E(o.min, o.max, s);
  t === o && (a -= e), t.min = Us(t.min, e, n, a, i), t.max = Us(t.max, e, n, a, i);
}
function $s(t, e, [n, s, i], o, r) {
  au(t, e[n], e[s], e[i], e.scale, o, r);
}
const lu = ["x", "scaleX", "originX"], cu = ["y", "scaleY", "originY"];
function zs(t, e, n, s) {
  $s(t.x, e, lu, n ? n.x : void 0, s ? s.x : void 0), $s(t.y, e, cu, n ? n.y : void 0, s ? s.y : void 0);
}
function Hs(t) {
  return t.translate === 0 && t.scale === 1;
}
function Ur(t) {
  return Hs(t.x) && Hs(t.y);
}
function Ks(t, e) {
  return t.min === e.min && t.max === e.max;
}
function uu(t, e) {
  return Ks(t.x, e.x) && Ks(t.y, e.y);
}
function Gs(t, e) {
  return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
}
function $r(t, e) {
  return Gs(t.x, e.x) && Gs(t.y, e.y);
}
function Ys(t) {
  return I(t.x) / I(t.y);
}
function Xs(t, e) {
  return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint;
}
class hu {
  constructor() {
    this.members = [];
  }
  add(e) {
    un(this.members, e), e.scheduleRender();
  }
  remove(e) {
    if (hn(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    const n = this.members.findIndex((i) => e === i);
    if (n === 0)
      return !1;
    let s;
    for (let i = n; i >= 0; i--) {
      const o = this.members[i];
      if (o.isPresent !== !1) {
        s = o;
        break;
      }
    }
    return s ? (this.promote(s), !0) : !1;
  }
  promote(e, n) {
    const s = this.lead;
    if (e !== s && (this.prevLead = s, this.lead = e, e.show(), s)) {
      s.instance && s.scheduleRender(), e.scheduleRender(), e.resumeFrom = s, n && (e.resumeFrom.preserveOpacity = !0), s.snapshot && (e.snapshot = s.snapshot, e.snapshot.latestValues = s.animationValues || s.latestValues), e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
      const { crossfade: i } = e.options;
      i === !1 && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      const { options: n, resumingFrom: s } = e;
      n.onExitComplete && n.onExitComplete(), s && s.options.onExitComplete && s.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function du(t, e, n) {
  let s = "";
  const i = t.x.translate / e.x, o = t.y.translate / e.y, r = n?.z || 0;
  if ((i || o || r) && (s = `translate3d(${i}px, ${o}px, ${r}px) `), (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
    const { transformPerspective: u, rotate: c, rotateX: h, rotateY: f, skewX: m, skewY: g } = n;
    u && (s = `perspective(${u}px) ${s}`), c && (s += `rotate(${c}deg) `), h && (s += `rotateX(${h}deg) `), f && (s += `rotateY(${f}deg) `), m && (s += `skewX(${m}deg) `), g && (s += `skewY(${g}deg) `);
  }
  const a = t.x.scale * e.x, l = t.y.scale * e.y;
  return (a !== 1 || l !== 1) && (s += `scale(${a}, ${l})`), s || "none";
}
const Ne = ["", "X", "Y", "Z"], fu = 1e3;
let mu = 0;
function Le(t, e, n, s) {
  const { latestValues: i } = e;
  i[t] && (n[t] = i[t], e.setStaticValue(t, 0), s && (s[t] = 0));
}
function zr(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: e } = t.options;
  if (!e)
    return;
  const n = Vr(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: o } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", P, !(i || o));
  }
  const { parent: s } = t;
  s && !s.hasCheckedOptimisedAppear && zr(s);
}
function Hr({ attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: s, resetTransform: i }) {
  return class {
    constructor(r = {}, a = e?.()) {
      this.id = mu++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(yu), this.nodes.forEach(wu), this.nodes.forEach(Tu), this.nodes.forEach(xu);
      }, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = r, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new eu());
    }
    addEventListener(r, a) {
      return this.eventHandlers.has(r) || this.eventHandlers.set(r, new fn()), this.eventHandlers.get(r).add(a);
    }
    notifyListeners(r, ...a) {
      const l = this.eventHandlers.get(r);
      l && l.notify(...a);
    }
    hasListeners(r) {
      return this.eventHandlers.has(r);
    }
    /**
     * Lifecycles
     */
    mount(r) {
      if (this.instance)
        return;
      this.isSVG = kn(r) && !ll(r), this.instance = r;
      const { layoutId: a, layout: l, visualElement: u } = this.options;
      if (u && !u.current && u.mount(r), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), t) {
        let c, h = 0;
        const f = () => this.root.updateBlockedByResize = !1;
        P.read(() => {
          h = window.innerWidth;
        }), t(r, () => {
          const m = window.innerWidth;
          m !== h && (h = m, this.root.updateBlockedByResize = !0, c && c(), c = nu(f, 250), oe.hasAnimatedSinceResize && (oe.hasAnimatedSinceResize = !1, this.nodes.forEach(Zs)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && u && (a || l) && this.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: h, hasRelativeLayoutChanged: f, layout: m }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const g = this.options.transition || u.getDefaultTransition() || Du, { onLayoutAnimationStart: b, onLayoutAnimationComplete: v } = u.getProps(), y = !this.targetLayout || !$r(this.targetLayout, m), w = !h && f;
        if (this.options.layoutRoot || this.resumeFrom || w || h && (y || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const x = {
            ...En(g, "layout"),
            onPlay: b,
            onComplete: v
          };
          (u.shouldReduceMotion || this.options.layoutRoot) && (x.delay = 0, x.type = !1), this.startAnimation(x), this.setAnimationOrigin(c, w);
        } else
          h || Zs(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = m;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const r = this.getStack();
      r && r.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), q(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(Au), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: r } = this.options;
      return r && r.getProps().transformTemplate;
    }
    willUpdate(r = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && zr(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const h = this.path[c];
        h.shouldResetTransform = !0, h.updateScroll("snapshot"), h.options.layoutRoot && h.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l)
        return;
      const u = this.getTransformTemplate();
      this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), r && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Js);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(qs);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(bu), this.nodes.forEach(pu), this.nodes.forEach(gu)) : this.nodes.forEach(qs), this.clearAllSnapshots();
      const a = _.now();
      k.delta = et(0, 1e3 / 60, a - k.timestamp), k.timestamp = a, k.isProcessing = !0, be.update.process(k), be.preRender.process(k), be.render.process(k), k.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Nn.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(vu), this.sharedNodes.forEach(Cu);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, P.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      P.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !I(this.snapshot.measuredBox.x) && !I(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const r = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = M(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, r ? r.layoutBox : void 0);
    }
    updateScroll(r = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === r && (a = !1), a && this.instance) {
        const l = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: r,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l
        };
      }
    }
    resetTransform() {
      if (!i)
        return;
      const r = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !Ur(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, c = u !== this.prevTransformTemplateValue;
      r && this.instance && (a || ut(this.latestValues) || c) && (i(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(r = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return r && (l = this.removeTransform(l)), Eu(l), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: l,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: r } = this.options;
      if (!r)
        return M();
      const a = r.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(Vu))) {
        const { scroll: u } = this.root;
        u && (bt(a.x, u.offset.x), bt(a.y, u.offset.y));
      }
      return a;
    }
    removeElementScroll(r) {
      const a = M();
      if (H(a, r), this.scroll?.wasRoot)
        return a;
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l], { scroll: c, options: h } = u;
        u !== this.root && c && h.layoutScroll && (c.wasRoot && H(a, r), bt(a.x, c.offset.x), bt(a.y, c.offset.y));
      }
      return a;
    }
    applyTransform(r, a = !1) {
      const l = M();
      H(l, r);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a && c.options.layoutScroll && c.scroll && c !== c.root && wt(l, {
          x: -c.scroll.offset.x,
          y: -c.scroll.offset.y
        }), ut(c.latestValues) && wt(l, c.latestValues);
      }
      return ut(this.latestValues) && wt(l, this.latestValues), l;
    }
    removeTransform(r) {
      const a = M();
      H(a, r);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !ut(u.latestValues))
          continue;
        Xe(u.latestValues) && u.updateSnapshot();
        const c = M(), h = u.measurePageBox();
        H(c, h), zs(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return ut(this.latestValues) && zs(a, this.latestValues), a;
    }
    setTargetDelta(r) {
      this.targetDelta = r, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(r) {
      this.options = {
        ...this.options,
        ...r,
        crossfade: r.crossfade !== void 0 ? r.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== k.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(r = !1) {
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== a;
      if (!(r || l && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: c, layoutId: h } = this.options;
      if (!(!this.layout || !(c || h))) {
        if (this.resolvedRelativeTargetAt = k.timestamp, !this.targetDelta && !this.relativeTarget) {
          const f = this.getClosestProjectingParent();
          f && f.layout && this.animationProgress !== 1 ? (this.relativeParent = f, this.forceRelativeParentToResolveTarget(), this.relativeTarget = M(), this.relativeTargetOrigin = M(), jt(this.relativeTargetOrigin, this.layout.layoutBox, f.layout.layoutBox), H(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = M(), this.targetWithTransforms = M()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), Fc(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : H(this.target, this.layout.layoutBox), Ar(this.target, this.targetDelta)) : H(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget)) {
          this.attemptToResolveRelativeTarget = !1;
          const f = this.getClosestProjectingParent();
          f && !!f.resumingFrom == !!this.resumingFrom && !f.options.layoutScroll && f.target && this.animationProgress !== 1 ? (this.relativeParent = f, this.forceRelativeParentToResolveTarget(), this.relativeTarget = M(), this.relativeTargetOrigin = M(), jt(this.relativeTargetOrigin, this.target, f.target), H(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Xe(this.parent.latestValues) || Tr(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      const r = this.getLead(), a = !!this.resumingFrom || this !== r;
      let l = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (l = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === k.timestamp && (l = !1), l)
        return;
      const { layout: u, layoutId: c } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || c))
        return;
      H(this.layoutCorrected, this.layout.layoutBox);
      const h = this.treeScale.x, f = this.treeScale.y;
      Gl(this.layoutCorrected, this.treeScale, this.path, a), r.layout && !r.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (r.target = r.layout.layoutBox, r.targetWithTransforms = M());
      const { target: m } = r;
      if (!m) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Ws(this.prevProjectionDelta.x, this.projectionDelta.x), Ws(this.prevProjectionDelta.y, this.projectionDelta.y)), Ot(this.projectionDelta, this.layoutCorrected, m, this.latestValues), (this.treeScale.x !== h || this.treeScale.y !== f || !Xs(this.projectionDelta.x, this.prevProjectionDelta.x) || !Xs(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", m));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(r = !0) {
      if (this.options.visualElement?.scheduleRender(), r) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Tt(), this.projectionDelta = Tt(), this.projectionDeltaWithTransform = Tt();
    }
    setAnimationOrigin(r, a = !1) {
      const l = this.snapshot, u = l ? l.latestValues : {}, c = { ...this.latestValues }, h = Tt();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const f = M(), m = l ? l.source : void 0, g = this.layout ? this.layout.source : void 0, b = m !== g, v = this.getStack(), y = !v || v.members.length <= 1, w = !!(b && !y && this.options.crossfade === !0 && !this.path.some(Pu));
      this.animationProgress = 0;
      let x;
      this.mixTargetDelta = (S) => {
        const A = S / 1e3;
        Qs(h.x, r.x, A), Qs(h.y, r.y, A), this.setTargetDelta(h), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (jt(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox), Su(this.relativeTarget, this.relativeTargetOrigin, f, A), x && uu(this.relativeTarget, x) && (this.isProjectionDirty = !1), x || (x = M()), H(x, this.relativeTarget)), b && (this.animationValues = c, iu(c, u, this.latestValues, A, w, y)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = A;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(r) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (q(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = P.update(() => {
        oe.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = J(0)), this.currentAnimation = Qc(this.motionValue, [0, 1e3], {
          ...r,
          velocity: 0,
          isSync: !0,
          onUpdate: (a) => {
            this.mixTargetDelta(a), r.onUpdate && r.onUpdate(a);
          },
          onStop: () => {
          },
          onComplete: () => {
            r.onComplete && r.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const r = this.getStack();
      r && r.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(fu), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const r = this.getLead();
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = r;
      if (!(!a || !l || !u)) {
        if (this !== r && this.layout && u && Kr(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || M();
          const h = I(this.layout.layoutBox.x);
          l.x.min = r.target.x.min, l.x.max = l.x.min + h;
          const f = I(this.layout.layoutBox.y);
          l.y.min = r.target.y.min, l.y.max = l.y.min + f;
        }
        H(a, l), wt(a, c), Ot(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(r, a) {
      this.sharedNodes.has(r) || this.sharedNodes.set(r, new hu()), this.sharedNodes.get(r).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const r = this.getStack();
      return r ? r.lead === this : !0;
    }
    getLead() {
      const { layoutId: r } = this.options;
      return r ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: r } = this.options;
      return r ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: r } = this.options;
      if (r)
        return this.root.sharedNodes.get(r);
    }
    promote({ needsReset: r, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l), r && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const r = this.getStack();
      return r ? r.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: r } = this.options;
      if (!r)
        return;
      let a = !1;
      const { latestValues: l } = r;
      if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a)
        return;
      const u = {};
      l.z && Le("z", r, u, this.animationValues);
      for (let c = 0; c < Ne.length; c++)
        Le(`rotate${Ne[c]}`, r, u, this.animationValues), Le(`skew${Ne[c]}`, r, u, this.animationValues);
      r.render();
      for (const c in u)
        r.setStaticValue(c, u[c]), this.animationValues && (this.animationValues[c] = u[c]);
      r.scheduleRender();
    }
    applyProjectionStyles(r, a) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        r.visibility = "hidden";
        return;
      }
      const l = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, r.visibility = "", r.opacity = "", r.pointerEvents = re(a?.pointerEvents) || "", r.transform = l ? l(this.latestValues, "") : "none";
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        this.options.layoutId && (r.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, r.pointerEvents = re(a?.pointerEvents) || ""), this.hasProjected && !ut(this.latestValues) && (r.transform = l ? l({}, "") : "none", this.hasProjected = !1);
        return;
      }
      r.visibility = "";
      const c = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let h = du(this.projectionDeltaWithTransform, this.treeScale, c);
      l && (h = l(c, h)), r.transform = h;
      const { x: f, y: m } = this.projectionDelta;
      r.transformOrigin = `${f.origin * 100}% ${m.origin * 100}% 0`, u.animationValues ? r.opacity = u === this ? c.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : c.opacityExit : r.opacity = u === this ? c.opacity !== void 0 ? c.opacity : "" : c.opacityExit !== void 0 ? c.opacityExit : 0;
      for (const g in zt) {
        if (c[g] === void 0)
          continue;
        const { correct: b, applyTo: v, isCSSVariable: y } = zt[g], w = h === "none" ? c[g] : b(c[g], u);
        if (v) {
          const x = v.length;
          for (let S = 0; S < x; S++)
            r[v[S]] = w;
        } else
          y ? this.options.visualElement.renderState.vars[g] = w : r[g] = w;
      }
      this.options.layoutId && (r.pointerEvents = u === this ? re(a?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((r) => r.currentAnimation?.stop()), this.root.nodes.forEach(Js), this.root.sharedNodes.clear();
    }
  };
}
function pu(t) {
  t.updateLayout();
}
function gu(t) {
  const e = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: s } = t.layout, { animationType: i } = t.options, o = e.source !== t.layout.source;
    i === "size" ? K((c) => {
      const h = o ? e.measuredBox[c] : e.layoutBox[c], f = I(h);
      h.min = n[c].min, h.max = h.min + f;
    }) : Kr(i, e.layoutBox, n) && K((c) => {
      const h = o ? e.measuredBox[c] : e.layoutBox[c], f = I(n[c]);
      h.max = h.min + f, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[c].max = t.relativeTarget[c].min + f);
    });
    const r = Tt();
    Ot(r, n, e.layoutBox);
    const a = Tt();
    o ? Ot(a, t.applyTransform(s, !0), e.measuredBox) : Ot(a, n, e.layoutBox);
    const l = !Ur(r);
    let u = !1;
    if (!t.resumeFrom) {
      const c = t.getClosestProjectingParent();
      if (c && !c.resumeFrom) {
        const { snapshot: h, layout: f } = c;
        if (h && f) {
          const m = M();
          jt(m, e.layoutBox, h.layoutBox);
          const g = M();
          jt(g, n, f.layoutBox), $r(m, g) || (u = !0), c.options.layoutRoot && (t.relativeTarget = g, t.relativeTargetOrigin = m, t.relativeParent = c);
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: n,
      snapshot: e,
      delta: a,
      layoutDelta: r,
      hasLayoutChanged: l,
      hasRelativeLayoutChanged: u
    });
  } else if (t.isLead()) {
    const { onExitComplete: n } = t.options;
    n && n();
  }
  t.options.transition = void 0;
}
function yu(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function xu(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function vu(t) {
  t.clearSnapshot();
}
function Js(t) {
  t.clearMeasurements();
}
function qs(t) {
  t.isLayoutDirty = !1;
}
function bu(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function Zs(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function wu(t) {
  t.resolveTargetDelta();
}
function Tu(t) {
  t.calcProjection();
}
function Au(t) {
  t.resetSkewAndRotation();
}
function Cu(t) {
  t.removeLeadSnapshot();
}
function Qs(t, e, n) {
  t.translate = E(e.translate, 0, n), t.scale = E(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint;
}
function ti(t, e, n, s) {
  t.min = E(e.min, n.min, s), t.max = E(e.max, n.max, s);
}
function Su(t, e, n, s) {
  ti(t.x, e.x, n.x, s), ti(t.y, e.y, n.y, s);
}
function Pu(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const Du = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, ei = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), ni = ei("applewebkit/") && !ei("chrome/") ? Math.round : W;
function si(t) {
  t.min = ni(t.min), t.max = ni(t.max);
}
function Eu(t) {
  si(t.x), si(t.y);
}
function Kr(t, e, n) {
  return t === "position" || t === "preserve-aspect" && !Rc(Ys(e), Ys(n), 0.2);
}
function Vu(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const Mu = Hr({
  attachResizeListener: (t, e) => Ht(t, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), ke = {
  current: void 0
}, Gr = Hr({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!ke.current) {
      const t = new Mu({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), ke.current = t;
    }
    return ke.current;
  },
  resetTransform: (t, e) => {
    t.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), Nu = {
  pan: {
    Feature: Xc
  },
  drag: {
    Feature: Yc,
    ProjectionNode: Gr,
    MeasureLayout: jr
  }
};
function ii(t, e, n) {
  const { props: s } = t;
  t.animationState && s.whileHover && t.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n, o = s[i];
  o && P.postRender(() => o(e, Xt(e)));
}
class Lu extends at {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = Ya(e, (n, s) => (ii(this.node, s, "Start"), (i) => ii(this.node, i, "End"))));
  }
  unmount() {
  }
}
class ku extends at {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = Kt(Ht(this.node.current, "focus", () => this.onFocus()), Ht(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function ri(t, e, n) {
  const { props: s } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && s.whileTap && t.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n), o = s[i];
  o && P.postRender(() => o(e, Xt(e)));
}
class Ru extends at {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = Za(e, (n, s) => (ri(this.node, s, "Start"), (i, { success: o }) => ri(this.node, i, o ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const nn = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), Fu = (t) => {
  const e = nn.get(t.target);
  e && e(t);
}, Bu = (t) => {
  t.forEach(Fu);
};
function Iu({ root: t, ...e }) {
  const n = t || document;
  Re.has(n) || Re.set(n, {});
  const s = Re.get(n), i = JSON.stringify(e);
  return s[i] || (s[i] = new IntersectionObserver(Bu, { root: t, ...e })), s[i];
}
function Ou(t, e, n) {
  const s = Iu(e);
  return nn.set(t, n), s.observe(t), () => {
    nn.delete(t), s.unobserve(t);
  };
}
const ju = {
  some: 0,
  all: 1
};
class _u extends at {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(), { root: n, margin: s, amount: i = "some", once: o } = e, r = {
      root: n ? n.current : void 0,
      rootMargin: s,
      threshold: typeof i == "number" ? i : ju[i]
    }, a = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, o && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: c, onViewportLeave: h } = this.node.getProps(), f = u ? c : h;
      f && f(l);
    };
    return Ou(this.node.current, r, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Wu(e, n)) && this.startObserver();
  }
  unmount() {
  }
}
function Wu({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const Uu = {
  inView: {
    Feature: _u
  },
  tap: {
    Feature: Ru
  },
  focus: {
    Feature: ku
  },
  hover: {
    Feature: Lu
  }
}, $u = {
  layout: {
    ProjectionNode: Gr,
    MeasureLayout: jr
  }
}, zu = {
  ...Ec,
  ...Uu,
  ...Nu,
  ...$u
}, U = /* @__PURE__ */ zl(zu, sc), Hu = 50, oi = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
}), Ku = () => ({
  time: 0,
  x: oi(),
  y: oi()
}), Gu = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function ai(t, e, n, s) {
  const i = n[e], { length: o, position: r } = Gu[e], a = i.current, l = n.time;
  i.current = t[`scroll${r}`], i.scrollLength = t[`scroll${o}`] - t[`client${o}`], i.offset.length = 0, i.offset[0] = 0, i.offset[1] = i.scrollLength, i.progress = /* @__PURE__ */ St(0, i.scrollLength, i.current);
  const u = s - l;
  i.velocity = u > Hu ? 0 : mn(i.current - a, u);
}
function Yu(t, e, n) {
  ai(t, "x", e, n), ai(t, "y", e, n), e.time = n;
}
function Xu(t, e) {
  const n = { x: 0, y: 0 };
  let s = t;
  for (; s && s !== e; )
    if (nr(s))
      n.x += s.offsetLeft, n.y += s.offsetTop, s = s.offsetParent;
    else if (s.tagName === "svg") {
      const i = s.getBoundingClientRect();
      s = s.parentElement;
      const o = s.getBoundingClientRect();
      n.x += i.left - o.left, n.y += i.top - o.top;
    } else if (s instanceof SVGGraphicsElement) {
      const { x: i, y: o } = s.getBBox();
      n.x += i, n.y += o;
      let r = null, a = s.parentNode;
      for (; !r; )
        a.tagName === "svg" && (r = a), a = s.parentNode;
      s = r;
    } else
      break;
  return n;
}
const sn = {
  start: 0,
  center: 0.5,
  end: 1
};
function li(t, e, n = 0) {
  let s = 0;
  if (t in sn && (t = sn[t]), typeof t == "string") {
    const i = parseFloat(t);
    t.endsWith("px") ? s = i : t.endsWith("%") ? t = i / 100 : t.endsWith("vw") ? s = i / 100 * document.documentElement.clientWidth : t.endsWith("vh") ? s = i / 100 * document.documentElement.clientHeight : t = i;
  }
  return typeof t == "number" && (s = e * t), n + s;
}
const Ju = [0, 0];
function qu(t, e, n, s) {
  let i = Array.isArray(t) ? t : Ju, o = 0, r = 0;
  return typeof t == "number" ? i = [t, t] : typeof t == "string" && (t = t.trim(), t.includes(" ") ? i = t.split(" ") : i = [t, sn[t] ? t : "0"]), o = li(i[0], n, s), r = li(i[1], e), o - r;
}
const Zu = {
  All: [
    [0, 0],
    [1, 1]
  ]
}, Qu = { x: 0, y: 0 };
function th(t) {
  return "getBBox" in t && t.tagName !== "svg" ? t.getBBox() : { width: t.clientWidth, height: t.clientHeight };
}
function eh(t, e, n) {
  const { offset: s = Zu.All } = n, { target: i = t, axis: o = "y" } = n, r = o === "y" ? "height" : "width", a = i !== t ? Xu(i, t) : Qu, l = i === t ? { width: t.scrollWidth, height: t.scrollHeight } : th(i), u = {
    width: t.clientWidth,
    height: t.clientHeight
  };
  e[o].offset.length = 0;
  let c = !e[o].interpolate;
  const h = s.length;
  for (let f = 0; f < h; f++) {
    const m = qu(s[f], u[r], l[r], a[o]);
    !c && m !== e[o].interpolatorOffsets[f] && (c = !0), e[o].offset[f] = m;
  }
  c && (e[o].interpolate = An(e[o].offset, _i(s), { clamp: !1 }), e[o].interpolatorOffsets = [...e[o].offset]), e[o].progress = et(0, 1, e[o].interpolate(e[o].current));
}
function nh(t, e = t, n) {
  if (n.x.targetOffset = 0, n.y.targetOffset = 0, e !== t) {
    let s = e;
    for (; s && s !== t; )
      n.x.targetOffset += s.offsetLeft, n.y.targetOffset += s.offsetTop, s = s.offsetParent;
  }
  n.x.targetLength = e === t ? e.scrollWidth : e.clientWidth, n.y.targetLength = e === t ? e.scrollHeight : e.clientHeight, n.x.containerLength = t.clientWidth, n.y.containerLength = t.clientHeight;
}
function sh(t, e, n, s = {}) {
  return {
    measure: (i) => {
      nh(t, s.target, n), Yu(t, n, i), (s.offset || s.target) && eh(t, n, s);
    },
    notify: () => e(n)
  };
}
const Lt = /* @__PURE__ */ new WeakMap(), ci = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), ui = (t) => t === document.scrollingElement ? window : t;
function Yr(t, { container: e = document.scrollingElement, ...n } = {}) {
  if (!e)
    return W;
  let s = Fe.get(e);
  s || (s = /* @__PURE__ */ new Set(), Fe.set(e, s));
  const i = Ku(), o = sh(e, t, i, n);
  if (s.add(o), !Lt.has(e)) {
    const a = () => {
      for (const h of s)
        h.measure(k.timestamp);
      P.preUpdate(l);
    }, l = () => {
      for (const h of s)
        h.notify();
    }, u = () => P.read(a);
    Lt.set(e, u);
    const c = ui(e);
    window.addEventListener("resize", u, { passive: !0 }), e !== document.documentElement && ci.set(e, al(e, u)), c.addEventListener("scroll", u, { passive: !0 }), u();
  }
  const r = Lt.get(e);
  return P.read(r, !1, !0), () => {
    q(r);
    const a = Fe.get(e);
    if (!a || (a.delete(o), a.size))
      return;
    const l = Lt.get(e);
    Lt.delete(e), l && (ui(e).removeEventListener("scroll", l), ci.get(e)?.(), window.removeEventListener("resize", l));
  };
}
const hi = /* @__PURE__ */ new Map();
function ih(t) {
  const e = { value: 0 }, n = Yr((s) => {
    e.value = s[t.axis].progress * 100;
  }, t);
  return { currentTime: e, cancel: n };
}
function Xr({ source: t, container: e, ...n }) {
  const { axis: s } = n;
  t && (e = t);
  const i = hi.get(e) ?? /* @__PURE__ */ new Map();
  hi.set(e, i);
  const o = n.target ?? "self", r = i.get(o) ?? {}, a = s + (n.offset ?? []).join(",");
  return r[a] || (r[a] = !n.target && zi() ? new ScrollTimeline({ source: e, axis: s }) : ih({ container: e, ...n })), r[a];
}
function rh(t, e) {
  const n = Xr(e);
  return t.attachTimeline({
    timeline: e.target ? void 0 : n,
    observe: (s) => (s.pause(), ar((i) => {
      s.time = s.iterationDuration * i;
    }, n))
  });
}
function oh(t) {
  return t.length === 2;
}
function ah(t, e) {
  return oh(t) ? Yr((n) => {
    t(n[e.axis].progress, n);
  }, e) : ar(t, Xr(e));
}
function lh(t, { axis: e = "y", container: n = document.scrollingElement, ...s } = {}) {
  if (!n)
    return W;
  const i = { axis: e, container: n, ...s };
  return typeof t == "function" ? ah(t, i) : rh(t, i);
}
const ch = () => ({
  scrollX: J(0),
  scrollY: J(0),
  scrollXProgress: J(0),
  scrollYProgress: J(0)
}), Qt = (t) => t ? !t.current : !1;
function uh({ container: t, target: e, ...n } = {}) {
  const s = pe(ch), i = it(null), o = it(!1), r = on(() => (i.current = lh((a, { x: l, y: u }) => {
    s.scrollX.set(l.current), s.scrollXProgress.set(l.progress), s.scrollY.set(u.current), s.scrollYProgress.set(u.progress);
  }, {
    ...n,
    container: t?.current || void 0,
    target: e?.current || void 0
  }), () => {
    i.current?.();
  }), [t, e, JSON.stringify(n.offset)]);
  return ln(() => {
    if (o.current = !1, Qt(t) || Qt(e)) {
      o.current = !0;
      return;
    } else
      return r();
  }, [r]), ot(() => {
    if (o.current)
      return _t(!Qt(t)), _t(!Qt(e)), r();
  }, [r]), s;
}
function hh(t) {
  const e = pe(() => J(t)), { isStatic: n } = B(Rn);
  if (n) {
    const [, s] = Ct(t);
    ot(() => e.on("change", s), []);
  }
  return e;
}
function Jr(t, e) {
  const n = hh(e()), s = () => n.set(e());
  return s(), ln(() => {
    const i = () => P.preRender(s, !1, !0), o = t.map((r) => r.on("change", i));
    return () => {
      o.forEach((r) => r()), q(s);
    };
  }), n;
}
function dh(t) {
  Bt.current = [], t();
  const e = Jr(Bt.current, t);
  return Bt.current = void 0, e;
}
function fh(t, e, n, s) {
  if (typeof t == "function")
    return dh(t);
  const i = typeof e == "function" ? e : cl(e, n, s);
  return Array.isArray(t) ? di(t, i) : di([t], ([o]) => i(o));
}
function di(t, e) {
  const n = pe(() => []);
  return Jr(t, () => {
    n.length = 0;
    const s = t.length;
    for (let i = 0; i < s; i++)
      n[i] = t[i].get();
    return e(n);
  });
}
const mh = {
  some: 0,
  all: 1
};
function ph(t, e, { root: n, margin: s, amount: i = "some" } = {}) {
  const o = Mn(t), r = /* @__PURE__ */ new WeakMap(), a = (u) => {
    u.forEach((c) => {
      const h = r.get(c.target);
      if (c.isIntersecting !== !!h)
        if (c.isIntersecting) {
          const f = e(c.target, c);
          typeof f == "function" ? r.set(c.target, f) : l.unobserve(c.target);
        } else typeof h == "function" && (h(c), r.delete(c.target));
    });
  }, l = new IntersectionObserver(a, {
    root: n,
    rootMargin: s,
    threshold: typeof i == "number" ? i : mh[i]
  });
  return o.forEach((u) => l.observe(u)), () => l.disconnect();
}
function gh(t, { root: e, margin: n, amount: s, once: i = !1, initial: o = !1 } = {}) {
  const [r, a] = Ct(o);
  return ot(() => {
    if (!t.current || i && r)
      return;
    const l = () => (a(!0), i ? void 0 : () => a(!1)), u = {
      root: e && e.current || void 0,
      margin: n,
      amount: s
    };
    return ph(t.current, l, u);
  }, [e, t, n, i, s]), r;
}
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yh = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), xh = (t) => t.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (e, n, s) => s ? s.toUpperCase() : n.toLowerCase()
), fi = (t) => {
  const e = xh(t);
  return e.charAt(0).toUpperCase() + e.slice(1);
}, qr = (...t) => t.filter((e, n, s) => !!e && e.trim() !== "" && s.indexOf(e) === n).join(" ").trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var vh = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bh = rn(
  ({
    color: t = "currentColor",
    size: e = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: s,
    className: i = "",
    children: o,
    iconNode: r,
    ...a
  }, l) => ae(
    "svg",
    {
      ref: l,
      ...vh,
      width: e,
      height: e,
      stroke: t,
      strokeWidth: s ? Number(n) * 24 / Number(e) : n,
      className: qr("lucide", i),
      ...a
    },
    [
      ...r.map(([u, c]) => ae(u, c)),
      ...Array.isArray(o) ? o : [o]
    ]
  )
);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z = (t, e) => {
  const n = rn(
    ({ className: s, ...i }, o) => ae(bh, {
      ref: o,
      iconNode: e,
      className: qr(
        `lucide-${yh(fi(t))}`,
        `lucide-${t}`,
        s
      ),
      ...i
    })
  );
  return n.displayName = fi(t), n;
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wh = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], fe = Z("arrow-right", wh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Th = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Ah = Z("chevron-down", Th);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ch = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
], Sh = Z("facebook", Ch);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ph = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
], Dh = Z("instagram", Ph);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eh = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
], Zr = Z("mail", Eh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vh = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], Qr = Z("map-pin", Vh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mh = [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
], Nh = Z("menu", Mh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lh = [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
], to = Z("phone", Lh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kh = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
], Rh = Z("star", kh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fh = [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
], Bh = Z("twitter", Fh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ih = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Oh = Z("x", Ih), j = {
  hero: "https://images.unsplash.com/photo-1763940018489-12e722c40bab?w=1920&h=1080&fit=crop&auto=format",
  curtainTie: "https://images.unsplash.com/photo-1688489307301-f6e3b15e01bd?w=800&h=1200&fit=crop&auto=format",
  livingRoom: "https://images.unsplash.com/photo-1688506900123-0ae2c0b063a7?w=900&h=700&fit=crop&auto=format",
  tassel: "https://images.unsplash.com/photo-1766684412414-57b272c62d45?w=800&h=1000&fit=crop&auto=format",
  bedroom: "https://images.unsplash.com/photo-1778731525489-020d49e8e1a1?w=900&h=700&fit=crop&auto=format",
  goldFabric: "https://images.unsplash.com/photo-1707569590646-2a51751bb9ef?w=800&h=800&fit=crop&auto=format",
  elegantCurtains: "https://images.unsplash.com/photo-1763939919676-97187d9f4db0?w=900&h=700&fit=crop&auto=format"
};
function Y({
  children: t,
  delay: e = 0,
  direction: n = "up",
  className: s = ""
}) {
  const i = it(null), o = gh(i, { once: !0, margin: "-80px" });
  return /* @__PURE__ */ d(
    U.div,
    {
      ref: i,
      initial: {
        opacity: 0,
        y: n === "up" ? 48 : n === "down" ? -48 : 0,
        x: n === "left" ? 48 : n === "right" ? -48 : 0
      },
      animate: o ? { opacity: 1, y: 0, x: 0 } : {},
      transition: { duration: 0.9, delay: e, ease: [0.25, 0.46, 0.45, 0.94] },
      className: s,
      children: t
    }
  );
}
function zn() {
  return /* @__PURE__ */ d("span", { className: "inline-block w-1.5 h-1.5 rotate-45 bg-[#C9952A] mx-1" });
}
function Hn({ className: t = "" }) {
  return /* @__PURE__ */ p("div", { className: `flex items-center gap-3 my-7 ${t}`, children: [
    /* @__PURE__ */ d("div", { className: "h-px flex-1 bg-gradient-to-r from-transparent via-[#C9952A]/50 to-[#C9952A]/50" }),
    /* @__PURE__ */ d(zn, {}),
    /* @__PURE__ */ d("div", { className: "h-px flex-1 bg-gradient-to-l from-transparent via-[#C9952A]/50 to-[#C9952A]/50" })
  ] });
}
function ve({ text: t }) {
  return /* @__PURE__ */ p("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
    /* @__PURE__ */ d("div", { className: "w-8 h-px bg-[#C9952A]" }),
    /* @__PURE__ */ d("span", { className: "text-[#C9952A] text-[10px] tracking-[0.35em] uppercase font-['Jost'] font-medium", children: t }),
    /* @__PURE__ */ d("div", { className: "w-8 h-px bg-[#C9952A]" })
  ] });
}
function eo({ text: t }) {
  return /* @__PURE__ */ p("div", { className: "flex items-center gap-3 mb-5", children: [
    /* @__PURE__ */ d("div", { className: "w-8 h-px bg-[#C9952A]" }),
    /* @__PURE__ */ d("span", { className: "text-[#C9952A] text-[10px] tracking-[0.35em] uppercase font-['Jost'] font-medium", children: t })
  ] });
}
function jh() {
  const [t, e] = Ct(!1), [n, s] = Ct(!1);
  ot(() => {
    const o = () => s(window.scrollY > 60);
    return window.addEventListener("scroll", o), () => window.removeEventListener("scroll", o);
  }, []);
  const i = ["Collections", "About", "Process", "Gallery", "Contact"];
  return /* @__PURE__ */ p(
    U.nav,
    {
      initial: { y: -90, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${n ? "bg-[#0D0806]/96 backdrop-blur-lg border-b border-[#C9952A]/20 shadow-[0_4px_40px_rgba(0,0,0,0.6)]" : "bg-transparent"}`,
      children: [
        /* @__PURE__ */ p("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between", children: [
          /* @__PURE__ */ p("a", { href: "#", className: "flex flex-col leading-none group", children: [
            /* @__PURE__ */ d("span", { className: "font-['Bodoni_Moda'] text-[26px] text-[#F2E8D5] tracking-[0.18em] font-bold group-hover:text-[#C9952A] transition-colors duration-300", children: "SAN" }),
            /* @__PURE__ */ d("span", { className: "text-[#C9952A] text-[8px] tracking-[0.5em] uppercase font-['Jost'] -mt-0.5", children: "CURTAINS" })
          ] }),
          /* @__PURE__ */ d("div", { className: "hidden lg:flex items-center gap-10", children: i.map((o) => /* @__PURE__ */ p(
            "a",
            {
              href: `#${o.toLowerCase()}`,
              className: "text-[#F2E8D5]/65 hover:text-[#C9952A] text-[11px] tracking-[0.18em] uppercase font-['Jost'] font-medium transition-colors duration-300 relative group",
              children: [
                o,
                /* @__PURE__ */ d("span", { className: "absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9952A] group-hover:w-full transition-all duration-300" })
              ]
            },
            o
          )) }),
          /* @__PURE__ */ d(
            "a",
            {
              href: "#contact",
              className: "hidden lg:inline-flex items-center gap-2 border border-[#C9952A] text-[#C9952A] hover:bg-[#C9952A] hover:text-[#0D0806] px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase font-['Jost'] font-semibold transition-all duration-300",
              children: "Book Consultation"
            }
          ),
          /* @__PURE__ */ d(
            "button",
            {
              onClick: () => e(!t),
              className: "lg:hidden text-[#F2E8D5] hover:text-[#C9952A] transition-colors",
              "aria-label": "Toggle menu",
              children: t ? /* @__PURE__ */ d(Oh, { size: 22 }) : /* @__PURE__ */ d(Nh, { size: 22 })
            }
          )
        ] }),
        /* @__PURE__ */ d(
          U.div,
          {
            initial: !1,
            animate: { height: t ? "auto" : 0, opacity: t ? 1 : 0 },
            transition: { duration: 0.35 },
            className: "lg:hidden overflow-hidden bg-[#0A0604] border-t border-[#C9952A]/15",
            children: /* @__PURE__ */ p("div", { className: "px-6 pb-6 pt-2", children: [
              i.map((o) => /* @__PURE__ */ p(
                "a",
                {
                  href: `#${o.toLowerCase()}`,
                  onClick: () => e(!1),
                  className: "flex items-center justify-between py-3.5 text-[#F2E8D5]/65 hover:text-[#C9952A] text-sm tracking-[0.15em] uppercase font-['Jost'] border-b border-[#C9952A]/10 transition-colors",
                  children: [
                    o,
                    /* @__PURE__ */ d(Ah, { size: 14, className: "-rotate-90 opacity-40" })
                  ]
                },
                o
              )),
              /* @__PURE__ */ d(
                "a",
                {
                  href: "#contact",
                  onClick: () => e(!1),
                  className: "block mt-5 bg-[#8B1414] text-[#F2E8D5] text-center py-3.5 text-[10px] tracking-[0.3em] uppercase font-['Jost'] font-semibold",
                  children: "Book Free Consultation"
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
function _h() {
  const t = it(null), { scrollY: e } = uh(), n = fh(e, [0, 700], [0, 200]);
  return /* @__PURE__ */ p("section", { ref: t, className: "relative h-screen min-h-[720px] flex items-center overflow-hidden bg-[#0D0806]", children: [
    /* @__PURE__ */ p(U.div, { style: { y: n }, className: "absolute inset-0 scale-[1.15]", children: [
      /* @__PURE__ */ d(
        "img",
        {
          src: j.hero,
          alt: "Elegant marble room with luxury sheer curtains",
          className: "w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ d("div", { className: "absolute inset-0 bg-gradient-to-r from-[#0D0806]/92 via-[#0D0806]/65 to-[#0D0806]/25" }),
      /* @__PURE__ */ d("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0D0806] via-[#0D0806]/20 to-transparent" })
    ] }),
    /* @__PURE__ */ p("div", { className: "absolute left-5 lg:left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ d("div", { className: "w-px h-20 bg-gradient-to-b from-transparent to-[#C9952A]/70" }),
      /* @__PURE__ */ d(zn, {}),
      /* @__PURE__ */ d("div", { className: "w-px h-20 bg-gradient-to-t from-transparent to-[#C9952A]/70" })
    ] }),
    /* @__PURE__ */ d("div", { className: "relative z-10 max-w-7xl mx-auto px-8 lg:px-12 w-full pt-24", children: /* @__PURE__ */ p("div", { className: "max-w-[640px]", children: [
      /* @__PURE__ */ p(
        U.div,
        {
          initial: { opacity: 0, x: -30 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.8, delay: 0.4 },
          className: "flex items-center gap-3 mb-7",
          children: [
            /* @__PURE__ */ d("div", { className: "w-10 h-px bg-[#C9952A]" }),
            /* @__PURE__ */ d("span", { className: "text-[#C9952A] text-[10px] tracking-[0.4em] uppercase font-['Jost'] font-medium", children: "Est. 2005  ·  Mayfair, London" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        U.h1,
        {
          initial: { opacity: 0, y: 70 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
          className: "font-['Bodoni_Moda'] text-[clamp(3.2rem,8vw,6.5rem)] text-[#F2E8D5] leading-[0.92] font-bold mb-7",
          children: [
            "Drape Your",
            /* @__PURE__ */ d("br", {}),
            /* @__PURE__ */ d("em", { className: "text-[#C9952A] not-italic italic", children: "World" }),
            /* @__PURE__ */ d("br", {}),
            "in Luxury"
          ]
        }
      ),
      /* @__PURE__ */ d(
        U.div,
        {
          initial: { scaleX: 0 },
          animate: { scaleX: 1 },
          transition: { duration: 0.8, delay: 0.9, transformOrigin: "left" },
          className: "h-px w-24 bg-[#C9952A] mb-7"
        }
      ),
      /* @__PURE__ */ d(
        U.p,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 1 },
          className: "text-[#F2E8D5]/60 font-['Jost'] text-[17px] leading-[1.85] mb-10 max-w-[420px]",
          children: "Bespoke curtains and drapes crafted for the world's most distinguished interiors. Every thread a testament to uncompromising artistry."
        }
      ),
      /* @__PURE__ */ p(
        U.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 1.15 },
          className: "flex flex-wrap gap-4",
          children: [
            /* @__PURE__ */ p(
              "a",
              {
                href: "#collections",
                className: "bg-[#8B1414] hover:bg-[#A31818] text-[#F2E8D5] px-8 py-4 text-[11px] tracking-[0.25em] uppercase font-['Jost'] font-semibold transition-all duration-300 flex items-center gap-3 group",
                children: [
                  "Explore Collections",
                  /* @__PURE__ */ d(fe, { size: 15, className: "group-hover:translate-x-1 transition-transform duration-300" })
                ]
              }
            ),
            /* @__PURE__ */ d(
              "a",
              {
                href: "#contact",
                className: "border border-[#F2E8D5]/35 hover:border-[#C9952A] text-[#F2E8D5]/75 hover:text-[#C9952A] px-8 py-4 text-[11px] tracking-[0.25em] uppercase font-['Jost'] font-medium transition-all duration-300",
                children: "Book Consultation"
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ p(
      U.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 1.8 },
        className: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
        children: [
          /* @__PURE__ */ d("span", { className: "text-[#F2E8D5]/35 text-[9px] tracking-[0.45em] uppercase font-['Jost']", children: "Scroll" }),
          /* @__PURE__ */ d(
            U.div,
            {
              animate: { y: [0, 10, 0] },
              transition: { duration: 1.6, repeat: 1 / 0, ease: "easeInOut" },
              className: "w-px h-10 bg-gradient-to-b from-[#C9952A]/70 to-transparent"
            }
          )
        ]
      }
    )
  ] });
}
function Wh() {
  const t = [
    "LUXURY CURTAINS",
    "BESPOKE DRAPES",
    "PREMIUM FABRICS",
    "HANDCRAFTED ELEGANCE",
    "TIMELESS DESIGN",
    "ROYAL COLLECTIONS",
    "SILK & VELVET",
    "WHITE-GLOVE SERVICE"
  ];
  return /* @__PURE__ */ d("div", { className: "bg-[#8B1414] py-4 overflow-hidden border-y border-[#C9952A]/20", children: /* @__PURE__ */ d(
    U.div,
    {
      animate: { x: ["0%", "-50%"] },
      transition: { duration: 28, ease: "linear", repeat: 1 / 0 },
      className: "flex whitespace-nowrap",
      children: [...t, ...t].map((e, n) => /* @__PURE__ */ p(
        "span",
        {
          className: "inline-flex items-center gap-5 px-5 text-[#F2E8D5]/85 text-[10px] tracking-[0.4em] uppercase font-['Jost'] font-medium",
          children: [
            e,
            /* @__PURE__ */ d(zn, {})
          ]
        },
        n
      ))
    }
  ) });
}
function Uh() {
  return /* @__PURE__ */ d("section", { className: "bg-[#0D0806] py-0 border-b border-[#C9952A]/12", children: /* @__PURE__ */ d("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: /* @__PURE__ */ d("div", { className: "grid grid-cols-2 lg:grid-cols-4", children: [
    { value: "18+", label: "Years of Excellence" },
    { value: "3,200+", label: "Homes Transformed" },
    { value: "47", label: "Fabric Collections" },
    { value: "100%", label: "Bespoke Craftsmanship" }
  ].map((e, n) => /* @__PURE__ */ p(Y, { delay: n * 0.12, className: `text-center py-12 px-6 ${n > 0 ? "border-l border-[#C9952A]/12" : ""} ${n >= 2 ? "border-t lg:border-t-0 border-[#C9952A]/12" : ""}`, children: [
    /* @__PURE__ */ d("div", { className: "font-['Bodoni_Moda'] text-[clamp(2.2rem,5vw,3.5rem)] text-[#C9952A] font-bold mb-1.5 leading-none", children: e.value }),
    /* @__PURE__ */ d("div", { className: "text-[#F2E8D5]/40 text-[10px] tracking-[0.25em] uppercase font-['Jost']", children: e.label })
  ] }, n)) }) }) });
}
function $h() {
  const t = [
    {
      name: "Signature Collection",
      desc: "Opulent floor-to-ceiling drapes in hand-selected European velvets and silks. The epitome of understated grandeur.",
      price: "From £2,400",
      img: j.curtainTie,
      tag: "Bestseller",
      tagColor: "bg-[#8B1414]"
    },
    {
      name: "Imperial Brocade",
      desc: "Richly woven brocade fabrics with 24-carat gold thread. Inspired by the great palaces of Europe and the Orient.",
      price: "From £3,800",
      img: j.tassel,
      tag: "New Arrival",
      tagColor: "bg-[#C9952A]"
    },
    {
      name: "Sheer Elegance",
      desc: "Ethereal layers of silk organza that filter light into a soft golden glow, transforming every interior into a reverie.",
      price: "From £1,800",
      img: j.elegantCurtains,
      tag: "Classic",
      tagColor: "bg-[#2A1510]"
    }
  ];
  return /* @__PURE__ */ d("section", { id: "collections", className: "bg-[#0D0806] py-24 lg:py-36", children: /* @__PURE__ */ p("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: [
    /* @__PURE__ */ p(Y, { className: "text-center mb-16", children: [
      /* @__PURE__ */ d(ve, { text: "Our Collections" }),
      /* @__PURE__ */ p("h2", { className: "font-['Bodoni_Moda'] text-[clamp(2.4rem,5vw,4.5rem)] text-[#F2E8D5] font-bold leading-[1.05]", children: [
        "Crafted for",
        /* @__PURE__ */ d("br", {}),
        /* @__PURE__ */ d("em", { className: "italic text-[#C9952A] not-italic italic", children: "Distinction" })
      ] })
    ] }),
    /* @__PURE__ */ d("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6", children: t.map((e, n) => /* @__PURE__ */ d(Y, { delay: n * 0.14, children: /* @__PURE__ */ p("div", { className: "group relative overflow-hidden bg-[#160C08] border border-[#C9952A]/10 hover:border-[#C9952A]/50 transition-all duration-500 cursor-pointer h-full flex flex-col", children: [
      /* @__PURE__ */ p("div", { className: "relative overflow-hidden aspect-[3/4]", children: [
        /* @__PURE__ */ d(
          "img",
          {
            src: e.img,
            alt: e.name,
            className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ d("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0D0806]/80 via-[#0D0806]/10 to-transparent" }),
        /* @__PURE__ */ d("span", { className: `absolute top-4 left-4 ${e.tagColor} text-[#F2E8D5] text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 font-['Jost'] font-semibold`, children: e.tag })
      ] }),
      /* @__PURE__ */ p("div", { className: "p-6 flex flex-col flex-1", children: [
        /* @__PURE__ */ d("h3", { className: "font-['Bodoni_Moda'] text-[1.2rem] text-[#F2E8D5] font-bold mb-2", children: e.name }),
        /* @__PURE__ */ d("p", { className: "text-[#F2E8D5]/45 text-sm font-['Jost'] leading-[1.8] mb-5 flex-1", children: e.desc }),
        /* @__PURE__ */ p("div", { className: "flex items-center justify-between border-t border-[#C9952A]/12 pt-4", children: [
          /* @__PURE__ */ d("span", { className: "text-[#C9952A] font-['Bodoni_Moda'] text-lg font-bold", children: e.price }),
          /* @__PURE__ */ p("span", { className: "text-[#C9952A]/60 hover:text-[#C9952A] text-[10px] tracking-[0.25em] uppercase font-['Jost'] flex items-center gap-2 group-hover:gap-3 transition-all duration-300 cursor-pointer", children: [
            "Explore ",
            /* @__PURE__ */ d(fe, { size: 11 })
          ] })
        ] })
      ] })
    ] }) }, n)) }),
    /* @__PURE__ */ d(Y, { delay: 0.3, className: "text-center mt-12", children: /* @__PURE__ */ p(
      "a",
      {
        href: "#contact",
        className: "inline-flex items-center gap-3 border border-[#C9952A]/40 hover:border-[#C9952A] text-[#F2E8D5]/60 hover:text-[#C9952A] px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase font-['Jost'] font-medium transition-all duration-300",
        children: [
          "View All Collections ",
          /* @__PURE__ */ d(fe, { size: 12 })
        ]
      }
    ) })
  ] }) });
}
function zh() {
  const t = [
    { title: "Master Weavers", desc: "Third-generation artisans" },
    { title: "Premium Fabrics", desc: "Sourced from 12 countries" },
    { title: "Perfect Fit", desc: "Precision-measured installs" },
    { title: "Lifetime Care", desc: "Ongoing maintenance service" }
  ];
  return /* @__PURE__ */ d("section", { id: "about", className: "bg-[#0F0907] py-24 lg:py-36 overflow-hidden", children: /* @__PURE__ */ d("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: /* @__PURE__ */ p("div", { className: "grid lg:grid-cols-2 gap-16 lg:gap-28 items-center", children: [
    /* @__PURE__ */ p(Y, { direction: "right", className: "relative pb-12 pr-10", children: [
      /* @__PURE__ */ p("div", { className: "relative z-10 overflow-hidden aspect-[4/5]", children: [
        /* @__PURE__ */ d(
          "img",
          {
            src: j.tassel,
            alt: "Handcrafted luxury curtain tassel detail",
            className: "w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ d("div", { className: "absolute inset-0 bg-gradient-to-t from-[#8B1414]/30 to-transparent mix-blend-multiply" })
      ] }),
      /* @__PURE__ */ d("div", { className: "absolute bottom-0 right-0 w-[42%] aspect-square overflow-hidden border-[5px] border-[#0F0907] z-20 shadow-2xl", children: /* @__PURE__ */ d(
        "img",
        {
          src: j.goldFabric,
          alt: "Gold silk fabric close-up",
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ p("div", { className: "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden lg:flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ d("div", { className: "w-px h-16 bg-gradient-to-b from-transparent to-[#C9952A]/50" }),
        /* @__PURE__ */ d("div", { className: "w-2.5 h-2.5 rotate-45 border border-[#C9952A]/60" }),
        /* @__PURE__ */ d("div", { className: "w-px h-16 bg-gradient-to-t from-transparent to-[#C9952A]/50" })
      ] })
    ] }),
    /* @__PURE__ */ p(Y, { direction: "left", delay: 0.2, children: [
      /* @__PURE__ */ d(eo, { text: "Our Story" }),
      /* @__PURE__ */ p("h2", { className: "font-['Bodoni_Moda'] text-[clamp(2.2rem,4.5vw,3.8rem)] text-[#F2E8D5] font-bold leading-[1.05] mb-3", children: [
        "Where Artistry",
        /* @__PURE__ */ d("br", {}),
        "Meets",
        " ",
        /* @__PURE__ */ d("em", { className: "italic text-[#C9952A]", children: "Architecture" })
      ] }),
      /* @__PURE__ */ d(Hn, { className: "my-6" }),
      /* @__PURE__ */ d("p", { className: "text-[#F2E8D5]/55 font-['Jost'] text-[15px] leading-[1.95] mb-5", children: "For over eighteen years, San Curtains has been the trusted name among architects, interior designers, and discerning homeowners who demand nothing less than perfection. Every piece begins with a conversation — understanding your space, your light, and your vision." }),
      /* @__PURE__ */ d("p", { className: "text-[#F2E8D5]/55 font-['Jost'] text-[15px] leading-[1.95] mb-10", children: "Our master craftspeople source only the finest European silks, hand-woven velvets, and heritage brocades, before transforming them into window treatments of extraordinary beauty that endure for generations." }),
      /* @__PURE__ */ d("div", { className: "grid grid-cols-2 gap-5 mb-11", children: t.map((e, n) => /* @__PURE__ */ p("div", { className: "border-l-2 border-[#C9952A]/50 pl-4 py-1", children: [
        /* @__PURE__ */ d("div", { className: "font-['Bodoni_Moda'] text-[#F2E8D5] font-bold text-[14px] mb-1", children: e.title }),
        /* @__PURE__ */ d("div", { className: "text-[#F2E8D5]/38 text-[11px] font-['Jost'] tracking-wide", children: e.desc })
      ] }, n)) }),
      /* @__PURE__ */ p(
        "a",
        {
          href: "#contact",
          className: "inline-flex items-center gap-3 bg-[#8B1414] hover:bg-[#A01818] text-[#F2E8D5] px-8 py-4 text-[11px] tracking-[0.25em] uppercase font-['Jost'] font-semibold transition-all duration-300 group",
          children: [
            "Discover Our Craft",
            /* @__PURE__ */ d(fe, { size: 14, className: "group-hover:translate-x-1 transition-transform" })
          ]
        }
      )
    ] })
  ] }) }) });
}
function Hh() {
  const t = [
    {
      num: "01",
      title: "In-Home Measurement",
      desc: "Our specialists visit your home to take precise measurements and assess your unique architectural requirements."
    },
    {
      num: "02",
      title: "Curated Fabric Selection",
      desc: "Choose from over 800 exclusive fabrics: Italian silks, French velvets, hand-embroidered brocades, and heritage linens."
    },
    {
      num: "03",
      title: "Master Craftsmanship",
      desc: "Each curtain is hand-crafted in our London atelier by specialists with decades of dedicated experience."
    },
    {
      num: "04",
      title: "White-Glove Installation",
      desc: "Our professional installation team ensures your curtains are hung and dressed to absolute perfection."
    }
  ];
  return /* @__PURE__ */ d("section", { id: "process", className: "bg-[#160C08] py-24 lg:py-36", children: /* @__PURE__ */ d("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: /* @__PURE__ */ p("div", { className: "grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start", children: [
    /* @__PURE__ */ p(Y, { direction: "right", children: [
      /* @__PURE__ */ d(eo, { text: "Why Choose Us" }),
      /* @__PURE__ */ p("h2", { className: "font-['Bodoni_Moda'] text-[clamp(2.2rem,4.5vw,3.8rem)] text-[#F2E8D5] font-bold leading-[1.05] mb-5", children: [
        "The San Curtains",
        /* @__PURE__ */ d("br", {}),
        /* @__PURE__ */ d("em", { className: "italic text-[#C9952A]", children: "Promise" })
      ] }),
      /* @__PURE__ */ d(Hn, { className: "my-6" }),
      /* @__PURE__ */ d("p", { className: "text-[#F2E8D5]/50 font-['Jost'] text-[15px] leading-[1.95] mb-10", children: "We believe exceptional window treatments are the foundation of a truly magnificent interior. Our commitment to quality, precision, and personal service is unwavering — from first consultation to final installation." }),
      /* @__PURE__ */ d("div", { className: "overflow-hidden aspect-video bg-[#0D0806]", children: /* @__PURE__ */ d(
        "img",
        {
          src: j.livingRoom,
          alt: "Luxury living room with San Curtains bespoke drapes",
          className: "w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        }
      ) })
    ] }),
    /* @__PURE__ */ d("div", { children: t.map((e, n) => /* @__PURE__ */ d(Y, { delay: n * 0.1, direction: "left", children: /* @__PURE__ */ p("div", { className: "border-b border-[#C9952A]/12 py-8 flex gap-6 group hover:bg-[#1E0F0A] px-5 transition-colors duration-300 -mx-5 cursor-default", children: [
      /* @__PURE__ */ d("div", { className: "font-['Bodoni_Moda'] text-[#C9952A]/25 text-[2.8rem] font-bold leading-none flex-shrink-0 pt-1 group-hover:text-[#C9952A]/55 transition-colors duration-300", children: e.num }),
      /* @__PURE__ */ p("div", { children: [
        /* @__PURE__ */ d("h3", { className: "font-['Bodoni_Moda'] text-[#F2E8D5] text-[1.1rem] font-bold mb-2", children: e.title }),
        /* @__PURE__ */ d("p", { className: "text-[#F2E8D5]/42 font-['Jost'] text-sm leading-[1.85]", children: e.desc })
      ] })
    ] }) }, n)) })
  ] }) }) });
}
function Kh() {
  const t = [
    {
      quote: "San Curtains transformed our Belgravia townhouse into something from a dream. The imperial velvet drapes in our drawing room are simply breathtaking in every light.",
      author: "Lady Victoria Ashworth",
      role: "Belgravia, London"
    },
    {
      quote: "The attention to detail is extraordinary. Our bespoke silk curtains were crafted to absolute perfection — the fabric, the lining, the finish. Completely faultless.",
      author: "James Whitmore",
      role: "Interior Designer, Chelsea"
    },
    {
      quote: "I have worked with luxury suppliers across Europe for 25 years. San Curtains stand apart entirely. Their craftsmanship operates at a level I rarely encounter anywhere.",
      author: "Helena Voss",
      role: "Architectural Designer, Mayfair"
    }
  ], [e, n] = Ct(0);
  return ot(() => {
    const s = setInterval(() => {
      n((i) => (i + 1) % t.length);
    }, 5500);
    return () => clearInterval(s);
  }, []), /* @__PURE__ */ p("section", { className: "bg-[#8B1414] py-24 lg:py-36 relative overflow-hidden", children: [
    /* @__PURE__ */ d(
      "div",
      {
        className: "absolute inset-0 opacity-[0.04]",
        style: {
          backgroundImage: "repeating-linear-gradient(45deg, #C9952A 0, #C9952A 1px, transparent 0, transparent 50%)",
          backgroundSize: "24px 24px"
        }
      }
    ),
    /* @__PURE__ */ d("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,149,42,0.08)_0%,_transparent_70%)]" }),
    /* @__PURE__ */ p("div", { className: "relative max-w-3xl mx-auto px-6 lg:px-12 text-center", children: [
      /* @__PURE__ */ p(Y, { children: [
        /* @__PURE__ */ d(ve, { text: "Client Testimonials" }),
        /* @__PURE__ */ p("h2", { className: "font-['Bodoni_Moda'] text-[clamp(2rem,4.5vw,3.5rem)] text-[#F2E8D5] font-bold mb-16", children: [
          "Words from Our",
          " ",
          /* @__PURE__ */ d("em", { className: "italic text-[#C9952A]", children: "Patrons" })
        ] })
      ] }),
      /* @__PURE__ */ d("div", { className: "relative min-h-[220px] mb-10", children: t.map((s, i) => /* @__PURE__ */ p(
        U.div,
        {
          initial: !1,
          animate: { opacity: i === e ? 1 : 0, y: i === e ? 0 : 16 },
          transition: { duration: 0.65, ease: "easeOut" },
          className: `absolute inset-0 ${i === e ? "pointer-events-auto" : "pointer-events-none"}`,
          children: [
            /* @__PURE__ */ d("div", { className: "flex justify-center gap-1 mb-5", children: Array.from({ length: 5 }).map((o, r) => /* @__PURE__ */ d(Rh, { size: 13, fill: "#C9952A", className: "text-[#C9952A]" }, r)) }),
            /* @__PURE__ */ p("blockquote", { className: "font-['Bodoni_Moda'] text-[1.18rem] lg:text-[1.35rem] text-[#F2E8D5] font-medium italic leading-[1.75] mb-7", children: [
              "“",
              s.quote,
              "”"
            ] }),
            /* @__PURE__ */ d("div", { className: "text-[#C9952A] font-['Jost'] font-semibold text-sm tracking-widest", children: s.author }),
            /* @__PURE__ */ d("div", { className: "text-[#F2E8D5]/38 font-['Jost'] text-[10px] tracking-[0.28em] uppercase mt-1", children: s.role })
          ]
        },
        i
      )) }),
      /* @__PURE__ */ d("div", { className: "flex justify-center items-center gap-2", children: t.map((s, i) => /* @__PURE__ */ d(
        "button",
        {
          onClick: () => n(i),
          "aria-label": `Testimonial ${i + 1}`,
          className: `transition-all duration-400 ${i === e ? "w-7 h-[3px] bg-[#C9952A]" : "w-[6px] h-[6px] rotate-45 bg-[#F2E8D5]/25 hover:bg-[#C9952A]/50"}`
        },
        i
      )) })
    ] })
  ] });
}
function Gh() {
  const t = [
    { src: j.elegantCurtains, alt: "Elegant marble pillared room with sheer curtains", span: "row-span-2" },
    { src: j.curtainTie, alt: "Luxury curtain with ornamental tie-back", span: "" },
    { src: j.bedroom, alt: "Elegant bedroom with floor-length luxury drapes", span: "" },
    { src: j.tassel, alt: "Gold decorative curtain tassel close-up", span: "row-span-2" },
    { src: j.livingRoom, alt: "Living room with bespoke San Curtains window treatment", span: "" },
    { src: j.goldFabric, alt: "Shimmering gold silk fabric detail", span: "" }
  ];
  return /* @__PURE__ */ d("section", { id: "gallery", className: "bg-[#0D0806] py-24 lg:py-36", children: /* @__PURE__ */ p("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: [
    /* @__PURE__ */ p(Y, { className: "text-center mb-14", children: [
      /* @__PURE__ */ d(ve, { text: "Portfolio" }),
      /* @__PURE__ */ p("h2", { className: "font-['Bodoni_Moda'] text-[clamp(2.4rem,5vw,4.5rem)] text-[#F2E8D5] font-bold", children: [
        "Our ",
        /* @__PURE__ */ d("em", { className: "italic text-[#C9952A]", children: "Gallery" })
      ] })
    ] }),
    /* @__PURE__ */ d("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-2.5 auto-rows-[180px] lg:auto-rows-[240px]", children: t.map((e, n) => /* @__PURE__ */ p(
      Y,
      {
        delay: n * 0.08,
        className: `${e.span} group relative overflow-hidden bg-[#160C08] cursor-pointer`,
        children: [
          /* @__PURE__ */ d(
            "img",
            {
              src: e.src,
              alt: e.alt,
              className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-108",
              style: { transform: "scale(1)" },
              onMouseEnter: (s) => s.currentTarget.style.transform = "scale(1.07)",
              onMouseLeave: (s) => s.currentTarget.style.transform = "scale(1)"
            }
          ),
          /* @__PURE__ */ d("div", { className: "absolute inset-0 bg-[#0D0806]/0 group-hover:bg-[#0D0806]/45 transition-all duration-500" }),
          /* @__PURE__ */ d("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500", children: /* @__PURE__ */ d("div", { className: "border border-[#C9952A] text-[#C9952A] text-[9px] tracking-[0.4em] uppercase font-['Jost'] px-5 py-2.5", children: "View" }) })
        ]
      },
      n
    )) })
  ] }) });
}
function Yh() {
  const [t, e] = Ct({ name: "", email: "", phone: "", city: "", message: "" }), n = (i) => {
    i.preventDefault();
  }, s = "w-full bg-[#160C08] border border-[#C9952A]/22 focus:border-[#C9952A] text-[#F2E8D5] placeholder:text-[#F2E8D5]/25 px-5 py-4 text-sm font-['Jost'] outline-none transition-colors duration-300";
  return /* @__PURE__ */ p("section", { id: "contact", className: "relative py-24 lg:py-36 overflow-hidden bg-[#0D0806]", children: [
    /* @__PURE__ */ p("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ d(
        "img",
        {
          src: j.bedroom,
          alt: "Luxury bedroom with elegant drapery",
          className: "w-full h-full object-cover opacity-15"
        }
      ),
      /* @__PURE__ */ d("div", { className: "absolute inset-0 bg-gradient-to-b from-[#0D0806]/85 via-[#0D0806]/65 to-[#0D0806]/92" })
    ] }),
    /* @__PURE__ */ d("div", { className: "relative max-w-3xl mx-auto px-6 lg:px-12 text-center", children: /* @__PURE__ */ p(Y, { children: [
      /* @__PURE__ */ d(ve, { text: "Free Consultation" }),
      /* @__PURE__ */ p("h2", { className: "font-['Bodoni_Moda'] text-[clamp(2.4rem,5vw,4.5rem)] text-[#F2E8D5] font-bold leading-[1.05] mb-4", children: [
        "Begin Your",
        /* @__PURE__ */ d("br", {}),
        /* @__PURE__ */ d("em", { className: "italic text-[#C9952A]", children: "Transformation" })
      ] }),
      /* @__PURE__ */ d(Hn, {}),
      /* @__PURE__ */ d("p", { className: "text-[#F2E8D5]/50 font-['Jost'] text-[15px] leading-[1.9] mb-12 max-w-xl mx-auto", children: "Schedule a complimentary in-home consultation with one of our master design consultants. We will assess your space and present curated fabric selections tailored to your vision." }),
      /* @__PURE__ */ p("form", { onSubmit: n, className: "text-left", children: [
        /* @__PURE__ */ p("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 mb-3", children: [
          /* @__PURE__ */ d(
            "input",
            {
              type: "text",
              placeholder: "Your Full Name",
              value: t.name,
              onChange: (i) => e((o) => ({ ...o, name: i.target.value })),
              className: s
            }
          ),
          /* @__PURE__ */ d(
            "input",
            {
              type: "email",
              placeholder: "Email Address",
              value: t.email,
              onChange: (i) => e((o) => ({ ...o, email: i.target.value })),
              className: s
            }
          ),
          /* @__PURE__ */ d(
            "input",
            {
              type: "tel",
              placeholder: "Phone Number",
              value: t.phone,
              onChange: (i) => e((o) => ({ ...o, phone: i.target.value })),
              className: s
            }
          ),
          /* @__PURE__ */ d(
            "input",
            {
              type: "text",
              placeholder: "Location / City",
              value: t.city,
              onChange: (i) => e((o) => ({ ...o, city: i.target.value })),
              className: s
            }
          )
        ] }),
        /* @__PURE__ */ d(
          "textarea",
          {
            placeholder: "Tell us about your project and vision...",
            rows: 4,
            value: t.message,
            onChange: (i) => e((o) => ({ ...o, message: i.target.value })),
            className: `${s} resize-none mb-6`
          }
        ),
        /* @__PURE__ */ p("div", { className: "flex flex-col sm:flex-row items-center gap-4 justify-center", children: [
          /* @__PURE__ */ d(
            "button",
            {
              type: "submit",
              className: "w-full sm:w-auto bg-[#C9952A] hover:bg-[#D9A83A] text-[#0D0806] px-12 py-4 text-[11px] tracking-[0.3em] uppercase font-['Jost'] font-bold transition-all duration-300",
              children: "Request Free Consultation"
            }
          ),
          /* @__PURE__ */ d("span", { className: "text-[#F2E8D5]/30 text-xs font-['Jost']", children: "We respond within 24 hours" })
        ] })
      ] }),
      /* @__PURE__ */ p("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-8 mt-14 pt-10 border-t border-[#C9952A]/12", children: [
        /* @__PURE__ */ p("a", { href: "tel:+442071234567", className: "flex items-center gap-3 text-[#F2E8D5]/45 hover:text-[#C9952A] text-sm font-['Jost'] transition-colors", children: [
          /* @__PURE__ */ d(to, { size: 14, className: "text-[#C9952A]" }),
          "+44 20 7123 4567"
        ] }),
        /* @__PURE__ */ p("a", { href: "mailto:hello@sancurtains.com", className: "flex items-center gap-3 text-[#F2E8D5]/45 hover:text-[#C9952A] text-sm font-['Jost'] transition-colors", children: [
          /* @__PURE__ */ d(Zr, { size: 14, className: "text-[#C9952A]" }),
          "hello@sancurtains.com"
        ] }),
        /* @__PURE__ */ p("div", { className: "flex items-center gap-3 text-[#F2E8D5]/45 text-sm font-['Jost']", children: [
          /* @__PURE__ */ d(Qr, { size: 14, className: "text-[#C9952A]" }),
          "42 Savile Row, Mayfair, London"
        ] })
      ] })
    ] }) })
  ] });
}
function Xh() {
  const t = ["Signature Collection", "Imperial Brocade", "Sheer Elegance", "Heritage Linen", "Velvet Royale"], e = ["In-Home Consultation", "Bespoke Design", "Professional Installation", "Fabric Sourcing", "Aftercare & Cleaning"];
  return /* @__PURE__ */ d("footer", { className: "bg-[#080503] border-t border-[#C9952A]/12 pt-16 pb-8", children: /* @__PURE__ */ p("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: [
    /* @__PURE__ */ p("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14", children: [
      /* @__PURE__ */ p("div", { children: [
        /* @__PURE__ */ p("div", { className: "mb-5", children: [
          /* @__PURE__ */ d("div", { className: "font-['Bodoni_Moda'] text-[28px] text-[#F2E8D5] tracking-[0.18em] font-bold leading-none", children: "SAN" }),
          /* @__PURE__ */ d("div", { className: "text-[#C9952A] text-[8px] tracking-[0.55em] uppercase font-['Jost']", children: "CURTAINS" })
        ] }),
        /* @__PURE__ */ d("p", { className: "text-[#F2E8D5]/35 text-[13px] font-['Jost'] leading-[1.85] mb-6", children: "Bespoke luxury curtains and drapes for the world's most distinguished interiors. Est. 2005, Mayfair." }),
        /* @__PURE__ */ d("div", { className: "flex gap-2.5", children: [Dh, Sh, Bh].map((n, s) => /* @__PURE__ */ d(
          "a",
          {
            href: "#",
            "aria-label": "Social media",
            className: "w-8 h-8 border border-[#C9952A]/28 hover:border-[#C9952A] hover:bg-[#C9952A]/8 flex items-center justify-center text-[#F2E8D5]/40 hover:text-[#C9952A] transition-all duration-300",
            children: /* @__PURE__ */ d(n, { size: 13 })
          },
          s
        )) })
      ] }),
      /* @__PURE__ */ p("div", { children: [
        /* @__PURE__ */ d("h4", { className: "font-['Bodoni_Moda'] text-[#F2E8D5] font-bold mb-5 text-[13px] tracking-[0.1em]", children: "Collections" }),
        /* @__PURE__ */ d("div", { className: "space-y-3", children: t.map((n) => /* @__PURE__ */ d("a", { href: "#", className: "block text-[#F2E8D5]/38 hover:text-[#C9952A] text-[13px] font-['Jost'] transition-colors duration-300", children: n }, n)) })
      ] }),
      /* @__PURE__ */ p("div", { children: [
        /* @__PURE__ */ d("h4", { className: "font-['Bodoni_Moda'] text-[#F2E8D5] font-bold mb-5 text-[13px] tracking-[0.1em]", children: "Services" }),
        /* @__PURE__ */ d("div", { className: "space-y-3", children: e.map((n) => /* @__PURE__ */ d("a", { href: "#", className: "block text-[#F2E8D5]/38 hover:text-[#C9952A] text-[13px] font-['Jost'] transition-colors duration-300", children: n }, n)) })
      ] }),
      /* @__PURE__ */ p("div", { children: [
        /* @__PURE__ */ d("h4", { className: "font-['Bodoni_Moda'] text-[#F2E8D5] font-bold mb-5 text-[13px] tracking-[0.1em]", children: "Contact Us" }),
        /* @__PURE__ */ p("div", { className: "space-y-4", children: [
          /* @__PURE__ */ p("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ d(Qr, { size: 13, className: "text-[#C9952A] mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ p("span", { className: "text-[#F2E8D5]/38 text-[13px] font-['Jost'] leading-[1.7]", children: [
              "42 Savile Row, Mayfair",
              /* @__PURE__ */ d("br", {}),
              "London, W1S 3PT"
            ] })
          ] }),
          /* @__PURE__ */ p("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ d(to, { size: 13, className: "text-[#C9952A] flex-shrink-0" }),
            /* @__PURE__ */ d("span", { className: "text-[#F2E8D5]/38 text-[13px] font-['Jost']", children: "+44 20 7123 4567" })
          ] }),
          /* @__PURE__ */ p("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ d(Zr, { size: 13, className: "text-[#C9952A] flex-shrink-0" }),
            /* @__PURE__ */ d("span", { className: "text-[#F2E8D5]/38 text-[13px] font-['Jost']", children: "hello@sancurtains.com" })
          ] })
        ] }),
        /* @__PURE__ */ p("div", { className: "mt-6 border border-[#C9952A]/22 p-4", children: [
          /* @__PURE__ */ d("div", { className: "text-[#C9952A] text-[9px] tracking-[0.35em] uppercase font-['Jost'] font-semibold mb-1", children: "Showroom Hours" }),
          /* @__PURE__ */ p("div", { className: "text-[#F2E8D5]/38 text-[12px] font-['Jost'] leading-[1.7]", children: [
            "Mon – Fri: 9am – 6pm",
            /* @__PURE__ */ d("br", {}),
            "Saturday: 10am – 4pm"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ p("div", { className: "border-t border-[#C9952A]/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ d("span", { className: "text-[#F2E8D5]/22 text-[11px] font-['Jost'] tracking-[0.12em]", children: "© 2025 San Curtains Ltd. All rights reserved." }),
      /* @__PURE__ */ d("div", { className: "flex gap-6", children: ["Privacy Policy", "Terms of Service", "Sitemap"].map((n) => /* @__PURE__ */ d(
        "a",
        {
          href: "#",
          className: "text-[#F2E8D5]/22 hover:text-[#C9952A] text-[11px] font-['Jost'] tracking-[0.1em] transition-colors duration-300",
          children: n
        },
        n
      )) })
    ] })
  ] }) });
}
function Jh() {
  return /* @__PURE__ */ p("div", { className: "bg-[#0D0806] min-h-screen overflow-x-hidden", children: [
    /* @__PURE__ */ d(jh, {}),
    /* @__PURE__ */ d(_h, {}),
    /* @__PURE__ */ d(Wh, {}),
    /* @__PURE__ */ d(Uh, {}),
    /* @__PURE__ */ d($h, {}),
    /* @__PURE__ */ d(zh, {}),
    /* @__PURE__ */ d(Hh, {}),
    /* @__PURE__ */ d(Kh, {}),
    /* @__PURE__ */ d(Gh, {}),
    /* @__PURE__ */ d(Yh, {}),
    /* @__PURE__ */ d(Xh, {})
  ] });
}
const qh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jh
}, Symbol.toStringTag, { value: "Module" }));
export {
  Qh as Code0_8
};
