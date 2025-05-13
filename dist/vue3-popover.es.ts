import { defineComponent as B, ref as d, watch as z, nextTick as N, computed as b, onMounted as S, onUnmounted as E, openBlock as v, createElementBlock as p, createElementVNode as f, renderSlot as g, createBlock as I, Teleport as T, createVNode as V, Transition as M, withCtx as P, normalizeStyle as k, normalizeClass as L, toDisplayString as m, createCommentVNode as _, createTextVNode as O } from "vue";
const A = { class: "popover-wrapper" }, D = { class: "popover-content" }, U = {
  key: 0,
  class: "popover-title"
}, j = /* @__PURE__ */ B({
  __name: "popover",
  props: {
    placement: { default: "bottom" },
    width: { default: 150 },
    title: { default: "" },
    content: { default: "" },
    zIndex: { default: 1999 },
    trigger: { default: "click" }
  },
  setup(h) {
    const r = h, u = (a) => typeof a == "number", i = d(!1), c = [
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
    ], s = d(), n = d(), t = d();
    z(
      () => i.value,
      (a) => {
        !a || N(() => {
          if (!s.value) {
            t.value = null;
            return;
          }
          t.value = s.value.getBoundingClientRect();
        });
      }
    );
    const y = () => {
      r.trigger === "click" && (i.value = !i.value);
    }, R = () => {
      r.trigger === "hover" && (i.value = !0);
    }, C = () => {
      r.trigger === "hover" && (i.value = !1);
    }, $ = b(() => {
      if (!n.value || !t.value)
        return {};
      const a = n.value.getBoundingClientRect();
      let e = 0, o = 0, l = r.placement;
      switch (c.includes(l) || (l = "bottom"), l) {
        case "left":
          e = t.value.width - 5, o = t.value.height / 2 - 5;
          break;
        case "left-start":
          e = t.value.width - 5, o = a.height / 2 - 5;
          break;
        case "left-end":
          e = t.value.width - 5, o = t.value.height - a.height / 2 - 5;
          break;
        case "right":
          e = -5, o = t.value.height / 2 - 5;
          break;
        case "right-start":
          e = -5, o = a.height / 2 - 5;
          break;
        case "right-end":
          e = -5, o = t.value.height - a.height / 2 - 5;
          break;
        case "top":
          e = t.value.width / 2 - 5, o = t.value.height - 5;
          break;
        case "top-start":
          e = a.width / 2 - 5, o = t.value.height - 5;
          break;
        case "top-end":
          e = t.value.width - a.width / 2 - 5, o = t.value.height - 5;
          break;
        case "bottom":
          e = t.value.width / 2 - 5, o = -5;
          break;
        case "bottom-start":
          e = a.width / 2 - 5, o = -5;
          break;
        case "bottom-end":
          e = t.value.width - a.width / 2 - 5, o = -5;
          break;
      }
      return o > t.value.height && (o = t.value.height - 20), e > t.value.width && (e = t.value.width - 20), { left: `${e}px`, top: `${o}px` };
    }), x = b(() => {
      if (!n.value || !t.value)
        return {};
      let a = r.placement;
      c.includes(a) || (a = "bottom");
      const e = n.value.getBoundingClientRect();
      let o = 0, l = 0;
      switch (a) {
        case "left":
          o = e.top - t.value.height / 2 + e.height / 2, l = e.left - t.value.width - 10;
          break;
        case "left-start":
          o = e.top, l = e.left - t.value.width - 10;
          break;
        case "left-end":
          o = e.top - t.value.height + e.height, l = e.left - t.value.width - 10;
          break;
        case "right":
          o = e.top - t.value.height / 2 + e.height / 2, l = e.left + e.width + 10;
          break;
        case "right-start":
          o = e.top, l = e.left + e.width + 10;
          break;
        case "right-end":
          o = e.top - t.value.height + e.height, l = e.left + e.width + 10;
          break;
        case "top":
          o = e.top - t.value.height - 10, l = e.left - t.value.width / 2 + e.width / 2;
          break;
        case "top-start":
          o = e.top - t.value.height - 10, l = e.left;
          break;
        case "top-end":
          o = e.top - t.value.height - 10, l = e.left + e.width - t.value.width;
          break;
        case "bottom":
          o = e.top + e.height + 10, l = e.left - t.value.width / 2 + e.width / 2;
          break;
        case "bottom-start":
          o = e.top + e.height + 10, l = e.left;
          break;
        case "bottom-end":
          o = e.top + e.height + 10, l = e.left + e.width - t.value.width;
          break;
      }
      return { position: "absolute", top: `${o}px`, left: `${l}px` };
    }), w = (a) => {
      s.value && !s.value.contains(a.target) && !n.value.contains(a.target) && (i.value = !1);
    };
    return S(() => {
      window.addEventListener("click", w);
    }), E(() => {
      i.value = !1, window.removeEventListener("click", w);
    }), (a, e) => (v(), p("div", A, [
      f("span", {
        class: "popover-trigger",
        ref_key: "triggerRef",
        ref: n,
        onClick: y,
        onMouseenter: R,
        onMouseleave: C
      }, [
        g(a.$slots, "reference", {}, void 0, !0)
      ], 544),
      (v(), I(T, { to: "body" }, [
        V(M, { name: "fade" }, {
          default: P(() => [
            i.value ? (v(), p("div", {
              key: 0,
              class: "popover",
              style: k([{ zIndex: a.zIndex, width: u(r.width) ? r.width + "px" : r.width }, x.value]),
              ref_key: "popoverRef",
              ref: s
            }, [
              f("div", {
                class: L(["popover-arrow", "popover-arrow__" + a.placement]),
                style: k($.value)
              }, null, 6),
              f("div", D, [
                a.title ? (v(), p("div", U, m(a.title), 1)) : _("", !0),
                a.$slots.default ? g(a.$slots, "default", { key: 2 }, void 0, !0) : g(a.$slots, "default", { key: 1 }, () => [
                  O(m(a.content), 1)
                ], !0)
              ])
            ], 4)) : _("", !0)
          ]),
          _: 3
        })
      ]))
    ]));
  }
});
const q = (h, r) => {
  const u = h.__vccOpts || h;
  for (const [i, c] of r)
    u[i] = c;
  return u;
}, G = /* @__PURE__ */ q(j, [["__scopeId", "data-v-db121eef"]]);
export {
  G as default
};
