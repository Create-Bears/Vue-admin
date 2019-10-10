<template>
  <div class="translate-wrapper">
    <div class="translate-box">
      <label>{{ data.label }}</label>
      <div>
        <el-input
          v-if="data.type === formTypes.input"
          v-model="value"
          :placeholder="`请输入${data.label}`"
          clearable
          @on-change="change"
        />
        <!-- Select -->
        <el-select
          v-if="data.type === formTypes.select"
          v-model="value"
          :placeholder="`请选择${data.label}`"
          :filterable="data.filterable"
          clearable
          @on-change="change"
        >
          <!-- <el-option v-for="item in options" :key="item.key" :value="item.value" :label="item.label" /> -->
        </el-select>
        <!-- BooleanSelect -->
        <el-select
          v-if="data.type === formTypes.booleanSelect"
          v-model="value"
          :placeholder="`请选择${data.label}`"
          clearable
          @on-change="change"
        >
          <el-option
            v-for="item in data.options"
            :key="item.label"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
        <!-- multiSelect -->
        <el-select
          v-if="data.type === formTypes.multiSelect"
          v-model="value"
          :style="data.style || {}"
          :placeholder="`请选择${data.label}`"
          :filterable="data.filterable"
          multiple
          clearable
          @on-change="multiSelect"
        >
          <!-- <el-option
            v-for="item in options"
            :key="item.key"
            :value="item.value"
            :label="item.label"
          /> -->
        </el-select>
        <!-- Range -->
        <div v-if="data.type === formTypes.range">
          <el-input
            v-model="rangeValue.min"
            class="w100"
            style="width:94px"
            :placeholder="data.minPlaceholder || '最小'"
            clearable
            @on-change="rangeChange"
          />-
          <el-input
            v-model="rangeValue.max"
            class="w100"
            style="width:94px"
            :placeholder="data.maxPlaceholder || '最大'"
            clearable
            @on-change="rangeChange"
          />
        </div>
        <!-- RangeDate -->
        <div class="block">
          <el-date-picker
            v-if="data.type === formTypes.rangeDate"
            v-model="singleDateValue"
            style="width:200px"
            type="date"
            :placeholder="`请选择${data.label}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {getInputData} from '@/api/enterprise.js'
const FORM_TYPES = {
  input: 'input',
  range: 'range',
  select: 'select',
  multiSelect: 'multiSelect',
  booleanSelect: 'booleanSelect',
  rangeDate: 'rangeDate',
  singleDate: 'singleDate'
}
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      formTypes: FORM_TYPES,
      value: '',
      rangeValue: {
        min: null,
        max: null
      },
      rangeDateValue: [],
      singleDateValue: '',
      optionsByAsync: []
    }
  },
  methods: {
    emitChange(value) {
      const pl = {
        key: this.data.key,
        value: value
      }
      this.$emit('on-change', pl)
    },
    change() {
      this.emitChange(this.value)
    },
    multiSelect() {
      const value = this.value.join(',')
      this.emitChange(value)
    },
    rangeChange() {
      const value = {}
      value[this.data.minKey] = this.rangeValue.min
      value[this.data.maxKey] = this.rangeValue.max
      this.emitChange(value)
    },
    rangeDateChange() {
      const value = {}
      value[this.data.minKey] = this.rangeDateValue[0]
        ? this.rangeDateValue[0].getTime()
        : null
      value[this.data.maxKey] = this.rangeDateValue[1]
        ? this.rangeDateValue[1].getTime()
        : null
      this.emitChange(value)
    },
    singleDateChange(val) {
      const value = this.singleDateValue
        ? this.singleDateValue.getTime()
        : null
      this.emitChange(value)
    }
  }
  // mounted() {
  //   // getInputData().then(res=>{
  //   //   // console.log(res)
  //   // })
  // },
}
</script>

<style lang="scss">
.w100>input{
  width: 94px!important;
}
.translate-wrapper {
  display: inline-block;
  width: 25%;
  margin-top: 10px;
  .translate-box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    label {
      font-size: 12px;
      margin-bottom: 3px;
      font-weight: normal;
      width: 200px;
      padding-right: 10px;
    }
    div {
      font-size: 12px;
      input {
        width: 200px;
        height: 32px;
        border-radius: 5px;
        outline: 0;
        // border: 0;
        // border: 1px solid #ccc;
      }
    }
    div > select {
      width: 200px;
      height: 32px;
      border-radius: 5px;
      outline: 0;
      border: 0;
      border: 1px solid #ccc;
    }
  }
}
</style>
