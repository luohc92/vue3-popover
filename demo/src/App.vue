<template>
  <div>
    <div class="popover-base-box">
      <div class="row center">
        <Popover
          class="box-item"
          :darkMode="theme === 'dark'"
          :trigger="trigger"
          title="Title"
          content="Top Start"
          placement="top-start"
          popperClass="popperClass"
          @open="handleOpen"
          @close="handleClose"
        >
          <template #reference>
            <el-button>top-start</el-button>
          </template>
        </Popover>
        <Popover
          class="box-item"
          :darkMode="theme === 'dark'"
          :trigger="trigger"
          title="Title"
          content="Top Center"
          placement="top"
        >
          <template #reference>
            <el-button>top</el-button>
          </template>
        </Popover>
        <Popover
          class="box-item"
          :darkMode="theme === 'dark'"
          :trigger="trigger"
          title="Title"
          content="Top End"
          placement="top-end"
        >
          <template #reference>
            <el-button>top-end</el-button>
          </template>
        </Popover>
      </div>
      <div class="row">
        <Popover
          class="box-item"
          :darkMode="theme === 'dark'"
          :trigger="trigger"
          title="Title"
          content="Left Start"
          placement="left-start"
        >
          <template #reference>
            <el-button>left-start</el-button>
          </template>
        </Popover>
        <Popover
          class="box-item"
          :darkMode="theme === 'dark'"
          :trigger="trigger"
          title="Title"
          content="Right Top"
          placement="right-start"
        >
          <template #reference>
            <el-button>right-start</el-button>
          </template>
        </Popover>
      </div>
      <div class="row">
        <Popover
          class="box-item"
          :darkMode="theme === 'dark'"
          :trigger="trigger"
          title="Title"
          content="Left Center"
          placement="left"
        >
          <template #reference>
            <el-button class="mt-3 mb-3">left</el-button>
          </template>
        </Popover>
        <Popover
          class="box-item"
          :darkMode="theme === 'dark'"
          :trigger="trigger"
          title="Title"
          content="Right Center"
          placement="right"
        >
          <template #reference>
            <el-button>right</el-button>
          </template>
        </Popover>
      </div>
      <div class="row">
        <Popover
          class="box-item"
          :darkMode="theme === 'dark'"
          :trigger="trigger"
          title="Title"
          content="Left End"
          placement="left-end"
        >
          <template #reference>
            <el-button>left-end</el-button>
          </template>
        </Popover>
        <Popover
          class="box-item"
          :darkMode="theme === 'dark'"
          :trigger="trigger"
          title="Title"
          content="Right End"
          placement="right-end"
        >
          <template #reference>
            <el-button>right-end</el-button>
          </template>
        </Popover>
      </div>
      <div class="row center">
        <Popover
          class="box-item"
          :darkMode="theme === 'dark'"
          :trigger="trigger"
          title="Title"
          content="Bottom Start"
          placement="bottom-start"
        >
          <template #reference> <el-button>bottom-start</el-button></template>
        </Popover>
        <Popover
          class="box-item"
          :darkMode="theme === 'dark'"
          :trigger="trigger"
          title="Title"
          content="Bottom Center"
          placement="bottom"
        >
          <template #reference> <el-button>bottom</el-button></template>
        </Popover>
        <Popover
          class="box-item"
          :darkMode="theme === 'dark'"
          :trigger="trigger"
          title="Title"
          content="Bottom End"
          placement="bottom-end"
        >
          <template #reference>
            <el-button>bottom-end</el-button>
          </template>
        </Popover>
      </div>
    </div>
    <div class="popover-base-form">
      <el-form ref="form" label-width="120px">
        <el-form-item label="触发方式 trigger">
          <el-radio-group v-model="trigger">
            <el-radio value="click"> click </el-radio>
            <el-radio value="hover"> hover </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="风格 theme">
          <el-radio-group v-model="theme">
            <el-radio value="default"> default </el-radio>
            <el-radio value="dark"> dark </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="markdown">
      <h3>基本使用 Base Usage</h3>
      <Popover title="Title" content="Top Start" placement="top-start">
        <template #reference>
          <el-button>top-start</el-button>
        </template>
      </Popover>
      <MdEditor v-model="DefaultMd" previewOnly />
    </div>
    <div class="markdown">
      <h3>内容插槽 Content Slot</h3>
      <Popover title="Title" placement="top-start" @open="handleOpen" @close="handleClose">
        <template #reference>
          <el-button>top-start</el-button>
        </template>
        <div>content</div>
      </Popover>
      <MdEditor v-model="ContentMd" previewOnly />
    </div>
    <div class="markdown">
      <h3>暗黑模式 Dark Model</h3>
      <Popover title="Title" content="Top Start" placement="top-start" darkMode>
        <template #reference>
          <el-button>top-start</el-button>
        </template>
      </Popover>
      <MdEditor v-model="DarkMd" previewOnly />
      <MdEditor v-model="READMEMd" previewOnly />
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultMd from "./markdown/default.md?raw";
import ContentMd from "./markdown/content.md?raw";
import DarkMd from "./markdown/dark.md?raw";
import READMEMd from "./markdown/README.md?raw";
import { ref, watch } from "vue";
import Popover from "vue3-popover";
import "vue3-popover/dist/vue3-popover.css";
import { ElMessage } from "element-plus";
const trigger = ref<"click" | "hover">("click");
const theme = ref("default");
watch(
  () => theme.value,
  () => {
    document.body.className = theme.value;
  }
);
const handleOpen = () => {
  ElMessage.success("open");
};
const handleClose = () => {
  ElMessage.info("close");
};
</script>

