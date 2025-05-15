<template>
  <div class="popover-wrapper">
    <span
      class="popover-trigger"
      ref="triggerRef"
      @click="togglePopover"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <slot name="reference"></slot>
    </span>
    <Teleport :to="appendTo">
      <Transition name="popoverfade">
        <div
          class="popover"
          @mouseleave="mouseleavePopover"
          @mouseenter="mouseenterPopover"
          :class="[popperClass, { 'dark-mode': darkMode }]"
          v-if="visible"
          :style="[{ zIndex: zIndex, width: isNumber(props.width) ? props.width + 'px' : props.width }, popoverStyle]"
          ref="popoverRef"
        >
          <div class="popover-arrow" :class="'popover-arrow__' + placement" :style="popoverArrowStyle"></div>
          <div class="popover-content">
            <div v-if="title" class="popover-title">{{ title }}</div>
            <slot v-if="!$slots.default">
              {{ content }}
            </slot>
            <slot v-else></slot>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, nextTick, watch, ref, PropType } from "vue";
const props = defineProps({
  placement: String as PropType<
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end"
  >,
  width: {
    type: [String, Number],
    default: 200,
  },
  title: String,
  content: String,
  zIndex: {
    type: Number,
    default: 1999,
  },
  trigger: {
    type: String as PropType<"click" | "hover">,
    default: "click",
  },
  popperClass: String,
  appendTo: {
    type: String,
    default: "body",
  },
  darkMode: Boolean,
  disabled: Boolean,
});
const isNumber = (val: number | string) => {
  return typeof val === "number";
};
const visible = ref(false);
const open = () => {
  visible.value = true;
  emits("open");
};
const close = () => {
  visible.value = false;
  mouseIsInPopover.value = false;
  emits("close");
};
const allPlacement = [
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
  "right-end",
];
const popoverRef = ref();
const triggerRef = ref();
const popoverRect = ref();
const emits = defineEmits(["open", "close"]);
watch(
  () => visible.value,
  (val) => {
    if (!val) return;
    nextTick(() => {
      if (!popoverRef.value) {
        popoverRect.value = null;
        return;
      }
      popoverRect.value = popoverRef.value.getBoundingClientRect();
    });
  }
);
const togglePopover = () => {
  if (props.trigger !== "click" || props.disabled) return;
  if (visible.value) {
    close();
  } else {
    open();
  }
};
const closePopoverTimer = ref();
const mouseenter = () => {
  if (props.trigger !== "hover" || props.disabled) return;
  if (closePopoverTimer.value) clearTimeout(closePopoverTimer.value);
  mouseIsInPopover.value = false;
  open();
};
const mouseIsInPopover = ref(false);
const mouseleave = () => {
  if (props.trigger !== "hover" || props.disabled) return;
  if (closePopoverTimer.value) clearTimeout(closePopoverTimer.value);
  closePopoverTimer.value = setTimeout(() => {
    if (mouseIsInPopover.value) {
      return;
    }
    close();
  }, 300);
};
const mouseleavePopover = () => {
  if (props.trigger !== "hover" || props.disabled) return;
  mouseIsInPopover.value = false;
  if (closePopoverTimer.value) clearTimeout(closePopoverTimer.value);
  closePopoverTimer.value = setTimeout(() => {
    if (mouseIsInPopover.value) {
      return;
    }
    close();
  }, 300);
};
const mouseenterPopover = () => {
  mouseIsInPopover.value = true;
  if (closePopoverTimer.value) clearTimeout(closePopoverTimer.value);
};
const popoverArrowStyle = computed(() => {
  if (!triggerRef.value || !popoverRect.value) return {};
  const triggerRect = triggerRef.value.getBoundingClientRect();
  let left = 0;
  let top = 0;
  let placement = props.placement || "bottom";
  if (!allPlacement.includes(placement)) {
    placement = "bottom";
  }
  switch (placement) {
    case "left":
      left = popoverRect.value.width - 5;
      top = popoverRect.value.height / 2 - 5;
      break;
    case "left-start":
      left = popoverRect.value.width - 5;
      top = triggerRect.height / 2 - 5;
      break;
    case "left-end":
      left = popoverRect.value.width - 5;
      top = popoverRect.value.height - triggerRect.height / 2 - 5;
      break;
    case "right":
      left = -5;
      top = popoverRect.value.height / 2 - 5;
      break;
    case "right-start":
      left = -5;
      top = triggerRect.height / 2 - 5;
      break;
    case "right-end":
      left = -5;
      top = popoverRect.value.height - triggerRect.height / 2 - 5;
      break;
    case "top":
      left = popoverRect.value.width / 2 - 5;
      top = popoverRect.value.height - 5;
      break;
    case "top-start":
      left = triggerRect.width / 2 - 5;
      top = popoverRect.value.height - 5;
      break;
    case "top-end":
      left = popoverRect.value.width - triggerRect.width / 2 - 5;
      top = popoverRect.value.height - 5;
      break;
    case "bottom":
      left = popoverRect.value.width / 2 - 5;
      top = -5;
      break;
    case "bottom-start":
      left = triggerRect.width / 2 - 5;
      top = -5;
      break;
    case "bottom-end":
      left = popoverRect.value.width - triggerRect.width / 2 - 5;
      top = -5;
      break;
  }
  if (top > popoverRect.value.height) {
    top = popoverRect.value.height - 20;
  }
  if (left > popoverRect.value.width) {
    left = popoverRect.value.width - 20;
  }
  return { left: `${left}px`, top: `${top}px` };
});
const popoverStyle = computed(() => {
  if (!triggerRef.value || !popoverRect.value) return {} as any;
  let placement = props.placement || "bottom";
  if (!allPlacement.includes(placement)) {
    placement = "bottom";
  }
  const triggerRect = triggerRef.value.getBoundingClientRect();
  let top = 0,
    left = 0;

  switch (placement) {
    case "left":
      top = triggerRect.top - popoverRect.value.height / 2 + triggerRect.height / 2 + window.scrollY;
      left = triggerRect.left - popoverRect.value.width - 10 + window.scrollX;
      break;
    case "left-start":
      top = triggerRect.top + window.scrollY;
      left = triggerRect.left - popoverRect.value.width - 10 + window.scrollX;
      break;
    case "left-end":
      top = triggerRect.top - popoverRect.value.height + triggerRect.height + window.scrollY;
      left = triggerRect.left - popoverRect.value.width - 10 + window.scrollX;
      break;
    case "right":
      top = triggerRect.top - popoverRect.value.height / 2 + triggerRect.height / 2 + window.scrollY;
      left = triggerRect.left + triggerRect.width + 10 + window.scrollX;
      break;
    case "right-start":
      top = triggerRect.top + window.scrollY;
      left = triggerRect.left + triggerRect.width + 10 + window.scrollX;
      break;
    case "right-end":
      top = triggerRect.top - popoverRect.value.height + triggerRect.height + window.scrollY;
      left = triggerRect.left + triggerRect.width + 10 + window.scrollX;
      break;
    case "top":
      top = triggerRect.top - popoverRect.value.height - 10 + window.scrollY;
      left = triggerRect.left - popoverRect.value.width / 2 + triggerRect.width / 2 + window.scrollX;
      break;
    case "top-start":
      top = triggerRect.top - popoverRect.value.height - 10 + window.scrollY;
      left = triggerRect.left + window.scrollX;
      break;
    case "top-end":
      top = triggerRect.top - popoverRect.value.height - 10 + window.scrollY;
      left = triggerRect.left + triggerRect.width - popoverRect.value.width + window.scrollX;
      break;
    case "bottom":
      top = triggerRect.top + triggerRect.height + 10 + window.scrollY;
      left = triggerRect.left - popoverRect.value.width / 2 + triggerRect.width / 2 + window.scrollX;
      break;
    case "bottom-start":
      top = triggerRect.top + triggerRect.height + 10 + window.scrollY;
      left = triggerRect.left + window.scrollX;
      break;
    case "bottom-end":
      top = triggerRect.top + triggerRect.height + 10 + window.scrollY;
      left = triggerRect.left + triggerRect.width - popoverRect.value.width + window.scrollX;
      break;
  }
  return { position: "absolute", top: `${top}px`, left: `${left}px` };
});
const updatePopoverRect = () => {
  if (popoverRef.value) {
    popoverRect.value = popoverRef.value.getBoundingClientRect();
  }
};
const handleClickOutside = (event: Event) => {
  if (popoverRef.value && !popoverRef.value.contains(event.target) && !triggerRef.value.contains(event.target)) {
    close();
  }
};
onMounted(() => {
  window.addEventListener("resize", updatePopoverRect);
  window.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  visible.value = false;
  mouseIsInPopover.value = false;
  window.removeEventListener("resize", updatePopoverRect);
  window.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
span.popover-trigger {
  display: inline-block;
}
.popoverfade-enter-active,
.popoverfade-leave-active {
  transition: opacity 0.3s ease;
}
.popoverfade-enter-from,
.popoverfade-leave-to {
  opacity: 0;
}
.popoverfade-leave-active {
  transition: opacity 0.3s ease;
}
.popoverfade-leave-to {
  opacity: 0;
}
.popover {
  --popover-title-color: #333333;
  --popover-content-color: #666666;
  --popover-background-color: #ffffff;
  --popover-border-color: #e4e7ed;
  --popover-shadow-color: rgba(0, 0, 0, 0.12);
  --border-radius: 5px;
  --popover-content-padding: 10px;

  --popover-dark-title-color: #ffffff;
  --popover-dark-content-color: #cccccc;
  --popover-dark-background-color: #1d1e1f;
  --popover-dark-border-color: #414243;
  --popover-dark-shadow-color: rgba(0, 0, 0, 0.12);

  &.dark-mode {
    --popover-title-color: var(--popover-dark-title-color);
    --popover-content-color: var(--popover-dark-content-color);
    --popover-background-color: var(--popover-dark-background-color);
    --popover-border-color: var(--popover-dark-border-color);
    --popover-shadow-color: var(--popover-dark-shadow-color);
  }

  .popover-content {
    background: var(--popover-background-color);
    padding: var(--popover-content-padding);
    border-radius: var(--border-radius);
    box-shadow: 0px 0px 12px var(--popover-shadow-color);
    border: 1px solid var(--popover-border-color);
  }

  .popover-arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    z-index: 1;

    &:before {
      position: absolute;
      width: 10px;
      height: 10px;
      z-index: 1;
      content: " ";
      transform: rotate(45deg);
      box-sizing: border-box;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      border: 1px solid var(--popover-border-color);
      background: var(--popover-background-color);
    }

    &.popover-arrow__left,
    &.popover-arrow__left-start,
    &.popover-arrow__left-end {
      &:before {
        transform: rotate(135deg);
      }
    }

    &.popover-arrow__right,
    &.popover-arrow__right-start,
    &.popover-arrow__right-end {
      &:before {
        transform: rotate(-45deg);
      }
    }

    &.popover-arrow__top,
    &.popover-arrow__top-start,
    &.popover-arrow__top-end {
      &:before {
        transform: rotate(225deg);
      }
    }
  }

  .popover-title {
    color: var(--popover-title-color);
    margin-bottom: 10px;
  }

  .popover-content {
    color: var(--popover-content-color);
  }
}
</style>
