const Ch = () => Promise.resolve().then(() => Sh), uo = globalThis.__GLOBALS__.ReactJSXRuntime, { Fragment: Xe, jsx: d, jsxs: p } = uo;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
function gi(e) {
  const t = e?.props?._fgT, n = typeof t == "function" || typeof t == "string" || typeof t == "object" && t !== null && "$$typeof" in t;
  return globalThis.__GLOBALS__.React.isValidElement(e) && n;
}
function $e(e) {
  return globalThis.__GLOBALS__.React.isValidElement(e) && e.type === "fg-txt";
}
function yi(e) {
  const { _fgT: t, _fgS: n, _fgB: s, _fgD: i, ...o } = e.props;
  return globalThis.__GLOBALS__.React.createElement(t, {
    ...o,
    key: e.key
  }, o.children);
}
function rt(e) {
  return gi(e) ? yi(e) : $e(e) ? e.props.children : e;
}
const Oe = globalThis.__GLOBALS__.React.Children, ho = {
  map(e, t, n) {
    return Oe.map(e, (s, i) => {
      const o = rt(s);
      return $e(s) ? null : t.call(n, o, i);
    });
  },
  forEach(e, t, n) {
    Oe.forEach(e, (s, i) => {
      if ($e(s))
        return;
      const o = rt(s);
      t.call(n, o, i);
    });
  },
  count(e) {
    let t = 0;
    return Oe.forEach(e, (n) => {
      $e(n) || t++;
    }), t;
  },
  toArray(e) {
    const t = [];
    return Oe.forEach(e, (n) => {
      $e(n) || t.push(rt(n));
    }), t;
  },
  only(e) {
    const t = Oe.only(e);
    return rt(t);
  }
}, Ct = [
  "_fgT",
  "_fgS",
  "_fgB",
  "_fgD"
];
function fo(e) {
  if (e == null || typeof e != "object") return e;
  const t = Object.keys(e);
  let n = !1;
  for (let i = 0; i < Ct.length; i++)
    if (Ct[i] in e) {
      n = !0;
      break;
    }
  if (!n) return e;
  const s = {};
  for (let i = 0; i < t.length; i++) {
    const o = t[i];
    Ct.indexOf(o) === -1 && (s[o] = e[o]);
  }
  return s;
}
const qn = globalThis.__GLOBALS__.React.cloneElement, mo = (e, ...t) => {
  if (gi(e)) {
    const n = yi(e), s = t[0];
    return s != null && typeof s == "object" && (t = [
      fo(s),
      ...t.slice(1)
    ]), qn(n, ...t);
  }
  return qn(e, ...t);
};
({
  ...globalThis.__GLOBALS__.React
});
const { Component: xi, createContext: Le, createElement: mt, createFactory: Ah, createRef: Nh, forwardRef: un, Fragment: vi, isValidElement: po, lazy: Mh, memo: Dh, Profiler: Vh, PureComponent: Eh, startTransition: Rh, StrictMode: Lh, Suspense: Ih, use: Fh, useCallback: dn, useContext: _, useDebugValue: jh, useDeferredValue: Bh, useEffect: Ie, useId: hn, useImperativeHandle: Oh, useInsertionEffect: bi, useLayoutEffect: go, useMemo: ye, useReducer: _h, useRef: Q, useState: ee, useSyncExternalStore: $h, useTransition: Wh, version: Uh, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: zh } = globalThis.__GLOBALS__.React, fn = Le({});
function mn(e) {
  const t = Q(null);
  return t.current === null && (t.current = e()), t.current;
}
const pn = typeof window < "u", wi = pn ? go : Ie, bt = /* @__PURE__ */ Le(null);
function gn(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function yn(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
const se = (e, t, n) => n > t ? t : n < e ? e : n;
let xn = () => {
};
const ie = {}, Ti = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function Pi(e) {
  return typeof e == "object" && e !== null;
}
const Si = (e) => /^0[^.\s]+$/u.test(e);
// @__NO_SIDE_EFFECTS__
function vn(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Z = /* @__NO_SIDE_EFFECTS__ */ (e) => e, yo = (e, t) => (n) => t(e(n)), tt = (...e) => e.reduce(yo), Ye = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
  const s = t - e;
  return s === 0 ? 1 : (n - e) / s;
};
class bn {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return gn(this.subscriptions, t), () => yn(this.subscriptions, t);
  }
  notify(t, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1)
        this.subscriptions[0](t, n, s);
      else
        for (let o = 0; o < i; o++) {
          const r = this.subscriptions[o];
          r && r(t, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const te = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, q = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3;
function ki(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const Ci = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, xo = 1e-7, vo = 12;
function bo(e, t, n, s, i) {
  let o, r, a = 0;
  do
    r = t + (n - t) / 2, o = Ci(r, s, i) - e, o > 0 ? n = r : t = r;
  while (Math.abs(o) > xo && ++a < vo);
  return r;
}
function nt(e, t, n, s) {
  if (e === t && n === s)
    return Z;
  const i = (o) => bo(o, 0, 1, e, n);
  return (o) => o === 0 || o === 1 ? o : Ci(i(o), t, s);
}
const Ai = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, Ni = (e) => (t) => 1 - e(1 - t), Mi = /* @__PURE__ */ nt(0.33, 1.53, 0.69, 0.99), wn = /* @__PURE__ */ Ni(Mi), Di = /* @__PURE__ */ Ai(wn), Vi = (e) => (e *= 2) < 1 ? 0.5 * wn(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), Tn = (e) => 1 - Math.sin(Math.acos(e)), Ei = Ni(Tn), Ri = Ai(Tn), wo = /* @__PURE__ */ nt(0.42, 0, 1, 1), To = /* @__PURE__ */ nt(0, 0, 0.58, 1), Li = /* @__PURE__ */ nt(0.42, 0, 0.58, 1), Po = (e) => Array.isArray(e) && typeof e[0] != "number", Ii = (e) => Array.isArray(e) && typeof e[0] == "number", So = {
  linear: Z,
  easeIn: wo,
  easeInOut: Li,
  easeOut: To,
  circIn: Tn,
  circInOut: Ri,
  circOut: Ei,
  backIn: wn,
  backInOut: Di,
  backOut: Mi,
  anticipate: Vi
}, ko = (e) => typeof e == "string", Zn = (e) => {
  if (Ii(e)) {
    xn(e.length === 4);
    const [t, n, s, i] = e;
    return nt(t, n, s, i);
  } else if (ko(e))
    return So[e];
  return e;
}, ot = [
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
function Co(e, t) {
  let n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), i = !1, o = !1;
  const r = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(c) {
    r.has(c) && (u.schedule(c), e()), c(a);
  }
  const u = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, h = !1, f = !1) => {
      const m = f && i ? n : s;
      return h && r.add(c), m.has(c) || m.add(c), c;
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
const Ao = 40;
function Fi(e, t) {
  let n = !1, s = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, o = () => n = !0, r = ot.reduce((w, C) => (w[C] = Co(o), w), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: c, update: h, preRender: f, render: g, postRender: m } = r, y = () => {
    const w = ie.useManualTiming ? i.timestamp : performance.now();
    n = !1, ie.useManualTiming || (i.delta = s ? 1e3 / 60 : Math.max(Math.min(w - i.timestamp, Ao), 1)), i.timestamp = w, i.isProcessing = !0, a.process(i), l.process(i), u.process(i), c.process(i), h.process(i), f.process(i), g.process(i), m.process(i), i.isProcessing = !1, n && t && (s = !1, e(y));
  }, x = () => {
    n = !0, s = !0, i.isProcessing || e(y);
  };
  return { schedule: ot.reduce((w, C) => {
    const T = r[C];
    return w[C] = (A, N = !1, S = !1) => (n || x(), T.schedule(A, N, S)), w;
  }, {}), cancel: (w) => {
    for (let C = 0; C < ot.length; C++)
      r[ot[C]].cancel(w);
  }, state: i, steps: r };
}
const { schedule: D, cancel: ae, state: B, steps: At } = /* @__PURE__ */ Fi(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Z, !0);
let ut;
function No() {
  ut = void 0;
}
const K = {
  now: () => (ut === void 0 && K.set(B.isProcessing || ie.useManualTiming ? B.timestamp : performance.now()), ut),
  set: (e) => {
    ut = e, queueMicrotask(No);
  }
}, ji = (e) => (t) => typeof t == "string" && t.startsWith(e), Pn = /* @__PURE__ */ ji("--"), Mo = /* @__PURE__ */ ji("var(--"), Sn = (e) => Mo(e) ? Do.test(e.split("/*")[0].trim()) : !1, Do = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, Fe = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, qe = {
  ...Fe,
  transform: (e) => se(0, 1, e)
}, at = {
  ...Fe,
  default: 1
}, Ue = (e) => Math.round(e * 1e5) / 1e5, kn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Vo(e) {
  return e == null;
}
const Eo = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Cn = (e, t) => (n) => !!(typeof n == "string" && Eo.test(n) && n.startsWith(e) || t && !Vo(n) && Object.prototype.hasOwnProperty.call(n, t)), Bi = (e, t, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [i, o, r, a] = s.match(kn);
  return {
    [e]: parseFloat(i),
    [t]: parseFloat(o),
    [n]: parseFloat(r),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Ro = (e) => se(0, 255, e), Nt = {
  ...Fe,
  transform: (e) => Math.round(Ro(e))
}, fe = {
  test: /* @__PURE__ */ Cn("rgb", "red"),
  parse: /* @__PURE__ */ Bi("red", "green", "blue"),
  transform: ({ red: e, green: t, blue: n, alpha: s = 1 }) => "rgba(" + Nt.transform(e) + ", " + Nt.transform(t) + ", " + Nt.transform(n) + ", " + Ue(qe.transform(s)) + ")"
};
function Lo(e) {
  let t = "", n = "", s = "", i = "";
  return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), s = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), s = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, s += s, i += i), {
    red: parseInt(t, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const Wt = {
  test: /* @__PURE__ */ Cn("#"),
  parse: Lo,
  transform: fe.transform
}, st = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
  test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${e}`
}), oe = /* @__PURE__ */ st("deg"), ne = /* @__PURE__ */ st("%"), P = /* @__PURE__ */ st("px"), Io = /* @__PURE__ */ st("vh"), Fo = /* @__PURE__ */ st("vw"), Jn = {
  ...ne,
  parse: (e) => ne.parse(e) / 100,
  transform: (e) => ne.transform(e * 100)
}, Te = {
  test: /* @__PURE__ */ Cn("hsl", "hue"),
  parse: /* @__PURE__ */ Bi("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: t, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(e) + ", " + ne.transform(Ue(t)) + ", " + ne.transform(Ue(n)) + ", " + Ue(qe.transform(s)) + ")"
}, L = {
  test: (e) => fe.test(e) || Wt.test(e) || Te.test(e),
  parse: (e) => fe.test(e) ? fe.parse(e) : Te.test(e) ? Te.parse(e) : Wt.parse(e),
  transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? fe.transform(e) : Te.transform(e),
  getAnimatableNone: (e) => {
    const t = L.parse(e);
    return t.alpha = 0, L.transform(t);
  }
}, jo = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Bo(e) {
  return isNaN(e) && typeof e == "string" && (e.match(kn)?.length || 0) + (e.match(jo)?.length || 0) > 0;
}
const Oi = "number", _i = "color", Oo = "var", _o = "var(", Qn = "${}", $o = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ze(e) {
  const t = e.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let o = 0;
  const a = t.replace($o, (l) => (L.test(l) ? (s.color.push(o), i.push(_i), n.push(L.parse(l))) : l.startsWith(_o) ? (s.var.push(o), i.push(Oo), n.push(l)) : (s.number.push(o), i.push(Oi), n.push(parseFloat(l))), ++o, Qn)).split(Qn);
  return { values: n, split: a, indexes: s, types: i };
}
function $i(e) {
  return Ze(e).values;
}
function Wi(e) {
  const { split: t, types: n } = Ze(e), s = t.length;
  return (i) => {
    let o = "";
    for (let r = 0; r < s; r++)
      if (o += t[r], i[r] !== void 0) {
        const a = n[r];
        a === Oi ? o += Ue(i[r]) : a === _i ? o += L.transform(i[r]) : o += i[r];
      }
    return o;
  };
}
const Wo = (e) => typeof e == "number" ? 0 : L.test(e) ? L.getAnimatableNone(e) : e;
function Uo(e) {
  const t = $i(e);
  return Wi(e)(t.map(Wo));
}
const le = {
  test: Bo,
  parse: $i,
  createTransformer: Wi,
  getAnimatableNone: Uo
};
function Mt(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function zo({ hue: e, saturation: t, lightness: n, alpha: s }) {
  e /= 360, t /= 100, n /= 100;
  let i = 0, o = 0, r = 0;
  if (!t)
    i = o = r = n;
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t, l = 2 * n - a;
    i = Mt(l, a, e + 1 / 3), o = Mt(l, a, e), r = Mt(l, a, e - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(r * 255),
    alpha: s
  };
}
function pt(e, t) {
  return (n) => n > 0 ? t : e;
}
const V = (e, t, n) => e + (t - e) * n, Dt = (e, t, n) => {
  const s = e * e, i = n * (t * t - s) + s;
  return i < 0 ? 0 : Math.sqrt(i);
}, Ko = [Wt, fe, Te], Go = (e) => Ko.find((t) => t.test(e));
function es(e) {
  const t = Go(e);
  if (!t)
    return !1;
  let n = t.parse(e);
  return t === Te && (n = zo(n)), n;
}
const ts = (e, t) => {
  const n = es(e), s = es(t);
  if (!n || !s)
    return pt(e, t);
  const i = { ...n };
  return (o) => (i.red = Dt(n.red, s.red, o), i.green = Dt(n.green, s.green, o), i.blue = Dt(n.blue, s.blue, o), i.alpha = V(n.alpha, s.alpha, o), fe.transform(i));
}, Ut = /* @__PURE__ */ new Set(["none", "hidden"]);
function Ho(e, t) {
  return Ut.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
function Xo(e, t) {
  return (n) => V(e, t, n);
}
function An(e) {
  return typeof e == "number" ? Xo : typeof e == "string" ? Sn(e) ? pt : L.test(e) ? ts : Zo : Array.isArray(e) ? Ui : typeof e == "object" ? L.test(e) ? ts : Yo : pt;
}
function Ui(e, t) {
  const n = [...e], s = n.length, i = e.map((o, r) => An(o)(o, t[r]));
  return (o) => {
    for (let r = 0; r < s; r++)
      n[r] = i[r](o);
    return n;
  };
}
function Yo(e, t) {
  const n = { ...e, ...t }, s = {};
  for (const i in n)
    e[i] !== void 0 && t[i] !== void 0 && (s[i] = An(e[i])(e[i], t[i]));
  return (i) => {
    for (const o in s)
      n[o] = s[o](i);
    return n;
  };
}
function qo(e, t) {
  const n = [], s = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < t.values.length; i++) {
    const o = t.types[i], r = e.indexes[o][s[o]], a = e.values[r] ?? 0;
    n[i] = a, s[o]++;
  }
  return n;
}
const Zo = (e, t) => {
  const n = le.createTransformer(t), s = Ze(e), i = Ze(t);
  return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? Ut.has(e) && !i.values.length || Ut.has(t) && !s.values.length ? Ho(e, t) : tt(Ui(qo(s, i), i.values), n) : pt(e, t);
};
function zi(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? V(e, t, n) : An(e)(e, t);
}
const Jo = (e) => {
  const t = ({ timestamp: n }) => e(n);
  return {
    start: (n = !0) => D.update(t, n),
    stop: () => ae(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => B.isProcessing ? B.timestamp : K.now()
  };
}, Ki = (e, t, n = 10) => {
  let s = "";
  const i = Math.max(Math.round(t / n), 2);
  for (let o = 0; o < i; o++)
    s += Math.round(e(o / (i - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, gt = 2e4;
function Nn(e) {
  let t = 0;
  const n = 50;
  let s = e.next(t);
  for (; !s.done && t < gt; )
    t += n, s = e.next(t);
  return t >= gt ? 1 / 0 : t;
}
function Qo(e, t = 100, n) {
  const s = n({ ...e, keyframes: [0, t] }), i = Math.min(Nn(s), gt);
  return {
    type: "keyframes",
    ease: (o) => s.next(i * o).value / t,
    duration: /* @__PURE__ */ q(i)
  };
}
const ea = 5;
function Gi(e, t, n) {
  const s = Math.max(t - ea, 0);
  return ki(n - e(s), t - s);
}
const E = {
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
}, Vt = 1e-3;
function ta({ duration: e = E.duration, bounce: t = E.bounce, velocity: n = E.velocity, mass: s = E.mass }) {
  let i, o, r = 1 - t;
  r = se(E.minDamping, E.maxDamping, r), e = se(E.minDuration, E.maxDuration, /* @__PURE__ */ q(e)), r < 1 ? (i = (u) => {
    const c = u * r, h = c * e, f = c - n, g = zt(u, r), m = Math.exp(-h);
    return Vt - f / g * m;
  }, o = (u) => {
    const h = u * r * e, f = h * n + n, g = Math.pow(r, 2) * Math.pow(u, 2) * e, m = Math.exp(-h), y = zt(Math.pow(u, 2), r);
    return (-i(u) + Vt > 0 ? -1 : 1) * ((f - g) * m) / y;
  }) : (i = (u) => {
    const c = Math.exp(-u * e), h = (u - n) * e + 1;
    return -Vt + c * h;
  }, o = (u) => {
    const c = Math.exp(-u * e), h = (n - u) * (e * e);
    return c * h;
  });
  const a = 5 / e, l = sa(i, o, a);
  if (e = /* @__PURE__ */ te(e), isNaN(l))
    return {
      stiffness: E.stiffness,
      damping: E.damping,
      duration: e
    };
  {
    const u = Math.pow(l, 2) * s;
    return {
      stiffness: u,
      damping: r * 2 * Math.sqrt(s * u),
      duration: e
    };
  }
}
const na = 12;
function sa(e, t, n) {
  let s = n;
  for (let i = 1; i < na; i++)
    s = s - e(s) / t(s);
  return s;
}
function zt(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const ia = ["duration", "bounce"], ra = ["stiffness", "damping", "mass"];
function ns(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function oa(e) {
  let t = {
    velocity: E.velocity,
    stiffness: E.stiffness,
    damping: E.damping,
    mass: E.mass,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!ns(e, ra) && ns(e, ia))
    if (e.visualDuration) {
      const n = e.visualDuration, s = 2 * Math.PI / (n * 1.2), i = s * s, o = 2 * se(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
      t = {
        ...t,
        mass: E.mass,
        stiffness: i,
        damping: o
      };
    } else {
      const n = ta(e);
      t = {
        ...t,
        ...n,
        mass: E.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function yt(e = E.visualDuration, t = E.bounce) {
  const n = typeof e != "object" ? {
    visualDuration: e,
    keyframes: [0, 1],
    bounce: t
  } : e;
  let { restSpeed: s, restDelta: i } = n;
  const o = n.keyframes[0], r = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: o }, { stiffness: l, damping: u, mass: c, duration: h, velocity: f, isResolvedFromDuration: g } = oa({
    ...n,
    velocity: -/* @__PURE__ */ q(n.velocity || 0)
  }), m = f || 0, y = u / (2 * Math.sqrt(l * c)), x = r - o, v = /* @__PURE__ */ q(Math.sqrt(l / c)), b = Math.abs(x) < 5;
  s || (s = b ? E.restSpeed.granular : E.restSpeed.default), i || (i = b ? E.restDelta.granular : E.restDelta.default);
  let w;
  if (y < 1) {
    const T = zt(v, y);
    w = (A) => {
      const N = Math.exp(-y * v * A);
      return r - N * ((m + y * v * x) / T * Math.sin(T * A) + x * Math.cos(T * A));
    };
  } else if (y === 1)
    w = (T) => r - Math.exp(-v * T) * (x + (m + v * x) * T);
  else {
    const T = v * Math.sqrt(y * y - 1);
    w = (A) => {
      const N = Math.exp(-y * v * A), S = Math.min(T * A, 300);
      return r - N * ((m + y * v * x) * Math.sinh(S) + T * x * Math.cosh(S)) / T;
    };
  }
  const C = {
    calculatedDuration: g && h || null,
    next: (T) => {
      const A = w(T);
      if (g)
        a.done = T >= h;
      else {
        let N = T === 0 ? m : 0;
        y < 1 && (N = T === 0 ? /* @__PURE__ */ te(m) : Gi(w, T, A));
        const S = Math.abs(N) <= s, I = Math.abs(r - A) <= i;
        a.done = S && I;
      }
      return a.value = a.done ? r : A, a;
    },
    toString: () => {
      const T = Math.min(Nn(C), gt), A = Ki((N) => C.next(T * N).value, T, 30);
      return T + "ms " + A;
    },
    toTransition: () => {
    }
  };
  return C;
}
yt.applyToOptions = (e) => {
  const t = Qo(e, 100, yt);
  return e.ease = t.ease, e.duration = /* @__PURE__ */ te(t.duration), e.type = "keyframes", e;
};
function Kt({ keyframes: e, velocity: t = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: i = 10, bounceStiffness: o = 500, modifyTarget: r, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const h = e[0], f = {
    done: !1,
    value: h
  }, g = (S) => a !== void 0 && S < a || l !== void 0 && S > l, m = (S) => a === void 0 ? l : l === void 0 || Math.abs(a - S) < Math.abs(l - S) ? a : l;
  let y = n * t;
  const x = h + y, v = r === void 0 ? x : r(x);
  v !== x && (y = v - h);
  const b = (S) => -y * Math.exp(-S / s), w = (S) => v + b(S), C = (S) => {
    const I = b(S), W = w(S);
    f.done = Math.abs(I) <= u, f.value = f.done ? v : W;
  };
  let T, A;
  const N = (S) => {
    g(f.value) && (T = S, A = yt({
      keyframes: [f.value, m(f.value)],
      velocity: Gi(w, S, f.value),
      // TODO: This should be passing * 1000
      damping: i,
      stiffness: o,
      restDelta: u,
      restSpeed: c
    }));
  };
  return N(0), {
    calculatedDuration: null,
    next: (S) => {
      let I = !1;
      return !A && T === void 0 && (I = !0, C(S), N(S)), T !== void 0 && S >= T ? A.next(S - T) : (!I && C(S), f);
    }
  };
}
function aa(e, t, n) {
  const s = [], i = n || ie.mix || zi, o = e.length - 1;
  for (let r = 0; r < o; r++) {
    let a = i(e[r], e[r + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[r] || Z : t;
      a = tt(l, a);
    }
    s.push(a);
  }
  return s;
}
function la(e, t, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const o = e.length;
  if (xn(o === t.length), o === 1)
    return () => t[0];
  if (o === 2 && t[0] === t[1])
    return () => t[1];
  const r = e[0] === e[1];
  e[0] > e[o - 1] && (e = [...e].reverse(), t = [...t].reverse());
  const a = aa(t, s, i), l = a.length, u = (c) => {
    if (r && c < e[0])
      return t[0];
    let h = 0;
    if (l > 1)
      for (; h < e.length - 2 && !(c < e[h + 1]); h++)
        ;
    const f = /* @__PURE__ */ Ye(e[h], e[h + 1], c);
    return a[h](f);
  };
  return n ? (c) => u(se(e[0], e[o - 1], c)) : u;
}
function ca(e, t) {
  const n = e[e.length - 1];
  for (let s = 1; s <= t; s++) {
    const i = /* @__PURE__ */ Ye(0, t, s);
    e.push(V(n, 1, i));
  }
}
function ua(e) {
  const t = [0];
  return ca(t, e.length - 1), t;
}
function da(e, t) {
  return e.map((n) => n * t);
}
function ha(e, t) {
  return e.map(() => t || Li).splice(0, e.length - 1);
}
function ze({ duration: e = 300, keyframes: t, times: n, ease: s = "easeInOut" }) {
  const i = Po(s) ? s.map(Zn) : Zn(s), o = {
    done: !1,
    value: t[0]
  }, r = da(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === t.length ? n : ua(t),
    e
  ), a = la(r, t, {
    ease: Array.isArray(i) ? i : ha(t, i)
  });
  return {
    calculatedDuration: e,
    next: (l) => (o.value = a(l), o.done = l >= e, o)
  };
}
const fa = (e) => e !== null;
function Mn(e, { repeat: t, repeatType: n = "loop" }, s, i = 1) {
  const o = e.filter(fa), a = i < 0 || t && n !== "loop" && t % 2 === 1 ? 0 : o.length - 1;
  return !a || s === void 0 ? o[a] : s;
}
const ma = {
  decay: Kt,
  inertia: Kt,
  tween: ze,
  keyframes: ze,
  spring: yt
};
function Hi(e) {
  typeof e.type == "string" && (e.type = ma[e.type]);
}
class Dn {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t;
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
  then(t, n) {
    return this.finished.then(t, n);
  }
}
const pa = (e) => e / 100;
class Vn extends Dn {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== K.now() && this.tick(K.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    Hi(t);
    const { type: n = ze, repeat: s = 0, repeatDelay: i = 0, repeatType: o, velocity: r = 0 } = t;
    let { keyframes: a } = t;
    const l = n || ze;
    l !== ze && typeof a[0] != "number" && (this.mixKeyframes = tt(pa, zi(a[0], a[1])), a = [0, 100]);
    const u = l({ ...t, keyframes: a });
    o === "mirror" && (this.mirroredGenerator = l({
      ...t,
      keyframes: [...a].reverse(),
      velocity: -r
    })), u.calculatedDuration === null && (u.calculatedDuration = Nn(u));
    const { calculatedDuration: c } = u;
    this.calculatedDuration = c, this.resolvedDuration = c + i, this.totalDuration = this.resolvedDuration * (s + 1) - i, this.generator = u;
  }
  updateTime(t) {
    const n = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(t, n = !1) {
    const { generator: s, totalDuration: i, mixKeyframes: o, mirroredGenerator: r, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: u = 0, keyframes: c, repeat: h, repeatType: f, repeatDelay: g, type: m, onUpdate: y, finalKeyframe: x } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - i / this.speed, this.startTime)), n ? this.currentTime = t : this.updateTime(t);
    const v = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), b = this.playbackSpeed >= 0 ? v < 0 : v > i;
    this.currentTime = Math.max(v, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = i);
    let w = this.currentTime, C = s;
    if (h) {
      const S = Math.min(this.currentTime, i) / a;
      let I = Math.floor(S), W = S % 1;
      !W && S >= 1 && (W = 1), W === 1 && I--, I = Math.min(I, h + 1), !!(I % 2) && (f === "reverse" ? (W = 1 - W, g && (W -= g / a)) : f === "mirror" && (C = r)), w = se(0, 1, W) * a;
    }
    const T = b ? { done: !1, value: c[0] } : C.next(w);
    o && (T.value = o(T.value));
    let { done: A } = T;
    !b && l !== null && (A = this.playbackSpeed >= 0 ? this.currentTime >= i : this.currentTime <= 0);
    const N = this.holdTime === null && (this.state === "finished" || this.state === "running" && A);
    return N && m !== Kt && (T.value = Mn(c, this.options, x, this.speed)), y && y(T.value), N && this.finish(), T;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
  get duration() {
    return /* @__PURE__ */ q(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ q(t);
  }
  get time() {
    return /* @__PURE__ */ q(this.currentTime);
  }
  set time(t) {
    t = /* @__PURE__ */ te(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(K.now());
    const n = this.playbackSpeed !== t;
    this.playbackSpeed = t, n && (this.time = /* @__PURE__ */ q(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: t = Jo, startTime: n } = this.options;
    this.driver || (this.driver = t((i) => this.tick(i))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = n ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(K.now()), this.holdTime = this.currentTime;
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
  sample(t) {
    return this.startTime = 0, this.tick(t, !0);
  }
  attachTimeline(t) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), t.observe(this);
  }
}
function ga(e) {
  for (let t = 1; t < e.length; t++)
    e[t] ?? (e[t] = e[t - 1]);
}
const me = (e) => e * 180 / Math.PI, Gt = (e) => {
  const t = me(Math.atan2(e[1], e[0]));
  return Ht(t);
}, ya = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
  rotate: Gt,
  rotateZ: Gt,
  skewX: (e) => me(Math.atan(e[1])),
  skewY: (e) => me(Math.atan(e[2])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, Ht = (e) => (e = e % 360, e < 0 && (e += 360), e), ss = Gt, is = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), rs = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), xa = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: is,
  scaleY: rs,
  scale: (e) => (is(e) + rs(e)) / 2,
  rotateX: (e) => Ht(me(Math.atan2(e[6], e[5]))),
  rotateY: (e) => Ht(me(Math.atan2(-e[2], e[0]))),
  rotateZ: ss,
  rotate: ss,
  skewX: (e) => me(Math.atan(e[4])),
  skewY: (e) => me(Math.atan(e[1])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function Xt(e) {
  return e.includes("scale") ? 1 : 0;
}
function Yt(e, t) {
  if (!e || e === "none")
    return Xt(t);
  const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, i;
  if (n)
    s = xa, i = n;
  else {
    const a = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = ya, i = a;
  }
  if (!i)
    return Xt(t);
  const o = s[t], r = i[1].split(",").map(ba);
  return typeof o == "function" ? o(r) : r[o];
}
const va = (e, t) => {
  const { transform: n = "none" } = getComputedStyle(e);
  return Yt(n, t);
};
function ba(e) {
  return parseFloat(e.trim());
}
const je = [
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
], Be = new Set(je), os = (e) => e === Fe || e === P, wa = /* @__PURE__ */ new Set(["x", "y", "z"]), Ta = je.filter((e) => !wa.has(e));
function Pa(e) {
  const t = [];
  return Ta.forEach((n) => {
    const s = e.getValue(n);
    s !== void 0 && (t.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), t;
}
const pe = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  // Transform
  x: (e, { transform: t }) => Yt(t, "x"),
  y: (e, { transform: t }) => Yt(t, "y")
};
pe.translateX = pe.x;
pe.translateY = pe.y;
const ge = /* @__PURE__ */ new Set();
let qt = !1, Zt = !1, Jt = !1;
function Xi() {
  if (Zt) {
    const e = Array.from(ge).filter((s) => s.needsMeasurement), t = new Set(e.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    t.forEach((s) => {
      const i = Pa(s);
      i.length && (n.set(s, i), s.render());
    }), e.forEach((s) => s.measureInitialState()), t.forEach((s) => {
      s.render();
      const i = n.get(s);
      i && i.forEach(([o, r]) => {
        s.getValue(o)?.set(r);
      });
    }), e.forEach((s) => s.measureEndState()), e.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Zt = !1, qt = !1, ge.forEach((e) => e.complete(Jt)), ge.clear();
}
function Yi() {
  ge.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (Zt = !0);
  });
}
function Sa() {
  Jt = !0, Yi(), Xi(), Jt = !1;
}
class En {
  constructor(t, n, s, i, o, r = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = n, this.name = s, this.motionValue = i, this.element = o, this.isAsync = r;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ge.add(this), qt || (qt = !0, D.read(Yi), D.resolveKeyframes(Xi))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: s, motionValue: i } = this;
    if (t[0] === null) {
      const o = i?.get(), r = t[t.length - 1];
      if (o !== void 0)
        t[0] = o;
      else if (s && n) {
        const a = s.readValue(n, r);
        a != null && (t[0] = a);
      }
      t[0] === void 0 && (t[0] = r), i && o === void 0 && i.set(t[0]);
    }
    ga(t);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(t = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), ge.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ge.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const ka = (e) => e.startsWith("--");
function Ca(e, t, n) {
  ka(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
const Aa = /* @__PURE__ */ vn(() => window.ScrollTimeline !== void 0), Na = {};
function Ma(e, t) {
  const n = /* @__PURE__ */ vn(e);
  return () => Na[t] ?? n();
}
const qi = /* @__PURE__ */ Ma(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), We = ([e, t, n, s]) => `cubic-bezier(${e}, ${t}, ${n}, ${s})`, as = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ We([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ We([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ We([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ We([0.33, 1.53, 0.69, 0.99])
};
function Zi(e, t) {
  if (e)
    return typeof e == "function" ? qi() ? Ki(e, t) : "ease-out" : Ii(e) ? We(e) : Array.isArray(e) ? e.map((n) => Zi(n, t) || as.easeOut) : as[e];
}
function Da(e, t, n, { delay: s = 0, duration: i = 300, repeat: o = 0, repeatType: r = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const c = {
    [t]: n
  };
  l && (c.offset = l);
  const h = Zi(a, i);
  Array.isArray(h) && (c.easing = h);
  const f = {
    delay: s,
    duration: i,
    easing: Array.isArray(h) ? "linear" : h,
    fill: "both",
    iterations: o + 1,
    direction: r === "reverse" ? "alternate" : "normal"
  };
  return u && (f.pseudoElement = u), e.animate(c, f);
}
function Ji(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function Va({ type: e, ...t }) {
  return Ji(e) && qi() ? e.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class Ea extends Dn {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !t)
      return;
    const { element: n, name: s, keyframes: i, pseudoElement: o, allowFlatten: r = !1, finalKeyframe: a, onComplete: l } = t;
    this.isPseudoElement = !!o, this.allowFlatten = r, this.options = t, xn(typeof t.type != "string");
    const u = Va(t);
    this.animation = Da(n, s, i, u, o), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !o) {
        const c = Mn(i, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(c) : Ca(n, s, c), this.animation.cancel();
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
    const { state: t } = this;
    t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
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
    const t = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ q(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ q(t);
  }
  get time() {
    return /* @__PURE__ */ q(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ te(t);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(t) {
    t < 0 && (this.finishedTime = null), this.animation.playbackRate = t;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(t) {
    this.animation.startTime = t;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: t, observe: n }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, t && Aa() ? (this.animation.timeline = t, Z) : n(this);
  }
}
const Qi = {
  anticipate: Vi,
  backInOut: Di,
  circInOut: Ri
};
function Ra(e) {
  return e in Qi;
}
function La(e) {
  typeof e.ease == "string" && Ra(e.ease) && (e.ease = Qi[e.ease]);
}
const ls = 10;
class Ia extends Ea {
  constructor(t) {
    La(t), Hi(t), super(t), t.startTime && (this.startTime = t.startTime), this.options = t;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read commited styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(t) {
    const { motionValue: n, onUpdate: s, onComplete: i, element: o, ...r } = this.options;
    if (!n)
      return;
    if (t !== void 0) {
      n.set(t);
      return;
    }
    const a = new Vn({
      ...r,
      autoplay: !1
    }), l = /* @__PURE__ */ te(this.finishedTime ?? this.time);
    n.setWithVelocity(a.sample(l - ls).value, a.sample(l).value, ls), a.stop();
  }
}
const cs = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(le.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function Fa(e) {
  const t = e[0];
  if (e.length === 1)
    return !0;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t)
      return !0;
}
function ja(e, t, n, s) {
  const i = e[0];
  if (i === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const o = e[e.length - 1], r = cs(i, t), a = cs(o, t);
  return !r || !a ? !1 : Fa(e) || (n === "spring" || Ji(n)) && s;
}
function Qt(e) {
  e.duration = 0, e.type = "keyframes";
}
const Ba = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), Oa = /* @__PURE__ */ vn(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function _a(e) {
  const { motionValue: t, name: n, repeatDelay: s, repeatType: i, damping: o, type: r } = e;
  if (!(t?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: u } = t.owner.getProps();
  return Oa() && n && Ba.has(n) && (n !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !s && i !== "mirror" && o !== 0 && r !== "inertia";
}
const $a = 40;
class Wa extends Dn {
  constructor({ autoplay: t = !0, delay: n = 0, type: s = "keyframes", repeat: i = 0, repeatDelay: o = 0, repeatType: r = "loop", keyframes: a, name: l, motionValue: u, element: c, ...h }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = K.now();
    const f = {
      autoplay: t,
      delay: n,
      type: s,
      repeat: i,
      repeatDelay: o,
      repeatType: r,
      name: l,
      motionValue: u,
      element: c,
      ...h
    }, g = c?.KeyframeResolver || En;
    this.keyframeResolver = new g(a, (m, y, x) => this.onKeyframesResolved(m, y, f, !x), l, u, c), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(t, n, s, i) {
    this.keyframeResolver = void 0;
    const { name: o, type: r, velocity: a, delay: l, isHandoff: u, onUpdate: c } = s;
    this.resolvedAt = K.now(), ja(t, o, r, a) || ((ie.instantAnimations || !l) && c?.(Mn(t, s, n)), t[0] = t[t.length - 1], Qt(s), s.repeat = 0);
    const f = {
      startTime: i ? this.resolvedAt ? this.resolvedAt - this.createdAt > $a ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...s,
      keyframes: t
    }, g = !u && _a(f) ? new Ia({
      ...f,
      element: f.motionValue.owner.current
    }) : new Vn(f);
    g.finished.then(() => this.notifyFinished()).catch(Z), this.pendingTimeline && (this.stopTimeline = g.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = g;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, n) {
    return this.finished.finally(t).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), Sa()), this._animation;
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
  set time(t) {
    this.animation.time = t;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(t) {
    this.animation.speed = t;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(t) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop();
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
const Ua = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function za(e) {
  const t = Ua.exec(e);
  if (!t)
    return [,];
  const [, n, s, i] = t;
  return [`--${n ?? s}`, i];
}
function er(e, t, n = 1) {
  const [s, i] = za(e);
  if (!s)
    return;
  const o = window.getComputedStyle(t).getPropertyValue(s);
  if (o) {
    const r = o.trim();
    return Ti(r) ? parseFloat(r) : r;
  }
  return Sn(i) ? er(i, t, n + 1) : i;
}
function Rn(e, t) {
  return e?.[t] ?? e?.default ?? e;
}
const tr = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...je
]), Ka = {
  test: (e) => e === "auto",
  parse: (e) => e
}, nr = (e) => (t) => t.test(e), sr = [Fe, P, ne, oe, Fo, Io, Ka], us = (e) => sr.find(nr(e));
function Ga(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || Si(e) : !0;
}
const Ha = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Xa(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return e;
  const [s] = n.match(kn) || [];
  if (!s)
    return e;
  const i = n.replace(s, "");
  let o = Ha.has(t) ? 1 : 0;
  return s !== n && (o *= 100), t + "(" + o + i + ")";
}
const Ya = /\b([a-z-]*)\(.*?\)/gu, en = {
  ...le,
  getAnimatableNone: (e) => {
    const t = e.match(Ya);
    return t ? t.map(Xa).join(" ") : e;
  }
}, ds = {
  ...Fe,
  transform: Math.round
}, qa = {
  rotate: oe,
  rotateX: oe,
  rotateY: oe,
  rotateZ: oe,
  scale: at,
  scaleX: at,
  scaleY: at,
  scaleZ: at,
  skew: oe,
  skewX: oe,
  skewY: oe,
  distance: P,
  translateX: P,
  translateY: P,
  translateZ: P,
  x: P,
  y: P,
  z: P,
  perspective: P,
  transformPerspective: P,
  opacity: qe,
  originX: Jn,
  originY: Jn,
  originZ: P
}, Ln = {
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
  ...qa,
  zIndex: ds,
  // SVG
  fillOpacity: qe,
  strokeOpacity: qe,
  numOctaves: ds
}, Za = {
  ...Ln,
  // Color props
  color: L,
  backgroundColor: L,
  outlineColor: L,
  fill: L,
  stroke: L,
  // Border props
  borderColor: L,
  borderTopColor: L,
  borderRightColor: L,
  borderBottomColor: L,
  borderLeftColor: L,
  filter: en,
  WebkitFilter: en
}, ir = (e) => Za[e];
function rr(e, t) {
  let n = ir(e);
  return n !== en && (n = le), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
const Ja = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Qa(e, t, n) {
  let s = 0, i;
  for (; s < e.length && !i; ) {
    const o = e[s];
    typeof o == "string" && !Ja.has(o) && Ze(o).values.length && (i = e[s]), s++;
  }
  if (i && n)
    for (const o of t)
      e[o] = rr(n, i);
}
class el extends En {
  constructor(t, n, s, i, o) {
    super(t, n, s, i, o, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: s } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < t.length; l++) {
      let u = t[l];
      if (typeof u == "string" && (u = u.trim(), Sn(u))) {
        const c = er(u, n.current);
        c !== void 0 && (t[l] = c), l === t.length - 1 && (this.finalKeyframe = u);
      }
    }
    if (this.resolveNoneKeyframes(), !tr.has(s) || t.length !== 2)
      return;
    const [i, o] = t, r = us(i), a = us(o);
    if (r !== a)
      if (os(r) && os(a))
        for (let l = 0; l < t.length; l++) {
          const u = t[l];
          typeof u == "string" && (t[l] = parseFloat(u));
        }
      else pe[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this, s = [];
    for (let i = 0; i < t.length; i++)
      (t[i] === null || Ga(t[i])) && s.push(i);
    s.length && Qa(t, s, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: s } = this;
    if (!t || !t.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = pe[s](t.measureViewportBox(), window.getComputedStyle(t.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && t.getValue(s, i).jump(i, !1);
  }
  measureEndState() {
    const { element: t, name: n, unresolvedKeyframes: s } = this;
    if (!t || !t.current)
      return;
    const i = t.getValue(n);
    i && i.jump(this.measuredOrigin, !1);
    const o = s.length - 1, r = s[o];
    s[o] = pe[n](t.measureViewportBox(), window.getComputedStyle(t.current)), r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r), this.removedTransforms?.length && this.removedTransforms.forEach(([a, l]) => {
      t.getValue(a).set(l);
    }), this.resolveNoneKeyframes();
  }
}
function tl(e, t, n) {
  if (e instanceof EventTarget)
    return [e];
  if (typeof e == "string") {
    let s = document;
    const i = n?.[e] ?? s.querySelectorAll(e);
    return i ? Array.from(i) : [];
  }
  return Array.from(e);
}
const or = (e, t) => t && typeof e == "number" ? t.transform(e) : e;
function ar(e) {
  return Pi(e) && "offsetHeight" in e;
}
const hs = 30, nl = (e) => !isNaN(parseFloat(e));
class sl {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const i = K.now();
      if (this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = n.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = K.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = nl(this.current));
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
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
  onChange(t) {
    return this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new bn());
    const s = this.events[t].add(n);
    return t === "change" ? () => {
      s(), D.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const t in this.events)
      this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(t, n) {
    this.passiveEffect = t, this.stopPassiveEffect = n;
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
  set(t) {
    this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t);
  }
  setWithVelocity(t, n, s) {
    this.set(n), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, n = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(t) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(t);
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t);
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
    const t = K.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > hs)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, hs);
    return ki(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
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
  start(t) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = t(n), this.events.animationStart && this.events.animationStart.notify();
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
function De(e, t) {
  return new sl(e, t);
}
const { schedule: In } = /* @__PURE__ */ Fi(queueMicrotask, !1), J = {
  x: !1,
  y: !1
};
function lr() {
  return J.x || J.y;
}
function il(e) {
  return e === "x" || e === "y" ? J[e] ? null : (J[e] = !0, () => {
    J[e] = !1;
  }) : J.x || J.y ? null : (J.x = J.y = !0, () => {
    J.x = J.y = !1;
  });
}
function cr(e, t) {
  const n = tl(e), s = new AbortController(), i = {
    passive: !0,
    ...t,
    signal: s.signal
  };
  return [n, i, () => s.abort()];
}
function fs(e) {
  return !(e.pointerType === "touch" || lr());
}
function rl(e, t, n = {}) {
  const [s, i, o] = cr(e, n), r = (a) => {
    if (!fs(a))
      return;
    const { target: l } = a, u = t(l, a);
    if (typeof u != "function" || !l)
      return;
    const c = (h) => {
      fs(h) && (u(h), l.removeEventListener("pointerleave", c));
    };
    l.addEventListener("pointerleave", c, i);
  };
  return s.forEach((a) => {
    a.addEventListener("pointerenter", r, i);
  }), o;
}
const ur = (e, t) => t ? e === t ? !0 : ur(e, t.parentElement) : !1, Fn = (e) => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1, ol = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function al(e) {
  return ol.has(e.tagName) || e.tabIndex !== -1;
}
const dt = /* @__PURE__ */ new WeakSet();
function ms(e) {
  return (t) => {
    t.key === "Enter" && e(t);
  };
}
function Et(e, t) {
  e.dispatchEvent(new PointerEvent("pointer" + t, { isPrimary: !0, bubbles: !0 }));
}
const ll = (e, t) => {
  const n = e.currentTarget;
  if (!n)
    return;
  const s = ms(() => {
    if (dt.has(n))
      return;
    Et(n, "down");
    const i = ms(() => {
      Et(n, "up");
    }), o = () => Et(n, "cancel");
    n.addEventListener("keyup", i, t), n.addEventListener("blur", o, t);
  });
  n.addEventListener("keydown", s, t), n.addEventListener("blur", () => n.removeEventListener("keydown", s), t);
};
function ps(e) {
  return Fn(e) && !lr();
}
function cl(e, t, n = {}) {
  const [s, i, o] = cr(e, n), r = (a) => {
    const l = a.currentTarget;
    if (!ps(a))
      return;
    dt.add(l);
    const u = t(l, a), c = (g, m) => {
      window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", f), dt.has(l) && dt.delete(l), ps(g) && typeof u == "function" && u(g, { success: m });
    }, h = (g) => {
      c(g, l === window || l === document || n.useGlobalTarget || ur(l, g.target));
    }, f = (g) => {
      c(g, !1);
    };
    window.addEventListener("pointerup", h, i), window.addEventListener("pointercancel", f, i);
  };
  return s.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", r, i), ar(a) && (a.addEventListener("focus", (u) => ll(u, i)), !al(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), o;
}
function dr(e) {
  return Pi(e) && "ownerSVGElement" in e;
}
function ul(e) {
  return dr(e) && e.tagName === "svg";
}
const $ = (e) => !!(e && e.getVelocity), dl = [...sr, L, le], hl = (e) => dl.find(nr(e)), jn = Le({
  transformPagePoint: (e) => e,
  isStatic: !1,
  reducedMotion: "never"
});
function gs(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function fl(...e) {
  return (t) => {
    let n = !1;
    const s = e.map((i) => {
      const o = gs(i, t);
      return !n && typeof o == "function" && (n = !0), o;
    });
    if (n)
      return () => {
        for (let i = 0; i < s.length; i++) {
          const o = s[i];
          typeof o == "function" ? o() : gs(e[i], null);
        }
      };
  };
}
function ml(...e) {
  return dn(fl(...e), e);
}
class pl extends xi {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current;
    if (n && t.isPresent && !this.props.isPresent) {
      const s = n.offsetParent, i = ar(s) && s.offsetWidth || 0, o = this.props.sizeRef.current;
      o.height = n.offsetHeight || 0, o.width = n.offsetWidth || 0, o.top = n.offsetTop, o.left = n.offsetLeft, o.right = i - o.width - o.left;
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
function gl({ children: e, isPresent: t, anchorX: n, root: s }) {
  const i = hn(), o = Q(null), r = Q({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0
  }), { nonce: a } = _(jn), l = ml(o, e?.ref);
  return bi(() => {
    const { width: u, height: c, top: h, left: f, right: g } = r.current;
    if (t || !o.current || !u || !c)
      return;
    const m = n === "left" ? `left: ${f}` : `right: ${g}`;
    o.current.dataset.motionPopId = i;
    const y = document.createElement("style");
    a && (y.nonce = a);
    const x = s ?? document.head;
    return x.appendChild(y), y.sheet && y.sheet.insertRule(`
          [data-motion-pop-id="${i}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${c}px !important;
            ${m}px !important;
            top: ${h}px !important;
          }
        `), () => {
      x.contains(y) && x.removeChild(y);
    };
  }, [t]), d(pl, { isPresent: t, childRef: o, sizeRef: r, children: mo(e, { ref: l }) });
}
const yl = ({ children: e, initial: t, isPresent: n, onExitComplete: s, custom: i, presenceAffectsLayout: o, mode: r, anchorX: a, root: l }) => {
  const u = mn(xl), c = hn();
  let h = !0, f = ye(() => (h = !1, {
    id: c,
    initial: t,
    isPresent: n,
    custom: i,
    onExitComplete: (g) => {
      u.set(g, !0);
      for (const m of u.values())
        if (!m)
          return;
      s && s();
    },
    register: (g) => (u.set(g, !1), () => u.delete(g))
  }), [n, u, s]);
  return o && h && (f = { ...f }), ye(() => {
    u.forEach((g, m) => u.set(m, !1));
  }, [n]), Ie(() => {
    !n && !u.size && s && s();
  }, [n]), r === "popLayout" && (e = d(gl, { isPresent: n, anchorX: a, root: l, children: e })), d(bt.Provider, { value: f, children: e });
};
function xl() {
  return /* @__PURE__ */ new Map();
}
function hr(e = !0) {
  const t = _(bt);
  if (t === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: s, register: i } = t, o = hn();
  Ie(() => {
    if (e)
      return i(o);
  }, [e]);
  const r = dn(() => e && s && s(o), [o, s, e]);
  return !n && s ? [!1, r] : [!0];
}
const lt = (e) => e.key || "";
function ys(e) {
  const t = [];
  return ho.forEach(e, (n) => {
    po(n) && t.push(n);
  }), t;
}
const fr = ({ children: e, custom: t, initial: n = !0, onExitComplete: s, presenceAffectsLayout: i = !0, mode: o = "sync", propagate: r = !1, anchorX: a = "left", root: l }) => {
  const [u, c] = hr(r), h = ye(() => ys(e), [e]), f = r && !u ? [] : h.map(lt), g = Q(!0), m = Q(h), y = mn(() => /* @__PURE__ */ new Map()), [x, v] = ee(h), [b, w] = ee(h);
  wi(() => {
    g.current = !1, m.current = h;
    for (let A = 0; A < b.length; A++) {
      const N = lt(b[A]);
      f.includes(N) ? y.delete(N) : y.get(N) !== !0 && y.set(N, !1);
    }
  }, [b, f.length, f.join("-")]);
  const C = [];
  if (h !== x) {
    let A = [...h];
    for (let N = 0; N < b.length; N++) {
      const S = b[N], I = lt(S);
      f.includes(I) || (A.splice(N, 0, S), C.push(S));
    }
    return o === "wait" && C.length && (A = C), w(ys(A)), v(h), null;
  }
  const { forceRender: T } = _(fn);
  return d(Xe, { children: b.map((A) => {
    const N = lt(A), S = r && !u ? !1 : h === b || f.includes(N), I = () => {
      if (y.has(N))
        y.set(N, !0);
      else
        return;
      let W = !0;
      y.forEach((re) => {
        re || (W = !1);
      }), W && (T?.(), w(m.current), r && c?.(), s && s());
    };
    return d(yl, { isPresent: S, initial: !g.current || n ? void 0 : !1, custom: t, presenceAffectsLayout: i, mode: o, root: l, onExitComplete: S ? void 0 : I, anchorX: a, children: A }, N);
  }) });
}, mr = Le({ strict: !1 }), xs = {
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
}, Ve = {};
for (const e in xs)
  Ve[e] = {
    isEnabled: (t) => xs[e].some((n) => !!t[n])
  };
function vl(e) {
  for (const t in e)
    Ve[t] = {
      ...Ve[t],
      ...e[t]
    };
}
const bl = /* @__PURE__ */ new Set([
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
function xt(e) {
  return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || bl.has(e);
}
let pr = (e) => !xt(e);
function wl(e) {
  typeof e == "function" && (pr = (t) => t.startsWith("on") ? !xt(t) : e(t));
}
try {
  wl(require("@emotion/is-prop-valid").default);
} catch {
}
function Tl(e, t, n) {
  const s = {};
  for (const i in e)
    i === "values" && typeof e.values == "object" || (pr(i) || n === !0 && xt(i) || !t && !xt(i) || // If trying to use native HTML drag events, forward drag listeners
    e.draggable && i.startsWith("onDrag")) && (s[i] = e[i]);
  return s;
}
const wt = /* @__PURE__ */ Le({});
function Tt(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function Je(e) {
  return typeof e == "string" || Array.isArray(e);
}
const Bn = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], On = ["initial", ...Bn];
function Pt(e) {
  return Tt(e.animate) || On.some((t) => Je(e[t]));
}
function gr(e) {
  return !!(Pt(e) || e.variants);
}
function Pl(e, t) {
  if (Pt(e)) {
    const { initial: n, animate: s } = e;
    return {
      initial: n === !1 || Je(n) ? n : void 0,
      animate: Je(s) ? s : void 0
    };
  }
  return e.inherit !== !1 ? t : {};
}
function Sl(e) {
  const { initial: t, animate: n } = Pl(e, _(wt));
  return ye(() => ({ initial: t, animate: n }), [vs(t), vs(n)]);
}
function vs(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const Qe = {};
function kl(e) {
  for (const t in e)
    Qe[t] = e[t], Pn(t) && (Qe[t].isCSSVariable = !0);
}
function yr(e, { layout: t, layoutId: n }) {
  return Be.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!Qe[e] || e === "opacity");
}
const Cl = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Al = je.length;
function Nl(e, t, n) {
  let s = "", i = !0;
  for (let o = 0; o < Al; o++) {
    const r = je[o], a = e[r];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (r.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const u = or(a, Ln[r]);
      if (!l) {
        i = !1;
        const c = Cl[r] || r;
        s += `${c}(${u}) `;
      }
      n && (t[r] = u);
    }
  }
  return s = s.trim(), n ? s = n(t, i ? "" : s) : i && (s = "none"), s;
}
function _n(e, t, n) {
  const { style: s, vars: i, transformOrigin: o } = e;
  let r = !1, a = !1;
  for (const l in t) {
    const u = t[l];
    if (Be.has(l)) {
      r = !0;
      continue;
    } else if (Pn(l)) {
      i[l] = u;
      continue;
    } else {
      const c = or(u, Ln[l]);
      l.startsWith("origin") ? (a = !0, o[l] = c) : s[l] = c;
    }
  }
  if (t.transform || (r || n ? s.transform = Nl(t, e.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = o;
    s.transformOrigin = `${l} ${u} ${c}`;
  }
}
const $n = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function xr(e, t, n) {
  for (const s in t)
    !$(t[s]) && !yr(s, n) && (e[s] = t[s]);
}
function Ml({ transformTemplate: e }, t) {
  return ye(() => {
    const n = $n();
    return _n(n, t, e), Object.assign({}, n.vars, n.style);
  }, [t]);
}
function Dl(e, t) {
  const n = e.style || {}, s = {};
  return xr(s, n, e), Object.assign(s, Ml(e, t)), s;
}
function Vl(e, t) {
  const n = {}, s = Dl(e, t);
  return e.drag && e.dragListener !== !1 && (n.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0), n.style = s, n;
}
const El = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Rl = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Ll(e, t, n = 1, s = 0, i = !0) {
  e.pathLength = 1;
  const o = i ? El : Rl;
  e[o.offset] = P.transform(-s);
  const r = P.transform(t), a = P.transform(n);
  e[o.array] = `${r} ${a}`;
}
function vr(e, {
  attrX: t,
  attrY: n,
  attrScale: s,
  pathLength: i,
  pathSpacing: o = 1,
  pathOffset: r = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, u, c) {
  if (_n(e, a, u), l) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: h, style: f } = e;
  h.transform && (f.transform = h.transform, delete h.transform), (f.transform || h.transformOrigin) && (f.transformOrigin = h.transformOrigin ?? "50% 50%", delete h.transformOrigin), f.transform && (f.transformBox = c?.transformBox ?? "fill-box", delete h.transformBox), t !== void 0 && (h.x = t), n !== void 0 && (h.y = n), s !== void 0 && (h.scale = s), i !== void 0 && Ll(h, i, o, r, !1);
}
const br = () => ({
  ...$n(),
  attrs: {}
}), wr = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function Il(e, t, n, s) {
  const i = ye(() => {
    const o = br();
    return vr(o, t, wr(s), e.transformTemplate, e.style), {
      ...o.attrs,
      style: { ...o.style }
    };
  }, [t]);
  if (e.style) {
    const o = {};
    xr(o, e.style, e), i.style = { ...o, ...i.style };
  }
  return i;
}
const Fl = [
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
function Wn(e) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof e != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    e.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(Fl.indexOf(e) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(e))
    )
  );
}
function jl(e, t, n, { latestValues: s }, i, o = !1) {
  const a = (Wn(e) ? Il : Vl)(t, s, i, e), l = Tl(t, typeof e == "string", o), u = e !== vi ? { ...l, ...a, ref: n } : {}, { children: c } = t, h = ye(() => $(c) ? c.get() : c, [c]);
  return mt(e, {
    ...u,
    children: h
  });
}
function bs(e) {
  const t = [{}, {}];
  return e?.values.forEach((n, s) => {
    t[0][s] = n.get(), t[1][s] = n.getVelocity();
  }), t;
}
function Un(e, t, n, s) {
  if (typeof t == "function") {
    const [i, o] = bs(s);
    t = t(n !== void 0 ? n : e.custom, i, o);
  }
  if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
    const [i, o] = bs(s);
    t = t(n !== void 0 ? n : e.custom, i, o);
  }
  return t;
}
function ht(e) {
  return $(e) ? e.get() : e;
}
function Bl({ scrapeMotionValuesFromProps: e, createRenderState: t }, n, s, i) {
  return {
    latestValues: Ol(n, s, i, e),
    renderState: t()
  };
}
function Ol(e, t, n, s) {
  const i = {}, o = s(e, {});
  for (const f in o)
    i[f] = ht(o[f]);
  let { initial: r, animate: a } = e;
  const l = Pt(e), u = gr(e);
  t && u && !l && e.inherit !== !1 && (r === void 0 && (r = t.initial), a === void 0 && (a = t.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || r === !1;
  const h = c ? a : r;
  if (h && typeof h != "boolean" && !Tt(h)) {
    const f = Array.isArray(h) ? h : [h];
    for (let g = 0; g < f.length; g++) {
      const m = Un(e, f[g]);
      if (m) {
        const { transitionEnd: y, transition: x, ...v } = m;
        for (const b in v) {
          let w = v[b];
          if (Array.isArray(w)) {
            const C = c ? w.length - 1 : 0;
            w = w[C];
          }
          w !== null && (i[b] = w);
        }
        for (const b in y)
          i[b] = y[b];
      }
    }
  }
  return i;
}
const Tr = (e) => (t, n) => {
  const s = _(wt), i = _(bt), o = () => Bl(e, t, s, i);
  return n ? o() : mn(o);
};
function zn(e, t, n) {
  const { style: s } = e, i = {};
  for (const o in s)
    ($(s[o]) || t.style && $(t.style[o]) || yr(o, e) || n?.getValue(o)?.liveStyle !== void 0) && (i[o] = s[o]);
  return i;
}
const _l = /* @__PURE__ */ Tr({
  scrapeMotionValuesFromProps: zn,
  createRenderState: $n
});
function Pr(e, t, n) {
  const s = zn(e, t, n);
  for (const i in e)
    if ($(e[i]) || $(t[i])) {
      const o = je.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      s[o] = e[i];
    }
  return s;
}
const $l = /* @__PURE__ */ Tr({
  scrapeMotionValuesFromProps: Pr,
  createRenderState: br
}), Wl = Symbol.for("motionComponentSymbol");
function Pe(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function Ul(e, t, n) {
  return dn(
    (s) => {
      s && e.onMount && e.onMount(s), t && (s ? t.mount(s) : t.unmount()), n && (typeof n == "function" ? n(s) : Pe(n) && (n.current = s));
    },
    /**
     * Include externalRef in dependencies to ensure the callback updates
     * when the ref changes, allowing proper ref forwarding.
     */
    [t]
  );
}
const Kn = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), zl = "framerAppearId", Sr = "data-" + Kn(zl), kr = Le({});
function Kl(e, t, n, s, i) {
  const { visualElement: o } = _(wt), r = _(mr), a = _(bt), l = _(jn).reducedMotion, u = Q(null);
  s = s || r.renderer, !u.current && s && (u.current = s(e, {
    visualState: t,
    parent: o,
    props: n,
    presenceContext: a,
    blockInitialAnimation: a ? a.initial === !1 : !1,
    reducedMotionConfig: l
  }));
  const c = u.current, h = _(kr);
  c && !c.projection && i && (c.type === "html" || c.type === "svg") && Gl(u.current, n, i, h);
  const f = Q(!1);
  bi(() => {
    c && f.current && c.update(n, a);
  });
  const g = n[Sr], m = Q(!!g && !window.MotionHandoffIsComplete?.(g) && window.MotionHasOptimisedAnimation?.(g));
  return wi(() => {
    c && (f.current = !0, window.MotionIsMounted = !0, c.updateFeatures(), c.scheduleRenderMicrotask(), m.current && c.animationState && c.animationState.animateChanges());
  }), Ie(() => {
    c && (!m.current && c.animationState && c.animationState.animateChanges(), m.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(g);
    }), m.current = !1), c.enteringChildren = void 0);
  }), c;
}
function Gl(e, t, n, s) {
  const { layoutId: i, layout: o, drag: r, dragConstraints: a, layoutScroll: l, layoutRoot: u, layoutCrossfade: c } = t;
  e.projection = new n(e.latestValues, t["data-framer-portal-id"] ? void 0 : Cr(e.parent)), e.projection.setOptions({
    layoutId: i,
    layout: o,
    alwaysMeasureLayout: !!r || a && Pe(a),
    visualElement: e,
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
function Cr(e) {
  if (e)
    return e.options.allowProjection !== !1 ? e.projection : Cr(e.parent);
}
function Rt(e, { forwardMotionProps: t = !1 } = {}, n, s) {
  n && vl(n);
  const i = Wn(e) ? $l : _l;
  function o(a, l) {
    let u;
    const c = {
      ..._(jn),
      ...a,
      layoutId: Hl(a)
    }, { isStatic: h } = c, f = Sl(a), g = i(a, h);
    if (!h && pn) {
      Xl();
      const m = Yl(c);
      u = m.MeasureLayout, f.visualElement = Kl(e, g, c, s, m.ProjectionNode);
    }
    return p(wt.Provider, { value: f, children: [u && f.visualElement ? d(u, { visualElement: f.visualElement, ...c }) : null, jl(e, a, Ul(g, f.visualElement, l), g, h, t)] });
  }
  o.displayName = `motion.${typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
  const r = un(o);
  return r[Wl] = e, r;
}
function Hl({ layoutId: e }) {
  const t = _(fn).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function Xl(e, t) {
  _(mr).strict;
}
function Yl(e) {
  const { drag: t, layout: n } = Ve;
  if (!t && !n)
    return {};
  const s = { ...t, ...n };
  return {
    MeasureLayout: t?.isEnabled(e) || n?.isEnabled(e) ? s.MeasureLayout : void 0,
    ProjectionNode: s.ProjectionNode
  };
}
function ql(e, t) {
  if (typeof Proxy > "u")
    return Rt;
  const n = /* @__PURE__ */ new Map(), s = (o, r) => Rt(o, r, e, t), i = (o, r) => s(o, r);
  return new Proxy(i, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (o, r) => r === "create" ? s : (n.has(r) || n.set(r, Rt(r, void 0, e, t)), n.get(r))
  });
}
function Ar({ top: e, left: t, right: n, bottom: s }) {
  return {
    x: { min: t, max: n },
    y: { min: e, max: s }
  };
}
function Zl({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function Jl(e, t) {
  if (!t)
    return e;
  const n = t({ x: e.left, y: e.top }), s = t({ x: e.right, y: e.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: s.y,
    right: s.x
  };
}
function Lt(e) {
  return e === void 0 || e === 1;
}
function tn({ scale: e, scaleX: t, scaleY: n }) {
  return !Lt(e) || !Lt(t) || !Lt(n);
}
function he(e) {
  return tn(e) || Nr(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function Nr(e) {
  return ws(e.x) || ws(e.y);
}
function ws(e) {
  return e && e !== "0%";
}
function vt(e, t, n) {
  const s = e - n, i = t * s;
  return n + i;
}
function Ts(e, t, n, s, i) {
  return i !== void 0 && (e = vt(e, i, s)), vt(e, n, s) + t;
}
function nn(e, t = 0, n = 1, s, i) {
  e.min = Ts(e.min, t, n, s, i), e.max = Ts(e.max, t, n, s, i);
}
function Mr(e, { x: t, y: n }) {
  nn(e.x, t.translate, t.scale, t.originPoint), nn(e.y, n.translate, n.scale, n.originPoint);
}
const Ps = 0.999999999999, Ss = 1.0000000000001;
function Ql(e, t, n, s = !1) {
  const i = n.length;
  if (!i)
    return;
  t.x = t.y = 1;
  let o, r;
  for (let a = 0; a < i; a++) {
    o = n[a], r = o.projectionDelta;
    const { visualElement: l } = o.options;
    l && l.props.style && l.props.style.display === "contents" || (s && o.options.layoutScroll && o.scroll && o !== o.root && ke(e, {
      x: -o.scroll.offset.x,
      y: -o.scroll.offset.y
    }), r && (t.x *= r.x.scale, t.y *= r.y.scale, Mr(e, r)), s && he(o.latestValues) && ke(e, o.latestValues));
  }
  t.x < Ss && t.x > Ps && (t.x = 1), t.y < Ss && t.y > Ps && (t.y = 1);
}
function Se(e, t) {
  e.min = e.min + t, e.max = e.max + t;
}
function ks(e, t, n, s, i = 0.5) {
  const o = V(e.min, e.max, i);
  nn(e, t, n, o, s);
}
function ke(e, t) {
  ks(e.x, t.x, t.scaleX, t.scale, t.originX), ks(e.y, t.y, t.scaleY, t.scale, t.originY);
}
function Dr(e, t) {
  return Ar(Jl(e.getBoundingClientRect(), t));
}
function ec(e, t, n) {
  const s = Dr(e, n), { scroll: i } = t;
  return i && (Se(s.x, i.offset.x), Se(s.y, i.offset.y)), s;
}
const Cs = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Ce = () => ({
  x: Cs(),
  y: Cs()
}), As = () => ({ min: 0, max: 0 }), R = () => ({
  x: As(),
  y: As()
}), sn = { current: null }, Vr = { current: !1 };
function tc() {
  if (Vr.current = !0, !!pn)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), t = () => sn.current = e.matches;
      e.addEventListener("change", t), t();
    } else
      sn.current = !1;
}
const nc = /* @__PURE__ */ new WeakMap();
function sc(e, t, n) {
  for (const s in t) {
    const i = t[s], o = n[s];
    if ($(i))
      e.addValue(s, i);
    else if ($(o))
      e.addValue(s, De(i, { owner: e }));
    else if (o !== i)
      if (e.hasValue(s)) {
        const r = e.getValue(s);
        r.liveStyle === !0 ? r.jump(i) : r.hasAnimated || r.set(i);
      } else {
        const r = e.getStaticValue(s);
        e.addValue(s, De(r !== void 0 ? r : i, { owner: e }));
      }
  }
  for (const s in n)
    t[s] === void 0 && e.removeValue(s);
  return t;
}
const Ns = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class ic {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, n, s) {
    return {};
  }
  constructor({ parent: t, props: n, presenceContext: s, reducedMotionConfig: i, blockInitialAnimation: o, visualState: r }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = En, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const f = K.now();
      this.renderScheduledAt < f && (this.renderScheduledAt = f, D.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u } = r;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = t, this.props = n, this.presenceContext = s, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = i, this.options = a, this.blockInitialAnimation = !!o, this.isControllingVariants = Pt(n), this.isVariantNode = gr(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: c, ...h } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const f in h) {
      const g = h[f];
      l[f] !== void 0 && $(g) && g.set(l[f]);
    }
  }
  mount(t) {
    this.current = t, nc.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), Vr.current || tc(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : sn.current, this.parent?.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), ae(this.notifyUpdate), ae(this.render), this.valueSubscriptions.forEach((t) => t()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const t in this.events)
      this.events[t].clear();
    for (const t in this.features) {
      const n = this.features[t];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  addChild(t) {
    this.children.add(t), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(t);
  }
  removeChild(t) {
    this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t);
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const s = Be.has(t);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (r) => {
      this.latestValues[t] = r, this.props.onUpdate && D.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let o;
    window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, t, n)), this.valueSubscriptions.set(t, () => {
      i(), o && o(), n.owner && n.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in Ve) {
      const n = Ve[t];
      if (!n)
        continue;
      const { isEnabled: s, Feature: i } = n;
      if (!this.features[t] && i && s(this.props) && (this.features[t] = new i(this)), this.features[t]) {
        const o = this.features[t];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : R();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let s = 0; s < Ns.length; s++) {
      const i = Ns[s];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const o = "on" + i, r = t[o];
      r && (this.propEventSubscriptions[i] = this.on(i, r));
    }
    this.prevMotionValues = sc(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
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
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, n) {
    const s = this.values.get(t);
    n !== s && (s && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), this.latestValues[t] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let s = this.values.get(t);
    return s === void 0 && n !== void 0 && (s = De(n === null ? void 0 : n, { owner: this }), this.addValue(t, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, n) {
    let s = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return s != null && (typeof s == "string" && (Ti(s) || Si(s)) ? s = parseFloat(s) : !hl(s) && le.test(n) && (s = rr(t, n)), this.setBaseTarget(t, $(s) ? s.get() : s)), $(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    const { initial: n } = this.props;
    let s;
    if (typeof n == "string" || typeof n == "object") {
      const o = Un(this.props, n, this.presenceContext?.custom);
      o && (s = o[t]);
    }
    if (n && s !== void 0)
      return s;
    const i = this.getBaseTargetFromProps(this.props, t);
    return i !== void 0 && !$(i) ? i : this.initialValues[t] !== void 0 && s === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new bn()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
  scheduleRenderMicrotask() {
    In.render(this.render);
  }
}
class Er extends ic {
  constructor() {
    super(...arguments), this.KeyframeResolver = el;
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: s }) {
    delete n[t], delete s[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    $(t) && (this.childSubscription = t.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function Rr(e, { style: t, vars: n }, s, i) {
  const o = e.style;
  let r;
  for (r in t)
    o[r] = t[r];
  i?.applyProjectionStyles(o, s);
  for (r in n)
    o.setProperty(r, n[r]);
}
function rc(e) {
  return window.getComputedStyle(e);
}
class oc extends Er {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Rr;
  }
  readValueFromInstance(t, n) {
    if (Be.has(n))
      return this.projection?.isProjecting ? Xt(n) : va(t, n);
    {
      const s = rc(t), i = (Pn(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return Dr(t, n);
  }
  build(t, n, s) {
    _n(t, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, s) {
    return zn(t, n, s);
  }
}
const Lr = /* @__PURE__ */ new Set([
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
function ac(e, t, n, s) {
  Rr(e, t, void 0, s);
  for (const i in t.attrs)
    e.setAttribute(Lr.has(i) ? i : Kn(i), t.attrs[i]);
}
class lc extends Er {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = R;
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (Be.has(n)) {
      const s = ir(n);
      return s && s.default || 0;
    }
    return n = Lr.has(n) ? n : Kn(n), t.getAttribute(n);
  }
  scrapeMotionValuesFromProps(t, n, s) {
    return Pr(t, n, s);
  }
  build(t, n, s) {
    vr(t, n, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(t, n, s, i) {
    ac(t, n, s, i);
  }
  mount(t) {
    this.isSVGTag = wr(t.tagName), super.mount(t);
  }
}
const cc = (e, t) => Wn(e) ? new lc(t) : new oc(t, {
  allowProjection: e !== vi
});
function Ae(e, t, n) {
  const s = e.getProps();
  return Un(s, t, n !== void 0 ? n : s.custom, e);
}
const rn = (e) => Array.isArray(e);
function uc(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, De(n));
}
function dc(e) {
  return rn(e) ? e[e.length - 1] || 0 : e;
}
function hc(e, t) {
  const n = Ae(e, t);
  let { transitionEnd: s = {}, transition: i = {}, ...o } = n || {};
  o = { ...o, ...s };
  for (const r in o) {
    const a = dc(o[r]);
    uc(e, r, a);
  }
}
function fc(e) {
  return !!($(e) && e.add);
}
function on(e, t) {
  const n = e.getValue("willChange");
  if (fc(n))
    return n.add(t);
  if (!n && ie.WillChange) {
    const s = new ie.WillChange("auto");
    e.addValue("willChange", s), s.add(t);
  }
}
function Ir(e) {
  return e.props[Sr];
}
const mc = (e) => e !== null;
function pc(e, { repeat: t, repeatType: n = "loop" }, s) {
  const i = e.filter(mc), o = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return i[o];
}
const gc = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, yc = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), xc = {
  type: "keyframes",
  duration: 0.8
}, vc = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, bc = (e, { keyframes: t }) => t.length > 2 ? xc : Be.has(e) ? e.startsWith("scale") ? yc(t[1]) : gc : vc;
function wc({ when: e, delay: t, delayChildren: n, staggerChildren: s, staggerDirection: i, repeat: o, repeatType: r, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
const Gn = (e, t, n, s = {}, i, o) => (r) => {
  const a = Rn(s, e) || {}, l = a.delay || s.delay || 0;
  let { elapsed: u = 0 } = s;
  u = u - /* @__PURE__ */ te(l);
  const c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (f) => {
      t.set(f), a.onUpdate && a.onUpdate(f);
    },
    onComplete: () => {
      r(), a.onComplete && a.onComplete();
    },
    name: e,
    motionValue: t,
    element: o ? void 0 : i
  };
  wc(a) || Object.assign(c, bc(e, c)), c.duration && (c.duration = /* @__PURE__ */ te(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ te(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let h = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (Qt(c), c.delay === 0 && (h = !0)), (ie.instantAnimations || ie.skipAnimations) && (h = !0, Qt(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, h && !o && t.get() !== void 0) {
    const f = pc(c.keyframes, a);
    if (f !== void 0) {
      D.update(() => {
        c.onUpdate(f), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Vn(c) : new Wa(c);
};
function Tc({ protectedKeys: e, needsAnimating: t }, n) {
  const s = e.hasOwnProperty(n) && t[n] !== !0;
  return t[n] = !1, s;
}
function Fr(e, t, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  let { transition: o = e.getDefaultTransition(), transitionEnd: r, ...a } = t;
  s && (o = s);
  const l = [], u = i && e.animationState && e.animationState.getState()[i];
  for (const c in a) {
    const h = e.getValue(c, e.latestValues[c] ?? null), f = a[c];
    if (f === void 0 || u && Tc(u, c))
      continue;
    const g = {
      delay: n,
      ...Rn(o || {}, c)
    }, m = h.get();
    if (m !== void 0 && !h.isAnimating && !Array.isArray(f) && f === m && !g.velocity)
      continue;
    let y = !1;
    if (window.MotionHandoffAnimation) {
      const v = Ir(e);
      if (v) {
        const b = window.MotionHandoffAnimation(v, c, D);
        b !== null && (g.startTime = b, y = !0);
      }
    }
    on(e, c), h.start(Gn(c, h, f, e.shouldReduceMotion && tr.has(c) ? { type: !1 } : g, e, y));
    const x = h.animation;
    x && l.push(x);
  }
  return r && Promise.all(l).then(() => {
    D.update(() => {
      r && hc(e, r);
    });
  }), l;
}
function jr(e, t, n, s = 0, i = 1) {
  const o = Array.from(e).sort((u, c) => u.sortNodePosition(c)).indexOf(t), r = e.size, a = (r - 1) * s;
  return typeof n == "function" ? n(o, r) : i === 1 ? o * s : a - o * s;
}
function an(e, t, n = {}) {
  const s = Ae(e, t, n.type === "exit" ? e.presenceContext?.custom : void 0);
  let { transition: i = e.getDefaultTransition() || {} } = s || {};
  n.transitionOverride && (i = n.transitionOverride);
  const o = s ? () => Promise.all(Fr(e, s, n)) : () => Promise.resolve(), r = e.variantChildren && e.variantChildren.size ? (l = 0) => {
    const { delayChildren: u = 0, staggerChildren: c, staggerDirection: h } = i;
    return Pc(e, t, l, u, c, h, n);
  } : () => Promise.resolve(), { when: a } = i;
  if (a) {
    const [l, u] = a === "beforeChildren" ? [o, r] : [r, o];
    return l().then(() => u());
  } else
    return Promise.all([o(), r(n.delay)]);
}
function Pc(e, t, n = 0, s = 0, i = 0, o = 1, r) {
  const a = [];
  for (const l of e.variantChildren)
    l.notify("AnimationStart", t), a.push(an(l, t, {
      ...r,
      delay: n + (typeof s == "function" ? 0 : s) + jr(e.variantChildren, l, s, i, o)
    }).then(() => l.notify("AnimationComplete", t)));
  return Promise.all(a);
}
function Sc(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let s;
  if (Array.isArray(t)) {
    const i = t.map((o) => an(e, o, n));
    s = Promise.all(i);
  } else if (typeof t == "string")
    s = an(e, t, n);
  else {
    const i = typeof t == "function" ? Ae(e, t, n.custom) : t;
    s = Promise.all(Fr(e, i, n));
  }
  return s.then(() => {
    e.notify("AnimationComplete", t);
  });
}
function Br(e, t) {
  if (!Array.isArray(t))
    return !1;
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let s = 0; s < n; s++)
    if (t[s] !== e[s])
      return !1;
  return !0;
}
const kc = On.length;
function Or(e) {
  if (!e)
    return;
  if (!e.isControllingVariants) {
    const n = e.parent ? Or(e.parent) || {} : {};
    return e.props.initial !== void 0 && (n.initial = e.props.initial), n;
  }
  const t = {};
  for (let n = 0; n < kc; n++) {
    const s = On[n], i = e.props[s];
    (Je(i) || i === !1) && (t[s] = i);
  }
  return t;
}
const Cc = [...Bn].reverse(), Ac = Bn.length;
function Nc(e) {
  return (t) => Promise.all(t.map(({ animation: n, options: s }) => Sc(e, n, s)));
}
function Mc(e) {
  let t = Nc(e), n = Ms(), s = !0;
  const i = (l) => (u, c) => {
    const h = Ae(e, c, l === "exit" ? e.presenceContext?.custom : void 0);
    if (h) {
      const { transition: f, transitionEnd: g, ...m } = h;
      u = { ...u, ...m, ...g };
    }
    return u;
  };
  function o(l) {
    t = l(e);
  }
  function r(l) {
    const { props: u } = e, c = Or(e.parent) || {}, h = [], f = /* @__PURE__ */ new Set();
    let g = {}, m = 1 / 0;
    for (let x = 0; x < Ac; x++) {
      const v = Cc[x], b = n[v], w = u[v] !== void 0 ? u[v] : c[v], C = Je(w), T = v === l ? b.isActive : null;
      T === !1 && (m = x);
      let A = w === c[v] && w !== u[v] && C;
      if (A && s && e.manuallyAnimateOnMount && (A = !1), b.protectedKeys = { ...g }, // If it isn't active and hasn't *just* been set as inactive
      !b.isActive && T === null || // If we didn't and don't have any defined prop for this animation type
      !w && !b.prevProp || // Or if the prop doesn't define an animation
      Tt(w) || typeof w == "boolean")
        continue;
      const N = Dc(b.prevProp, w);
      let S = N || // If we're making this variant active, we want to always make it active
      v === l && b.isActive && !A && C || // If we removed a higher-priority variant (i is in reverse order)
      x > m && C, I = !1;
      const W = Array.isArray(w) ? w : [w];
      let re = W.reduce(i(v), {});
      T === !1 && (re = {});
      const { prevResolvedValues: Hn = {} } = b, lo = {
        ...Hn,
        ...re
      }, Xn = (j) => {
        S = !0, f.has(j) && (I = !0, f.delete(j)), b.needsAnimating[j] = !0;
        const H = e.getValue(j);
        H && (H.liveStyle = !1);
      };
      for (const j in lo) {
        const H = re[j], ue = Hn[j];
        if (g.hasOwnProperty(j))
          continue;
        let we = !1;
        rn(H) && rn(ue) ? we = !Br(H, ue) : we = H !== ue, we ? H != null ? Xn(j) : f.add(j) : H !== void 0 && f.has(j) ? Xn(j) : b.protectedKeys[j] = !0;
      }
      b.prevProp = w, b.prevResolvedValues = re, b.isActive && (g = { ...g, ...re }), s && e.blockInitialAnimation && (S = !1);
      const Yn = A && N;
      S && (!Yn || I) && h.push(...W.map((j) => {
        const H = { type: v };
        if (typeof j == "string" && s && !Yn && e.manuallyAnimateOnMount && e.parent) {
          const { parent: ue } = e, we = Ae(ue, j);
          if (ue.enteringChildren && we) {
            const { delayChildren: co } = we.transition || {};
            H.delay = jr(ue.enteringChildren, e, co);
          }
        }
        return {
          animation: j,
          options: H
        };
      }));
    }
    if (f.size) {
      const x = {};
      if (typeof u.initial != "boolean") {
        const v = Ae(e, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        v && v.transition && (x.transition = v.transition);
      }
      f.forEach((v) => {
        const b = e.getBaseTarget(v), w = e.getValue(v);
        w && (w.liveStyle = !0), x[v] = b ?? null;
      }), h.push({ animation: x });
    }
    let y = !!h.length;
    return s && (u.initial === !1 || u.initial === u.animate) && !e.manuallyAnimateOnMount && (y = !1), s = !1, y ? t(h) : Promise.resolve();
  }
  function a(l, u) {
    if (n[l].isActive === u)
      return Promise.resolve();
    e.variantChildren?.forEach((h) => h.animationState?.setActive(l, u)), n[l].isActive = u;
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
      n = Ms();
    }
  };
}
function Dc(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !Br(t, e) : !1;
}
function de(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Ms() {
  return {
    animate: de(!0),
    whileInView: de(),
    whileHover: de(),
    whileTap: de(),
    whileDrag: de(),
    whileFocus: de(),
    exit: de()
  };
}
class ce {
  constructor(t) {
    this.isMounted = !1, this.node = t;
  }
  update() {
  }
}
class Vc extends ce {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(t) {
    super(t), t.animationState || (t.animationState = Mc(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    Tt(t) && (this.unmountControls = t.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let Ec = 0;
class Rc extends ce {
  constructor() {
    super(...arguments), this.id = Ec++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === s)
      return;
    const i = this.node.animationState.setActive("exit", !t);
    n && !t && i.then(() => {
      n(this.id);
    });
  }
  mount() {
    const { register: t, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), t && (this.unmount = t(this.id));
  }
  unmount() {
  }
}
const Lc = {
  animation: {
    Feature: Vc
  },
  exit: {
    Feature: Rc
  }
};
function et(e, t, n, s = { passive: !0 }) {
  return e.addEventListener(t, n, s), () => e.removeEventListener(t, n);
}
function it(e) {
  return {
    point: {
      x: e.pageX,
      y: e.pageY
    }
  };
}
const Ic = (e) => (t) => Fn(t) && e(t, it(t));
function Ke(e, t, n, s) {
  return et(e, t, Ic(n), s);
}
const _r = 1e-4, Fc = 1 - _r, jc = 1 + _r, $r = 0.01, Bc = 0 - $r, Oc = 0 + $r;
function z(e) {
  return e.max - e.min;
}
function _c(e, t, n) {
  return Math.abs(e - t) <= n;
}
function Ds(e, t, n, s = 0.5) {
  e.origin = s, e.originPoint = V(t.min, t.max, e.origin), e.scale = z(n) / z(t), e.translate = V(n.min, n.max, e.origin) - e.originPoint, (e.scale >= Fc && e.scale <= jc || isNaN(e.scale)) && (e.scale = 1), (e.translate >= Bc && e.translate <= Oc || isNaN(e.translate)) && (e.translate = 0);
}
function Ge(e, t, n, s) {
  Ds(e.x, t.x, n.x, s ? s.originX : void 0), Ds(e.y, t.y, n.y, s ? s.originY : void 0);
}
function Vs(e, t, n) {
  e.min = n.min + t.min, e.max = e.min + z(t);
}
function $c(e, t, n) {
  Vs(e.x, t.x, n.x), Vs(e.y, t.y, n.y);
}
function Es(e, t, n) {
  e.min = t.min - n.min, e.max = e.min + z(t);
}
function He(e, t, n) {
  Es(e.x, t.x, n.x), Es(e.y, t.y, n.y);
}
function Y(e) {
  return [e("x"), e("y")];
}
const Wr = ({ current: e }) => e ? e.ownerDocument.defaultView : null, Rs = (e, t) => Math.abs(e - t);
function Wc(e, t) {
  const n = Rs(e.x, t.x), s = Rs(e.y, t.y);
  return Math.sqrt(n ** 2 + s ** 2);
}
class Ur {
  constructor(t, n, { transformPagePoint: s, contextWindow: i = window, dragSnapToOrigin: o = !1, distanceThreshold: r = 3 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const f = Ft(this.lastMoveEventInfo, this.history), g = this.startEvent !== null, m = Wc(f.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!g && !m)
        return;
      const { point: y } = f, { timestamp: x } = B;
      this.history.push({ ...y, timestamp: x });
      const { onStart: v, onMove: b } = this.handlers;
      g || (v && v(this.lastMoveEvent, f), this.startEvent = this.lastMoveEvent), b && b(this.lastMoveEvent, f);
    }, this.handlePointerMove = (f, g) => {
      this.lastMoveEvent = f, this.lastMoveEventInfo = It(g, this.transformPagePoint), D.update(this.updatePoint, !0);
    }, this.handlePointerUp = (f, g) => {
      this.end();
      const { onEnd: m, onSessionEnd: y, resumeAnimation: x } = this.handlers;
      if (this.dragSnapToOrigin && x && x(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const v = Ft(f.type === "pointercancel" ? this.lastMoveEventInfo : It(g, this.transformPagePoint), this.history);
      this.startEvent && m && m(f, v), y && y(f, v);
    }, !Fn(t))
      return;
    this.dragSnapToOrigin = o, this.handlers = n, this.transformPagePoint = s, this.distanceThreshold = r, this.contextWindow = i || window;
    const a = it(t), l = It(a, this.transformPagePoint), { point: u } = l, { timestamp: c } = B;
    this.history = [{ ...u, timestamp: c }];
    const { onSessionStart: h } = n;
    h && h(t, Ft(l, this.history)), this.removeListeners = tt(Ke(this.contextWindow, "pointermove", this.handlePointerMove), Ke(this.contextWindow, "pointerup", this.handlePointerUp), Ke(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), ae(this.updatePoint);
  }
}
function It(e, t) {
  return t ? { point: t(e.point) } : e;
}
function Ls(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Ft({ point: e }, t) {
  return {
    point: e,
    delta: Ls(e, zr(t)),
    offset: Ls(e, Uc(t)),
    velocity: zc(t, 0.1)
  };
}
function Uc(e) {
  return e[0];
}
function zr(e) {
  return e[e.length - 1];
}
function zc(e, t) {
  if (e.length < 2)
    return { x: 0, y: 0 };
  let n = e.length - 1, s = null;
  const i = zr(e);
  for (; n >= 0 && (s = e[n], !(i.timestamp - s.timestamp > /* @__PURE__ */ te(t))); )
    n--;
  if (!s)
    return { x: 0, y: 0 };
  const o = /* @__PURE__ */ q(i.timestamp - s.timestamp);
  if (o === 0)
    return { x: 0, y: 0 };
  const r = {
    x: (i.x - s.x) / o,
    y: (i.y - s.y) / o
  };
  return r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r;
}
function Kc(e, { min: t, max: n }, s) {
  return t !== void 0 && e < t ? e = s ? V(t, e, s.min) : Math.max(e, t) : n !== void 0 && e > n && (e = s ? V(n, e, s.max) : Math.min(e, n)), e;
}
function Is(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0
  };
}
function Gc(e, { top: t, left: n, bottom: s, right: i }) {
  return {
    x: Is(e.x, n, i),
    y: Is(e.y, t, s)
  };
}
function Fs(e, t) {
  let n = t.min - e.min, s = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, s] = [s, n]), { min: n, max: s };
}
function Hc(e, t) {
  return {
    x: Fs(e.x, t.x),
    y: Fs(e.y, t.y)
  };
}
function Xc(e, t) {
  let n = 0.5;
  const s = z(e), i = z(t);
  return i > s ? n = /* @__PURE__ */ Ye(t.min, t.max - s, e.min) : s > i && (n = /* @__PURE__ */ Ye(e.min, e.max - i, t.min)), se(0, 1, n);
}
function Yc(e, t) {
  const n = {};
  return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n;
}
const ln = 0.35;
function qc(e = ln) {
  return e === !1 ? e = 0 : e === !0 && (e = ln), {
    x: js(e, "left", "right"),
    y: js(e, "top", "bottom")
  };
}
function js(e, t, n) {
  return {
    min: Bs(e, t),
    max: Bs(e, n)
  };
}
function Bs(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const Zc = /* @__PURE__ */ new WeakMap();
class Jc {
  constructor(t) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = R(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = t;
  }
  start(t, { snapToCursor: n = !1, distanceThreshold: s } = {}) {
    const { presenceContext: i } = this.visualElement;
    if (i && i.isPresent === !1)
      return;
    const o = (h) => {
      const { dragSnapToOrigin: f } = this.getProps();
      f ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(it(h).point);
    }, r = (h, f) => {
      const { drag: g, dragPropagation: m, onDragStart: y } = this.getProps();
      if (g && !m && (this.openDragLock && this.openDragLock(), this.openDragLock = il(g), !this.openDragLock))
        return;
      this.latestPointerEvent = h, this.latestPanInfo = f, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Y((v) => {
        let b = this.getAxisMotionValue(v).get() || 0;
        if (ne.test(b)) {
          const { projection: w } = this.visualElement;
          if (w && w.layout) {
            const C = w.layout.layoutBox[v];
            C && (b = z(C) * (parseFloat(b) / 100));
          }
        }
        this.originPoint[v] = b;
      }), y && D.postRender(() => y(h, f)), on(this.visualElement, "transform");
      const { animationState: x } = this.visualElement;
      x && x.setActive("whileDrag", !0);
    }, a = (h, f) => {
      this.latestPointerEvent = h, this.latestPanInfo = f;
      const { dragPropagation: g, dragDirectionLock: m, onDirectionLock: y, onDrag: x } = this.getProps();
      if (!g && !this.openDragLock)
        return;
      const { offset: v } = f;
      if (m && this.currentDirection === null) {
        this.currentDirection = Qc(v), this.currentDirection !== null && y && y(this.currentDirection);
        return;
      }
      this.updateAxis("x", f.point, v), this.updateAxis("y", f.point, v), this.visualElement.render(), x && x(h, f);
    }, l = (h, f) => {
      this.latestPointerEvent = h, this.latestPanInfo = f, this.stop(h, f), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, u = () => Y((h) => this.getAnimationState(h) === "paused" && this.getAxisMotionValue(h).animation?.play()), { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new Ur(t, {
      onSessionStart: o,
      onStart: r,
      onMove: a,
      onSessionEnd: l,
      resumeAnimation: u
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: c,
      distanceThreshold: s,
      contextWindow: Wr(this.visualElement)
    });
  }
  /**
   * @internal
   */
  stop(t, n) {
    const s = t || this.latestPointerEvent, i = n || this.latestPanInfo, o = this.isDragging;
    if (this.cancel(), !o || !i || !s)
      return;
    const { velocity: r } = i;
    this.startAnimation(r);
    const { onDragEnd: a } = this.getProps();
    a && D.postRender(() => a(s, i));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    t && (t.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const { dragPropagation: s } = this.getProps();
    !s && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  updateAxis(t, n, s) {
    const { drag: i } = this.getProps();
    if (!s || !ct(t, i, this.currentDirection))
      return;
    const o = this.getAxisMotionValue(t);
    let r = this.originPoint[t] + s[t];
    this.constraints && this.constraints[t] && (r = Kc(r, this.constraints[t], this.elastic[t])), o.set(r);
  }
  resolveConstraints() {
    const { dragConstraints: t, dragElastic: n } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, i = this.constraints;
    t && Pe(t) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : t && s ? this.constraints = Gc(s.layoutBox, t) : this.constraints = !1, this.elastic = qc(n), i !== this.constraints && s && this.constraints && !this.hasMutatedConstraints && Y((o) => {
      this.constraints !== !1 && this.getAxisMotionValue(o) && (this.constraints[o] = Yc(s.layoutBox[o], this.constraints[o]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !Pe(t))
      return !1;
    const s = t.current, { projection: i } = this.visualElement;
    if (!i || !i.layout)
      return !1;
    const o = ec(s, i.root, this.visualElement.getTransformPagePoint());
    let r = Hc(i.layout.layoutBox, o);
    if (n) {
      const a = n(Zl(r));
      this.hasMutatedConstraints = !!a, a && (r = Ar(a));
    }
    return r;
  }
  startAnimation(t) {
    const { drag: n, dragMomentum: s, dragElastic: i, dragTransition: o, dragSnapToOrigin: r, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, u = Y((c) => {
      if (!ct(c, n, this.currentDirection))
        return;
      let h = l && l[c] || {};
      r && (h = { min: 0, max: 0 });
      const f = i ? 200 : 1e6, g = i ? 40 : 1e7, m = {
        type: "inertia",
        velocity: s ? t[c] : 0,
        bounceStiffness: f,
        bounceDamping: g,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...o,
        ...h
      };
      return this.startAxisValueAnimation(c, m);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(t, n) {
    const s = this.getAxisMotionValue(t);
    return on(this.visualElement, t), s.start(Gn(t, s, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    Y((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    Y((t) => this.getAxisMotionValue(t).animation?.pause());
  }
  getAnimationState(t) {
    return this.getAxisMotionValue(t).animation?.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`, s = this.visualElement.getProps(), i = s[n];
    return i || this.visualElement.getValue(t, (s.initial ? s.initial[t] : void 0) || 0);
  }
  snapToCursor(t) {
    Y((n) => {
      const { drag: s } = this.getProps();
      if (!ct(n, s, this.currentDirection))
        return;
      const { projection: i } = this.visualElement, o = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: r, max: a } = i.layout.layoutBox[n];
        o.set(t[n] - V(r, a, 0.5));
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
    const { drag: t, dragConstraints: n } = this.getProps(), { projection: s } = this.visualElement;
    if (!Pe(n) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    Y((r) => {
      const a = this.getAxisMotionValue(r);
      if (a && this.constraints !== !1) {
        const l = a.get();
        i[r] = Xc({ min: l, max: l }, this.constraints[r]);
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    this.visualElement.current.style.transform = o ? o({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.resolveConstraints(), Y((r) => {
      if (!ct(r, t, null))
        return;
      const a = this.getAxisMotionValue(r), { min: l, max: u } = this.constraints[r];
      a.set(V(l, u, i[r]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Zc.set(this.visualElement, this);
    const t = this.visualElement.current, n = Ke(t, "pointerdown", (l) => {
      const { drag: u, dragListener: c = !0 } = this.getProps();
      u && c && this.start(l);
    }), s = () => {
      const { dragConstraints: l } = this.getProps();
      Pe(l) && l.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: i } = this.visualElement, o = i.addEventListener("measure", s);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), D.read(s);
    const r = et(window, "resize", () => this.scalePositionWithinConstraints()), a = i.addEventListener("didUpdate", (({ delta: l, hasLayoutChanged: u }) => {
      this.isDragging && u && (Y((c) => {
        const h = this.getAxisMotionValue(c);
        h && (this.originPoint[c] += l[c].translate, h.set(h.get() + l[c].translate));
      }), this.visualElement.render());
    }));
    return () => {
      r(), n(), o(), a && a();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: s = !1, dragPropagation: i = !1, dragConstraints: o = !1, dragElastic: r = ln, dragMomentum: a = !0 } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: s,
      dragPropagation: i,
      dragConstraints: o,
      dragElastic: r,
      dragMomentum: a
    };
  }
}
function ct(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function Qc(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? n = "y" : Math.abs(e.x) > t && (n = "x"), n;
}
class eu extends ce {
  constructor(t) {
    super(t), this.removeGroupControls = Z, this.removeListeners = Z, this.controls = new Jc(t);
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Z;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const Os = (e) => (t, n) => {
  e && D.postRender(() => e(t, n));
};
class tu extends ce {
  constructor() {
    super(...arguments), this.removePointerDownListener = Z;
  }
  onPointerDown(t) {
    this.session = new Ur(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Wr(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: n, onPan: s, onPanEnd: i } = this.node.getProps();
    return {
      onSessionStart: Os(t),
      onStart: Os(n),
      onMove: s,
      onEnd: (o, r) => {
        delete this.session, i && D.postRender(() => i(o, r));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Ke(this.node.current, "pointerdown", (t) => this.onPointerDown(t));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const ft = {
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
function _s(e, t) {
  return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
const _e = {
  correct: (e, t) => {
    if (!t.target)
      return e;
    if (typeof e == "string")
      if (P.test(e))
        e = parseFloat(e);
      else
        return e;
    const n = _s(e, t.target.x), s = _s(e, t.target.y);
    return `${n}% ${s}%`;
  }
}, nu = {
  correct: (e, { treeScale: t, projectionDelta: n }) => {
    const s = e, i = le.parse(e);
    if (i.length > 5)
      return s;
    const o = le.createTransformer(e), r = typeof i[0] != "number" ? 1 : 0, a = n.x.scale * t.x, l = n.y.scale * t.y;
    i[0 + r] /= a, i[1 + r] /= l;
    const u = V(a, l, 0.5);
    return typeof i[2 + r] == "number" && (i[2 + r] /= u), typeof i[3 + r] == "number" && (i[3 + r] /= u), o(i);
  }
};
let jt = !1;
class su extends xi {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: s, layoutId: i } = this.props, { projection: o } = t;
    kl(iu), o && (n.group && n.group.add(o), s && s.register && i && s.register(o), jt && o.root.didUpdate(), o.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), o.setOptions({
      ...o.options,
      onExitComplete: () => this.safeToRemove()
    })), ft.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: n, visualElement: s, drag: i, isPresent: o } = this.props, { projection: r } = s;
    return r && (r.isPresent = o, jt = !0, i || t.layoutDependency !== n || n === void 0 || t.isPresent !== o ? r.willUpdate() : this.safeToRemove(), t.isPresent !== o && (o ? r.promote() : r.relegate() || D.postRender(() => {
      const a = r.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t && (t.root.didUpdate(), In.postRender(() => {
      !t.currentAnimation && t.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: s } = this.props, { projection: i } = t;
    jt = !0, i && (i.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(i), s && s.deregister && s.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function Kr(e) {
  const [t, n] = hr(), s = _(fn);
  return d(su, { ...e, layoutGroup: s, switchLayoutGroup: _(kr), isPresent: t, safeToRemove: n });
}
const iu = {
  borderRadius: {
    ..._e,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: _e,
  borderTopRightRadius: _e,
  borderBottomLeftRadius: _e,
  borderBottomRightRadius: _e,
  boxShadow: nu
};
function ru(e, t, n) {
  const s = $(e) ? e : De(e);
  return s.start(Gn("", s, t, n)), s.animation;
}
const ou = (e, t) => e.depth - t.depth;
class au {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(t) {
    gn(this.children, t), this.isDirty = !0;
  }
  remove(t) {
    yn(this.children, t), this.isDirty = !0;
  }
  forEach(t) {
    this.isDirty && this.children.sort(ou), this.isDirty = !1, this.children.forEach(t);
  }
}
function lu(e, t) {
  const n = K.now(), s = ({ timestamp: i }) => {
    const o = i - n;
    o >= t && (ae(s), e(o - t));
  };
  return D.setup(s, !0), () => ae(s);
}
const Gr = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], cu = Gr.length, $s = (e) => typeof e == "string" ? parseFloat(e) : e, Ws = (e) => typeof e == "number" || P.test(e);
function uu(e, t, n, s, i, o) {
  i ? (e.opacity = V(0, n.opacity ?? 1, du(s)), e.opacityExit = V(t.opacity ?? 1, 0, hu(s))) : o && (e.opacity = V(t.opacity ?? 1, n.opacity ?? 1, s));
  for (let r = 0; r < cu; r++) {
    const a = `border${Gr[r]}Radius`;
    let l = Us(t, a), u = Us(n, a);
    if (l === void 0 && u === void 0)
      continue;
    l || (l = 0), u || (u = 0), l === 0 || u === 0 || Ws(l) === Ws(u) ? (e[a] = Math.max(V($s(l), $s(u), s), 0), (ne.test(u) || ne.test(l)) && (e[a] += "%")) : e[a] = u;
  }
  (t.rotate || n.rotate) && (e.rotate = V(t.rotate || 0, n.rotate || 0, s));
}
function Us(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const du = /* @__PURE__ */ Hr(0, 0.5, Ei), hu = /* @__PURE__ */ Hr(0.5, 0.95, Z);
function Hr(e, t, n) {
  return (s) => s < e ? 0 : s > t ? 1 : n(/* @__PURE__ */ Ye(e, t, s));
}
function zs(e, t) {
  e.min = t.min, e.max = t.max;
}
function X(e, t) {
  zs(e.x, t.x), zs(e.y, t.y);
}
function Ks(e, t) {
  e.translate = t.translate, e.scale = t.scale, e.originPoint = t.originPoint, e.origin = t.origin;
}
function Gs(e, t, n, s, i) {
  return e -= t, e = vt(e, 1 / n, s), i !== void 0 && (e = vt(e, 1 / i, s)), e;
}
function fu(e, t = 0, n = 1, s = 0.5, i, o = e, r = e) {
  if (ne.test(t) && (t = parseFloat(t), t = V(r.min, r.max, t / 100) - r.min), typeof t != "number")
    return;
  let a = V(o.min, o.max, s);
  e === o && (a -= t), e.min = Gs(e.min, t, n, a, i), e.max = Gs(e.max, t, n, a, i);
}
function Hs(e, t, [n, s, i], o, r) {
  fu(e, t[n], t[s], t[i], t.scale, o, r);
}
const mu = ["x", "scaleX", "originX"], pu = ["y", "scaleY", "originY"];
function Xs(e, t, n, s) {
  Hs(e.x, t, mu, n ? n.x : void 0, s ? s.x : void 0), Hs(e.y, t, pu, n ? n.y : void 0, s ? s.y : void 0);
}
function Ys(e) {
  return e.translate === 0 && e.scale === 1;
}
function Xr(e) {
  return Ys(e.x) && Ys(e.y);
}
function qs(e, t) {
  return e.min === t.min && e.max === t.max;
}
function gu(e, t) {
  return qs(e.x, t.x) && qs(e.y, t.y);
}
function Zs(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
function Yr(e, t) {
  return Zs(e.x, t.x) && Zs(e.y, t.y);
}
function Js(e) {
  return z(e.x) / z(e.y);
}
function Qs(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
class yu {
  constructor() {
    this.members = [];
  }
  add(t) {
    gn(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (yn(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((i) => t === i);
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
  promote(t, n) {
    const s = this.lead;
    if (t !== s && (this.prevLead = s, this.lead = t, t.show(), s)) {
      s.instance && s.scheduleRender(), t.scheduleRender(), t.resumeFrom = s, n && (t.resumeFrom.preserveOpacity = !0), s.snapshot && (t.snapshot = s.snapshot, t.snapshot.latestValues = s.animationValues || s.latestValues), t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
      const { crossfade: i } = t.options;
      i === !1 && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: s } = t;
      n.onExitComplete && n.onExitComplete(), s && s.options.onExitComplete && s.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
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
function xu(e, t, n) {
  let s = "";
  const i = e.x.translate / t.x, o = e.y.translate / t.y, r = n?.z || 0;
  if ((i || o || r) && (s = `translate3d(${i}px, ${o}px, ${r}px) `), (t.x !== 1 || t.y !== 1) && (s += `scale(${1 / t.x}, ${1 / t.y}) `), n) {
    const { transformPerspective: u, rotate: c, rotateX: h, rotateY: f, skewX: g, skewY: m } = n;
    u && (s = `perspective(${u}px) ${s}`), c && (s += `rotate(${c}deg) `), h && (s += `rotateX(${h}deg) `), f && (s += `rotateY(${f}deg) `), g && (s += `skewX(${g}deg) `), m && (s += `skewY(${m}deg) `);
  }
  const a = e.x.scale * t.x, l = e.y.scale * t.y;
  return (a !== 1 || l !== 1) && (s += `scale(${a}, ${l})`), s || "none";
}
const Bt = ["", "X", "Y", "Z"], vu = 1e3;
let bu = 0;
function Ot(e, t, n, s) {
  const { latestValues: i } = t;
  i[e] && (n[e] = i[e], t.setStaticValue(e, 0), s && (s[e] = 0));
}
function qr(e) {
  if (e.hasCheckedOptimisedAppear = !0, e.root === e)
    return;
  const { visualElement: t } = e.options;
  if (!t)
    return;
  const n = Ir(t);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: o } = e.options;
    window.MotionCancelOptimisedAnimation(n, "transform", D, !(i || o));
  }
  const { parent: s } = e;
  s && !s.hasCheckedOptimisedAppear && qr(s);
}
function Zr({ attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: s, resetTransform: i }) {
  return class {
    constructor(r = {}, a = t?.()) {
      this.id = bu++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(Pu), this.nodes.forEach(Au), this.nodes.forEach(Nu), this.nodes.forEach(Su);
      }, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = r, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new au());
    }
    addEventListener(r, a) {
      return this.eventHandlers.has(r) || this.eventHandlers.set(r, new bn()), this.eventHandlers.get(r).add(a);
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
      this.isSVG = dr(r) && !ul(r), this.instance = r;
      const { layoutId: a, layout: l, visualElement: u } = this.options;
      if (u && !u.current && u.mount(r), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), e) {
        let c, h = 0;
        const f = () => this.root.updateBlockedByResize = !1;
        D.read(() => {
          h = window.innerWidth;
        }), e(r, () => {
          const g = window.innerWidth;
          g !== h && (h = g, this.root.updateBlockedByResize = !0, c && c(), c = lu(f, 250), ft.hasAnimatedSinceResize && (ft.hasAnimatedSinceResize = !1, this.nodes.forEach(ni)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && u && (a || l) && this.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: h, hasRelativeLayoutChanged: f, layout: g }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const m = this.options.transition || u.getDefaultTransition() || Ru, { onLayoutAnimationStart: y, onLayoutAnimationComplete: x } = u.getProps(), v = !this.targetLayout || !Yr(this.targetLayout, g), b = !h && f;
        if (this.options.layoutRoot || this.resumeFrom || b || h && (v || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const w = {
            ...Rn(m, "layout"),
            onPlay: y,
            onComplete: x
          };
          (u.shouldReduceMotion || this.options.layoutRoot) && (w.delay = 0, w.type = !1), this.startAnimation(w), this.setAnimationOrigin(c, b);
        } else
          h || ni(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = g;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const r = this.getStack();
      r && r.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), ae(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(Mu), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && qr(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
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
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(ei);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(ti);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(Cu), this.nodes.forEach(wu), this.nodes.forEach(Tu)) : this.nodes.forEach(ti), this.clearAllSnapshots();
      const a = K.now();
      B.delta = se(0, 1e3 / 60, a - B.timestamp), B.timestamp = a, B.isProcessing = !0, At.update.process(B), At.preRender.process(B), At.render.process(B), B.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, In.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(ku), this.sharedNodes.forEach(Du);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, D.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      D.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !z(this.snapshot.measuredBox.x) && !z(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const r = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = R(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
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
      const r = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !Xr(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, c = u !== this.prevTransformTemplateValue;
      r && this.instance && (a || he(this.latestValues) || c) && (i(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(r = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return r && (l = this.removeTransform(l)), Lu(l), {
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
        return R();
      const a = r.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(Iu))) {
        const { scroll: u } = this.root;
        u && (Se(a.x, u.offset.x), Se(a.y, u.offset.y));
      }
      return a;
    }
    removeElementScroll(r) {
      const a = R();
      if (X(a, r), this.scroll?.wasRoot)
        return a;
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l], { scroll: c, options: h } = u;
        u !== this.root && c && h.layoutScroll && (c.wasRoot && X(a, r), Se(a.x, c.offset.x), Se(a.y, c.offset.y));
      }
      return a;
    }
    applyTransform(r, a = !1) {
      const l = R();
      X(l, r);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a && c.options.layoutScroll && c.scroll && c !== c.root && ke(l, {
          x: -c.scroll.offset.x,
          y: -c.scroll.offset.y
        }), he(c.latestValues) && ke(l, c.latestValues);
      }
      return he(this.latestValues) && ke(l, this.latestValues), l;
    }
    removeTransform(r) {
      const a = R();
      X(a, r);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !he(u.latestValues))
          continue;
        tn(u.latestValues) && u.updateSnapshot();
        const c = R(), h = u.measurePageBox();
        X(c, h), Xs(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return he(this.latestValues) && Xs(a, this.latestValues), a;
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
      const { layout: c, layoutId: h } = this.options;
      if (!(!this.layout || !(c || h))) {
        if (this.resolvedRelativeTargetAt = B.timestamp, !this.targetDelta && !this.relativeTarget) {
          const f = this.getClosestProjectingParent();
          f && f.layout && this.animationProgress !== 1 ? (this.relativeParent = f, this.forceRelativeParentToResolveTarget(), this.relativeTarget = R(), this.relativeTargetOrigin = R(), He(this.relativeTargetOrigin, this.layout.layoutBox, f.layout.layoutBox), X(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = R(), this.targetWithTransforms = R()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), $c(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : X(this.target, this.layout.layoutBox), Mr(this.target, this.targetDelta)) : X(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget)) {
          this.attemptToResolveRelativeTarget = !1;
          const f = this.getClosestProjectingParent();
          f && !!f.resumingFrom == !!this.resumingFrom && !f.options.layoutScroll && f.target && this.animationProgress !== 1 ? (this.relativeParent = f, this.forceRelativeParentToResolveTarget(), this.relativeTarget = R(), this.relativeTargetOrigin = R(), He(this.relativeTargetOrigin, this.target, f.target), X(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || tn(this.parent.latestValues) || Nr(this.parent.latestValues)))
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
      X(this.layoutCorrected, this.layout.layoutBox);
      const h = this.treeScale.x, f = this.treeScale.y;
      Ql(this.layoutCorrected, this.treeScale, this.path, a), r.layout && !r.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (r.target = r.layout.layoutBox, r.targetWithTransforms = R());
      const { target: g } = r;
      if (!g) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Ks(this.prevProjectionDelta.x, this.projectionDelta.x), Ks(this.prevProjectionDelta.y, this.projectionDelta.y)), Ge(this.projectionDelta, this.layoutCorrected, g, this.latestValues), (this.treeScale.x !== h || this.treeScale.y !== f || !Qs(this.projectionDelta.x, this.prevProjectionDelta.x) || !Qs(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", g));
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
      this.prevProjectionDelta = Ce(), this.projectionDelta = Ce(), this.projectionDeltaWithTransform = Ce();
    }
    setAnimationOrigin(r, a = !1) {
      const l = this.snapshot, u = l ? l.latestValues : {}, c = { ...this.latestValues }, h = Ce();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const f = R(), g = l ? l.source : void 0, m = this.layout ? this.layout.source : void 0, y = g !== m, x = this.getStack(), v = !x || x.members.length <= 1, b = !!(y && !v && this.options.crossfade === !0 && !this.path.some(Eu));
      this.animationProgress = 0;
      let w;
      this.mixTargetDelta = (C) => {
        const T = C / 1e3;
        si(h.x, r.x, T), si(h.y, r.y, T), this.setTargetDelta(h), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (He(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox), Vu(this.relativeTarget, this.relativeTargetOrigin, f, T), w && gu(this.relativeTarget, w) && (this.isProjectionDirty = !1), w || (w = R()), X(w, this.relativeTarget)), y && (this.animationValues = c, uu(c, u, this.latestValues, T, b, v)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = T;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(r) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (ae(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = D.update(() => {
        ft.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = De(0)), this.currentAnimation = ru(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(vu), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const r = this.getLead();
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = r;
      if (!(!a || !l || !u)) {
        if (this !== r && this.layout && u && Jr(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || R();
          const h = z(this.layout.layoutBox.x);
          l.x.min = r.target.x.min, l.x.max = l.x.min + h;
          const f = z(this.layout.layoutBox.y);
          l.y.min = r.target.y.min, l.y.max = l.y.min + f;
        }
        X(a, l), ke(a, c), Ge(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(r, a) {
      this.sharedNodes.has(r) || this.sharedNodes.set(r, new yu()), this.sharedNodes.get(r).add(a);
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
      l.z && Ot("z", r, u, this.animationValues);
      for (let c = 0; c < Bt.length; c++)
        Ot(`rotate${Bt[c]}`, r, u, this.animationValues), Ot(`skew${Bt[c]}`, r, u, this.animationValues);
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
        this.needsReset = !1, r.visibility = "", r.opacity = "", r.pointerEvents = ht(a?.pointerEvents) || "", r.transform = l ? l(this.latestValues, "") : "none";
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        this.options.layoutId && (r.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, r.pointerEvents = ht(a?.pointerEvents) || ""), this.hasProjected && !he(this.latestValues) && (r.transform = l ? l({}, "") : "none", this.hasProjected = !1);
        return;
      }
      r.visibility = "";
      const c = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let h = xu(this.projectionDeltaWithTransform, this.treeScale, c);
      l && (h = l(c, h)), r.transform = h;
      const { x: f, y: g } = this.projectionDelta;
      r.transformOrigin = `${f.origin * 100}% ${g.origin * 100}% 0`, u.animationValues ? r.opacity = u === this ? c.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : c.opacityExit : r.opacity = u === this ? c.opacity !== void 0 ? c.opacity : "" : c.opacityExit !== void 0 ? c.opacityExit : 0;
      for (const m in Qe) {
        if (c[m] === void 0)
          continue;
        const { correct: y, applyTo: x, isCSSVariable: v } = Qe[m], b = h === "none" ? c[m] : y(c[m], u);
        if (x) {
          const w = x.length;
          for (let C = 0; C < w; C++)
            r[x[C]] = b;
        } else
          v ? this.options.visualElement.renderState.vars[m] = b : r[m] = b;
      }
      this.options.layoutId && (r.pointerEvents = u === this ? ht(a?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((r) => r.currentAnimation?.stop()), this.root.nodes.forEach(ei), this.root.sharedNodes.clear();
    }
  };
}
function wu(e) {
  e.updateLayout();
}
function Tu(e) {
  const t = e.resumeFrom?.snapshot || e.snapshot;
  if (e.isLead() && e.layout && t && e.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: s } = e.layout, { animationType: i } = e.options, o = t.source !== e.layout.source;
    i === "size" ? Y((c) => {
      const h = o ? t.measuredBox[c] : t.layoutBox[c], f = z(h);
      h.min = n[c].min, h.max = h.min + f;
    }) : Jr(i, t.layoutBox, n) && Y((c) => {
      const h = o ? t.measuredBox[c] : t.layoutBox[c], f = z(n[c]);
      h.max = h.min + f, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[c].max = e.relativeTarget[c].min + f);
    });
    const r = Ce();
    Ge(r, n, t.layoutBox);
    const a = Ce();
    o ? Ge(a, e.applyTransform(s, !0), t.measuredBox) : Ge(a, n, t.layoutBox);
    const l = !Xr(r);
    let u = !1;
    if (!e.resumeFrom) {
      const c = e.getClosestProjectingParent();
      if (c && !c.resumeFrom) {
        const { snapshot: h, layout: f } = c;
        if (h && f) {
          const g = R();
          He(g, t.layoutBox, h.layoutBox);
          const m = R();
          He(m, n, f.layoutBox), Yr(g, m) || (u = !0), c.options.layoutRoot && (e.relativeTarget = m, e.relativeTargetOrigin = g, e.relativeParent = c);
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: n,
      snapshot: t,
      delta: a,
      layoutDelta: r,
      hasLayoutChanged: l,
      hasRelativeLayoutChanged: u
    });
  } else if (e.isLead()) {
    const { onExitComplete: n } = e.options;
    n && n();
  }
  e.options.transition = void 0;
}
function Pu(e) {
  e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty)), e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function Su(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function ku(e) {
  e.clearSnapshot();
}
function ei(e) {
  e.clearMeasurements();
}
function ti(e) {
  e.isLayoutDirty = !1;
}
function Cu(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function ni(e) {
  e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0;
}
function Au(e) {
  e.resolveTargetDelta();
}
function Nu(e) {
  e.calcProjection();
}
function Mu(e) {
  e.resetSkewAndRotation();
}
function Du(e) {
  e.removeLeadSnapshot();
}
function si(e, t, n) {
  e.translate = V(t.translate, 0, n), e.scale = V(t.scale, 1, n), e.origin = t.origin, e.originPoint = t.originPoint;
}
function ii(e, t, n, s) {
  e.min = V(t.min, n.min, s), e.max = V(t.max, n.max, s);
}
function Vu(e, t, n, s) {
  ii(e.x, t.x, n.x, s), ii(e.y, t.y, n.y, s);
}
function Eu(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const Ru = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, ri = (e) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e), oi = ri("applewebkit/") && !ri("chrome/") ? Math.round : Z;
function ai(e) {
  e.min = oi(e.min), e.max = oi(e.max);
}
function Lu(e) {
  ai(e.x), ai(e.y);
}
function Jr(e, t, n) {
  return e === "position" || e === "preserve-aspect" && !_c(Js(t), Js(n), 0.2);
}
function Iu(e) {
  return e !== e.root && e.scroll?.wasRoot;
}
const Fu = Zr({
  attachResizeListener: (e, t) => et(e, "resize", t),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), _t = {
  current: void 0
}, Qr = Zr({
  measureScroll: (e) => ({
    x: e.scrollLeft,
    y: e.scrollTop
  }),
  defaultParent: () => {
    if (!_t.current) {
      const e = new Fu({});
      e.mount(window), e.setOptions({ layoutScroll: !0 }), _t.current = e;
    }
    return _t.current;
  },
  resetTransform: (e, t) => {
    e.style.transform = t !== void 0 ? t : "none";
  },
  checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed"
}), ju = {
  pan: {
    Feature: tu
  },
  drag: {
    Feature: eu,
    ProjectionNode: Qr,
    MeasureLayout: Kr
  }
};
function li(e, t, n) {
  const { props: s } = e;
  e.animationState && s.whileHover && e.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n, o = s[i];
  o && D.postRender(() => o(t, it(t)));
}
class Bu extends ce {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = rl(t, (n, s) => (li(this.node, s, "Start"), (i) => li(this.node, i, "End"))));
  }
  unmount() {
  }
}
class Ou extends ce {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = tt(et(this.node.current, "focus", () => this.onFocus()), et(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function ci(e, t, n) {
  const { props: s } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled)
    return;
  e.animationState && s.whileTap && e.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n), o = s[i];
  o && D.postRender(() => o(t, it(t)));
}
class _u extends ce {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = cl(t, (n, s) => (ci(this.node, s, "Start"), (i, { success: o }) => ci(this.node, i, o ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const cn = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakMap(), $u = (e) => {
  const t = cn.get(e.target);
  t && t(e);
}, Wu = (e) => {
  e.forEach($u);
};
function Uu({ root: e, ...t }) {
  const n = e || document;
  $t.has(n) || $t.set(n, {});
  const s = $t.get(n), i = JSON.stringify(t);
  return s[i] || (s[i] = new IntersectionObserver(Wu, { root: e, ...t })), s[i];
}
function zu(e, t, n) {
  const s = Uu(t);
  return cn.set(e, n), s.observe(e), () => {
    cn.delete(e), s.unobserve(e);
  };
}
const Ku = {
  some: 0,
  all: 1
};
class Gu extends ce {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(), { root: n, margin: s, amount: i = "some", once: o } = t, r = {
      root: n ? n.current : void 0,
      rootMargin: s,
      threshold: typeof i == "number" ? i : Ku[i]
    }, a = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, o && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: c, onViewportLeave: h } = this.node.getProps(), f = u ? c : h;
      f && f(l);
    };
    return zu(this.node.current, r, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Hu(t, n)) && this.startObserver();
  }
  unmount() {
  }
}
function Hu({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const Xu = {
  inView: {
    Feature: Gu
  },
  tap: {
    Feature: _u
  },
  focus: {
    Feature: Ou
  },
  hover: {
    Feature: Bu
  }
}, Yu = {
  layout: {
    ProjectionNode: Qr,
    MeasureLayout: Kr
  }
}, qu = {
  ...Lc,
  ...Xu,
  ...ju,
  ...Yu
}, U = /* @__PURE__ */ ql(qu, cc), eo = "/_components/v2/1b699f9cc1f596f243430cb4a07bbf46e1a4dd31/skill_hub_logo.31d6dabc.jpeg", Zu = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
function to(e) {
  const [t, n] = ee(!1), s = () => {
    n(!0);
  }, { src: i, alt: o, style: r, className: a, ...l } = e;
  return t ? /* @__PURE__ */ d(
    "div",
    {
      className: `inline-block bg-gray-100 text-center align-middle ${a ?? ""}`,
      style: r,
      children: /* @__PURE__ */ d("div", { className: "flex items-center justify-center w-full h-full", children: /* @__PURE__ */ d("img", { src: Zu, alt: "Error loading image", ...l, "data-original-url": i }) })
    }
  ) : /* @__PURE__ */ d("img", { src: i, alt: o, className: a, style: r, ...l, onError: s });
}
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ju = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Qu = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, s) => s ? s.toUpperCase() : n.toLowerCase()
), ui = (e) => {
  const t = Qu(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, no = (...e) => e.filter((t, n, s) => !!t && t.trim() !== "" && s.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ed = {
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
const td = un(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: s,
    className: i = "",
    children: o,
    iconNode: r,
    ...a
  }, l) => mt(
    "svg",
    {
      ref: l,
      ...ed,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: s ? Number(n) * 24 / Number(t) : n,
      className: no("lucide", i),
      ...a
    },
    [
      ...r.map(([u, c]) => mt(u, c)),
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
const M = (e, t) => {
  const n = un(
    ({ className: s, ...i }, o) => mt(td, {
      ref: o,
      iconNode: t,
      className: no(
        `lucide-${Ju(ui(e))}`,
        `lucide-${e}`,
        s
      ),
      ...i
    })
  );
  return n.displayName = ui(e), n;
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nd = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], St = M("arrow-right", nd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sd = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
], id = M("award", sd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rd = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
], od = M("briefcase", rd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ad = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], so = M("check", ad);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ld = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], cd = M("chevron-down", ld);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ud = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
], dd = M("clock", ud);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hd = [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
], di = M("download", hd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fd = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], md = M("external-link", fd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pd = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], gd = M("eye", pd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yd = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], xd = M("file-text", yd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vd = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
], bd = M("globe", vd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wd = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
], Td = M("heart", wd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pd = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
], Sd = M("image", Pd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kd = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
], Cd = M("instagram", kd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ad = [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "c2jq9f"
    }
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }]
], Nd = M("linkedin", Ad);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Md = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], Dd = M("map-pin", Md);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vd = [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
], Ed = M("menu", Vd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rd = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
], Ee = M("message-circle", Rd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ld = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
], Id = M("monitor", Ld);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fd = [
  [
    "path",
    {
      d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
      key: "nt11vn"
    }
  ],
  [
    "path",
    {
      d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
      key: "15qc1e"
    }
  ],
  ["path", { d: "m2.3 2.3 7.286 7.286", key: "1wuzzi" }],
  ["circle", { cx: "11", cy: "11", r: "2", key: "xmgehs" }]
], jd = M("pen-tool", Fd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bd = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], hi = M("plus", Bd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Od = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], io = M("search", Od);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _d = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], $d = M("shield", _d);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wd = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
], Ud = M("shopping-cart", Wd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zd = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
], Kd = M("smartphone", zd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gd = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
], Hd = M("sparkles", Gd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xd = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
], Yd = M("star", Xd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qd = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
], fi = M("trash-2", qd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zd = [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
], Jd = M("twitter", Zd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qd = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], eh = M("x", Qd);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const th = [
  [
    "path",
    {
      d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
      key: "1q2vi4"
    }
  ],
  ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
], nh = M("youtube", th);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sh = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], ih = M("zap", sh), k = "#c9a227", Ne = "#e8c44a", ro = "#a07810", F = `linear-gradient(135deg,${Ne},${k},${ro})`, Re = { background: `linear-gradient(90deg,${k},${ro})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }, Me = "#faf7f0", rh = "#f5f0e5", kt = "#ffffff", G = "#1a1a1a", oo = "#333333", O = "#7a7260", xe = "https://wa.me/919633402183", ao = "+91 96334 02183";
function oh(e) {
  const t = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>${e.name}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;font-size:13px;color:#111;background:#fff;padding:40px}
.hdr{border-bottom:3px solid #c9a227;padding-bottom:18px;margin-bottom:22px}
.name{font-size:30px;font-weight:800;color:#1a1a1a}
.title{font-size:15px;color:#c9a227;font-weight:700;margin:4px 0 10px}
.ct{display:flex;flex-wrap:wrap;gap:12px;font-size:12px;color:#555}
section{margin-bottom:18px}h2{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#c9a227;border-bottom:1px solid #eee;padding-bottom:5px;margin-bottom:10px}
.summary{color:#444;line-height:1.6}.entry{margin-bottom:12px}
.eh{display:flex;justify-content:space-between}.et{font-weight:700}.es{color:#666;font-size:12px}
.ed{color:#c9a227;font-size:11px;font-weight:700}.edesc{color:#555;margin-top:3px;line-height:1.5;font-size:12px}
.sg{display:flex;flex-wrap:wrap;gap:7px}.st{background:#fdf3d5;color:#7a5a00;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600}
.ft{margin-top:28px;padding-top:10px;border-top:1px solid #eee;text-align:center;font-size:10px;color:#aaa}
@media print{body{padding:20px}}</style></head><body>
<div class="hdr"><div class="name">${e.name}</div><div class="title">${e.title}</div>
<div class="ct">${[e.email && `<span>✉ ${e.email}</span>`, e.phone && `<span>📞 ${e.phone}</span>`, e.location && `<span>📍 ${e.location}</span>`, e.portfolio && `<span>🌐 ${e.portfolio}</span>`, e.linkedin && `<span>💼 ${e.linkedin}</span>`].filter(Boolean).join("")}</div></div>
${e.summary ? `<section><h2>Summary</h2><p class="summary">${e.summary}</p></section>` : ""}
${e.experience.filter((s) => s.role || s.company).length ? `<section><h2>Experience</h2>${e.experience.filter((s) => s.role || s.company).map((s) => `<div class="entry"><div class="eh"><div><div class="et">${s.role}</div><div class="es">${s.company}</div></div><div class="ed">${s.duration}</div></div>${s.description ? `<div class="edesc">${s.description}</div>` : ""}</div>`).join("")}</section>` : ""}
${e.education.filter((s) => s.degree || s.institution).length ? `<section><h2>Education</h2>${e.education.filter((s) => s.degree || s.institution).map((s) => `<div class="entry"><div class="eh"><div><div class="et">${s.degree}</div><div class="es">${s.institution}</div></div><div class="ed">${s.year}</div></div></div>`).join("")}</section>` : ""}
${e.skills ? `<section><h2>Skills</h2><div class="sg">${e.skills.split(",").map((s) => `<span class="st">${s.trim()}</span>`).join("")}</div></section>` : ""}
${e.languages ? `<section><h2>Languages</h2><div class="sg">${e.languages.split(",").map((s) => `<span class="st">${s.trim()}</span>`).join("")}</div></section>` : ""}
<div class="ft">Crafted with ❤ by Skillhub Digital · ${ao}</div></body></html>`, n = window.open("", "_blank");
  n && (n.document.write(t), n.document.close(), setTimeout(() => n.print(), 600));
}
function ah() {
  return /* @__PURE__ */ p("div", { className: "flex items-center gap-3 justify-center", children: [
    /* @__PURE__ */ d("div", { className: "h-px w-14", style: { background: `linear-gradient(to right,transparent,${k})` } }),
    /* @__PURE__ */ d(Hd, { className: "w-3.5 h-3.5", style: { color: k } }),
    /* @__PURE__ */ d("div", { className: "h-px w-14", style: { background: `linear-gradient(to left,transparent,${k})` } })
  ] });
}
function ve({ label: e }) {
  return /* @__PURE__ */ d("div", { className: "flex justify-center mb-5", children: /* @__PURE__ */ p(
    "span",
    {
      className: "inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-black tracking-[0.2em] uppercase",
      style: { background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.35)", color: k, fontFamily: "DM Mono,monospace" },
      children: [
        /* @__PURE__ */ d("span", { className: "w-1.5 h-1.5 rounded-full", style: { background: k } }),
        e
      ]
    }
  ) });
}
function be({ title: e, sub: t }) {
  return /* @__PURE__ */ p("div", { className: "text-center mb-14", children: [
    /* @__PURE__ */ d(ah, {}),
    /* @__PURE__ */ d(
      "h2",
      {
        className: "text-4xl md:text-5xl font-black mt-5 mb-4 leading-tight",
        style: { fontFamily: "Playfair Display,serif", color: G },
        children: e
      }
    ),
    t && /* @__PURE__ */ d("p", { className: "text-base md:text-lg max-w-2xl mx-auto leading-relaxed", style: { color: O }, children: t })
  ] });
}
function lh() {
  const [e, t] = ee(!1), [n, s] = ee(!1);
  Ie(() => {
    const r = () => t(window.scrollY > 50);
    return window.addEventListener("scroll", r), () => window.removeEventListener("scroll", r);
  }, []);
  const i = (r) => {
    document.querySelector(r)?.scrollIntoView({ behavior: "smooth" }), s(!1);
  }, o = [["Services", "#services"], ["Portfolio", "#portfolio"], ["Pricing", "#pricing"], ["Resume", "#resume"], ["Contact", "#contact"]];
  return /* @__PURE__ */ p(Xe, { children: [
    /* @__PURE__ */ p(
      "nav",
      {
        className: "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        style: {
          background: "#060606",
          /* always black */
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(201,162,39,0.18)",
          boxShadow: e ? "0 4px 32px rgba(0,0,0,0.45)" : "none"
        },
        children: [
          /* @__PURE__ */ d("div", { className: "h-px w-full", style: { background: `linear-gradient(90deg,transparent,${k},${Ne},${k},transparent)` } }),
          /* @__PURE__ */ p("div", { className: "max-w-7xl mx-auto px-5 flex items-center justify-between py-3.5", children: [
            /* @__PURE__ */ p("button", { onClick: () => i("#hero"), className: "flex items-center gap-3", children: [
              /* @__PURE__ */ d(to, { src: eo, alt: "Skillhub Digital", className: "w-10 h-10 object-contain rounded-xl" }),
              /* @__PURE__ */ p("div", { className: "text-left", children: [
                /* @__PURE__ */ d("div", { className: "text-sm font-black leading-tight", style: { ...Re, fontFamily: "Playfair Display,serif" }, children: "Skillhub Digital" }),
                /* @__PURE__ */ d("div", { className: "text-[9px] tracking-[0.28em] uppercase", style: { color: k, fontFamily: "DM Mono,monospace" }, children: "Premium Web Studio" })
              ] })
            ] }),
            /* @__PURE__ */ d("div", { className: "hidden md:flex items-center gap-8", children: o.map(([r, a]) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => i(a),
                className: "text-sm font-medium transition-all duration-200 hover:text-primary",
                style: { color: "rgba(255,255,255,0.65)" },
                children: r
              },
              r
            )) }),
            /* @__PURE__ */ p(
              "a",
              {
                href: xe,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-black transition-all duration-300 hover:scale-105",
                style: { background: F, color: "#060606", boxShadow: "0 4px 24px rgba(201,162,39,0.45)" },
                children: [
                  /* @__PURE__ */ d(Ee, { className: "w-4 h-4" }),
                  " Get Started"
                ]
              }
            ),
            /* @__PURE__ */ d("button", { className: "md:hidden p-2", onClick: () => s((r) => !r), style: { color: k }, children: n ? /* @__PURE__ */ d(eh, { className: "w-6 h-6" }) : /* @__PURE__ */ d(Ed, { className: "w-6 h-6" }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ d(fr, { children: n && /* @__PURE__ */ d(
      U.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        className: "fixed top-[68px] left-0 right-0 z-40",
        style: { background: "rgba(6,6,6,0.98)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(201,162,39,0.15)" },
        children: /* @__PURE__ */ p("div", { className: "flex flex-col px-6 py-7 gap-5", children: [
          o.map(([r, a]) => /* @__PURE__ */ d("button", { onClick: () => i(a), className: "text-left text-base font-medium", style: { color: "#f0ead6" }, children: r }, r)),
          /* @__PURE__ */ p(
            "a",
            {
              href: xe,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center justify-center gap-2 py-3.5 rounded-full font-black mt-2",
              style: { background: F, color: "#060606" },
              children: [
                /* @__PURE__ */ d(Ee, { className: "w-4 h-4" }),
                " Chat on WhatsApp"
              ]
            }
          )
        ] })
      }
    ) })
  ] });
}
function ch() {
  const [e, t] = ee(""), n = ["Landing Pages", "Business Websites", "E-commerce Stores", "Portfolio Sites", "Brand Identities"], s = Q(0), i = Q(0), o = Q(!1);
  return Ie(() => {
    let r;
    const a = () => {
      const l = n[s.current];
      o.current ? (i.current--, t(l.slice(0, i.current)), i.current === 0 ? (o.current = !1, s.current = (s.current + 1) % n.length, r = setTimeout(a, 400)) : r = setTimeout(a, 38)) : (i.current++, t(l.slice(0, i.current)), i.current === l.length ? (o.current = !0, r = setTimeout(a, 2200)) : r = setTimeout(a, 75));
    };
    return r = setTimeout(a, 800), () => clearTimeout(r);
  }, []), /* @__PURE__ */ p("section", { id: "hero", className: "relative min-h-screen flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ p("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ d(
        "img",
        {
          src: "https://images.unsplash.com/photo-1610088439339-92686fa0c502?w=1920&h=1080&fit=crop&auto=format",
          alt: "Gold bokeh",
          className: "w-full h-full object-cover",
          style: { opacity: 0.22 }
        }
      ),
      /* @__PURE__ */ d("div", { className: "absolute inset-0", style: { background: "linear-gradient(160deg,rgba(6,6,6,0.96) 0%,rgba(6,6,6,0.85) 50%,rgba(6,6,6,0.96) 100%)" } })
    ] }),
    /* @__PURE__ */ p("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ d(
        "img",
        {
          src: "https://images.unsplash.com/photo-1611416457332-946853cc75d6?w=1920&h=1080&fit=crop&auto=format",
          alt: "City night",
          className: "w-full h-full object-cover object-bottom",
          style: { opacity: 0.12 }
        }
      ),
      /* @__PURE__ */ d("div", { className: "absolute inset-0", style: { background: "linear-gradient(to bottom,rgba(6,6,6,1) 0%,rgba(6,6,6,0.3) 50%,rgba(6,6,6,0.98) 100%)" } })
    ] }),
    /* @__PURE__ */ d(
      "div",
      {
        className: "absolute inset-0 pointer-events-none",
        style: { backgroundImage: "linear-gradient(rgba(201,162,39,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,162,39,0.03) 1px,transparent 1px)", backgroundSize: "90px 90px" }
      }
    ),
    /* @__PURE__ */ d("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ d("div", { className: "w-[800px] h-[600px] rounded-full", style: { background: "radial-gradient(ellipse,rgba(201,162,39,0.07),transparent 70%)" } }) }),
    /* @__PURE__ */ d("div", { className: "absolute top-0 left-0 right-0 h-px", style: { background: `linear-gradient(90deg,transparent,${k},${Ne},${k},transparent)` } }),
    /* @__PURE__ */ d("div", { className: "absolute bottom-0 left-0 right-0 h-px", style: { background: `linear-gradient(90deg,transparent,${k},transparent)` } }),
    /* @__PURE__ */ p("div", { className: "relative z-10 text-center px-4 max-w-5xl mx-auto pt-32 pb-20", children: [
      /* @__PURE__ */ p(
        U.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "inline-flex items-center gap-3 px-5 py-2 rounded-full border mb-10",
          style: { background: "rgba(201,162,39,0.08)", borderColor: "rgba(201,162,39,0.38)" },
          children: [
            /* @__PURE__ */ d("span", { className: "w-2 h-2 rounded-full animate-pulse", style: { background: "#4ade80", boxShadow: "0 0 8px #4ade80" } }),
            /* @__PURE__ */ d("span", { className: "text-xs font-black tracking-[0.22em] uppercase", style: { color: Ne, fontFamily: "DM Mono,monospace" }, children: "Kerala's Premium Web Studio" }),
            /* @__PURE__ */ d("span", { className: "w-2 h-2 rounded-full animate-pulse", style: { background: "#4ade80", boxShadow: "0 0 8px #4ade80" } })
          ]
        }
      ),
      /* @__PURE__ */ p(
        U.h1,
        {
          initial: { opacity: 0, y: 48 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.35 },
          className: "font-black leading-[1.04]",
          style: { fontFamily: "Playfair Display,serif" },
          children: [
            /* @__PURE__ */ d("span", { className: "block text-5xl sm:text-6xl md:text-7xl lg:text-[82px]", style: { color: "#f5f0e8" }, children: "We Craft" }),
            /* @__PURE__ */ p("span", { className: "block text-5xl sm:text-6xl md:text-7xl lg:text-[82px]", style: { ...Re, minHeight: "1.1em" }, children: [
              e,
              /* @__PURE__ */ d("span", { style: { WebkitTextFillColor: k }, className: "animate-pulse", children: "|" })
            ] }),
            /* @__PURE__ */ d(
              "span",
              {
                className: "block text-3xl sm:text-4xl md:text-5xl lg:text-[56px] mt-2",
                style: { color: "rgba(245,240,232,0.38)", fontStyle: "italic" },
                children: "— that Win Clients"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ p(
        U.div,
        {
          initial: { scaleX: 0 },
          animate: { scaleX: 1 },
          transition: { delay: 0.6, duration: 0.9 },
          className: "flex items-center justify-center gap-4 my-9",
          children: [
            /* @__PURE__ */ d("div", { className: "h-px flex-1 max-w-[110px]", style: { background: `linear-gradient(to right,transparent,${k})` } }),
            /* @__PURE__ */ d("div", { className: "w-2 h-2 rotate-45 border", style: { borderColor: k } }),
            /* @__PURE__ */ d("div", { className: "h-px flex-1 max-w-[110px]", style: { background: `linear-gradient(to left,transparent,${k})` } })
          ]
        }
      ),
      /* @__PURE__ */ p(
        U.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.7 },
          className: "text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed",
          style: { color: "rgba(245,240,232,0.62)" },
          children: [
            "From ₹1,999 student portfolios to ₹25,000 e-commerce powerhouses — every site is a ",
            /* @__PURE__ */ d("span", { style: { color: Ne, fontWeight: 600 }, children: "masterpiece" }),
            " built for growth."
          ]
        }
      ),
      /* @__PURE__ */ p(
        U.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.82 },
          className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-20",
          children: [
            /* @__PURE__ */ p(
              "a",
              {
                href: xe,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "group flex items-center gap-3 px-9 py-4 rounded-full font-black text-base transition-all duration-300 hover:scale-105",
                style: { background: F, color: "#060606", boxShadow: "0 6px 48px rgba(201,162,39,0.5)" },
                children: [
                  /* @__PURE__ */ d(Ee, { className: "w-5 h-5" }),
                  "Start Your Project",
                  /* @__PURE__ */ d(St, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
                ]
              }
            ),
            /* @__PURE__ */ p(
              "button",
              {
                onClick: () => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" }),
                className: "group flex items-center gap-3 px-9 py-4 rounded-full font-black text-base border transition-all duration-300 hover:bg-white/[0.04]",
                style: { borderColor: "rgba(201,162,39,0.4)", color: "#f5f0e8" },
                children: [
                  /* @__PURE__ */ d(gd, { className: "w-5 h-5", style: { color: k } }),
                  "View Our Work"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ d(
        U.div,
        {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 1 },
          className: "grid grid-cols-2 md:grid-cols-4 gap-0 rounded-2xl overflow-hidden max-w-3xl mx-auto",
          style: { border: "1px solid rgba(201,162,39,0.2)", background: "rgba(14,14,14,0.9)", backdropFilter: "blur(16px)" },
          children: [{ v: "50+", l: "Projects Live" }, { v: "₹1,999", l: "Starting Price" }, { v: "100%", l: "Satisfaction" }, { v: "5 ★", l: "Client Rating" }].map((r, a) => /* @__PURE__ */ p("div", { className: "py-7 px-4 text-center relative", children: [
            a > 0 && /* @__PURE__ */ d("div", { className: "absolute left-0 top-4 bottom-4 w-px", style: { background: "rgba(201,162,39,0.15)" } }),
            /* @__PURE__ */ d("div", { className: "text-2xl md:text-3xl font-black", style: { ...Re, fontFamily: "Playfair Display,serif" }, children: r.v }),
            /* @__PURE__ */ d("div", { className: "text-[10px] mt-1.5 tracking-widest uppercase", style: { color: "#888070", fontFamily: "DM Mono,monospace" }, children: r.l })
          ] }, r.l))
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce", children: [
      /* @__PURE__ */ d("span", { className: "text-[9px] tracking-[0.35em] uppercase", style: { color: k, fontFamily: "DM Mono,monospace" }, children: "Scroll" }),
      /* @__PURE__ */ d(cd, { className: "w-4 h-4", style: { color: k } })
    ] })
  ] });
}
const uh = [
  { Icon: Id, title: "Landing Pages", desc: "High-converting pages designed to capture leads and drive sales for your campaigns." },
  { Icon: bd, title: "Business Websites", desc: "Professional, SEO-optimised websites that establish your brand authority online." },
  { Icon: od, title: "Portfolio Websites", desc: "Showcase your work beautifully — for students, freelancers and professionals." },
  { Icon: io, title: "SEO Setup", desc: "Get discovered on Google with technical SEO, keywords and proper meta structures." },
  { Icon: Ud, title: "E-commerce", desc: "Full online stores with payment gateways, product catalogs and admin panels." },
  { Icon: jd, title: "Logo Design", desc: "Memorable logos that communicate your brand identity at a glance." },
  { Icon: Sd, title: "Poster Design", desc: "Eye-catching digital and print posters, banners and marketing materials." },
  { Icon: xd, title: "Resume Building", desc: "Professional PDF resumes crafted from your details — download for just ₹99." }
];
function dh() {
  return /* @__PURE__ */ p("section", { id: "services", className: "py-28 px-4 relative", style: { background: Me }, children: [
    /* @__PURE__ */ d(
      "div",
      {
        className: "absolute inset-0 pointer-events-none opacity-[0.35]",
        style: { backgroundImage: `radial-gradient(${k}22 1px,transparent 1px)`, backgroundSize: "40px 40px" }
      }
    ),
    /* @__PURE__ */ p("div", { className: "max-w-7xl mx-auto relative", children: [
      /* @__PURE__ */ d(ve, { label: "What We Do" }),
      /* @__PURE__ */ d(
        be,
        {
          title: "Premium Digital Services",
          sub: "Every service is crafted to make your digital presence unforgettable — from concept to launch."
        }
      ),
      /* @__PURE__ */ d("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: uh.map(({ Icon: e, title: t, desc: n }, s) => /* @__PURE__ */ p(
        U.div,
        {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          transition: { delay: s * 0.06 },
          whileHover: { y: -7 },
          className: "group relative p-6 rounded-2xl border bg-white cursor-default transition-all duration-300 hover:shadow-xl",
          style: { borderColor: "rgba(201,162,39,0.18)", boxShadow: "0 2px 12px rgba(201,162,39,0.06)" },
          children: [
            /* @__PURE__ */ d(
              "div",
              {
                className: "absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                style: { background: F }
              }
            ),
            /* @__PURE__ */ d(
              "div",
              {
                className: "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110",
                style: { background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)" },
                children: /* @__PURE__ */ d(e, { className: "w-6 h-6", style: { color: k } })
              }
            ),
            /* @__PURE__ */ d("h3", { className: "font-black text-base mb-2", style: { fontFamily: "Playfair Display,serif", color: G }, children: t }),
            /* @__PURE__ */ d("p", { className: "text-sm leading-relaxed", style: { color: O }, children: n })
          ]
        },
        t
      )) })
    ] })
  ] });
}
const hh = [
  { name: "San Travels", url: "https://santravels.in", display: "santravels.in", type: "Business Website", price: "₹8,999", tag: "Premium", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&auto=format" },
  { name: "Artivert", url: "https://artivert.in", display: "artivert.in", type: "Business Website", price: "₹4,999", tag: "Standard", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&auto=format" },
  { name: "CoolWing", url: "https://coolwing.online", display: "coolwing.online", type: "Business Website", price: "₹4,999", tag: "Standard", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop&auto=format" },
  { name: "Akhil – Video Editor", url: "https://akhil-portfolio-livid.vercel.app/", display: "akhil-portfolio.vercel.app", type: "Pro Portfolio", price: "₹2,999", tag: "Professional", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=500&fit=crop&auto=format" },
  { name: "Beauty Parlour", url: "https://ok-sigma-eight.vercel.app/", display: "ok-sigma-eight.vercel.app", type: "Portfolio Website", price: "₹2,999", tag: "Professional", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=500&fit=crop&auto=format" },
  { name: "Student Portfolio", url: "#", display: "student-portfolio.vercel.app", type: "Student Portfolio", price: "₹1,999", tag: "Starter", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop&auto=format" }
];
function fh() {
  return /* @__PURE__ */ d("section", { id: "portfolio", className: "py-28 px-4", style: { background: kt }, children: /* @__PURE__ */ p("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ d(ve, { label: "Our Work" }),
    /* @__PURE__ */ d(be, { title: "Portfolio Showcase", sub: "Real projects. Real results. Every site crafted to win clients and drive growth." }),
    /* @__PURE__ */ d("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: hh.map((e, t) => /* @__PURE__ */ p(
      U.div,
      {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: !0 },
        transition: { delay: t * 0.09 },
        className: "group rounded-2xl overflow-hidden border bg-white transition-all duration-400 hover:shadow-2xl hover:-translate-y-1",
        style: { borderColor: "rgba(201,162,39,0.18)", boxShadow: "0 2px 16px rgba(201,162,39,0.07)" },
        children: [
          /* @__PURE__ */ p("div", { className: "relative h-52 overflow-hidden", children: [
            /* @__PURE__ */ d(
              "img",
              {
                src: e.img,
                alt: e.name,
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              }
            ),
            /* @__PURE__ */ d("div", { className: "absolute inset-0", style: { background: "linear-gradient(to top,rgba(6,6,6,0.75) 0%,transparent 55%)" } }),
            /* @__PURE__ */ d(
              "span",
              {
                className: "absolute top-3 right-3 text-xs font-black px-3 py-1.5 rounded-full",
                style: { background: F, color: "#060606", fontFamily: "DM Mono,monospace" },
                children: e.tag
              }
            )
          ] }),
          /* @__PURE__ */ p("div", { className: "p-5", children: [
            /* @__PURE__ */ p("div", { className: "flex items-start justify-between mb-1.5", children: [
              /* @__PURE__ */ p("div", { children: [
                /* @__PURE__ */ d("h3", { className: "font-black text-base", style: { fontFamily: "Playfair Display,serif", color: G }, children: e.name }),
                /* @__PURE__ */ d("p", { className: "text-xs mt-0.5", style: { color: O }, children: e.type })
              ] }),
              /* @__PURE__ */ d("span", { className: "text-sm font-black", style: { ...Re }, children: e.price })
            ] }),
            /* @__PURE__ */ d("p", { className: "text-xs mb-4", style: { color: "#aaa090", fontFamily: "DM Mono,monospace" }, children: e.display }),
            /* @__PURE__ */ p(
              "a",
              {
                href: e.url === "#" ? void 0 : e.url,
                target: e.url === "#" ? void 0 : "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-2 text-xs font-black px-4 py-2 rounded-full transition-all duration-300 hover:scale-105",
                style: { background: F, color: "#060606", opacity: e.url === "#" ? 0.55 : 1, cursor: e.url === "#" ? "default" : "pointer" },
                children: [
                  /* @__PURE__ */ d(md, { className: "w-3 h-3" }),
                  e.url === "#" ? "Coming Soon" : "Visit Site"
                ]
              }
            )
          ] })
        ]
      },
      e.name
    )) })
  ] }) });
}
const mh = [
  {
    name: "Starter",
    price: "₹1,999",
    sub: "Student Portfolios",
    features: ["Portfolio Website", "1–4 Pages", "Mobile Responsive", "Basic SEO", "Free Domain (.in)", "WhatsApp Support"]
  },
  {
    name: "Professional",
    price: "₹2,999",
    sub: "IT Professionals",
    features: ["Portfolio Website", "Up to 6 Pages", "Advanced SEO", "Contact Form", "Google Analytics", "Priority Support"]
  },
  {
    name: "Standard",
    price: "₹4,999",
    sub: "Business Websites",
    popular: !0,
    features: ["Full Business Website", "Up to 8 Pages", "Full SEO Setup", "Blog + CMS", "Live Chat Widget", "3 Months Support"]
  },
  {
    name: "Premium",
    price: "₹8,999",
    sub: "Luxury Look",
    features: ["Luxury Website", "Unlimited Pages", "Custom Animations", "Advanced SEO", "Performance Tuned", "6 Months Support"]
  },
  {
    name: "E-commerce",
    price: "₹25,000",
    sub: "Online Stores",
    features: ["Complete Online Store", "Payment Gateway", "Product Catalog", "Admin Dashboard", "Order Management", "12 Months Support"]
  }
];
function ph() {
  return /* @__PURE__ */ d("section", { id: "pricing", className: "py-28 px-4", style: { background: rh }, children: /* @__PURE__ */ p("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ d(ve, { label: "Transparent Pricing" }),
    /* @__PURE__ */ d(be, { title: "Choose Your Plan", sub: "No hidden fees. No surprises. Just real value that grows your business." }),
    /* @__PURE__ */ d("div", { className: "flex flex-wrap justify-center gap-5", children: mh.map((e, t) => /* @__PURE__ */ p(
      U.div,
      {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: !0 },
        transition: { delay: t * 0.08 },
        className: "relative flex flex-col rounded-2xl border p-7",
        style: {
          minWidth: 230,
          width: "100%",
          maxWidth: 275,
          background: e.popular ? "#060606" : kt,
          borderColor: e.popular ? k : "rgba(201,162,39,0.2)",
          boxShadow: e.popular ? "0 16px 60px rgba(201,162,39,0.18)" : "0 2px 12px rgba(201,162,39,0.07)"
        },
        children: [
          e.popular && /* @__PURE__ */ p(Xe, { children: [
            /* @__PURE__ */ d("div", { className: "absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl", style: { background: F } }),
            /* @__PURE__ */ d(
              "div",
              {
                className: "absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-black",
                style: { background: F, color: "#060606" },
                children: "★ MOST POPULAR"
              }
            )
          ] }),
          /* @__PURE__ */ p("div", { className: "mb-6", children: [
            /* @__PURE__ */ d("span", { className: "text-xs font-black tracking-[0.22em] uppercase", style: { color: k, fontFamily: "DM Mono,monospace" }, children: e.name }),
            /* @__PURE__ */ d("div", { className: "text-4xl font-black mt-2", style: { fontFamily: "Playfair Display,serif", color: e.popular ? "#f0ead6" : G }, children: e.price }),
            /* @__PURE__ */ d("p", { className: "text-sm mt-1", style: { color: e.popular ? "#888070" : O }, children: e.sub })
          ] }),
          /* @__PURE__ */ d("div", { className: "flex-1 space-y-3 mb-7", children: e.features.map((n) => /* @__PURE__ */ p("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ d(
              "div",
              {
                className: "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                style: { background: "rgba(201,162,39,0.15)" },
                children: /* @__PURE__ */ d(so, { className: "w-3 h-3", style: { color: k } })
              }
            ),
            /* @__PURE__ */ d("span", { className: "text-sm", style: { color: e.popular ? "rgba(240,234,214,0.82)" : oo }, children: n })
          ] }, n)) }),
          /* @__PURE__ */ p(
            "a",
            {
              href: xe,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-black transition-all duration-300 hover:scale-105",
              style: e.popular ? { background: F, color: "#060606", boxShadow: "0 4px 28px rgba(201,162,39,0.5)" } : { background: F, color: "#060606", boxShadow: "0 4px 20px rgba(201,162,39,0.25)" },
              children: [
                "Get Started ",
                /* @__PURE__ */ d(St, { className: "w-4 h-4" })
              ]
            }
          )
        ]
      },
      e.name
    )) })
  ] }) });
}
function gh() {
  return /* @__PURE__ */ d("section", { className: "py-28 px-4", style: { background: kt }, children: /* @__PURE__ */ p("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ d(ve, { label: "Why Skillhub Digital" }),
    /* @__PURE__ */ d(be, { title: "The Skillhub Difference", sub: "We don't just build websites — we build businesses online." }),
    /* @__PURE__ */ d("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: [
      { Icon: ih, t: "Fast Delivery", d: "Most projects delivered in 3–7 business days. Speed without sacrificing quality." },
      { Icon: $d, t: "Secure & Reliable", d: "SSL secured on high-performance servers with 99.9% uptime guarantee." },
      { Icon: Kd, t: "Mobile-First Design", d: "Perfectly responsive — flawless on phones, tablets and desktops." },
      { Icon: io, t: "SEO Optimised", d: "Built with proper structure so search engines love your site from day one." },
      { Icon: Td, t: "Client-Centred", d: "We listen first. Your vision drives our design — always and completely." },
      { Icon: id, t: "Premium Quality", d: "We never settle for average. Every pixel is placed with purpose and craft." }
    ].map(({ Icon: t, t: n, d: s }, i) => /* @__PURE__ */ p(
      U.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: !0 },
        transition: { delay: i * 0.07 },
        className: "group flex gap-5 p-6 rounded-2xl border bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        style: { borderColor: "rgba(201,162,39,0.16)", boxShadow: "0 2px 10px rgba(201,162,39,0.05)" },
        children: [
          /* @__PURE__ */ d(
            "div",
            {
              className: "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
              style: { background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.28)" },
              children: /* @__PURE__ */ d(t, { className: "w-5 h-5", style: { color: k } })
            }
          ),
          /* @__PURE__ */ p("div", { children: [
            /* @__PURE__ */ d("h3", { className: "font-black mb-1.5", style: { fontFamily: "Playfair Display,serif", color: G }, children: n }),
            /* @__PURE__ */ d("p", { className: "text-sm leading-relaxed", style: { color: O }, children: s })
          ] })
        ]
      },
      n
    )) })
  ] }) });
}
const yh = [
  { name: "Rahul Menon", role: "Travel Agency Owner", text: "Skillhub built santravels.in and it completely transformed our online presence. Bookings doubled in 2 months!", init: "RM" },
  { name: "Priya Nair", role: "Freelance Designer", text: "My portfolio website looks absolutely stunning. Clients are impressed and I've landed 3 new projects already.", init: "PN" },
  { name: "Anoop Kumar", role: "Restaurant Owner", text: "Professional team, fast delivery, and the website is gorgeous. Best investment I made for my business!", init: "AK" },
  { name: "Sneha Thomas", role: "Video Editor", text: "They built my portfolio exactly how I imagined. The attention to detail is incredible. 10/10 recommend!", init: "ST" }
];
function xh() {
  return /* @__PURE__ */ d("section", { className: "py-28 px-4", style: { background: Me }, children: /* @__PURE__ */ p("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ d(ve, { label: "Client Love" }),
    /* @__PURE__ */ d(be, { title: "What Clients Say", sub: "Don't take our word for it — hear from our happy clients." }),
    /* @__PURE__ */ d("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: yh.map((e, t) => /* @__PURE__ */ p(
      U.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: !0 },
        transition: { delay: t * 0.09 },
        className: "p-7 rounded-2xl border bg-white relative overflow-hidden hover:shadow-xl transition-all duration-300",
        style: { borderColor: "rgba(201,162,39,0.18)", boxShadow: "0 2px 14px rgba(201,162,39,0.06)" },
        children: [
          /* @__PURE__ */ d(
            "div",
            {
              className: "absolute top-0 right-0 w-24 h-24 pointer-events-none",
              style: { background: "radial-gradient(circle at 100% 0%,rgba(201,162,39,0.1),transparent 70%)" }
            }
          ),
          /* @__PURE__ */ d("div", { className: "absolute top-0 left-0 right-0 h-1 rounded-t-2xl", style: { background: F } }),
          /* @__PURE__ */ d("div", { className: "flex gap-0.5 mb-5 mt-3", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ d(Yd, { className: "w-4 h-4", style: { color: k, fill: k } }, n)) }),
          /* @__PURE__ */ p("p", { className: "text-sm leading-relaxed mb-6", style: { color: oo }, children: [
            '"',
            e.text,
            '"'
          ] }),
          /* @__PURE__ */ p("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ d(
              "div",
              {
                className: "w-10 h-10 rounded-full flex items-center justify-center text-xs font-black",
                style: { background: F, color: "#060606" },
                children: e.init
              }
            ),
            /* @__PURE__ */ p("div", { children: [
              /* @__PURE__ */ d("div", { className: "font-black text-sm", style: { color: G }, children: e.name }),
              /* @__PURE__ */ d("div", { className: "text-xs", style: { color: O }, children: e.role })
            ] })
          ] })
        ]
      },
      e.name
    )) })
  ] }) });
}
const mi = () => ({ company: "", role: "", duration: "", description: "" }), pi = () => ({ institution: "", degree: "", year: "" });
function vh() {
  const [e, t] = ee({ name: "", title: "", email: "", phone: "", location: "", portfolio: "", linkedin: "", summary: "", skills: "", languages: "", experience: [mi()], education: [pi()] }), [n, s] = ee(!1), [i, o] = ee(!1), [r, a] = ee(1), l = (m, y) => t((x) => ({ ...x, [m]: y })), u = (m, y, x) => t((v) => {
    const b = [...v.experience];
    return b[m] = { ...b[m], [y]: x }, { ...v, experience: b };
  }), c = (m, y, x) => t((v) => {
    const b = [...v.education];
    return b[m] = { ...b[m], [y]: x }, { ...v, education: b };
  }), h = "w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all border bg-white border-border text-foreground placeholder:text-muted-foreground", f = "block text-[10px] font-black tracking-[0.22em] uppercase mb-1.5 text-muted-foreground", g = () => {
    o(!0), setTimeout(() => {
      s(!1), o(!1), oh(e);
    }, 1800);
  };
  return /* @__PURE__ */ p("section", { id: "resume", className: "py-28 px-4", style: { background: kt }, children: [
    /* @__PURE__ */ p("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ d(ve, { label: "Free Tool" }),
      /* @__PURE__ */ d(be, { title: "Resume Builder", sub: "Fill in your details, pay just ₹99, and instantly download a stunning professional PDF resume." }),
      /* @__PURE__ */ d(
        "div",
        {
          className: "flex rounded-2xl p-1.5 mb-10 gap-1.5",
          style: { background: Me, border: "1px solid rgba(201,162,39,0.22)" },
          children: [{ n: 1, l: "Personal Info" }, { n: 2, l: "Experience" }, { n: 3, l: "Education & Skills" }].map((m) => /* @__PURE__ */ p(
            "button",
            {
              onClick: () => a(m.n),
              className: "flex-1 py-2.5 rounded-xl text-sm font-black transition-all duration-300",
              style: r === m.n ? { background: F, color: "#060606" } : { color: O },
              children: [
                m.n,
                ". ",
                m.l
              ]
            },
            m.n
          ))
        }
      ),
      /* @__PURE__ */ p(
        "div",
        {
          className: "rounded-2xl p-7 md:p-9 border bg-white",
          style: { borderColor: "rgba(201,162,39,0.2)", boxShadow: "0 4px 40px rgba(201,162,39,0.08)" },
          children: [
            r === 1 && /* @__PURE__ */ p("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ p("div", { children: [
                /* @__PURE__ */ d("label", { className: f, children: "Full Name *" }),
                /* @__PURE__ */ d("input", { className: h, placeholder: "e.g. Akhil Krishnan", value: e.name, onChange: (m) => l("name", m.target.value) })
              ] }),
              /* @__PURE__ */ p("div", { children: [
                /* @__PURE__ */ d("label", { className: f, children: "Professional Title *" }),
                /* @__PURE__ */ d("input", { className: h, placeholder: "e.g. Video Editor", value: e.title, onChange: (m) => l("title", m.target.value) })
              ] }),
              /* @__PURE__ */ p("div", { children: [
                /* @__PURE__ */ d("label", { className: f, children: "Email" }),
                /* @__PURE__ */ d("input", { className: h, type: "email", placeholder: "you@email.com", value: e.email, onChange: (m) => l("email", m.target.value) })
              ] }),
              /* @__PURE__ */ p("div", { children: [
                /* @__PURE__ */ d("label", { className: f, children: "Phone" }),
                /* @__PURE__ */ d("input", { className: h, placeholder: "+91 98765 43210", value: e.phone, onChange: (m) => l("phone", m.target.value) })
              ] }),
              /* @__PURE__ */ p("div", { children: [
                /* @__PURE__ */ d("label", { className: f, children: "Location" }),
                /* @__PURE__ */ d("input", { className: h, placeholder: "Kochi, Kerala", value: e.location, onChange: (m) => l("location", m.target.value) })
              ] }),
              /* @__PURE__ */ p("div", { children: [
                /* @__PURE__ */ d("label", { className: f, children: "Portfolio / Website" }),
                /* @__PURE__ */ d("input", { className: h, placeholder: "https://yoursite.com", value: e.portfolio, onChange: (m) => l("portfolio", m.target.value) })
              ] }),
              /* @__PURE__ */ p("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ d("label", { className: f, children: "LinkedIn" }),
                /* @__PURE__ */ d("input", { className: h, placeholder: "linkedin.com/in/yourname", value: e.linkedin, onChange: (m) => l("linkedin", m.target.value) })
              ] }),
              /* @__PURE__ */ p("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ d("label", { className: f, children: "Professional Summary" }),
                /* @__PURE__ */ d("textarea", { className: h, rows: 4, placeholder: "2–4 sentences about your expertise...", value: e.summary, onChange: (m) => l("summary", m.target.value), style: { resize: "vertical" } })
              ] })
            ] }),
            r === 2 && /* @__PURE__ */ p("div", { children: [
              e.experience.map((m, y) => /* @__PURE__ */ p("div", { className: "mb-5 p-5 rounded-xl", style: { background: Me, border: "1px solid rgba(201,162,39,0.15)" }, children: [
                /* @__PURE__ */ p("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ p("span", { className: "text-xs font-black tracking-widest uppercase", style: { color: k, fontFamily: "DM Mono,monospace" }, children: [
                    "Experience #",
                    y + 1
                  ] }),
                  e.experience.length > 1 && /* @__PURE__ */ p("button", { onClick: () => t((x) => ({ ...x, experience: x.experience.filter((v, b) => b !== y) })), className: "text-xs flex items-center gap-1 text-red-500", children: [
                    /* @__PURE__ */ d(fi, { className: "w-3 h-3" }),
                    "Remove"
                  ] })
                ] }),
                /* @__PURE__ */ p("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ p("div", { children: [
                    /* @__PURE__ */ d("label", { className: f, children: "Job Title" }),
                    /* @__PURE__ */ d("input", { className: h, placeholder: "Senior Video Editor", value: m.role, onChange: (x) => u(y, "role", x.target.value) })
                  ] }),
                  /* @__PURE__ */ p("div", { children: [
                    /* @__PURE__ */ d("label", { className: f, children: "Company / Client" }),
                    /* @__PURE__ */ d("input", { className: h, placeholder: "Company Name", value: m.company, onChange: (x) => u(y, "company", x.target.value) })
                  ] }),
                  /* @__PURE__ */ p("div", { children: [
                    /* @__PURE__ */ d("label", { className: f, children: "Duration" }),
                    /* @__PURE__ */ d("input", { className: h, placeholder: "Jan 2022 – Present", value: m.duration, onChange: (x) => u(y, "duration", x.target.value) })
                  ] }),
                  /* @__PURE__ */ p("div", { className: "md:col-span-2", children: [
                    /* @__PURE__ */ d("label", { className: f, children: "Key Responsibilities" }),
                    /* @__PURE__ */ d("textarea", { className: h, rows: 3, placeholder: "Describe your key contributions...", value: m.description, onChange: (x) => u(y, "description", x.target.value), style: { resize: "vertical" } })
                  ] })
                ] })
              ] }, y)),
              /* @__PURE__ */ p(
                "button",
                {
                  onClick: () => t((m) => ({ ...m, experience: [...m.experience, mi()] })),
                  className: "flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl",
                  style: { color: k, border: `1px solid ${k}45`, background: `${k}10` },
                  children: [
                    /* @__PURE__ */ d(hi, { className: "w-4 h-4" }),
                    "Add Experience"
                  ]
                }
              )
            ] }),
            r === 3 && /* @__PURE__ */ p("div", { children: [
              /* @__PURE__ */ d("p", { className: "font-black mb-4", style: { fontFamily: "Playfair Display,serif", color: G }, children: "Education" }),
              e.education.map((m, y) => /* @__PURE__ */ p("div", { className: "mb-5 p-5 rounded-xl", style: { background: Me, border: "1px solid rgba(201,162,39,0.15)" }, children: [
                /* @__PURE__ */ p("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ p("span", { className: "text-xs font-black tracking-widest uppercase", style: { color: k, fontFamily: "DM Mono,monospace" }, children: [
                    "Education #",
                    y + 1
                  ] }),
                  e.education.length > 1 && /* @__PURE__ */ p("button", { onClick: () => t((x) => ({ ...x, education: x.education.filter((v, b) => b !== y) })), className: "text-xs flex items-center gap-1 text-red-500", children: [
                    /* @__PURE__ */ d(fi, { className: "w-3 h-3" }),
                    "Remove"
                  ] })
                ] }),
                /* @__PURE__ */ p("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ p("div", { className: "md:col-span-2", children: [
                    /* @__PURE__ */ d("label", { className: f, children: "Degree / Course" }),
                    /* @__PURE__ */ d("input", { className: h, placeholder: "B.Tech Computer Science", value: m.degree, onChange: (x) => c(y, "degree", x.target.value) })
                  ] }),
                  /* @__PURE__ */ p("div", { children: [
                    /* @__PURE__ */ d("label", { className: f, children: "Year" }),
                    /* @__PURE__ */ d("input", { className: h, placeholder: "2020–2024", value: m.year, onChange: (x) => c(y, "year", x.target.value) })
                  ] }),
                  /* @__PURE__ */ p("div", { className: "md:col-span-3", children: [
                    /* @__PURE__ */ d("label", { className: f, children: "Institution" }),
                    /* @__PURE__ */ d("input", { className: h, placeholder: "Cochin University", value: m.institution, onChange: (x) => c(y, "institution", x.target.value) })
                  ] })
                ] })
              ] }, y)),
              /* @__PURE__ */ p(
                "button",
                {
                  onClick: () => t((m) => ({ ...m, education: [...m.education, pi()] })),
                  className: "flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl mb-8",
                  style: { color: k, border: `1px solid ${k}45`, background: `${k}10` },
                  children: [
                    /* @__PURE__ */ d(hi, { className: "w-4 h-4" }),
                    "Add Education"
                  ]
                }
              ),
              /* @__PURE__ */ p("div", { className: "space-y-5", children: [
                /* @__PURE__ */ p("div", { children: [
                  /* @__PURE__ */ d("label", { className: f, children: "Skills (comma-separated)" }),
                  /* @__PURE__ */ d("input", { className: h, placeholder: "Premiere Pro, After Effects, DaVinci Resolve", value: e.skills, onChange: (m) => l("skills", m.target.value) })
                ] }),
                /* @__PURE__ */ p("div", { children: [
                  /* @__PURE__ */ d("label", { className: f, children: "Languages (comma-separated)" }),
                  /* @__PURE__ */ d("input", { className: h, placeholder: "English, Malayalam, Hindi", value: e.languages, onChange: (m) => l("languages", m.target.value) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ p("div", { className: "flex items-center justify-between mt-9 pt-7 border-t", style: { borderColor: "rgba(201,162,39,0.15)" }, children: [
              /* @__PURE__ */ d(
                "button",
                {
                  onClick: () => a((m) => Math.max(1, m - 1)),
                  disabled: r === 1,
                  className: "text-sm font-medium disabled:opacity-30 hover:text-foreground transition-colors",
                  style: { color: O },
                  children: "← Previous"
                }
              ),
              r < 3 ? /* @__PURE__ */ p(
                "button",
                {
                  onClick: () => a((m) => m + 1),
                  className: "flex items-center gap-2 px-7 py-3 rounded-full text-sm font-black hover:scale-105 transition-all",
                  style: { background: F, color: "#060606" },
                  children: [
                    "Next Step ",
                    /* @__PURE__ */ d(St, { className: "w-4 h-4" })
                  ]
                }
              ) : /* @__PURE__ */ p(
                "button",
                {
                  onClick: () => s(!0),
                  className: "flex items-center gap-2 px-9 py-3.5 rounded-full font-black hover:scale-105 transition-all",
                  style: { background: F, color: "#060606", boxShadow: "0 4px 36px rgba(201,162,39,0.4)" },
                  children: [
                    /* @__PURE__ */ d(di, { className: "w-4 h-4" }),
                    "Download PDF — ₹99"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ d(fr, { children: n && /* @__PURE__ */ d(
      U.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "rgba(6,6,6,0.92)", backdropFilter: "blur(20px)" },
        onClick: () => !i && s(!1),
        children: /* @__PURE__ */ d(
          U.div,
          {
            initial: { scale: 0.9, y: 24 },
            animate: { scale: 1, y: 0 },
            exit: { scale: 0.9 },
            className: "w-full max-w-sm rounded-2xl p-8 border text-center bg-white",
            style: { borderColor: "rgba(201,162,39,0.35)" },
            onClick: (m) => m.stopPropagation(),
            children: i ? /* @__PURE__ */ p(Xe, { children: [
              /* @__PURE__ */ d(
                U.div,
                {
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  className: "w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center bg-green-500",
                  children: /* @__PURE__ */ d(so, { className: "w-8 h-8 text-white" })
                }
              ),
              /* @__PURE__ */ d("h3", { className: "text-2xl font-black mb-2", style: { fontFamily: "Playfair Display,serif", color: G }, children: "Payment Confirmed!" }),
              /* @__PURE__ */ d("p", { className: "text-sm", style: { color: O }, children: "Opening your resume for download..." })
            ] }) : /* @__PURE__ */ p(Xe, { children: [
              /* @__PURE__ */ d(
                "div",
                {
                  className: "w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center",
                  style: { background: F },
                  children: /* @__PURE__ */ d(di, { className: "w-7 h-7", style: { color: "#060606" } })
                }
              ),
              /* @__PURE__ */ d("h3", { className: "text-2xl font-black mb-2", style: { fontFamily: "Playfair Display,serif", color: G }, children: "Download Resume" }),
              /* @__PURE__ */ d("p", { className: "text-sm mb-5", style: { color: O }, children: "Pay ₹99 to download your professionally formatted PDF resume." }),
              /* @__PURE__ */ p(
                "div",
                {
                  className: "py-5 rounded-2xl mb-5",
                  style: { background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.25)" },
                  children: [
                    /* @__PURE__ */ d("div", { className: "text-4xl font-black", style: { ...Re, fontFamily: "Playfair Display,serif" }, children: "₹99" }),
                    /* @__PURE__ */ d("div", { className: "text-xs mt-1", style: { color: O }, children: "One-time · Instant download" })
                  ]
                }
              ),
              /* @__PURE__ */ p("p", { className: "text-xs mb-7", style: { color: O }, children: [
                "Pay via UPI to ",
                /* @__PURE__ */ d("strong", { style: { color: G }, children: "9633402183" }),
                ", then click Confirm below."
              ] }),
              /* @__PURE__ */ p("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ d(
                  "button",
                  {
                    onClick: () => s(!1),
                    className: "flex-1 py-3 rounded-full text-sm font-semibold border",
                    style: { borderColor: "rgba(201,162,39,0.3)", color: O },
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ d(
                  "button",
                  {
                    onClick: g,
                    className: "flex-1 py-3 rounded-full text-sm font-black hover:scale-105 transition-all",
                    style: { background: F, color: "#060606" },
                    children: "Confirm Payment"
                  }
                )
              ] })
            ] })
          }
        )
      }
    ) })
  ] });
}
function bh() {
  return /* @__PURE__ */ d("section", { id: "contact", className: "py-28 px-4", style: { background: Me }, children: /* @__PURE__ */ p("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ d(ve, { label: "Get In Touch" }),
    /* @__PURE__ */ d(be, { title: "Contact Us", sub: "Ready to launch your dream website? We respond within 24 hours." }),
    /* @__PURE__ */ p("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ p("div", { className: "space-y-5", children: [
        /* @__PURE__ */ p(
          "div",
          {
            className: "p-7 rounded-2xl border bg-white",
            style: { borderColor: "rgba(201,162,39,0.2)", boxShadow: "0 4px 28px rgba(201,162,39,0.08)" },
            children: [
              /* @__PURE__ */ d("h3", { className: "text-xl font-black mb-7", style: { fontFamily: "Playfair Display,serif", color: G }, children: "Let's Build Together" }),
              /* @__PURE__ */ p("div", { className: "space-y-6", children: [
                /* @__PURE__ */ p("a", { href: xe, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-4 group", children: [
                  /* @__PURE__ */ d(
                    "div",
                    {
                      className: "w-12 h-12 rounded-xl flex items-center justify-center",
                      style: { background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.25)" },
                      children: /* @__PURE__ */ d(Ee, { className: "w-5 h-5", style: { color: "#25d366" } })
                    }
                  ),
                  /* @__PURE__ */ p("div", { children: [
                    /* @__PURE__ */ d("div", { className: "text-xs mb-0.5", style: { color: O }, children: "WhatsApp" }),
                    /* @__PURE__ */ d("div", { className: "font-black group-hover:text-primary transition-colors", style: { color: G }, children: ao })
                  ] })
                ] }),
                /* @__PURE__ */ p("div", { className: "flex items-start gap-4", children: [
                  /* @__PURE__ */ d(
                    "div",
                    {
                      className: "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                      style: { background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)" },
                      children: /* @__PURE__ */ d(Dd, { className: "w-5 h-5", style: { color: k } })
                    }
                  ),
                  /* @__PURE__ */ p("div", { children: [
                    /* @__PURE__ */ d("div", { className: "text-xs mb-0.5", style: { color: O }, children: "Office Address" }),
                    /* @__PURE__ */ p("div", { className: "font-black leading-relaxed", style: { color: G }, children: [
                      "S34, Chunagamvelli,",
                      /* @__PURE__ */ d("br", {}),
                      "Aluva, Kochi, Kerala"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ p("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ d(
                    "div",
                    {
                      className: "w-12 h-12 rounded-xl flex items-center justify-center",
                      style: { background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.22)" },
                      children: /* @__PURE__ */ d(dd, { className: "w-5 h-5", style: { color: k } })
                    }
                  ),
                  /* @__PURE__ */ p("div", { children: [
                    /* @__PURE__ */ d("div", { className: "text-xs mb-0.5", style: { color: O }, children: "Office Hours" }),
                    /* @__PURE__ */ d("div", { className: "font-black", style: { color: G }, children: "Mon – Sat · 9 AM to 7 PM" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ p("div", { className: "mt-7 pt-6 border-t", style: { borderColor: "rgba(201,162,39,0.15)" }, children: [
                /* @__PURE__ */ d("p", { className: "text-xs mb-4", style: { color: O }, children: "Follow us" }),
                /* @__PURE__ */ d("div", { className: "flex gap-3", children: [{ I: Cd, c: "#e1306c" }, { I: nh, c: "#ff0000" }, { I: Nd, c: "#0077b5" }, { I: Jd, c: "#1da1f2" }].map(({ I: e, c: t }, n) => /* @__PURE__ */ d(
                  "div",
                  {
                    className: "w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform",
                    style: { background: `${t}10`, border: `1px solid ${t}28` },
                    children: /* @__PURE__ */ d(e, { className: "w-4 h-4", style: { color: t } })
                  },
                  n
                )) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ p(
          "a",
          {
            href: xe,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all duration-300",
            style: { background: F, color: "#060606", boxShadow: "0 6px 48px rgba(201,162,39,0.4)" },
            children: [
              /* @__PURE__ */ d(Ee, { className: "w-6 h-6" }),
              "Chat with Us on WhatsApp",
              /* @__PURE__ */ d(St, { className: "w-5 h-5" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ d("div", { className: "rounded-2xl overflow-hidden border", style: { borderColor: "rgba(201,162,39,0.25)", minHeight: 440 }, children: /* @__PURE__ */ d(
        "iframe",
        {
          title: "Skillhub Digital Office",
          src: "https://maps.google.com/maps?q=Chunangamvely,Aluva,Kochi,Kerala&output=embed&z=15",
          width: "100%",
          height: "100%",
          style: { minHeight: 440, filter: "sepia(0.15) saturate(1.1) brightness(1.0)" },
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade"
        }
      ) })
    ] })
  ] }) });
}
function wh() {
  const e = (t) => document.querySelector(t)?.scrollIntoView({ behavior: "smooth" });
  return /* @__PURE__ */ p("footer", { style: { background: "#060606" }, children: [
    /* @__PURE__ */ d("div", { className: "h-px w-full", style: { background: `linear-gradient(90deg,transparent,${k},${Ne},${k},transparent)` } }),
    /* @__PURE__ */ p("div", { className: "max-w-7xl mx-auto px-5 py-14", children: [
      /* @__PURE__ */ p("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10 mb-10", children: [
        /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ p("div", { className: "flex items-center gap-3 mb-5", children: [
            /* @__PURE__ */ d(to, { src: eo, alt: "Skillhub Digital", className: "w-10 h-10 object-contain rounded-xl" }),
            /* @__PURE__ */ d("span", { className: "font-black text-base", style: { ...Re, fontFamily: "Playfair Display,serif" }, children: "Skillhub Digital" })
          ] }),
          /* @__PURE__ */ d("p", { className: "text-sm leading-relaxed", style: { color: "#888070" }, children: "Kerala's premier web design studio. Building websites that win clients and grow businesses." })
        ] }),
        /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ d("h4", { className: "text-sm font-black mb-4", style: { color: k }, children: "Quick Links" }),
          /* @__PURE__ */ d("div", { className: "space-y-2.5", children: [["#services", "Services"], ["#portfolio", "Portfolio"], ["#pricing", "Pricing"], ["#resume", "Resume Builder"], ["#contact", "Contact"]].map(([t, n]) => /* @__PURE__ */ d("button", { onClick: () => e(t), className: "block text-sm hover:text-primary transition-colors", style: { color: "#888070" }, children: n }, t)) })
        ] }),
        /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ d("h4", { className: "text-sm font-black mb-4", style: { color: k }, children: "Services" }),
          /* @__PURE__ */ d("div", { className: "space-y-2 text-sm", style: { color: "#888070" }, children: ["Landing Pages", "Business Websites", "Portfolio Websites", "E-commerce", "Logo Design", "SEO Setup", "Poster Design"].map((t) => /* @__PURE__ */ d("div", { children: t }, t)) })
        ] })
      ] }),
      /* @__PURE__ */ d("div", { className: "h-px w-full mb-8", style: { background: "linear-gradient(90deg,transparent,rgba(201,162,39,0.4),transparent)" } }),
      /* @__PURE__ */ p("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ d("p", { className: "text-xs", style: { color: "#666050" }, children: "© 2024 Skillhub Digital · S34, Chunagamvelli, Aluva, Kochi" }),
        /* @__PURE__ */ p("p", { className: "text-xs", style: { color: "#666050" }, children: [
          "Crafted with ",
          /* @__PURE__ */ d("span", { className: "text-red-500", children: "♥" }),
          " in Kerala, India"
        ] })
      ] })
    ] })
  ] });
}
function Th() {
  return /* @__PURE__ */ d(
    "a",
    {
      href: xe,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300",
      style: { background: "#25d366", boxShadow: "0 4px 32px rgba(37,211,102,0.55)" },
      "aria-label": "WhatsApp",
      children: /* @__PURE__ */ d(Ee, { className: "w-7 h-7 text-white fill-white" })
    }
  );
}
function Ph() {
  return /* @__PURE__ */ p("div", { className: "min-h-screen bg-background text-foreground", style: { fontFamily: "Inter,sans-serif" }, children: [
    /* @__PURE__ */ d(lh, {}),
    /* @__PURE__ */ d(ch, {}),
    /* @__PURE__ */ d(dh, {}),
    /* @__PURE__ */ d(fh, {}),
    /* @__PURE__ */ d(ph, {}),
    /* @__PURE__ */ d(gh, {}),
    /* @__PURE__ */ d(xh, {}),
    /* @__PURE__ */ d(vh, {}),
    /* @__PURE__ */ d(bh, {}),
    /* @__PURE__ */ d(wh, {}),
    /* @__PURE__ */ d(Th, {})
  ] });
}
const Sh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ph
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ch as Code0_8
};