<style lang="scss">
.md-editor-previewOnly,
.md-editor-previewOnly .md-editor-content {
  background-color: transparent;
}
.md-editor-content .md-editor-preview-wrapper {
  padding: 0;
}
.markdown {
  padding-top: 20px;
  width: 900px;
  margin: 0px auto;
}
.popover-base-form {
  width: 600px;
  margin: 0px auto;
}
body {
  font-size: 14px;
}
.popover-base-box {
  width: 600px;
  margin: 150px auto;
}

.popover-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
}

.popover-base-box .center {
  justify-content: center;
}

.popover-base-box .box-item {
  margin: 10px;
}
.popover-trigger + .popover-trigger {
  margin-left: 10px;
}
.popover-body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
}
.dark {
  background-color: #141414;
  color-scheme: dark;
  --el-color-primary: #409eff;
  --el-color-primary-light-3: rgb(50.8, 116.6, 184.5);
  --el-color-primary-light-5: rgb(42, 89, 137.5);
  --el-color-primary-light-7: rgb(33.2, 61.4, 90.5);
  --el-color-primary-light-8: rgb(28.8, 47.6, 67);
  --el-color-primary-light-9: rgb(24.4, 33.8, 43.5);
  --el-color-primary-dark-2: rgb(102.2, 177.4, 255);
  --el-color-success: #67c23a;
  --el-color-success-light-3: rgb(78.1, 141.8, 46.6);
  --el-color-success-light-5: rgb(61.5, 107, 39);
  --el-color-success-light-7: rgb(44.9, 72.2, 31.4);
  --el-color-success-light-8: rgb(36.6, 54.8, 27.6);
  --el-color-success-light-9: rgb(28.3, 37.4, 23.8);
  --el-color-success-dark-2: rgb(133.4, 206.2, 97.4);
  --el-color-warning: #e6a23c;
  --el-color-warning-light-3: rgb(167, 119.4, 48);
  --el-color-warning-light-5: #7d5b28;
  --el-color-warning-light-7: rgb(83, 62.6, 32);
  --el-color-warning-light-8: rgb(62, 48.4, 28);
  --el-color-warning-light-9: rgb(41, 34.2, 24);
  --el-color-warning-dark-2: rgb(235, 180.6, 99);
  --el-color-danger: #f56c6c;
  --el-color-danger-light-3: rgb(177.5, 81.6, 81.6);
  --el-color-danger-light-5: rgb(132.5, 64, 64);
  --el-color-danger-light-7: rgb(87.5, 46.4, 46.4);
  --el-color-danger-light-8: rgb(65, 37.6, 37.6);
  --el-color-danger-light-9: rgb(42.5, 28.8, 28.8);
  --el-color-danger-dark-2: rgb(247, 137.4, 137.4);
  --el-color-error: #f56c6c;
  --el-color-error-light-3: rgb(177.5, 81.6, 81.6);
  --el-color-error-light-5: rgb(132.5, 64, 64);
  --el-color-error-light-7: rgb(87.5, 46.4, 46.4);
  --el-color-error-light-8: rgb(65, 37.6, 37.6);
  --el-color-error-light-9: rgb(42.5, 28.8, 28.8);
  --el-color-error-dark-2: rgb(247, 137.4, 137.4);
  --el-color-info: #909399;
  --el-color-info-light-3: rgb(106.8, 108.9, 113.1);
  --el-color-info-light-5: rgb(82, 83.5, 86.5);
  --el-color-info-light-7: rgb(57.2, 58.1, 59.9);
  --el-color-info-light-8: rgb(44.8, 45.4, 46.6);
  --el-color-info-light-9: rgb(32.4, 32.7, 33.3);
  --el-color-info-dark-2: rgb(166.2, 168.6, 173.4);
  --el-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.36), 0px 8px 20px rgba(0, 0, 0, 0.72);
  --el-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, 0.72);
  --el-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, 0.72);
  --el-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, 0.72), 0px 12px 32px #000000, 0px 8px 16px -8px #000000;
  --el-bg-color-page: #0a0a0a;
  --el-bg-color: #141414;
  --el-bg-color-overlay: #1d1e1f;
  --el-text-color-primary: #e5eaf3;
  --el-text-color-regular: #cfd3dc;
  --el-text-color-secondary: #a3a6ad;
  --el-text-color-placeholder: #8d9095;
  --el-text-color-disabled: #6c6e72;
  --el-border-color-darker: #636466;
  --el-border-color-dark: #58585b;
  --el-border-color: #4c4d4f;
  --el-border-color-light: #414243;
  --el-border-color-lighter: #363637;
  --el-border-color-extra-light: #2b2b2c;
  --el-fill-color-darker: #424243;
  --el-fill-color-dark: #39393a;
  --el-fill-color: #303030;
  --el-fill-color-light: #262727;
  --el-fill-color-lighter: #1d1d1d;
  --el-fill-color-extra-light: #191919;
  --el-fill-color-blank: transparent;
  --el-mask-color: rgba(0, 0, 0, 0.8);
  --el-mask-color-extra-light: rgba(0, 0, 0, 0.3);
  // .popover {
  //   --popover-title-color: #ffffff;
  //   --popover-content-color: #cccccc;
  //   --popover-background-color: #1d1e1f;
  //   --popover-border-color: #414243;
  //   --popover-shadow-color: rgba(0, 0, 0, 0.12);
  // }
}
</style>
