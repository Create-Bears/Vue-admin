<template>
  <div class="range-input">
    <el-input v-model="range[0]" placeholder="最小" />-
    <el-input v-model="range[1]" placeholder="最大" />
  </div>
</template>

<script>
export default {
  props: ['range']
}
</script>

<style lang="scss" scoped>
.range-input{
  display: flex;
}
.range-input /deep/ .el-input__inner {
  margin:0 5px;
  width: 94px;
}
</style>
