<template>
  <div :class="styles.nima">测试</div>
  <div class="he" @click="showDialog">蓝色</div>
</template>
<script>
const { ipcRenderer } = window.require("electron");
import { EventMap } from "../../../common/event";
import styles from "./index.less";
export default {
  data() {
    return {
      styles,
    };
  },
  methods: {
    showDialog() {
      ipcRenderer.send(EventMap.showDialog, {
        message: "叫个毛",
      });
    },
  },
};
</script>
<style>
@import "./index.css";
</style>