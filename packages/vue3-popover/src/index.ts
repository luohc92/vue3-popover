import { App } from "vue";
import Popover from "./components/Popover.vue";

// 命名导出组件
export { Popover };

// 默认导出（用于全局注册）
const Vue3Popover = {
  install: (app: App) => {
    // 注册为全局组件
    app.component("Popover", Popover);
  },
};

export default Vue3Popover;
