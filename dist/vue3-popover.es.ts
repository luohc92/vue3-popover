import { defineComponent as E, ref as h, watch as I, nextTick as V, computed as y, onMounted as x, onUnmounted as P, openBlock as c, createElementBlock as f, createElementVNode as g, renderSlot as b, createBlock as L, Teleport as O, createVNode as A, Transition as D, withCtx as U, normalizeClass as C, normalizeStyle as R, toDisplayString as B, createCommentVNode as $, createTextVNode as j } from "vue";
const q = { class: "popover-wrapper" }, F = { class: "popover-content" }, G = {
  key: 0,
  class: "popover-title"
}, H = /* @__PURE__ */ E({
  __name: "popover",
  props: {
    placement: { default: "bottom" },
    width: { default: 150 },
    title: { default: "" },
    content: { default: "" },
    zIndex: { default: 1999 },
    trigger: { default: "click" },
    popperClass: { default: "" },
    appendTo: { default: "body" },
    darkMode: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["open", "close"],
  setup(d, { emit: p }) {
    const r = d, v = (o) => typeof o == "number", i = h(!1), k = () => {
      i.value = !0, m("open");
    }, u = () => {
      i.value = !1, m("close");
    }, w = [
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end",
      "right",
      "right-start",
      "right-end"
    ], n = h(), s = h(), t = h(), m = p;
    I(
      () => i.value,
      (o) => {
        !o || V(() => {
          if (!n.value) {
            t.value = null;
            return;
          }
          t.value = n.value.getBoundingClientRect();
        });
      }
    );
    const T = () => {
      r.trigger !== "click" || r.disabled || (i.value ? u() : k());
    }, z = () => {
      r.trigger !== "hover" || r.disabled || k();
    }, M = () => {
      r.trigger !== "hover" || r.disabled || u();
    }, N = y(() => {
      if (!s.value || !t.value)
        return {};
      const o = s.value.getBoundingClientRect();
      let e = 0, a = 0, l = r.placement;
      switch (w.includes(l) || (l = "bottom"), l) {
        case "left":
          e = t.value.width - 5, a = t.value.height / 2 - 5;
          break;
        case "left-start":
          e = t.value.width - 5, a = o.height / 2 - 5;
          break;
        case "left-end":
          e = t.value.width - 5, a = t.value.height - o.height / 2 - 5;
          break;
        case "right":
          e = -5, a = t.value.height / 2 - 5;
          break;
        case "right-start":
          e = -5, a = o.height / 2 - 5;
          break;
        case "right-end":
          e = -5, a = t.value.height - o.height / 2 - 5;
          break;
        case "top":
          e = t.value.width / 2 - 5, a = t.value.height - 5;
          break;
        case "top-start":
          e = o.width / 2 - 5, a = t.value.height - 5;
          break;
        case "top-end":
          e = t.value.width - o.width / 2 - 5, a = t.value.height - 5;
          break;
        case "bottom":
          e = t.value.width / 2 - 5, a = -5;
          break;
        case "bottom-start":
          e = o.width / 2 - 5, a = -5;
          break;
        case "bottom-end":
          e = t.value.width - o.width / 2 - 5, a = -5;
          break;
      }
      return a > t.value.height && (a = t.value.height - 20), e > t.value.width && (e = t.value.width - 20), { left: `${e}px`, top: `${a}px` };
    }), S = y(() => {
      if (!s.value || !t.value)
        return {};
      let o = r.placement;
      w.includes(o) || (o = "bottom");
      const e = s.value.getBoundingClientRect();
      let a = 0, l = 0;
      switch (o) {
        case "left":
          a = e.top - t.value.height / 2 + e.height / 2, l = e.left - t.value.width - 10;
          break;
        case "left-start":
          a = e.top, l = e.left - t.value.width - 10;
          break;
        case "left-end":
          a = e.top - t.value.height + e.height, l = e.left - t.value.width - 10;
          break;
        case "right":
          a = e.top - t.value.height / 2 + e.height / 2, l = e.left + e.width + 10;
          break;
        case "right-start":
          a = e.top, l = e.left + e.width + 10;
          break;
        case "right-end":
          a = e.top - t.value.height + e.height, l = e.left + e.width + 10;
          break;
        case "top":
          a = e.top - t.value.height - 10, l = e.left - t.value.width / 2 + e.width / 2;
          break;
        case "top-start":
          a = e.top - t.value.height - 10, l = e.left;
          break;
        case "top-end":
          a = e.top - t.value.height - 10, l = e.left + e.width - t.value.width;
          break;
        case "bottom":
          a = e.top + e.height + 10, l = e.left - t.value.width / 2 + e.width / 2;
          break;
        case "bottom-start":
          a = e.top + e.height + 10, l = e.left;
          break;
        case "bottom-end":
          a = e.top + e.height + 10, l = e.left + e.width - t.value.width;
          break;
      }
      return { position: "absolute", top: `${a}px`, left: `${l}px` };
    }), _ = (o) => {
      n.value && !n.value.contains(o.target) && !s.value.contains(o.target) && u();
    };
    return x(() => {
      window.addEventListener("click", _);
    }), P(() => {
      u(), window.removeEventListener("click", _);
    }), (o, e) => (c(), f("div", q, [
      g("span", {
        class: "popover-trigger",
        ref_key: "triggerRef",
        ref: s,
        onClick: T,
        onMouseenter: z,
        onMouseleave: M
      }, [
        b(o.$slots, "reference", {}, void 0, !0)
      ], 544),
      (c(), L(O, { to: o.appendTo }, [
        A(D, { name: "fade" }, {
          default: U(() => [
            i.value ? (c(), f("div", {
              key: 0,
              class: C(["popover", [o.popperClass, { "dark-mode": o.darkMode }]]),
              style: R([{ zIndex: o.zIndex, width: v(r.width) ? r.width + "px" : r.width }, S.value]),
              ref_key: "popoverRef",
              ref: n
            }, [
              g("div", {
                class: C(["popover-arrow", "popover-arrow__" + o.placement]),
                style: R(N.value)
              }, null, 6),
              g("div", F, [
                o.title ? (c(), f("div", G, B(o.title), 1)) : $("", !0),
                o.$slots.default ? b(o.$slots, "default", { key: 2 }, void 0, !0) : b(o.$slots, "default", { key: 1 }, () => [
                  j(B(o.content), 1)
                ], !0)
              ])
            ], 6)) : $("", !0)
          ]),
          _: 3
        })
      ], 8, ["to"]))
    ]));
  }
});
const J = (d, p) => {
  const r = d.__vccOpts || d;
  for (const [v, i] of p)
    r[v] = i;
  return r;
}, Q = /* @__PURE__ */ J(H, [["__scopeId", "data-v-ea753d0c"]]);
export {
  Q as default
};
