const Ct = () => Promise.resolve().then(() => kt), G = globalThis.__GLOBALS__.ReactJSXRuntime, { Fragment: St, jsx: e, jsxs: t } = G;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
globalThis.__GLOBALS__.React.Children;
globalThis.__GLOBALS__.React.cloneElement;
({
  ...globalThis.__GLOBALS__.React
});
const { Component: _t, createContext: U, createElement: B, createFactory: At, createRef: Et, forwardRef: T, Fragment: zt, isValidElement: Lt, lazy: Mt, memo: Bt, Profiler: It, PureComponent: jt, startTransition: Pt, StrictMode: Rt, Suspense: $t, use: Ft, useCallback: X, useContext: J, useDebugValue: Tt, useDeferredValue: Ot, useEffect: E, useId: Dt, useImperativeHandle: qt, useInsertionEffect: Ht, useLayoutEffect: Wt, useMemo: Vt, useReducer: Yt, useRef: I, useState: b, useSyncExternalStore: Gt, useTransition: Ut, version: Xt, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Jt } = globalThis.__GLOBALS__.React;
function Z(a, r, l) {
  if (a instanceof EventTarget)
    return [a];
  if (typeof a == "string") {
    const o = document.querySelectorAll(a);
    return o ? Array.from(o) : [];
  }
  return Array.from(a);
}
const Q = {
  some: 0,
  all: 1
};
function K(a, r, { root: l, margin: n, amount: o = "some" } = {}) {
  const m = Z(a), i = /* @__PURE__ */ new WeakMap(), x = (w) => {
    w.forEach((y) => {
      const v = i.get(y.target);
      if (y.isIntersecting !== !!v)
        if (y.isIntersecting) {
          const N = r(y.target, y);
          typeof N == "function" ? i.set(y.target, N) : p.unobserve(y.target);
        } else typeof v == "function" && (v(y), i.delete(y.target));
    });
  }, p = new IntersectionObserver(x, {
    root: l,
    rootMargin: n,
    threshold: typeof o == "number" ? o : Q[o]
  });
  return m.forEach((w) => p.observe(w)), () => p.disconnect();
}
function ee(a, { root: r, margin: l, amount: n, once: o = !1, initial: m = !1 } = {}) {
  const [i, x] = b(m);
  return E(() => {
    if (!a.current || o && i)
      return;
    const p = () => (x(!0), o ? void 0 : () => x(!1)), w = {
      root: r && r.current || void 0,
      margin: l,
      amount: n
    };
    return K(a.current, p, w);
  }, [r, a, l, o, n]), i;
}
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const te = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ae = (a) => a.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (r, l, n) => n ? n.toUpperCase() : l.toLowerCase()
), R = (a) => {
  const r = ae(a);
  return r.charAt(0).toUpperCase() + r.slice(1);
}, O = (...a) => a.filter((r, l, n) => !!r && r.trim() !== "" && n.indexOf(r) === l).join(" ").trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var re = {
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
const se = T(
  ({
    color: a = "currentColor",
    size: r = 24,
    strokeWidth: l = 2,
    absoluteStrokeWidth: n,
    className: o = "",
    children: m,
    iconNode: i,
    ...x
  }, p) => B(
    "svg",
    {
      ref: p,
      ...re,
      width: r,
      height: r,
      stroke: a,
      strokeWidth: n ? Number(l) * 24 / Number(r) : l,
      className: O("lucide", o),
      ...x
    },
    [
      ...i.map(([w, y]) => B(w, y)),
      ...Array.isArray(m) ? m : [m]
    ]
  )
);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u = (a, r) => {
  const l = T(
    ({ className: n, ...o }, m) => B(se, {
      ref: m,
      iconNode: r,
      className: O(
        `lucide-${te(R(a))}`,
        `lucide-${a}`,
        n
      ),
      ...o
    })
  );
  return l.displayName = R(a), l;
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const le = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], z = u("arrow-right", le);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ne = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
], ie = u("award", ne);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oe = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], ce = u("calendar", oe);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const de = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], D = u("chevron-left", de);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const me = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], q = u("chevron-right", me);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ue = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], he = u("circle-check-big", ue);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pe = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
], ge = u("facebook", pe);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xe = [
  [
    "path",
    {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
      key: "1xhozi"
    }
  ]
], ye = u("headphones", xe);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const be = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
], H = u("instagram", be);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fe = [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "c2jq9f"
    }
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }]
], ve = u("linkedin", fe);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const we = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
], W = u("mail", we);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ne = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], ke = u("map-pin", Ne);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ce = [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
], Se = u("menu", Ce);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _e = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
], Ae = u("message-square", _e);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ee = [
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  [
    "path",
    {
      d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
      key: "12rzf8"
    }
  ]
], ze = u("palette", Ee);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Le = [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
], V = u("phone", Le);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Me = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]], Be = u("play", Me);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ie = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], je = u("plus", Ie);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pe = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], Re = u("shield", Pe);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $e = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
], Fe = u("star", $e);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Te = [
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
], Oe = u("truck", Te);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const De = [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
], qe = u("twitter", De);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const He = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
], We = u("user", He);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ve = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], j = u("x", Ve);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ye = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], Ge = u("zap", Ye), c = "#B8955D", Ue = "971500000000", k = "#1E1E1E", C = "#F8F6F2", _ = "#E7DED2", d = { fontFamily: "'Playfair Display', Georgia, serif" }, s = { fontFamily: "'DM Sans', system-ui, sans-serif" };
function S(a, r, l) {
  return `https://images.unsplash.com/photo-${a}?w=${r}&h=${l}&fit=crop&auto=format`;
}
function h({
  children: a,
  delay: r = 0,
  className: l = ""
}) {
  const n = I(null), o = ee(n, { once: !0, margin: "-60px" });
  return /* @__PURE__ */ e(
    "div",
    {
      ref: n,
      className: l,
      style: {
        opacity: o ? 1 : 0,
        transform: o ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s ease ${r}s, transform 0.85s ease ${r}s`
      },
      children: a
    }
  );
}
function f({
  children: a,
  center: r = !1,
  light: l = !1
}) {
  return /* @__PURE__ */ t("div", { className: `flex items-center gap-3 mb-4 ${r ? "justify-center" : ""}`, children: [
    /* @__PURE__ */ e("div", { className: "h-px w-8 flex-shrink-0", style: { background: c } }),
    /* @__PURE__ */ e(
      "span",
      {
        className: "text-[10px] tracking-[0.28em] uppercase",
        style: { ...s, color: l ? "rgba(255,255,255,0.5)" : c },
        children: a
      }
    )
  ] });
}
const Y = U(() => {
}), P = () => J(Y), Xe = [
  "Sheer Curtains",
  "Blackout Curtains",
  "Motorized Curtains",
  "Roman Blinds",
  "Roller Blinds",
  "Wooden Blinds",
  "Not Sure Yet"
];
function Je({ open: a, onClose: r }) {
  const [l, n] = b({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: ""
  }), [o, m] = b(!1), [i, x] = b({});
  if (E(() => (document.body.style.overflow = a ? "hidden" : "", () => {
    document.body.style.overflow = "";
  }), [a]), E(() => {
    a || setTimeout(() => {
      m(!1), n({ name: "", phone: "", email: "", service: "", date: "", message: "" }), x({});
    }, 400);
  }, [a]), !a) return null;
  const p = (g) => (L) => n((M) => ({ ...M, [g]: L.target.value }));
  function w() {
    const g = {};
    return l.name.trim() || (g.name = "Required"), l.phone.trim() || (g.phone = "Required"), l.service || (g.service = "Please select a service"), g;
  }
  function y(g) {
    g.preventDefault();
    const L = w();
    if (Object.keys(L).length) {
      x(L);
      return;
    }
    const M = [
      "Hello SanCurtains! 👋",
      "",
      "I'd like to book a free consultation.",
      "",
      `*Name:* ${l.name}`,
      `*Phone:* ${l.phone}`,
      l.email ? `*Email:* ${l.email}` : null,
      `*Service:* ${l.service}`,
      l.date ? `*Preferred Date:* ${l.date}` : null,
      l.message ? `*Message:* ${l.message}` : null
    ].filter(Boolean).join(`
`);
    window.open(`https://wa.me/${Ue}?text=${encodeURIComponent(M)}`, "_blank"), m(!0);
  }
  const v = "w-full px-4 py-3 text-sm bg-white border focus:outline-none focus:border-stone-400 transition-colors duration-200 placeholder-gray-300", N = { ...s, borderColor: "rgba(0,0,0,0.12)", color: k };
  return /* @__PURE__ */ e(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
      style: { background: "rgba(20,20,20,0.72)", backdropFilter: "blur(8px)" },
      onClick: r,
      children: /* @__PURE__ */ t(
        "div",
        {
          className: "relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto",
          style: { background: C },
          onClick: (g) => g.stopPropagation(),
          children: [
            /* @__PURE__ */ e("div", { className: "px-8 pt-10 pb-7", style: { borderBottom: "1px solid rgba(0,0,0,0.08)" }, children: /* @__PURE__ */ t("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ t("div", { children: [
                /* @__PURE__ */ e(f, { children: "Free Consultation" }),
                /* @__PURE__ */ e("h2", { className: "text-[1.85rem] leading-tight", style: d, children: "Book Your Appointment" }),
                /* @__PURE__ */ e("p", { className: "mt-2 text-[13px] text-gray-400", style: s, children: "Fill in your details and we'll reach you on WhatsApp." })
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: r,
                  className: "mt-1 p-1.5 text-gray-400 hover:text-gray-700 transition-colors",
                  "aria-label": "Close",
                  children: /* @__PURE__ */ e(j, { size: 20 })
                }
              )
            ] }) }),
            o ? (
              /* Success state */
              /* @__PURE__ */ t("div", { className: "px-8 py-14 text-center", children: [
                /* @__PURE__ */ e(
                  "div",
                  {
                    className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5",
                    style: { background: "#F0FAF0" },
                    children: /* @__PURE__ */ e(he, { size: 32, style: { color: "#4CAF50" } })
                  }
                ),
                /* @__PURE__ */ e("h3", { className: "text-[1.4rem] mb-3", style: d, children: "WhatsApp Opened!" }),
                /* @__PURE__ */ e("p", { className: "text-[13.5px] text-gray-500 leading-relaxed mb-6", style: s, children: "Your enquiry has been prepared and WhatsApp should be open. Send the message to confirm your consultation request." }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: r,
                    className: "px-8 py-3 text-white text-[11px] tracking-[0.14em] uppercase",
                    style: { ...s, background: c },
                    children: "Close"
                  }
                )
              ] })
            ) : (
              /* Form */
              /* @__PURE__ */ t("form", { onSubmit: y, className: "px-8 py-8 space-y-5", noValidate: !0, children: [
                /* @__PURE__ */ t("div", { children: [
                  /* @__PURE__ */ t("label", { className: "block text-[11px] tracking-[0.16em] uppercase mb-2 text-gray-500", style: s, children: [
                    "Full Name ",
                    /* @__PURE__ */ e("span", { style: { color: c }, children: "*" })
                  ] }),
                  /* @__PURE__ */ t("div", { className: "relative", children: [
                    /* @__PURE__ */ e(We, { size: 14, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" }),
                    /* @__PURE__ */ e(
                      "input",
                      {
                        type: "text",
                        placeholder: "Your full name",
                        value: l.name,
                        onChange: p("name"),
                        className: v,
                        style: { ...N, paddingLeft: "36px", borderColor: i.name ? "#c0392b" : "rgba(0,0,0,0.12)" }
                      }
                    )
                  ] }),
                  i.name && /* @__PURE__ */ e("p", { className: "mt-1 text-[11px]", style: { ...s, color: "#c0392b" }, children: i.name })
                ] }),
                /* @__PURE__ */ t("div", { children: [
                  /* @__PURE__ */ t("label", { className: "block text-[11px] tracking-[0.16em] uppercase mb-2 text-gray-500", style: s, children: [
                    "Phone Number ",
                    /* @__PURE__ */ e("span", { style: { color: c }, children: "*" })
                  ] }),
                  /* @__PURE__ */ t("div", { className: "relative", children: [
                    /* @__PURE__ */ e(V, { size: 14, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" }),
                    /* @__PURE__ */ e(
                      "input",
                      {
                        type: "tel",
                        placeholder: "+971 50 000 0000",
                        value: l.phone,
                        onChange: p("phone"),
                        className: v,
                        style: { ...N, paddingLeft: "36px", borderColor: i.phone ? "#c0392b" : "rgba(0,0,0,0.12)" }
                      }
                    )
                  ] }),
                  i.phone && /* @__PURE__ */ e("p", { className: "mt-1 text-[11px]", style: { ...s, color: "#c0392b" }, children: i.phone })
                ] }),
                /* @__PURE__ */ t("div", { children: [
                  /* @__PURE__ */ e("label", { className: "block text-[11px] tracking-[0.16em] uppercase mb-2 text-gray-500", style: s, children: "Email Address" }),
                  /* @__PURE__ */ t("div", { className: "relative", children: [
                    /* @__PURE__ */ e(W, { size: 14, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" }),
                    /* @__PURE__ */ e(
                      "input",
                      {
                        type: "email",
                        placeholder: "your@email.com",
                        value: l.email,
                        onChange: p("email"),
                        className: v,
                        style: { ...N, paddingLeft: "36px" }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ t("div", { children: [
                  /* @__PURE__ */ t("label", { className: "block text-[11px] tracking-[0.16em] uppercase mb-2 text-gray-500", style: s, children: [
                    "Service Interested In ",
                    /* @__PURE__ */ e("span", { style: { color: c }, children: "*" })
                  ] }),
                  /* @__PURE__ */ t(
                    "select",
                    {
                      value: l.service,
                      onChange: p("service"),
                      className: v,
                      style: { ...N, borderColor: i.service ? "#c0392b" : "rgba(0,0,0,0.12)", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" },
                      children: [
                        /* @__PURE__ */ e("option", { value: "", children: "Select a service…" }),
                        Xe.map((g) => /* @__PURE__ */ e("option", { value: g, children: g }, g))
                      ]
                    }
                  ),
                  i.service && /* @__PURE__ */ e("p", { className: "mt-1 text-[11px]", style: { ...s, color: "#c0392b" }, children: i.service })
                ] }),
                /* @__PURE__ */ t("div", { children: [
                  /* @__PURE__ */ e("label", { className: "block text-[11px] tracking-[0.16em] uppercase mb-2 text-gray-500", style: s, children: "Preferred Visit Date" }),
                  /* @__PURE__ */ t("div", { className: "relative", children: [
                    /* @__PURE__ */ e(ce, { size: 14, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" }),
                    /* @__PURE__ */ e(
                      "input",
                      {
                        type: "date",
                        value: l.date,
                        onChange: p("date"),
                        min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                        className: v,
                        style: { ...N, paddingLeft: "36px" }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ t("div", { children: [
                  /* @__PURE__ */ e("label", { className: "block text-[11px] tracking-[0.16em] uppercase mb-2 text-gray-500", style: s, children: "Additional Message" }),
                  /* @__PURE__ */ t("div", { className: "relative", children: [
                    /* @__PURE__ */ e(Ae, { size: 14, className: "absolute left-3.5 top-4 text-gray-300 pointer-events-none" }),
                    /* @__PURE__ */ e(
                      "textarea",
                      {
                        rows: 3,
                        placeholder: "Any specific requirements or questions…",
                        value: l.message,
                        onChange: p("message"),
                        className: v,
                        style: { ...N, paddingLeft: "36px", resize: "none" }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ t(
                  "div",
                  {
                    className: "flex items-start gap-3 p-4",
                    style: { background: "#f0faf0", border: "1px solid rgba(76,175,80,0.2)" },
                    children: [
                      /* @__PURE__ */ t("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "#4CAF50", className: "flex-shrink-0 mt-0.5", children: [
                        /* @__PURE__ */ e("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" }),
                        /* @__PURE__ */ e("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.535 5.856L.057 23.625c-.074.297.198.569.495.495l5.769-1.478A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.943 0-3.772-.525-5.345-1.443l-.384-.228-3.975 1.019 1.019-3.867-.248-.397A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" })
                      ] }),
                      /* @__PURE__ */ e("p", { className: "text-[12px] text-green-700 leading-relaxed", style: s, children: 'Clicking "Send to WhatsApp" will open WhatsApp with your details pre-filled. Simply press Send to confirm your consultation request.' })
                    ]
                  }
                ),
                /* @__PURE__ */ t(
                  "button",
                  {
                    type: "submit",
                    className: "w-full flex items-center justify-center gap-3 py-4 text-white text-[11px] tracking-[0.18em] uppercase font-medium transition-opacity duration-200 hover:opacity-90",
                    style: { ...s, background: "#25D366" },
                    children: [
                      /* @__PURE__ */ t("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "white", children: [
                        /* @__PURE__ */ e("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" }),
                        /* @__PURE__ */ e("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.535 5.856L.057 23.625c-.074.297.198.569.495.495l5.769-1.478A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.943 0-3.772-.525-5.345-1.443l-.384-.228-3.975 1.019 1.019-3.867-.248-.397A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" })
                      ] }),
                      "Send to WhatsApp"
                    ]
                  }
                )
              ] })
            )
          ]
        }
      )
    }
  );
}
const $ = ["Home", "About", "Collections", "Services", "Projects", "Gallery", "Blog", "Contact"];
function Ze() {
  const a = P(), [r, l] = b(!1), [n, o] = b(!1);
  E(() => {
    const i = () => l(window.scrollY > 64);
    return window.addEventListener("scroll", i, { passive: !0 }), () => window.removeEventListener("scroll", i);
  }, []);
  const m = r ? "#555" : "rgba(255,255,255,0.82)";
  return /* @__PURE__ */ t(
    "nav",
    {
      className: "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      style: {
        background: r ? "rgba(248,246,242,0.94)" : "rgba(30,30,30,0.08)",
        backdropFilter: "blur(14px)",
        borderBottom: r ? "1px solid rgba(184,149,93,0.14)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: r ? "0 4px 40px rgba(0,0,0,0.07)" : "none"
      },
      children: [
        /* @__PURE__ */ t("div", { className: "max-w-[1280px] mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between", children: [
          /* @__PURE__ */ t("a", { href: "#", className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: "w-8 h-8 flex items-center justify-center text-white text-xs font-bold",
                style: { background: c },
                children: "SC"
              }
            ),
            /* @__PURE__ */ e(
              "span",
              {
                className: "text-[1.15rem] tracking-wide",
                style: { ...d, color: r ? k : "white" },
                children: "SanCurtains"
              }
            )
          ] }),
          /* @__PURE__ */ e("div", { className: "hidden lg:flex items-center gap-7", children: $.map((i) => /* @__PURE__ */ t(
            "a",
            {
              href: "#",
              className: "relative text-[13px] group transition-colors duration-200",
              style: { ...s, color: m },
              children: [
                i,
                /* @__PURE__ */ e(
                  "span",
                  {
                    className: "absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300",
                    style: { background: c }
                  }
                )
              ]
            },
            i
          )) }),
          /* @__PURE__ */ e("div", { className: "hidden lg:block", children: /* @__PURE__ */ e(
            "button",
            {
              onClick: a,
              className: "px-6 py-2.5 text-white text-[11px] tracking-[0.14em] uppercase transition-opacity duration-200 hover:opacity-85",
              style: { ...s, background: c },
              children: "Book Consultation"
            }
          ) }),
          /* @__PURE__ */ e(
            "button",
            {
              className: "lg:hidden p-2",
              onClick: () => o((i) => !i),
              style: { color: r ? k : "white" },
              "aria-label": "Toggle menu",
              children: n ? /* @__PURE__ */ e(j, { size: 22 }) : /* @__PURE__ */ e(Se, { size: 22 })
            }
          )
        ] }),
        n && /* @__PURE__ */ t(
          "div",
          {
            className: "lg:hidden px-6 pb-6 pt-1",
            style: { background: "rgba(248,246,242,0.98)", backdropFilter: "blur(16px)" },
            children: [
              $.map((i) => /* @__PURE__ */ e(
                "a",
                {
                  href: "#",
                  className: "block py-3 text-sm border-b",
                  style: { ...s, color: "#666", borderColor: "rgba(0,0,0,0.07)" },
                  children: i
                },
                i
              )),
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: a,
                  className: "mt-5 w-full py-3 text-white text-[11px] tracking-[0.14em] uppercase",
                  style: { ...s, background: c },
                  children: "Book Consultation"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Qe() {
  const a = P();
  return /* @__PURE__ */ e(et, { onBook: a });
}
const Ke = [
  { label: "Sheer Linen", tone: "#E8E0D5" },
  { label: "Matte Velvet", tone: "#4A3728" },
  { label: "Silk Blend", tone: "#C8B89A" }
];
function et({ onBook: a }) {
  return /* @__PURE__ */ t("section", { className: "relative h-screen min-h-[680px] flex items-center overflow-hidden", children: [
    /* @__PURE__ */ t("div", { className: "absolute inset-0 bg-stone-800", children: [
      /* @__PURE__ */ e(
        "img",
        {
          src: S("1776186243326-1d467b258232", 1920, 1080),
          alt: "Luxurious living room with elegant floor-to-ceiling curtains and natural sunlight",
          className: "w-full h-full object-cover opacity-90"
        }
      ),
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute inset-0",
          style: {
            background: "linear-gradient(115deg, rgba(20,20,20,0.74) 0%, rgba(20,20,20,0.38) 55%, rgba(20,20,20,0.12) 100%)"
          }
        }
      )
    ] }),
    /* @__PURE__ */ t("div", { className: "relative z-10 max-w-[1280px] mx-auto px-6 lg:px-8 w-full", children: [
      /* @__PURE__ */ t("div", { className: "max-w-[620px]", children: [
        /* @__PURE__ */ t("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ e("div", { className: "w-10 h-px", style: { background: c } }),
          /* @__PURE__ */ e(
            "span",
            {
              className: "text-[10px] tracking-[0.3em] uppercase text-white/55",
              style: s,
              children: "Premium Window Dressing"
            }
          )
        ] }),
        /* @__PURE__ */ t(
          "h1",
          {
            className: "text-[3.4rem] md:text-[4.2rem] lg:text-[5rem] text-white leading-[1.08] mb-6",
            style: d,
            children: [
              "Transform Your Space",
              /* @__PURE__ */ e("br", {}),
              /* @__PURE__ */ e("em", { className: "not-italic", style: { color: "#D4AE78" }, children: "with Timeless" }),
              /* @__PURE__ */ e("br", {}),
              "Luxury"
            ]
          }
        ),
        /* @__PURE__ */ e(
          "p",
          {
            className: "text-white/65 text-[1.05rem] leading-relaxed mb-10 max-w-[460px]",
            style: s,
            children: "Handcrafted curtains and premium blinds that bring considered elegance to every window. Bespoke designs for the most discerning interiors."
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-4", children: [
          /* @__PURE__ */ t(
            "button",
            {
              className: "group flex items-center gap-2 px-8 py-4 text-white text-[11px] tracking-[0.14em] uppercase transition-all duration-300",
              style: { ...s, background: c },
              children: [
                "Explore Collection",
                /* @__PURE__ */ e(
                  z,
                  {
                    size: 13,
                    className: "transition-transform duration-300 group-hover:translate-x-1"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: a,
              className: "px-8 py-4 text-white text-[11px] tracking-[0.14em] uppercase border border-white/28 hover:border-white/55 transition-all duration-300",
              style: s,
              children: "Book Free Consultation"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3", children: Ke.map((r, l) => /* @__PURE__ */ t(
        "div",
        {
          className: "flex items-center gap-3 px-4 py-3",
          style: {
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.13)",
            animation: `scFloat ${3.2 + l * 0.6}s ease-in-out infinite alternate`
          },
          children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: "w-9 h-9 flex-shrink-0",
                style: { background: r.tone }
              }
            ),
            /* @__PURE__ */ t("div", { children: [
              /* @__PURE__ */ e("p", { className: "text-white text-[12px] font-medium", style: s, children: r.label }),
              /* @__PURE__ */ e(
                "p",
                {
                  className: "text-[10px]",
                  style: { ...s, color: "rgba(255,255,255,0.4)" },
                  children: "Premium Fabric"
                }
              )
            ] })
          ]
        },
        r.label
      )) })
    ] }),
    /* @__PURE__ */ t("div", { className: "absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ e(
        "span",
        {
          className: "text-white/40 text-[9px] tracking-[0.22em] uppercase",
          style: s,
          children: "Scroll"
        }
      ),
      /* @__PURE__ */ e("div", { className: "w-px h-11 bg-gradient-to-b from-white/45 to-transparent" })
    ] })
  ] });
}
const F = [
  "Marriott Hotels",
  "Four Seasons",
  "Armani Casa",
  "B&B Italia",
  "Minotti",
  "Ritz Carlton",
  "Bulgari Hotels",
  "Park Hyatt",
  "Restoration Hardware",
  "LVMH Group"
];
function tt() {
  return /* @__PURE__ */ t("section", { className: "py-14 overflow-hidden", style: { background: k }, children: [
    /* @__PURE__ */ e(
      "p",
      {
        className: "text-center text-[10px] tracking-[0.3em] uppercase mb-8",
        style: { ...s, color: "rgba(255,255,255,0.28)" },
        children: "Trusted by leading hospitality & luxury brands"
      }
    ),
    /* @__PURE__ */ e(
      "div",
      {
        className: "flex gap-16 whitespace-nowrap",
        style: { animation: "scMarquee 30s linear infinite" },
        children: [...F, ...F].map((a, r) => /* @__PURE__ */ t(
          "span",
          {
            className: "inline-flex items-center gap-4",
            style: { ...d, color: "rgba(255,255,255,0.22)", fontSize: "14px", letterSpacing: "0.06em" },
            children: [
              /* @__PURE__ */ e("span", { style: { color: c, fontSize: "9px" }, children: "✦" }),
              a
            ]
          },
          r
        ))
      }
    )
  ] });
}
const at = [
  { value: "15+", label: "Years of Excellence" },
  { value: "3,200+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "47", label: "Premium Collections" }
];
function rt() {
  return /* @__PURE__ */ e("section", { className: "py-28 lg:py-36", style: { background: C }, children: /* @__PURE__ */ e("div", { className: "max-w-[1280px] mx-auto px-6 lg:px-8", children: /* @__PURE__ */ t("div", { className: "grid lg:grid-cols-2 gap-16 lg:gap-28 items-center", children: [
    /* @__PURE__ */ e(h, { children: /* @__PURE__ */ t("div", { className: "relative", children: [
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute -bottom-5 -right-5 w-44 h-44 -z-10",
          style: { background: _ }
        }
      ),
      /* @__PURE__ */ e(
        "img",
        {
          src: S("1754613389158-3b13a051a81a", 780, 980),
          alt: "Cozy living room with neutral drapery and warm light",
          className: "w-full object-cover relative z-10",
          style: { height: "580px" }
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          className: "absolute -right-10 bottom-1/3 p-6 z-20 shadow-2xl hidden lg:block",
          style: { background: "white" },
          children: [
            /* @__PURE__ */ e("p", { className: "text-[2.6rem] font-semibold leading-none mb-1.5", style: { ...d, color: c }, children: "15+" }),
            /* @__PURE__ */ t(
              "p",
              {
                className: "text-[10px] uppercase tracking-widest text-gray-400 leading-relaxed",
                style: s,
                children: [
                  "Years of",
                  /* @__PURE__ */ e("br", {}),
                  "Excellence"
                ]
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ t(h, { delay: 0.18, children: [
      /* @__PURE__ */ e(f, { children: "Our Story" }),
      /* @__PURE__ */ e("h2", { className: "text-[2.6rem] lg:text-[3.2rem] leading-[1.12] mb-7", style: d, children: "Crafting Window Elegance Since 2009" }),
      /* @__PURE__ */ e("p", { className: "text-gray-500 text-[15px] leading-relaxed mb-5", style: s, children: "SanCurtains was founded on a single belief — that every window is an opportunity for beauty. Over 15 years, we have brought this vision to luxury residences, boutique hotels, and prestigious commercial spaces across the region." }),
      /* @__PURE__ */ e("p", { className: "text-gray-500 text-[15px] leading-relaxed mb-10", style: s, children: "Our team of master craftsmen sources the finest fabrics from European mills, hand-selecting each material for texture, drape, and light behaviour. The result is window treatments that feel considered, not merely functional." }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-2 gap-4", children: at.map((a) => /* @__PURE__ */ t(
        "div",
        {
          className: "p-5",
          style: {
            background: _,
            borderLeft: `2px solid ${c}`
          },
          children: [
            /* @__PURE__ */ e("p", { className: "text-[2rem] font-semibold leading-none mb-1.5", style: { ...d, color: k }, children: a.value }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-gray-400 tracking-wide", style: s, children: a.label })
          ]
        },
        a.label
      )) })
    ] })
  ] }) }) });
}
const st = [
  { name: "Sheer Curtains", desc: "Diffuse natural light beautifully", img: "1592334634520-198ca26446c4", tag: "Most Popular" },
  { name: "Blackout Curtains", desc: "Perfect darkness on demand", img: "1660492038440-8648b50fa1af", tag: "" },
  { name: "Motorized Curtains", desc: "Effortless smart automation", img: "1778731525567-a65ec40a4bb5", tag: "New" },
  { name: "Roman Blinds", desc: "Timeless structured elegance", img: "1642541070065-3912f347e7c6", tag: "" },
  { name: "Roller Blinds", desc: "Clean, minimal precision", img: "1662454419716-c4c504728811", tag: "" },
  { name: "Wooden Blinds", desc: "Warm natural textures", img: "1578683010236-d716f9a3f461", tag: "" }
];
function lt() {
  return /* @__PURE__ */ e("section", { className: "py-28", style: { background: "white" }, children: /* @__PURE__ */ t("div", { className: "max-w-[1280px] mx-auto px-6 lg:px-8", children: [
    /* @__PURE__ */ t(h, { className: "text-center mb-16", children: [
      /* @__PURE__ */ e(f, { center: !0, children: "Our Collections" }),
      /* @__PURE__ */ e("h2", { className: "text-[2.6rem] lg:text-[3.2rem]", style: d, children: "Curated for Every Interior" })
    ] }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: st.map((a, r) => /* @__PURE__ */ e(h, { delay: r * 0.07, children: /* @__PURE__ */ t("div", { className: "group relative overflow-hidden cursor-pointer", style: { background: C }, children: [
      /* @__PURE__ */ t("div", { className: "relative overflow-hidden", style: { height: "310px" }, children: [
        /* @__PURE__ */ e(
          "img",
          {
            src: S(a.img, 600, 620),
            alt: a.name,
            className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            style: { background: "rgba(20,20,20,0.36)" }
          }
        ),
        a.tag && /* @__PURE__ */ e(
          "span",
          {
            className: "absolute top-4 left-4 px-3 py-1 text-[9px] tracking-[0.18em] uppercase text-white font-medium",
            style: { ...s, background: c },
            children: a.tag
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            className: "absolute bottom-4 left-4 right-4 py-3 text-white text-[10px] tracking-[0.16em] uppercase font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500",
            style: { ...s, background: c },
            children: "View Collection"
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "p-5", children: [
        /* @__PURE__ */ e("h3", { className: "text-[1.05rem] mb-1", style: d, children: a.name }),
        /* @__PURE__ */ e("p", { className: "text-sm text-gray-400", style: s, children: a.desc })
      ] })
    ] }) }, a.name)) })
  ] }) });
}
const nt = [
  { Icon: ze, title: "Custom Designs", desc: "Every piece tailored to your exact specifications and interior vision, with no two orders alike." },
  { Icon: ie, title: "Expert Installation", desc: "Our trained installation team ensures a flawless, precise fit for every window and opening." },
  { Icon: Re, title: "Luxury Materials", desc: "Hand-selected fabrics from the finest European mills — Dedar, Zimmer + Rohde, Romo, and beyond." },
  { Icon: Oe, title: "Fast Delivery", desc: "Dedicated logistics ensuring your bespoke order arrives on schedule, every single time." },
  { Icon: ye, title: "5-Year Warranty", desc: "Complete peace of mind with our comprehensive product and installation warranty." },
  { Icon: Ge, title: "Professional Support", desc: "A dedicated consultant guides you from first sample selection through to final installation day." }
];
function it() {
  return /* @__PURE__ */ e("section", { className: "py-28", style: { background: _ }, children: /* @__PURE__ */ t("div", { className: "max-w-[1280px] mx-auto px-6 lg:px-8", children: [
    /* @__PURE__ */ t(h, { className: "text-center mb-16", children: [
      /* @__PURE__ */ e(f, { center: !0, children: "Why SanCurtains" }),
      /* @__PURE__ */ e("h2", { className: "text-[2.6rem] lg:text-[3.2rem]", style: d, children: "The Difference You Feel" })
    ] }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: nt.map(({ Icon: a, title: r, desc: l }, n) => /* @__PURE__ */ e(h, { delay: n * 0.08, children: /* @__PURE__ */ t(
      "div",
      {
        className: "p-8 transition-shadow duration-400 hover:shadow-xl cursor-default",
        style: { background: "white" },
        children: [
          /* @__PURE__ */ e(
            "div",
            {
              className: "w-12 h-12 mb-6 flex items-center justify-center",
              style: { background: C },
              children: /* @__PURE__ */ e(a, { size: 19, style: { color: c } })
            }
          ),
          /* @__PURE__ */ e("h3", { className: "text-[1.1rem] mb-3", style: d, children: r }),
          /* @__PURE__ */ e("p", { className: "text-[13.5px] text-gray-500 leading-relaxed", style: s, children: l })
        ]
      }
    ) }, r)) })
  ] }) });
}
const ot = [
  { name: "Meridian Villa", type: "Luxury Residence", location: "Dubai Hills", img: "1750420556288-d0e32a6f517b" },
  { name: "The Bayan Hotel", type: "Boutique Hotel", location: "Palm Jumeirah", img: "1662454419716-c4c504728811" },
  { name: "Azure Penthouse", type: "Penthouse Suite", location: "Downtown Dubai", img: "1642541070065-3912f347e7c6" },
  { name: "Rosewood Offices", type: "Corporate Interior", location: "DIFC", img: "1665249934445-1de680641f50" }
];
function ct() {
  return /* @__PURE__ */ e("section", { className: "py-28", style: { background: C }, children: /* @__PURE__ */ t("div", { className: "max-w-[1280px] mx-auto px-6 lg:px-8", children: [
    /* @__PURE__ */ t("div", { className: "flex flex-col lg:flex-row lg:items-end justify-between mb-16", children: [
      /* @__PURE__ */ t(h, { children: [
        /* @__PURE__ */ e(f, { children: "Portfolio" }),
        /* @__PURE__ */ e("h2", { className: "text-[2.6rem] lg:text-[3.2rem]", style: d, children: "Featured Projects" })
      ] }),
      /* @__PURE__ */ e(h, { delay: 0.2, children: /* @__PURE__ */ t(
        "button",
        {
          className: "mt-5 lg:mt-0 flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase transition-opacity hover:opacity-70",
          style: { ...s, color: c },
          children: [
            "View All Projects ",
            /* @__PURE__ */ e(z, { size: 12 })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: ot.map((a, r) => /* @__PURE__ */ e(h, { delay: r * 0.09, children: /* @__PURE__ */ t("div", { className: "group relative overflow-hidden cursor-pointer", style: { height: "420px" }, children: [
      /* @__PURE__ */ e(
        "img",
        {
          src: S(a.img, 800, 840),
          alt: a.name,
          className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        }
      ),
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute inset-0 transition-opacity duration-400",
          style: {
            background: "linear-gradient(0deg, rgba(20,20,20,0.72) 0%, rgba(20,20,20,0) 55%)"
          }
        }
      ),
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400",
          style: { backdropFilter: "blur(1px)" },
          children: /* @__PURE__ */ t(
            "button",
            {
              className: "flex items-center gap-2 px-6 py-3 text-white text-[10px] tracking-[0.16em] uppercase border border-white/40 hover:bg-white hover:text-stone-800 transition-all duration-300",
              style: s,
              children: [
                "View Case Study ",
                /* @__PURE__ */ e(z, { size: 11 })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ t("div", { className: "absolute bottom-0 left-0 right-0 p-7", children: [
        /* @__PURE__ */ t(
          "p",
          {
            className: "text-[10px] tracking-[0.18em] uppercase mb-1.5",
            style: { ...s, color: "rgba(255,255,255,0.5)" },
            children: [
              a.type,
              " · ",
              a.location
            ]
          }
        ),
        /* @__PURE__ */ e("h3", { className: "text-white text-[1.2rem]", style: d, children: a.name })
      ] })
    ] }) }, a.name)) })
  ] }) });
}
function dt() {
  const [a, r] = b(50), l = I(null), n = I(!1), o = X((m) => {
    if (!l.current) return;
    const i = l.current.getBoundingClientRect();
    r(Math.max(3, Math.min(97, (m - i.left) / i.width * 100)));
  }, []);
  return E(() => {
    const m = (x) => {
      n.current && o("touches" in x ? x.touches[0].clientX : x.clientX);
    }, i = () => {
      n.current = !1;
    };
    return window.addEventListener("mousemove", m), window.addEventListener("touchmove", m, { passive: !0 }), window.addEventListener("mouseup", i), window.addEventListener("touchend", i), () => {
      window.removeEventListener("mousemove", m), window.removeEventListener("touchmove", m), window.removeEventListener("mouseup", i), window.removeEventListener("touchend", i);
    };
  }, [o]), /* @__PURE__ */ e("section", { className: "py-28", style: { background: k }, children: /* @__PURE__ */ t("div", { className: "max-w-[1280px] mx-auto px-6 lg:px-8", children: [
    /* @__PURE__ */ t(h, { className: "text-center mb-16", children: [
      /* @__PURE__ */ e(f, { center: !0, light: !0, children: "The Transformation" }),
      /* @__PURE__ */ e("h2", { className: "text-[2.6rem] lg:text-[3.2rem] text-white", style: d, children: "Before & After" }),
      /* @__PURE__ */ e("p", { className: "mt-3 text-[13px]", style: { ...s, color: "rgba(255,255,255,0.38)" }, children: "Drag the handle to reveal the transformation" })
    ] }),
    /* @__PURE__ */ e(h, { children: /* @__PURE__ */ t(
      "div",
      {
        ref: l,
        className: "relative overflow-hidden cursor-col-resize select-none",
        style: { height: "500px" },
        onMouseDown: (m) => {
          n.current = !0, o(m.clientX);
        },
        onTouchStart: (m) => {
          n.current = !0, o(m.touches[0].clientX);
        },
        children: [
          /* @__PURE__ */ e(
            "img",
            {
              src: S("1665249934445-1de680641f50", 1200, 1e3),
              alt: "Room before SanCurtains installation",
              className: "absolute inset-0 w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ e(
            "div",
            {
              className: "absolute top-5 right-5 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase",
              style: { ...s, color: "rgba(255,255,255,0.55)", background: "rgba(0,0,0,0.38)", backdropFilter: "blur(4px)" },
              children: "Before"
            }
          ),
          /* @__PURE__ */ e(
            "img",
            {
              src: S("1754613389158-3b13a051a81a", 1200, 1e3),
              alt: "Room after SanCurtains installation",
              className: "absolute inset-0 w-full h-full object-cover",
              style: { clipPath: `inset(0 ${100 - a}% 0 0)` }
            }
          ),
          /* @__PURE__ */ e(
            "div",
            {
              className: "absolute top-5 left-5 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase text-white font-medium transition-opacity duration-300",
              style: { ...s, background: c, opacity: a > 12 ? 1 : 0 },
              children: "After"
            }
          ),
          /* @__PURE__ */ t(
            "div",
            {
              className: "absolute top-0 bottom-0 pointer-events-none",
              style: { left: `${a}%`, transform: "translateX(-50%)" },
              children: [
                /* @__PURE__ */ e("div", { className: "w-px h-full mx-auto", style: { background: "rgba(255,255,255,0.55)" } }),
                /* @__PURE__ */ t(
                  "div",
                  {
                    className: "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center gap-0.5",
                    style: { background: c, boxShadow: "0 0 0 4px rgba(184,149,93,0.28)" },
                    children: [
                      /* @__PURE__ */ e(D, { size: 10, className: "text-white" }),
                      /* @__PURE__ */ e(q, { size: 10, className: "text-white" })
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    ) })
  ] }) });
}
const A = [
  {
    name: "Sarah Al-Rashidi",
    role: "Homeowner, Dubai Hills",
    quote: "SanCurtains transformed our villa beyond recognition. The team understood our vision perfectly and delivered with extraordinary precision. Every room now feels like a five-star suite.",
    rating: 5,
    avatar: "1494790108377-be9c29b29330"
  },
  {
    name: "James Whitfield",
    role: "Interior Designer, London",
    quote: "I have worked with curtain suppliers across three continents. SanCurtains stands apart — their fabric knowledge and craftsmanship are genuinely world-class, without exception.",
    rating: 5,
    avatar: "1472099645785-5658abf4ff4e"
  },
  {
    name: "Leila Mansour",
    role: "General Manager, The Bayan Hotel",
    quote: "We entrusted SanCurtains with all 142 rooms of our flagship property. The result surpassed our expectations — impeccable quality, delivered perfectly on schedule.",
    rating: 5,
    avatar: "1580489944761-15a19d654956"
  }
];
function mt() {
  const [a, r] = b(0);
  E(() => {
    const n = setInterval(() => r((o) => (o + 1) % A.length), 5200);
    return () => clearInterval(n);
  }, []);
  const l = A[a];
  return /* @__PURE__ */ e("section", { className: "py-28", style: { background: C }, children: /* @__PURE__ */ t("div", { className: "max-w-[1280px] mx-auto px-6 lg:px-8", children: [
    /* @__PURE__ */ t(h, { className: "text-center mb-14", children: [
      /* @__PURE__ */ e(f, { center: !0, children: "Testimonials" }),
      /* @__PURE__ */ e("h2", { className: "text-[2.6rem] lg:text-[3.2rem]", style: d, children: "What Our Clients Say" })
    ] }),
    /* @__PURE__ */ t(h, { children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: "max-w-[760px] mx-auto px-10 lg:px-16 py-14 text-center",
          style: { background: "white", boxShadow: "0 8px 64px rgba(0,0,0,0.06)" },
          children: [
            /* @__PURE__ */ e("div", { className: "flex justify-center gap-1 mb-8", children: Array.from({ length: l.rating }).map((n, o) => /* @__PURE__ */ e(Fe, { size: 15, fill: c, stroke: "none" }, o)) }),
            /* @__PURE__ */ t(
              "blockquote",
              {
                className: "text-[1.2rem] lg:text-[1.35rem] leading-relaxed text-gray-700 mb-10",
                style: d,
                children: [
                  '"',
                  l.quote,
                  '"'
                ]
              }
            ),
            /* @__PURE__ */ t("div", { className: "flex items-center justify-center gap-4", children: [
              /* @__PURE__ */ e(
                "img",
                {
                  src: `https://images.unsplash.com/photo-${l.avatar}?w=80&h=80&fit=crop&auto=format`,
                  alt: l.name,
                  className: "w-12 h-12 rounded-full object-cover"
                }
              ),
              /* @__PURE__ */ t("div", { className: "text-left", children: [
                /* @__PURE__ */ e("p", { className: "text-[14px] font-medium", style: { ...d, color: k }, children: l.name }),
                /* @__PURE__ */ e("p", { className: "text-[12px] text-gray-400", style: s, children: l.role })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex items-center justify-center gap-5 mt-8", children: [
        /* @__PURE__ */ e(
          "button",
          {
            className: "w-9 h-9 flex items-center justify-center border transition-colors duration-200 hover:border-stone-400",
            style: { borderColor: "rgba(0,0,0,0.12)" },
            onClick: () => r((n) => (n - 1 + A.length) % A.length),
            "aria-label": "Previous testimonial",
            children: /* @__PURE__ */ e(D, { size: 15, className: "text-gray-400" })
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex gap-2", children: A.map((n, o) => /* @__PURE__ */ e(
          "button",
          {
            onClick: () => r(o),
            className: "transition-all duration-300",
            "aria-label": `Testimonial ${o + 1}`,
            style: {
              height: "8px",
              borderRadius: "4px",
              width: o === a ? "22px" : "8px",
              background: o === a ? c : _
            }
          },
          o
        )) }),
        /* @__PURE__ */ e(
          "button",
          {
            className: "w-9 h-9 flex items-center justify-center border transition-colors duration-200 hover:border-stone-400",
            style: { borderColor: "rgba(0,0,0,0.12)" },
            onClick: () => r((n) => (n + 1) % A.length),
            "aria-label": "Next testimonial",
            children: /* @__PURE__ */ e(q, { size: 15, className: "text-gray-400" })
          }
        )
      ] })
    ] })
  ] }) });
}
const ut = [
  {
    step: "01",
    title: "Consultation",
    desc: "A dedicated design consultant visits your space to understand your vision, lifestyle, and aesthetic requirements."
  },
  {
    step: "02",
    title: "Measurement",
    desc: "Precise measurements taken by our expert team, ensuring a tailored fit for every window and opening."
  },
  {
    step: "03",
    title: "Customisation",
    desc: "Choose from hundreds of premium fabrics, heading styles, hardware finishes, and finishing details."
  },
  {
    step: "04",
    title: "Production",
    desc: "Master craftsmen construct your pieces in our atelier, with rigorous quality checks at every stage."
  },
  {
    step: "05",
    title: "Installation",
    desc: "Our installation team fits your curtains with precision and care, leaving your home exactly as found."
  }
];
function ht() {
  return /* @__PURE__ */ e("section", { className: "py-28", style: { background: "white" }, children: /* @__PURE__ */ t("div", { className: "max-w-[1280px] mx-auto px-6 lg:px-8", children: [
    /* @__PURE__ */ t(h, { className: "text-center mb-16", children: [
      /* @__PURE__ */ e(f, { center: !0, children: "How It Works" }),
      /* @__PURE__ */ e("h2", { className: "text-[2.6rem] lg:text-[3.2rem]", style: d, children: "Our Process" })
    ] }),
    /* @__PURE__ */ t("div", { className: "relative", children: [
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute top-8 left-0 right-0 h-px hidden lg:block",
          style: {
            background: `linear-gradient(90deg, transparent, ${_} 8%, ${_} 92%, transparent)`
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6", children: ut.map((a, r) => /* @__PURE__ */ e(h, { delay: r * 0.1, children: /* @__PURE__ */ t("div", { className: "text-center lg:text-left", children: [
        /* @__PURE__ */ e(
          "div",
          {
            className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 relative z-10",
            style: {
              background: C,
              border: `2px solid ${c}`
            },
            children: /* @__PURE__ */ e("span", { className: "text-sm font-semibold", style: { ...d, color: c }, children: a.step })
          }
        ),
        /* @__PURE__ */ e("h3", { className: "text-[1.05rem] mb-2.5", style: d, children: a.title }),
        /* @__PURE__ */ e("p", { className: "text-[13px] text-gray-400 leading-relaxed", style: s, children: a.desc })
      ] }) }, a.step)) })
    ] })
  ] }) });
}
function pt() {
  const [a, r] = b(!1);
  return /* @__PURE__ */ t(
    "section",
    {
      className: "relative overflow-hidden flex items-center justify-center",
      style: { height: "580px" },
      children: [
        /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-stone-700", children: /* @__PURE__ */ e(
          "img",
          {
            src: S("1630701052108-5601f06df085", 1920, 1160),
            alt: "Luxury interior showroom with grand piano and elegant drapes",
            className: "w-full h-full object-cover opacity-60"
          }
        ) }),
        /* @__PURE__ */ e(
          "div",
          {
            className: "absolute inset-0",
            style: { background: "rgba(20,20,20,0.48)", backdropFilter: "blur(1px)" }
          }
        ),
        /* @__PURE__ */ e("div", { className: "relative z-10 text-center", children: /* @__PURE__ */ t(h, { children: [
          /* @__PURE__ */ e(f, { center: !0, light: !0, children: "Experience the Craft" }),
          /* @__PURE__ */ e("h2", { className: "text-[2.6rem] lg:text-[3.4rem] text-white mb-10", style: d, children: "See Luxury in Motion" }),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => r(!0),
              className: "group w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-110",
              style: {
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
                border: `2px solid ${c}`
              },
              "aria-label": "Play video",
              children: /* @__PURE__ */ e(Be, { size: 26, fill: c, stroke: "none", className: "ml-1" })
            }
          )
        ] }) }),
        a && /* @__PURE__ */ t(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center",
            style: { background: "rgba(0,0,0,0.92)" },
            onClick: () => r(!1),
            children: [
              /* @__PURE__ */ e(
                "div",
                {
                  className: "relative w-full max-w-4xl aspect-video bg-stone-900 mx-4 flex items-center justify-center",
                  onClick: (l) => l.stopPropagation(),
                  children: /* @__PURE__ */ e("p", { className: "text-white/30 text-sm", style: s, children: "Video content would play here" })
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  className: "absolute top-6 right-6 text-white/50 hover:text-white transition-colors",
                  onClick: () => r(!1),
                  "aria-label": "Close video",
                  children: /* @__PURE__ */ e(j, { size: 28 })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const gt = [
  "1754613389158-3b13a051a81a",
  "1592334634520-198ca26446c4",
  "1776186243326-1d467b258232",
  "1665249934445-1de680641f50",
  "1660492038440-8648b50fa1af",
  "1750420556288-d0e32a6f517b",
  "1778731525567-a65ec40a4bb5",
  "1642541070065-3912f347e7c6",
  "1662454419716-c4c504728811"
];
function xt() {
  return /* @__PURE__ */ e("section", { className: "py-28", style: { background: C }, children: /* @__PURE__ */ t("div", { className: "max-w-[1280px] mx-auto px-6 lg:px-8", children: [
    /* @__PURE__ */ t(h, { className: "text-center mb-14", children: [
      /* @__PURE__ */ e(f, { center: !0, children: "Instagram" }),
      /* @__PURE__ */ e("h2", { className: "text-[2.6rem] lg:text-[3.2rem]", style: d, children: "Follow Our World" }),
      /* @__PURE__ */ e("p", { className: "mt-3 text-gray-400 text-[13px]", style: s, children: "@sancurtains" })
    ] }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-2.5", children: gt.map((a, r) => /* @__PURE__ */ e(h, { delay: r * 0.04, children: /* @__PURE__ */ t("div", { className: "group relative overflow-hidden aspect-square bg-stone-200", children: [
      /* @__PURE__ */ e(
        "img",
        {
          src: S(a, 420, 420),
          alt: `SanCurtains interior gallery image ${r + 1}`,
          className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        }
      ),
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-350",
          style: { background: "rgba(184,149,93,0.58)" },
          children: /* @__PURE__ */ e(H, { size: 22, className: "text-white" })
        }
      )
    ] }) }, a)) })
  ] }) });
}
const yt = [
  {
    q: "How long does a custom curtain order take?",
    a: "Most custom orders are completed within 3–4 weeks from fabric confirmation. Motorized systems and specialist fabrics may require 5–6 weeks. We provide a precise timeline at the point of order."
  },
  {
    q: "Do you offer a complimentary home visit?",
    a: "Yes. All projects begin with a complimentary in-home consultation. Our design consultant visits at a time convenient for you — taking measurements, discussing your vision, and presenting fabric samples."
  },
  {
    q: "What fabrics do you work with?",
    a: "We source from over 200 premium fabric collections from European mills including Zimmer + Rohde, Dedar, and Romo. Our range covers sheer linens, heavyweight velvets, performance fabrics, and everything between."
  },
  {
    q: "Can you integrate with existing motorisation systems?",
    a: "Absolutely. We are compatible with all major smart home systems including Somfy, Lutron, and Control4. Our technical team surveys your existing setup during the consultation visit."
  },
  {
    q: "Do you operate outside of Dubai?",
    a: "Yes. We work across the UAE including Abu Dhabi, Sharjah, and Ras Al Khaimah. For international projects, please contact us directly to discuss logistics and feasibility."
  }
];
function bt() {
  const [a, r] = b(null);
  return /* @__PURE__ */ e("section", { className: "py-28", style: { background: _ }, children: /* @__PURE__ */ e("div", { className: "max-w-[1280px] mx-auto px-6 lg:px-8", children: /* @__PURE__ */ t("div", { className: "grid lg:grid-cols-2 gap-16 lg:gap-28", children: [
    /* @__PURE__ */ t(h, { children: [
      /* @__PURE__ */ e(f, { children: "FAQ" }),
      /* @__PURE__ */ e("h2", { className: "text-[2.6rem] lg:text-[3.2rem] leading-[1.12] mb-6", style: d, children: "Frequently Asked Questions" }),
      /* @__PURE__ */ e("p", { className: "text-gray-500 text-[15px] leading-relaxed mb-8", style: s, children: "Everything you need to know about working with SanCurtains. If your question isn't answered here, our team is always available." }),
      /* @__PURE__ */ t(
        "button",
        {
          className: "flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase transition-opacity hover:opacity-70",
          style: { ...s, color: c },
          children: [
            "Contact Our Team ",
            /* @__PURE__ */ e(z, { size: 12 })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ e(h, { delay: 0.15, children: /* @__PURE__ */ e("div", { children: yt.map((l, n) => /* @__PURE__ */ t(
      "div",
      {
        className: "border-b",
        style: { borderColor: "rgba(0,0,0,0.1)" },
        children: [
          /* @__PURE__ */ t(
            "button",
            {
              className: "w-full flex items-center justify-between py-5 text-left gap-4",
              onClick: () => r(a === n ? null : n),
              children: [
                /* @__PURE__ */ e(
                  "span",
                  {
                    className: "text-[15px] leading-snug",
                    style: { ...d, color: k },
                    children: l.q
                  }
                ),
                /* @__PURE__ */ e(
                  "span",
                  {
                    className: "flex-shrink-0 transition-transform duration-300",
                    style: { transform: a === n ? "rotate(45deg)" : "rotate(0deg)" },
                    children: /* @__PURE__ */ e(je, { size: 16, style: { color: c } })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ e(
            "div",
            {
              className: "overflow-hidden transition-all duration-400",
              style: { maxHeight: a === n ? "180px" : "0px" },
              children: /* @__PURE__ */ e(
                "p",
                {
                  className: "text-[13.5px] text-gray-500 leading-relaxed pb-5",
                  style: s,
                  children: l.a
                }
              )
            }
          )
        ]
      },
      n
    )) }) })
  ] }) }) });
}
function ft() {
  const a = P();
  return /* @__PURE__ */ t("section", { className: "py-28 relative overflow-hidden", style: { background: k }, children: [
    /* @__PURE__ */ e(
      "div",
      {
        className: "absolute inset-0 opacity-[0.04]",
        style: {
          backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 50%, ${c}, transparent)`
        }
      }
    ),
    /* @__PURE__ */ e("div", { className: "relative max-w-[1280px] mx-auto px-6 lg:px-8 text-center", children: /* @__PURE__ */ t(h, { children: [
      /* @__PURE__ */ t("div", { className: "flex items-center justify-center gap-3 mb-6", children: [
        /* @__PURE__ */ e("div", { className: "w-12 h-px", style: { background: c } }),
        /* @__PURE__ */ e(
          "span",
          {
            className: "text-[10px] tracking-[0.28em] uppercase",
            style: { ...s, color: "rgba(184,149,93,0.8)" },
            children: "Start Your Journey"
          }
        ),
        /* @__PURE__ */ e("div", { className: "w-12 h-px", style: { background: c } })
      ] }),
      /* @__PURE__ */ t(
        "h2",
        {
          className: "text-[2.8rem] lg:text-[4rem] text-white leading-[1.1] mb-6",
          style: d,
          children: [
            "Ready to Transform",
            /* @__PURE__ */ e("br", {}),
            /* @__PURE__ */ e("em", { className: "not-italic", style: { color: "#D4AE78" }, children: "Your Windows?" })
          ]
        }
      ),
      /* @__PURE__ */ e(
        "p",
        {
          className: "text-[1.05rem] leading-relaxed mb-12 max-w-[480px] mx-auto",
          style: { ...s, color: "rgba(255,255,255,0.45)" },
          children: "Schedule your complimentary in-home consultation with one of our design experts today — no obligation."
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap justify-center gap-4", children: [
        /* @__PURE__ */ t(
          "button",
          {
            onClick: a,
            className: "group flex items-center gap-3 px-10 py-4 text-white text-[11px] tracking-[0.16em] uppercase transition-all duration-300",
            style: { ...s, background: c },
            children: [
              "Book Free Consultation",
              /* @__PURE__ */ e(
                z,
                {
                  size: 13,
                  className: "transition-transform duration-300 group-hover:translate-x-1"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            className: "px-10 py-4 text-[11px] tracking-[0.16em] uppercase border transition-all duration-300 hover:border-white/40",
            style: { ...s, color: "rgba(255,255,255,0.55)", borderColor: "rgba(255,255,255,0.16)" },
            children: "View Our Portfolio"
          }
        )
      ] })
    ] }) })
  ] });
}
const vt = [H, ge, qe, ve];
function wt() {
  return /* @__PURE__ */ t("footer", { style: { background: "#131313" }, children: [
    /* @__PURE__ */ e("div", { className: "max-w-[1280px] mx-auto px-6 lg:px-8 pt-20 pb-14", children: /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5 mb-6", children: [
          /* @__PURE__ */ e(
            "div",
            {
              className: "w-8 h-8 flex items-center justify-center text-white text-xs font-bold",
              style: { background: c },
              children: "SC"
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-[1.1rem] text-white", style: d, children: "SanCurtains" })
        ] }),
        /* @__PURE__ */ e(
          "p",
          {
            className: "text-[13px] leading-relaxed mb-6",
            style: { ...s, color: "rgba(255,255,255,0.32)" },
            children: "Premium window dressing for the world's finest interiors. Crafted with care. Installed with precision."
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex gap-3", children: vt.map((a, r) => /* @__PURE__ */ e(
          "button",
          {
            className: "w-9 h-9 flex items-center justify-center border transition-colors duration-200 hover:border-white/30",
            style: { borderColor: "rgba(255,255,255,0.1)" },
            "aria-label": "Social link",
            children: /* @__PURE__ */ e(a, { size: 13, style: { color: "rgba(255,255,255,0.38)" } })
          },
          r
        )) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e(
          "h4",
          {
            className: "text-[10px] tracking-[0.22em] uppercase mb-5 text-white",
            style: s,
            children: "Collections"
          }
        ),
        ["Sheer Curtains", "Blackout Curtains", "Motorized Curtains", "Roman Blinds", "Roller Blinds", "Wooden Blinds"].map(
          (a) => /* @__PURE__ */ e(
            "a",
            {
              href: "#",
              className: "block text-[13px] mb-3 transition-colors duration-200 hover:text-white/60",
              style: { ...s, color: "rgba(255,255,255,0.32)" },
              children: a
            },
            a
          )
        )
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e(
          "h4",
          {
            className: "text-[10px] tracking-[0.22em] uppercase mb-5 text-white",
            style: s,
            children: "Company"
          }
        ),
        ["About Us", "Our Process", "Featured Projects", "Blog & Insights", "Careers", "Contact Us"].map((a) => /* @__PURE__ */ e(
          "a",
          {
            href: "#",
            className: "block text-[13px] mb-3 transition-colors duration-200 hover:text-white/60",
            style: { ...s, color: "rgba(255,255,255,0.32)" },
            children: a
          },
          a
        ))
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e(
          "h4",
          {
            className: "text-[10px] tracking-[0.22em] uppercase mb-5 text-white",
            style: s,
            children: "Stay Inspired"
          }
        ),
        /* @__PURE__ */ e(
          "p",
          {
            className: "text-[13px] leading-relaxed mb-4",
            style: { ...s, color: "rgba(255,255,255,0.32)" },
            children: "Interior ideas and exclusive offers, directly to your inbox."
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex mb-8", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "email",
              placeholder: "Your email address",
              className: "flex-1 px-4 py-3 text-[13px] bg-white/5 border text-white min-w-0 focus:outline-none focus:bg-white/8 transition-colors",
              style: {
                ...s,
                borderColor: "rgba(255,255,255,0.1)",
                color: "white"
              }
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              className: "px-4 py-3 flex-shrink-0 flex items-center justify-center",
              style: { background: c },
              "aria-label": "Subscribe",
              children: /* @__PURE__ */ e(z, { size: 14, className: "text-white" })
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "space-y-3", children: [
          { Icon: V, text: "+971 4 000 0000" },
          { Icon: W, text: "hello@sancurtains.com" },
          { Icon: ke, text: "Business Bay, Dubai, UAE" }
        ].map(({ Icon: a, text: r }) => /* @__PURE__ */ t("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ e(a, { size: 13, className: "flex-shrink-0 mt-0.5", style: { color: c } }),
          /* @__PURE__ */ e(
            "span",
            {
              className: "text-[13px]",
              style: { ...s, color: "rgba(255,255,255,0.32)" },
              children: r
            }
          )
        ] }, r)) })
      ] })
    ] }) }),
    /* @__PURE__ */ e(
      "div",
      {
        className: "border-t",
        style: { borderColor: "rgba(255,255,255,0.06)" },
        children: /* @__PURE__ */ t("div", { className: "max-w-[1280px] mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4", children: [
          /* @__PURE__ */ e(
            "p",
            {
              className: "text-[12px]",
              style: { ...s, color: "rgba(255,255,255,0.22)" },
              children: "© 2025 SanCurtains. All rights reserved."
            }
          ),
          /* @__PURE__ */ e("div", { className: "flex gap-6", children: ["Privacy Policy", "Terms of Service", "Cookie Policy"].map((a) => /* @__PURE__ */ e(
            "a",
            {
              href: "#",
              className: "text-[12px] transition-colors duration-200 hover:text-white/40",
              style: { ...s, color: "rgba(255,255,255,0.22)" },
              children: a
            },
            a
          )) })
        ] })
      }
    )
  ] });
}
function Nt() {
  const [a, r] = b(!1);
  return /* @__PURE__ */ e(Y.Provider, { value: () => r(!0), children: /* @__PURE__ */ t("div", { style: { background: C }, children: [
    /* @__PURE__ */ e("style", { children: `
          @keyframes scMarquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes scFloat {
            from { transform: translateY(0px); }
            to   { transform: translateY(-9px); }
          }
          ::-webkit-scrollbar { display: none; }
          * { scrollbar-width: none; }
        ` }),
    /* @__PURE__ */ e(Je, { open: a, onClose: () => r(!1) }),
    /* @__PURE__ */ e(Ze, {}),
    /* @__PURE__ */ e(Qe, {}),
    /* @__PURE__ */ e(tt, {}),
    /* @__PURE__ */ e(rt, {}),
    /* @__PURE__ */ e(lt, {}),
    /* @__PURE__ */ e(it, {}),
    /* @__PURE__ */ e(ct, {}),
    /* @__PURE__ */ e(dt, {}),
    /* @__PURE__ */ e(mt, {}),
    /* @__PURE__ */ e(ht, {}),
    /* @__PURE__ */ e(pt, {}),
    /* @__PURE__ */ e(xt, {}),
    /* @__PURE__ */ e(bt, {}),
    /* @__PURE__ */ e(ft, {}),
    /* @__PURE__ */ e(wt, {})
  ] }) });
}
const kt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nt
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ct as Code0_8
};
