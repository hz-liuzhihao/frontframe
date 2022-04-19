<template>
  <div :class="styles.nima">
    测试
  </div>
  <div class="he">
    蓝色
  </div>
</template>
<script>
import styles from './index.less';
export default {
  data() {
    return {
      styles
    }
  }
}
</script>
<style>
@import './index.css';
</style>