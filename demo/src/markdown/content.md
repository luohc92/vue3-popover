```
<template>
   <Popover
      title="Title"
      placement="top-start"
      @open="handleOpen"
      @close="handleClose"
    >
      <template #reference>
        <el-button>top-start</el-button>
      </template>
      <div>content</div>
  </Popover>
</template>
<script setup lang="ts">
import Popover from "vue3-popover";
import "vue3-popover/dist/style.css";
const handleOpen = () => {
  ElMessage.success("open");
};
const handleClose = () => {
  ElMessage.info("close");
};
</script>

```
