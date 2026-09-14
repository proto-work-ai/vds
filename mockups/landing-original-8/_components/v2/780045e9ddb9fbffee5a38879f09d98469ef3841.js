const cd = () => Promise.resolve().then(() => ad), Qr = globalThis.__GLOBALS__.ReactJSXRuntime, { Fragment: Jr, jsx: h, jsxs: g } = Qr;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
function os(t) {
  const e = t?.props?._fgT, n = typeof e == "function" || typeof e == "string" || typeof e == "object" && e !== null && "$$typeof" in e;
  return globalThis.__GLOBALS__.React.isValidElement(t) && n;
}
function Nt(t) {
  return globalThis.__GLOBALS__.React.isValidElement(t) && t.type === "fg-txt";
}
function as(t) {
  const { _fgT: e, _fgS: n, _fgB: i, _fgD: s, ...o } = t.props;
  return globalThis.__GLOBALS__.React.createElement(e, {
    ...o,
    key: t.key
  }, o.children);
}
function Gt(t) {
  return os(t) ? as(t) : Nt(t) ? t.props.children : t;
}
const Ct = globalThis.__GLOBALS__.React.Children, to = {
  map(t, e, n) {
    return Ct.map(t, (i, s) => {
      const o = Gt(i);
      return Nt(i) ? null : e.call(n, o, s);
    });
  },
  forEach(t, e, n) {
    Ct.forEach(t, (i, s) => {
      if (Nt(i))
        return;
      const o = Gt(i);
      e.call(n, o, s);
    });
  },
  count(t) {
    let e = 0;
    return Ct.forEach(t, (n) => {
      Nt(n) || e++;
    }), e;
  },
  toArray(t) {
    const e = [];
    return Ct.forEach(t, (n) => {
      Nt(n) || e.push(Gt(n));
    }), e;
  },
  only(t) {
    const e = Ct.only(t);
    return Gt(e);
  }
}, fe = [
  "_fgT",
  "_fgS",
  "_fgB",
  "_fgD"
];
function eo(t) {
  if (t == null || typeof t != "object") return t;
  const e = Object.keys(t);
  let n = !1;
  for (let s = 0; s < fe.length; s++)
    if (fe[s] in t) {
      n = !0;
      break;
    }
  if (!n) return t;
  const i = {};
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    fe.indexOf(o) === -1 && (i[o] = t[o]);
  }
  return i;
}
const zn = globalThis.__GLOBALS__.React.cloneElement, no = (t, ...e) => {
  if (os(t)) {
    const n = as(t), i = e[0];
    return i != null && typeof i == "object" && (e = [
      eo(i),
      ...e.slice(1)
    ]), zn(n, ...e);
  }
  return zn(t, ...e);
};
({
  ...globalThis.__GLOBALS__.React
});
const { Component: ls, createContext: At, createElement: ie, createFactory: ud, createRef: hd, forwardRef: tn, Fragment: cs, isValidElement: io, lazy: dd, memo: fd, Profiler: md, PureComponent: pd, startTransition: gd, StrictMode: yd, Suspense: vd, use: xd, useCallback: en, useContext: I, useDebugValue: bd, useDeferredValue: wd, useEffect: it, useId: nn, useImperativeHandle: Sd, useInsertionEffect: us, useLayoutEffect: so, useMemo: mt, useReducer: Td, useRef: Q, useState: q, useSyncExternalStore: Ad, useTransition: Pd, version: kd, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Ed } = globalThis.__GLOBALS__.React, sn = At({});
function rn(t) {
  const e = Q(null);
  return e.current === null && (e.current = t()), e.current;
}
const on = typeof window < "u", hs = on ? so : it, ce = /* @__PURE__ */ At(null);
function an(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function ln(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const J = (t, e, n) => n > e ? e : n < t ? t : n;
let cn = () => {
};
const tt = {}, ds = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function fs(t) {
  return typeof t == "object" && t !== null;
}
const ms = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function un(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const K = /* @__NO_SIDE_EFFECTS__ */ (t) => t, ro = (t, e) => (n) => e(t(n)), Ut = (...t) => t.reduce(ro), It = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const i = e - t;
  return i === 0 ? 1 : (n - t) / i;
};
class hn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return an(this.subscriptions, e), () => ln(this.subscriptions, e);
  }
  notify(e, n, i) {
    const s = this.subscriptions.length;
    if (s)
      if (s === 1)
        this.subscriptions[0](e, n, i);
      else
        for (let o = 0; o < s; o++) {
          const r = this.subscriptions[o];
          r && r(e, n, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Y = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, H = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function ps(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const gs = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, oo = 1e-7, ao = 12;
function lo(t, e, n, i, s) {
  let o, r, a = 0;
  do
    r = e + (n - e) / 2, o = gs(r, i, s) - t, o > 0 ? n = r : e = r;
  while (Math.abs(o) > oo && ++a < ao);
  return r;
}
function $t(t, e, n, i) {
  if (t === e && n === i)
    return K;
  const s = (o) => lo(o, 0, 1, t, n);
  return (o) => o === 0 || o === 1 ? o : gs(s(o), e, i);
}
const ys = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, vs = (t) => (e) => 1 - t(1 - e), xs = /* @__PURE__ */ $t(0.33, 1.53, 0.69, 0.99), dn = /* @__PURE__ */ vs(xs), bs = /* @__PURE__ */ ys(dn), ws = (t) => (t *= 2) < 1 ? 0.5 * dn(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), fn = (t) => 1 - Math.sin(Math.acos(t)), Ss = vs(fn), Ts = ys(fn), co = /* @__PURE__ */ $t(0.42, 0, 1, 1), uo = /* @__PURE__ */ $t(0, 0, 0.58, 1), As = /* @__PURE__ */ $t(0.42, 0, 0.58, 1), ho = (t) => Array.isArray(t) && typeof t[0] != "number", Ps = (t) => Array.isArray(t) && typeof t[0] == "number", fo = {
  linear: K,
  easeIn: co,
  easeInOut: As,
  easeOut: uo,
  circIn: fn,
  circInOut: Ts,
  circOut: Ss,
  backIn: dn,
  backInOut: bs,
  backOut: xs,
  anticipate: ws
}, mo = (t) => typeof t == "string", Wn = (t) => {
  if (Ps(t)) {
    cn(t.length === 4);
    const [e, n, i, s] = t;
    return $t(e, n, i, s);
  } else if (mo(t))
    return fo[t];
  return t;
}, qt = [
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
function po(t, e) {
  let n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), s = !1, o = !1;
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
    schedule: (c, d = !1, f = !1) => {
      const x = f && s ? n : i;
      return d && r.add(c), x.has(c) || x.add(c), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      i.delete(c), r.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (a = c, s) {
        o = !0;
        return;
      }
      s = !0, [n, i] = [i, n], n.forEach(l), n.clear(), s = !1, o && (o = !1, u.process(c));
    }
  };
  return u;
}
const go = 40;
function ks(t, e) {
  let n = !1, i = !0;
  const s = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, o = () => n = !0, r = qt.reduce((m, p) => (m[p] = po(o), m), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: c, update: d, preRender: f, render: y, postRender: x } = r, w = () => {
    const m = tt.useManualTiming ? s.timestamp : performance.now();
    n = !1, tt.useManualTiming || (s.delta = i ? 1e3 / 60 : Math.max(Math.min(m - s.timestamp, go), 1)), s.timestamp = m, s.isProcessing = !0, a.process(s), l.process(s), u.process(s), c.process(s), d.process(s), f.process(s), y.process(s), x.process(s), s.isProcessing = !1, n && e && (i = !1, t(w));
  }, T = () => {
    n = !0, i = !0, s.isProcessing || t(w);
  };
  return { schedule: qt.reduce((m, p) => {
    const v = r[p];
    return m[p] = (A, k = !1, P = !1) => (n || T(), v.schedule(A, k, P)), m;
  }, {}), cancel: (m) => {
    for (let p = 0; p < qt.length; p++)
      r[qt[p]].cancel(m);
  }, state: s, steps: r };
}
const { schedule: M, cancel: st, state: B, steps: me } = /* @__PURE__ */ ks(typeof requestAnimationFrame < "u" ? requestAnimationFrame : K, !0);
let Jt;
function yo() {
  Jt = void 0;
}
const z = {
  now: () => (Jt === void 0 && z.set(B.isProcessing || tt.useManualTiming ? B.timestamp : performance.now()), Jt),
  set: (t) => {
    Jt = t, queueMicrotask(yo);
  }
}, Es = (t) => (e) => typeof e == "string" && e.startsWith(t), mn = /* @__PURE__ */ Es("--"), vo = /* @__PURE__ */ Es("var(--"), pn = (t) => vo(t) ? xo.test(t.split("/*")[0].trim()) : !1, xo = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, Pt = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, Ot = {
  ...Pt,
  transform: (t) => J(0, 1, t)
}, Yt = {
  ...Pt,
  default: 1
}, Dt = (t) => Math.round(t * 1e5) / 1e5, gn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function bo(t) {
  return t == null;
}
const wo = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, yn = (t, e) => (n) => !!(typeof n == "string" && wo.test(n) && n.startsWith(t) || e && !bo(n) && Object.prototype.hasOwnProperty.call(n, e)), Cs = (t, e, n) => (i) => {
  if (typeof i != "string")
    return i;
  const [s, o, r, a] = i.match(gn);
  return {
    [t]: parseFloat(s),
    [e]: parseFloat(o),
    [n]: parseFloat(r),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, So = (t) => J(0, 255, t), pe = {
  ...Pt,
  transform: (t) => Math.round(So(t))
}, ut = {
  test: /* @__PURE__ */ yn("rgb", "red"),
  parse: /* @__PURE__ */ Cs("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: i = 1 }) => "rgba(" + pe.transform(t) + ", " + pe.transform(e) + ", " + pe.transform(n) + ", " + Dt(Ot.transform(i)) + ")"
};
function To(t) {
  let e = "", n = "", i = "", s = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), i = t.substring(5, 7), s = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), i = t.substring(3, 4), s = t.substring(4, 5), e += e, n += n, i += i, s += s), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(i, 16),
    alpha: s ? parseInt(s, 16) / 255 : 1
  };
}
const Re = {
  test: /* @__PURE__ */ yn("#"),
  parse: To,
  transform: ut.transform
}, Ht = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), nt = /* @__PURE__ */ Ht("deg"), X = /* @__PURE__ */ Ht("%"), E = /* @__PURE__ */ Ht("px"), Ao = /* @__PURE__ */ Ht("vh"), Po = /* @__PURE__ */ Ht("vw"), Un = {
  ...X,
  parse: (t) => X.parse(t) / 100,
  transform: (t) => X.transform(t * 100)
}, gt = {
  test: /* @__PURE__ */ yn("hsl", "hue"),
  parse: /* @__PURE__ */ Cs("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + X.transform(Dt(e)) + ", " + X.transform(Dt(n)) + ", " + Dt(Ot.transform(i)) + ")"
}, R = {
  test: (t) => ut.test(t) || Re.test(t) || gt.test(t),
  parse: (t) => ut.test(t) ? ut.parse(t) : gt.test(t) ? gt.parse(t) : Re.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? ut.transform(t) : gt.transform(t),
  getAnimatableNone: (t) => {
    const e = R.parse(t);
    return e.alpha = 0, R.transform(e);
  }
}, ko = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Eo(t) {
  return isNaN(t) && typeof t == "string" && (t.match(gn)?.length || 0) + (t.match(ko)?.length || 0) > 0;
}
const Ms = "number", Ns = "color", Co = "var", Mo = "var(", $n = "${}", No = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function jt(t) {
  const e = t.toString(), n = [], i = {
    color: [],
    number: [],
    var: []
  }, s = [];
  let o = 0;
  const a = e.replace(No, (l) => (R.test(l) ? (i.color.push(o), s.push(Ns), n.push(R.parse(l))) : l.startsWith(Mo) ? (i.var.push(o), s.push(Co), n.push(l)) : (i.number.push(o), s.push(Ms), n.push(parseFloat(l))), ++o, $n)).split($n);
  return { values: n, split: a, indexes: i, types: s };
}
function Vs(t) {
  return jt(t).values;
}
function Ds(t) {
  const { split: e, types: n } = jt(t), i = e.length;
  return (s) => {
    let o = "";
    for (let r = 0; r < i; r++)
      if (o += e[r], s[r] !== void 0) {
        const a = n[r];
        a === Ms ? o += Dt(s[r]) : a === Ns ? o += R.transform(s[r]) : o += s[r];
      }
    return o;
  };
}
const Vo = (t) => typeof t == "number" ? 0 : R.test(t) ? R.getAnimatableNone(t) : t;
function Do(t) {
  const e = Vs(t);
  return Ds(t)(e.map(Vo));
}
const rt = {
  test: Eo,
  parse: Vs,
  createTransformer: Ds,
  getAnimatableNone: Do
};
function ge(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Ro({ hue: t, saturation: e, lightness: n, alpha: i }) {
  t /= 360, e /= 100, n /= 100;
  let s = 0, o = 0, r = 0;
  if (!e)
    s = o = r = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    s = ge(l, a, t + 1 / 3), o = ge(l, a, t), r = ge(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(s * 255),
    green: Math.round(o * 255),
    blue: Math.round(r * 255),
    alpha: i
  };
}
function se(t, e) {
  return (n) => n > 0 ? e : t;
}
const N = (t, e, n) => t + (e - t) * n, ye = (t, e, n) => {
  const i = t * t, s = n * (e * e - i) + i;
  return s < 0 ? 0 : Math.sqrt(s);
}, Lo = [Re, ut, gt], Fo = (t) => Lo.find((e) => e.test(t));
function Hn(t) {
  const e = Fo(t);
  if (!e)
    return !1;
  let n = e.parse(t);
  return e === gt && (n = Ro(n)), n;
}
const Kn = (t, e) => {
  const n = Hn(t), i = Hn(e);
  if (!n || !i)
    return se(t, e);
  const s = { ...n };
  return (o) => (s.red = ye(n.red, i.red, o), s.green = ye(n.green, i.green, o), s.blue = ye(n.blue, i.blue, o), s.alpha = N(n.alpha, i.alpha, o), ut.transform(s));
}, Le = /* @__PURE__ */ new Set(["none", "hidden"]);
function Bo(t, e) {
  return Le.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function Io(t, e) {
  return (n) => N(t, e, n);
}
function vn(t) {
  return typeof t == "number" ? Io : typeof t == "string" ? pn(t) ? se : R.test(t) ? Kn : _o : Array.isArray(t) ? Rs : typeof t == "object" ? R.test(t) ? Kn : Oo : se;
}
function Rs(t, e) {
  const n = [...t], i = n.length, s = t.map((o, r) => vn(o)(o, e[r]));
  return (o) => {
    for (let r = 0; r < i; r++)
      n[r] = s[r](o);
    return n;
  };
}
function Oo(t, e) {
  const n = { ...t, ...e }, i = {};
  for (const s in n)
    t[s] !== void 0 && e[s] !== void 0 && (i[s] = vn(t[s])(t[s], e[s]));
  return (s) => {
    for (const o in i)
      n[o] = i[o](s);
    return n;
  };
}
function jo(t, e) {
  const n = [], i = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < e.values.length; s++) {
    const o = e.types[s], r = t.indexes[o][i[o]], a = t.values[r] ?? 0;
    n[s] = a, i[o]++;
  }
  return n;
}
const _o = (t, e) => {
  const n = rt.createTransformer(e), i = jt(t), s = jt(e);
  return i.indexes.var.length === s.indexes.var.length && i.indexes.color.length === s.indexes.color.length && i.indexes.number.length >= s.indexes.number.length ? Le.has(t) && !s.values.length || Le.has(e) && !i.values.length ? Bo(t, e) : Ut(Rs(jo(i, s), s.values), n) : se(t, e);
};
function Ls(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? N(t, e, n) : vn(t)(t, e);
}
const zo = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: (n = !0) => M.update(e, n),
    stop: () => st(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => B.isProcessing ? B.timestamp : z.now()
  };
}, Fs = (t, e, n = 10) => {
  let i = "";
  const s = Math.max(Math.round(e / n), 2);
  for (let o = 0; o < s; o++)
    i += Math.round(t(o / (s - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, re = 2e4;
function xn(t) {
  let e = 0;
  const n = 50;
  let i = t.next(e);
  for (; !i.done && e < re; )
    e += n, i = t.next(e);
  return e >= re ? 1 / 0 : e;
}
function Wo(t, e = 100, n) {
  const i = n({ ...t, keyframes: [0, e] }), s = Math.min(xn(i), re);
  return {
    type: "keyframes",
    ease: (o) => i.next(s * o).value / e,
    duration: /* @__PURE__ */ H(s)
  };
}
const Uo = 5;
function Bs(t, e, n) {
  const i = Math.max(e - Uo, 0);
  return ps(n - t(i), e - i);
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
}, ve = 1e-3;
function $o({ duration: t = V.duration, bounce: e = V.bounce, velocity: n = V.velocity, mass: i = V.mass }) {
  let s, o, r = 1 - e;
  r = J(V.minDamping, V.maxDamping, r), t = J(V.minDuration, V.maxDuration, /* @__PURE__ */ H(t)), r < 1 ? (s = (u) => {
    const c = u * r, d = c * t, f = c - n, y = Fe(u, r), x = Math.exp(-d);
    return ve - f / y * x;
  }, o = (u) => {
    const d = u * r * t, f = d * n + n, y = Math.pow(r, 2) * Math.pow(u, 2) * t, x = Math.exp(-d), w = Fe(Math.pow(u, 2), r);
    return (-s(u) + ve > 0 ? -1 : 1) * ((f - y) * x) / w;
  }) : (s = (u) => {
    const c = Math.exp(-u * t), d = (u - n) * t + 1;
    return -ve + c * d;
  }, o = (u) => {
    const c = Math.exp(-u * t), d = (n - u) * (t * t);
    return c * d;
  });
  const a = 5 / t, l = Ko(s, o, a);
  if (t = /* @__PURE__ */ Y(t), isNaN(l))
    return {
      stiffness: V.stiffness,
      damping: V.damping,
      duration: t
    };
  {
    const u = Math.pow(l, 2) * i;
    return {
      stiffness: u,
      damping: r * 2 * Math.sqrt(i * u),
      duration: t
    };
  }
}
const Ho = 12;
function Ko(t, e, n) {
  let i = n;
  for (let s = 1; s < Ho; s++)
    i = i - t(i) / e(i);
  return i;
}
function Fe(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const Go = ["duration", "bounce"], qo = ["stiffness", "damping", "mass"];
function Gn(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function Yo(t) {
  let e = {
    velocity: V.velocity,
    stiffness: V.stiffness,
    damping: V.damping,
    mass: V.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Gn(t, qo) && Gn(t, Go))
    if (t.visualDuration) {
      const n = t.visualDuration, i = 2 * Math.PI / (n * 1.2), s = i * i, o = 2 * J(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(s);
      e = {
        ...e,
        mass: V.mass,
        stiffness: s,
        damping: o
      };
    } else {
      const n = $o(t);
      e = {
        ...e,
        ...n,
        mass: V.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function oe(t = V.visualDuration, e = V.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: i, restDelta: s } = n;
  const o = n.keyframes[0], r = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: o }, { stiffness: l, damping: u, mass: c, duration: d, velocity: f, isResolvedFromDuration: y } = Yo({
    ...n,
    velocity: -/* @__PURE__ */ H(n.velocity || 0)
  }), x = f || 0, w = u / (2 * Math.sqrt(l * c)), T = r - o, b = /* @__PURE__ */ H(Math.sqrt(l / c)), S = Math.abs(T) < 5;
  i || (i = S ? V.restSpeed.granular : V.restSpeed.default), s || (s = S ? V.restDelta.granular : V.restDelta.default);
  let m;
  if (w < 1) {
    const v = Fe(b, w);
    m = (A) => {
      const k = Math.exp(-w * b * A);
      return r - k * ((x + w * b * T) / v * Math.sin(v * A) + T * Math.cos(v * A));
    };
  } else if (w === 1)
    m = (v) => r - Math.exp(-b * v) * (T + (x + b * T) * v);
  else {
    const v = b * Math.sqrt(w * w - 1);
    m = (A) => {
      const k = Math.exp(-w * b * A), P = Math.min(v * A, 300);
      return r - k * ((x + w * b * T) * Math.sinh(P) + v * T * Math.cosh(P)) / v;
    };
  }
  const p = {
    calculatedDuration: y && d || null,
    next: (v) => {
      const A = m(v);
      if (y)
        a.done = v >= d;
      else {
        let k = v === 0 ? x : 0;
        w < 1 && (k = v === 0 ? /* @__PURE__ */ Y(x) : Bs(m, v, A));
        const P = Math.abs(k) <= i, L = Math.abs(r - A) <= s;
        a.done = P && L;
      }
      return a.value = a.done ? r : A, a;
    },
    toString: () => {
      const v = Math.min(xn(p), re), A = Fs((k) => p.next(v * k).value, v, 30);
      return v + "ms " + A;
    },
    toTransition: () => {
    }
  };
  return p;
}
oe.applyToOptions = (t) => {
  const e = Wo(t, 100, oe);
  return t.ease = e.ease, t.duration = /* @__PURE__ */ Y(e.duration), t.type = "keyframes", t;
};
function Be({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: i = 325, bounceDamping: s = 10, bounceStiffness: o = 500, modifyTarget: r, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const d = t[0], f = {
    done: !1,
    value: d
  }, y = (P) => a !== void 0 && P < a || l !== void 0 && P > l, x = (P) => a === void 0 ? l : l === void 0 || Math.abs(a - P) < Math.abs(l - P) ? a : l;
  let w = n * e;
  const T = d + w, b = r === void 0 ? T : r(T);
  b !== T && (w = b - d);
  const S = (P) => -w * Math.exp(-P / i), m = (P) => b + S(P), p = (P) => {
    const L = S(P), j = m(P);
    f.done = Math.abs(L) <= u, f.value = f.done ? b : j;
  };
  let v, A;
  const k = (P) => {
    y(f.value) && (v = P, A = oe({
      keyframes: [f.value, x(f.value)],
      velocity: Bs(m, P, f.value),
      // TODO: This should be passing * 1000
      damping: s,
      stiffness: o,
      restDelta: u,
      restSpeed: c
    }));
  };
  return k(0), {
    calculatedDuration: null,
    next: (P) => {
      let L = !1;
      return !A && v === void 0 && (L = !0, p(P), k(P)), v !== void 0 && P >= v ? A.next(P - v) : (!L && p(P), f);
    }
  };
}
function Xo(t, e, n) {
  const i = [], s = n || tt.mix || Ls, o = t.length - 1;
  for (let r = 0; r < o; r++) {
    let a = s(t[r], t[r + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[r] || K : e;
      a = Ut(l, a);
    }
    i.push(a);
  }
  return i;
}
function Zo(t, e, { clamp: n = !0, ease: i, mixer: s } = {}) {
  const o = t.length;
  if (cn(o === e.length), o === 1)
    return () => e[0];
  if (o === 2 && e[0] === e[1])
    return () => e[1];
  const r = t[0] === t[1];
  t[0] > t[o - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = Xo(e, i, s), l = a.length, u = (c) => {
    if (r && c < t[0])
      return e[0];
    let d = 0;
    if (l > 1)
      for (; d < t.length - 2 && !(c < t[d + 1]); d++)
        ;
    const f = /* @__PURE__ */ It(t[d], t[d + 1], c);
    return a[d](f);
  };
  return n ? (c) => u(J(t[0], t[o - 1], c)) : u;
}
function Qo(t, e) {
  const n = t[t.length - 1];
  for (let i = 1; i <= e; i++) {
    const s = /* @__PURE__ */ It(0, e, i);
    t.push(N(n, 1, s));
  }
}
function Jo(t) {
  const e = [0];
  return Qo(e, t.length - 1), e;
}
function ta(t, e) {
  return t.map((n) => n * e);
}
function ea(t, e) {
  return t.map(() => e || As).splice(0, t.length - 1);
}
function Rt({ duration: t = 300, keyframes: e, times: n, ease: i = "easeInOut" }) {
  const s = ho(i) ? i.map(Wn) : Wn(i), o = {
    done: !1,
    value: e[0]
  }, r = ta(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : Jo(e),
    t
  ), a = Zo(r, e, {
    ease: Array.isArray(s) ? s : ea(e, s)
  });
  return {
    calculatedDuration: t,
    next: (l) => (o.value = a(l), o.done = l >= t, o)
  };
}
const na = (t) => t !== null;
function bn(t, { repeat: e, repeatType: n = "loop" }, i, s = 1) {
  const o = t.filter(na), a = s < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : o.length - 1;
  return !a || i === void 0 ? o[a] : i;
}
const ia = {
  decay: Be,
  inertia: Be,
  tween: Rt,
  keyframes: Rt,
  spring: oe
};
function Is(t) {
  typeof t.type == "string" && (t.type = ia[t.type]);
}
class wn {
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
const sa = (t) => t / 100;
class Sn extends wn {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== z.now() && this.tick(z.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    Is(e);
    const { type: n = Rt, repeat: i = 0, repeatDelay: s = 0, repeatType: o, velocity: r = 0 } = e;
    let { keyframes: a } = e;
    const l = n || Rt;
    l !== Rt && typeof a[0] != "number" && (this.mixKeyframes = Ut(sa, Ls(a[0], a[1])), a = [0, 100]);
    const u = l({ ...e, keyframes: a });
    o === "mirror" && (this.mirroredGenerator = l({
      ...e,
      keyframes: [...a].reverse(),
      velocity: -r
    })), u.calculatedDuration === null && (u.calculatedDuration = xn(u));
    const { calculatedDuration: c } = u;
    this.calculatedDuration = c, this.resolvedDuration = c + s, this.totalDuration = this.resolvedDuration * (i + 1) - s, this.generator = u;
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(e, n = !1) {
    const { generator: i, totalDuration: s, mixKeyframes: o, mirroredGenerator: r, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: u = 0, keyframes: c, repeat: d, repeatType: f, repeatDelay: y, type: x, onUpdate: w, finalKeyframe: T } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - s / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
    const b = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), S = this.playbackSpeed >= 0 ? b < 0 : b > s;
    this.currentTime = Math.max(b, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = s);
    let m = this.currentTime, p = i;
    if (d) {
      const P = Math.min(this.currentTime, s) / a;
      let L = Math.floor(P), j = P % 1;
      !j && P >= 1 && (j = 1), j === 1 && L--, L = Math.min(L, d + 1), !!(L % 2) && (f === "reverse" ? (j = 1 - j, y && (j -= y / a)) : f === "mirror" && (p = r)), m = J(0, 1, j) * a;
    }
    const v = S ? { done: !1, value: c[0] } : p.next(m);
    o && (v.value = o(v.value));
    let { done: A } = v;
    !S && l !== null && (A = this.playbackSpeed >= 0 ? this.currentTime >= s : this.currentTime <= 0);
    const k = this.holdTime === null && (this.state === "finished" || this.state === "running" && A);
    return k && x !== Be && (v.value = bn(c, this.options, T, this.speed)), w && w(v.value), k && this.finish(), v;
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
    return /* @__PURE__ */ H(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ H(e);
  }
  get time() {
    return /* @__PURE__ */ H(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ Y(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    this.updateTime(z.now());
    const n = this.playbackSpeed !== e;
    this.playbackSpeed = e, n && (this.time = /* @__PURE__ */ H(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = zo, startTime: n } = this.options;
    this.driver || (this.driver = e((s) => this.tick(s))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = n ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(z.now()), this.holdTime = this.currentTime;
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
function ra(t) {
  for (let e = 1; e < t.length; e++)
    t[e] ?? (t[e] = t[e - 1]);
}
const ht = (t) => t * 180 / Math.PI, Ie = (t) => {
  const e = ht(Math.atan2(t[1], t[0]));
  return Oe(e);
}, oa = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: Ie,
  rotateZ: Ie,
  skewX: (t) => ht(Math.atan(t[1])),
  skewY: (t) => ht(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, Oe = (t) => (t = t % 360, t < 0 && (t += 360), t), qn = Ie, Yn = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), Xn = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), aa = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Yn,
  scaleY: Xn,
  scale: (t) => (Yn(t) + Xn(t)) / 2,
  rotateX: (t) => Oe(ht(Math.atan2(t[6], t[5]))),
  rotateY: (t) => Oe(ht(Math.atan2(-t[2], t[0]))),
  rotateZ: qn,
  rotate: qn,
  skewX: (t) => ht(Math.atan(t[4])),
  skewY: (t) => ht(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function je(t) {
  return t.includes("scale") ? 1 : 0;
}
function _e(t, e) {
  if (!t || t === "none")
    return je(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, s;
  if (n)
    i = aa, s = n;
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = oa, s = a;
  }
  if (!s)
    return je(e);
  const o = i[e], r = s[1].split(",").map(ca);
  return typeof o == "function" ? o(r) : r[o];
}
const la = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return _e(n, e);
};
function ca(t) {
  return parseFloat(t.trim());
}
const kt = [
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
], Et = new Set(kt), Zn = (t) => t === Pt || t === E, ua = /* @__PURE__ */ new Set(["x", "y", "z"]), ha = kt.filter((t) => !ua.has(t));
function da(t) {
  const e = [];
  return ha.forEach((n) => {
    const i = t.getValue(n);
    i !== void 0 && (e.push([n, i.get()]), i.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const dt = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: (t, { transform: e }) => _e(e, "x"),
  y: (t, { transform: e }) => _e(e, "y")
};
dt.translateX = dt.x;
dt.translateY = dt.y;
const ft = /* @__PURE__ */ new Set();
let ze = !1, We = !1, Ue = !1;
function Os() {
  if (We) {
    const t = Array.from(ft).filter((i) => i.needsMeasurement), e = new Set(t.map((i) => i.element)), n = /* @__PURE__ */ new Map();
    e.forEach((i) => {
      const s = da(i);
      s.length && (n.set(i, s), i.render());
    }), t.forEach((i) => i.measureInitialState()), e.forEach((i) => {
      i.render();
      const s = n.get(i);
      s && s.forEach(([o, r]) => {
        i.getValue(o)?.set(r);
      });
    }), t.forEach((i) => i.measureEndState()), t.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  We = !1, ze = !1, ft.forEach((t) => t.complete(Ue)), ft.clear();
}
function js() {
  ft.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (We = !0);
  });
}
function fa() {
  Ue = !0, js(), Os(), Ue = !1;
}
class Tn {
  constructor(e, n, i, s, o, r = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = i, this.motionValue = s, this.element = o, this.isAsync = r;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ft.add(this), ze || (ze = !0, M.read(js), M.resolveKeyframes(Os))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: i, motionValue: s } = this;
    if (e[0] === null) {
      const o = s?.get(), r = e[e.length - 1];
      if (o !== void 0)
        e[0] = o;
      else if (i && n) {
        const a = i.readValue(n, r);
        a != null && (e[0] = a);
      }
      e[0] === void 0 && (e[0] = r), s && o === void 0 && s.set(e[0]);
    }
    ra(e);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), ft.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ft.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const ma = (t) => t.startsWith("--");
function pa(t, e, n) {
  ma(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
const ga = /* @__PURE__ */ un(() => window.ScrollTimeline !== void 0), ya = {};
function va(t, e) {
  const n = /* @__PURE__ */ un(t);
  return () => ya[e] ?? n();
}
const _s = /* @__PURE__ */ va(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Vt = ([t, e, n, i]) => `cubic-bezier(${t}, ${e}, ${n}, ${i})`, Qn = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Vt([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Vt([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Vt([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Vt([0.33, 1.53, 0.69, 0.99])
};
function zs(t, e) {
  if (t)
    return typeof t == "function" ? _s() ? Fs(t, e) : "ease-out" : Ps(t) ? Vt(t) : Array.isArray(t) ? t.map((n) => zs(n, e) || Qn.easeOut) : Qn[t];
}
function xa(t, e, n, { delay: i = 0, duration: s = 300, repeat: o = 0, repeatType: r = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const c = {
    [e]: n
  };
  l && (c.offset = l);
  const d = zs(a, s);
  Array.isArray(d) && (c.easing = d);
  const f = {
    delay: i,
    duration: s,
    easing: Array.isArray(d) ? "linear" : d,
    fill: "both",
    iterations: o + 1,
    direction: r === "reverse" ? "alternate" : "normal"
  };
  return u && (f.pseudoElement = u), t.animate(c, f);
}
function Ws(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function ba({ type: t, ...e }) {
  return Ws(t) && _s() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class wa extends wn {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !e)
      return;
    const { element: n, name: i, keyframes: s, pseudoElement: o, allowFlatten: r = !1, finalKeyframe: a, onComplete: l } = e;
    this.isPseudoElement = !!o, this.allowFlatten = r, this.options = e, cn(typeof e.type != "string");
    const u = ba(e);
    this.animation = xa(n, i, s, u, o), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !o) {
        const c = bn(s, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(c) : pa(n, i, c), this.animation.cancel();
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
    return /* @__PURE__ */ H(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ H(e);
  }
  get time() {
    return /* @__PURE__ */ H(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Y(e);
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && ga() ? (this.animation.timeline = e, K) : n(this);
  }
}
const Us = {
  anticipate: ws,
  backInOut: bs,
  circInOut: Ts
};
function Sa(t) {
  return t in Us;
}
function Ta(t) {
  typeof t.ease == "string" && Sa(t.ease) && (t.ease = Us[t.ease]);
}
const Jn = 10;
class Aa extends wa {
  constructor(e) {
    Ta(e), Is(e), super(e), e.startTime && (this.startTime = e.startTime), this.options = e;
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
    const { motionValue: n, onUpdate: i, onComplete: s, element: o, ...r } = this.options;
    if (!n)
      return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const a = new Sn({
      ...r,
      autoplay: !1
    }), l = /* @__PURE__ */ Y(this.finishedTime ?? this.time);
    n.setWithVelocity(a.sample(l - Jn).value, a.sample(l).value, Jn), a.stop();
  }
}
const ti = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
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
function ka(t, e, n, i) {
  const s = t[0];
  if (s === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const o = t[t.length - 1], r = ti(s, e), a = ti(o, e);
  return !r || !a ? !1 : Pa(t) || (n === "spring" || Ws(n)) && i;
}
function $e(t) {
  t.duration = 0, t.type = "keyframes";
}
const Ea = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), Ca = /* @__PURE__ */ un(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Ma(t) {
  const { motionValue: e, name: n, repeatDelay: i, repeatType: s, damping: o, type: r } = t;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: u } = e.owner.getProps();
  return Ca() && n && Ea.has(n) && (n !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !i && s !== "mirror" && o !== 0 && r !== "inertia";
}
const Na = 40;
class Va extends wn {
  constructor({ autoplay: e = !0, delay: n = 0, type: i = "keyframes", repeat: s = 0, repeatDelay: o = 0, repeatType: r = "loop", keyframes: a, name: l, motionValue: u, element: c, ...d }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = z.now();
    const f = {
      autoplay: e,
      delay: n,
      type: i,
      repeat: s,
      repeatDelay: o,
      repeatType: r,
      name: l,
      motionValue: u,
      element: c,
      ...d
    }, y = c?.KeyframeResolver || Tn;
    this.keyframeResolver = new y(a, (x, w, T) => this.onKeyframesResolved(x, w, f, !T), l, u, c), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, n, i, s) {
    this.keyframeResolver = void 0;
    const { name: o, type: r, velocity: a, delay: l, isHandoff: u, onUpdate: c } = i;
    this.resolvedAt = z.now(), ka(e, o, r, a) || ((tt.instantAnimations || !l) && c?.(bn(e, i, n)), e[0] = e[e.length - 1], $e(i), i.repeat = 0);
    const f = {
      startTime: s ? this.resolvedAt ? this.resolvedAt - this.createdAt > Na ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...i,
      keyframes: e
    }, y = !u && Ma(f) ? new Aa({
      ...f,
      element: f.motionValue.owner.current
    }) : new Sn(f);
    y.finished.then(() => this.notifyFinished()).catch(K), this.pendingTimeline && (this.stopTimeline = y.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = y;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), fa()), this._animation;
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
const Da = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Ra(t) {
  const e = Da.exec(t);
  if (!e)
    return [,];
  const [, n, i, s] = e;
  return [`--${n ?? i}`, s];
}
function $s(t, e, n = 1) {
  const [i, s] = Ra(t);
  if (!i)
    return;
  const o = window.getComputedStyle(e).getPropertyValue(i);
  if (o) {
    const r = o.trim();
    return ds(r) ? parseFloat(r) : r;
  }
  return pn(s) ? $s(s, e, n + 1) : s;
}
function An(t, e) {
  return t?.[e] ?? t?.default ?? t;
}
const Hs = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...kt
]), La = {
  test: (t) => t === "auto",
  parse: (t) => t
}, Ks = (t) => (e) => e.test(t), Gs = [Pt, E, X, nt, Po, Ao, La], ei = (t) => Gs.find(Ks(t));
function Fa(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || ms(t) : !0;
}
const Ba = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Ia(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [i] = n.match(gn) || [];
  if (!i)
    return t;
  const s = n.replace(i, "");
  let o = Ba.has(e) ? 1 : 0;
  return i !== n && (o *= 100), e + "(" + o + s + ")";
}
const Oa = /\b([a-z-]*)\(.*?\)/gu, He = {
  ...rt,
  getAnimatableNone: (t) => {
    const e = t.match(Oa);
    return e ? e.map(Ia).join(" ") : t;
  }
}, ni = {
  ...Pt,
  transform: Math.round
}, ja = {
  rotate: nt,
  rotateX: nt,
  rotateY: nt,
  rotateZ: nt,
  scale: Yt,
  scaleX: Yt,
  scaleY: Yt,
  scaleZ: Yt,
  skew: nt,
  skewX: nt,
  skewY: nt,
  distance: E,
  translateX: E,
  translateY: E,
  translateZ: E,
  x: E,
  y: E,
  z: E,
  perspective: E,
  transformPerspective: E,
  opacity: Ot,
  originX: Un,
  originY: Un,
  originZ: E
}, Pn = {
  // Border props
  borderWidth: E,
  borderTopWidth: E,
  borderRightWidth: E,
  borderBottomWidth: E,
  borderLeftWidth: E,
  borderRadius: E,
  radius: E,
  borderTopLeftRadius: E,
  borderTopRightRadius: E,
  borderBottomRightRadius: E,
  borderBottomLeftRadius: E,
  // Positioning props
  width: E,
  maxWidth: E,
  height: E,
  maxHeight: E,
  top: E,
  right: E,
  bottom: E,
  left: E,
  // Spacing props
  padding: E,
  paddingTop: E,
  paddingRight: E,
  paddingBottom: E,
  paddingLeft: E,
  margin: E,
  marginTop: E,
  marginRight: E,
  marginBottom: E,
  marginLeft: E,
  // Misc
  backgroundPositionX: E,
  backgroundPositionY: E,
  ...ja,
  zIndex: ni,
  // SVG
  fillOpacity: Ot,
  strokeOpacity: Ot,
  numOctaves: ni
}, _a = {
  ...Pn,
  // Color props
  color: R,
  backgroundColor: R,
  outlineColor: R,
  fill: R,
  stroke: R,
  // Border props
  borderColor: R,
  borderTopColor: R,
  borderRightColor: R,
  borderBottomColor: R,
  borderLeftColor: R,
  filter: He,
  WebkitFilter: He
}, qs = (t) => _a[t];
function Ys(t, e) {
  let n = qs(t);
  return n !== He && (n = rt), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const za = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Wa(t, e, n) {
  let i = 0, s;
  for (; i < t.length && !s; ) {
    const o = t[i];
    typeof o == "string" && !za.has(o) && jt(o).values.length && (s = t[i]), i++;
  }
  if (s && n)
    for (const o of e)
      t[o] = Ys(n, s);
}
class Ua extends Tn {
  constructor(e, n, i, s, o) {
    super(e, n, i, s, o, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: i } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < e.length; l++) {
      let u = e[l];
      if (typeof u == "string" && (u = u.trim(), pn(u))) {
        const c = $s(u, n.current);
        c !== void 0 && (e[l] = c), l === e.length - 1 && (this.finalKeyframe = u);
      }
    }
    if (this.resolveNoneKeyframes(), !Hs.has(i) || e.length !== 2)
      return;
    const [s, o] = e, r = ei(s), a = ei(o);
    if (r !== a)
      if (Zn(r) && Zn(a))
        for (let l = 0; l < e.length; l++) {
          const u = e[l];
          typeof u == "string" && (e[l] = parseFloat(u));
        }
      else dt[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, i = [];
    for (let s = 0; s < e.length; s++)
      (e[s] === null || Fa(e[s])) && i.push(s);
    i.length && Wa(e, i, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: i } = this;
    if (!e || !e.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = dt[i](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const s = n[n.length - 1];
    s !== void 0 && e.getValue(i, s).jump(s, !1);
  }
  measureEndState() {
    const { element: e, name: n, unresolvedKeyframes: i } = this;
    if (!e || !e.current)
      return;
    const s = e.getValue(n);
    s && s.jump(this.measuredOrigin, !1);
    const o = i.length - 1, r = i[o];
    i[o] = dt[n](e.measureViewportBox(), window.getComputedStyle(e.current)), r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r), this.removedTransforms?.length && this.removedTransforms.forEach(([a, l]) => {
      e.getValue(a).set(l);
    }), this.resolveNoneKeyframes();
  }
}
function $a(t, e, n) {
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let i = document;
    const s = n?.[t] ?? i.querySelectorAll(t);
    return s ? Array.from(s) : [];
  }
  return Array.from(t);
}
const Xs = (t, e) => e && typeof t == "number" ? e.transform(t) : t;
function Zs(t) {
  return fs(t) && "offsetHeight" in t;
}
const ii = 30, Ha = (t) => !isNaN(parseFloat(t));
class Ka {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const s = z.now();
      if (this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = z.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Ha(this.current));
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
    this.events[e] || (this.events[e] = new hn());
    const i = this.events[e].add(n);
    return e === "change" ? () => {
      i(), M.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : i;
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
  setWithVelocity(e, n, i) {
    this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - i;
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
    return this.current;
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
    const e = z.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > ii)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, ii);
    return ps(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
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
function St(t, e) {
  return new Ka(t, e);
}
const { schedule: kn } = /* @__PURE__ */ ks(queueMicrotask, !1), G = {
  x: !1,
  y: !1
};
function Qs() {
  return G.x || G.y;
}
function Ga(t) {
  return t === "x" || t === "y" ? G[t] ? null : (G[t] = !0, () => {
    G[t] = !1;
  }) : G.x || G.y ? null : (G.x = G.y = !0, () => {
    G.x = G.y = !1;
  });
}
function Js(t, e) {
  const n = $a(t), i = new AbortController(), s = {
    passive: !0,
    ...e,
    signal: i.signal
  };
  return [n, s, () => i.abort()];
}
function si(t) {
  return !(t.pointerType === "touch" || Qs());
}
function qa(t, e, n = {}) {
  const [i, s, o] = Js(t, n), r = (a) => {
    if (!si(a))
      return;
    const { target: l } = a, u = e(l, a);
    if (typeof u != "function" || !l)
      return;
    const c = (d) => {
      si(d) && (u(d), l.removeEventListener("pointerleave", c));
    };
    l.addEventListener("pointerleave", c, s);
  };
  return i.forEach((a) => {
    a.addEventListener("pointerenter", r, s);
  }), o;
}
const tr = (t, e) => e ? t === e ? !0 : tr(t, e.parentElement) : !1, En = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Ya = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Xa(t) {
  return Ya.has(t.tagName) || t.tabIndex !== -1;
}
const te = /* @__PURE__ */ new WeakSet();
function ri(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function xe(t, e) {
  t.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const Za = (t, e) => {
  const n = t.currentTarget;
  if (!n)
    return;
  const i = ri(() => {
    if (te.has(n))
      return;
    xe(n, "down");
    const s = ri(() => {
      xe(n, "up");
    }), o = () => xe(n, "cancel");
    n.addEventListener("keyup", s, e), n.addEventListener("blur", o, e);
  });
  n.addEventListener("keydown", i, e), n.addEventListener("blur", () => n.removeEventListener("keydown", i), e);
};
function oi(t) {
  return En(t) && !Qs();
}
function Qa(t, e, n = {}) {
  const [i, s, o] = Js(t, n), r = (a) => {
    const l = a.currentTarget;
    if (!oi(a))
      return;
    te.add(l);
    const u = e(l, a), c = (y, x) => {
      window.removeEventListener("pointerup", d), window.removeEventListener("pointercancel", f), te.has(l) && te.delete(l), oi(y) && typeof u == "function" && u(y, { success: x });
    }, d = (y) => {
      c(y, l === window || l === document || n.useGlobalTarget || tr(l, y.target));
    }, f = (y) => {
      c(y, !1);
    };
    window.addEventListener("pointerup", d, s), window.addEventListener("pointercancel", f, s);
  };
  return i.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", r, s), Zs(a) && (a.addEventListener("focus", (u) => Za(u, s)), !Xa(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), o;
}
function er(t) {
  return fs(t) && "ownerSVGElement" in t;
}
function Ja(t) {
  return er(t) && t.tagName === "svg";
}
const O = (t) => !!(t && t.getVelocity), tl = [...Gs, R, rt], el = (t) => tl.find(Ks(t)), Cn = At({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function ai(t, e) {
  if (typeof t == "function")
    return t(e);
  t != null && (t.current = e);
}
function nl(...t) {
  return (e) => {
    let n = !1;
    const i = t.map((s) => {
      const o = ai(s, e);
      return !n && typeof o == "function" && (n = !0), o;
    });
    if (n)
      return () => {
        for (let s = 0; s < i.length; s++) {
          const o = i[s];
          typeof o == "function" ? o() : ai(t[s], null);
        }
      };
  };
}
function il(...t) {
  return en(nl(...t), t);
}
class sl extends ls {
  getSnapshotBeforeUpdate(e) {
    const n = this.props.childRef.current;
    if (n && e.isPresent && !this.props.isPresent) {
      const i = n.offsetParent, s = Zs(i) && i.offsetWidth || 0, o = this.props.sizeRef.current;
      o.height = n.offsetHeight || 0, o.width = n.offsetWidth || 0, o.top = n.offsetTop, o.left = n.offsetLeft, o.right = s - o.width - o.left;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function rl({ children: t, isPresent: e, anchorX: n, root: i }) {
  const s = nn(), o = Q(null), r = Q({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0
  }), { nonce: a } = I(Cn), l = il(o, t?.ref);
  return us(() => {
    const { width: u, height: c, top: d, left: f, right: y } = r.current;
    if (e || !o.current || !u || !c)
      return;
    const x = n === "left" ? `left: ${f}` : `right: ${y}`;
    o.current.dataset.motionPopId = s;
    const w = document.createElement("style");
    a && (w.nonce = a);
    const T = i ?? document.head;
    return T.appendChild(w), w.sheet && w.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${c}px !important;
            ${x}px !important;
            top: ${d}px !important;
          }
        `), () => {
      T.contains(w) && T.removeChild(w);
    };
  }, [e]), h(sl, { isPresent: e, childRef: o, sizeRef: r, children: no(t, { ref: l }) });
}
const ol = ({ children: t, initial: e, isPresent: n, onExitComplete: i, custom: s, presenceAffectsLayout: o, mode: r, anchorX: a, root: l }) => {
  const u = rn(al), c = nn();
  let d = !0, f = mt(() => (d = !1, {
    id: c,
    initial: e,
    isPresent: n,
    custom: s,
    onExitComplete: (y) => {
      u.set(y, !0);
      for (const x of u.values())
        if (!x)
          return;
      i && i();
    },
    register: (y) => (u.set(y, !1), () => u.delete(y))
  }), [n, u, i]);
  return o && d && (f = { ...f }), mt(() => {
    u.forEach((y, x) => u.set(x, !1));
  }, [n]), it(() => {
    !n && !u.size && i && i();
  }, [n]), r === "popLayout" && (t = h(rl, { isPresent: n, anchorX: a, root: l, children: t })), h(ce.Provider, { value: f, children: t });
};
function al() {
  return /* @__PURE__ */ new Map();
}
function nr(t = !0) {
  const e = I(ce);
  if (e === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: i, register: s } = e, o = nn();
  it(() => {
    if (t)
      return s(o);
  }, [t]);
  const r = en(() => t && i && i(o), [o, i, t]);
  return !n && i ? [!1, r] : [!0];
}
const Xt = (t) => t.key || "";
function li(t) {
  const e = [];
  return to.forEach(t, (n) => {
    io(n) && e.push(n);
  }), e;
}
const Zt = ({ children: t, custom: e, initial: n = !0, onExitComplete: i, presenceAffectsLayout: s = !0, mode: o = "sync", propagate: r = !1, anchorX: a = "left", root: l }) => {
  const [u, c] = nr(r), d = mt(() => li(t), [t]), f = r && !u ? [] : d.map(Xt), y = Q(!0), x = Q(d), w = rn(() => /* @__PURE__ */ new Map()), [T, b] = q(d), [S, m] = q(d);
  hs(() => {
    y.current = !1, x.current = d;
    for (let A = 0; A < S.length; A++) {
      const k = Xt(S[A]);
      f.includes(k) ? w.delete(k) : w.get(k) !== !0 && w.set(k, !1);
    }
  }, [S, f.length, f.join("-")]);
  const p = [];
  if (d !== T) {
    let A = [...d];
    for (let k = 0; k < S.length; k++) {
      const P = S[k], L = Xt(P);
      f.includes(L) || (A.splice(k, 0, P), p.push(P));
    }
    return o === "wait" && p.length && (A = p), m(li(A)), b(d), null;
  }
  const { forceRender: v } = I(sn);
  return h(Jr, { children: S.map((A) => {
    const k = Xt(A), P = r && !u ? !1 : d === S || f.includes(k), L = () => {
      if (w.has(k))
        w.set(k, !0);
      else
        return;
      let j = !0;
      w.forEach((et) => {
        et || (j = !1);
      }), j && (v?.(), m(x.current), r && c?.(), i && i());
    };
    return h(ol, { isPresent: P, initial: !y.current || n ? void 0 : !1, custom: e, presenceAffectsLayout: s, mode: o, root: l, onExitComplete: P ? void 0 : L, anchorX: a, children: A }, k);
  }) });
}, ir = At({ strict: !1 }), ci = {
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
}, Tt = {};
for (const t in ci)
  Tt[t] = {
    isEnabled: (e) => ci[t].some((n) => !!e[n])
  };
function ll(t) {
  for (const e in t)
    Tt[e] = {
      ...Tt[e],
      ...t[e]
    };
}
const cl = /* @__PURE__ */ new Set([
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
function ae(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || cl.has(t);
}
let sr = (t) => !ae(t);
function ul(t) {
  typeof t == "function" && (sr = (e) => e.startsWith("on") ? !ae(e) : t(e));
}
try {
  ul(require("@emotion/is-prop-valid").default);
} catch {
}
function hl(t, e, n) {
  const i = {};
  for (const s in t)
    s === "values" && typeof t.values == "object" || (sr(s) || n === !0 && ae(s) || !e && !ae(s) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && s.startsWith("onDrag")) && (i[s] = t[s]);
  return i;
}
const ue = /* @__PURE__ */ At({});
function he(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function _t(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Mn = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Nn = ["initial", ...Mn];
function de(t) {
  return he(t.animate) || Nn.some((e) => _t(t[e]));
}
function rr(t) {
  return !!(de(t) || t.variants);
}
function dl(t, e) {
  if (de(t)) {
    const { initial: n, animate: i } = t;
    return {
      initial: n === !1 || _t(n) ? n : void 0,
      animate: _t(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? e : {};
}
function fl(t) {
  const { initial: e, animate: n } = dl(t, I(ue));
  return mt(() => ({ initial: e, animate: n }), [ui(e), ui(n)]);
}
function ui(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const zt = {};
function ml(t) {
  for (const e in t)
    zt[e] = t[e], mn(e) && (zt[e].isCSSVariable = !0);
}
function or(t, { layout: e, layoutId: n }) {
  return Et.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!zt[t] || t === "opacity");
}
const pl = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, gl = kt.length;
function yl(t, e, n) {
  let i = "", s = !0;
  for (let o = 0; o < gl; o++) {
    const r = kt[o], a = t[r];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (r.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const u = Xs(a, Pn[r]);
      if (!l) {
        s = !1;
        const c = pl[r] || r;
        i += `${c}(${u}) `;
      }
      n && (e[r] = u);
    }
  }
  return i = i.trim(), n ? i = n(e, s ? "" : i) : s && (i = "none"), i;
}
function Vn(t, e, n) {
  const { style: i, vars: s, transformOrigin: o } = t;
  let r = !1, a = !1;
  for (const l in e) {
    const u = e[l];
    if (Et.has(l)) {
      r = !0;
      continue;
    } else if (mn(l)) {
      s[l] = u;
      continue;
    } else {
      const c = Xs(u, Pn[l]);
      l.startsWith("origin") ? (a = !0, o[l] = c) : i[l] = c;
    }
  }
  if (e.transform || (r || n ? i.transform = yl(e, t.transform, n) : i.transform && (i.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = o;
    i.transformOrigin = `${l} ${u} ${c}`;
  }
}
const Dn = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function ar(t, e, n) {
  for (const i in e)
    !O(e[i]) && !or(i, n) && (t[i] = e[i]);
}
function vl({ transformTemplate: t }, e) {
  return mt(() => {
    const n = Dn();
    return Vn(n, e, t), Object.assign({}, n.vars, n.style);
  }, [e]);
}
function xl(t, e) {
  const n = t.style || {}, i = {};
  return ar(i, n, t), Object.assign(i, vl(t, e)), i;
}
function bl(t, e) {
  const n = {}, i = xl(t, e);
  return t.drag && t.dragListener !== !1 && (n.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0), n.style = i, n;
}
const wl = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Sl = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Tl(t, e, n = 1, i = 0, s = !0) {
  t.pathLength = 1;
  const o = s ? wl : Sl;
  t[o.offset] = E.transform(-i);
  const r = E.transform(e), a = E.transform(n);
  t[o.array] = `${r} ${a}`;
}
function lr(t, {
  attrX: e,
  attrY: n,
  attrScale: i,
  pathLength: s,
  pathSpacing: o = 1,
  pathOffset: r = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, u, c) {
  if (Vn(t, a, u), l) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: d, style: f } = t;
  d.transform && (f.transform = d.transform, delete d.transform), (f.transform || d.transformOrigin) && (f.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), f.transform && (f.transformBox = c?.transformBox ?? "fill-box", delete d.transformBox), e !== void 0 && (d.x = e), n !== void 0 && (d.y = n), i !== void 0 && (d.scale = i), s !== void 0 && Tl(d, s, o, r, !1);
}
const cr = () => ({
  ...Dn(),
  attrs: {}
}), ur = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Al(t, e, n, i) {
  const s = mt(() => {
    const o = cr();
    return lr(o, e, ur(i), t.transformTemplate, t.style), {
      ...o.attrs,
      style: { ...o.style }
    };
  }, [e]);
  if (t.style) {
    const o = {};
    ar(o, t.style, t), s.style = { ...o, ...s.style };
  }
  return s;
}
const Pl = [
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
function Rn(t) {
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
      !!(Pl.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function kl(t, e, n, { latestValues: i }, s, o = !1) {
  const a = (Rn(t) ? Al : bl)(e, i, s, t), l = hl(e, typeof t == "string", o), u = t !== cs ? { ...l, ...a, ref: n } : {}, { children: c } = e, d = mt(() => O(c) ? c.get() : c, [c]);
  return ie(t, {
    ...u,
    children: d
  });
}
function hi(t) {
  const e = [{}, {}];
  return t?.values.forEach((n, i) => {
    e[0][i] = n.get(), e[1][i] = n.getVelocity();
  }), e;
}
function Ln(t, e, n, i) {
  if (typeof e == "function") {
    const [s, o] = hi(i);
    e = e(n !== void 0 ? n : t.custom, s, o);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [s, o] = hi(i);
    e = e(n !== void 0 ? n : t.custom, s, o);
  }
  return e;
}
function ee(t) {
  return O(t) ? t.get() : t;
}
function El({ scrapeMotionValuesFromProps: t, createRenderState: e }, n, i, s) {
  return {
    latestValues: Cl(n, i, s, t),
    renderState: e()
  };
}
function Cl(t, e, n, i) {
  const s = {}, o = i(t, {});
  for (const f in o)
    s[f] = ee(o[f]);
  let { initial: r, animate: a } = t;
  const l = de(t), u = rr(t);
  e && u && !l && t.inherit !== !1 && (r === void 0 && (r = e.initial), a === void 0 && (a = e.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || r === !1;
  const d = c ? a : r;
  if (d && typeof d != "boolean" && !he(d)) {
    const f = Array.isArray(d) ? d : [d];
    for (let y = 0; y < f.length; y++) {
      const x = Ln(t, f[y]);
      if (x) {
        const { transitionEnd: w, transition: T, ...b } = x;
        for (const S in b) {
          let m = b[S];
          if (Array.isArray(m)) {
            const p = c ? m.length - 1 : 0;
            m = m[p];
          }
          m !== null && (s[S] = m);
        }
        for (const S in w)
          s[S] = w[S];
      }
    }
  }
  return s;
}
const hr = (t) => (e, n) => {
  const i = I(ue), s = I(ce), o = () => El(t, e, i, s);
  return n ? o() : rn(o);
};
function Fn(t, e, n) {
  const { style: i } = t, s = {};
  for (const o in i)
    (O(i[o]) || e.style && O(e.style[o]) || or(o, t) || n?.getValue(o)?.liveStyle !== void 0) && (s[o] = i[o]);
  return s;
}
const Ml = /* @__PURE__ */ hr({
  scrapeMotionValuesFromProps: Fn,
  createRenderState: Dn
});
function dr(t, e, n) {
  const i = Fn(t, e, n);
  for (const s in t)
    if (O(t[s]) || O(e[s])) {
      const o = kt.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
      i[o] = t[s];
    }
  return i;
}
const Nl = /* @__PURE__ */ hr({
  scrapeMotionValuesFromProps: dr,
  createRenderState: cr
}), Vl = Symbol.for("motionComponentSymbol");
function yt(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function Dl(t, e, n) {
  return en(
    (i) => {
      i && t.onMount && t.onMount(i), e && (i ? e.mount(i) : e.unmount()), n && (typeof n == "function" ? n(i) : yt(n) && (n.current = i));
    },
    /**
     * Include externalRef in dependencies to ensure the callback updates
     * when the ref changes, allowing proper ref forwarding.
     */
    [e]
  );
}
const Bn = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), Rl = "framerAppearId", fr = "data-" + Bn(Rl), mr = At({});
function Ll(t, e, n, i, s) {
  const { visualElement: o } = I(ue), r = I(ir), a = I(ce), l = I(Cn).reducedMotion, u = Q(null);
  i = i || r.renderer, !u.current && i && (u.current = i(t, {
    visualState: e,
    parent: o,
    props: n,
    presenceContext: a,
    blockInitialAnimation: a ? a.initial === !1 : !1,
    reducedMotionConfig: l
  }));
  const c = u.current, d = I(mr);
  c && !c.projection && s && (c.type === "html" || c.type === "svg") && Fl(u.current, n, s, d);
  const f = Q(!1);
  us(() => {
    c && f.current && c.update(n, a);
  });
  const y = n[fr], x = Q(!!y && !window.MotionHandoffIsComplete?.(y) && window.MotionHasOptimisedAnimation?.(y));
  return hs(() => {
    c && (f.current = !0, window.MotionIsMounted = !0, c.updateFeatures(), c.scheduleRenderMicrotask(), x.current && c.animationState && c.animationState.animateChanges());
  }), it(() => {
    c && (!x.current && c.animationState && c.animationState.animateChanges(), x.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(y);
    }), x.current = !1), c.enteringChildren = void 0);
  }), c;
}
function Fl(t, e, n, i) {
  const { layoutId: s, layout: o, drag: r, dragConstraints: a, layoutScroll: l, layoutRoot: u, layoutCrossfade: c } = e;
  t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : pr(t.parent)), t.projection.setOptions({
    layoutId: s,
    layout: o,
    alwaysMeasureLayout: !!r || a && yt(a),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof o == "string" ? o : "both",
    initialPromotionConfig: i,
    crossfade: c,
    layoutScroll: l,
    layoutRoot: u
  });
}
function pr(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : pr(t.parent);
}
function be(t, { forwardMotionProps: e = !1 } = {}, n, i) {
  n && ll(n);
  const s = Rn(t) ? Nl : Ml;
  function o(a, l) {
    let u;
    const c = {
      ...I(Cn),
      ...a,
      layoutId: Bl(a)
    }, { isStatic: d } = c, f = fl(a), y = s(a, d);
    if (!d && on) {
      Il();
      const x = Ol(c);
      u = x.MeasureLayout, f.visualElement = Ll(t, y, c, i, x.ProjectionNode);
    }
    return g(ue.Provider, { value: f, children: [u && f.visualElement ? h(u, { visualElement: f.visualElement, ...c }) : null, kl(t, a, Dl(y, f.visualElement, l), y, d, e)] });
  }
  o.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const r = tn(o);
  return r[Vl] = t, r;
}
function Bl({ layoutId: t }) {
  const e = I(sn).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function Il(t, e) {
  I(ir).strict;
}
function Ol(t) {
  const { drag: e, layout: n } = Tt;
  if (!e && !n)
    return {};
  const i = { ...e, ...n };
  return {
    MeasureLayout: e?.isEnabled(t) || n?.isEnabled(t) ? i.MeasureLayout : void 0,
    ProjectionNode: i.ProjectionNode
  };
}
function jl(t, e) {
  if (typeof Proxy > "u")
    return be;
  const n = /* @__PURE__ */ new Map(), i = (o, r) => be(o, r, t, e), s = (o, r) => i(o, r);
  return new Proxy(s, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (o, r) => r === "create" ? i : (n.has(r) || n.set(r, be(r, void 0, t, e)), n.get(r))
  });
}
function gr({ top: t, left: e, right: n, bottom: i }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: i }
  };
}
function _l({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function zl(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), i = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: i.y,
    right: i.x
  };
}
function we(t) {
  return t === void 0 || t === 1;
}
function Ke({ scale: t, scaleX: e, scaleY: n }) {
  return !we(t) || !we(e) || !we(n);
}
function ct(t) {
  return Ke(t) || yr(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function yr(t) {
  return di(t.x) || di(t.y);
}
function di(t) {
  return t && t !== "0%";
}
function le(t, e, n) {
  const i = t - n, s = e * i;
  return n + s;
}
function fi(t, e, n, i, s) {
  return s !== void 0 && (t = le(t, s, i)), le(t, n, i) + e;
}
function Ge(t, e = 0, n = 1, i, s) {
  t.min = fi(t.min, e, n, i, s), t.max = fi(t.max, e, n, i, s);
}
function vr(t, { x: e, y: n }) {
  Ge(t.x, e.translate, e.scale, e.originPoint), Ge(t.y, n.translate, n.scale, n.originPoint);
}
const mi = 0.999999999999, pi = 1.0000000000001;
function Wl(t, e, n, i = !1) {
  const s = n.length;
  if (!s)
    return;
  e.x = e.y = 1;
  let o, r;
  for (let a = 0; a < s; a++) {
    o = n[a], r = o.projectionDelta;
    const { visualElement: l } = o.options;
    l && l.props.style && l.props.style.display === "contents" || (i && o.options.layoutScroll && o.scroll && o !== o.root && xt(t, {
      x: -o.scroll.offset.x,
      y: -o.scroll.offset.y
    }), r && (e.x *= r.x.scale, e.y *= r.y.scale, vr(t, r)), i && ct(o.latestValues) && xt(t, o.latestValues));
  }
  e.x < pi && e.x > mi && (e.x = 1), e.y < pi && e.y > mi && (e.y = 1);
}
function vt(t, e) {
  t.min = t.min + e, t.max = t.max + e;
}
function gi(t, e, n, i, s = 0.5) {
  const o = N(t.min, t.max, s);
  Ge(t, e, n, o, i);
}
function xt(t, e) {
  gi(t.x, e.x, e.scaleX, e.scale, e.originX), gi(t.y, e.y, e.scaleY, e.scale, e.originY);
}
function xr(t, e) {
  return gr(zl(t.getBoundingClientRect(), e));
}
function Ul(t, e, n) {
  const i = xr(t, n), { scroll: s } = e;
  return s && (vt(i.x, s.offset.x), vt(i.y, s.offset.y)), i;
}
const yi = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), bt = () => ({
  x: yi(),
  y: yi()
}), vi = () => ({ min: 0, max: 0 }), D = () => ({
  x: vi(),
  y: vi()
}), qe = { current: null }, br = { current: !1 };
function $l() {
  if (br.current = !0, !!on)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => qe.current = t.matches;
      t.addEventListener("change", e), e();
    } else
      qe.current = !1;
}
const Hl = /* @__PURE__ */ new WeakMap();
function Kl(t, e, n) {
  for (const i in e) {
    const s = e[i], o = n[i];
    if (O(s))
      t.addValue(i, s);
    else if (O(o))
      t.addValue(i, St(s, { owner: t }));
    else if (o !== s)
      if (t.hasValue(i)) {
        const r = t.getValue(i);
        r.liveStyle === !0 ? r.jump(s) : r.hasAnimated || r.set(s);
      } else {
        const r = t.getStaticValue(i);
        t.addValue(i, St(r !== void 0 ? r : s, { owner: t }));
      }
  }
  for (const i in n)
    e[i] === void 0 && t.removeValue(i);
  return e;
}
const xi = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class Gl {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n, i) {
    return {};
  }
  constructor({ parent: e, props: n, presenceContext: i, reducedMotionConfig: s, blockInitialAnimation: o, visualState: r }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Tn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const f = z.now();
      this.renderScheduledAt < f && (this.renderScheduledAt = f, M.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u } = r;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = e, this.props = n, this.presenceContext = i, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = s, this.options = a, this.blockInitialAnimation = !!o, this.isControllingVariants = de(n), this.isVariantNode = rr(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: c, ...d } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const f in d) {
      const y = d[f];
      l[f] !== void 0 && O(y) && y.set(l[f]);
    }
  }
  mount(e) {
    this.current = e, Hl.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, i) => this.bindToMotionValue(i, n)), br.current || $l(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : qe.current, this.parent?.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), st(this.notifyUpdate), st(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    const i = Et.has(e);
    i && this.onBindTransform && this.onBindTransform();
    const s = n.on("change", (r) => {
      this.latestValues[e] = r, this.props.onUpdate && M.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let o;
    window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      s(), o && o(), n.owner && n.stop();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in Tt) {
      const n = Tt[e];
      if (!n)
        continue;
      const { isEnabled: i, Feature: s } = n;
      if (!this.features[e] && s && i(this.props) && (this.features[e] = new s(this)), this.features[e]) {
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : D();
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
    for (let i = 0; i < xi.length; i++) {
      const s = xi[i];
      this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
      const o = "on" + s, r = e[o];
      r && (this.propEventSubscriptions[s] = this.on(s, r));
    }
    this.prevMotionValues = Kl(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    const i = this.values.get(e);
    n !== i && (i && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get());
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
    let i = this.values.get(e);
    return i === void 0 && n !== void 0 && (i = St(n === null ? void 0 : n, { owner: this }), this.addValue(e, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    let i = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return i != null && (typeof i == "string" && (ds(i) || ms(i)) ? i = parseFloat(i) : !el(i) && rt.test(n) && (i = Ys(e, n)), this.setBaseTarget(e, O(i) ? i.get() : i)), O(i) ? i.get() : i;
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
    let i;
    if (typeof n == "string" || typeof n == "object") {
      const o = Ln(this.props, n, this.presenceContext?.custom);
      o && (i = o[e]);
    }
    if (n && i !== void 0)
      return i;
    const s = this.getBaseTargetFromProps(this.props, e);
    return s !== void 0 && !O(s) ? s : this.initialValues[e] !== void 0 && i === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new hn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    kn.render(this.render);
  }
}
class wr extends Gl {
  constructor() {
    super(...arguments), this.KeyframeResolver = Ua;
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    return e.style ? e.style[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: i }) {
    delete n[e], delete i[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    O(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function Sr(t, { style: e, vars: n }, i, s) {
  const o = t.style;
  let r;
  for (r in e)
    o[r] = e[r];
  s?.applyProjectionStyles(o, i);
  for (r in n)
    o.setProperty(r, n[r]);
}
function ql(t) {
  return window.getComputedStyle(t);
}
class Yl extends wr {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Sr;
  }
  readValueFromInstance(e, n) {
    if (Et.has(n))
      return this.projection?.isProjecting ? je(n) : la(e, n);
    {
      const i = ql(e), s = (mn(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof s == "string" ? s.trim() : s;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return xr(e, n);
  }
  build(e, n, i) {
    Vn(e, n, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return Fn(e, n, i);
  }
}
const Tr = /* @__PURE__ */ new Set([
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
function Xl(t, e, n, i) {
  Sr(t, e, void 0, i);
  for (const s in e.attrs)
    t.setAttribute(Tr.has(s) ? s : Bn(s), e.attrs[s]);
}
class Zl extends wr {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = D;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (Et.has(n)) {
      const i = qs(n);
      return i && i.default || 0;
    }
    return n = Tr.has(n) ? n : Bn(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return dr(e, n, i);
  }
  build(e, n, i) {
    lr(e, n, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(e, n, i, s) {
    Xl(e, n, i, s);
  }
  mount(e) {
    this.isSVGTag = ur(e.tagName), super.mount(e);
  }
}
const Ql = (t, e) => Rn(t) ? new Zl(e) : new Yl(e, {
  allowProjection: t !== cs
});
function wt(t, e, n) {
  const i = t.getProps();
  return Ln(i, e, n !== void 0 ? n : i.custom, t);
}
const Ye = (t) => Array.isArray(t);
function Jl(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, St(n));
}
function tc(t) {
  return Ye(t) ? t[t.length - 1] || 0 : t;
}
function ec(t, e) {
  const n = wt(t, e);
  let { transitionEnd: i = {}, transition: s = {}, ...o } = n || {};
  o = { ...o, ...i };
  for (const r in o) {
    const a = tc(o[r]);
    Jl(t, r, a);
  }
}
function nc(t) {
  return !!(O(t) && t.add);
}
function Xe(t, e) {
  const n = t.getValue("willChange");
  if (nc(n))
    return n.add(e);
  if (!n && tt.WillChange) {
    const i = new tt.WillChange("auto");
    t.addValue("willChange", i), i.add(e);
  }
}
function Ar(t) {
  return t.props[fr];
}
const ic = (t) => t !== null;
function sc(t, { repeat: e, repeatType: n = "loop" }, i) {
  const s = t.filter(ic), o = e && n !== "loop" && e % 2 === 1 ? 0 : s.length - 1;
  return s[o];
}
const rc = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, oc = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), ac = {
  type: "keyframes",
  duration: 0.8
}, lc = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, cc = (t, { keyframes: e }) => e.length > 2 ? ac : Et.has(t) ? t.startsWith("scale") ? oc(e[1]) : rc : lc;
function uc({ when: t, delay: e, delayChildren: n, staggerChildren: i, staggerDirection: s, repeat: o, repeatType: r, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
const In = (t, e, n, i = {}, s, o) => (r) => {
  const a = An(i, t) || {}, l = a.delay || i.delay || 0;
  let { elapsed: u = 0 } = i;
  u = u - /* @__PURE__ */ Y(l);
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
    element: o ? void 0 : s
  };
  uc(a) || Object.assign(c, cc(t, c)), c.duration && (c.duration = /* @__PURE__ */ Y(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ Y(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let d = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && ($e(c), c.delay === 0 && (d = !0)), (tt.instantAnimations || tt.skipAnimations) && (d = !0, $e(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, d && !o && e.get() !== void 0) {
    const f = sc(c.keyframes, a);
    if (f !== void 0) {
      M.update(() => {
        c.onUpdate(f), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Sn(c) : new Va(c);
};
function hc({ protectedKeys: t, needsAnimating: e }, n) {
  const i = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, i;
}
function Pr(t, e, { delay: n = 0, transitionOverride: i, type: s } = {}) {
  let { transition: o = t.getDefaultTransition(), transitionEnd: r, ...a } = e;
  i && (o = i);
  const l = [], u = s && t.animationState && t.animationState.getState()[s];
  for (const c in a) {
    const d = t.getValue(c, t.latestValues[c] ?? null), f = a[c];
    if (f === void 0 || u && hc(u, c))
      continue;
    const y = {
      delay: n,
      ...An(o || {}, c)
    }, x = d.get();
    if (x !== void 0 && !d.isAnimating && !Array.isArray(f) && f === x && !y.velocity)
      continue;
    let w = !1;
    if (window.MotionHandoffAnimation) {
      const b = Ar(t);
      if (b) {
        const S = window.MotionHandoffAnimation(b, c, M);
        S !== null && (y.startTime = S, w = !0);
      }
    }
    Xe(t, c), d.start(In(c, d, f, t.shouldReduceMotion && Hs.has(c) ? { type: !1 } : y, t, w));
    const T = d.animation;
    T && l.push(T);
  }
  return r && Promise.all(l).then(() => {
    M.update(() => {
      r && ec(t, r);
    });
  }), l;
}
function kr(t, e, n, i = 0, s = 1) {
  const o = Array.from(t).sort((u, c) => u.sortNodePosition(c)).indexOf(e), r = t.size, a = (r - 1) * i;
  return typeof n == "function" ? n(o, r) : s === 1 ? o * i : a - o * i;
}
function Ze(t, e, n = {}) {
  const i = wt(t, e, n.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: s = t.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (s = n.transitionOverride);
  const o = i ? () => Promise.all(Pr(t, i, n)) : () => Promise.resolve(), r = t.variantChildren && t.variantChildren.size ? (l = 0) => {
    const { delayChildren: u = 0, staggerChildren: c, staggerDirection: d } = s;
    return dc(t, e, l, u, c, d, n);
  } : () => Promise.resolve(), { when: a } = s;
  if (a) {
    const [l, u] = a === "beforeChildren" ? [o, r] : [r, o];
    return l().then(() => u());
  } else
    return Promise.all([o(), r(n.delay)]);
}
function dc(t, e, n = 0, i = 0, s = 0, o = 1, r) {
  const a = [];
  for (const l of t.variantChildren)
    l.notify("AnimationStart", e), a.push(Ze(l, e, {
      ...r,
      delay: n + (typeof i == "function" ? 0 : i) + kr(t.variantChildren, l, i, s, o)
    }).then(() => l.notify("AnimationComplete", e)));
  return Promise.all(a);
}
function fc(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let i;
  if (Array.isArray(e)) {
    const s = e.map((o) => Ze(t, o, n));
    i = Promise.all(s);
  } else if (typeof e == "string")
    i = Ze(t, e, n);
  else {
    const s = typeof e == "function" ? wt(t, e, n.custom) : e;
    i = Promise.all(Pr(t, s, n));
  }
  return i.then(() => {
    t.notify("AnimationComplete", e);
  });
}
function Er(t, e) {
  if (!Array.isArray(e))
    return !1;
  const n = e.length;
  if (n !== t.length)
    return !1;
  for (let i = 0; i < n; i++)
    if (e[i] !== t[i])
      return !1;
  return !0;
}
const mc = Nn.length;
function Cr(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const n = t.parent ? Cr(t.parent) || {} : {};
    return t.props.initial !== void 0 && (n.initial = t.props.initial), n;
  }
  const e = {};
  for (let n = 0; n < mc; n++) {
    const i = Nn[n], s = t.props[i];
    (_t(s) || s === !1) && (e[i] = s);
  }
  return e;
}
const pc = [...Mn].reverse(), gc = Mn.length;
function yc(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: i }) => fc(t, n, i)));
}
function vc(t) {
  let e = yc(t), n = bi(), i = !0;
  const s = (l) => (u, c) => {
    const d = wt(t, c, l === "exit" ? t.presenceContext?.custom : void 0);
    if (d) {
      const { transition: f, transitionEnd: y, ...x } = d;
      u = { ...u, ...x, ...y };
    }
    return u;
  };
  function o(l) {
    e = l(t);
  }
  function r(l) {
    const { props: u } = t, c = Cr(t.parent) || {}, d = [], f = /* @__PURE__ */ new Set();
    let y = {}, x = 1 / 0;
    for (let T = 0; T < gc; T++) {
      const b = pc[T], S = n[b], m = u[b] !== void 0 ? u[b] : c[b], p = _t(m), v = b === l ? S.isActive : null;
      v === !1 && (x = T);
      let A = m === c[b] && m !== u[b] && p;
      if (A && i && t.manuallyAnimateOnMount && (A = !1), S.protectedKeys = { ...y }, // If it isn't active and hasn't *just* been set as inactive
      !S.isActive && v === null || // If we didn't and don't have any defined prop for this animation type
      !m && !S.prevProp || // Or if the prop doesn't define an animation
      he(m) || typeof m == "boolean")
        continue;
      const k = xc(S.prevProp, m);
      let P = k || // If we're making this variant active, we want to always make it active
      b === l && S.isActive && !A && p || // If we removed a higher-priority variant (i is in reverse order)
      T > x && p, L = !1;
      const j = Array.isArray(m) ? m : [m];
      let et = j.reduce(s(b), {});
      v === !1 && (et = {});
      const { prevResolvedValues: On = {} } = S, Xr = {
        ...On,
        ...et
      }, jn = (F) => {
        P = !0, f.has(F) && (L = !0, f.delete(F)), S.needsAnimating[F] = !0;
        const W = t.getValue(F);
        W && (W.liveStyle = !1);
      };
      for (const F in Xr) {
        const W = et[F], at = On[F];
        if (y.hasOwnProperty(F))
          continue;
        let pt = !1;
        Ye(W) && Ye(at) ? pt = !Er(W, at) : pt = W !== at, pt ? W != null ? jn(F) : f.add(F) : W !== void 0 && f.has(F) ? jn(F) : S.protectedKeys[F] = !0;
      }
      S.prevProp = m, S.prevResolvedValues = et, S.isActive && (y = { ...y, ...et }), i && t.blockInitialAnimation && (P = !1);
      const _n = A && k;
      P && (!_n || L) && d.push(...j.map((F) => {
        const W = { type: b };
        if (typeof F == "string" && i && !_n && t.manuallyAnimateOnMount && t.parent) {
          const { parent: at } = t, pt = wt(at, F);
          if (at.enteringChildren && pt) {
            const { delayChildren: Zr } = pt.transition || {};
            W.delay = kr(at.enteringChildren, t, Zr);
          }
        }
        return {
          animation: F,
          options: W
        };
      }));
    }
    if (f.size) {
      const T = {};
      if (typeof u.initial != "boolean") {
        const b = wt(t, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        b && b.transition && (T.transition = b.transition);
      }
      f.forEach((b) => {
        const S = t.getBaseTarget(b), m = t.getValue(b);
        m && (m.liveStyle = !0), T[b] = S ?? null;
      }), d.push({ animation: T });
    }
    let w = !!d.length;
    return i && (u.initial === !1 || u.initial === u.animate) && !t.manuallyAnimateOnMount && (w = !1), i = !1, w ? e(d) : Promise.resolve();
  }
  function a(l, u) {
    if (n[l].isActive === u)
      return Promise.resolve();
    t.variantChildren?.forEach((d) => d.animationState?.setActive(l, u)), n[l].isActive = u;
    const c = r(l);
    for (const d in n)
      n[d].protectedKeys = {};
    return c;
  }
  return {
    animateChanges: r,
    setActive: a,
    setAnimateFunction: o,
    getState: () => n,
    reset: () => {
      n = bi();
    }
  };
}
function xc(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !Er(e, t) : !1;
}
function lt(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function bi() {
  return {
    animate: lt(!0),
    whileInView: lt(),
    whileHover: lt(),
    whileTap: lt(),
    whileDrag: lt(),
    whileFocus: lt(),
    exit: lt()
  };
}
class ot {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
class bc extends ot {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = vc(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    he(e) && (this.unmountControls = e.subscribe(this.node));
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
let wc = 0;
class Sc extends ot {
  constructor() {
    super(...arguments), this.id = wc++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: e, onExitComplete: n } = this.node.presenceContext, { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === i)
      return;
    const s = this.node.animationState.setActive("exit", !e);
    n && !e && s.then(() => {
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
const Tc = {
  animation: {
    Feature: bc
  },
  exit: {
    Feature: Sc
  }
};
function Wt(t, e, n, i = { passive: !0 }) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n);
}
function Kt(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
const Ac = (t) => (e) => En(e) && t(e, Kt(e));
function Lt(t, e, n, i) {
  return Wt(t, e, Ac(n), i);
}
const Mr = 1e-4, Pc = 1 - Mr, kc = 1 + Mr, Nr = 0.01, Ec = 0 - Nr, Cc = 0 + Nr;
function _(t) {
  return t.max - t.min;
}
function Mc(t, e, n) {
  return Math.abs(t - e) <= n;
}
function wi(t, e, n, i = 0.5) {
  t.origin = i, t.originPoint = N(e.min, e.max, t.origin), t.scale = _(n) / _(e), t.translate = N(n.min, n.max, t.origin) - t.originPoint, (t.scale >= Pc && t.scale <= kc || isNaN(t.scale)) && (t.scale = 1), (t.translate >= Ec && t.translate <= Cc || isNaN(t.translate)) && (t.translate = 0);
}
function Ft(t, e, n, i) {
  wi(t.x, e.x, n.x, i ? i.originX : void 0), wi(t.y, e.y, n.y, i ? i.originY : void 0);
}
function Si(t, e, n) {
  t.min = n.min + e.min, t.max = t.min + _(e);
}
function Nc(t, e, n) {
  Si(t.x, e.x, n.x), Si(t.y, e.y, n.y);
}
function Ti(t, e, n) {
  t.min = e.min - n.min, t.max = t.min + _(e);
}
function Bt(t, e, n) {
  Ti(t.x, e.x, n.x), Ti(t.y, e.y, n.y);
}
function $(t) {
  return [t("x"), t("y")];
}
const Vr = ({ current: t }) => t ? t.ownerDocument.defaultView : null, Ai = (t, e) => Math.abs(t - e);
function Vc(t, e) {
  const n = Ai(t.x, e.x), i = Ai(t.y, e.y);
  return Math.sqrt(n ** 2 + i ** 2);
}
class Dr {
  constructor(e, n, { transformPagePoint: i, contextWindow: s = window, dragSnapToOrigin: o = !1, distanceThreshold: r = 3 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const f = Te(this.lastMoveEventInfo, this.history), y = this.startEvent !== null, x = Vc(f.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!y && !x)
        return;
      const { point: w } = f, { timestamp: T } = B;
      this.history.push({ ...w, timestamp: T });
      const { onStart: b, onMove: S } = this.handlers;
      y || (b && b(this.lastMoveEvent, f), this.startEvent = this.lastMoveEvent), S && S(this.lastMoveEvent, f);
    }, this.handlePointerMove = (f, y) => {
      this.lastMoveEvent = f, this.lastMoveEventInfo = Se(y, this.transformPagePoint), M.update(this.updatePoint, !0);
    }, this.handlePointerUp = (f, y) => {
      this.end();
      const { onEnd: x, onSessionEnd: w, resumeAnimation: T } = this.handlers;
      if (this.dragSnapToOrigin && T && T(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const b = Te(f.type === "pointercancel" ? this.lastMoveEventInfo : Se(y, this.transformPagePoint), this.history);
      this.startEvent && x && x(f, b), w && w(f, b);
    }, !En(e))
      return;
    this.dragSnapToOrigin = o, this.handlers = n, this.transformPagePoint = i, this.distanceThreshold = r, this.contextWindow = s || window;
    const a = Kt(e), l = Se(a, this.transformPagePoint), { point: u } = l, { timestamp: c } = B;
    this.history = [{ ...u, timestamp: c }];
    const { onSessionStart: d } = n;
    d && d(e, Te(l, this.history)), this.removeListeners = Ut(Lt(this.contextWindow, "pointermove", this.handlePointerMove), Lt(this.contextWindow, "pointerup", this.handlePointerUp), Lt(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), st(this.updatePoint);
  }
}
function Se(t, e) {
  return e ? { point: e(t.point) } : t;
}
function Pi(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function Te({ point: t }, e) {
  return {
    point: t,
    delta: Pi(t, Rr(e)),
    offset: Pi(t, Dc(e)),
    velocity: Rc(e, 0.1)
  };
}
function Dc(t) {
  return t[0];
}
function Rr(t) {
  return t[t.length - 1];
}
function Rc(t, e) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let n = t.length - 1, i = null;
  const s = Rr(t);
  for (; n >= 0 && (i = t[n], !(s.timestamp - i.timestamp > /* @__PURE__ */ Y(e))); )
    n--;
  if (!i)
    return { x: 0, y: 0 };
  const o = /* @__PURE__ */ H(s.timestamp - i.timestamp);
  if (o === 0)
    return { x: 0, y: 0 };
  const r = {
    x: (s.x - i.x) / o,
    y: (s.y - i.y) / o
  };
  return r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r;
}
function Lc(t, { min: e, max: n }, i) {
  return e !== void 0 && t < e ? t = i ? N(e, t, i.min) : Math.max(t, e) : n !== void 0 && t > n && (t = i ? N(n, t, i.max) : Math.min(t, n)), t;
}
function ki(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
  };
}
function Fc(t, { top: e, left: n, bottom: i, right: s }) {
  return {
    x: ki(t.x, n, s),
    y: ki(t.y, e, i)
  };
}
function Ei(t, e) {
  let n = e.min - t.min, i = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, i] = [i, n]), { min: n, max: i };
}
function Bc(t, e) {
  return {
    x: Ei(t.x, e.x),
    y: Ei(t.y, e.y)
  };
}
function Ic(t, e) {
  let n = 0.5;
  const i = _(t), s = _(e);
  return s > i ? n = /* @__PURE__ */ It(e.min, e.max - i, t.min) : i > s && (n = /* @__PURE__ */ It(t.min, t.max - s, e.min)), J(0, 1, n);
}
function Oc(t, e) {
  const n = {};
  return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n;
}
const Qe = 0.35;
function jc(t = Qe) {
  return t === !1 ? t = 0 : t === !0 && (t = Qe), {
    x: Ci(t, "left", "right"),
    y: Ci(t, "top", "bottom")
  };
}
function Ci(t, e, n) {
  return {
    min: Mi(t, e),
    max: Mi(t, n)
  };
}
function Mi(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const _c = /* @__PURE__ */ new WeakMap();
class zc {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = D(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: n = !1, distanceThreshold: i } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1)
      return;
    const o = (d) => {
      const { dragSnapToOrigin: f } = this.getProps();
      f ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(Kt(d).point);
    }, r = (d, f) => {
      const { drag: y, dragPropagation: x, onDragStart: w } = this.getProps();
      if (y && !x && (this.openDragLock && this.openDragLock(), this.openDragLock = Ga(y), !this.openDragLock))
        return;
      this.latestPointerEvent = d, this.latestPanInfo = f, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), $((b) => {
        let S = this.getAxisMotionValue(b).get() || 0;
        if (X.test(S)) {
          const { projection: m } = this.visualElement;
          if (m && m.layout) {
            const p = m.layout.layoutBox[b];
            p && (S = _(p) * (parseFloat(S) / 100));
          }
        }
        this.originPoint[b] = S;
      }), w && M.postRender(() => w(d, f)), Xe(this.visualElement, "transform");
      const { animationState: T } = this.visualElement;
      T && T.setActive("whileDrag", !0);
    }, a = (d, f) => {
      this.latestPointerEvent = d, this.latestPanInfo = f;
      const { dragPropagation: y, dragDirectionLock: x, onDirectionLock: w, onDrag: T } = this.getProps();
      if (!y && !this.openDragLock)
        return;
      const { offset: b } = f;
      if (x && this.currentDirection === null) {
        this.currentDirection = Wc(b), this.currentDirection !== null && w && w(this.currentDirection);
        return;
      }
      this.updateAxis("x", f.point, b), this.updateAxis("y", f.point, b), this.visualElement.render(), T && T(d, f);
    }, l = (d, f) => {
      this.latestPointerEvent = d, this.latestPanInfo = f, this.stop(d, f), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, u = () => $((d) => this.getAnimationState(d) === "paused" && this.getAxisMotionValue(d).animation?.play()), { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new Dr(e, {
      onSessionStart: o,
      onStart: r,
      onMove: a,
      onSessionEnd: l,
      resumeAnimation: u
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: c,
      distanceThreshold: i,
      contextWindow: Vr(this.visualElement)
    });
  }
  /**
   * @internal
   */
  stop(e, n) {
    const i = e || this.latestPointerEvent, s = n || this.latestPanInfo, o = this.isDragging;
    if (this.cancel(), !o || !s || !i)
      return;
    const { velocity: r } = s;
    this.startAnimation(r);
    const { onDragEnd: a } = this.getProps();
    a && M.postRender(() => a(i, s));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    e && (e.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const { dragPropagation: i } = this.getProps();
    !i && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  updateAxis(e, n, i) {
    const { drag: s } = this.getProps();
    if (!i || !Qt(e, s, this.currentDirection))
      return;
    const o = this.getAxisMotionValue(e);
    let r = this.originPoint[e] + i[e];
    this.constraints && this.constraints[e] && (r = Lc(r, this.constraints[e], this.elastic[e])), o.set(r);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: n } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, s = this.constraints;
    e && yt(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && i ? this.constraints = Fc(i.layoutBox, e) : this.constraints = !1, this.elastic = jc(n), s !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && $((o) => {
      this.constraints !== !1 && this.getAxisMotionValue(o) && (this.constraints[o] = Oc(i.layoutBox[o], this.constraints[o]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !yt(e))
      return !1;
    const i = e.current, { projection: s } = this.visualElement;
    if (!s || !s.layout)
      return !1;
    const o = Ul(i, s.root, this.visualElement.getTransformPagePoint());
    let r = Bc(s.layout.layoutBox, o);
    if (n) {
      const a = n(_l(r));
      this.hasMutatedConstraints = !!a, a && (r = gr(a));
    }
    return r;
  }
  startAnimation(e) {
    const { drag: n, dragMomentum: i, dragElastic: s, dragTransition: o, dragSnapToOrigin: r, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, u = $((c) => {
      if (!Qt(c, n, this.currentDirection))
        return;
      let d = l && l[c] || {};
      r && (d = { min: 0, max: 0 });
      const f = s ? 200 : 1e6, y = s ? 40 : 1e7, x = {
        type: "inertia",
        velocity: i ? e[c] : 0,
        bounceStiffness: f,
        bounceDamping: y,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...o,
        ...d
      };
      return this.startAxisValueAnimation(c, x);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(e, n) {
    const i = this.getAxisMotionValue(e);
    return Xe(this.visualElement, e), i.start(In(e, i, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    $((e) => this.getAxisMotionValue(e).stop());
  }
  pauseAnimation() {
    $((e) => this.getAxisMotionValue(e).animation?.pause());
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
    const n = `_drag${e.toUpperCase()}`, i = this.visualElement.getProps(), s = i[n];
    return s || this.visualElement.getValue(e, (i.initial ? i.initial[e] : void 0) || 0);
  }
  snapToCursor(e) {
    $((n) => {
      const { drag: i } = this.getProps();
      if (!Qt(n, i, this.currentDirection))
        return;
      const { projection: s } = this.visualElement, o = this.getAxisMotionValue(n);
      if (s && s.layout) {
        const { min: r, max: a } = s.layout.layoutBox[n];
        o.set(e[n] - N(r, a, 0.5));
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
    const { drag: e, dragConstraints: n } = this.getProps(), { projection: i } = this.visualElement;
    if (!yt(n) || !i || !this.constraints)
      return;
    this.stopAnimation();
    const s = { x: 0, y: 0 };
    $((r) => {
      const a = this.getAxisMotionValue(r);
      if (a && this.constraints !== !1) {
        const l = a.get();
        s[r] = Ic({ min: l, max: l }, this.constraints[r]);
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    this.visualElement.current.style.transform = o ? o({}, "") : "none", i.root && i.root.updateScroll(), i.updateLayout(), this.resolveConstraints(), $((r) => {
      if (!Qt(r, e, null))
        return;
      const a = this.getAxisMotionValue(r), { min: l, max: u } = this.constraints[r];
      a.set(N(l, u, s[r]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    _c.set(this.visualElement, this);
    const e = this.visualElement.current, n = Lt(e, "pointerdown", (l) => {
      const { drag: u, dragListener: c = !0 } = this.getProps();
      u && c && this.start(l);
    }), i = () => {
      const { dragConstraints: l } = this.getProps();
      yt(l) && l.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: s } = this.visualElement, o = s.addEventListener("measure", i);
    s && !s.layout && (s.root && s.root.updateScroll(), s.updateLayout()), M.read(i);
    const r = Wt(window, "resize", () => this.scalePositionWithinConstraints()), a = s.addEventListener("didUpdate", (({ delta: l, hasLayoutChanged: u }) => {
      this.isDragging && u && ($((c) => {
        const d = this.getAxisMotionValue(c);
        d && (this.originPoint[c] += l[c].translate, d.set(d.get() + l[c].translate));
      }), this.visualElement.render());
    }));
    return () => {
      r(), n(), o(), a && a();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: i = !1, dragPropagation: s = !1, dragConstraints: o = !1, dragElastic: r = Qe, dragMomentum: a = !0 } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: i,
      dragPropagation: s,
      dragConstraints: o,
      dragElastic: r,
      dragMomentum: a
    };
  }
}
function Qt(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function Wc(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n;
}
class Uc extends ot {
  constructor(e) {
    super(e), this.removeGroupControls = K, this.removeListeners = K, this.controls = new zc(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || K;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const Ni = (t) => (e, n) => {
  t && M.postRender(() => t(e, n));
};
class $c extends ot {
  constructor() {
    super(...arguments), this.removePointerDownListener = K;
  }
  onPointerDown(e) {
    this.session = new Dr(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Vr(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: i, onPanEnd: s } = this.node.getProps();
    return {
      onSessionStart: Ni(e),
      onStart: Ni(n),
      onMove: i,
      onEnd: (o, r) => {
        delete this.session, s && M.postRender(() => s(o, r));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Lt(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const ne = {
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
function Vi(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const Mt = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (E.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = Vi(t, e.target.x), i = Vi(t, e.target.y);
    return `${n}% ${i}%`;
  }
}, Hc = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const i = t, s = rt.parse(t);
    if (s.length > 5)
      return i;
    const o = rt.createTransformer(t), r = typeof s[0] != "number" ? 1 : 0, a = n.x.scale * e.x, l = n.y.scale * e.y;
    s[0 + r] /= a, s[1 + r] /= l;
    const u = N(a, l, 0.5);
    return typeof s[2 + r] == "number" && (s[2 + r] /= u), typeof s[3 + r] == "number" && (s[3 + r] /= u), o(s);
  }
};
let Ae = !1;
class Kc extends ls {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i, layoutId: s } = this.props, { projection: o } = e;
    ml(Gc), o && (n.group && n.group.add(o), i && i.register && s && i.register(o), Ae && o.root.didUpdate(), o.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), o.setOptions({
      ...o.options,
      onExitComplete: () => this.safeToRemove()
    })), ne.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: i, drag: s, isPresent: o } = this.props, { projection: r } = i;
    return r && (r.isPresent = o, Ae = !0, s || e.layoutDependency !== n || n === void 0 || e.isPresent !== o ? r.willUpdate() : this.safeToRemove(), e.isPresent !== o && (o ? r.promote() : r.relegate() || M.postRender(() => {
      const a = r.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e && (e.root.didUpdate(), kn.postRender(() => {
      !e.currentAnimation && e.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i } = this.props, { projection: s } = e;
    Ae = !0, s && (s.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(s), i && i.deregister && i.deregister(s));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function Lr(t) {
  const [e, n] = nr(), i = I(sn);
  return h(Kc, { ...t, layoutGroup: i, switchLayoutGroup: I(mr), isPresent: e, safeToRemove: n });
}
const Gc = {
  borderRadius: {
    ...Mt,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Mt,
  borderTopRightRadius: Mt,
  borderBottomLeftRadius: Mt,
  borderBottomRightRadius: Mt,
  boxShadow: Hc
};
function qc(t, e, n) {
  const i = O(t) ? t : St(t);
  return i.start(In("", i, e, n)), i.animation;
}
const Yc = (t, e) => t.depth - e.depth;
class Xc {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    an(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    ln(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(Yc), this.isDirty = !1, this.children.forEach(e);
  }
}
function Zc(t, e) {
  const n = z.now(), i = ({ timestamp: s }) => {
    const o = s - n;
    o >= e && (st(i), t(o - e));
  };
  return M.setup(i, !0), () => st(i);
}
const Fr = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], Qc = Fr.length, Di = (t) => typeof t == "string" ? parseFloat(t) : t, Ri = (t) => typeof t == "number" || E.test(t);
function Jc(t, e, n, i, s, o) {
  s ? (t.opacity = N(0, n.opacity ?? 1, tu(i)), t.opacityExit = N(e.opacity ?? 1, 0, eu(i))) : o && (t.opacity = N(e.opacity ?? 1, n.opacity ?? 1, i));
  for (let r = 0; r < Qc; r++) {
    const a = `border${Fr[r]}Radius`;
    let l = Li(e, a), u = Li(n, a);
    if (l === void 0 && u === void 0)
      continue;
    l || (l = 0), u || (u = 0), l === 0 || u === 0 || Ri(l) === Ri(u) ? (t[a] = Math.max(N(Di(l), Di(u), i), 0), (X.test(u) || X.test(l)) && (t[a] += "%")) : t[a] = u;
  }
  (e.rotate || n.rotate) && (t.rotate = N(e.rotate || 0, n.rotate || 0, i));
}
function Li(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const tu = /* @__PURE__ */ Br(0, 0.5, Ss), eu = /* @__PURE__ */ Br(0.5, 0.95, K);
function Br(t, e, n) {
  return (i) => i < t ? 0 : i > e ? 1 : n(/* @__PURE__ */ It(t, e, i));
}
function Fi(t, e) {
  t.min = e.min, t.max = e.max;
}
function U(t, e) {
  Fi(t.x, e.x), Fi(t.y, e.y);
}
function Bi(t, e) {
  t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin;
}
function Ii(t, e, n, i, s) {
  return t -= e, t = le(t, 1 / n, i), s !== void 0 && (t = le(t, 1 / s, i)), t;
}
function nu(t, e = 0, n = 1, i = 0.5, s, o = t, r = t) {
  if (X.test(e) && (e = parseFloat(e), e = N(r.min, r.max, e / 100) - r.min), typeof e != "number")
    return;
  let a = N(o.min, o.max, i);
  t === o && (a -= e), t.min = Ii(t.min, e, n, a, s), t.max = Ii(t.max, e, n, a, s);
}
function Oi(t, e, [n, i, s], o, r) {
  nu(t, e[n], e[i], e[s], e.scale, o, r);
}
const iu = ["x", "scaleX", "originX"], su = ["y", "scaleY", "originY"];
function ji(t, e, n, i) {
  Oi(t.x, e, iu, n ? n.x : void 0, i ? i.x : void 0), Oi(t.y, e, su, n ? n.y : void 0, i ? i.y : void 0);
}
function _i(t) {
  return t.translate === 0 && t.scale === 1;
}
function Ir(t) {
  return _i(t.x) && _i(t.y);
}
function zi(t, e) {
  return t.min === e.min && t.max === e.max;
}
function ru(t, e) {
  return zi(t.x, e.x) && zi(t.y, e.y);
}
function Wi(t, e) {
  return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
}
function Or(t, e) {
  return Wi(t.x, e.x) && Wi(t.y, e.y);
}
function Ui(t) {
  return _(t.x) / _(t.y);
}
function $i(t, e) {
  return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint;
}
class ou {
  constructor() {
    this.members = [];
  }
  add(e) {
    an(this.members, e), e.scheduleRender();
  }
  remove(e) {
    if (ln(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    const n = this.members.findIndex((s) => e === s);
    if (n === 0)
      return !1;
    let i;
    for (let s = n; s >= 0; s--) {
      const o = this.members[s];
      if (o.isPresent !== !1) {
        i = o;
        break;
      }
    }
    return i ? (this.promote(i), !0) : !1;
  }
  promote(e, n) {
    const i = this.lead;
    if (e !== i && (this.prevLead = i, this.lead = e, e.show(), i)) {
      i.instance && i.scheduleRender(), e.scheduleRender(), e.resumeFrom = i, n && (e.resumeFrom.preserveOpacity = !0), i.snapshot && (e.snapshot = i.snapshot, e.snapshot.latestValues = i.animationValues || i.latestValues), e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
      const { crossfade: s } = e.options;
      s === !1 && i.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      const { options: n, resumingFrom: i } = e;
      n.onExitComplete && n.onExitComplete(), i && i.options.onExitComplete && i.options.onExitComplete();
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
function au(t, e, n) {
  let i = "";
  const s = t.x.translate / e.x, o = t.y.translate / e.y, r = n?.z || 0;
  if ((s || o || r) && (i = `translate3d(${s}px, ${o}px, ${r}px) `), (e.x !== 1 || e.y !== 1) && (i += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
    const { transformPerspective: u, rotate: c, rotateX: d, rotateY: f, skewX: y, skewY: x } = n;
    u && (i = `perspective(${u}px) ${i}`), c && (i += `rotate(${c}deg) `), d && (i += `rotateX(${d}deg) `), f && (i += `rotateY(${f}deg) `), y && (i += `skewX(${y}deg) `), x && (i += `skewY(${x}deg) `);
  }
  const a = t.x.scale * e.x, l = t.y.scale * e.y;
  return (a !== 1 || l !== 1) && (i += `scale(${a}, ${l})`), i || "none";
}
const Pe = ["", "X", "Y", "Z"], lu = 1e3;
let cu = 0;
function ke(t, e, n, i) {
  const { latestValues: s } = e;
  s[t] && (n[t] = s[t], e.setStaticValue(t, 0), i && (i[t] = 0));
}
function jr(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: e } = t.options;
  if (!e)
    return;
  const n = Ar(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: s, layoutId: o } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", M, !(s || o));
  }
  const { parent: i } = t;
  i && !i.hasCheckedOptimisedAppear && jr(i);
}
function _r({ attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: i, resetTransform: s }) {
  return class {
    constructor(r = {}, a = e?.()) {
      this.id = cu++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(du), this.nodes.forEach(gu), this.nodes.forEach(yu), this.nodes.forEach(fu);
      }, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = r, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Xc());
    }
    addEventListener(r, a) {
      return this.eventHandlers.has(r) || this.eventHandlers.set(r, new hn()), this.eventHandlers.get(r).add(a);
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
      this.isSVG = er(r) && !Ja(r), this.instance = r;
      const { layoutId: a, layout: l, visualElement: u } = this.options;
      if (u && !u.current && u.mount(r), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), t) {
        let c, d = 0;
        const f = () => this.root.updateBlockedByResize = !1;
        M.read(() => {
          d = window.innerWidth;
        }), t(r, () => {
          const y = window.innerWidth;
          y !== d && (d = y, this.root.updateBlockedByResize = !0, c && c(), c = Zc(f, 250), ne.hasAnimatedSinceResize && (ne.hasAnimatedSinceResize = !1, this.nodes.forEach(Gi)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && u && (a || l) && this.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: d, hasRelativeLayoutChanged: f, layout: y }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const x = this.options.transition || u.getDefaultTransition() || Su, { onLayoutAnimationStart: w, onLayoutAnimationComplete: T } = u.getProps(), b = !this.targetLayout || !Or(this.targetLayout, y), S = !d && f;
        if (this.options.layoutRoot || this.resumeFrom || S || d && (b || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const m = {
            ...An(x, "layout"),
            onPlay: w,
            onComplete: T
          };
          (u.shouldReduceMotion || this.options.layoutRoot) && (m.delay = 0, m.type = !1), this.startAnimation(m), this.setAnimationOrigin(c, S);
        } else
          d || Gi(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = y;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const r = this.getStack();
      r && r.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), st(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(vu), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && jr(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const d = this.path[c];
        d.shouldResetTransform = !0, d.updateScroll("snapshot"), d.options.layoutRoot && d.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l)
        return;
      const u = this.getTransformTemplate();
      this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), r && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Hi);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Ki);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(pu), this.nodes.forEach(uu), this.nodes.forEach(hu)) : this.nodes.forEach(Ki), this.clearAllSnapshots();
      const a = z.now();
      B.delta = J(0, 1e3 / 60, a - B.timestamp), B.timestamp = a, B.isProcessing = !0, me.update.process(B), me.preRender.process(B), me.render.process(B), B.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, kn.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(mu), this.sharedNodes.forEach(xu);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, M.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      M.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !_(this.snapshot.measuredBox.x) && !_(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const r = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = D(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, r ? r.layoutBox : void 0);
    }
    updateScroll(r = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === r && (a = !1), a && this.instance) {
        const l = i(this.instance);
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
      if (!s)
        return;
      const r = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !Ir(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, c = u !== this.prevTransformTemplateValue;
      r && this.instance && (a || ct(this.latestValues) || c) && (s(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(r = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return r && (l = this.removeTransform(l)), Tu(l), {
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
        return D();
      const a = r.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(Au))) {
        const { scroll: u } = this.root;
        u && (vt(a.x, u.offset.x), vt(a.y, u.offset.y));
      }
      return a;
    }
    removeElementScroll(r) {
      const a = D();
      if (U(a, r), this.scroll?.wasRoot)
        return a;
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l], { scroll: c, options: d } = u;
        u !== this.root && c && d.layoutScroll && (c.wasRoot && U(a, r), vt(a.x, c.offset.x), vt(a.y, c.offset.y));
      }
      return a;
    }
    applyTransform(r, a = !1) {
      const l = D();
      U(l, r);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a && c.options.layoutScroll && c.scroll && c !== c.root && xt(l, {
          x: -c.scroll.offset.x,
          y: -c.scroll.offset.y
        }), ct(c.latestValues) && xt(l, c.latestValues);
      }
      return ct(this.latestValues) && xt(l, this.latestValues), l;
    }
    removeTransform(r) {
      const a = D();
      U(a, r);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !ct(u.latestValues))
          continue;
        Ke(u.latestValues) && u.updateSnapshot();
        const c = D(), d = u.measurePageBox();
        U(c, d), ji(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return ct(this.latestValues) && ji(a, this.latestValues), a;
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
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== B.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(r = !1) {
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== a;
      if (!(r || l && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: c, layoutId: d } = this.options;
      if (!(!this.layout || !(c || d))) {
        if (this.resolvedRelativeTargetAt = B.timestamp, !this.targetDelta && !this.relativeTarget) {
          const f = this.getClosestProjectingParent();
          f && f.layout && this.animationProgress !== 1 ? (this.relativeParent = f, this.forceRelativeParentToResolveTarget(), this.relativeTarget = D(), this.relativeTargetOrigin = D(), Bt(this.relativeTargetOrigin, this.layout.layoutBox, f.layout.layoutBox), U(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = D(), this.targetWithTransforms = D()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), Nc(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : U(this.target, this.layout.layoutBox), vr(this.target, this.targetDelta)) : U(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget)) {
          this.attemptToResolveRelativeTarget = !1;
          const f = this.getClosestProjectingParent();
          f && !!f.resumingFrom == !!this.resumingFrom && !f.options.layoutScroll && f.target && this.animationProgress !== 1 ? (this.relativeParent = f, this.forceRelativeParentToResolveTarget(), this.relativeTarget = D(), this.relativeTargetOrigin = D(), Bt(this.relativeTargetOrigin, this.target, f.target), U(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Ke(this.parent.latestValues) || yr(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      const r = this.getLead(), a = !!this.resumingFrom || this !== r;
      let l = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (l = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === B.timestamp && (l = !1), l)
        return;
      const { layout: u, layoutId: c } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || c))
        return;
      U(this.layoutCorrected, this.layout.layoutBox);
      const d = this.treeScale.x, f = this.treeScale.y;
      Wl(this.layoutCorrected, this.treeScale, this.path, a), r.layout && !r.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (r.target = r.layout.layoutBox, r.targetWithTransforms = D());
      const { target: y } = r;
      if (!y) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Bi(this.prevProjectionDelta.x, this.projectionDelta.x), Bi(this.prevProjectionDelta.y, this.projectionDelta.y)), Ft(this.projectionDelta, this.layoutCorrected, y, this.latestValues), (this.treeScale.x !== d || this.treeScale.y !== f || !$i(this.projectionDelta.x, this.prevProjectionDelta.x) || !$i(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", y));
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
      this.prevProjectionDelta = bt(), this.projectionDelta = bt(), this.projectionDeltaWithTransform = bt();
    }
    setAnimationOrigin(r, a = !1) {
      const l = this.snapshot, u = l ? l.latestValues : {}, c = { ...this.latestValues }, d = bt();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const f = D(), y = l ? l.source : void 0, x = this.layout ? this.layout.source : void 0, w = y !== x, T = this.getStack(), b = !T || T.members.length <= 1, S = !!(w && !b && this.options.crossfade === !0 && !this.path.some(wu));
      this.animationProgress = 0;
      let m;
      this.mixTargetDelta = (p) => {
        const v = p / 1e3;
        qi(d.x, r.x, v), qi(d.y, r.y, v), this.setTargetDelta(d), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Bt(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox), bu(this.relativeTarget, this.relativeTargetOrigin, f, v), m && ru(this.relativeTarget, m) && (this.isProjectionDirty = !1), m || (m = D()), U(m, this.relativeTarget)), w && (this.animationValues = c, Jc(c, u, this.latestValues, v, S, b)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = v;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(r) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (st(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = M.update(() => {
        ne.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = St(0)), this.currentAnimation = qc(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(lu), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const r = this.getLead();
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = r;
      if (!(!a || !l || !u)) {
        if (this !== r && this.layout && u && zr(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || D();
          const d = _(this.layout.layoutBox.x);
          l.x.min = r.target.x.min, l.x.max = l.x.min + d;
          const f = _(this.layout.layoutBox.y);
          l.y.min = r.target.y.min, l.y.max = l.y.min + f;
        }
        U(a, l), xt(a, c), Ft(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(r, a) {
      this.sharedNodes.has(r) || this.sharedNodes.set(r, new ou()), this.sharedNodes.get(r).add(a);
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
      l.z && ke("z", r, u, this.animationValues);
      for (let c = 0; c < Pe.length; c++)
        ke(`rotate${Pe[c]}`, r, u, this.animationValues), ke(`skew${Pe[c]}`, r, u, this.animationValues);
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
        this.needsReset = !1, r.visibility = "", r.opacity = "", r.pointerEvents = ee(a?.pointerEvents) || "", r.transform = l ? l(this.latestValues, "") : "none";
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        this.options.layoutId && (r.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, r.pointerEvents = ee(a?.pointerEvents) || ""), this.hasProjected && !ct(this.latestValues) && (r.transform = l ? l({}, "") : "none", this.hasProjected = !1);
        return;
      }
      r.visibility = "";
      const c = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let d = au(this.projectionDeltaWithTransform, this.treeScale, c);
      l && (d = l(c, d)), r.transform = d;
      const { x: f, y } = this.projectionDelta;
      r.transformOrigin = `${f.origin * 100}% ${y.origin * 100}% 0`, u.animationValues ? r.opacity = u === this ? c.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : c.opacityExit : r.opacity = u === this ? c.opacity !== void 0 ? c.opacity : "" : c.opacityExit !== void 0 ? c.opacityExit : 0;
      for (const x in zt) {
        if (c[x] === void 0)
          continue;
        const { correct: w, applyTo: T, isCSSVariable: b } = zt[x], S = d === "none" ? c[x] : w(c[x], u);
        if (T) {
          const m = T.length;
          for (let p = 0; p < m; p++)
            r[T[p]] = S;
        } else
          b ? this.options.visualElement.renderState.vars[x] = S : r[x] = S;
      }
      this.options.layoutId && (r.pointerEvents = u === this ? ee(a?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((r) => r.currentAnimation?.stop()), this.root.nodes.forEach(Hi), this.root.sharedNodes.clear();
    }
  };
}
function uu(t) {
  t.updateLayout();
}
function hu(t) {
  const e = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: i } = t.layout, { animationType: s } = t.options, o = e.source !== t.layout.source;
    s === "size" ? $((c) => {
      const d = o ? e.measuredBox[c] : e.layoutBox[c], f = _(d);
      d.min = n[c].min, d.max = d.min + f;
    }) : zr(s, e.layoutBox, n) && $((c) => {
      const d = o ? e.measuredBox[c] : e.layoutBox[c], f = _(n[c]);
      d.max = d.min + f, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[c].max = t.relativeTarget[c].min + f);
    });
    const r = bt();
    Ft(r, n, e.layoutBox);
    const a = bt();
    o ? Ft(a, t.applyTransform(i, !0), e.measuredBox) : Ft(a, n, e.layoutBox);
    const l = !Ir(r);
    let u = !1;
    if (!t.resumeFrom) {
      const c = t.getClosestProjectingParent();
      if (c && !c.resumeFrom) {
        const { snapshot: d, layout: f } = c;
        if (d && f) {
          const y = D();
          Bt(y, e.layoutBox, d.layoutBox);
          const x = D();
          Bt(x, n, f.layoutBox), Or(y, x) || (u = !0), c.options.layoutRoot && (t.relativeTarget = x, t.relativeTargetOrigin = y, t.relativeParent = c);
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
function du(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function fu(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function mu(t) {
  t.clearSnapshot();
}
function Hi(t) {
  t.clearMeasurements();
}
function Ki(t) {
  t.isLayoutDirty = !1;
}
function pu(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function Gi(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function gu(t) {
  t.resolveTargetDelta();
}
function yu(t) {
  t.calcProjection();
}
function vu(t) {
  t.resetSkewAndRotation();
}
function xu(t) {
  t.removeLeadSnapshot();
}
function qi(t, e, n) {
  t.translate = N(e.translate, 0, n), t.scale = N(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint;
}
function Yi(t, e, n, i) {
  t.min = N(e.min, n.min, i), t.max = N(e.max, n.max, i);
}
function bu(t, e, n, i) {
  Yi(t.x, e.x, n.x, i), Yi(t.y, e.y, n.y, i);
}
function wu(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const Su = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Xi = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), Zi = Xi("applewebkit/") && !Xi("chrome/") ? Math.round : K;
function Qi(t) {
  t.min = Zi(t.min), t.max = Zi(t.max);
}
function Tu(t) {
  Qi(t.x), Qi(t.y);
}
function zr(t, e, n) {
  return t === "position" || t === "preserve-aspect" && !Mc(Ui(e), Ui(n), 0.2);
}
function Au(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const Pu = _r({
  attachResizeListener: (t, e) => Wt(t, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), Ee = {
  current: void 0
}, Wr = _r({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!Ee.current) {
      const t = new Pu({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), Ee.current = t;
    }
    return Ee.current;
  },
  resetTransform: (t, e) => {
    t.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), ku = {
  pan: {
    Feature: $c
  },
  drag: {
    Feature: Uc,
    ProjectionNode: Wr,
    MeasureLayout: Lr
  }
};
function Ji(t, e, n) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", n === "Start");
  const s = "onHover" + n, o = i[s];
  o && M.postRender(() => o(e, Kt(e)));
}
class Eu extends ot {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = qa(e, (n, i) => (Ji(this.node, i, "Start"), (s) => Ji(this.node, s, "End"))));
  }
  unmount() {
  }
}
class Cu extends ot {
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
    this.unmount = Ut(Wt(this.node.current, "focus", () => this.onFocus()), Wt(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function ts(t, e, n) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", n === "Start");
  const s = "onTap" + (n === "End" ? "" : n), o = i[s];
  o && M.postRender(() => o(e, Kt(e)));
}
class Mu extends ot {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = Qa(e, (n, i) => (ts(this.node, i, "Start"), (s, { success: o }) => ts(this.node, s, o ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const Je = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), Nu = (t) => {
  const e = Je.get(t.target);
  e && e(t);
}, Vu = (t) => {
  t.forEach(Nu);
};
function Du({ root: t, ...e }) {
  const n = t || document;
  Ce.has(n) || Ce.set(n, {});
  const i = Ce.get(n), s = JSON.stringify(e);
  return i[s] || (i[s] = new IntersectionObserver(Vu, { root: t, ...e })), i[s];
}
function Ru(t, e, n) {
  const i = Du(e);
  return Je.set(t, n), i.observe(t), () => {
    Je.delete(t), i.unobserve(t);
  };
}
const Lu = {
  some: 0,
  all: 1
};
class Fu extends ot {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(), { root: n, margin: i, amount: s = "some", once: o } = e, r = {
      root: n ? n.current : void 0,
      rootMargin: i,
      threshold: typeof s == "number" ? s : Lu[s]
    }, a = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, o && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: c, onViewportLeave: d } = this.node.getProps(), f = u ? c : d;
      f && f(l);
    };
    return Ru(this.node.current, r, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Bu(e, n)) && this.startObserver();
  }
  unmount() {
  }
}
function Bu({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const Iu = {
  inView: {
    Feature: Fu
  },
  tap: {
    Feature: Mu
  },
  focus: {
    Feature: Cu
  },
  hover: {
    Feature: Eu
  }
}, Ou = {
  layout: {
    ProjectionNode: Wr,
    MeasureLayout: Lr
  }
}, ju = {
  ...Tc,
  ...Iu,
  ...ku,
  ...Ou
}, Z = /* @__PURE__ */ jl(ju, Ql);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _u = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), zu = (t) => t.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (e, n, i) => i ? i.toUpperCase() : n.toLowerCase()
), es = (t) => {
  const e = zu(t);
  return e.charAt(0).toUpperCase() + e.slice(1);
}, Ur = (...t) => t.filter((e, n, i) => !!e && e.trim() !== "" && i.indexOf(e) === n).join(" ").trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Wu = {
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
const Uu = tn(
  ({
    color: t = "currentColor",
    size: e = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: i,
    className: s = "",
    children: o,
    iconNode: r,
    ...a
  }, l) => ie(
    "svg",
    {
      ref: l,
      ...Wu,
      width: e,
      height: e,
      stroke: t,
      strokeWidth: i ? Number(n) * 24 / Number(e) : n,
      className: Ur("lucide", s),
      ...a
    },
    [
      ...r.map(([u, c]) => ie(u, c)),
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
const C = (t, e) => {
  const n = tn(
    ({ className: i, ...s }, o) => ie(Uu, {
      ref: o,
      iconNode: e,
      className: Ur(
        `lucide-${_u(es(t))}`,
        `lucide-${t}`,
        i
      ),
      ...s
    })
  );
  return n.displayName = es(t), n;
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $u = [
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 18h18", key: "1h113x" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }]
], Hu = C("align-justify", $u);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ku = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], Me = C("arrow-right", Ku);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gu = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
], qu = C("award", Gu);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yu = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2", key: "76otgf" }],
  ["path", { d: "M9 22v-4h6v4", key: "r93iot" }],
  ["path", { d: "M8 6h.01", key: "1dz90k" }],
  ["path", { d: "M16 6h.01", key: "1x0f13" }],
  ["path", { d: "M12 6h.01", key: "1vi96p" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }]
], Xu = C("building", Yu);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zu = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ns = C("chevron-down", Zu);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qu = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
], Ju = C("clock", Qu);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const th = [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
      key: "pwadti"
    }
  ],
  ["path", { d: "M6 2v2", key: "colzsn" }]
], eh = C("coffee", th);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nh = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], $r = C("eye", nh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ih = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
], sh = C("facebook", ih);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rh = [
  ["path", { d: "M10 22v-6.57", key: "1wmca3" }],
  ["path", { d: "M12 11h.01", key: "z322tv" }],
  ["path", { d: "M12 7h.01", key: "1ivr5q" }],
  ["path", { d: "M14 15.43V22", key: "1q2vjd" }],
  ["path", { d: "M15 16a5 5 0 0 0-6 0", key: "o9wqvi" }],
  ["path", { d: "M16 11h.01", key: "xkw8gn" }],
  ["path", { d: "M16 7h.01", key: "1kdx03" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 7h.01", key: "1vti4s" }],
  ["rect", { x: "4", y: "2", width: "16", height: "20", rx: "2", key: "1uxh74" }]
], oh = C("hotel", rh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ah = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
], lh = C("house", ah);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ch = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
], uh = C("image", ch);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hh = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
], dh = C("instagram", hh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fh = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
], is = C("layers", fh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mh = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
], ph = C("mail", mh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gh = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], yh = C("map-pin", gh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vh = [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
], xh = C("menu", vh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bh = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
], Ne = C("message-circle", bh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wh = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
], Hr = C("message-square", wh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sh = [["path", { d: "M5 12h14", key: "1ays0h" }]], Th = C("minus", Sh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ah = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
], Ph = C("monitor", Ah);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kh = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
], Kr = C("moon", kh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eh = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
], Gr = C("package", Eh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ch = [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
], Ve = C("phone", Ch);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mh = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Nh = C("plus", Mh);
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], ss = C("send", Vh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dh = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], qr = C("settings", Dh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rh = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], Lh = C("shield", Rh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fh = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
], Bh = C("sliders-horizontal", Fh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ih = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
], Yr = C("star", Ih);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oh = [
  [
    "path",
    {
      d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",
      key: "cpyugq"
    }
  ],
  ["path", { d: "M12 22v-3", key: "kmzjlo" }]
], jh = C("tree-pine", Oh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _h = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
], zh = C("truck", _h);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wh = [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
], Uh = C("twitter", Wh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $h = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
], Hh = C("users", $h);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kh = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Gh = C("x", Kh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qh = [
  [
    "path",
    {
      d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
      key: "1q2vi4"
    }
  ],
  ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
], Yh = C("youtube", qh);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xh = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], Zh = C("zap", Xh), rs = [
  { icon: is, title: "Premium Curtains", desc: "Bespoke floor-to-ceiling curtains crafted from the finest imported fabrics." },
  { icon: $r, title: "Sheer Curtains", desc: "Delicate translucent sheers that diffuse light beautifully through any space." },
  { icon: Kr, title: "Blackout Curtains", desc: "Complete light control with premium blackout lining technology." },
  { icon: Zh, title: "Motorized Curtains", desc: "Smart automated systems compatible with all major smart-home platforms." },
  { icon: Hu, title: "Roman Blinds", desc: "Elegant fabric blinds with clean architectural folds and tailored proportions." },
  { icon: Bh, title: "Roller Blinds", desc: "Sleek minimal roller systems in premium sun-filtering and blackout fabrics." },
  { icon: is, title: "Zebra Blinds", desc: "Contemporary alternating sheer and opaque fabric bands for precise control." },
  { icon: jh, title: "Wooden Blinds", desc: "Natural timber slats with a warm, organic character suited to any interior." },
  { icon: uh, title: "Wallpapers", desc: "Curated designer wallcoverings from leading international collections." },
  { icon: Gr, title: "Upholstery", desc: "Bespoke sofa, headboard, and furniture upholstery in premium fabrics." },
  { icon: qr, title: "Curtain Accessories", desc: "Finials, tracks, poles, and tiebacks in premium brass and chrome finishes." },
  { icon: Hr, title: "Interior Consultation", desc: "Expert design guidance for complete window furnishing and décor solutions." }
], Qh = [
  { title: "Living Room", img: "https://images.unsplash.com/photo-1772112334845-86016056137b?w=700&h=560&fit=crop&auto=format", icon: lh },
  { title: "Bedroom", img: "https://images.unsplash.com/photo-1778731660248-897f9afcd93d?w=700&h=560&fit=crop&auto=format", icon: Kr },
  { title: "Dining", img: "https://images.unsplash.com/photo-1778731525400-32c189e3b045?w=700&h=560&fit=crop&auto=format", icon: eh },
  { title: "Office", img: "https://images.unsplash.com/photo-1780257562925-d78de6cb6612?w=700&h=560&fit=crop&auto=format", icon: Ph },
  { title: "Hotel", img: "https://images.unsplash.com/photo-1768346564414-3e1ffb751e30?w=700&h=560&fit=crop&auto=format", icon: oh },
  { title: "Villa", img: "https://images.unsplash.com/photo-1778731525567-a65ec40a4bb5?w=700&h=560&fit=crop&auto=format", icon: Xu }
], Jh = [
  { name: "Velvet", swatch: "#5C2E2E", desc: "Opulent pile with deep luminous richness" },
  { name: "Linen", swatch: "#C4A882", desc: "Natural woven texture with breathable elegance" },
  { name: "Cotton", swatch: "#E2D9CC", desc: "Pure comfort in refined artisanal weaves" },
  { name: "Silk", swatch: "#D4C4B0", desc: "Lustrous drape with unmatched luminosity" },
  { name: "Sheer", swatch: "#EDE8E0", desc: "Ethereal light-diffusing translucence" },
  { name: "Jacquard", swatch: "#8B7355", desc: "Intricate woven patterns with textural depth" },
  { name: "Blackout", swatch: "#2A2A2A", desc: "Complete privacy with technical precision" },
  { name: "Textured", swatch: "#A89070", desc: "Dimensional surfaces for tactile luxury" }
], td = [
  { icon: Hr, title: "Free Consultation", desc: "Complimentary in-home design consultation at your convenience." },
  { icon: qr, title: "Custom Measurements", desc: "Precision measurements for a flawless, perfectly fitted result." },
  { icon: Gr, title: "Imported Fabrics", desc: "Curated collections sourced from Italy, Belgium, and Turkey." },
  { icon: qu, title: "Expert Installation", desc: "White-glove installation by certified craftsmen and fitters." },
  { icon: Lh, title: "2-Year Warranty", desc: "Comprehensive cover on all products and workmanship." },
  { icon: Yr, title: "Affordable Luxury", desc: "Premium quality at surprisingly accessible price points." },
  { icon: zh, title: "On-Time Delivery", desc: "Guaranteed delivery within the agreed project timeline." },
  { icon: Hh, title: "Expert Designers", desc: "A team of seasoned interior design specialists at your side." }
], ed = [
  { step: "01", title: "Consultation", desc: "We visit your space to understand your vision, lifestyle, and aesthetic preferences." },
  { step: "02", title: "Measurement", desc: "Precise measurements of every window and surface for a flawless custom fit." },
  { step: "03", title: "Design Selection", desc: "Browse our curated fabric and design collections with expert guidance." },
  { step: "04", title: "Custom Stitching", desc: "Skilled artisans craft your curtains with meticulous attention to detail." },
  { step: "05", title: "Installation", desc: "Professional installation by our certified team, leaving your space immaculate." }
], nd = [
  { src: "https://images.unsplash.com/photo-1779505576192-803dd8c9b55a?w=600&h=820&fit=crop&auto=format", alt: "Elegant sunlit sitting area", tall: !0 },
  { src: "https://images.unsplash.com/photo-1780817612741-f8f3785d9908?w=600&h=480&fit=crop&auto=format", alt: "Golden sunlight on curtains", tall: !1 },
  { src: "https://images.unsplash.com/photo-1761289358623-3fddd0854000?w=600&h=720&fit=crop&auto=format", alt: "Sheer curtains with sunlight", tall: !1 },
  { src: "https://images.unsplash.com/photo-1768577908037-bbc3da95c1cf?w=600&h=840&fit=crop&auto=format", alt: "Sheer curtains on window", tall: !0 },
  { src: "https://images.unsplash.com/photo-1646042898618-a3d104c5b836?w=600&h=580&fit=crop&auto=format", alt: "Curtain sunlight pattern", tall: !1 },
  { src: "https://images.unsplash.com/photo-1778731660248-897f9afcd93d?w=600&h=900&fit=crop&auto=format", alt: "Modern bedroom curtains", tall: !0 }
], id = [
  {
    name: "Layla Al Mansouri",
    role: "Villa Owner, Dubai",
    text: "SAN CURTAINS transformed our villa completely. The motorized curtains in the main salon are stunning — the quality and craftsmanship are beyond anything we expected. A truly premium experience from start to finish.",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&auto=format"
  },
  {
    name: "Rashed Al Farsi",
    role: "Senior Interior Designer",
    text: "I regularly recommend SAN CURTAINS to my clients. Their fabric selection is unmatched and the installation team is incredibly professional. Every project has been delivered on time, immaculately.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format"
  },
  {
    name: "Sarah Thompson",
    role: "Homeowner, Abu Dhabi",
    text: "The consultation process was seamless. They listened to exactly what I wanted and delivered something even more beautiful than I imagined. Our bedroom sheers are simply magical in the morning light.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format"
  }
], sd = [
  { q: "How long does the custom curtain process take?", a: "From consultation to installation, our standard lead time is 10–14 working days. For complex motorized systems or large-scale projects, we allocate 3–4 weeks to ensure absolute perfection." },
  { q: "Do you offer in-home consultations?", a: "Yes — our complimentary in-home consultation service is available across the region. Our design experts visit your space, take measurements, and present curated fabric samples on-site." },
  { q: "What fabric collections do you carry?", a: "We carry an extensive range including velvet, linen, silk, sheer, jacquard, blackout, and textured fabrics sourced from premium mills in Italy, Belgium, Turkey, and beyond." },
  { q: "Are your curtains truly made to measure?", a: "Every product we create is custom made to your exact specifications. We hold no off-the-shelf inventory — 100% bespoke craftsmanship is our unwavering standard." },
  { q: "Do you install motorized and smart curtain systems?", a: "Absolutely. We specialise in motorized curtain systems compatible with KNX, Lutron, Somfy, Google Home, and Amazon Alexa, delivered by certified installation engineers." },
  { q: "What warranty do you offer?", a: "We provide a comprehensive 2-year warranty covering fabric defects, stitching, and hardware. Motorized and smart systems carry an extended 3-year parts-and-labour warranty." }
], rd = ["Somfy", "Lutron", "Hunter Douglas", "KNX", "Kinnasand", "Zimmer & Rohde", "Raffles", "Sahco"];
function De(t, e, n) {
  const [i, s] = q(0);
  return it(() => {
    if (!n) return;
    let o = null;
    const r = (a) => {
      o || (o = a);
      const l = Math.min((a - o) / e, 1);
      s(Math.round(l * t)), l < 1 && requestAnimationFrame(r);
    };
    requestAnimationFrame(r);
  }, [n, t, e]), i;
}
function od() {
  const [t, e] = q(!1), [n, i] = q(!1), [s, o] = q(!1), [r, a] = q(!1), [l, u] = q(null), [c, d] = q(!1), [f, y] = q(!1), x = Q(null), w = De(15, 1800, f), T = De(5e3, 1800, f), b = De(12e3, 1800, f);
  it(() => {
    const p = setTimeout(() => e(!0), 700), v = setTimeout(() => i(!0), 2300);
    return () => {
      clearTimeout(p), clearTimeout(v);
    };
  }, []), it(() => {
    const p = () => {
      o(window.scrollY > 80), d(window.scrollY > 600);
    };
    return window.addEventListener("scroll", p, { passive: !0 }), () => window.removeEventListener("scroll", p);
  }, []), it(() => {
    const p = x.current;
    if (!p) return;
    const v = new IntersectionObserver(([A]) => {
      A.isIntersecting && y(!0);
    }, { threshold: 0.3 });
    return v.observe(p), () => v.disconnect();
  }, []);
  const S = ["Home", "About", "Services", "Collections", "Gallery", "Contact"], m = "#C8A96A";
  return /* @__PURE__ */ g("div", { style: { fontFamily: "'Poppins', sans-serif", background: "#F8F6F3", color: "#1A1A1A" }, children: [
    /* @__PURE__ */ h(Zt, { children: !n && /* @__PURE__ */ g(
      Z.div,
      {
        className: "fixed inset-0 z-[200] flex items-center justify-center overflow-hidden",
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ h(
            Z.div,
            {
              className: "absolute top-0 left-0 w-1/2 h-full",
              style: { background: "linear-gradient(160deg, #0E0E0E 0%, #171208 100%)" },
              animate: { x: t ? "-100%" : 0 },
              transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.15 },
              children: /* @__PURE__ */ h("div", { className: "absolute inset-0", style: {
                backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(200,169,106,0.06) 48px, rgba(200,169,106,0.06) 49px)"
              } })
            }
          ),
          /* @__PURE__ */ h(
            Z.div,
            {
              className: "absolute top-0 right-0 w-1/2 h-full",
              style: { background: "linear-gradient(200deg, #0E0E0E 0%, #171208 100%)" },
              animate: { x: t ? "100%" : 0 },
              transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.15 },
              children: /* @__PURE__ */ h("div", { className: "absolute inset-0", style: {
                backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(200,169,106,0.06) 48px, rgba(200,169,106,0.06) 49px)"
              } })
            }
          ),
          /* @__PURE__ */ g(
            Z.div,
            {
              className: "relative z-10 text-center",
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.6, delay: 0.1 },
              children: [
                /* @__PURE__ */ h("div", { style: { fontFamily: "'Playfair Display', serif", color: m, fontSize: "2.5rem", letterSpacing: "0.35em", fontWeight: 300 }, children: "SAN" }),
                /* @__PURE__ */ h("div", { style: { fontSize: "0.6rem", letterSpacing: "0.55em", color: "rgba(200,169,106,0.55)", marginTop: "2px", fontWeight: 300 }, children: "CURTAINS" }),
                /* @__PURE__ */ h("div", { style: { marginTop: "1.25rem", height: "1px", width: "80px", margin: "1.25rem auto 0", background: `linear-gradient(90deg, transparent, ${m}, transparent)` } })
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ h(
      "a",
      {
        href: "https://wa.me/971500000000",
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "Chat on WhatsApp",
        className: "fixed bottom-24 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-transform hover:scale-110",
        style: { background: "#25D366" },
        children: /* @__PURE__ */ h(Ne, { className: "w-6 h-6 text-white" })
      }
    ),
    /* @__PURE__ */ h(Zt, { children: c && /* @__PURE__ */ h(
      Z.button,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
        "aria-label": "Back to top",
        className: "fixed bottom-6 right-5 z-50 flex items-center justify-center w-12 h-12 shadow-xl transition-transform hover:scale-110",
        style: { background: m },
        children: /* @__PURE__ */ h(ns, { className: "w-5 h-5 rotate-180", style: { color: "#0E0E0E" } })
      }
    ) }),
    /* @__PURE__ */ g(
      "header",
      {
        className: "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        style: {
          background: s ? "rgba(14,14,14,0.96)" : "transparent",
          backdropFilter: s ? "blur(14px)" : "none",
          borderBottom: s ? "1px solid rgba(200,169,106,0.12)" : "none",
          padding: s ? "0.85rem 0" : "1.6rem 0"
        },
        children: [
          /* @__PURE__ */ g("div", { className: "max-w-7xl mx-auto px-6 flex items-center justify-between", children: [
            /* @__PURE__ */ g("div", { children: [
              /* @__PURE__ */ h("div", { style: { fontFamily: "'Playfair Display', serif", color: m, fontSize: "1.6rem", letterSpacing: "0.28em", fontWeight: 300, lineHeight: 1 }, children: "SAN" }),
              /* @__PURE__ */ h("div", { style: { fontSize: "0.52rem", letterSpacing: "0.5em", color: "rgba(200,169,106,0.5)", marginTop: "1px", fontWeight: 300 }, children: "CURTAINS" })
            ] }),
            /* @__PURE__ */ h("nav", { className: "hidden lg:flex items-center gap-9", children: S.map((p) => /* @__PURE__ */ h(
              "a",
              {
                href: `#${p.toLowerCase()}`,
                style: { fontSize: "0.72rem", letterSpacing: "0.14em", fontWeight: 300, color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.2s" },
                onMouseEnter: (v) => v.currentTarget.style.color = m,
                onMouseLeave: (v) => v.currentTarget.style.color = "rgba(255,255,255,0.75)",
                children: p.toUpperCase()
              },
              p
            )) }),
            /* @__PURE__ */ g("div", { className: "hidden lg:flex items-center gap-5", children: [
              /* @__PURE__ */ h("a", { href: "tel:+971500000000", style: { color: "rgba(200,169,106,0.7)", display: "flex", alignItems: "center" }, children: /* @__PURE__ */ h(Ve, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ h(
                "a",
                {
                  href: "#contact",
                  className: "transition-opacity hover:opacity-75",
                  style: { padding: "0.5rem 1.2rem", border: `1px solid ${m}`, color: m, fontSize: "0.65rem", letterSpacing: "0.18em", fontWeight: 400, textDecoration: "none" },
                  children: "FREE CONSULTATION"
                }
              )
            ] }),
            /* @__PURE__ */ h("button", { className: "lg:hidden", onClick: () => a(!r), style: { color: m }, children: r ? /* @__PURE__ */ h(Gh, { className: "w-6 h-6" }) : /* @__PURE__ */ h(xh, { className: "w-6 h-6" }) })
          ] }),
          /* @__PURE__ */ h(Zt, { children: r && /* @__PURE__ */ h(
            Z.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              className: "lg:hidden overflow-hidden",
              style: { background: "rgba(14,14,14,0.98)" },
              children: /* @__PURE__ */ g("div", { className: "px-6 py-6 flex flex-col gap-3", children: [
                S.map((p) => /* @__PURE__ */ h(
                  "a",
                  {
                    href: `#${p.toLowerCase()}`,
                    className: "py-2.5 text-xs tracking-widest",
                    style: { color: "rgba(255,255,255,0.65)", borderBottom: "1px solid rgba(200,169,106,0.08)", textDecoration: "none" },
                    onClick: () => a(!1),
                    children: p.toUpperCase()
                  },
                  p
                )),
                /* @__PURE__ */ h(
                  "a",
                  {
                    href: "#contact",
                    className: "mt-2 py-3 text-center text-xs tracking-widest",
                    style: { border: `1px solid ${m}`, color: m, textDecoration: "none" },
                    onClick: () => a(!1),
                    children: "FREE CONSULTATION"
                  }
                )
              ] })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ g("section", { id: "home", className: "relative overflow-hidden", style: { height: "100svh", minHeight: "680px" }, children: [
      /* @__PURE__ */ h(
        "img",
        {
          src: "https://images.unsplash.com/photo-1779505576192-803dd8c9b55a?w=1920&h=1080&fit=crop&auto=format",
          alt: "Elegant luxury living room with sunlit layered curtains",
          className: "absolute inset-0 w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ h("div", { className: "absolute inset-0", style: { background: "linear-gradient(120deg, rgba(14,14,14,0.78) 0%, rgba(14,14,14,0.38) 65%, rgba(14,14,14,0.15) 100%)" } }),
      /* @__PURE__ */ h("div", { className: "relative z-10 h-full flex items-center", children: /* @__PURE__ */ h("div", { className: "max-w-7xl mx-auto px-6 w-full", children: /* @__PURE__ */ g(
        Z.div,
        {
          initial: { opacity: 0, y: 44 },
          animate: { opacity: n ? 1 : 0, y: n ? 0 : 44 },
          transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
          className: "max-w-3xl",
          children: [
            /* @__PURE__ */ g("div", { className: "flex items-center gap-3 mb-7", children: [
              /* @__PURE__ */ h("div", { style: { width: "44px", height: "1px", background: m } }),
              /* @__PURE__ */ h("span", { style: { fontSize: "0.62rem", letterSpacing: "0.38em", color: m, fontWeight: 300 }, children: "PREMIUM WINDOW FURNISHINGS" })
            ] }),
            /* @__PURE__ */ g(
              "h1",
              {
                className: "mb-7 text-white leading-tight",
                style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 300 },
                children: [
                  "Luxury Curtains",
                  /* @__PURE__ */ h("br", {}),
                  /* @__PURE__ */ h("em", { children: "Crafted for" }),
                  /* @__PURE__ */ h("br", {}),
                  "Elegant Living"
                ]
              }
            ),
            /* @__PURE__ */ h("p", { className: "mb-10 leading-relaxed", style: { color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", fontWeight: 300, maxWidth: "460px" }, children: "Custom Curtains, Premium Blinds & Elegant Interior Solutions for Modern Homes." }),
            /* @__PURE__ */ g("div", { className: "flex flex-wrap gap-4", children: [
              /* @__PURE__ */ h(
                "a",
                {
                  href: "#services",
                  className: "transition-opacity hover:opacity-85",
                  style: { padding: "0.95rem 2.2rem", background: m, color: "#0E0E0E", fontSize: "0.68rem", letterSpacing: "0.2em", fontWeight: 500, textDecoration: "none" },
                  children: "EXPLORE COLLECTION"
                }
              ),
              /* @__PURE__ */ h(
                "a",
                {
                  href: "#contact",
                  className: "transition-all hover:bg-white/10",
                  style: { padding: "0.95rem 2.2rem", border: "1px solid rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.88)", fontSize: "0.68rem", letterSpacing: "0.2em", fontWeight: 300, textDecoration: "none" },
                  children: "BOOK FREE CONSULTATION"
                }
              )
            ] })
          ]
        }
      ) }) }),
      /* @__PURE__ */ g("div", { className: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ h("span", { style: { fontSize: "0.55rem", letterSpacing: "0.38em", color: "rgba(255,255,255,0.3)" }, children: "SCROLL" }),
        /* @__PURE__ */ h(Z.div, { animate: { y: [0, 7, 0] }, transition: { duration: 1.6, repeat: 1 / 0 }, children: /* @__PURE__ */ h(ns, { className: "w-4 h-4", style: { color: "rgba(200,169,106,0.55)" } }) })
      ] })
    ] }),
    /* @__PURE__ */ h("section", { ref: x, className: "py-16", style: { background: "#0E0E0E" }, children: /* @__PURE__ */ h("div", { className: "max-w-5xl mx-auto px-6", children: /* @__PURE__ */ h("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8", children: [
      { val: w, suffix: "+", label: "Years Experience" },
      { val: T, suffix: "+", label: "Happy Clients" },
      { val: b, suffix: "+", label: "Curtains Installed" },
      { val: 100, suffix: "%", label: "Custom Made" }
    ].map((p, v) => /* @__PURE__ */ g("div", { className: "text-center", children: [
      /* @__PURE__ */ g("div", { style: { fontFamily: "'Playfair Display', serif", color: m, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, lineHeight: 1 }, children: [
        p.val.toLocaleString(),
        p.suffix
      ] }),
      /* @__PURE__ */ h("div", { style: { fontSize: "0.62rem", letterSpacing: "0.28em", color: "rgba(255,255,255,0.35)", marginTop: "0.6rem", fontWeight: 300 }, children: p.label.toUpperCase() })
    ] }, v)) }) }) }),
    /* @__PURE__ */ h("section", { id: "about", className: "py-28", style: { background: "#F8F6F3" }, children: /* @__PURE__ */ h("div", { className: "max-w-7xl mx-auto px-6", children: /* @__PURE__ */ g("div", { className: "grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ g("div", { className: "relative", children: [
        /* @__PURE__ */ h("div", { className: "absolute -bottom-5 -left-5 w-44 h-44 -z-0", style: { background: m, opacity: 0.1 } }),
        /* @__PURE__ */ h("div", { className: "relative z-10 ml-10", children: /* @__PURE__ */ h(
          "img",
          {
            src: "https://images.unsplash.com/photo-1778731525357-25c95792c27c?w=780&h=960&fit=crop&auto=format",
            alt: "Elegant living room with premium floor-to-ceiling curtains",
            className: "w-full object-cover shadow-2xl",
            style: { height: "520px" }
          }
        ) }),
        /* @__PURE__ */ h("div", { className: "absolute top-10 left-0 z-20 shadow-2xl", style: { border: "4px solid #fff", width: "190px" }, children: /* @__PURE__ */ h(
          "img",
          {
            src: "https://images.unsplash.com/photo-1761289358623-3fddd0854000?w=400&h=520&fit=crop&auto=format",
            alt: "Sheer curtains with morning sunlight",
            className: "w-full object-cover",
            style: { height: "240px" }
          }
        ) }),
        /* @__PURE__ */ g("div", { className: "absolute bottom-6 right-0 z-20 w-28 h-28 flex flex-col items-center justify-center shadow-xl", style: { background: m }, children: [
          /* @__PURE__ */ h("div", { style: { fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 300, color: "#fff", lineHeight: 1 }, children: "15+" }),
          /* @__PURE__ */ g("div", { style: { fontSize: "0.52rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.75)", textAlign: "center", marginTop: "4px" }, children: [
            "YEARS OF",
            /* @__PURE__ */ h("br", {}),
            "EXCELLENCE"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ g("div", { children: [
        /* @__PURE__ */ g("div", { className: "flex items-center gap-3 mb-5", children: [
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } }),
          /* @__PURE__ */ h("span", { style: { fontSize: "0.62rem", letterSpacing: "0.38em", color: m, fontWeight: 300 }, children: "ABOUT US" })
        ] }),
        /* @__PURE__ */ g(
          "h2",
          {
            className: "mb-6 leading-tight",
            style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#0E0E0E" },
            children: [
              "Crafting Beautiful",
              /* @__PURE__ */ h("br", {}),
              /* @__PURE__ */ h("em", { children: "Interiors Since 2010" })
            ]
          }
        ),
        /* @__PURE__ */ h("p", { className: "mb-4 leading-relaxed", style: { color: "#5A5248", fontSize: "0.875rem", fontWeight: 300 }, children: "SAN CURTAINS is a premier bespoke curtain studio dedicated to transforming living spaces into expressions of refined luxury. Since our founding in 2010, we have established ourselves as the region's most trusted name in custom window furnishings." }),
        /* @__PURE__ */ h("p", { className: "mb-8 leading-relaxed", style: { color: "#5A5248", fontSize: "0.875rem", fontWeight: 300 }, children: "We specialise in custom curtains, designer blinds, premium wallpapers, motorized systems, and complete window furnishing solutions — all crafted to your exact specifications using the world's finest imported fabrics." }),
        /* @__PURE__ */ h("div", { className: "grid grid-cols-2 gap-3 mb-9", children: ["Bespoke Craftsmanship", "Premium Imported Fabrics", "Expert Installation", "Smart Home Integration"].map((p) => /* @__PURE__ */ g("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h("div", { style: { width: "5px", height: "5px", borderRadius: "50%", background: m, flexShrink: 0 } }),
          /* @__PURE__ */ h("span", { style: { fontSize: "0.78rem", fontWeight: 300, color: "#3A3530" }, children: p })
        ] }, p)) }),
        /* @__PURE__ */ g(
          "a",
          {
            href: "#services",
            className: "inline-flex items-center gap-3 group",
            style: { color: m, fontSize: "0.78rem", letterSpacing: "0.12em", textDecoration: "none", transition: "gap 0.3s" },
            children: [
              "Explore Our Services ",
              /* @__PURE__ */ h(Me, { className: "w-4 h-4" })
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ h("section", { id: "services", className: "py-28", style: { background: "#EFE9E2" }, children: /* @__PURE__ */ g("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ g("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ g("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } }),
          /* @__PURE__ */ h("span", { style: { fontSize: "0.62rem", letterSpacing: "0.38em", color: m, fontWeight: 300 }, children: "OUR SERVICES" }),
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } })
        ] }),
        /* @__PURE__ */ g("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#0E0E0E" }, children: [
          "Complete Window",
          /* @__PURE__ */ h("br", {}),
          /* @__PURE__ */ h("em", { children: "Furnishing Solutions" })
        ] })
      ] }),
      /* @__PURE__ */ h("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3", children: rs.map((p, v) => {
        const A = p.icon;
        return /* @__PURE__ */ g(
          "div",
          {
            className: "group p-6 cursor-default",
            style: { background: "#fff", transition: "all 0.3s ease" },
            onMouseEnter: (k) => {
              const P = k.currentTarget;
              P.style.background = "#0E0E0E", P.style.transform = "translateY(-5px)", P.style.boxShadow = "0 24px 48px rgba(0,0,0,0.12)";
            },
            onMouseLeave: (k) => {
              const P = k.currentTarget;
              P.style.background = "#fff", P.style.transform = "none", P.style.boxShadow = "none";
            },
            children: [
              /* @__PURE__ */ h("div", { className: "w-10 h-10 flex items-center justify-center mb-4", style: { background: "rgba(200,169,106,0.12)" }, children: /* @__PURE__ */ h(A, { className: "w-5 h-5", style: { color: m } }) }),
              /* @__PURE__ */ h(
                "h3",
                {
                  className: "text-sm font-medium mb-2 group-hover:text-white transition-colors duration-300",
                  style: { color: "#1A1A1A", fontFamily: "'Poppins', sans-serif" },
                  children: p.title
                }
              ),
              /* @__PURE__ */ h(
                "p",
                {
                  className: "text-xs leading-relaxed group-hover:text-white/55 transition-colors duration-300",
                  style: { color: "#6B6460" },
                  children: p.desc
                }
              )
            ]
          },
          v
        );
      }) })
    ] }) }),
    /* @__PURE__ */ h("section", { id: "collections", className: "py-28", style: { background: "#F8F6F3" }, children: /* @__PURE__ */ g("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ g("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ g("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } }),
          /* @__PURE__ */ h("span", { style: { fontSize: "0.62rem", letterSpacing: "0.38em", color: m, fontWeight: 300 }, children: "FEATURED" }),
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } })
        ] }),
        /* @__PURE__ */ g("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#0E0E0E" }, children: [
          "Curated ",
          /* @__PURE__ */ h("em", { children: "Collections" })
        ] })
      ] }),
      /* @__PURE__ */ h("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: Qh.map((p, v) => /* @__PURE__ */ g(
        "div",
        {
          className: "relative overflow-hidden group cursor-pointer",
          style: { height: "300px", background: "#EFE9E2" },
          children: [
            /* @__PURE__ */ h(
              "img",
              {
                src: p.img,
                alt: `${p.title} curtain collection`,
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              }
            ),
            /* @__PURE__ */ h(
              "div",
              {
                className: "absolute inset-0",
                style: { background: "linear-gradient(to top, rgba(14,14,14,0.82) 0%, rgba(14,14,14,0.06) 55%)" }
              }
            ),
            /* @__PURE__ */ g("div", { className: "absolute bottom-0 left-0 right-0 p-6", children: [
              /* @__PURE__ */ h("div", { style: { fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 300, color: "#fff" }, children: p.title }),
              /* @__PURE__ */ g(
                "div",
                {
                  className: "flex items-center gap-2 mt-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100",
                  children: [
                    /* @__PURE__ */ h("span", { style: { fontSize: "0.6rem", letterSpacing: "0.3em", color: m }, children: "EXPLORE" }),
                    /* @__PURE__ */ h(Me, { className: "w-3 h-3", style: { color: m } })
                  ]
                }
              )
            ] })
          ]
        },
        v
      )) })
    ] }) }),
    /* @__PURE__ */ h("section", { className: "py-28", style: { background: "#0E0E0E" }, children: /* @__PURE__ */ g("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ g("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ g("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } }),
          /* @__PURE__ */ h("span", { style: { fontSize: "0.62rem", letterSpacing: "0.38em", color: m, fontWeight: 300 }, children: "MATERIALS" }),
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } })
        ] }),
        /* @__PURE__ */ g("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#fff" }, children: [
          "Premium ",
          /* @__PURE__ */ h("em", { children: "Fabric" }),
          " Collection"
        ] })
      ] }),
      /* @__PURE__ */ h("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: Jh.map((p, v) => /* @__PURE__ */ g(
        "div",
        {
          className: "group p-7 cursor-default",
          style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(200,169,106,0.1)", transition: "all 0.3s ease" },
          onMouseEnter: (A) => {
            A.currentTarget.style.borderColor = "rgba(200,169,106,0.4)", A.currentTarget.style.background = "rgba(255,255,255,0.06)";
          },
          onMouseLeave: (A) => {
            A.currentTarget.style.borderColor = "rgba(200,169,106,0.1)", A.currentTarget.style.background = "rgba(255,255,255,0.03)";
          },
          children: [
            /* @__PURE__ */ h(
              "div",
              {
                className: "w-14 h-14 rounded-full mb-5 transition-transform duration-300 group-hover:scale-105",
                style: { background: p.swatch, border: "2px solid rgba(200,169,106,0.25)" }
              }
            ),
            /* @__PURE__ */ h("h3", { style: { fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 300, color: "#fff", marginBottom: "0.35rem" }, children: p.name }),
            /* @__PURE__ */ h("p", { style: { fontSize: "0.72rem", color: "rgba(255,255,255,0.38)", fontWeight: 300 }, children: p.desc }),
            /* @__PURE__ */ h(
              "div",
              {
                className: "mt-5 h-px transition-opacity duration-300 opacity-0 group-hover:opacity-100",
                style: { background: `linear-gradient(90deg, ${m}, transparent)` }
              }
            )
          ]
        },
        v
      )) })
    ] }) }),
    /* @__PURE__ */ h("section", { className: "py-28", style: { background: "#F8F6F3" }, children: /* @__PURE__ */ h("div", { className: "max-w-7xl mx-auto px-6", children: /* @__PURE__ */ g("div", { className: "grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ g("div", { children: [
        /* @__PURE__ */ g("div", { className: "flex items-center gap-3 mb-5", children: [
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } }),
          /* @__PURE__ */ h("span", { style: { fontSize: "0.62rem", letterSpacing: "0.38em", color: m, fontWeight: 300 }, children: "WHY US" })
        ] }),
        /* @__PURE__ */ g("h2", { className: "mb-5", style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#0E0E0E" }, children: [
          "Why Choose",
          /* @__PURE__ */ h("br", {}),
          /* @__PURE__ */ h("em", { children: "SAN CURTAINS" })
        ] }),
        /* @__PURE__ */ h("p", { className: "leading-relaxed", style: { color: "#5A5248", fontSize: "0.875rem", fontWeight: 300, maxWidth: "440px" }, children: "For over fifteen years we have been the preferred choice of discerning homeowners, leading interior designers, and luxury hospitality brands across the region." }),
        /* @__PURE__ */ h("div", { className: "mt-9 overflow-hidden", style: { height: "280px" }, children: /* @__PURE__ */ h(
          "img",
          {
            src: "https://images.unsplash.com/photo-1768577908037-bbc3da95c1cf?w=800&h=480&fit=crop&auto=format",
            alt: "Sunlight streaming through premium sheer curtains",
            className: "w-full h-full object-cover"
          }
        ) })
      ] }),
      /* @__PURE__ */ h("div", { className: "grid grid-cols-2 gap-3", children: td.map((p, v) => {
        const A = p.icon;
        return /* @__PURE__ */ g(
          "div",
          {
            className: "p-5",
            style: { background: "#EFE9E2", transition: "all 0.3s ease" },
            onMouseEnter: (k) => {
              k.currentTarget.style.background = "#fff", k.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.07)", k.currentTarget.style.transform = "translateY(-3px)";
            },
            onMouseLeave: (k) => {
              k.currentTarget.style.background = "#EFE9E2", k.currentTarget.style.boxShadow = "none", k.currentTarget.style.transform = "none";
            },
            children: [
              /* @__PURE__ */ h("div", { className: "w-9 h-9 flex items-center justify-center mb-3", style: { background: "rgba(200,169,106,0.14)" }, children: /* @__PURE__ */ h(A, { className: "w-4 h-4", style: { color: m } }) }),
              /* @__PURE__ */ h("h3", { style: { fontSize: "0.8rem", fontWeight: 500, color: "#1A1A1A", marginBottom: "0.3rem" }, children: p.title }),
              /* @__PURE__ */ h("p", { style: { fontSize: "0.72rem", color: "#6B6460", fontWeight: 300, lineHeight: 1.6 }, children: p.desc })
            ]
          },
          v
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ h("section", { className: "py-28", style: { background: "#EFE9E2" }, children: /* @__PURE__ */ g("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ g("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ g("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } }),
          /* @__PURE__ */ h("span", { style: { fontSize: "0.62rem", letterSpacing: "0.38em", color: m, fontWeight: 300 }, children: "OUR PROCESS" }),
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } })
        ] }),
        /* @__PURE__ */ g("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#0E0E0E" }, children: [
          "How We ",
          /* @__PURE__ */ h("em", { children: "Work" })
        ] })
      ] }),
      /* @__PURE__ */ g("div", { className: "relative", children: [
        /* @__PURE__ */ h(
          "div",
          {
            className: "hidden md:block absolute left-[10%] right-[10%]",
            style: { top: "2rem", height: "1px", background: `linear-gradient(90deg, transparent, ${m} 20%, ${m} 80%, transparent)`, opacity: 0.3 }
          }
        ),
        /* @__PURE__ */ h("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-8", children: ed.map((p, v) => /* @__PURE__ */ g("div", { className: "flex flex-col items-center text-center", children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "relative z-10 w-16 h-16 flex items-center justify-center mb-5",
              style: { background: "#0E0E0E", border: `2px solid ${m}` },
              children: /* @__PURE__ */ h("span", { style: { fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", fontWeight: 300, color: m }, children: p.step })
            }
          ),
          /* @__PURE__ */ h("h3", { style: { fontSize: "0.8rem", fontWeight: 500, color: "#0E0E0E", marginBottom: "0.5rem" }, children: p.title }),
          /* @__PURE__ */ h("p", { style: { fontSize: "0.72rem", color: "#6B6460", fontWeight: 300, lineHeight: 1.7 }, children: p.desc })
        ] }, v)) })
      ] })
    ] }) }),
    /* @__PURE__ */ h("section", { id: "gallery", className: "py-28", style: { background: "#0E0E0E" }, children: /* @__PURE__ */ g("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ g("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ g("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } }),
          /* @__PURE__ */ h("span", { style: { fontSize: "0.62rem", letterSpacing: "0.38em", color: m, fontWeight: 300 }, children: "PORTFOLIO" }),
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } })
        ] }),
        /* @__PURE__ */ g("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#fff" }, children: [
          "Our ",
          /* @__PURE__ */ h("em", { children: "Gallery" })
        ] })
      ] }),
      /* @__PURE__ */ h("div", { className: "columns-2 md:columns-3 gap-3", children: nd.map((p, v) => /* @__PURE__ */ g(
        "div",
        {
          className: "relative overflow-hidden group cursor-pointer mb-3 break-inside-avoid",
          style: { background: "#1a1a1a" },
          children: [
            /* @__PURE__ */ h(
              "img",
              {
                src: p.src,
                alt: p.alt,
                className: "w-full object-cover transition-transform duration-700 group-hover:scale-105",
                style: { height: p.tall ? "420px" : "270px", display: "block" }
              }
            ),
            /* @__PURE__ */ h(
              "div",
              {
                className: "absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100",
                style: { background: "rgba(14,14,14,0.45)" },
                children: /* @__PURE__ */ h($r, { className: "w-6 h-6", style: { color: m } })
              }
            )
          ]
        },
        v
      )) })
    ] }) }),
    /* @__PURE__ */ h("section", { className: "py-28", style: { background: "#F8F6F3" }, children: /* @__PURE__ */ g("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ g("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ g("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } }),
          /* @__PURE__ */ h("span", { style: { fontSize: "0.62rem", letterSpacing: "0.38em", color: m, fontWeight: 300 }, children: "TESTIMONIALS" }),
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } })
        ] }),
        /* @__PURE__ */ g("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#0E0E0E" }, children: [
          "What Our ",
          /* @__PURE__ */ h("em", { children: "Clients Say" })
        ] })
      ] }),
      /* @__PURE__ */ h("div", { className: "grid md:grid-cols-3 gap-5", children: id.map((p, v) => /* @__PURE__ */ g(
        "div",
        {
          className: "p-8",
          style: { background: "#fff", border: "1px solid rgba(200,169,106,0.15)" },
          children: [
            /* @__PURE__ */ h("div", { className: "flex gap-1 mb-5", children: Array(p.rating ?? 5).fill(0).map((A, k) => /* @__PURE__ */ h(Yr, { className: "w-3.5 h-3.5 fill-current", style: { color: m } }, k)) }),
            /* @__PURE__ */ g(
              "p",
              {
                className: "mb-6 leading-relaxed italic",
                style: { fontFamily: "'Playfair Display', serif", fontSize: "0.88rem", color: "#4A453F" },
                children: [
                  "“",
                  p.text,
                  "”"
                ]
              }
            ),
            /* @__PURE__ */ g(
              "div",
              {
                className: "flex items-center gap-3 pt-5",
                style: { borderTop: "1px solid rgba(200,169,106,0.12)" },
                children: [
                  /* @__PURE__ */ h("img", { src: p.img, alt: p.name, className: "w-10 h-10 rounded-full object-cover" }),
                  /* @__PURE__ */ g("div", { children: [
                    /* @__PURE__ */ h("div", { style: { fontSize: "0.8rem", fontWeight: 500, color: "#1A1A1A" }, children: p.name }),
                    /* @__PURE__ */ h("div", { style: { fontSize: "0.68rem", color: m, fontWeight: 300 }, children: p.role })
                  ] })
                ]
              }
            )
          ]
        },
        v
      )) })
    ] }) }),
    /* @__PURE__ */ h("section", { className: "py-14", style: { background: "#EFE9E2" }, children: /* @__PURE__ */ g("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ h("div", { className: "text-center mb-8", children: /* @__PURE__ */ h("span", { style: { fontSize: "0.6rem", letterSpacing: "0.38em", color: "#9A9088", fontWeight: 300 }, children: "BRANDS WE WORK WITH" }) }),
      /* @__PURE__ */ h("div", { className: "flex flex-wrap justify-center gap-x-10 gap-y-5", children: rd.map((p) => /* @__PURE__ */ h(
        "div",
        {
          style: { fontSize: "0.7rem", letterSpacing: "0.22em", color: "#9A9088", fontWeight: 300, transition: "color 0.2s", cursor: "default" },
          onMouseEnter: (v) => v.currentTarget.style.color = m,
          onMouseLeave: (v) => v.currentTarget.style.color = "#9A9088",
          children: p.toUpperCase()
        },
        p
      )) })
    ] }) }),
    /* @__PURE__ */ h("section", { className: "py-28", style: { background: "#F8F6F3" }, children: /* @__PURE__ */ g("div", { className: "max-w-3xl mx-auto px-6", children: [
      /* @__PURE__ */ g("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ g("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } }),
          /* @__PURE__ */ h("span", { style: { fontSize: "0.62rem", letterSpacing: "0.38em", color: m, fontWeight: 300 }, children: "FAQ" }),
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } })
        ] }),
        /* @__PURE__ */ g("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#0E0E0E" }, children: [
          "Frequently Asked ",
          /* @__PURE__ */ h("em", { children: "Questions" })
        ] })
      ] }),
      /* @__PURE__ */ h("div", { className: "space-y-2", children: sd.map((p, v) => /* @__PURE__ */ g("div", { style: { border: "1px solid rgba(200,169,106,0.2)", background: "#fff" }, children: [
        /* @__PURE__ */ g(
          "button",
          {
            className: "w-full flex items-center justify-between p-6 text-left",
            onClick: () => u(l === v ? null : v),
            children: [
              /* @__PURE__ */ h("span", { style: { fontSize: "0.83rem", fontWeight: 400, color: "#1A1A1A", paddingRight: "1rem" }, children: p.q }),
              /* @__PURE__ */ h("div", { style: { color: m, flexShrink: 0 }, children: l === v ? /* @__PURE__ */ h(Th, { className: "w-4 h-4" }) : /* @__PURE__ */ h(Nh, { className: "w-4 h-4" }) })
            ]
          }
        ),
        /* @__PURE__ */ h(Zt, { children: l === v && /* @__PURE__ */ h(
          Z.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.28, ease: "easeInOut" },
            className: "overflow-hidden",
            children: /* @__PURE__ */ h(
              "div",
              {
                className: "px-6 pb-6",
                style: { borderTop: "1px solid rgba(200,169,106,0.1)" },
                children: /* @__PURE__ */ h("p", { style: { paddingTop: "1rem", fontSize: "0.83rem", fontWeight: 300, color: "#5A5248", lineHeight: 1.75 }, children: p.a })
              }
            )
          },
          "answer"
        ) })
      ] }, v)) })
    ] }) }),
    /* @__PURE__ */ g("section", { className: "relative py-36 overflow-hidden", children: [
      /* @__PURE__ */ h(
        "img",
        {
          src: "https://images.unsplash.com/photo-1778731525357-25c95792c27c?w=1920&h=900&fit=crop&auto=format",
          alt: "Luxury interior with floor-to-ceiling curtains",
          className: "absolute inset-0 w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ h("div", { className: "absolute inset-0", style: { background: "rgba(14,14,14,0.84)" } }),
      /* @__PURE__ */ g("div", { className: "relative z-10 text-center max-w-3xl mx-auto px-6", children: [
        /* @__PURE__ */ g("div", { className: "flex items-center justify-center gap-3 mb-7", children: [
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } }),
          /* @__PURE__ */ h("span", { style: { fontSize: "0.62rem", letterSpacing: "0.38em", color: m, fontWeight: 300 }, children: "GET STARTED" }),
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } })
        ] }),
        /* @__PURE__ */ g(
          "h2",
          {
            className: "text-white mb-5",
            style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 300 },
            children: [
              "Transform Your Space with",
              /* @__PURE__ */ h("br", {}),
              /* @__PURE__ */ h("em", { children: "Luxury Curtains" })
            ]
          }
        ),
        /* @__PURE__ */ h("p", { className: "mb-10", style: { color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", fontWeight: 300 }, children: "Book a complimentary in-home consultation with our design experts today." }),
        /* @__PURE__ */ g(
          "a",
          {
            href: "#contact",
            className: "inline-flex items-center gap-3 transition-opacity hover:opacity-85",
            style: { padding: "1rem 2.6rem", background: m, color: "#0E0E0E", fontSize: "0.68rem", letterSpacing: "0.2em", fontWeight: 500, textDecoration: "none" },
            children: [
              "BOOK FREE HOME CONSULTATION ",
              /* @__PURE__ */ h(Me, { className: "w-4 h-4" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ h("section", { id: "contact", className: "py-28", style: { background: "#EFE9E2" }, children: /* @__PURE__ */ g("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ g("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ g("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } }),
          /* @__PURE__ */ h("span", { style: { fontSize: "0.62rem", letterSpacing: "0.38em", color: m, fontWeight: 300 }, children: "CONTACT US" }),
          /* @__PURE__ */ h("div", { style: { width: "36px", height: "1px", background: m } })
        ] }),
        /* @__PURE__ */ g("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#0E0E0E" }, children: [
          "Get In ",
          /* @__PURE__ */ h("em", { children: "Touch" })
        ] })
      ] }),
      /* @__PURE__ */ g("div", { className: "grid lg:grid-cols-2 gap-12", children: [
        /* @__PURE__ */ g("div", { children: [
          /* @__PURE__ */ h("div", { className: "space-y-6 mb-10", children: [
            { icon: Ve, label: "Phone", value: "+971 50 000 0000" },
            { icon: Ne, label: "WhatsApp", value: "+971 50 000 0000" },
            { icon: ph, label: "Email", value: "info@sancurtains.com" },
            { icon: yh, label: "Address", value: "Dubai, United Arab Emirates" },
            { icon: Ju, label: "Working Hours", value: "Mon – Sat: 9:00 AM – 7:00 PM" }
          ].map(({ icon: p, label: v, value: A }, k) => /* @__PURE__ */ g("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ h("div", { className: "w-10 h-10 flex items-center justify-center flex-shrink-0", style: { background: "rgba(200,169,106,0.14)" }, children: /* @__PURE__ */ h(p, { className: "w-4 h-4", style: { color: m } }) }),
            /* @__PURE__ */ g("div", { children: [
              /* @__PURE__ */ h("div", { style: { fontSize: "0.6rem", letterSpacing: "0.3em", color: m, fontWeight: 300, marginBottom: "2px" }, children: v.toUpperCase() }),
              /* @__PURE__ */ h("div", { style: { fontSize: "0.85rem", color: "#1A1A1A", fontWeight: 300 }, children: A })
            ] })
          ] }, k)) }),
          /* @__PURE__ */ g("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ g(
              "a",
              {
                href: "https://wa.me/971500000000",
                className: "flex items-center gap-2 transition-opacity hover:opacity-85",
                style: { padding: "0.75rem 1.4rem", background: "#25D366", color: "#fff", fontSize: "0.65rem", letterSpacing: "0.18em", fontWeight: 400, textDecoration: "none" },
                children: [
                  /* @__PURE__ */ h(Ne, { className: "w-4 h-4" }),
                  " WHATSAPP"
                ]
              }
            ),
            /* @__PURE__ */ g(
              "a",
              {
                href: "tel:+971500000000",
                className: "flex items-center gap-2 transition-opacity hover:opacity-85",
                style: { padding: "0.75rem 1.4rem", background: "#0E0E0E", color: m, fontSize: "0.65rem", letterSpacing: "0.18em", fontWeight: 400, textDecoration: "none" },
                children: [
                  /* @__PURE__ */ h(Ve, { className: "w-4 h-4" }),
                  " CALL NOW"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ g("div", { className: "p-8", style: { background: "#fff" }, children: [
          /* @__PURE__ */ h("h3", { style: { fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 300, color: "#0E0E0E", marginBottom: "1.5rem" }, children: "Send Us a Message" }),
          /* @__PURE__ */ g("form", { className: "space-y-4", onSubmit: (p) => p.preventDefault(), children: [
            /* @__PURE__ */ h("div", { className: "grid grid-cols-2 gap-4", children: [
              { label: "FULL NAME", type: "text", placeholder: "Your name" },
              { label: "PHONE", type: "tel", placeholder: "Your phone" }
            ].map((p) => /* @__PURE__ */ g("div", { children: [
              /* @__PURE__ */ h("label", { style: { fontSize: "0.6rem", letterSpacing: "0.25em", color: "#9A9088", display: "block", marginBottom: "0.4rem" }, children: p.label }),
              /* @__PURE__ */ h(
                "input",
                {
                  type: p.type,
                  placeholder: p.placeholder,
                  className: "w-full px-4 py-3 outline-none",
                  style: { background: "#F8F6F3", border: "1px solid rgba(200,169,106,0.22)", color: "#1A1A1A", fontSize: "0.83rem", fontFamily: "'Poppins', sans-serif", transition: "border-color 0.2s" },
                  onFocus: (v) => v.currentTarget.style.borderColor = m,
                  onBlur: (v) => v.currentTarget.style.borderColor = "rgba(200,169,106,0.22)"
                }
              )
            ] }, p.label)) }),
            /* @__PURE__ */ g("div", { children: [
              /* @__PURE__ */ h("label", { style: { fontSize: "0.6rem", letterSpacing: "0.25em", color: "#9A9088", display: "block", marginBottom: "0.4rem" }, children: "EMAIL" }),
              /* @__PURE__ */ h(
                "input",
                {
                  type: "email",
                  placeholder: "your@email.com",
                  className: "w-full px-4 py-3 outline-none",
                  style: { background: "#F8F6F3", border: "1px solid rgba(200,169,106,0.22)", color: "#1A1A1A", fontSize: "0.83rem", fontFamily: "'Poppins', sans-serif", transition: "border-color 0.2s" },
                  onFocus: (p) => p.currentTarget.style.borderColor = m,
                  onBlur: (p) => p.currentTarget.style.borderColor = "rgba(200,169,106,0.22)"
                }
              )
            ] }),
            /* @__PURE__ */ g("div", { children: [
              /* @__PURE__ */ h("label", { style: { fontSize: "0.6rem", letterSpacing: "0.25em", color: "#9A9088", display: "block", marginBottom: "0.4rem" }, children: "SERVICE REQUIRED" }),
              /* @__PURE__ */ g(
                "select",
                {
                  className: "w-full px-4 py-3 outline-none",
                  style: { background: "#F8F6F3", border: "1px solid rgba(200,169,106,0.22)", color: "#1A1A1A", fontSize: "0.83rem", fontFamily: "'Poppins', sans-serif", transition: "border-color 0.2s" },
                  onFocus: (p) => p.currentTarget.style.borderColor = m,
                  onBlur: (p) => p.currentTarget.style.borderColor = "rgba(200,169,106,0.22)",
                  children: [
                    /* @__PURE__ */ h("option", { value: "", children: "Select a service" }),
                    rs.map((p) => /* @__PURE__ */ h("option", { value: p.title, children: p.title }, p.title))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ g("div", { children: [
              /* @__PURE__ */ h("label", { style: { fontSize: "0.6rem", letterSpacing: "0.25em", color: "#9A9088", display: "block", marginBottom: "0.4rem" }, children: "MESSAGE" }),
              /* @__PURE__ */ h(
                "textarea",
                {
                  rows: 4,
                  placeholder: "Tell us about your project...",
                  className: "w-full px-4 py-3 outline-none resize-none",
                  style: { background: "#F8F6F3", border: "1px solid rgba(200,169,106,0.22)", color: "#1A1A1A", fontSize: "0.83rem", fontFamily: "'Poppins', sans-serif", transition: "border-color 0.2s" },
                  onFocus: (p) => p.currentTarget.style.borderColor = m,
                  onBlur: (p) => p.currentTarget.style.borderColor = "rgba(200,169,106,0.22)"
                }
              )
            ] }),
            /* @__PURE__ */ g(
              "button",
              {
                type: "submit",
                className: "w-full flex items-center justify-center gap-2 py-4 transition-opacity hover:opacity-85",
                style: { background: m, color: "#0E0E0E", fontSize: "0.68rem", letterSpacing: "0.2em", fontWeight: 500, fontFamily: "'Poppins', sans-serif" },
                children: [
                  "SEND MESSAGE ",
                  /* @__PURE__ */ h(ss, { className: "w-4 h-4" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ h("footer", { style: { background: "#0E0E0E" }, children: /* @__PURE__ */ g("div", { className: "max-w-7xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ g("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-10 mb-12", children: [
        /* @__PURE__ */ g("div", { className: "col-span-2 md:col-span-1", children: [
          /* @__PURE__ */ h("div", { style: { fontFamily: "'Playfair Display', serif", color: m, fontSize: "2rem", letterSpacing: "0.28em", fontWeight: 300, lineHeight: 1 }, children: "SAN" }),
          /* @__PURE__ */ h("div", { style: { fontSize: "0.52rem", letterSpacing: "0.5em", color: "rgba(200,169,106,0.45)", marginTop: "2px", fontWeight: 300 }, children: "CURTAINS" }),
          /* @__PURE__ */ h("p", { style: { fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", fontWeight: 300, lineHeight: 1.75, marginTop: "1.2rem", marginBottom: "1.4rem" }, children: "Premium bespoke curtains, blinds, wallpapers, and interior furnishing solutions since 2010." }),
          /* @__PURE__ */ h("div", { className: "flex gap-2.5", children: [dh, sh, Uh, Yh].map((p, v) => /* @__PURE__ */ h(
            "a",
            {
              href: "#",
              className: "w-8 h-8 flex items-center justify-center transition-all duration-200",
              style: { border: "1px solid rgba(200,169,106,0.18)", color: "rgba(200,169,106,0.5)" },
              onMouseEnter: (A) => {
                A.currentTarget.style.borderColor = m, A.currentTarget.style.color = m;
              },
              onMouseLeave: (A) => {
                A.currentTarget.style.borderColor = "rgba(200,169,106,0.18)", A.currentTarget.style.color = "rgba(200,169,106,0.5)";
              },
              "aria-label": "Social media",
              children: /* @__PURE__ */ h(p, { className: "w-3.5 h-3.5" })
            },
            v
          )) })
        ] }),
        /* @__PURE__ */ g("div", { children: [
          /* @__PURE__ */ h("h4", { style: { fontSize: "0.6rem", letterSpacing: "0.32em", color: m, fontWeight: 400, marginBottom: "1.2rem" }, children: "QUICK LINKS" }),
          /* @__PURE__ */ h("div", { className: "space-y-2.5", children: ["Home", "About", "Services", "Collections", "Gallery", "Contact"].map((p) => /* @__PURE__ */ h(
            "a",
            {
              href: `#${p.toLowerCase()}`,
              style: { display: "block", fontSize: "0.78rem", color: "rgba(255,255,255,0.38)", fontWeight: 300, textDecoration: "none", transition: "color 0.2s" },
              onMouseEnter: (v) => v.currentTarget.style.color = m,
              onMouseLeave: (v) => v.currentTarget.style.color = "rgba(255,255,255,0.38)",
              children: p
            },
            p
          )) })
        ] }),
        /* @__PURE__ */ g("div", { children: [
          /* @__PURE__ */ h("h4", { style: { fontSize: "0.6rem", letterSpacing: "0.32em", color: m, fontWeight: 400, marginBottom: "1.2rem" }, children: "SERVICES" }),
          /* @__PURE__ */ h("div", { className: "space-y-2.5", children: ["Premium Curtains", "Sheer Curtains", "Blackout Curtains", "Motorized Curtains", "Roman Blinds", "Wallpapers"].map((p) => /* @__PURE__ */ h(
            "a",
            {
              href: "#services",
              style: { display: "block", fontSize: "0.78rem", color: "rgba(255,255,255,0.38)", fontWeight: 300, textDecoration: "none", transition: "color 0.2s" },
              onMouseEnter: (v) => v.currentTarget.style.color = m,
              onMouseLeave: (v) => v.currentTarget.style.color = "rgba(255,255,255,0.38)",
              children: p
            },
            p
          )) })
        ] }),
        /* @__PURE__ */ g("div", { children: [
          /* @__PURE__ */ h("h4", { style: { fontSize: "0.6rem", letterSpacing: "0.32em", color: m, fontWeight: 400, marginBottom: "1.2rem" }, children: "NEWSLETTER" }),
          /* @__PURE__ */ h("p", { style: { fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", fontWeight: 300, lineHeight: 1.7, marginBottom: "1rem" }, children: "Subscribe for design inspiration and exclusive offers." }),
          /* @__PURE__ */ g("div", { className: "flex", children: [
            /* @__PURE__ */ h(
              "input",
              {
                type: "email",
                placeholder: "Your email",
                className: "flex-1 px-3 py-2.5 outline-none text-xs",
                style: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,169,106,0.18)", borderRight: "none", color: "rgba(255,255,255,0.65)", fontFamily: "'Poppins', sans-serif" }
              }
            ),
            /* @__PURE__ */ h(
              "button",
              {
                className: "px-3.5 py-2.5 transition-opacity hover:opacity-80",
                style: { background: m, color: "#0E0E0E" },
                "aria-label": "Subscribe",
                children: /* @__PURE__ */ h(ss, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ g(
        "div",
        {
          className: "pt-8 flex flex-col md:flex-row items-center justify-between gap-4",
          style: { borderTop: "1px solid rgba(200,169,106,0.08)" },
          children: [
            /* @__PURE__ */ h("span", { style: { fontSize: "0.68rem", color: "rgba(255,255,255,0.22)", fontWeight: 300 }, children: "© 2024 SAN CURTAINS. All rights reserved." }),
            /* @__PURE__ */ h("span", { style: { fontSize: "0.68rem", color: "rgba(255,255,255,0.22)", fontWeight: 300 }, children: "Premium Curtains & Interior Furnishings" })
          ]
        }
      )
    ] }) })
  ] });
}
const ad = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: od
}, Symbol.toStringTag, { value: "Module" }));
export {
  cd as Code0_8
};
