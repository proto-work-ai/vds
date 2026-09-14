const qu = () => Promise.resolve().then(() => Yu), _o = globalThis.__GLOBALS__.ReactJSXRuntime, { Fragment: Uo, jsx: f, jsxs: g } = _o;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
function ts(t) {
  const e = t?.props?._fgT, n = typeof e == "function" || typeof e == "string" || typeof e == "object" && e !== null && "$$typeof" in e;
  return globalThis.__GLOBALS__.React.isValidElement(t) && n;
}
function Ft(t) {
  return globalThis.__GLOBALS__.React.isValidElement(t) && t.type === "fg-txt";
}
function es(t) {
  const { _fgT: e, _fgS: n, _fgB: i, _fgD: s, ...r } = t.props;
  return globalThis.__GLOBALS__.React.createElement(e, {
    ...r,
    key: t.key
  }, r.children);
}
function Jt(t) {
  return ts(t) ? es(t) : Ft(t) ? t.props.children : t;
}
const Rt = globalThis.__GLOBALS__.React.Children, $o = {
  map(t, e, n) {
    return Rt.map(t, (i, s) => {
      const r = Jt(i);
      return Ft(i) ? null : e.call(n, r, s);
    });
  },
  forEach(t, e, n) {
    Rt.forEach(t, (i, s) => {
      if (Ft(i))
        return;
      const r = Jt(i);
      e.call(n, r, s);
    });
  },
  count(t) {
    let e = 0;
    return Rt.forEach(t, (n) => {
      Ft(n) || e++;
    }), e;
  },
  toArray(t) {
    const e = [];
    return Rt.forEach(t, (n) => {
      Ft(n) || e.push(Jt(n));
    }), e;
  },
  only(t) {
    const e = Rt.only(t);
    return Jt(e);
  }
}, ge = [
  "_fgT",
  "_fgS",
  "_fgB",
  "_fgD"
];
function Ho(t) {
  if (t == null || typeof t != "object") return t;
  const e = Object.keys(t);
  let n = !1;
  for (let s = 0; s < ge.length; s++)
    if (ge[s] in t) {
      n = !0;
      break;
    }
  if (!n) return t;
  const i = {};
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    ge.indexOf(r) === -1 && (i[r] = t[r]);
  }
  return i;
}
const zn = globalThis.__GLOBALS__.React.cloneElement, Go = (t, ...e) => {
  if (ts(t)) {
    const n = es(t), i = e[0];
    return i != null && typeof i == "object" && (e = [
      Ho(i),
      ...e.slice(1)
    ]), zn(n, ...e);
  }
  return zn(t, ...e);
};
({
  ...globalThis.__GLOBALS__.React
});
const { Component: ns, createContext: At, createElement: Ko, createFactory: Zu, createRef: Ju, forwardRef: Yo, Fragment: is, isValidElement: Xo, lazy: Qu, memo: th, Profiler: eh, PureComponent: nh, startTransition: ih, StrictMode: sh, Suspense: oh, use: rh, useCallback: Qe, useContext: j, useDebugValue: ah, useDeferredValue: lh, useEffect: Vt, useId: tn, useImperativeHandle: ch, useInsertionEffect: ss, useLayoutEffect: qo, useMemo: gt, useReducer: uh, useRef: et, useState: tt, useSyncExternalStore: hh, useTransition: dh, version: fh, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ph } = globalThis.__GLOBALS__.React, en = At({});
function nn(t) {
  const e = et(null);
  return e.current === null && (e.current = t()), e.current;
}
const sn = typeof window < "u", os = sn ? qo : Vt, de = /* @__PURE__ */ At(null);
function on(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function rn(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const nt = (t, e, n) => n > e ? e : n < t ? t : n;
let an = () => {
};
const it = {}, rs = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function as(t) {
  return typeof t == "object" && t !== null;
}
const ls = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function ln(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const X = /* @__NO_SIDE_EFFECTS__ */ (t) => t, Zo = (t, e) => (n) => e(t(n)), Kt = (...t) => t.reduce(Zo), zt = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const i = e - t;
  return i === 0 ? 1 : (n - t) / i;
};
class cn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return on(this.subscriptions, e), () => rn(this.subscriptions, e);
  }
  notify(e, n, i) {
    const s = this.subscriptions.length;
    if (s)
      if (s === 1)
        this.subscriptions[0](e, n, i);
      else
        for (let r = 0; r < s; r++) {
          const o = this.subscriptions[r];
          o && o(e, n, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const J = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, Y = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function cs(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const us = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, Jo = 1e-7, Qo = 12;
function tr(t, e, n, i, s) {
  let r, o, a = 0;
  do
    o = e + (n - e) / 2, r = us(o, i, s) - t, r > 0 ? n = o : e = o;
  while (Math.abs(r) > Jo && ++a < Qo);
  return o;
}
function Yt(t, e, n, i) {
  if (t === e && n === i)
    return X;
  const s = (r) => tr(r, 0, 1, t, n);
  return (r) => r === 0 || r === 1 ? r : us(s(r), e, i);
}
const hs = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, ds = (t) => (e) => 1 - t(1 - e), fs = /* @__PURE__ */ Yt(0.33, 1.53, 0.69, 0.99), un = /* @__PURE__ */ ds(fs), ps = /* @__PURE__ */ hs(un), ms = (t) => (t *= 2) < 1 ? 0.5 * un(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), hn = (t) => 1 - Math.sin(Math.acos(t)), gs = ds(hn), ys = hs(hn), er = /* @__PURE__ */ Yt(0.42, 0, 1, 1), nr = /* @__PURE__ */ Yt(0, 0, 0.58, 1), vs = /* @__PURE__ */ Yt(0.42, 0, 0.58, 1), ir = (t) => Array.isArray(t) && typeof t[0] != "number", xs = (t) => Array.isArray(t) && typeof t[0] == "number", sr = {
  linear: X,
  easeIn: er,
  easeInOut: vs,
  easeOut: nr,
  circIn: hn,
  circInOut: ys,
  circOut: gs,
  backIn: un,
  backInOut: ps,
  backOut: fs,
  anticipate: ms
}, or = (t) => typeof t == "string", Nn = (t) => {
  if (xs(t)) {
    an(t.length === 4);
    const [e, n, i, s] = t;
    return Yt(e, n, i, s);
  } else if (or(t))
    return sr[t];
  return t;
}, Qt = [
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
function rr(t, e) {
  let n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), s = !1, r = !1;
  const o = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(c) {
    o.has(c) && (u.schedule(c), t()), c(a);
  }
  const u = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, h = !1, d = !1) => {
      const m = d && s ? n : i;
      return h && o.add(c), m.has(c) || m.add(c), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      i.delete(c), o.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (a = c, s) {
        r = !0;
        return;
      }
      s = !0, [n, i] = [i, n], n.forEach(l), n.clear(), s = !1, r && (r = !1, u.process(c));
    }
  };
  return u;
}
const ar = 40;
function bs(t, e) {
  let n = !1, i = !0;
  const s = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => n = !0, o = Qt.reduce((x, A) => (x[A] = rr(r), x), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: c, update: h, preRender: d, render: p, postRender: m } = o, v = () => {
    const x = it.useManualTiming ? s.timestamp : performance.now();
    n = !1, it.useManualTiming || (s.delta = i ? 1e3 / 60 : Math.max(Math.min(x - s.timestamp, ar), 1)), s.timestamp = x, s.isProcessing = !0, a.process(s), l.process(s), u.process(s), c.process(s), h.process(s), d.process(s), p.process(s), m.process(s), s.isProcessing = !1, n && e && (i = !1, t(v));
  }, b = () => {
    n = !0, i = !0, s.isProcessing || t(v);
  };
  return { schedule: Qt.reduce((x, A) => {
    const w = o[A];
    return x[A] = (V, D = !1, C = !1) => (n || b(), w.schedule(V, D, C)), x;
  }, {}), cancel: (x) => {
    for (let A = 0; A < Qt.length; A++)
      o[Qt[A]].cancel(x);
  }, state: s, steps: o };
}
const { schedule: R, cancel: rt, state: W, steps: ye } = /* @__PURE__ */ bs(typeof requestAnimationFrame < "u" ? requestAnimationFrame : X, !0);
let ie;
function lr() {
  ie = void 0;
}
const $ = {
  now: () => (ie === void 0 && $.set(W.isProcessing || it.useManualTiming ? W.timestamp : performance.now()), ie),
  set: (t) => {
    ie = t, queueMicrotask(lr);
  }
}, Ss = (t) => (e) => typeof e == "string" && e.startsWith(t), dn = /* @__PURE__ */ Ss("--"), cr = /* @__PURE__ */ Ss("var(--"), fn = (t) => cr(t) ? ur.test(t.split("/*")[0].trim()) : !1, ur = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, Dt = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, Nt = {
  ...Dt,
  transform: (t) => nt(0, 1, t)
}, te = {
  ...Dt,
  default: 1
}, Bt = (t) => Math.round(t * 1e5) / 1e5, pn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function hr(t) {
  return t == null;
}
const dr = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, mn = (t, e) => (n) => !!(typeof n == "string" && dr.test(n) && n.startsWith(t) || e && !hr(n) && Object.prototype.hasOwnProperty.call(n, e)), Ts = (t, e, n) => (i) => {
  if (typeof i != "string")
    return i;
  const [s, r, o, a] = i.match(pn);
  return {
    [t]: parseFloat(s),
    [e]: parseFloat(r),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, fr = (t) => nt(0, 255, t), ve = {
  ...Dt,
  transform: (t) => Math.round(fr(t))
}, dt = {
  test: /* @__PURE__ */ mn("rgb", "red"),
  parse: /* @__PURE__ */ Ts("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: i = 1 }) => "rgba(" + ve.transform(t) + ", " + ve.transform(e) + ", " + ve.transform(n) + ", " + Bt(Nt.transform(i)) + ")"
};
function pr(t) {
  let e = "", n = "", i = "", s = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), i = t.substring(5, 7), s = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), i = t.substring(3, 4), s = t.substring(4, 5), e += e, n += n, i += i, s += s), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(i, 16),
    alpha: s ? parseInt(s, 16) / 255 : 1
  };
}
const Ee = {
  test: /* @__PURE__ */ mn("#"),
  parse: pr,
  transform: dt.transform
}, Xt = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), ot = /* @__PURE__ */ Xt("deg"), Q = /* @__PURE__ */ Xt("%"), P = /* @__PURE__ */ Xt("px"), mr = /* @__PURE__ */ Xt("vh"), gr = /* @__PURE__ */ Xt("vw"), _n = {
  ...Q,
  parse: (t) => Q.parse(t) / 100,
  transform: (t) => Q.transform(t * 100)
}, vt = {
  test: /* @__PURE__ */ mn("hsl", "hue"),
  parse: /* @__PURE__ */ Ts("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + Q.transform(Bt(e)) + ", " + Q.transform(Bt(n)) + ", " + Bt(Nt.transform(i)) + ")"
}, B = {
  test: (t) => dt.test(t) || Ee.test(t) || vt.test(t),
  parse: (t) => dt.test(t) ? dt.parse(t) : vt.test(t) ? vt.parse(t) : Ee.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? dt.transform(t) : vt.transform(t),
  getAnimatableNone: (t) => {
    const e = B.parse(t);
    return e.alpha = 0, B.transform(e);
  }
}, yr = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function vr(t) {
  return isNaN(t) && typeof t == "string" && (t.match(pn)?.length || 0) + (t.match(yr)?.length || 0) > 0;
}
const ws = "number", Ps = "color", xr = "var", br = "var(", Un = "${}", Sr = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function _t(t) {
  const e = t.toString(), n = [], i = {
    color: [],
    number: [],
    var: []
  }, s = [];
  let r = 0;
  const a = e.replace(Sr, (l) => (B.test(l) ? (i.color.push(r), s.push(Ps), n.push(B.parse(l))) : l.startsWith(br) ? (i.var.push(r), s.push(xr), n.push(l)) : (i.number.push(r), s.push(ws), n.push(parseFloat(l))), ++r, Un)).split(Un);
  return { values: n, split: a, indexes: i, types: s };
}
function Cs(t) {
  return _t(t).values;
}
function As(t) {
  const { split: e, types: n } = _t(t), i = e.length;
  return (s) => {
    let r = "";
    for (let o = 0; o < i; o++)
      if (r += e[o], s[o] !== void 0) {
        const a = n[o];
        a === ws ? r += Bt(s[o]) : a === Ps ? r += B.transform(s[o]) : r += s[o];
      }
    return r;
  };
}
const Tr = (t) => typeof t == "number" ? 0 : B.test(t) ? B.getAnimatableNone(t) : t;
function wr(t) {
  const e = Cs(t);
  return As(t)(e.map(Tr));
}
const at = {
  test: vr,
  parse: Cs,
  createTransformer: As,
  getAnimatableNone: wr
};
function xe(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Pr({ hue: t, saturation: e, lightness: n, alpha: i }) {
  t /= 360, e /= 100, n /= 100;
  let s = 0, r = 0, o = 0;
  if (!e)
    s = r = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    s = xe(l, a, t + 1 / 3), r = xe(l, a, t), o = xe(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(s * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: i
  };
}
function ae(t, e) {
  return (n) => n > 0 ? e : t;
}
const E = (t, e, n) => t + (e - t) * n, be = (t, e, n) => {
  const i = t * t, s = n * (e * e - i) + i;
  return s < 0 ? 0 : Math.sqrt(s);
}, Cr = [Ee, dt, vt], Ar = (t) => Cr.find((e) => e.test(t));
function $n(t) {
  const e = Ar(t);
  if (!e)
    return !1;
  let n = e.parse(t);
  return e === vt && (n = Pr(n)), n;
}
const Hn = (t, e) => {
  const n = $n(t), i = $n(e);
  if (!n || !i)
    return ae(t, e);
  const s = { ...n };
  return (r) => (s.red = be(n.red, i.red, r), s.green = be(n.green, i.green, r), s.blue = be(n.blue, i.blue, r), s.alpha = E(n.alpha, i.alpha, r), dt.transform(s));
}, Fe = /* @__PURE__ */ new Set(["none", "hidden"]);
function Vr(t, e) {
  return Fe.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function Dr(t, e) {
  return (n) => E(t, e, n);
}
function gn(t) {
  return typeof t == "number" ? Dr : typeof t == "string" ? fn(t) ? ae : B.test(t) ? Hn : Rr : Array.isArray(t) ? Vs : typeof t == "object" ? B.test(t) ? Hn : Mr : ae;
}
function Vs(t, e) {
  const n = [...t], i = n.length, s = t.map((r, o) => gn(r)(r, e[o]));
  return (r) => {
    for (let o = 0; o < i; o++)
      n[o] = s[o](r);
    return n;
  };
}
function Mr(t, e) {
  const n = { ...t, ...e }, i = {};
  for (const s in n)
    t[s] !== void 0 && e[s] !== void 0 && (i[s] = gn(t[s])(t[s], e[s]));
  return (s) => {
    for (const r in i)
      n[r] = i[r](s);
    return n;
  };
}
function Lr(t, e) {
  const n = [], i = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < e.values.length; s++) {
    const r = e.types[s], o = t.indexes[r][i[r]], a = t.values[o] ?? 0;
    n[s] = a, i[r]++;
  }
  return n;
}
const Rr = (t, e) => {
  const n = at.createTransformer(e), i = _t(t), s = _t(e);
  return i.indexes.var.length === s.indexes.var.length && i.indexes.color.length === s.indexes.color.length && i.indexes.number.length >= s.indexes.number.length ? Fe.has(t) && !s.values.length || Fe.has(e) && !i.values.length ? Vr(t, e) : Kt(Vs(Lr(i, s), s.values), n) : ae(t, e);
};
function Ds(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? E(t, e, n) : gn(t)(t, e);
}
const Er = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: (n = !0) => R.update(e, n),
    stop: () => rt(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => W.isProcessing ? W.timestamp : $.now()
  };
}, Ms = (t, e, n = 10) => {
  let i = "";
  const s = Math.max(Math.round(e / n), 2);
  for (let r = 0; r < s; r++)
    i += Math.round(t(r / (s - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, le = 2e4;
function yn(t) {
  let e = 0;
  const n = 50;
  let i = t.next(e);
  for (; !i.done && e < le; )
    e += n, i = t.next(e);
  return e >= le ? 1 / 0 : e;
}
function Fr(t, e = 100, n) {
  const i = n({ ...t, keyframes: [0, e] }), s = Math.min(yn(i), le);
  return {
    type: "keyframes",
    ease: (r) => i.next(s * r).value / e,
    duration: /* @__PURE__ */ Y(s)
  };
}
const kr = 5;
function Ls(t, e, n) {
  const i = Math.max(e - kr, 0);
  return cs(n - t(i), e - i);
}
const F = {
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
}, Se = 1e-3;
function Br({ duration: t = F.duration, bounce: e = F.bounce, velocity: n = F.velocity, mass: i = F.mass }) {
  let s, r, o = 1 - e;
  o = nt(F.minDamping, F.maxDamping, o), t = nt(F.minDuration, F.maxDuration, /* @__PURE__ */ Y(t)), o < 1 ? (s = (u) => {
    const c = u * o, h = c * t, d = c - n, p = ke(u, o), m = Math.exp(-h);
    return Se - d / p * m;
  }, r = (u) => {
    const h = u * o * t, d = h * n + n, p = Math.pow(o, 2) * Math.pow(u, 2) * t, m = Math.exp(-h), v = ke(Math.pow(u, 2), o);
    return (-s(u) + Se > 0 ? -1 : 1) * ((d - p) * m) / v;
  }) : (s = (u) => {
    const c = Math.exp(-u * t), h = (u - n) * t + 1;
    return -Se + c * h;
  }, r = (u) => {
    const c = Math.exp(-u * t), h = (n - u) * (t * t);
    return c * h;
  });
  const a = 5 / t, l = Or(s, r, a);
  if (t = /* @__PURE__ */ J(t), isNaN(l))
    return {
      stiffness: F.stiffness,
      damping: F.damping,
      duration: t
    };
  {
    const u = Math.pow(l, 2) * i;
    return {
      stiffness: u,
      damping: o * 2 * Math.sqrt(i * u),
      duration: t
    };
  }
}
const Ir = 12;
function Or(t, e, n) {
  let i = n;
  for (let s = 1; s < Ir; s++)
    i = i - t(i) / e(i);
  return i;
}
function ke(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const Wr = ["duration", "bounce"], jr = ["stiffness", "damping", "mass"];
function Gn(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function zr(t) {
  let e = {
    velocity: F.velocity,
    stiffness: F.stiffness,
    damping: F.damping,
    mass: F.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Gn(t, jr) && Gn(t, Wr))
    if (t.visualDuration) {
      const n = t.visualDuration, i = 2 * Math.PI / (n * 1.2), s = i * i, r = 2 * nt(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(s);
      e = {
        ...e,
        mass: F.mass,
        stiffness: s,
        damping: r
      };
    } else {
      const n = Br(t);
      e = {
        ...e,
        ...n,
        mass: F.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function ce(t = F.visualDuration, e = F.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: i, restDelta: s } = n;
  const r = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: u, mass: c, duration: h, velocity: d, isResolvedFromDuration: p } = zr({
    ...n,
    velocity: -/* @__PURE__ */ Y(n.velocity || 0)
  }), m = d || 0, v = u / (2 * Math.sqrt(l * c)), b = o - r, y = /* @__PURE__ */ Y(Math.sqrt(l / c)), S = Math.abs(b) < 5;
  i || (i = S ? F.restSpeed.granular : F.restSpeed.default), s || (s = S ? F.restDelta.granular : F.restDelta.default);
  let x;
  if (v < 1) {
    const w = ke(y, v);
    x = (V) => {
      const D = Math.exp(-v * y * V);
      return o - D * ((m + v * y * b) / w * Math.sin(w * V) + b * Math.cos(w * V));
    };
  } else if (v === 1)
    x = (w) => o - Math.exp(-y * w) * (b + (m + y * b) * w);
  else {
    const w = y * Math.sqrt(v * v - 1);
    x = (V) => {
      const D = Math.exp(-v * y * V), C = Math.min(w * V, 300);
      return o - D * ((m + v * y * b) * Math.sinh(C) + w * b * Math.cosh(C)) / w;
    };
  }
  const A = {
    calculatedDuration: p && h || null,
    next: (w) => {
      const V = x(w);
      if (p)
        a.done = w >= h;
      else {
        let D = w === 0 ? m : 0;
        v < 1 && (D = w === 0 ? /* @__PURE__ */ J(m) : Ls(x, w, V));
        const C = Math.abs(D) <= i, I = Math.abs(o - V) <= s;
        a.done = C && I;
      }
      return a.value = a.done ? o : V, a;
    },
    toString: () => {
      const w = Math.min(yn(A), le), V = Ms((D) => A.next(w * D).value, w, 30);
      return w + "ms " + V;
    },
    toTransition: () => {
    }
  };
  return A;
}
ce.applyToOptions = (t) => {
  const e = Fr(t, 100, ce);
  return t.ease = e.ease, t.duration = /* @__PURE__ */ J(e.duration), t.type = "keyframes", t;
};
function Be({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: i = 325, bounceDamping: s = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const h = t[0], d = {
    done: !1,
    value: h
  }, p = (C) => a !== void 0 && C < a || l !== void 0 && C > l, m = (C) => a === void 0 ? l : l === void 0 || Math.abs(a - C) < Math.abs(l - C) ? a : l;
  let v = n * e;
  const b = h + v, y = o === void 0 ? b : o(b);
  y !== b && (v = y - h);
  const S = (C) => -v * Math.exp(-C / i), x = (C) => y + S(C), A = (C) => {
    const I = S(C), _ = x(C);
    d.done = Math.abs(I) <= u, d.value = d.done ? y : _;
  };
  let w, V;
  const D = (C) => {
    p(d.value) && (w = C, V = ce({
      keyframes: [d.value, m(d.value)],
      velocity: Ls(x, C, d.value),
      // TODO: This should be passing * 1000
      damping: s,
      stiffness: r,
      restDelta: u,
      restSpeed: c
    }));
  };
  return D(0), {
    calculatedDuration: null,
    next: (C) => {
      let I = !1;
      return !V && w === void 0 && (I = !0, A(C), D(C)), w !== void 0 && C >= w ? V.next(C - w) : (!I && A(C), d);
    }
  };
}
function Nr(t, e, n) {
  const i = [], s = n || it.mix || Ds, r = t.length - 1;
  for (let o = 0; o < r; o++) {
    let a = s(t[o], t[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || X : e;
      a = Kt(l, a);
    }
    i.push(a);
  }
  return i;
}
function _r(t, e, { clamp: n = !0, ease: i, mixer: s } = {}) {
  const r = t.length;
  if (an(r === e.length), r === 1)
    return () => e[0];
  if (r === 2 && e[0] === e[1])
    return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[r - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = Nr(e, i, s), l = a.length, u = (c) => {
    if (o && c < t[0])
      return e[0];
    let h = 0;
    if (l > 1)
      for (; h < t.length - 2 && !(c < t[h + 1]); h++)
        ;
    const d = /* @__PURE__ */ zt(t[h], t[h + 1], c);
    return a[h](d);
  };
  return n ? (c) => u(nt(t[0], t[r - 1], c)) : u;
}
function Ur(t, e) {
  const n = t[t.length - 1];
  for (let i = 1; i <= e; i++) {
    const s = /* @__PURE__ */ zt(0, e, i);
    t.push(E(n, 1, s));
  }
}
function $r(t) {
  const e = [0];
  return Ur(e, t.length - 1), e;
}
function Hr(t, e) {
  return t.map((n) => n * e);
}
function Gr(t, e) {
  return t.map(() => e || vs).splice(0, t.length - 1);
}
function It({ duration: t = 300, keyframes: e, times: n, ease: i = "easeInOut" }) {
  const s = ir(i) ? i.map(Nn) : Nn(i), r = {
    done: !1,
    value: e[0]
  }, o = Hr(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : $r(e),
    t
  ), a = _r(o, e, {
    ease: Array.isArray(s) ? s : Gr(e, s)
  });
  return {
    calculatedDuration: t,
    next: (l) => (r.value = a(l), r.done = l >= t, r)
  };
}
const Kr = (t) => t !== null;
function vn(t, { repeat: e, repeatType: n = "loop" }, i, s = 1) {
  const r = t.filter(Kr), a = s < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : r.length - 1;
  return !a || i === void 0 ? r[a] : i;
}
const Yr = {
  decay: Be,
  inertia: Be,
  tween: It,
  keyframes: It,
  spring: ce
};
function Rs(t) {
  typeof t.type == "string" && (t.type = Yr[t.type]);
}
class xn {
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
const Xr = (t) => t / 100;
class bn extends xn {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== $.now() && this.tick($.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    Rs(e);
    const { type: n = It, repeat: i = 0, repeatDelay: s = 0, repeatType: r, velocity: o = 0 } = e;
    let { keyframes: a } = e;
    const l = n || It;
    l !== It && typeof a[0] != "number" && (this.mixKeyframes = Kt(Xr, Ds(a[0], a[1])), a = [0, 100]);
    const u = l({ ...e, keyframes: a });
    r === "mirror" && (this.mirroredGenerator = l({
      ...e,
      keyframes: [...a].reverse(),
      velocity: -o
    })), u.calculatedDuration === null && (u.calculatedDuration = yn(u));
    const { calculatedDuration: c } = u;
    this.calculatedDuration = c, this.resolvedDuration = c + s, this.totalDuration = this.resolvedDuration * (i + 1) - s, this.generator = u;
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(e, n = !1) {
    const { generator: i, totalDuration: s, mixKeyframes: r, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: u = 0, keyframes: c, repeat: h, repeatType: d, repeatDelay: p, type: m, onUpdate: v, finalKeyframe: b } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - s / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
    const y = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), S = this.playbackSpeed >= 0 ? y < 0 : y > s;
    this.currentTime = Math.max(y, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = s);
    let x = this.currentTime, A = i;
    if (h) {
      const C = Math.min(this.currentTime, s) / a;
      let I = Math.floor(C), _ = C % 1;
      !_ && C >= 1 && (_ = 1), _ === 1 && I--, I = Math.min(I, h + 1), !!(I % 2) && (d === "reverse" ? (_ = 1 - _, p && (_ -= p / a)) : d === "mirror" && (A = o)), x = nt(0, 1, _) * a;
    }
    const w = S ? { done: !1, value: c[0] } : A.next(x);
    r && (w.value = r(w.value));
    let { done: V } = w;
    !S && l !== null && (V = this.playbackSpeed >= 0 ? this.currentTime >= s : this.currentTime <= 0);
    const D = this.holdTime === null && (this.state === "finished" || this.state === "running" && V);
    return D && m !== Be && (w.value = vn(c, this.options, b, this.speed)), v && v(w.value), D && this.finish(), w;
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
    return /* @__PURE__ */ Y(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Y(e);
  }
  get time() {
    return /* @__PURE__ */ Y(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ J(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    this.updateTime($.now());
    const n = this.playbackSpeed !== e;
    this.playbackSpeed = e, n && (this.time = /* @__PURE__ */ Y(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = Er, startTime: n } = this.options;
    this.driver || (this.driver = e((s) => this.tick(s))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = n ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime($.now()), this.holdTime = this.currentTime;
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
function qr(t) {
  for (let e = 1; e < t.length; e++)
    t[e] ?? (t[e] = t[e - 1]);
}
const ft = (t) => t * 180 / Math.PI, Ie = (t) => {
  const e = ft(Math.atan2(t[1], t[0]));
  return Oe(e);
}, Zr = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: Ie,
  rotateZ: Ie,
  skewX: (t) => ft(Math.atan(t[1])),
  skewY: (t) => ft(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, Oe = (t) => (t = t % 360, t < 0 && (t += 360), t), Kn = Ie, Yn = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), Xn = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), Jr = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Yn,
  scaleY: Xn,
  scale: (t) => (Yn(t) + Xn(t)) / 2,
  rotateX: (t) => Oe(ft(Math.atan2(t[6], t[5]))),
  rotateY: (t) => Oe(ft(Math.atan2(-t[2], t[0]))),
  rotateZ: Kn,
  rotate: Kn,
  skewX: (t) => ft(Math.atan(t[4])),
  skewY: (t) => ft(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function We(t) {
  return t.includes("scale") ? 1 : 0;
}
function je(t, e) {
  if (!t || t === "none")
    return We(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, s;
  if (n)
    i = Jr, s = n;
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = Zr, s = a;
  }
  if (!s)
    return We(e);
  const r = i[e], o = s[1].split(",").map(ta);
  return typeof r == "function" ? r(o) : o[r];
}
const Qr = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return je(n, e);
};
function ta(t) {
  return parseFloat(t.trim());
}
const Mt = [
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
], Lt = new Set(Mt), qn = (t) => t === Dt || t === P, ea = /* @__PURE__ */ new Set(["x", "y", "z"]), na = Mt.filter((t) => !ea.has(t));
function ia(t) {
  const e = [];
  return na.forEach((n) => {
    const i = t.getValue(n);
    i !== void 0 && (e.push([n, i.get()]), i.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const pt = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: (t, { transform: e }) => je(e, "x"),
  y: (t, { transform: e }) => je(e, "y")
};
pt.translateX = pt.x;
pt.translateY = pt.y;
const mt = /* @__PURE__ */ new Set();
let ze = !1, Ne = !1, _e = !1;
function Es() {
  if (Ne) {
    const t = Array.from(mt).filter((i) => i.needsMeasurement), e = new Set(t.map((i) => i.element)), n = /* @__PURE__ */ new Map();
    e.forEach((i) => {
      const s = ia(i);
      s.length && (n.set(i, s), i.render());
    }), t.forEach((i) => i.measureInitialState()), e.forEach((i) => {
      i.render();
      const s = n.get(i);
      s && s.forEach(([r, o]) => {
        i.getValue(r)?.set(o);
      });
    }), t.forEach((i) => i.measureEndState()), t.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  Ne = !1, ze = !1, mt.forEach((t) => t.complete(_e)), mt.clear();
}
function Fs() {
  mt.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Ne = !0);
  });
}
function sa() {
  _e = !0, Fs(), Es(), _e = !1;
}
class Sn {
  constructor(e, n, i, s, r, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = i, this.motionValue = s, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (mt.add(this), ze || (ze = !0, R.read(Fs), R.resolveKeyframes(Es))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: i, motionValue: s } = this;
    if (e[0] === null) {
      const r = s?.get(), o = e[e.length - 1];
      if (r !== void 0)
        e[0] = r;
      else if (i && n) {
        const a = i.readValue(n, o);
        a != null && (e[0] = a);
      }
      e[0] === void 0 && (e[0] = o), s && r === void 0 && s.set(e[0]);
    }
    qr(e);
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
const oa = (t) => t.startsWith("--");
function ra(t, e, n) {
  oa(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
const aa = /* @__PURE__ */ ln(() => window.ScrollTimeline !== void 0), la = {};
function ca(t, e) {
  const n = /* @__PURE__ */ ln(t);
  return () => la[e] ?? n();
}
const ks = /* @__PURE__ */ ca(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), kt = ([t, e, n, i]) => `cubic-bezier(${t}, ${e}, ${n}, ${i})`, Zn = {
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
function Bs(t, e) {
  if (t)
    return typeof t == "function" ? ks() ? Ms(t, e) : "ease-out" : xs(t) ? kt(t) : Array.isArray(t) ? t.map((n) => Bs(n, e) || Zn.easeOut) : Zn[t];
}
function ua(t, e, n, { delay: i = 0, duration: s = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const c = {
    [e]: n
  };
  l && (c.offset = l);
  const h = Bs(a, s);
  Array.isArray(h) && (c.easing = h);
  const d = {
    delay: i,
    duration: s,
    easing: Array.isArray(h) ? "linear" : h,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  };
  return u && (d.pseudoElement = u), t.animate(c, d);
}
function Is(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function ha({ type: t, ...e }) {
  return Is(t) && ks() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class da extends xn {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !e)
      return;
    const { element: n, name: i, keyframes: s, pseudoElement: r, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = e;
    this.isPseudoElement = !!r, this.allowFlatten = o, this.options = e, an(typeof e.type != "string");
    const u = ha(e);
    this.animation = ua(n, i, s, u, r), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const c = vn(s, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(c) : ra(n, i, c), this.animation.cancel();
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
    return /* @__PURE__ */ Y(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Y(e);
  }
  get time() {
    return /* @__PURE__ */ Y(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ J(e);
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && aa() ? (this.animation.timeline = e, X) : n(this);
  }
}
const Os = {
  anticipate: ms,
  backInOut: ps,
  circInOut: ys
};
function fa(t) {
  return t in Os;
}
function pa(t) {
  typeof t.ease == "string" && fa(t.ease) && (t.ease = Os[t.ease]);
}
const Jn = 10;
class ma extends da {
  constructor(e) {
    pa(e), Rs(e), super(e), e.startTime && (this.startTime = e.startTime), this.options = e;
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
    const { motionValue: n, onUpdate: i, onComplete: s, element: r, ...o } = this.options;
    if (!n)
      return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const a = new bn({
      ...o,
      autoplay: !1
    }), l = /* @__PURE__ */ J(this.finishedTime ?? this.time);
    n.setWithVelocity(a.sample(l - Jn).value, a.sample(l).value, Jn), a.stop();
  }
}
const Qn = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(at.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function ga(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function ya(t, e, n, i) {
  const s = t[0];
  if (s === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const r = t[t.length - 1], o = Qn(s, e), a = Qn(r, e);
  return !o || !a ? !1 : ga(t) || (n === "spring" || Is(n)) && i;
}
function Ue(t) {
  t.duration = 0, t.type = "keyframes";
}
const va = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), xa = /* @__PURE__ */ ln(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function ba(t) {
  const { motionValue: e, name: n, repeatDelay: i, repeatType: s, damping: r, type: o } = t;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: u } = e.owner.getProps();
  return xa() && n && va.has(n) && (n !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !i && s !== "mirror" && r !== 0 && o !== "inertia";
}
const Sa = 40;
class Ta extends xn {
  constructor({ autoplay: e = !0, delay: n = 0, type: i = "keyframes", repeat: s = 0, repeatDelay: r = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: u, element: c, ...h }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = $.now();
    const d = {
      autoplay: e,
      delay: n,
      type: i,
      repeat: s,
      repeatDelay: r,
      repeatType: o,
      name: l,
      motionValue: u,
      element: c,
      ...h
    }, p = c?.KeyframeResolver || Sn;
    this.keyframeResolver = new p(a, (m, v, b) => this.onKeyframesResolved(m, v, d, !b), l, u, c), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, n, i, s) {
    this.keyframeResolver = void 0;
    const { name: r, type: o, velocity: a, delay: l, isHandoff: u, onUpdate: c } = i;
    this.resolvedAt = $.now(), ya(e, r, o, a) || ((it.instantAnimations || !l) && c?.(vn(e, i, n)), e[0] = e[e.length - 1], Ue(i), i.repeat = 0);
    const d = {
      startTime: s ? this.resolvedAt ? this.resolvedAt - this.createdAt > Sa ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...i,
      keyframes: e
    }, p = !u && ba(d) ? new ma({
      ...d,
      element: d.motionValue.owner.current
    }) : new bn(d);
    p.finished.then(() => this.notifyFinished()).catch(X), this.pendingTimeline && (this.stopTimeline = p.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = p;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), sa()), this._animation;
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
const wa = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Pa(t) {
  const e = wa.exec(t);
  if (!e)
    return [,];
  const [, n, i, s] = e;
  return [`--${n ?? i}`, s];
}
function Ws(t, e, n = 1) {
  const [i, s] = Pa(t);
  if (!i)
    return;
  const r = window.getComputedStyle(e).getPropertyValue(i);
  if (r) {
    const o = r.trim();
    return rs(o) ? parseFloat(o) : o;
  }
  return fn(s) ? Ws(s, e, n + 1) : s;
}
function Tn(t, e) {
  return t?.[e] ?? t?.default ?? t;
}
const js = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Mt
]), Ca = {
  test: (t) => t === "auto",
  parse: (t) => t
}, zs = (t) => (e) => e.test(t), Ns = [Dt, P, Q, ot, gr, mr, Ca], ti = (t) => Ns.find(zs(t));
function Aa(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || ls(t) : !0;
}
const Va = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Da(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [i] = n.match(pn) || [];
  if (!i)
    return t;
  const s = n.replace(i, "");
  let r = Va.has(e) ? 1 : 0;
  return i !== n && (r *= 100), e + "(" + r + s + ")";
}
const Ma = /\b([a-z-]*)\(.*?\)/gu, $e = {
  ...at,
  getAnimatableNone: (t) => {
    const e = t.match(Ma);
    return e ? e.map(Da).join(" ") : t;
  }
}, ei = {
  ...Dt,
  transform: Math.round
}, La = {
  rotate: ot,
  rotateX: ot,
  rotateY: ot,
  rotateZ: ot,
  scale: te,
  scaleX: te,
  scaleY: te,
  scaleZ: te,
  skew: ot,
  skewX: ot,
  skewY: ot,
  distance: P,
  translateX: P,
  translateY: P,
  translateZ: P,
  x: P,
  y: P,
  z: P,
  perspective: P,
  transformPerspective: P,
  opacity: Nt,
  originX: _n,
  originY: _n,
  originZ: P
}, wn = {
  // Border props
  borderWidth: P,
  borderTopWidth: P,
  borderRightWidth: P,
  borderBottomWidth: P,
  borderLeftWidth: P,
  borderRadius: P,
  radius: P,
  borderTopLeftRadius: P,
  borderTopRightRadius: P,
  borderBottomRightRadius: P,
  borderBottomLeftRadius: P,
  // Positioning props
  width: P,
  maxWidth: P,
  height: P,
  maxHeight: P,
  top: P,
  right: P,
  bottom: P,
  left: P,
  // Spacing props
  padding: P,
  paddingTop: P,
  paddingRight: P,
  paddingBottom: P,
  paddingLeft: P,
  margin: P,
  marginTop: P,
  marginRight: P,
  marginBottom: P,
  marginLeft: P,
  // Misc
  backgroundPositionX: P,
  backgroundPositionY: P,
  ...La,
  zIndex: ei,
  // SVG
  fillOpacity: Nt,
  strokeOpacity: Nt,
  numOctaves: ei
}, Ra = {
  ...wn,
  // Color props
  color: B,
  backgroundColor: B,
  outlineColor: B,
  fill: B,
  stroke: B,
  // Border props
  borderColor: B,
  borderTopColor: B,
  borderRightColor: B,
  borderBottomColor: B,
  borderLeftColor: B,
  filter: $e,
  WebkitFilter: $e
}, _s = (t) => Ra[t];
function Us(t, e) {
  let n = _s(t);
  return n !== $e && (n = at), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const Ea = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Fa(t, e, n) {
  let i = 0, s;
  for (; i < t.length && !s; ) {
    const r = t[i];
    typeof r == "string" && !Ea.has(r) && _t(r).values.length && (s = t[i]), i++;
  }
  if (s && n)
    for (const r of e)
      t[r] = Us(n, s);
}
class ka extends Sn {
  constructor(e, n, i, s, r) {
    super(e, n, i, s, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: i } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < e.length; l++) {
      let u = e[l];
      if (typeof u == "string" && (u = u.trim(), fn(u))) {
        const c = Ws(u, n.current);
        c !== void 0 && (e[l] = c), l === e.length - 1 && (this.finalKeyframe = u);
      }
    }
    if (this.resolveNoneKeyframes(), !js.has(i) || e.length !== 2)
      return;
    const [s, r] = e, o = ti(s), a = ti(r);
    if (o !== a)
      if (qn(o) && qn(a))
        for (let l = 0; l < e.length; l++) {
          const u = e[l];
          typeof u == "string" && (e[l] = parseFloat(u));
        }
      else pt[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, i = [];
    for (let s = 0; s < e.length; s++)
      (e[s] === null || Aa(e[s])) && i.push(s);
    i.length && Fa(e, i, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: i } = this;
    if (!e || !e.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = pt[i](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const s = n[n.length - 1];
    s !== void 0 && e.getValue(i, s).jump(s, !1);
  }
  measureEndState() {
    const { element: e, name: n, unresolvedKeyframes: i } = this;
    if (!e || !e.current)
      return;
    const s = e.getValue(n);
    s && s.jump(this.measuredOrigin, !1);
    const r = i.length - 1, o = i[r];
    i[r] = pt[n](e.measureViewportBox(), window.getComputedStyle(e.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), this.removedTransforms?.length && this.removedTransforms.forEach(([a, l]) => {
      e.getValue(a).set(l);
    }), this.resolveNoneKeyframes();
  }
}
function $s(t, e, n) {
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    const s = document.querySelectorAll(t);
    return s ? Array.from(s) : [];
  }
  return Array.from(t);
}
const Hs = (t, e) => e && typeof t == "number" ? e.transform(t) : t;
function Gs(t) {
  return as(t) && "offsetHeight" in t;
}
const ni = 30, Ba = (t) => !isNaN(parseFloat(t));
class Ia {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const s = $.now();
      if (this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const r of this.dependents)
          r.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = $.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Ba(this.current));
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
    this.events[e] || (this.events[e] = new cn());
    const i = this.events[e].add(n);
    return e === "change" ? () => {
      i(), R.read(() => {
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
    const e = $.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > ni)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, ni);
    return cs(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
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
function Pt(t, e) {
  return new Ia(t, e);
}
const { schedule: Pn } = /* @__PURE__ */ bs(queueMicrotask, !1), Z = {
  x: !1,
  y: !1
};
function Ks() {
  return Z.x || Z.y;
}
function Oa(t) {
  return t === "x" || t === "y" ? Z[t] ? null : (Z[t] = !0, () => {
    Z[t] = !1;
  }) : Z.x || Z.y ? null : (Z.x = Z.y = !0, () => {
    Z.x = Z.y = !1;
  });
}
function Ys(t, e) {
  const n = $s(t), i = new AbortController(), s = {
    passive: !0,
    ...e,
    signal: i.signal
  };
  return [n, s, () => i.abort()];
}
function ii(t) {
  return !(t.pointerType === "touch" || Ks());
}
function Wa(t, e, n = {}) {
  const [i, s, r] = Ys(t, n), o = (a) => {
    if (!ii(a))
      return;
    const { target: l } = a, u = e(l, a);
    if (typeof u != "function" || !l)
      return;
    const c = (h) => {
      ii(h) && (u(h), l.removeEventListener("pointerleave", c));
    };
    l.addEventListener("pointerleave", c, s);
  };
  return i.forEach((a) => {
    a.addEventListener("pointerenter", o, s);
  }), r;
}
const Xs = (t, e) => e ? t === e ? !0 : Xs(t, e.parentElement) : !1, Cn = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, ja = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function za(t) {
  return ja.has(t.tagName) || t.tabIndex !== -1;
}
const se = /* @__PURE__ */ new WeakSet();
function si(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function Te(t, e) {
  t.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const Na = (t, e) => {
  const n = t.currentTarget;
  if (!n)
    return;
  const i = si(() => {
    if (se.has(n))
      return;
    Te(n, "down");
    const s = si(() => {
      Te(n, "up");
    }), r = () => Te(n, "cancel");
    n.addEventListener("keyup", s, e), n.addEventListener("blur", r, e);
  });
  n.addEventListener("keydown", i, e), n.addEventListener("blur", () => n.removeEventListener("keydown", i), e);
};
function oi(t) {
  return Cn(t) && !Ks();
}
function _a(t, e, n = {}) {
  const [i, s, r] = Ys(t, n), o = (a) => {
    const l = a.currentTarget;
    if (!oi(a))
      return;
    se.add(l);
    const u = e(l, a), c = (p, m) => {
      window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", d), se.has(l) && se.delete(l), oi(p) && typeof u == "function" && u(p, { success: m });
    }, h = (p) => {
      c(p, l === window || l === document || n.useGlobalTarget || Xs(l, p.target));
    }, d = (p) => {
      c(p, !1);
    };
    window.addEventListener("pointerup", h, s), window.addEventListener("pointercancel", d, s);
  };
  return i.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", o, s), Gs(a) && (a.addEventListener("focus", (u) => Na(u, s)), !za(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), r;
}
function qs(t) {
  return as(t) && "ownerSVGElement" in t;
}
function Ua(t) {
  return qs(t) && t.tagName === "svg";
}
const z = (t) => !!(t && t.getVelocity), $a = [...Ns, B, at], Ha = (t) => $a.find(zs(t)), An = At({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function ri(t, e) {
  if (typeof t == "function")
    return t(e);
  t != null && (t.current = e);
}
function Ga(...t) {
  return (e) => {
    let n = !1;
    const i = t.map((s) => {
      const r = ri(s, e);
      return !n && typeof r == "function" && (n = !0), r;
    });
    if (n)
      return () => {
        for (let s = 0; s < i.length; s++) {
          const r = i[s];
          typeof r == "function" ? r() : ri(t[s], null);
        }
      };
  };
}
function Ka(...t) {
  return Qe(Ga(...t), t);
}
class Ya extends ns {
  getSnapshotBeforeUpdate(e) {
    const n = this.props.childRef.current;
    if (n && e.isPresent && !this.props.isPresent) {
      const i = n.offsetParent, s = Gs(i) && i.offsetWidth || 0, r = this.props.sizeRef.current;
      r.height = n.offsetHeight || 0, r.width = n.offsetWidth || 0, r.top = n.offsetTop, r.left = n.offsetLeft, r.right = s - r.width - r.left;
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
function Xa({ children: t, isPresent: e, anchorX: n, root: i }) {
  const s = tn(), r = et(null), o = et({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0
  }), { nonce: a } = j(An), l = Ka(r, t?.ref);
  return ss(() => {
    const { width: u, height: c, top: h, left: d, right: p } = o.current;
    if (e || !r.current || !u || !c)
      return;
    const m = n === "left" ? `left: ${d}` : `right: ${p}`;
    r.current.dataset.motionPopId = s;
    const v = document.createElement("style");
    a && (v.nonce = a);
    const b = i ?? document.head;
    return b.appendChild(v), v.sheet && v.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${c}px !important;
            ${m}px !important;
            top: ${h}px !important;
          }
        `), () => {
      b.contains(v) && b.removeChild(v);
    };
  }, [e]), f(Ya, { isPresent: e, childRef: r, sizeRef: o, children: Go(t, { ref: l }) });
}
const qa = ({ children: t, initial: e, isPresent: n, onExitComplete: i, custom: s, presenceAffectsLayout: r, mode: o, anchorX: a, root: l }) => {
  const u = nn(Za), c = tn();
  let h = !0, d = gt(() => (h = !1, {
    id: c,
    initial: e,
    isPresent: n,
    custom: s,
    onExitComplete: (p) => {
      u.set(p, !0);
      for (const m of u.values())
        if (!m)
          return;
      i && i();
    },
    register: (p) => (u.set(p, !1), () => u.delete(p))
  }), [n, u, i]);
  return r && h && (d = { ...d }), gt(() => {
    u.forEach((p, m) => u.set(m, !1));
  }, [n]), Vt(() => {
    !n && !u.size && i && i();
  }, [n]), o === "popLayout" && (t = f(Xa, { isPresent: n, anchorX: a, root: l, children: t })), f(de.Provider, { value: d, children: t });
};
function Za() {
  return /* @__PURE__ */ new Map();
}
function Zs(t = !0) {
  const e = j(de);
  if (e === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: i, register: s } = e, r = tn();
  Vt(() => {
    if (t)
      return s(r);
  }, [t]);
  const o = Qe(() => t && i && i(r), [r, i, t]);
  return !n && i ? [!1, o] : [!0];
}
const ee = (t) => t.key || "";
function ai(t) {
  const e = [];
  return $o.forEach(t, (n) => {
    Xo(n) && e.push(n);
  }), e;
}
const Vn = ({ children: t, custom: e, initial: n = !0, onExitComplete: i, presenceAffectsLayout: s = !0, mode: r = "sync", propagate: o = !1, anchorX: a = "left", root: l }) => {
  const [u, c] = Zs(o), h = gt(() => ai(t), [t]), d = o && !u ? [] : h.map(ee), p = et(!0), m = et(h), v = nn(() => /* @__PURE__ */ new Map()), [b, y] = tt(h), [S, x] = tt(h);
  os(() => {
    p.current = !1, m.current = h;
    for (let V = 0; V < S.length; V++) {
      const D = ee(S[V]);
      d.includes(D) ? v.delete(D) : v.get(D) !== !0 && v.set(D, !1);
    }
  }, [S, d.length, d.join("-")]);
  const A = [];
  if (h !== b) {
    let V = [...h];
    for (let D = 0; D < S.length; D++) {
      const C = S[D], I = ee(C);
      d.includes(I) || (V.splice(D, 0, C), A.push(C));
    }
    return r === "wait" && A.length && (V = A), x(ai(V)), y(h), null;
  }
  const { forceRender: w } = j(en);
  return f(Uo, { children: S.map((V) => {
    const D = ee(V), C = o && !u ? !1 : h === S || d.includes(D), I = () => {
      if (v.has(D))
        v.set(D, !0);
      else
        return;
      let _ = !0;
      v.forEach((st) => {
        st || (_ = !1);
      }), _ && (w?.(), x(m.current), o && c?.(), i && i());
    };
    return f(qa, { isPresent: C, initial: !p.current || n ? void 0 : !1, custom: e, presenceAffectsLayout: s, mode: r, root: l, onExitComplete: C ? void 0 : I, anchorX: a, children: V }, D);
  }) });
}, Js = At({ strict: !1 }), li = {
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
}, Ct = {};
for (const t in li)
  Ct[t] = {
    isEnabled: (e) => li[t].some((n) => !!e[n])
  };
function Ja(t) {
  for (const e in t)
    Ct[e] = {
      ...Ct[e],
      ...t[e]
    };
}
const Qa = /* @__PURE__ */ new Set([
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
function ue(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || Qa.has(t);
}
let Qs = (t) => !ue(t);
function tl(t) {
  typeof t == "function" && (Qs = (e) => e.startsWith("on") ? !ue(e) : t(e));
}
try {
  tl(require("@emotion/is-prop-valid").default);
} catch {
}
function el(t, e, n) {
  const i = {};
  for (const s in t)
    s === "values" && typeof t.values == "object" || (Qs(s) || n === !0 && ue(s) || !e && !ue(s) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && s.startsWith("onDrag")) && (i[s] = t[s]);
  return i;
}
const fe = /* @__PURE__ */ At({});
function pe(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Ut(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Dn = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Mn = ["initial", ...Dn];
function me(t) {
  return pe(t.animate) || Mn.some((e) => Ut(t[e]));
}
function to(t) {
  return !!(me(t) || t.variants);
}
function nl(t, e) {
  if (me(t)) {
    const { initial: n, animate: i } = t;
    return {
      initial: n === !1 || Ut(n) ? n : void 0,
      animate: Ut(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? e : {};
}
function il(t) {
  const { initial: e, animate: n } = nl(t, j(fe));
  return gt(() => ({ initial: e, animate: n }), [ci(e), ci(n)]);
}
function ci(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const $t = {};
function sl(t) {
  for (const e in t)
    $t[e] = t[e], dn(e) && ($t[e].isCSSVariable = !0);
}
function eo(t, { layout: e, layoutId: n }) {
  return Lt.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!$t[t] || t === "opacity");
}
const ol = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, rl = Mt.length;
function al(t, e, n) {
  let i = "", s = !0;
  for (let r = 0; r < rl; r++) {
    const o = Mt[r], a = t[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const u = Hs(a, wn[o]);
      if (!l) {
        s = !1;
        const c = ol[o] || o;
        i += `${c}(${u}) `;
      }
      n && (e[o] = u);
    }
  }
  return i = i.trim(), n ? i = n(e, s ? "" : i) : s && (i = "none"), i;
}
function Ln(t, e, n) {
  const { style: i, vars: s, transformOrigin: r } = t;
  let o = !1, a = !1;
  for (const l in e) {
    const u = e[l];
    if (Lt.has(l)) {
      o = !0;
      continue;
    } else if (dn(l)) {
      s[l] = u;
      continue;
    } else {
      const c = Hs(u, wn[l]);
      l.startsWith("origin") ? (a = !0, r[l] = c) : i[l] = c;
    }
  }
  if (e.transform || (o || n ? i.transform = al(e, t.transform, n) : i.transform && (i.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = r;
    i.transformOrigin = `${l} ${u} ${c}`;
  }
}
const Rn = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function no(t, e, n) {
  for (const i in e)
    !z(e[i]) && !eo(i, n) && (t[i] = e[i]);
}
function ll({ transformTemplate: t }, e) {
  return gt(() => {
    const n = Rn();
    return Ln(n, e, t), Object.assign({}, n.vars, n.style);
  }, [e]);
}
function cl(t, e) {
  const n = t.style || {}, i = {};
  return no(i, n, t), Object.assign(i, ll(t, e)), i;
}
function ul(t, e) {
  const n = {}, i = cl(t, e);
  return t.drag && t.dragListener !== !1 && (n.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0), n.style = i, n;
}
const hl = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, dl = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function fl(t, e, n = 1, i = 0, s = !0) {
  t.pathLength = 1;
  const r = s ? hl : dl;
  t[r.offset] = P.transform(-i);
  const o = P.transform(e), a = P.transform(n);
  t[r.array] = `${o} ${a}`;
}
function io(t, {
  attrX: e,
  attrY: n,
  attrScale: i,
  pathLength: s,
  pathSpacing: r = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, u, c) {
  if (Ln(t, a, u), l) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: h, style: d } = t;
  h.transform && (d.transform = h.transform, delete h.transform), (d.transform || h.transformOrigin) && (d.transformOrigin = h.transformOrigin ?? "50% 50%", delete h.transformOrigin), d.transform && (d.transformBox = c?.transformBox ?? "fill-box", delete h.transformBox), e !== void 0 && (h.x = e), n !== void 0 && (h.y = n), i !== void 0 && (h.scale = i), s !== void 0 && fl(h, s, r, o, !1);
}
const so = () => ({
  ...Rn(),
  attrs: {}
}), oo = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function pl(t, e, n, i) {
  const s = gt(() => {
    const r = so();
    return io(r, e, oo(i), t.transformTemplate, t.style), {
      ...r.attrs,
      style: { ...r.style }
    };
  }, [e]);
  if (t.style) {
    const r = {};
    no(r, t.style, t), s.style = { ...r, ...s.style };
  }
  return s;
}
const ml = [
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
function En(t) {
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
      !!(ml.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function gl(t, e, n, { latestValues: i }, s, r = !1) {
  const a = (En(t) ? pl : ul)(e, i, s, t), l = el(e, typeof t == "string", r), u = t !== is ? { ...l, ...a, ref: n } : {}, { children: c } = e, h = gt(() => z(c) ? c.get() : c, [c]);
  return Ko(t, {
    ...u,
    children: h
  });
}
function ui(t) {
  const e = [{}, {}];
  return t?.values.forEach((n, i) => {
    e[0][i] = n.get(), e[1][i] = n.getVelocity();
  }), e;
}
function Fn(t, e, n, i) {
  if (typeof e == "function") {
    const [s, r] = ui(i);
    e = e(n !== void 0 ? n : t.custom, s, r);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [s, r] = ui(i);
    e = e(n !== void 0 ? n : t.custom, s, r);
  }
  return e;
}
function oe(t) {
  return z(t) ? t.get() : t;
}
function yl({ scrapeMotionValuesFromProps: t, createRenderState: e }, n, i, s) {
  return {
    latestValues: vl(n, i, s, t),
    renderState: e()
  };
}
function vl(t, e, n, i) {
  const s = {}, r = i(t, {});
  for (const d in r)
    s[d] = oe(r[d]);
  let { initial: o, animate: a } = t;
  const l = me(t), u = to(t);
  e && u && !l && t.inherit !== !1 && (o === void 0 && (o = e.initial), a === void 0 && (a = e.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || o === !1;
  const h = c ? a : o;
  if (h && typeof h != "boolean" && !pe(h)) {
    const d = Array.isArray(h) ? h : [h];
    for (let p = 0; p < d.length; p++) {
      const m = Fn(t, d[p]);
      if (m) {
        const { transitionEnd: v, transition: b, ...y } = m;
        for (const S in y) {
          let x = y[S];
          if (Array.isArray(x)) {
            const A = c ? x.length - 1 : 0;
            x = x[A];
          }
          x !== null && (s[S] = x);
        }
        for (const S in v)
          s[S] = v[S];
      }
    }
  }
  return s;
}
const ro = (t) => (e, n) => {
  const i = j(fe), s = j(de), r = () => yl(t, e, i, s);
  return n ? r() : nn(r);
};
function kn(t, e, n) {
  const { style: i } = t, s = {};
  for (const r in i)
    (z(i[r]) || e.style && z(e.style[r]) || eo(r, t) || n?.getValue(r)?.liveStyle !== void 0) && (s[r] = i[r]);
  return s;
}
const xl = /* @__PURE__ */ ro({
  scrapeMotionValuesFromProps: kn,
  createRenderState: Rn
});
function ao(t, e, n) {
  const i = kn(t, e, n);
  for (const s in t)
    if (z(t[s]) || z(e[s])) {
      const r = Mt.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
      i[r] = t[s];
    }
  return i;
}
const bl = /* @__PURE__ */ ro({
  scrapeMotionValuesFromProps: ao,
  createRenderState: so
}), Sl = Symbol.for("motionComponentSymbol");
function xt(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function Tl(t, e, n) {
  return Qe(
    (i) => {
      i && t.onMount && t.onMount(i), e && (i ? e.mount(i) : e.unmount()), n && (typeof n == "function" ? n(i) : xt(n) && (n.current = i));
    },
    /**
     * Include externalRef in dependencies to ensure the callback updates
     * when the ref changes, allowing proper ref forwarding.
     */
    [e]
  );
}
const Bn = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), wl = "framerAppearId", lo = "data-" + Bn(wl), co = At({});
function Pl(t, e, n, i, s) {
  const { visualElement: r } = j(fe), o = j(Js), a = j(de), l = j(An).reducedMotion, u = et(null);
  i = i || o.renderer, !u.current && i && (u.current = i(t, {
    visualState: e,
    parent: r,
    props: n,
    presenceContext: a,
    blockInitialAnimation: a ? a.initial === !1 : !1,
    reducedMotionConfig: l
  }));
  const c = u.current, h = j(co);
  c && !c.projection && s && (c.type === "html" || c.type === "svg") && Cl(u.current, n, s, h);
  const d = et(!1);
  ss(() => {
    c && d.current && c.update(n, a);
  });
  const p = n[lo], m = et(!!p && !window.MotionHandoffIsComplete?.(p) && window.MotionHasOptimisedAnimation?.(p));
  return os(() => {
    c && (d.current = !0, window.MotionIsMounted = !0, c.updateFeatures(), c.scheduleRenderMicrotask(), m.current && c.animationState && c.animationState.animateChanges());
  }), Vt(() => {
    c && (!m.current && c.animationState && c.animationState.animateChanges(), m.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(p);
    }), m.current = !1), c.enteringChildren = void 0);
  }), c;
}
function Cl(t, e, n, i) {
  const { layoutId: s, layout: r, drag: o, dragConstraints: a, layoutScroll: l, layoutRoot: u, layoutCrossfade: c } = e;
  t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : uo(t.parent)), t.projection.setOptions({
    layoutId: s,
    layout: r,
    alwaysMeasureLayout: !!o || a && xt(a),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof r == "string" ? r : "both",
    initialPromotionConfig: i,
    crossfade: c,
    layoutScroll: l,
    layoutRoot: u
  });
}
function uo(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : uo(t.parent);
}
function we(t, { forwardMotionProps: e = !1 } = {}, n, i) {
  n && Ja(n);
  const s = En(t) ? bl : xl;
  function r(a, l) {
    let u;
    const c = {
      ...j(An),
      ...a,
      layoutId: Al(a)
    }, { isStatic: h } = c, d = il(a), p = s(a, h);
    if (!h && sn) {
      Vl();
      const m = Dl(c);
      u = m.MeasureLayout, d.visualElement = Pl(t, p, c, i, m.ProjectionNode);
    }
    return g(fe.Provider, { value: d, children: [u && d.visualElement ? f(u, { visualElement: d.visualElement, ...c }) : null, gl(t, a, Tl(p, d.visualElement, l), p, h, e)] });
  }
  r.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const o = Yo(r);
  return o[Sl] = t, o;
}
function Al({ layoutId: t }) {
  const e = j(en).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function Vl(t, e) {
  j(Js).strict;
}
function Dl(t) {
  const { drag: e, layout: n } = Ct;
  if (!e && !n)
    return {};
  const i = { ...e, ...n };
  return {
    MeasureLayout: e?.isEnabled(t) || n?.isEnabled(t) ? i.MeasureLayout : void 0,
    ProjectionNode: i.ProjectionNode
  };
}
function Ml(t, e) {
  if (typeof Proxy > "u")
    return we;
  const n = /* @__PURE__ */ new Map(), i = (r, o) => we(r, o, t, e), s = (r, o) => i(r, o);
  return new Proxy(s, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (r, o) => o === "create" ? i : (n.has(o) || n.set(o, we(o, void 0, t, e)), n.get(o))
  });
}
function ho({ top: t, left: e, right: n, bottom: i }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: i }
  };
}
function Ll({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function Rl(t, e) {
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
function Pe(t) {
  return t === void 0 || t === 1;
}
function He({ scale: t, scaleX: e, scaleY: n }) {
  return !Pe(t) || !Pe(e) || !Pe(n);
}
function ht(t) {
  return He(t) || fo(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function fo(t) {
  return hi(t.x) || hi(t.y);
}
function hi(t) {
  return t && t !== "0%";
}
function he(t, e, n) {
  const i = t - n, s = e * i;
  return n + s;
}
function di(t, e, n, i, s) {
  return s !== void 0 && (t = he(t, s, i)), he(t, n, i) + e;
}
function Ge(t, e = 0, n = 1, i, s) {
  t.min = di(t.min, e, n, i, s), t.max = di(t.max, e, n, i, s);
}
function po(t, { x: e, y: n }) {
  Ge(t.x, e.translate, e.scale, e.originPoint), Ge(t.y, n.translate, n.scale, n.originPoint);
}
const fi = 0.999999999999, pi = 1.0000000000001;
function El(t, e, n, i = !1) {
  const s = n.length;
  if (!s)
    return;
  e.x = e.y = 1;
  let r, o;
  for (let a = 0; a < s; a++) {
    r = n[a], o = r.projectionDelta;
    const { visualElement: l } = r.options;
    l && l.props.style && l.props.style.display === "contents" || (i && r.options.layoutScroll && r.scroll && r !== r.root && St(t, {
      x: -r.scroll.offset.x,
      y: -r.scroll.offset.y
    }), o && (e.x *= o.x.scale, e.y *= o.y.scale, po(t, o)), i && ht(r.latestValues) && St(t, r.latestValues));
  }
  e.x < pi && e.x > fi && (e.x = 1), e.y < pi && e.y > fi && (e.y = 1);
}
function bt(t, e) {
  t.min = t.min + e, t.max = t.max + e;
}
function mi(t, e, n, i, s = 0.5) {
  const r = E(t.min, t.max, s);
  Ge(t, e, n, r, i);
}
function St(t, e) {
  mi(t.x, e.x, e.scaleX, e.scale, e.originX), mi(t.y, e.y, e.scaleY, e.scale, e.originY);
}
function mo(t, e) {
  return ho(Rl(t.getBoundingClientRect(), e));
}
function Fl(t, e, n) {
  const i = mo(t, n), { scroll: s } = e;
  return s && (bt(i.x, s.offset.x), bt(i.y, s.offset.y)), i;
}
const gi = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Tt = () => ({
  x: gi(),
  y: gi()
}), yi = () => ({ min: 0, max: 0 }), k = () => ({
  x: yi(),
  y: yi()
}), Ke = { current: null }, go = { current: !1 };
function kl() {
  if (go.current = !0, !!sn)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => Ke.current = t.matches;
      t.addEventListener("change", e), e();
    } else
      Ke.current = !1;
}
const Bl = /* @__PURE__ */ new WeakMap();
function Il(t, e, n) {
  for (const i in e) {
    const s = e[i], r = n[i];
    if (z(s))
      t.addValue(i, s);
    else if (z(r))
      t.addValue(i, Pt(s, { owner: t }));
    else if (r !== s)
      if (t.hasValue(i)) {
        const o = t.getValue(i);
        o.liveStyle === !0 ? o.jump(s) : o.hasAnimated || o.set(s);
      } else {
        const o = t.getStaticValue(i);
        t.addValue(i, Pt(o !== void 0 ? o : s, { owner: t }));
      }
  }
  for (const i in n)
    e[i] === void 0 && t.removeValue(i);
  return e;
}
const vi = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class Ol {
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
  constructor({ parent: e, props: n, presenceContext: i, reducedMotionConfig: s, blockInitialAnimation: r, visualState: o }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Sn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const d = $.now();
      this.renderScheduledAt < d && (this.renderScheduledAt = d, R.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u } = o;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = e, this.props = n, this.presenceContext = i, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = s, this.options = a, this.blockInitialAnimation = !!r, this.isControllingVariants = me(n), this.isVariantNode = to(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: c, ...h } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const d in h) {
      const p = h[d];
      l[d] !== void 0 && z(p) && p.set(l[d]);
    }
  }
  mount(e) {
    this.current = e, Bl.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, i) => this.bindToMotionValue(i, n)), go.current || kl(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : Ke.current, this.parent?.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), rt(this.notifyUpdate), rt(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    const i = Lt.has(e);
    i && this.onBindTransform && this.onBindTransform();
    const s = n.on("change", (o) => {
      this.latestValues[e] = o, this.props.onUpdate && R.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let r;
    window.MotionCheckAppearSync && (r = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      s(), r && r(), n.owner && n.stop();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in Ct) {
      const n = Ct[e];
      if (!n)
        continue;
      const { isEnabled: i, Feature: s } = n;
      if (!this.features[e] && s && i(this.props) && (this.features[e] = new s(this)), this.features[e]) {
        const r = this.features[e];
        r.isMounted ? r.update() : (r.mount(), r.isMounted = !0);
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : k();
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
    for (let i = 0; i < vi.length; i++) {
      const s = vi[i];
      this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
      const r = "on" + s, o = e[r];
      o && (this.propEventSubscriptions[s] = this.on(s, o));
    }
    this.prevMotionValues = Il(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return i === void 0 && n !== void 0 && (i = Pt(n === null ? void 0 : n, { owner: this }), this.addValue(e, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    let i = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return i != null && (typeof i == "string" && (rs(i) || ls(i)) ? i = parseFloat(i) : !Ha(i) && at.test(n) && (i = Us(e, n)), this.setBaseTarget(e, z(i) ? i.get() : i)), z(i) ? i.get() : i;
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
      const r = Fn(this.props, n, this.presenceContext?.custom);
      r && (i = r[e]);
    }
    if (n && i !== void 0)
      return i;
    const s = this.getBaseTargetFromProps(this.props, e);
    return s !== void 0 && !z(s) ? s : this.initialValues[e] !== void 0 && i === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new cn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    Pn.render(this.render);
  }
}
class yo extends Ol {
  constructor() {
    super(...arguments), this.KeyframeResolver = ka;
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
    z(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function vo(t, { style: e, vars: n }, i, s) {
  const r = t.style;
  let o;
  for (o in e)
    r[o] = e[o];
  s?.applyProjectionStyles(r, i);
  for (o in n)
    r.setProperty(o, n[o]);
}
function Wl(t) {
  return window.getComputedStyle(t);
}
class jl extends yo {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = vo;
  }
  readValueFromInstance(e, n) {
    if (Lt.has(n))
      return this.projection?.isProjecting ? We(n) : Qr(e, n);
    {
      const i = Wl(e), s = (dn(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof s == "string" ? s.trim() : s;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return mo(e, n);
  }
  build(e, n, i) {
    Ln(e, n, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return kn(e, n, i);
  }
}
const xo = /* @__PURE__ */ new Set([
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
function zl(t, e, n, i) {
  vo(t, e, void 0, i);
  for (const s in e.attrs)
    t.setAttribute(xo.has(s) ? s : Bn(s), e.attrs[s]);
}
class Nl extends yo {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = k;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (Lt.has(n)) {
      const i = _s(n);
      return i && i.default || 0;
    }
    return n = xo.has(n) ? n : Bn(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return ao(e, n, i);
  }
  build(e, n, i) {
    io(e, n, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(e, n, i, s) {
    zl(e, n, i, s);
  }
  mount(e) {
    this.isSVGTag = oo(e.tagName), super.mount(e);
  }
}
const _l = (t, e) => En(t) ? new Nl(e) : new jl(e, {
  allowProjection: t !== is
});
function wt(t, e, n) {
  const i = t.getProps();
  return Fn(i, e, n !== void 0 ? n : i.custom, t);
}
const Ye = (t) => Array.isArray(t);
function Ul(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, Pt(n));
}
function $l(t) {
  return Ye(t) ? t[t.length - 1] || 0 : t;
}
function Hl(t, e) {
  const n = wt(t, e);
  let { transitionEnd: i = {}, transition: s = {}, ...r } = n || {};
  r = { ...r, ...i };
  for (const o in r) {
    const a = $l(r[o]);
    Ul(t, o, a);
  }
}
function Gl(t) {
  return !!(z(t) && t.add);
}
function Xe(t, e) {
  const n = t.getValue("willChange");
  if (Gl(n))
    return n.add(e);
  if (!n && it.WillChange) {
    const i = new it.WillChange("auto");
    t.addValue("willChange", i), i.add(e);
  }
}
function bo(t) {
  return t.props[lo];
}
const Kl = (t) => t !== null;
function Yl(t, { repeat: e, repeatType: n = "loop" }, i) {
  const s = t.filter(Kl), r = e && n !== "loop" && e % 2 === 1 ? 0 : s.length - 1;
  return s[r];
}
const Xl = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, ql = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Zl = {
  type: "keyframes",
  duration: 0.8
}, Jl = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Ql = (t, { keyframes: e }) => e.length > 2 ? Zl : Lt.has(t) ? t.startsWith("scale") ? ql(e[1]) : Xl : Jl;
function tc({ when: t, delay: e, delayChildren: n, staggerChildren: i, staggerDirection: s, repeat: r, repeatType: o, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
const In = (t, e, n, i = {}, s, r) => (o) => {
  const a = Tn(i, t) || {}, l = a.delay || i.delay || 0;
  let { elapsed: u = 0 } = i;
  u = u - /* @__PURE__ */ J(l);
  const c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (d) => {
      e.set(d), a.onUpdate && a.onUpdate(d);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: r ? void 0 : s
  };
  tc(a) || Object.assign(c, Ql(t, c)), c.duration && (c.duration = /* @__PURE__ */ J(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ J(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let h = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (Ue(c), c.delay === 0 && (h = !0)), (it.instantAnimations || it.skipAnimations) && (h = !0, Ue(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, h && !r && e.get() !== void 0) {
    const d = Yl(c.keyframes, a);
    if (d !== void 0) {
      R.update(() => {
        c.onUpdate(d), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new bn(c) : new Ta(c);
};
function ec({ protectedKeys: t, needsAnimating: e }, n) {
  const i = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, i;
}
function So(t, e, { delay: n = 0, transitionOverride: i, type: s } = {}) {
  let { transition: r = t.getDefaultTransition(), transitionEnd: o, ...a } = e;
  i && (r = i);
  const l = [], u = s && t.animationState && t.animationState.getState()[s];
  for (const c in a) {
    const h = t.getValue(c, t.latestValues[c] ?? null), d = a[c];
    if (d === void 0 || u && ec(u, c))
      continue;
    const p = {
      delay: n,
      ...Tn(r || {}, c)
    }, m = h.get();
    if (m !== void 0 && !h.isAnimating && !Array.isArray(d) && d === m && !p.velocity)
      continue;
    let v = !1;
    if (window.MotionHandoffAnimation) {
      const y = bo(t);
      if (y) {
        const S = window.MotionHandoffAnimation(y, c, R);
        S !== null && (p.startTime = S, v = !0);
      }
    }
    Xe(t, c), h.start(In(c, h, d, t.shouldReduceMotion && js.has(c) ? { type: !1 } : p, t, v));
    const b = h.animation;
    b && l.push(b);
  }
  return o && Promise.all(l).then(() => {
    R.update(() => {
      o && Hl(t, o);
    });
  }), l;
}
function To(t, e, n, i = 0, s = 1) {
  const r = Array.from(t).sort((u, c) => u.sortNodePosition(c)).indexOf(e), o = t.size, a = (o - 1) * i;
  return typeof n == "function" ? n(r, o) : s === 1 ? r * i : a - r * i;
}
function qe(t, e, n = {}) {
  const i = wt(t, e, n.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: s = t.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (s = n.transitionOverride);
  const r = i ? () => Promise.all(So(t, i, n)) : () => Promise.resolve(), o = t.variantChildren && t.variantChildren.size ? (l = 0) => {
    const { delayChildren: u = 0, staggerChildren: c, staggerDirection: h } = s;
    return nc(t, e, l, u, c, h, n);
  } : () => Promise.resolve(), { when: a } = s;
  if (a) {
    const [l, u] = a === "beforeChildren" ? [r, o] : [o, r];
    return l().then(() => u());
  } else
    return Promise.all([r(), o(n.delay)]);
}
function nc(t, e, n = 0, i = 0, s = 0, r = 1, o) {
  const a = [];
  for (const l of t.variantChildren)
    l.notify("AnimationStart", e), a.push(qe(l, e, {
      ...o,
      delay: n + (typeof i == "function" ? 0 : i) + To(t.variantChildren, l, i, s, r)
    }).then(() => l.notify("AnimationComplete", e)));
  return Promise.all(a);
}
function ic(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let i;
  if (Array.isArray(e)) {
    const s = e.map((r) => qe(t, r, n));
    i = Promise.all(s);
  } else if (typeof e == "string")
    i = qe(t, e, n);
  else {
    const s = typeof e == "function" ? wt(t, e, n.custom) : e;
    i = Promise.all(So(t, s, n));
  }
  return i.then(() => {
    t.notify("AnimationComplete", e);
  });
}
function wo(t, e) {
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
const sc = Mn.length;
function Po(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const n = t.parent ? Po(t.parent) || {} : {};
    return t.props.initial !== void 0 && (n.initial = t.props.initial), n;
  }
  const e = {};
  for (let n = 0; n < sc; n++) {
    const i = Mn[n], s = t.props[i];
    (Ut(s) || s === !1) && (e[i] = s);
  }
  return e;
}
const oc = [...Dn].reverse(), rc = Dn.length;
function ac(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: i }) => ic(t, n, i)));
}
function lc(t) {
  let e = ac(t), n = xi(), i = !0;
  const s = (l) => (u, c) => {
    const h = wt(t, c, l === "exit" ? t.presenceContext?.custom : void 0);
    if (h) {
      const { transition: d, transitionEnd: p, ...m } = h;
      u = { ...u, ...m, ...p };
    }
    return u;
  };
  function r(l) {
    e = l(t);
  }
  function o(l) {
    const { props: u } = t, c = Po(t.parent) || {}, h = [], d = /* @__PURE__ */ new Set();
    let p = {}, m = 1 / 0;
    for (let b = 0; b < rc; b++) {
      const y = oc[b], S = n[y], x = u[y] !== void 0 ? u[y] : c[y], A = Ut(x), w = y === l ? S.isActive : null;
      w === !1 && (m = b);
      let V = x === c[y] && x !== u[y] && A;
      if (V && i && t.manuallyAnimateOnMount && (V = !1), S.protectedKeys = { ...p }, // If it isn't active and hasn't *just* been set as inactive
      !S.isActive && w === null || // If we didn't and don't have any defined prop for this animation type
      !x && !S.prevProp || // Or if the prop doesn't define an animation
      pe(x) || typeof x == "boolean")
        continue;
      const D = cc(S.prevProp, x);
      let C = D || // If we're making this variant active, we want to always make it active
      y === l && S.isActive && !V && A || // If we removed a higher-priority variant (i is in reverse order)
      b > m && A, I = !1;
      const _ = Array.isArray(x) ? x : [x];
      let st = _.reduce(s(y), {});
      w === !1 && (st = {});
      const { prevResolvedValues: On = {} } = S, zo = {
        ...On,
        ...st
      }, Wn = (O) => {
        C = !0, d.has(O) && (I = !0, d.delete(O)), S.needsAnimating[O] = !0;
        const H = t.getValue(O);
        H && (H.liveStyle = !1);
      };
      for (const O in zo) {
        const H = st[O], ct = On[O];
        if (p.hasOwnProperty(O))
          continue;
        let yt = !1;
        Ye(H) && Ye(ct) ? yt = !wo(H, ct) : yt = H !== ct, yt ? H != null ? Wn(O) : d.add(O) : H !== void 0 && d.has(O) ? Wn(O) : S.protectedKeys[O] = !0;
      }
      S.prevProp = x, S.prevResolvedValues = st, S.isActive && (p = { ...p, ...st }), i && t.blockInitialAnimation && (C = !1);
      const jn = V && D;
      C && (!jn || I) && h.push(..._.map((O) => {
        const H = { type: y };
        if (typeof O == "string" && i && !jn && t.manuallyAnimateOnMount && t.parent) {
          const { parent: ct } = t, yt = wt(ct, O);
          if (ct.enteringChildren && yt) {
            const { delayChildren: No } = yt.transition || {};
            H.delay = To(ct.enteringChildren, t, No);
          }
        }
        return {
          animation: O,
          options: H
        };
      }));
    }
    if (d.size) {
      const b = {};
      if (typeof u.initial != "boolean") {
        const y = wt(t, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        y && y.transition && (b.transition = y.transition);
      }
      d.forEach((y) => {
        const S = t.getBaseTarget(y), x = t.getValue(y);
        x && (x.liveStyle = !0), b[y] = S ?? null;
      }), h.push({ animation: b });
    }
    let v = !!h.length;
    return i && (u.initial === !1 || u.initial === u.animate) && !t.manuallyAnimateOnMount && (v = !1), i = !1, v ? e(h) : Promise.resolve();
  }
  function a(l, u) {
    if (n[l].isActive === u)
      return Promise.resolve();
    t.variantChildren?.forEach((h) => h.animationState?.setActive(l, u)), n[l].isActive = u;
    const c = o(l);
    for (const h in n)
      n[h].protectedKeys = {};
    return c;
  }
  return {
    animateChanges: o,
    setActive: a,
    setAnimateFunction: r,
    getState: () => n,
    reset: () => {
      n = xi();
    }
  };
}
function cc(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !wo(e, t) : !1;
}
function ut(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function xi() {
  return {
    animate: ut(!0),
    whileInView: ut(),
    whileHover: ut(),
    whileTap: ut(),
    whileDrag: ut(),
    whileFocus: ut(),
    exit: ut()
  };
}
class lt {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
class uc extends lt {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = lc(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    pe(e) && (this.unmountControls = e.subscribe(this.node));
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
let hc = 0;
class dc extends lt {
  constructor() {
    super(...arguments), this.id = hc++;
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
const fc = {
  animation: {
    Feature: uc
  },
  exit: {
    Feature: dc
  }
};
function Ht(t, e, n, i = { passive: !0 }) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n);
}
function qt(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
const pc = (t) => (e) => Cn(e) && t(e, qt(e));
function Ot(t, e, n, i) {
  return Ht(t, e, pc(n), i);
}
const Co = 1e-4, mc = 1 - Co, gc = 1 + Co, Ao = 0.01, yc = 0 - Ao, vc = 0 + Ao;
function U(t) {
  return t.max - t.min;
}
function xc(t, e, n) {
  return Math.abs(t - e) <= n;
}
function bi(t, e, n, i = 0.5) {
  t.origin = i, t.originPoint = E(e.min, e.max, t.origin), t.scale = U(n) / U(e), t.translate = E(n.min, n.max, t.origin) - t.originPoint, (t.scale >= mc && t.scale <= gc || isNaN(t.scale)) && (t.scale = 1), (t.translate >= yc && t.translate <= vc || isNaN(t.translate)) && (t.translate = 0);
}
function Wt(t, e, n, i) {
  bi(t.x, e.x, n.x, i ? i.originX : void 0), bi(t.y, e.y, n.y, i ? i.originY : void 0);
}
function Si(t, e, n) {
  t.min = n.min + e.min, t.max = t.min + U(e);
}
function bc(t, e, n) {
  Si(t.x, e.x, n.x), Si(t.y, e.y, n.y);
}
function Ti(t, e, n) {
  t.min = e.min - n.min, t.max = t.min + U(e);
}
function jt(t, e, n) {
  Ti(t.x, e.x, n.x), Ti(t.y, e.y, n.y);
}
function K(t) {
  return [t("x"), t("y")];
}
const Vo = ({ current: t }) => t ? t.ownerDocument.defaultView : null, wi = (t, e) => Math.abs(t - e);
function Sc(t, e) {
  const n = wi(t.x, e.x), i = wi(t.y, e.y);
  return Math.sqrt(n ** 2 + i ** 2);
}
class Do {
  constructor(e, n, { transformPagePoint: i, contextWindow: s = window, dragSnapToOrigin: r = !1, distanceThreshold: o = 3 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const d = Ae(this.lastMoveEventInfo, this.history), p = this.startEvent !== null, m = Sc(d.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!p && !m)
        return;
      const { point: v } = d, { timestamp: b } = W;
      this.history.push({ ...v, timestamp: b });
      const { onStart: y, onMove: S } = this.handlers;
      p || (y && y(this.lastMoveEvent, d), this.startEvent = this.lastMoveEvent), S && S(this.lastMoveEvent, d);
    }, this.handlePointerMove = (d, p) => {
      this.lastMoveEvent = d, this.lastMoveEventInfo = Ce(p, this.transformPagePoint), R.update(this.updatePoint, !0);
    }, this.handlePointerUp = (d, p) => {
      this.end();
      const { onEnd: m, onSessionEnd: v, resumeAnimation: b } = this.handlers;
      if (this.dragSnapToOrigin && b && b(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const y = Ae(d.type === "pointercancel" ? this.lastMoveEventInfo : Ce(p, this.transformPagePoint), this.history);
      this.startEvent && m && m(d, y), v && v(d, y);
    }, !Cn(e))
      return;
    this.dragSnapToOrigin = r, this.handlers = n, this.transformPagePoint = i, this.distanceThreshold = o, this.contextWindow = s || window;
    const a = qt(e), l = Ce(a, this.transformPagePoint), { point: u } = l, { timestamp: c } = W;
    this.history = [{ ...u, timestamp: c }];
    const { onSessionStart: h } = n;
    h && h(e, Ae(l, this.history)), this.removeListeners = Kt(Ot(this.contextWindow, "pointermove", this.handlePointerMove), Ot(this.contextWindow, "pointerup", this.handlePointerUp), Ot(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), rt(this.updatePoint);
  }
}
function Ce(t, e) {
  return e ? { point: e(t.point) } : t;
}
function Pi(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function Ae({ point: t }, e) {
  return {
    point: t,
    delta: Pi(t, Mo(e)),
    offset: Pi(t, Tc(e)),
    velocity: wc(e, 0.1)
  };
}
function Tc(t) {
  return t[0];
}
function Mo(t) {
  return t[t.length - 1];
}
function wc(t, e) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let n = t.length - 1, i = null;
  const s = Mo(t);
  for (; n >= 0 && (i = t[n], !(s.timestamp - i.timestamp > /* @__PURE__ */ J(e))); )
    n--;
  if (!i)
    return { x: 0, y: 0 };
  const r = /* @__PURE__ */ Y(s.timestamp - i.timestamp);
  if (r === 0)
    return { x: 0, y: 0 };
  const o = {
    x: (s.x - i.x) / r,
    y: (s.y - i.y) / r
  };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
function Pc(t, { min: e, max: n }, i) {
  return e !== void 0 && t < e ? t = i ? E(e, t, i.min) : Math.max(t, e) : n !== void 0 && t > n && (t = i ? E(n, t, i.max) : Math.min(t, n)), t;
}
function Ci(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
  };
}
function Cc(t, { top: e, left: n, bottom: i, right: s }) {
  return {
    x: Ci(t.x, n, s),
    y: Ci(t.y, e, i)
  };
}
function Ai(t, e) {
  let n = e.min - t.min, i = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, i] = [i, n]), { min: n, max: i };
}
function Ac(t, e) {
  return {
    x: Ai(t.x, e.x),
    y: Ai(t.y, e.y)
  };
}
function Vc(t, e) {
  let n = 0.5;
  const i = U(t), s = U(e);
  return s > i ? n = /* @__PURE__ */ zt(e.min, e.max - i, t.min) : i > s && (n = /* @__PURE__ */ zt(t.min, t.max - s, e.min)), nt(0, 1, n);
}
function Dc(t, e) {
  const n = {};
  return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n;
}
const Ze = 0.35;
function Mc(t = Ze) {
  return t === !1 ? t = 0 : t === !0 && (t = Ze), {
    x: Vi(t, "left", "right"),
    y: Vi(t, "top", "bottom")
  };
}
function Vi(t, e, n) {
  return {
    min: Di(t, e),
    max: Di(t, n)
  };
}
function Di(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const Lc = /* @__PURE__ */ new WeakMap();
class Rc {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = k(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: n = !1, distanceThreshold: i } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1)
      return;
    const r = (h) => {
      const { dragSnapToOrigin: d } = this.getProps();
      d ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(qt(h).point);
    }, o = (h, d) => {
      const { drag: p, dragPropagation: m, onDragStart: v } = this.getProps();
      if (p && !m && (this.openDragLock && this.openDragLock(), this.openDragLock = Oa(p), !this.openDragLock))
        return;
      this.latestPointerEvent = h, this.latestPanInfo = d, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), K((y) => {
        let S = this.getAxisMotionValue(y).get() || 0;
        if (Q.test(S)) {
          const { projection: x } = this.visualElement;
          if (x && x.layout) {
            const A = x.layout.layoutBox[y];
            A && (S = U(A) * (parseFloat(S) / 100));
          }
        }
        this.originPoint[y] = S;
      }), v && R.postRender(() => v(h, d)), Xe(this.visualElement, "transform");
      const { animationState: b } = this.visualElement;
      b && b.setActive("whileDrag", !0);
    }, a = (h, d) => {
      this.latestPointerEvent = h, this.latestPanInfo = d;
      const { dragPropagation: p, dragDirectionLock: m, onDirectionLock: v, onDrag: b } = this.getProps();
      if (!p && !this.openDragLock)
        return;
      const { offset: y } = d;
      if (m && this.currentDirection === null) {
        this.currentDirection = Ec(y), this.currentDirection !== null && v && v(this.currentDirection);
        return;
      }
      this.updateAxis("x", d.point, y), this.updateAxis("y", d.point, y), this.visualElement.render(), b && b(h, d);
    }, l = (h, d) => {
      this.latestPointerEvent = h, this.latestPanInfo = d, this.stop(h, d), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, u = () => K((h) => this.getAnimationState(h) === "paused" && this.getAxisMotionValue(h).animation?.play()), { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new Do(e, {
      onSessionStart: r,
      onStart: o,
      onMove: a,
      onSessionEnd: l,
      resumeAnimation: u
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: c,
      distanceThreshold: i,
      contextWindow: Vo(this.visualElement)
    });
  }
  /**
   * @internal
   */
  stop(e, n) {
    const i = e || this.latestPointerEvent, s = n || this.latestPanInfo, r = this.isDragging;
    if (this.cancel(), !r || !s || !i)
      return;
    const { velocity: o } = s;
    this.startAnimation(o);
    const { onDragEnd: a } = this.getProps();
    a && R.postRender(() => a(i, s));
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
    if (!i || !ne(e, s, this.currentDirection))
      return;
    const r = this.getAxisMotionValue(e);
    let o = this.originPoint[e] + i[e];
    this.constraints && this.constraints[e] && (o = Pc(o, this.constraints[e], this.elastic[e])), r.set(o);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: n } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, s = this.constraints;
    e && xt(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && i ? this.constraints = Cc(i.layoutBox, e) : this.constraints = !1, this.elastic = Mc(n), s !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && K((r) => {
      this.constraints !== !1 && this.getAxisMotionValue(r) && (this.constraints[r] = Dc(i.layoutBox[r], this.constraints[r]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !xt(e))
      return !1;
    const i = e.current, { projection: s } = this.visualElement;
    if (!s || !s.layout)
      return !1;
    const r = Fl(i, s.root, this.visualElement.getTransformPagePoint());
    let o = Ac(s.layout.layoutBox, r);
    if (n) {
      const a = n(Ll(o));
      this.hasMutatedConstraints = !!a, a && (o = ho(a));
    }
    return o;
  }
  startAnimation(e) {
    const { drag: n, dragMomentum: i, dragElastic: s, dragTransition: r, dragSnapToOrigin: o, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, u = K((c) => {
      if (!ne(c, n, this.currentDirection))
        return;
      let h = l && l[c] || {};
      o && (h = { min: 0, max: 0 });
      const d = s ? 200 : 1e6, p = s ? 40 : 1e7, m = {
        type: "inertia",
        velocity: i ? e[c] : 0,
        bounceStiffness: d,
        bounceDamping: p,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...r,
        ...h
      };
      return this.startAxisValueAnimation(c, m);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(e, n) {
    const i = this.getAxisMotionValue(e);
    return Xe(this.visualElement, e), i.start(In(e, i, 0, n, this.visualElement, !1));
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
    const n = `_drag${e.toUpperCase()}`, i = this.visualElement.getProps(), s = i[n];
    return s || this.visualElement.getValue(e, (i.initial ? i.initial[e] : void 0) || 0);
  }
  snapToCursor(e) {
    K((n) => {
      const { drag: i } = this.getProps();
      if (!ne(n, i, this.currentDirection))
        return;
      const { projection: s } = this.visualElement, r = this.getAxisMotionValue(n);
      if (s && s.layout) {
        const { min: o, max: a } = s.layout.layoutBox[n];
        r.set(e[n] - E(o, a, 0.5));
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
    if (!xt(n) || !i || !this.constraints)
      return;
    this.stopAnimation();
    const s = { x: 0, y: 0 };
    K((o) => {
      const a = this.getAxisMotionValue(o);
      if (a && this.constraints !== !1) {
        const l = a.get();
        s[o] = Vc({ min: l, max: l }, this.constraints[o]);
      }
    });
    const { transformTemplate: r } = this.visualElement.getProps();
    this.visualElement.current.style.transform = r ? r({}, "") : "none", i.root && i.root.updateScroll(), i.updateLayout(), this.resolveConstraints(), K((o) => {
      if (!ne(o, e, null))
        return;
      const a = this.getAxisMotionValue(o), { min: l, max: u } = this.constraints[o];
      a.set(E(l, u, s[o]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Lc.set(this.visualElement, this);
    const e = this.visualElement.current, n = Ot(e, "pointerdown", (l) => {
      const { drag: u, dragListener: c = !0 } = this.getProps();
      u && c && this.start(l);
    }), i = () => {
      const { dragConstraints: l } = this.getProps();
      xt(l) && l.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: s } = this.visualElement, r = s.addEventListener("measure", i);
    s && !s.layout && (s.root && s.root.updateScroll(), s.updateLayout()), R.read(i);
    const o = Ht(window, "resize", () => this.scalePositionWithinConstraints()), a = s.addEventListener("didUpdate", (({ delta: l, hasLayoutChanged: u }) => {
      this.isDragging && u && (K((c) => {
        const h = this.getAxisMotionValue(c);
        h && (this.originPoint[c] += l[c].translate, h.set(h.get() + l[c].translate));
      }), this.visualElement.render());
    }));
    return () => {
      o(), n(), r(), a && a();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: i = !1, dragPropagation: s = !1, dragConstraints: r = !1, dragElastic: o = Ze, dragMomentum: a = !0 } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: i,
      dragPropagation: s,
      dragConstraints: r,
      dragElastic: o,
      dragMomentum: a
    };
  }
}
function ne(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function Ec(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n;
}
class Fc extends lt {
  constructor(e) {
    super(e), this.removeGroupControls = X, this.removeListeners = X, this.controls = new Rc(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || X;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const Mi = (t) => (e, n) => {
  t && R.postRender(() => t(e, n));
};
class kc extends lt {
  constructor() {
    super(...arguments), this.removePointerDownListener = X;
  }
  onPointerDown(e) {
    this.session = new Do(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Vo(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: i, onPanEnd: s } = this.node.getProps();
    return {
      onSessionStart: Mi(e),
      onStart: Mi(n),
      onMove: i,
      onEnd: (r, o) => {
        delete this.session, s && R.postRender(() => s(r, o));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Ot(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const re = {
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
function Li(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const Et = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (P.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = Li(t, e.target.x), i = Li(t, e.target.y);
    return `${n}% ${i}%`;
  }
}, Bc = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const i = t, s = at.parse(t);
    if (s.length > 5)
      return i;
    const r = at.createTransformer(t), o = typeof s[0] != "number" ? 1 : 0, a = n.x.scale * e.x, l = n.y.scale * e.y;
    s[0 + o] /= a, s[1 + o] /= l;
    const u = E(a, l, 0.5);
    return typeof s[2 + o] == "number" && (s[2 + o] /= u), typeof s[3 + o] == "number" && (s[3 + o] /= u), r(s);
  }
};
let Ve = !1;
class Ic extends ns {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i, layoutId: s } = this.props, { projection: r } = e;
    sl(Oc), r && (n.group && n.group.add(r), i && i.register && s && i.register(r), Ve && r.root.didUpdate(), r.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), r.setOptions({
      ...r.options,
      onExitComplete: () => this.safeToRemove()
    })), re.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: i, drag: s, isPresent: r } = this.props, { projection: o } = i;
    return o && (o.isPresent = r, Ve = !0, s || e.layoutDependency !== n || n === void 0 || e.isPresent !== r ? o.willUpdate() : this.safeToRemove(), e.isPresent !== r && (r ? o.promote() : o.relegate() || R.postRender(() => {
      const a = o.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e && (e.root.didUpdate(), Pn.postRender(() => {
      !e.currentAnimation && e.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i } = this.props, { projection: s } = e;
    Ve = !0, s && (s.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(s), i && i.deregister && i.deregister(s));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function Lo(t) {
  const [e, n] = Zs(), i = j(en);
  return f(Ic, { ...t, layoutGroup: i, switchLayoutGroup: j(co), isPresent: e, safeToRemove: n });
}
const Oc = {
  borderRadius: {
    ...Et,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Et,
  borderTopRightRadius: Et,
  borderBottomLeftRadius: Et,
  borderBottomRightRadius: Et,
  boxShadow: Bc
};
function Wc(t, e, n) {
  const i = z(t) ? t : Pt(t);
  return i.start(In("", i, e, n)), i.animation;
}
const jc = (t, e) => t.depth - e.depth;
class zc {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    on(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    rn(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(jc), this.isDirty = !1, this.children.forEach(e);
  }
}
function Nc(t, e) {
  const n = $.now(), i = ({ timestamp: s }) => {
    const r = s - n;
    r >= e && (rt(i), t(r - e));
  };
  return R.setup(i, !0), () => rt(i);
}
const Ro = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], _c = Ro.length, Ri = (t) => typeof t == "string" ? parseFloat(t) : t, Ei = (t) => typeof t == "number" || P.test(t);
function Uc(t, e, n, i, s, r) {
  s ? (t.opacity = E(0, n.opacity ?? 1, $c(i)), t.opacityExit = E(e.opacity ?? 1, 0, Hc(i))) : r && (t.opacity = E(e.opacity ?? 1, n.opacity ?? 1, i));
  for (let o = 0; o < _c; o++) {
    const a = `border${Ro[o]}Radius`;
    let l = Fi(e, a), u = Fi(n, a);
    if (l === void 0 && u === void 0)
      continue;
    l || (l = 0), u || (u = 0), l === 0 || u === 0 || Ei(l) === Ei(u) ? (t[a] = Math.max(E(Ri(l), Ri(u), i), 0), (Q.test(u) || Q.test(l)) && (t[a] += "%")) : t[a] = u;
  }
  (e.rotate || n.rotate) && (t.rotate = E(e.rotate || 0, n.rotate || 0, i));
}
function Fi(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const $c = /* @__PURE__ */ Eo(0, 0.5, gs), Hc = /* @__PURE__ */ Eo(0.5, 0.95, X);
function Eo(t, e, n) {
  return (i) => i < t ? 0 : i > e ? 1 : n(/* @__PURE__ */ zt(t, e, i));
}
function ki(t, e) {
  t.min = e.min, t.max = e.max;
}
function G(t, e) {
  ki(t.x, e.x), ki(t.y, e.y);
}
function Bi(t, e) {
  t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin;
}
function Ii(t, e, n, i, s) {
  return t -= e, t = he(t, 1 / n, i), s !== void 0 && (t = he(t, 1 / s, i)), t;
}
function Gc(t, e = 0, n = 1, i = 0.5, s, r = t, o = t) {
  if (Q.test(e) && (e = parseFloat(e), e = E(o.min, o.max, e / 100) - o.min), typeof e != "number")
    return;
  let a = E(r.min, r.max, i);
  t === r && (a -= e), t.min = Ii(t.min, e, n, a, s), t.max = Ii(t.max, e, n, a, s);
}
function Oi(t, e, [n, i, s], r, o) {
  Gc(t, e[n], e[i], e[s], e.scale, r, o);
}
const Kc = ["x", "scaleX", "originX"], Yc = ["y", "scaleY", "originY"];
function Wi(t, e, n, i) {
  Oi(t.x, e, Kc, n ? n.x : void 0, i ? i.x : void 0), Oi(t.y, e, Yc, n ? n.y : void 0, i ? i.y : void 0);
}
function ji(t) {
  return t.translate === 0 && t.scale === 1;
}
function Fo(t) {
  return ji(t.x) && ji(t.y);
}
function zi(t, e) {
  return t.min === e.min && t.max === e.max;
}
function Xc(t, e) {
  return zi(t.x, e.x) && zi(t.y, e.y);
}
function Ni(t, e) {
  return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
}
function ko(t, e) {
  return Ni(t.x, e.x) && Ni(t.y, e.y);
}
function _i(t) {
  return U(t.x) / U(t.y);
}
function Ui(t, e) {
  return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint;
}
class qc {
  constructor() {
    this.members = [];
  }
  add(e) {
    on(this.members, e), e.scheduleRender();
  }
  remove(e) {
    if (rn(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
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
      const r = this.members[s];
      if (r.isPresent !== !1) {
        i = r;
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
function Zc(t, e, n) {
  let i = "";
  const s = t.x.translate / e.x, r = t.y.translate / e.y, o = n?.z || 0;
  if ((s || r || o) && (i = `translate3d(${s}px, ${r}px, ${o}px) `), (e.x !== 1 || e.y !== 1) && (i += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
    const { transformPerspective: u, rotate: c, rotateX: h, rotateY: d, skewX: p, skewY: m } = n;
    u && (i = `perspective(${u}px) ${i}`), c && (i += `rotate(${c}deg) `), h && (i += `rotateX(${h}deg) `), d && (i += `rotateY(${d}deg) `), p && (i += `skewX(${p}deg) `), m && (i += `skewY(${m}deg) `);
  }
  const a = t.x.scale * e.x, l = t.y.scale * e.y;
  return (a !== 1 || l !== 1) && (i += `scale(${a}, ${l})`), i || "none";
}
const De = ["", "X", "Y", "Z"], Jc = 1e3;
let Qc = 0;
function Me(t, e, n, i) {
  const { latestValues: s } = e;
  s[t] && (n[t] = s[t], e.setStaticValue(t, 0), i && (i[t] = 0));
}
function Bo(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: e } = t.options;
  if (!e)
    return;
  const n = bo(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: s, layoutId: r } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", R, !(s || r));
  }
  const { parent: i } = t;
  i && !i.hasCheckedOptimisedAppear && Bo(i);
}
function Io({ attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: i, resetTransform: s }) {
  return class {
    constructor(o = {}, a = e?.()) {
      this.id = Qc++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(nu), this.nodes.forEach(ru), this.nodes.forEach(au), this.nodes.forEach(iu);
      }, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = o, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new zc());
    }
    addEventListener(o, a) {
      return this.eventHandlers.has(o) || this.eventHandlers.set(o, new cn()), this.eventHandlers.get(o).add(a);
    }
    notifyListeners(o, ...a) {
      const l = this.eventHandlers.get(o);
      l && l.notify(...a);
    }
    hasListeners(o) {
      return this.eventHandlers.has(o);
    }
    /**
     * Lifecycles
     */
    mount(o) {
      if (this.instance)
        return;
      this.isSVG = qs(o) && !Ua(o), this.instance = o;
      const { layoutId: a, layout: l, visualElement: u } = this.options;
      if (u && !u.current && u.mount(o), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), t) {
        let c, h = 0;
        const d = () => this.root.updateBlockedByResize = !1;
        R.read(() => {
          h = window.innerWidth;
        }), t(o, () => {
          const p = window.innerWidth;
          p !== h && (h = p, this.root.updateBlockedByResize = !0, c && c(), c = Nc(d, 250), re.hasAnimatedSinceResize && (re.hasAnimatedSinceResize = !1, this.nodes.forEach(Gi)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && u && (a || l) && this.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: h, hasRelativeLayoutChanged: d, layout: p }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const m = this.options.transition || u.getDefaultTransition() || du, { onLayoutAnimationStart: v, onLayoutAnimationComplete: b } = u.getProps(), y = !this.targetLayout || !ko(this.targetLayout, p), S = !h && d;
        if (this.options.layoutRoot || this.resumeFrom || S || h && (y || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const x = {
            ...Tn(m, "layout"),
            onPlay: v,
            onComplete: b
          };
          (u.shouldReduceMotion || this.options.layoutRoot) && (x.delay = 0, x.type = !1), this.startAnimation(x), this.setAnimationOrigin(c, S);
        } else
          h || Gi(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = p;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const o = this.getStack();
      o && o.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), rt(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(lu), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: o } = this.options;
      return o && o.getProps().transformTemplate;
    }
    willUpdate(o = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Bo(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
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
      this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), o && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach($i);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Hi);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(ou), this.nodes.forEach(tu), this.nodes.forEach(eu)) : this.nodes.forEach(Hi), this.clearAllSnapshots();
      const a = $.now();
      W.delta = nt(0, 1e3 / 60, a - W.timestamp), W.timestamp = a, W.isProcessing = !0, ye.update.process(W), ye.preRender.process(W), ye.render.process(W), W.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Pn.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(su), this.sharedNodes.forEach(cu);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, R.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      R.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !U(this.snapshot.measuredBox.x) && !U(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const o = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = k(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, o ? o.layoutBox : void 0);
    }
    updateScroll(o = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === o && (a = !1), a && this.instance) {
        const l = i(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: o,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l
        };
      }
    }
    resetTransform() {
      if (!s)
        return;
      const o = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !Fo(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, c = u !== this.prevTransformTemplateValue;
      o && this.instance && (a || ht(this.latestValues) || c) && (s(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(o = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return o && (l = this.removeTransform(l)), fu(l), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: l,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: o } = this.options;
      if (!o)
        return k();
      const a = o.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(pu))) {
        const { scroll: u } = this.root;
        u && (bt(a.x, u.offset.x), bt(a.y, u.offset.y));
      }
      return a;
    }
    removeElementScroll(o) {
      const a = k();
      if (G(a, o), this.scroll?.wasRoot)
        return a;
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l], { scroll: c, options: h } = u;
        u !== this.root && c && h.layoutScroll && (c.wasRoot && G(a, o), bt(a.x, c.offset.x), bt(a.y, c.offset.y));
      }
      return a;
    }
    applyTransform(o, a = !1) {
      const l = k();
      G(l, o);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a && c.options.layoutScroll && c.scroll && c !== c.root && St(l, {
          x: -c.scroll.offset.x,
          y: -c.scroll.offset.y
        }), ht(c.latestValues) && St(l, c.latestValues);
      }
      return ht(this.latestValues) && St(l, this.latestValues), l;
    }
    removeTransform(o) {
      const a = k();
      G(a, o);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !ht(u.latestValues))
          continue;
        He(u.latestValues) && u.updateSnapshot();
        const c = k(), h = u.measurePageBox();
        G(c, h), Wi(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return ht(this.latestValues) && Wi(a, this.latestValues), a;
    }
    setTargetDelta(o) {
      this.targetDelta = o, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(o) {
      this.options = {
        ...this.options,
        ...o,
        crossfade: o.crossfade !== void 0 ? o.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== W.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(o = !1) {
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== a;
      if (!(o || l && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: c, layoutId: h } = this.options;
      if (!(!this.layout || !(c || h))) {
        if (this.resolvedRelativeTargetAt = W.timestamp, !this.targetDelta && !this.relativeTarget) {
          const d = this.getClosestProjectingParent();
          d && d.layout && this.animationProgress !== 1 ? (this.relativeParent = d, this.forceRelativeParentToResolveTarget(), this.relativeTarget = k(), this.relativeTargetOrigin = k(), jt(this.relativeTargetOrigin, this.layout.layoutBox, d.layout.layoutBox), G(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = k(), this.targetWithTransforms = k()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), bc(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : G(this.target, this.layout.layoutBox), po(this.target, this.targetDelta)) : G(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget)) {
          this.attemptToResolveRelativeTarget = !1;
          const d = this.getClosestProjectingParent();
          d && !!d.resumingFrom == !!this.resumingFrom && !d.options.layoutScroll && d.target && this.animationProgress !== 1 ? (this.relativeParent = d, this.forceRelativeParentToResolveTarget(), this.relativeTarget = k(), this.relativeTargetOrigin = k(), jt(this.relativeTargetOrigin, this.target, d.target), G(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || He(this.parent.latestValues) || fo(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      const o = this.getLead(), a = !!this.resumingFrom || this !== o;
      let l = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (l = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === W.timestamp && (l = !1), l)
        return;
      const { layout: u, layoutId: c } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || c))
        return;
      G(this.layoutCorrected, this.layout.layoutBox);
      const h = this.treeScale.x, d = this.treeScale.y;
      El(this.layoutCorrected, this.treeScale, this.path, a), o.layout && !o.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (o.target = o.layout.layoutBox, o.targetWithTransforms = k());
      const { target: p } = o;
      if (!p) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Bi(this.prevProjectionDelta.x, this.projectionDelta.x), Bi(this.prevProjectionDelta.y, this.projectionDelta.y)), Wt(this.projectionDelta, this.layoutCorrected, p, this.latestValues), (this.treeScale.x !== h || this.treeScale.y !== d || !Ui(this.projectionDelta.x, this.prevProjectionDelta.x) || !Ui(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", p));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(o = !0) {
      if (this.options.visualElement?.scheduleRender(), o) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Tt(), this.projectionDelta = Tt(), this.projectionDeltaWithTransform = Tt();
    }
    setAnimationOrigin(o, a = !1) {
      const l = this.snapshot, u = l ? l.latestValues : {}, c = { ...this.latestValues }, h = Tt();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const d = k(), p = l ? l.source : void 0, m = this.layout ? this.layout.source : void 0, v = p !== m, b = this.getStack(), y = !b || b.members.length <= 1, S = !!(v && !y && this.options.crossfade === !0 && !this.path.some(hu));
      this.animationProgress = 0;
      let x;
      this.mixTargetDelta = (A) => {
        const w = A / 1e3;
        Ki(h.x, o.x, w), Ki(h.y, o.y, w), this.setTargetDelta(h), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (jt(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox), uu(this.relativeTarget, this.relativeTargetOrigin, d, w), x && Xc(this.relativeTarget, x) && (this.isProjectionDirty = !1), x || (x = k()), G(x, this.relativeTarget)), v && (this.animationValues = c, Uc(c, u, this.latestValues, w, S, y)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = w;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(o) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (rt(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = R.update(() => {
        re.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Pt(0)), this.currentAnimation = Wc(this.motionValue, [0, 1e3], {
          ...o,
          velocity: 0,
          isSync: !0,
          onUpdate: (a) => {
            this.mixTargetDelta(a), o.onUpdate && o.onUpdate(a);
          },
          onStop: () => {
          },
          onComplete: () => {
            o.onComplete && o.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const o = this.getStack();
      o && o.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Jc), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const o = this.getLead();
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = o;
      if (!(!a || !l || !u)) {
        if (this !== o && this.layout && u && Oo(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || k();
          const h = U(this.layout.layoutBox.x);
          l.x.min = o.target.x.min, l.x.max = l.x.min + h;
          const d = U(this.layout.layoutBox.y);
          l.y.min = o.target.y.min, l.y.max = l.y.min + d;
        }
        G(a, l), St(a, c), Wt(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(o, a) {
      this.sharedNodes.has(o) || this.sharedNodes.set(o, new qc()), this.sharedNodes.get(o).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const o = this.getStack();
      return o ? o.lead === this : !0;
    }
    getLead() {
      const { layoutId: o } = this.options;
      return o ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: o } = this.options;
      return o ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: o } = this.options;
      if (o)
        return this.root.sharedNodes.get(o);
    }
    promote({ needsReset: o, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l), o && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const o = this.getStack();
      return o ? o.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: o } = this.options;
      if (!o)
        return;
      let a = !1;
      const { latestValues: l } = o;
      if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a)
        return;
      const u = {};
      l.z && Me("z", o, u, this.animationValues);
      for (let c = 0; c < De.length; c++)
        Me(`rotate${De[c]}`, o, u, this.animationValues), Me(`skew${De[c]}`, o, u, this.animationValues);
      o.render();
      for (const c in u)
        o.setStaticValue(c, u[c]), this.animationValues && (this.animationValues[c] = u[c]);
      o.scheduleRender();
    }
    applyProjectionStyles(o, a) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        o.visibility = "hidden";
        return;
      }
      const l = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, o.visibility = "", o.opacity = "", o.pointerEvents = oe(a?.pointerEvents) || "", o.transform = l ? l(this.latestValues, "") : "none";
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        this.options.layoutId && (o.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, o.pointerEvents = oe(a?.pointerEvents) || ""), this.hasProjected && !ht(this.latestValues) && (o.transform = l ? l({}, "") : "none", this.hasProjected = !1);
        return;
      }
      o.visibility = "";
      const c = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let h = Zc(this.projectionDeltaWithTransform, this.treeScale, c);
      l && (h = l(c, h)), o.transform = h;
      const { x: d, y: p } = this.projectionDelta;
      o.transformOrigin = `${d.origin * 100}% ${p.origin * 100}% 0`, u.animationValues ? o.opacity = u === this ? c.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : c.opacityExit : o.opacity = u === this ? c.opacity !== void 0 ? c.opacity : "" : c.opacityExit !== void 0 ? c.opacityExit : 0;
      for (const m in $t) {
        if (c[m] === void 0)
          continue;
        const { correct: v, applyTo: b, isCSSVariable: y } = $t[m], S = h === "none" ? c[m] : v(c[m], u);
        if (b) {
          const x = b.length;
          for (let A = 0; A < x; A++)
            o[b[A]] = S;
        } else
          y ? this.options.visualElement.renderState.vars[m] = S : o[m] = S;
      }
      this.options.layoutId && (o.pointerEvents = u === this ? oe(a?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((o) => o.currentAnimation?.stop()), this.root.nodes.forEach($i), this.root.sharedNodes.clear();
    }
  };
}
function tu(t) {
  t.updateLayout();
}
function eu(t) {
  const e = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: i } = t.layout, { animationType: s } = t.options, r = e.source !== t.layout.source;
    s === "size" ? K((c) => {
      const h = r ? e.measuredBox[c] : e.layoutBox[c], d = U(h);
      h.min = n[c].min, h.max = h.min + d;
    }) : Oo(s, e.layoutBox, n) && K((c) => {
      const h = r ? e.measuredBox[c] : e.layoutBox[c], d = U(n[c]);
      h.max = h.min + d, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[c].max = t.relativeTarget[c].min + d);
    });
    const o = Tt();
    Wt(o, n, e.layoutBox);
    const a = Tt();
    r ? Wt(a, t.applyTransform(i, !0), e.measuredBox) : Wt(a, n, e.layoutBox);
    const l = !Fo(o);
    let u = !1;
    if (!t.resumeFrom) {
      const c = t.getClosestProjectingParent();
      if (c && !c.resumeFrom) {
        const { snapshot: h, layout: d } = c;
        if (h && d) {
          const p = k();
          jt(p, e.layoutBox, h.layoutBox);
          const m = k();
          jt(m, n, d.layoutBox), ko(p, m) || (u = !0), c.options.layoutRoot && (t.relativeTarget = m, t.relativeTargetOrigin = p, t.relativeParent = c);
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: n,
      snapshot: e,
      delta: a,
      layoutDelta: o,
      hasLayoutChanged: l,
      hasRelativeLayoutChanged: u
    });
  } else if (t.isLead()) {
    const { onExitComplete: n } = t.options;
    n && n();
  }
  t.options.transition = void 0;
}
function nu(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function iu(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function su(t) {
  t.clearSnapshot();
}
function $i(t) {
  t.clearMeasurements();
}
function Hi(t) {
  t.isLayoutDirty = !1;
}
function ou(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function Gi(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function ru(t) {
  t.resolveTargetDelta();
}
function au(t) {
  t.calcProjection();
}
function lu(t) {
  t.resetSkewAndRotation();
}
function cu(t) {
  t.removeLeadSnapshot();
}
function Ki(t, e, n) {
  t.translate = E(e.translate, 0, n), t.scale = E(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint;
}
function Yi(t, e, n, i) {
  t.min = E(e.min, n.min, i), t.max = E(e.max, n.max, i);
}
function uu(t, e, n, i) {
  Yi(t.x, e.x, n.x, i), Yi(t.y, e.y, n.y, i);
}
function hu(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const du = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Xi = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), qi = Xi("applewebkit/") && !Xi("chrome/") ? Math.round : X;
function Zi(t) {
  t.min = qi(t.min), t.max = qi(t.max);
}
function fu(t) {
  Zi(t.x), Zi(t.y);
}
function Oo(t, e, n) {
  return t === "position" || t === "preserve-aspect" && !xc(_i(e), _i(n), 0.2);
}
function pu(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const mu = Io({
  attachResizeListener: (t, e) => Ht(t, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), Le = {
  current: void 0
}, Wo = Io({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!Le.current) {
      const t = new mu({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), Le.current = t;
    }
    return Le.current;
  },
  resetTransform: (t, e) => {
    t.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), gu = {
  pan: {
    Feature: kc
  },
  drag: {
    Feature: Fc,
    ProjectionNode: Wo,
    MeasureLayout: Lo
  }
};
function Ji(t, e, n) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", n === "Start");
  const s = "onHover" + n, r = i[s];
  r && R.postRender(() => r(e, qt(e)));
}
class yu extends lt {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = Wa(e, (n, i) => (Ji(this.node, i, "Start"), (s) => Ji(this.node, s, "End"))));
  }
  unmount() {
  }
}
class vu extends lt {
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
function Qi(t, e, n) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", n === "Start");
  const s = "onTap" + (n === "End" ? "" : n), r = i[s];
  r && R.postRender(() => r(e, qt(e)));
}
class xu extends lt {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = _a(e, (n, i) => (Qi(this.node, i, "Start"), (s, { success: r }) => Qi(this.node, s, r ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const Je = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), bu = (t) => {
  const e = Je.get(t.target);
  e && e(t);
}, Su = (t) => {
  t.forEach(bu);
};
function Tu({ root: t, ...e }) {
  const n = t || document;
  Re.has(n) || Re.set(n, {});
  const i = Re.get(n), s = JSON.stringify(e);
  return i[s] || (i[s] = new IntersectionObserver(Su, { root: t, ...e })), i[s];
}
function wu(t, e, n) {
  const i = Tu(e);
  return Je.set(t, n), i.observe(t), () => {
    Je.delete(t), i.unobserve(t);
  };
}
const Pu = {
  some: 0,
  all: 1
};
class Cu extends lt {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(), { root: n, margin: i, amount: s = "some", once: r } = e, o = {
      root: n ? n.current : void 0,
      rootMargin: i,
      threshold: typeof s == "number" ? s : Pu[s]
    }, a = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, r && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: c, onViewportLeave: h } = this.node.getProps(), d = u ? c : h;
      d && d(l);
    };
    return wu(this.node.current, o, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Au(e, n)) && this.startObserver();
  }
  unmount() {
  }
}
function Au({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const Vu = {
  inView: {
    Feature: Cu
  },
  tap: {
    Feature: xu
  },
  focus: {
    Feature: vu
  },
  hover: {
    Feature: yu
  }
}, Du = {
  layout: {
    ProjectionNode: Wo,
    MeasureLayout: Lo
  }
}, Mu = {
  ...fc,
  ...Vu,
  ...gu,
  ...Du
}, N = /* @__PURE__ */ Ml(Mu, _l), Lu = {
  some: 0,
  all: 1
};
function Ru(t, e, { root: n, margin: i, amount: s = "some" } = {}) {
  const r = $s(t), o = /* @__PURE__ */ new WeakMap(), a = (u) => {
    u.forEach((c) => {
      const h = o.get(c.target);
      if (c.isIntersecting !== !!h)
        if (c.isIntersecting) {
          const d = e(c.target, c);
          typeof d == "function" ? o.set(c.target, d) : l.unobserve(c.target);
        } else typeof h == "function" && (h(c), o.delete(c.target));
    });
  }, l = new IntersectionObserver(a, {
    root: n,
    rootMargin: i,
    threshold: typeof s == "number" ? s : Lu[s]
  });
  return r.forEach((u) => l.observe(u)), () => l.disconnect();
}
function Eu(t, { root: e, margin: n, amount: i, once: s = !1, initial: r = !1 } = {}) {
  const [o, a] = tt(r);
  return Vt(() => {
    if (!t.current || s && o)
      return;
    const l = () => (a(!0), s ? void 0 : () => a(!1)), u = {
      root: e && e.current || void 0,
      margin: n,
      amount: i
    };
    return Ru(t.current, l, u);
  }, [e, t, n, s, i]), o;
}
const M = "#1a2744", L = "#f5f0e8", T = "#c9a84c", jo = "#e8e2d6", Gt = "#2d3748", Fu = "#f0e6c8", ku = "https://images.unsplash.com/photo-1779505576192-803dd8c9b55a?w=1800&h=900&fit=crop&auto=format", Bu = [
  {
    url: "https://images.unsplash.com/photo-1704040686510-b747ff423ebb?w=600&h=700&fit=crop&auto=format",
    label: "Draping Living Room"
  },
  {
    url: "https://images.unsplash.com/photo-1613685703237-6628de38ddb7?w=600&h=700&fit=crop&auto=format",
    label: "Minimalist Roller Shades"
  },
  {
    url: "https://images.unsplash.com/photo-1643949914872-317d6047f107?w=600&h=700&fit=crop&auto=format",
    label: "Layered Drapery"
  },
  {
    url: "https://images.unsplash.com/photo-1704040686428-7534b262d0d8?w=600&h=700&fit=crop&auto=format",
    label: "Sunlit Lounge"
  },
  {
    url: "https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?w=600&h=700&fit=crop&auto=format",
    label: "Classic Drapery"
  },
  {
    url: "https://images.unsplash.com/photo-1712940806345-ea8ce290956e?w=600&h=700&fit=crop&auto=format",
    label: "Modern Bedroom Blinds"
  }
];
function Iu(t = 0.15) {
  const e = et(null), n = Eu(e, {
    once: !0,
    amount: t
  });
  return { ref: e, inView: n };
}
function q({
  children: t,
  delay: e = 0,
  className: n = ""
}) {
  const { ref: i, inView: s } = Iu();
  return /* @__PURE__ */ f(
    N.div,
    {
      ref: i,
      initial: { opacity: 0, y: 40 },
      animate: s ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.7, delay: e, ease: "easeOut" },
      className: n,
      children: t
    }
  );
}
function Zt() {
  return /* @__PURE__ */ g("div", { className: "flex items-center justify-center gap-3 my-4", children: [
    /* @__PURE__ */ f("div", { style: { width: 40, height: 1, background: T } }),
    /* @__PURE__ */ f(
      "div",
      {
        style: {
          width: 6,
          height: 6,
          background: T,
          transform: "rotate(45deg)"
        }
      }
    ),
    /* @__PURE__ */ f("div", { style: { width: 40, height: 1, background: T } })
  ] });
}
function Ou() {
  const [t, e] = tt(!1), [n, i] = tt(!1);
  Vt(() => {
    const r = () => e(window.scrollY > 60);
    return window.addEventListener("scroll", r), () => window.removeEventListener("scroll", r);
  }, []);
  const s = [
    "Services",
    "Gallery",
    "Pricing",
    "About",
    "Contact"
  ];
  return /* @__PURE__ */ g(
    N.nav,
    {
      initial: { y: -80 },
      animate: { y: 0 },
      transition: { duration: 0.6, ease: "easeOut" },
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: t ? M : "transparent",
        borderBottom: t ? "1px solid rgba(201,168,76,0.3)" : "none",
        transition: "background 0.4s ease"
      },
      children: [
        /* @__PURE__ */ g(
          "div",
          {
            style: {
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 32px",
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            },
            children: [
              /* @__PURE__ */ g("div", { children: [
                /* @__PURE__ */ f(
                  "span",
                  {
                    style: {
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: L,
                      letterSpacing: "0.04em"
                    },
                    children: "Cascade Drape"
                  }
                ),
                /* @__PURE__ */ f(
                  "span",
                  {
                    style: {
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 22,
                      color: T,
                      marginLeft: 6,
                      fontStyle: "italic"
                    },
                    children: "& Blinds"
                  }
                )
              ] }),
              /* @__PURE__ */ g("div", { className: "hidden md:flex items-center gap-8", children: [
                s.map((r) => /* @__PURE__ */ f(
                  "a",
                  {
                    href: `#${r.toLowerCase()}`,
                    style: {
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: L,
                      textDecoration: "none",
                      textTransform: "uppercase",
                      transition: "color 0.2s"
                    },
                    onMouseEnter: (o) => o.target.style.color = T,
                    onMouseLeave: (o) => o.target.style.color = L,
                    children: r
                  },
                  r
                )),
                /* @__PURE__ */ f(
                  "a",
                  {
                    href: "#contact",
                    style: {
                      background: T,
                      color: M,
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      padding: "10px 22px",
                      borderRadius: 2,
                      transition: "opacity 0.2s"
                    },
                    onMouseEnter: (r) => r.target.style.opacity = "0.85",
                    onMouseLeave: (r) => r.target.style.opacity = "1",
                    children: "Free Quote"
                  }
                )
              ] }),
              /* @__PURE__ */ g(
                "button",
                {
                  className: "md:hidden",
                  onClick: () => i(!n),
                  style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 8
                  },
                  "aria-label": "Toggle menu",
                  children: [
                    /* @__PURE__ */ f(
                      "div",
                      {
                        style: {
                          width: 24,
                          height: 2,
                          background: L,
                          marginBottom: 5,
                          transition: "transform 0.3s",
                          transform: n ? "rotate(45deg) translate(5px, 5px)" : "none"
                        }
                      }
                    ),
                    /* @__PURE__ */ f(
                      "div",
                      {
                        style: {
                          width: 24,
                          height: 2,
                          background: L,
                          marginBottom: 5,
                          opacity: n ? 0 : 1,
                          transition: "opacity 0.3s"
                        }
                      }
                    ),
                    /* @__PURE__ */ f(
                      "div",
                      {
                        style: {
                          width: 24,
                          height: 2,
                          background: L,
                          transition: "transform 0.3s",
                          transform: n ? "rotate(-45deg) translate(5px, -5px)" : "none"
                        }
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ f(Vn, { children: n && /* @__PURE__ */ f(
          N.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.3 },
            style: {
              background: M,
              overflow: "hidden",
              borderTop: "1px solid rgba(201,168,76,0.2)"
            },
            children: /* @__PURE__ */ f("div", { style: { padding: "16px 32px 24px" }, children: s.map((r) => /* @__PURE__ */ f(
              "a",
              {
                href: `#${r.toLowerCase()}`,
                onClick: () => i(!1),
                style: {
                  display: "block",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: L,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)"
                },
                children: r
              },
              r
            )) })
          }
        ) })
      ]
    }
  );
}
function Wu() {
  return /* @__PURE__ */ g(
    "section",
    {
      id: "hero",
      style: {
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: M
      },
      children: [
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${ku})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.35
            }
          }
        ),
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${M}ee 0%, ${M}99 50%, ${M}66 100%)`
            }
          }
        ),
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${T}, transparent)`
            }
          }
        ),
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              position: "relative",
              maxWidth: 1200,
              margin: "0 auto",
              padding: "120px 32px 80px",
              width: "100%"
            },
            children: /* @__PURE__ */ g(
              N.div,
              {
                initial: { opacity: 0, y: 60 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.9, ease: "easeOut" },
                style: { maxWidth: 680 },
                children: [
                  /* @__PURE__ */ f(
                    "div",
                    {
                      style: {
                        fontFamily: "'Lato', sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.25em",
                        color: T,
                        textTransform: "uppercase",
                        marginBottom: 20
                      },
                      children: "Washington State's Premier Window Treatment Studio"
                    }
                  ),
                  /* @__PURE__ */ g(
                    "h1",
                    {
                      style: {
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(42px, 6vw, 78px)",
                        fontWeight: 700,
                        lineHeight: 1.1,
                        color: L,
                        marginBottom: 28
                      },
                      children: [
                        "Dress Your Windows.",
                        " ",
                        /* @__PURE__ */ f("span", { style: { color: T, fontStyle: "italic" }, children: "Transform Your Home." })
                      ]
                    }
                  ),
                  /* @__PURE__ */ f(
                    "p",
                    {
                      style: {
                        fontFamily: "'Lato', sans-serif",
                        fontSize: 18,
                        fontWeight: 300,
                        lineHeight: 1.7,
                        color: "rgba(245,240,232,0.85)",
                        marginBottom: 44,
                        maxWidth: 520
                      },
                      children: "From Seattle to Spokane, Cascade Drape & Blinds brings luxury craftsmanship to every window. Custom-measured, expertly installed, and backed by our lifetime guarantee."
                    }
                  ),
                  /* @__PURE__ */ g("div", { className: "flex flex-wrap gap-4", children: [
                    /* @__PURE__ */ f(
                      "a",
                      {
                        href: "#contact",
                        style: {
                          display: "inline-block",
                          background: T,
                          color: M,
                          fontFamily: "'Lato', sans-serif",
                          fontWeight: 700,
                          fontSize: 13,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          padding: "16px 36px",
                          borderRadius: 2,
                          transition: "transform 0.2s, box-shadow 0.2s"
                        },
                        onMouseEnter: (t) => {
                          const e = t.target;
                          e.style.transform = "translateY(-2px)", e.style.boxShadow = "0 8px 24px rgba(201,168,76,0.4)";
                        },
                        onMouseLeave: (t) => {
                          const e = t.target;
                          e.style.transform = "translateY(0)", e.style.boxShadow = "none";
                        },
                        children: "Get a Free Estimate"
                      }
                    ),
                    /* @__PURE__ */ f(
                      "a",
                      {
                        href: "#services",
                        style: {
                          display: "inline-block",
                          background: "transparent",
                          color: L,
                          fontFamily: "'Lato', sans-serif",
                          fontWeight: 700,
                          fontSize: 13,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          padding: "16px 36px",
                          borderRadius: 2,
                          border: "1px solid rgba(245,240,232,0.4)",
                          transition: "border-color 0.2s, color 0.2s"
                        },
                        onMouseEnter: (t) => {
                          const e = t.target;
                          e.style.borderColor = T, e.style.color = T;
                        },
                        onMouseLeave: (t) => {
                          const e = t.target;
                          e.style.borderColor = "rgba(245,240,232,0.4)", e.style.color = L;
                        },
                        children: "View Our Services"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ f(
                    N.div,
                    {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { delay: 0.8, duration: 0.7 },
                      style: {
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 32,
                        marginTop: 64,
                        paddingTop: 40,
                        borderTop: "1px solid rgba(201,168,76,0.2)"
                      },
                      children: [
                        ["500+", "Homes Transformed"],
                        ["15+", "Years in Business"],
                        ["100%", "Satisfaction Guaranteed"]
                      ].map(([t, e]) => /* @__PURE__ */ g("div", { children: [
                        /* @__PURE__ */ f(
                          "div",
                          {
                            style: {
                              fontFamily: "'Playfair Display', serif",
                              fontSize: 32,
                              fontWeight: 700,
                              color: T
                            },
                            children: t
                          }
                        ),
                        /* @__PURE__ */ f(
                          "div",
                          {
                            style: {
                              fontFamily: "'Lato', sans-serif",
                              fontSize: 12,
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              color: "rgba(245,240,232,0.6)",
                              textTransform: "uppercase"
                            },
                            children: e
                          }
                        )
                      ] }, e))
                    }
                  )
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ g(
          N.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.2 },
            style: {
              position: "absolute",
              bottom: 32,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8
            },
            children: [
              /* @__PURE__ */ f(
                "span",
                {
                  style: {
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "rgba(245,240,232,0.4)",
                    textTransform: "uppercase"
                  },
                  children: "Scroll"
                }
              ),
              /* @__PURE__ */ f(
                N.div,
                {
                  animate: { y: [0, 8, 0] },
                  transition: { repeat: 1 / 0, duration: 1.5 },
                  style: {
                    width: 1,
                    height: 40,
                    background: `linear-gradient(to bottom, ${T}, transparent)`
                  }
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function ju() {
  return /* @__PURE__ */ f(
    "section",
    {
      id: "about",
      style: {
        background: M,
        padding: "96px 32px"
      },
      children: /* @__PURE__ */ g("div", { style: { maxWidth: 1200, margin: "0 auto" }, children: [
        /* @__PURE__ */ f(q, { children: /* @__PURE__ */ g("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ f(
            "p",
            {
              style: {
                fontFamily: "'Lato', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: T,
                textTransform: "uppercase",
                marginBottom: 12
              },
              children: "Why Choose Us"
            }
          ),
          /* @__PURE__ */ g(
            "h2",
            {
              style: {
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(30px, 4vw, 48px)",
                fontWeight: 700,
                color: L,
                lineHeight: 1.2
              },
              children: [
                "Washington's Most Trusted",
                " ",
                /* @__PURE__ */ f(
                  "span",
                  {
                    style: { color: T, fontStyle: "italic" },
                    children: "Window Treatment"
                  }
                ),
                " ",
                "Studio"
              ]
            }
          ),
          /* @__PURE__ */ f(Zt, {}),
          /* @__PURE__ */ f(
            "p",
            {
              style: {
                fontFamily: "'Lato', sans-serif",
                fontSize: 16,
                fontWeight: 300,
                color: "rgba(245,240,232,0.7)",
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.8
              },
              children: "Serving Seattle, Bellevue, Tacoma, Spokane, and everywhere in between since 2009 — we've built a reputation on precision, quality, and service that lasts."
            }
          )
        ] }) }),
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 32
            },
            children: [
              {
                icon: "🪟",
                title: "Custom Measurement",
                desc: "Every window is unique. Our specialists measure precisely — no guesswork, no gaps."
              },
              {
                icon: "🛠️",
                title: "Expert Installation",
                desc: "Certified installers with 15+ years of experience handle every project from start to finish."
              },
              {
                icon: "🌿",
                title: "Eco-Friendly Fabrics",
                desc: "We source sustainable, low-VOC materials that are safe for your family and the environment."
              },
              {
                icon: "🛡️",
                title: "Lifetime Warranty",
                desc: "We stand behind our work. Full warranty on materials and installation, forever."
              }
            ].map((e, n) => /* @__PURE__ */ f(q, { delay: n * 0.12, children: /* @__PURE__ */ g(
              N.div,
              {
                whileHover: { y: -6 },
                transition: { duration: 0.25 },
                style: {
                  background: "rgba(245,240,232,0.05)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: 4,
                  padding: "40px 32px",
                  textAlign: "center"
                },
                children: [
                  /* @__PURE__ */ f("div", { style: { fontSize: 36, marginBottom: 16 }, children: e.icon }),
                  /* @__PURE__ */ f(
                    "h3",
                    {
                      style: {
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 20,
                        fontWeight: 600,
                        color: L,
                        marginBottom: 12
                      },
                      children: e.title
                    }
                  ),
                  /* @__PURE__ */ f(
                    "p",
                    {
                      style: {
                        fontFamily: "'Lato', sans-serif",
                        fontSize: 14,
                        fontWeight: 300,
                        color: "rgba(245,240,232,0.65)",
                        lineHeight: 1.75
                      },
                      children: e.desc
                    }
                  )
                ]
              }
            ) }, e.title))
          }
        )
      ] })
    }
  );
}
const zu = [
  {
    id: 1,
    name: "Custom Drapery",
    price: "From $289/panel",
    img: "https://images.unsplash.com/photo-1704040686428-7534b262d0d8?w=500&h=380&fit=crop&auto=format",
    description: "Floor-to-ceiling drapes tailored to your exact window dimensions. Choose from 200+ fabric options including velvet, linen, silk, and blackout weaves.",
    features: [
      "Free in-home consultation",
      "200+ fabric selections",
      "Custom lining & interlining",
      "Professional installation included"
    ]
  },
  {
    id: 2,
    name: "Roller & Solar Shades",
    price: "From $149/window",
    img: "https://images.unsplash.com/photo-1613685703237-6628de38ddb7?w=500&h=380&fit=crop&auto=format",
    description: "Sleek, modern roller shades with precise light-filtering control. Solar shades reduce glare while preserving your view of the Pacific Northwest landscape.",
    features: [
      "Motorized & manual options",
      "UV-blocking solar fabrics",
      "Blackout & room-darkening",
      "Cordless child-safe design"
    ]
  },
  {
    id: 3,
    name: "Wood & Faux Wood Blinds",
    price: "From $199/window",
    img: "https://images.unsplash.com/photo-1712940806345-ea8ce290956e?w=500&h=380&fit=crop&auto=format",
    description: "Timeless warmth meets lasting durability. Real basswood and high-quality faux wood blinds resist humidity — perfect for Seattle's wet climate.",
    features: [
      "Real & faux wood options",
      "Moisture-resistant finish",
      "Multiple stain & paint colors",
      "2″ and 2½″ slat sizes"
    ]
  },
  {
    id: 4,
    name: "Motorized Smart Shades",
    price: "From $449/window",
    img: "https://images.unsplash.com/photo-1779505576192-803dd8c9b55a?w=500&h=380&fit=crop&auto=format",
    description: "Automate your window treatments with voice-control, app integration, and smart-home compatibility. Schedule sunrise/sunset scenes effortlessly.",
    features: [
      "Alexa, Google & Apple HomeKit",
      "Battery-powered or hardwired",
      "Scene & schedule programming",
      "Free smart-home setup"
    ]
  },
  {
    id: 5,
    name: "Roman & Woven Shades",
    price: "From $219/window",
    img: "https://images.unsplash.com/photo-1643949914872-317d6047f107?w=500&h=380&fit=crop&auto=format",
    description: "Soft, structured elegance that frames every window beautifully. Our Roman shades fold gracefully and woven woods bring natural texture to any room.",
    features: [
      "Flat, relaxed & hobbled folds",
      "Natural grass & bamboo weaves",
      "Custom fabric sourcing",
      "Lined & unlined options"
    ]
  },
  {
    id: 6,
    name: "Commercial Window Solutions",
    price: "Custom Quote",
    img: "https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?w=500&h=380&fit=crop&auto=format",
    description: "Offices, restaurants, hotels, and retail spaces across Washington trust us for large-scale installations, acoustic panels, and privacy solutions.",
    features: [
      "Volume pricing available",
      "ADA-compliant options",
      "Fire-rated & contract fabrics",
      "Project management included"
    ]
  }
];
function Nu() {
  const [t, e] = tt(null);
  return /* @__PURE__ */ f(
    "section",
    {
      id: "services",
      style: { background: L, padding: "96px 32px" },
      children: /* @__PURE__ */ g("div", { style: { maxWidth: 1200, margin: "0 auto" }, children: [
        /* @__PURE__ */ f(q, { children: /* @__PURE__ */ g("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ f(
            "p",
            {
              style: {
                fontFamily: "'Lato', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: T,
                textTransform: "uppercase",
                marginBottom: 12
              },
              children: "What We Offer"
            }
          ),
          /* @__PURE__ */ g(
            "h2",
            {
              style: {
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(30px, 4vw, 48px)",
                fontWeight: 700,
                color: M,
                lineHeight: 1.2
              },
              children: [
                "Six Ways We Can",
                " ",
                /* @__PURE__ */ f(
                  "span",
                  {
                    style: { color: T, fontStyle: "italic" },
                    children: "Elevate Your Space"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ f(Zt, {}),
          /* @__PURE__ */ f(
            "p",
            {
              style: {
                fontFamily: "'Lato', sans-serif",
                fontSize: 16,
                fontWeight: 300,
                color: Gt,
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.8
              },
              children: "Every service includes a complimentary in-home consultation, professional installation, and our satisfaction guarantee."
            }
          )
        ] }) }),
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 28
            },
            children: zu.map((n, i) => /* @__PURE__ */ f(q, { delay: i * 0.08, children: /* @__PURE__ */ g(
              N.div,
              {
                whileHover: { y: -4 },
                transition: { duration: 0.25 },
                style: {
                  background: "#fff",
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1px solid rgba(26,39,68,0.08)",
                  boxShadow: "0 2px 20px rgba(26,39,68,0.06)",
                  cursor: "pointer"
                },
                onClick: () => e(t === n.id ? null : n.id),
                children: [
                  /* @__PURE__ */ g(
                    "div",
                    {
                      style: {
                        height: 220,
                        backgroundImage: `url(${n.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative"
                      },
                      children: [
                        /* @__PURE__ */ f(
                          "div",
                          {
                            style: {
                              position: "absolute",
                              inset: 0,
                              background: "linear-gradient(to top, rgba(26,39,68,0.7) 0%, transparent 60%)"
                            }
                          }
                        ),
                        /* @__PURE__ */ g(
                          "div",
                          {
                            style: {
                              position: "absolute",
                              bottom: 16,
                              left: 20,
                              right: 20,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-end"
                            },
                            children: [
                              /* @__PURE__ */ f(
                                "span",
                                {
                                  style: {
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: L
                                  },
                                  children: n.name
                                }
                              ),
                              /* @__PURE__ */ f(
                                "span",
                                {
                                  style: {
                                    fontFamily: "'Lato', sans-serif",
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: T,
                                    background: "rgba(26,39,68,0.6)",
                                    padding: "4px 10px",
                                    borderRadius: 2
                                  },
                                  children: n.price
                                }
                              )
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ g("div", { style: { padding: "24px 24px 20px" }, children: [
                    /* @__PURE__ */ f(
                      "p",
                      {
                        style: {
                          fontFamily: "'Lato', sans-serif",
                          fontSize: 14,
                          fontWeight: 300,
                          color: Gt,
                          lineHeight: 1.75,
                          marginBottom: 16
                        },
                        children: n.description
                      }
                    ),
                    /* @__PURE__ */ f(Vn, { children: t === n.id && /* @__PURE__ */ f(
                      N.ul,
                      {
                        initial: { height: 0, opacity: 0 },
                        animate: { height: "auto", opacity: 1 },
                        exit: { height: 0, opacity: 0 },
                        transition: { duration: 0.3 },
                        style: {
                          overflow: "hidden",
                          listStyle: "none",
                          padding: 0,
                          margin: "0 0 16px"
                        },
                        children: n.features.map((s) => /* @__PURE__ */ g(
                          "li",
                          {
                            style: {
                              fontFamily: "'Lato', sans-serif",
                              fontSize: 13,
                              color: M,
                              padding: "5px 0",
                              display: "flex",
                              alignItems: "center",
                              gap: 10
                            },
                            children: [
                              /* @__PURE__ */ f(
                                "span",
                                {
                                  style: {
                                    color: T,
                                    fontWeight: 700
                                  },
                                  children: "✓"
                                }
                              ),
                              s
                            ]
                          },
                          s
                        ))
                      }
                    ) }),
                    /* @__PURE__ */ f(
                      "button",
                      {
                        onClick: (s) => {
                          s.stopPropagation(), e(
                            t === n.id ? null : n.id
                          );
                        },
                        style: {
                          fontFamily: "'Lato', sans-serif",
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: T,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: 6
                        },
                        children: t === n.id ? "Less Info ↑" : "Learn More ↓"
                      }
                    )
                  ] })
                ]
              }
            ) }, n.id))
          }
        ),
        /* @__PURE__ */ f(q, { delay: 0.2, children: /* @__PURE__ */ f("div", { className: "text-center mt-14", children: /* @__PURE__ */ f(
          "a",
          {
            href: "#contact",
            style: {
              display: "inline-block",
              background: M,
              color: L,
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "16px 48px",
              borderRadius: 2,
              transition: "background 0.2s"
            },
            onMouseEnter: (n) => n.target.style.background = "#0f1a33",
            onMouseLeave: (n) => n.target.style.background = M,
            children: "Book Your Free Consultation"
          }
        ) }) })
      ] })
    }
  );
}
function _u() {
  const [t, e] = tt(null);
  return /* @__PURE__ */ f(
    "section",
    {
      id: "gallery",
      style: { background: jo, padding: "96px 32px" },
      children: /* @__PURE__ */ g("div", { style: { maxWidth: 1200, margin: "0 auto" }, children: [
        /* @__PURE__ */ f(q, { children: /* @__PURE__ */ g("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ f(
            "p",
            {
              style: {
                fontFamily: "'Lato', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: T,
                textTransform: "uppercase",
                marginBottom: 12
              },
              children: "Our Portfolio"
            }
          ),
          /* @__PURE__ */ g(
            "h2",
            {
              style: {
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(30px, 4vw, 48px)",
                fontWeight: 700,
                color: M,
                lineHeight: 1.2
              },
              children: [
                "Real Homes.",
                " ",
                /* @__PURE__ */ f(
                  "span",
                  {
                    style: { color: T, fontStyle: "italic" },
                    children: "Real Results."
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ f(Zt, {})
        ] }) }),
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16
            },
            children: Bu.map((n, i) => /* @__PURE__ */ f(q, { delay: i * 0.07, children: /* @__PURE__ */ g(
              N.div,
              {
                style: {
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                  background: M,
                  aspectRatio: "4/5"
                },
                onMouseEnter: () => e(i),
                onMouseLeave: () => e(null),
                children: [
                  /* @__PURE__ */ f(
                    N.img,
                    {
                      src: n.url,
                      alt: n.label,
                      animate: { scale: t === i ? 1.06 : 1 },
                      transition: { duration: 0.4 },
                      style: {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block"
                      }
                    }
                  ),
                  /* @__PURE__ */ f(
                    N.div,
                    {
                      animate: { opacity: t === i ? 1 : 0 },
                      transition: { duration: 0.3 },
                      style: {
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(26,39,68,0.85) 0%, transparent 55%)",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: 20
                      },
                      children: /* @__PURE__ */ f(
                        "span",
                        {
                          style: {
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 16,
                            fontWeight: 600,
                            color: L
                          },
                          children: n.label
                        }
                      )
                    }
                  )
                ]
              }
            ) }, i))
          }
        )
      ] })
    }
  );
}
function Uu() {
  return /* @__PURE__ */ f(
    "section",
    {
      id: "pricing",
      style: { background: L, padding: "96px 32px" },
      children: /* @__PURE__ */ g("div", { style: { maxWidth: 1100, margin: "0 auto" }, children: [
        /* @__PURE__ */ f(q, { children: /* @__PURE__ */ g("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ f(
            "p",
            {
              style: {
                fontFamily: "'Lato', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: T,
                textTransform: "uppercase",
                marginBottom: 12
              },
              children: "Transparent Pricing"
            }
          ),
          /* @__PURE__ */ g(
            "h2",
            {
              style: {
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(30px, 4vw, 48px)",
                fontWeight: 700,
                color: M,
                lineHeight: 1.2
              },
              children: [
                "Simple Packages.",
                " ",
                /* @__PURE__ */ f(
                  "span",
                  {
                    style: { color: T, fontStyle: "italic" },
                    children: "No Hidden Fees."
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ f(Zt, {}),
          /* @__PURE__ */ f(
            "p",
            {
              style: {
                fontFamily: "'Lato', sans-serif",
                fontSize: 16,
                fontWeight: 300,
                color: Gt,
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.8
              },
              children: "All packages include free in-home measurement and professional installation. Commercial projects receive custom quotes."
            }
          )
        ] }) }),
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
              alignItems: "start"
            },
            children: [
              {
                name: "Essential",
                price: "$149",
                per: "per window",
                color: L,
                textColor: M,
                accent: T,
                highlight: !1,
                features: [
                  "Roller or solar shades",
                  "3 fabric choices",
                  "In-home measurement",
                  "Professional installation",
                  "1-year warranty"
                ],
                cta: "Get Started"
              },
              {
                name: "Signature",
                price: "$289",
                per: "per window",
                color: M,
                textColor: L,
                accent: T,
                highlight: !0,
                badge: "Most Popular",
                features: [
                  "Custom drapery or wood blinds",
                  "200+ fabric selections",
                  "Complimentary consultation",
                  "Professional installation",
                  "5-year warranty",
                  "Free hardware included"
                ],
                cta: "Choose Signature"
              },
              {
                name: "Prestige",
                price: "$449+",
                per: "per window",
                color: Fu,
                textColor: M,
                accent: M,
                highlight: !1,
                features: [
                  "Motorized smart shades",
                  "Smart-home integration",
                  "Premium fabric catalog",
                  "Full project management",
                  "Lifetime warranty",
                  "Annual maintenance visit"
                ],
                cta: "Go Prestige"
              }
            ].map((e, n) => /* @__PURE__ */ f(q, { delay: n * 0.12, children: /* @__PURE__ */ g(
              N.div,
              {
                whileHover: { y: -6 },
                transition: { duration: 0.25 },
                style: {
                  background: e.color,
                  borderRadius: 4,
                  padding: e.highlight ? "44px 36px" : "36px 32px",
                  border: e.highlight ? `2px solid ${T}` : "1px solid rgba(26,39,68,0.1)",
                  boxShadow: e.highlight ? "0 20px 60px rgba(201,168,76,0.2)" : "none",
                  position: "relative",
                  overflow: "hidden"
                },
                children: [
                  e.badge && /* @__PURE__ */ f(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        top: 16,
                        right: -28,
                        background: T,
                        color: M,
                        fontFamily: "'Lato', sans-serif",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "5px 40px",
                        transform: "rotate(45deg)"
                      },
                      children: e.badge
                    }
                  ),
                  /* @__PURE__ */ f(
                    "p",
                    {
                      style: {
                        fontFamily: "'Lato', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: e.accent,
                        marginBottom: 12
                      },
                      children: e.name
                    }
                  ),
                  /* @__PURE__ */ f(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "baseline",
                        gap: 6,
                        marginBottom: 4
                      },
                      children: /* @__PURE__ */ f(
                        "span",
                        {
                          style: {
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 52,
                            fontWeight: 700,
                            color: e.textColor,
                            lineHeight: 1
                          },
                          children: e.price
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ f(
                    "p",
                    {
                      style: {
                        fontFamily: "'Lato', sans-serif",
                        fontSize: 12,
                        color: e.textColor,
                        opacity: 0.6,
                        marginBottom: 28,
                        letterSpacing: "0.05em"
                      },
                      children: e.per
                    }
                  ),
                  /* @__PURE__ */ f(
                    "div",
                    {
                      style: {
                        height: 1,
                        background: e.highlight ? "rgba(201,168,76,0.3)" : "rgba(26,39,68,0.1)",
                        marginBottom: 24
                      }
                    }
                  ),
                  /* @__PURE__ */ f(
                    "ul",
                    {
                      style: {
                        listStyle: "none",
                        padding: 0,
                        marginBottom: 32
                      },
                      children: e.features.map((i) => /* @__PURE__ */ g(
                        "li",
                        {
                          style: {
                            fontFamily: "'Lato', sans-serif",
                            fontSize: 14,
                            color: e.textColor,
                            padding: "7px 0",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            opacity: 0.9
                          },
                          children: [
                            /* @__PURE__ */ f(
                              "span",
                              {
                                style: {
                                  color: e.accent,
                                  fontWeight: 700
                                },
                                children: "✓"
                              }
                            ),
                            i
                          ]
                        },
                        i
                      ))
                    }
                  ),
                  /* @__PURE__ */ f(
                    "a",
                    {
                      href: "#contact",
                      style: {
                        display: "block",
                        textAlign: "center",
                        background: e.highlight ? T : "transparent",
                        color: e.highlight ? M : e.textColor,
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        padding: "14px 24px",
                        borderRadius: 2,
                        border: e.highlight ? "none" : `1px solid ${e.textColor}44`,
                        transition: "opacity 0.2s"
                      },
                      onMouseEnter: (i) => i.target.style.opacity = "0.8",
                      onMouseLeave: (i) => i.target.style.opacity = "1",
                      children: e.cta
                    }
                  )
                ]
              }
            ) }, e.name))
          }
        )
      ] })
    }
  );
}
function $u() {
  const t = [
    {
      name: "Sarah M.",
      loc: "Bellevue, WA",
      stars: 5,
      text: "Cascade Drape completely transformed our living room. The custom drapes are absolutely stunning and the installation team was professional and efficient. Worth every penny!",
      service: "Custom Drapery"
    },
    {
      name: "James R.",
      loc: "Seattle, WA",
      stars: 5,
      text: "We had motorized shades installed throughout our home and the smart integration is flawless. Now my morning routine includes the blinds opening automatically with the sunrise. Life-changing!",
      service: "Motorized Smart Shades"
    },
    {
      name: "Linda & Tom K.",
      loc: "Tacoma, WA",
      stars: 5,
      text: "From the initial consultation to final installation, the entire experience was seamless. They listened to exactly what we wanted and delivered beyond our expectations.",
      service: "Wood Blinds"
    },
    {
      name: "Priya N.",
      loc: "Spokane, WA",
      stars: 5,
      text: "I'm a repeat customer — Cascade Drape has done every room in my house over four years. Consistent quality, fair pricing, and they stand behind their warranty 100%.",
      service: "Roman Shades"
    }
  ], [e, n] = tt(0);
  return /* @__PURE__ */ g(
    "section",
    {
      style: {
        background: M,
        padding: "96px 32px",
        position: "relative",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${T}, transparent)`
            }
          }
        ),
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${T}, transparent)`
            }
          }
        ),
        /* @__PURE__ */ g(
          "div",
          {
            style: {
              maxWidth: 800,
              margin: "0 auto",
              textAlign: "center"
            },
            children: [
              /* @__PURE__ */ g(q, { children: [
                /* @__PURE__ */ f(
                  "p",
                  {
                    style: {
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.25em",
                      color: T,
                      textTransform: "uppercase",
                      marginBottom: 12
                    },
                    children: "Client Stories"
                  }
                ),
                /* @__PURE__ */ g(
                  "h2",
                  {
                    style: {
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(28px, 4vw, 44px)",
                      fontWeight: 700,
                      color: L,
                      lineHeight: 1.2,
                      marginBottom: 16
                    },
                    children: [
                      "What Our",
                      " ",
                      /* @__PURE__ */ f("span", { style: { color: T, fontStyle: "italic" }, children: "Washington Clients" }),
                      " ",
                      "Say"
                    ]
                  }
                ),
                /* @__PURE__ */ f(Zt, {})
              ] }),
              /* @__PURE__ */ g("div", { style: { marginTop: 48 }, children: [
                /* @__PURE__ */ f(Vn, { mode: "wait", children: /* @__PURE__ */ g(
                  N.div,
                  {
                    initial: { opacity: 0, x: 30 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: -30 },
                    transition: { duration: 0.4 },
                    children: [
                      /* @__PURE__ */ f(
                        "div",
                        {
                          style: {
                            fontSize: 48,
                            color: T,
                            fontFamily: "serif",
                            lineHeight: 1,
                            marginBottom: 8,
                            opacity: 0.6
                          },
                          children: '"'
                        }
                      ),
                      /* @__PURE__ */ f(
                        "p",
                        {
                          style: {
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "clamp(16px, 2.5vw, 22px)",
                            fontStyle: "italic",
                            color: L,
                            lineHeight: 1.7,
                            marginBottom: 32
                          },
                          children: t[e].text
                        }
                      ),
                      /* @__PURE__ */ f(
                        "div",
                        {
                          style: {
                            display: "flex",
                            justifyContent: "center",
                            gap: 4,
                            marginBottom: 16
                          },
                          children: Array.from({
                            length: t[e].stars
                          }).map((i, s) => /* @__PURE__ */ f(
                            "span",
                            {
                              style: { color: T, fontSize: 18 },
                              children: "★"
                            },
                            s
                          ))
                        }
                      ),
                      /* @__PURE__ */ f(
                        "p",
                        {
                          style: {
                            fontFamily: "'Lato', sans-serif",
                            fontSize: 14,
                            fontWeight: 700,
                            color: L,
                            letterSpacing: "0.05em"
                          },
                          children: t[e].name
                        }
                      ),
                      /* @__PURE__ */ g(
                        "p",
                        {
                          style: {
                            fontFamily: "'Lato', sans-serif",
                            fontSize: 12,
                            color: "rgba(245,240,232,0.5)",
                            marginTop: 4
                          },
                          children: [
                            t[e].loc,
                            " ·",
                            " ",
                            t[e].service
                          ]
                        }
                      )
                    ]
                  },
                  e
                ) }),
                /* @__PURE__ */ f(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      gap: 10,
                      marginTop: 40
                    },
                    children: t.map((i, s) => /* @__PURE__ */ f(
                      "button",
                      {
                        onClick: () => n(s),
                        style: {
                          width: s === e ? 28 : 8,
                          height: 8,
                          borderRadius: 4,
                          background: s === e ? T : "rgba(201,168,76,0.3)",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          transition: "width 0.3s, background 0.3s"
                        },
                        "aria-label": `Review ${s + 1}`
                      },
                      s
                    ))
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function Hu() {
  const [t, e] = tt({
    name: "",
    email: "",
    phone: "",
    city: "",
    service: "",
    message: ""
  }), [n, i] = tt(!1), s = (l) => e({ ...t, [l.target.name]: l.target.value }), r = (l) => {
    l.preventDefault(), i(!0);
  }, o = {
    width: "100%",
    fontFamily: "'Lato', sans-serif",
    fontSize: 15,
    fontWeight: 400,
    color: M,
    background: "#fff",
    border: "1px solid rgba(26,39,68,0.18)",
    borderRadius: 2,
    padding: "13px 16px",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box"
  }, a = {
    fontFamily: "'Lato', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: M,
    display: "block",
    marginBottom: 8
  };
  return /* @__PURE__ */ f(
    "section",
    {
      id: "contact",
      style: {
        background: jo,
        padding: "96px 32px"
      },
      children: /* @__PURE__ */ f("div", { style: { maxWidth: 1100, margin: "0 auto" }, children: /* @__PURE__ */ g(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
            gap: 64,
            alignItems: "start"
          },
          className: "contact-grid",
          children: [
            /* @__PURE__ */ f(q, { children: /* @__PURE__ */ g("div", { children: [
              /* @__PURE__ */ f(
                "p",
                {
                  style: {
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    color: T,
                    textTransform: "uppercase",
                    marginBottom: 12
                  },
                  children: "Request an Estimate"
                }
              ),
              /* @__PURE__ */ g(
                "h2",
                {
                  style: {
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(28px, 3.5vw, 44px)",
                    fontWeight: 700,
                    color: M,
                    lineHeight: 1.2,
                    marginBottom: 20
                  },
                  children: [
                    "Ready to Transform Your",
                    " ",
                    /* @__PURE__ */ f(
                      "span",
                      {
                        style: { color: T, fontStyle: "italic" },
                        children: "Windows?"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ f(
                "p",
                {
                  style: {
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 16,
                    fontWeight: 300,
                    color: Gt,
                    lineHeight: 1.8,
                    marginBottom: 40
                  },
                  children: "Fill out the form and one of our design specialists will reach out within one business day to schedule your complimentary in-home consultation. No pressure. No obligation."
                }
              ),
              /* @__PURE__ */ f(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 24
                  },
                  children: [
                    {
                      icon: "📞",
                      label: "Call Us",
                      value: "(206) 555-0182"
                    },
                    {
                      icon: "✉️",
                      label: "Email",
                      value: "hello@cascadedrape.com"
                    },
                    {
                      icon: "📍",
                      label: "Service Area",
                      value: "Greater Seattle, Tacoma, Bellevue & Eastern WA"
                    },
                    {
                      icon: "🕐",
                      label: "Hours",
                      value: "Mon–Sat 8am–6pm · Sundays by appointment"
                    }
                  ].map((l) => /* @__PURE__ */ g(
                    "div",
                    {
                      style: { display: "flex", gap: 16 },
                      children: [
                        /* @__PURE__ */ f("span", { style: { fontSize: 20 }, children: l.icon }),
                        /* @__PURE__ */ g("div", { children: [
                          /* @__PURE__ */ f(
                            "p",
                            {
                              style: {
                                fontFamily: "'Lato', sans-serif",
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: T,
                                marginBottom: 4
                              },
                              children: l.label
                            }
                          ),
                          /* @__PURE__ */ f(
                            "p",
                            {
                              style: {
                                fontFamily: "'Lato', sans-serif",
                                fontSize: 15,
                                color: M,
                                fontWeight: 400
                              },
                              children: l.value
                            }
                          )
                        ] })
                      ]
                    },
                    l.label
                  ))
                }
              )
            ] }) }),
            /* @__PURE__ */ f(q, { delay: 0.15, children: /* @__PURE__ */ f(
              "div",
              {
                style: {
                  background: "#fff",
                  borderRadius: 4,
                  padding: "48px 40px",
                  boxShadow: "0 8px 40px rgba(26,39,68,0.08)",
                  border: "1px solid rgba(26,39,68,0.06)"
                },
                children: n ? /* @__PURE__ */ g(
                  N.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { duration: 0.4 },
                    style: {
                      textAlign: "center",
                      padding: "40px 0"
                    },
                    children: [
                      /* @__PURE__ */ f(
                        "div",
                        {
                          style: { fontSize: 56, marginBottom: 16 },
                          children: "🎉"
                        }
                      ),
                      /* @__PURE__ */ f(
                        "h3",
                        {
                          style: {
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 28,
                            fontWeight: 700,
                            color: M,
                            marginBottom: 12
                          },
                          children: "Thank You!"
                        }
                      ),
                      /* @__PURE__ */ f(
                        "p",
                        {
                          style: {
                            fontFamily: "'Lato', sans-serif",
                            fontSize: 15,
                            color: Gt,
                            lineHeight: 1.7
                          },
                          children: "We've received your request and will contact you within one business day to schedule your free consultation."
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ g("form", { onSubmit: r, children: [
                  /* @__PURE__ */ g(
                    "div",
                    {
                      style: {
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 20,
                        marginBottom: 20
                      },
                      children: [
                        /* @__PURE__ */ g("div", { children: [
                          /* @__PURE__ */ f("label", { htmlFor: "name", style: a, children: "Full Name *" }),
                          /* @__PURE__ */ f(
                            "input",
                            {
                              id: "name",
                              name: "name",
                              required: !0,
                              value: t.name,
                              onChange: s,
                              placeholder: "Jane Smith",
                              style: o,
                              onFocus: (l) => l.target.style.borderColor = T,
                              onBlur: (l) => l.target.style.borderColor = "rgba(26,39,68,0.18)"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ g("div", { children: [
                          /* @__PURE__ */ f("label", { htmlFor: "phone", style: a, children: "Phone Number" }),
                          /* @__PURE__ */ f(
                            "input",
                            {
                              id: "phone",
                              name: "phone",
                              value: t.phone,
                              onChange: s,
                              placeholder: "(206) 555-0000",
                              style: o,
                              onFocus: (l) => l.target.style.borderColor = T,
                              onBlur: (l) => l.target.style.borderColor = "rgba(26,39,68,0.18)"
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ g("div", { style: { marginBottom: 20 }, children: [
                    /* @__PURE__ */ f("label", { htmlFor: "email", style: a, children: "Email Address *" }),
                    /* @__PURE__ */ f(
                      "input",
                      {
                        id: "email",
                        name: "email",
                        type: "email",
                        required: !0,
                        value: t.email,
                        onChange: s,
                        placeholder: "jane@example.com",
                        style: o,
                        onFocus: (l) => l.target.style.borderColor = T,
                        onBlur: (l) => l.target.style.borderColor = "rgba(26,39,68,0.18)"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ g(
                    "div",
                    {
                      style: {
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 20,
                        marginBottom: 20
                      },
                      children: [
                        /* @__PURE__ */ g("div", { children: [
                          /* @__PURE__ */ f("label", { htmlFor: "city", style: a, children: "Your City" }),
                          /* @__PURE__ */ f(
                            "input",
                            {
                              id: "city",
                              name: "city",
                              value: t.city,
                              onChange: s,
                              placeholder: "Seattle",
                              style: o,
                              onFocus: (l) => l.target.style.borderColor = T,
                              onBlur: (l) => l.target.style.borderColor = "rgba(26,39,68,0.18)"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ g("div", { children: [
                          /* @__PURE__ */ f(
                            "label",
                            {
                              htmlFor: "service",
                              style: a,
                              children: "Service Interest"
                            }
                          ),
                          /* @__PURE__ */ g(
                            "select",
                            {
                              id: "service",
                              name: "service",
                              value: t.service,
                              onChange: s,
                              style: {
                                ...o,
                                cursor: "pointer"
                              },
                              onFocus: (l) => l.target.style.borderColor = T,
                              onBlur: (l) => l.target.style.borderColor = "rgba(26,39,68,0.18)",
                              children: [
                                /* @__PURE__ */ f("option", { value: "", children: "Select a service" }),
                                /* @__PURE__ */ f("option", { children: "Custom Drapery" }),
                                /* @__PURE__ */ f("option", { children: "Roller & Solar Shades" }),
                                /* @__PURE__ */ f("option", { children: "Wood & Faux Wood Blinds" }),
                                /* @__PURE__ */ f("option", { children: "Motorized Smart Shades" }),
                                /* @__PURE__ */ f("option", { children: "Roman & Woven Shades" }),
                                /* @__PURE__ */ f("option", { children: "Commercial Solutions" })
                              ]
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ g("div", { style: { marginBottom: 28 }, children: [
                    /* @__PURE__ */ f("label", { htmlFor: "message", style: a, children: "Tell Us About Your Project" }),
                    /* @__PURE__ */ f(
                      "textarea",
                      {
                        id: "message",
                        name: "message",
                        rows: 4,
                        value: t.message,
                        onChange: s,
                        placeholder: "How many windows, preferred style, timeline...",
                        style: {
                          ...o,
                          resize: "vertical",
                          minHeight: 100
                        },
                        onFocus: (l) => l.target.style.borderColor = T,
                        onBlur: (l) => l.target.style.borderColor = "rgba(26,39,68,0.18)"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ f(
                    "button",
                    {
                      type: "submit",
                      style: {
                        width: "100%",
                        background: M,
                        color: L,
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        border: "none",
                        borderRadius: 2,
                        padding: "16px 24px",
                        cursor: "pointer",
                        transition: "background 0.2s, color 0.2s"
                      },
                      onMouseEnter: (l) => {
                        const u = l.target;
                        u.style.background = T, u.style.color = M;
                      },
                      onMouseLeave: (l) => {
                        const u = l.target;
                        u.style.background = M, u.style.color = L;
                      },
                      children: "Request My Free Consultation →"
                    }
                  ),
                  /* @__PURE__ */ f(
                    "p",
                    {
                      style: {
                        fontFamily: "'Lato', sans-serif",
                        fontSize: 12,
                        color: "rgba(26,39,68,0.45)",
                        textAlign: "center",
                        marginTop: 14,
                        lineHeight: 1.6
                      },
                      children: "We respect your privacy. No spam, ever. We'll only contact you about your project."
                    }
                  )
                ] })
              }
            ) })
          ]
        }
      ) })
    }
  );
}
function Gu() {
  return /* @__PURE__ */ f(
    "footer",
    {
      style: {
        background: "#0f1a33",
        padding: "56px 32px 32px"
      },
      children: /* @__PURE__ */ g("div", { style: { maxWidth: 1200, margin: "0 auto" }, children: [
        /* @__PURE__ */ g(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 48,
              marginBottom: 48
            },
            children: [
              /* @__PURE__ */ g("div", { children: [
                /* @__PURE__ */ g("div", { style: { marginBottom: 16 }, children: [
                  /* @__PURE__ */ f(
                    "span",
                    {
                      style: {
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 20,
                        fontWeight: 700,
                        color: L
                      },
                      children: "Cascade Drape"
                    }
                  ),
                  /* @__PURE__ */ f(
                    "span",
                    {
                      style: {
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 20,
                        color: T,
                        marginLeft: 6,
                        fontStyle: "italic"
                      },
                      children: "& Blinds"
                    }
                  )
                ] }),
                /* @__PURE__ */ f(
                  "p",
                  {
                    style: {
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 13,
                      fontWeight: 300,
                      color: "rgba(245,240,232,0.55)",
                      lineHeight: 1.75,
                      maxWidth: 220
                    },
                    children: "Washington State's premier custom window treatment studio since 2009. Luxury craftsmanship, expert installation."
                  }
                )
              ] }),
              /* @__PURE__ */ g("div", { children: [
                /* @__PURE__ */ f(
                  "p",
                  {
                    style: {
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: T,
                      marginBottom: 16
                    },
                    children: "Services"
                  }
                ),
                [
                  "Custom Drapery",
                  "Roller & Solar Shades",
                  "Wood Blinds",
                  "Motorized Smart Shades",
                  "Roman & Woven Shades",
                  "Commercial Solutions"
                ].map((t) => /* @__PURE__ */ f(
                  "a",
                  {
                    href: "#services",
                    style: {
                      display: "block",
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 13,
                      color: "rgba(245,240,232,0.55)",
                      textDecoration: "none",
                      marginBottom: 9,
                      transition: "color 0.2s"
                    },
                    onMouseEnter: (e) => e.target.style.color = T,
                    onMouseLeave: (e) => e.target.style.color = "rgba(245,240,232,0.55)",
                    children: t
                  },
                  t
                ))
              ] }),
              /* @__PURE__ */ g("div", { children: [
                /* @__PURE__ */ f(
                  "p",
                  {
                    style: {
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: T,
                      marginBottom: 16
                    },
                    children: "Service Areas"
                  }
                ),
                [
                  "Seattle",
                  "Bellevue",
                  "Tacoma",
                  "Redmond",
                  "Kirkland",
                  "Spokane",
                  "Olympia",
                  "Everett"
                ].map((t) => /* @__PURE__ */ g(
                  "p",
                  {
                    style: {
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 13,
                      color: "rgba(245,240,232,0.55)",
                      marginBottom: 8
                    },
                    children: [
                      t,
                      ", WA"
                    ]
                  },
                  t
                ))
              ] }),
              /* @__PURE__ */ g("div", { children: [
                /* @__PURE__ */ f(
                  "p",
                  {
                    style: {
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: T,
                      marginBottom: 16
                    },
                    children: "Contact"
                  }
                ),
                /* @__PURE__ */ g(
                  "p",
                  {
                    style: {
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 13,
                      color: "rgba(245,240,232,0.55)",
                      lineHeight: 1.75,
                      marginBottom: 20
                    },
                    children: [
                      "(206) 555-0182",
                      /* @__PURE__ */ f("br", {}),
                      "hello@cascadedrape.com",
                      /* @__PURE__ */ f("br", {}),
                      "Mon–Sat 8am–6pm"
                    ]
                  }
                ),
                /* @__PURE__ */ f(
                  "a",
                  {
                    href: "#contact",
                    style: {
                      display: "inline-block",
                      background: T,
                      color: M,
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      padding: "10px 20px",
                      borderRadius: 2,
                      transition: "opacity 0.2s"
                    },
                    onMouseEnter: (t) => t.target.style.opacity = "0.85",
                    onMouseLeave: (t) => t.target.style.opacity = "1",
                    children: "Free Quote"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ g(
          "div",
          {
            style: {
              borderTop: "1px solid rgba(201,168,76,0.15)",
              paddingTop: 24,
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "space-between",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ f(
                "p",
                {
                  style: {
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 12,
                    color: "rgba(245,240,232,0.35)"
                  },
                  children: "© 2024 Cascade Drape & Blinds Co. · Licensed & Insured in Washington State · All Rights Reserved"
                }
              ),
              /* @__PURE__ */ f(
                "p",
                {
                  style: {
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 12,
                    color: "rgba(245,240,232,0.35)"
                  },
                  children: "Privacy Policy · Terms of Service"
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
function Ku() {
  return /* @__PURE__ */ g(
    "div",
    {
      style: {
        fontFamily: "'Lato', sans-serif",
        overflowX: "hidden"
      },
      children: [
        /* @__PURE__ */ f(Ou, {}),
        /* @__PURE__ */ f(Wu, {}),
        /* @__PURE__ */ f(ju, {}),
        /* @__PURE__ */ f(Nu, {}),
        /* @__PURE__ */ f(_u, {}),
        /* @__PURE__ */ f(Uu, {}),
        /* @__PURE__ */ f($u, {}),
        /* @__PURE__ */ f(Hu, {}),
        /* @__PURE__ */ f(Gu, {})
      ]
    }
  );
}
const Yu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ku
}, Symbol.toStringTag, { value: "Module" }));
export {
  qu as Code0_8
};
