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
          <div class="popover-arrow" :class="'popover-arrow__' + currentPlacement" :style="popoverArrowStyle"></div>
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
  offset: {
    type: Number,
    default: 10,
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
  currentPlacement.value = props.placement || "bottom";
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
const triggerRect = ref();
const observer = ref<MutationObserver | null>(null);
const currentPlacement = ref(props.placement || "bottom");
const emits = defineEmits(["open", "close"]);

const checkPosition = () => {
  if (!triggerRef.value || !popoverRect.value) return;

  const triggerRect = triggerRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // 获取当前位置的边界值
  const top = triggerRect.top - popoverRect.value.height - 10;
  const bottom = triggerRect.bottom + 10;
  const left = triggerRect.left - popoverRect.value.width - 10;
  const right = triggerRect.right + 10;

  // 检查水平方向的边界
  const checkHorizontalBoundary = (placement: typeof props.placement): typeof props.placement => {
    if (!placement) return "bottom";
    // 检查是否同时超出多个边界
    const isTopOverflow = triggerRect.top < popoverRect.value.height;
    const isRightOverflow = triggerRect.right + popoverRect.value.width > viewportWidth;
    const isBottomOverflow = triggerRect.bottom + popoverRect.value.height > viewportHeight;
    const isLeftOverflow = triggerRect.left < 0;

    switch (placement) {
      case "top":
        if (isTopOverflow) return "bottom";
        if (isLeftOverflow) return "top-end";
        if (isRightOverflow) return "top-start";
        break;
      case "top-start":
        if (isTopOverflow) return "bottom-start";
        if (isLeftOverflow) return "top-end";
        break;
      case "top-end":
        if (isTopOverflow) return "bottom-end";
        if (isRightOverflow) return "top-start";
        break;
      case "bottom":
        if (isBottomOverflow) return "top";
        if (isLeftOverflow) return "bottom-end";
        if (isRightOverflow) return "bottom-start";
        break;
      case "bottom-start":
        if (isBottomOverflow) return "top-start";
        if (isLeftOverflow || isRightOverflow) return "bottom-end";
        break;
      case "bottom-end":
        if (isBottomOverflow) return "top-end";
        if (isLeftOverflow) return "bottom-start";
        break;
      case "left":
        if (isLeftOverflow) return "right";
        if (isTopOverflow) return "left-start";
        if (isBottomOverflow) return "left-end";
        break;
      case "left-start":
        if (isLeftOverflow) return "right-start";
        if (isBottomOverflow) return "top-start";
        break;
      case "left-end":
        if (isLeftOverflow) return "right-end";
        if (isTopOverflow) return "left-start";
        break;
      case "right":
        if (isRightOverflow) return "left";
        if (isTopOverflow) return "right-start";
        if (isBottomOverflow) return "right-end";
        break;
      case "right-start":
        if (isRightOverflow) return "left-start";
        if (isBottomOverflow) return "top-start";
        break;
      case "right-end":
        if (isRightOverflow) return "left-end";
        if (isTopOverflow) return "right-start";
        break;
    }
    return placement;
  };

  // 根据当前placement检查是否需要切换
  switch (currentPlacement.value) {
    case "top":
      if (top < 0) currentPlacement.value = "bottom";
      else currentPlacement.value = checkHorizontalBoundary(currentPlacement.value);
      break;
    case "bottom":
      if (bottom + popoverRect.value.height > viewportHeight) currentPlacement.value = "top";
      else currentPlacement.value = checkHorizontalBoundary(currentPlacement.value);
      break;
    case "left":
      // 先检查边界情况
      const leftNewPlacement = checkHorizontalBoundary(currentPlacement.value);
      if (leftNewPlacement !== currentPlacement.value) {
        currentPlacement.value = leftNewPlacement;
      } else if (left < 0) {
        currentPlacement.value = "right";
      }
      break;
    case "right":
      // 先检查边界情况
      const rightNewPlacement = checkHorizontalBoundary(currentPlacement.value);
      if (rightNewPlacement !== currentPlacement.value) {
        currentPlacement.value = rightNewPlacement;
      } else if (right + popoverRect.value.width > viewportWidth) {
        currentPlacement.value = "left";
      }
      break;
    case "top-start":
      if (top < 0) currentPlacement.value = "bottom-start";
      else currentPlacement.value = checkHorizontalBoundary(currentPlacement.value);
      break;
    case "top-end":
      if (top < 0) currentPlacement.value = "bottom-end";
      else currentPlacement.value = checkHorizontalBoundary(currentPlacement.value);
      break;
    case "bottom-start":
      if (bottom + popoverRect.value.height > viewportHeight) currentPlacement.value = "top-start";
      else currentPlacement.value = checkHorizontalBoundary(currentPlacement.value);
      break;
    case "bottom-end":
      if (bottom + popoverRect.value.height > viewportHeight) currentPlacement.value = "top-end";
      else currentPlacement.value = checkHorizontalBoundary(currentPlacement.value);
      break;
    case "left-start":
      if (left < 0) currentPlacement.value = "right-start";
      else currentPlacement.value = checkHorizontalBoundary(currentPlacement.value);
      break;
    case "left-end":
      if (left < 0) currentPlacement.value = "right-end";
      else currentPlacement.value = checkHorizontalBoundary(currentPlacement.value);
      break;
    case "right-start":
      if (right + popoverRect.value.width > viewportWidth) currentPlacement.value = "left-start";
      else currentPlacement.value = checkHorizontalBoundary(currentPlacement.value);
      break;
    case "right-end":
      // 先检查边界情况
      const rightEndNewPlacement = checkHorizontalBoundary(currentPlacement.value);
      if (rightEndNewPlacement !== currentPlacement.value) {
        currentPlacement.value = rightEndNewPlacement;
      } else if (right + popoverRect.value.width > viewportWidth) {
        currentPlacement.value = "left-end";
      }
      break;
  }
};

const updatePosition = () => {
  if (triggerRef.value) {
    triggerRect.value = triggerRef.value.getBoundingClientRect();
  }
  if (visible.value) {
    if (popoverRef.value) {
      popoverRect.value = popoverRef.value.getBoundingClientRect();
      checkPosition();
    }
  }
};

// 添加滚动事件处理函数
const handleScroll = () => {
  updatePosition();
};

// 获取所有可滚动的父元素
const getScrollParents = (element: HTMLElement): HTMLElement[] => {
  const parents: HTMLElement[] = [];
  let parent = element.parentElement;

  while (parent) {
    const { overflow, overflowX, overflowY } = window.getComputedStyle(parent);
    if (/(auto|scroll|overlay)/.test(overflow + overflowX + overflowY)) {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }

  return parents;
};

// 添加滚动监听器
const addScrollListeners = () => {
  if (!triggerRef.value) return;

  const scrollParents = getScrollParents(triggerRef.value);
  scrollParents.forEach((parent) => {
    parent.addEventListener("scroll", handleScroll, true);
  });
};

// 移除滚动监听器
const removeScrollListeners = () => {
  if (!triggerRef.value) return;

  const scrollParents = getScrollParents(triggerRef.value);
  scrollParents.forEach((parent) => {
    parent.removeEventListener("scroll", handleScroll, true);
  });
};

watch(
  () => props.placement,
  (newVal) => {
    if (newVal && allPlacement.includes(newVal)) {
      currentPlacement.value = newVal;
    }
  },
  { immediate: true }
);

watch(
  () => visible.value,
  (val) => {
    if (!val) return;
    nextTick(() => {
      updatePosition();
      addScrollListeners();
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
  let left = 0;
  let top = 0;
  let placement = currentPlacement.value;
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
      top = triggerRect.value.height / 2 - 5;
      break;
    case "left-end":
      left = popoverRect.value.width - 5;
      top = popoverRect.value.height - triggerRect.value.height / 2 - 5;
      break;
    case "right":
      left = -5;
      top = popoverRect.value.height / 2 - 5;
      break;
    case "right-start":
      left = -5;
      top = triggerRect.value.height / 2 - 5;
      break;
    case "right-end":
      left = -5;
      top = popoverRect.value.height - triggerRect.value.height / 2 - 5;
      break;
    case "top":
      left = popoverRect.value.width / 2 - 5;
      top = popoverRect.value.height - 5;
      break;
    case "top-start":
      left = triggerRect.value.width / 2 - 5;
      top = popoverRect.value.height - 5;
      break;
    case "top-end":
      left = popoverRect.value.width - triggerRect.value.width / 2 - 5;
      top = popoverRect.value.height - 5;
      break;
    case "bottom":
      left = popoverRect.value.width / 2 - 5;
      top = -5;
      break;
    case "bottom-start":
      left = triggerRect.value.width / 2 - 5;
      top = -5;
      break;
    case "bottom-end":
      left = popoverRect.value.width - triggerRect.value.width / 2 - 5;
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
  let placement = currentPlacement.value;
  if (!allPlacement.includes(placement)) {
    placement = "bottom";
  }
  let top = 0,
    left = 0;
  switch (placement) {
    case "left":
      top = triggerRect.value.top - popoverRect.value.height / 2 + triggerRect.value.height / 2;
      left = triggerRect.value.left - popoverRect.value.width - props.offset;
      break;
    case "left-start":
      top = triggerRect.value.top;
      left = triggerRect.value.left - popoverRect.value.width - props.offset;
      break;
    case "left-end":
      top = triggerRect.value.top - popoverRect.value.height + triggerRect.value.height;
      left = triggerRect.value.left - popoverRect.value.width - props.offset;
      break;
    case "right":
      top = triggerRect.value.top - popoverRect.value.height / 2 + triggerRect.value.height / 2;
      left = triggerRect.value.left + triggerRect.value.width + props.offset;
      break;
    case "right-start":
      top = triggerRect.value.top;
      left = triggerRect.value.left + triggerRect.value.width + props.offset;
      break;
    case "right-end":
      top = triggerRect.value.top - popoverRect.value.height + triggerRect.value.height;
      left = triggerRect.value.left + triggerRect.value.width + props.offset;
      break;
    case "top":
      top = triggerRect.value.top - popoverRect.value.height - props.offset;
      left = triggerRect.value.left - popoverRect.value.width / 2 + triggerRect.value.width / 2;
      break;
    case "top-start":
      top = triggerRect.value.top - popoverRect.value.height - props.offset;
      left = triggerRect.value.left;
      break;
    case "top-end":
      top = triggerRect.value.top - popoverRect.value.height - props.offset;
      left = triggerRect.value.left + triggerRect.value.width - popoverRect.value.width;
      break;
    case "bottom":
      top = triggerRect.value.top + triggerRect.value.height + props.offset;
      left = triggerRect.value.left - popoverRect.value.width / 2 + triggerRect.value.width / 2;
      break;
    case "bottom-start":
      top = triggerRect.value.top + triggerRect.value.height + props.offset;
      left = triggerRect.value.left;
      break;
    case "bottom-end":
      top = triggerRect.value.top + triggerRect.value.height + props.offset;
      left = triggerRect.value.left + triggerRect.value.width - popoverRect.value.width;
      break;
  }
  return { top: `${top}px`, left: `${left}px` };
});
const updateRect = () => {
  if (triggerRect.value) {
    triggerRect.value = triggerRef.value.getBoundingClientRect();
  }
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
  window.addEventListener("resize", updateRect);
  window.addEventListener("click", handleClickOutside);

  if (triggerRef.value) {
    observer.value = new MutationObserver(() => {
      if (visible.value) {
        updatePosition();
      }
    });
    observer.value.observe(triggerRef.value, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
});

onUnmounted(() => {
  visible.value = false;
  mouseIsInPopover.value = false;
  window.removeEventListener("resize", updateRect);
  window.removeEventListener("click", handleClickOutside);
  removeScrollListeners(); // 移除所有滚动监听

  if (observer.value) {
    observer.value.disconnect();
    observer.value = null;
  }
});
defineExpose({
  open,
  close,
});
</script>

<style scoped lang="scss">
span.popover-trigger {
  display: inline-block;
}

.popoverfade-enter-active {
  transition: opacity 0.5s ease;
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
  position: fixed;
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
