```
<template>
   <Popover
      title="Title"
      content="Top Start"
      placement="top-start"
      darkMode
    >
      <template #reference>
        <el-button>top-start</el-button>
      </template>
  </Popover>
</template>
<script setup lang="ts">
import Popover from "vue3-popover";
import "vue3-popover/dist/style.css";
</script>
```
