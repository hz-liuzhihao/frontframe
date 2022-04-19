<template>
  <div class="lihai">
    把东西包起来
    <router-view />
  </div>
</template>
<script>
const { ipcRenderer } = window.require("electron");
export default {
  name: "baselayout",
  methods: {
    test() {
      ipcRenderer.send("show");
    }
  },
};
</script>
<style>
@import "./index.css";
</style>