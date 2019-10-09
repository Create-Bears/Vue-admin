<template>
  <div>
    <div class="translate-box">
      <label>{{data.label}}</label>
      <div>
        <Input
          v-if="data.type === formTypes.input"
          class="w200"
          v-model="value"
          :placeholder="`请输入${data.label}`"
          clearable
          @on-change="change"
        />
        <!-- Select -->
        <Select
          class="w200"
          v-if="data.type === formTypes.select"
          v-model="value"
          :placeholder="`请选择${data.label}`"
          :filterable="data.filterable"
          @on-change="change"
          clearable
        >
          <Option v-for="item in options" :key="item.key" :value="item.value" :label="item.label" />
        </Select>
        <!-- BooleanSelect -->
        <Select
          class="w200"
          v-if="data.type === formTypes.booleanSelect"
          v-model="value"
          :placeholder="`请选择${data.label}`"
          @on-change="change"
          clearable
        >
          <Option
            v-for="item in data.options"
            :key="item.label"
            :value="item.value"
            :label="item.label"
          />
        </Select>
        <!-- multiSelect -->
        <Select
          class="w200"
          :style="data.style || {}"
          v-if="data.type === formTypes.multiSelect"
          v-model="value"
          :placeholder="`请选择${data.label}`"
          :filterable="data.filterable"
          multiple
          clearable
          @on-change="multiSelect"
        >
          <Option v-for="item in options" :key="item.key" :value="item.value" :label="item.label" />
        </Select>
        <!-- Range -->
        <div v-if="data.type === formTypes.range">
          <Input
            class="w100"
            v-model="rangeValue.min"
            :placeholder="data.minPlaceholder || '最小'"
            clearable
            @on-change="rangeChange"
          />-
          <Input
            class="w100"
            v-model="rangeValue.max"
            :placeholder="data.maxPlaceholder || '最大'"
            clearable
            @on-change="rangeChange"
          />
        </div>
        <!-- RangeDate -->
        <div class="block">
          <el-date-picker
            v-if="data.type === formTypes.rangeDate"
            v-model="rangeDateValue"
            type="daterange"
            placeholder="`请选择${data.label}`"
          ></el-date-picker>
        </div>
        <div class="block">
          <el-date-picker
            v-if="data.type === formTypes.rangeDate"
            v-model="singleDateValue"
            type="date"
            placeholder="`请选择${data.label}`"
          ></el-date-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const FORM_TYPES = {
  input: "input",
  range: "range",
  select: "select",
  multiSelect: "multiSelect",
  booleanSelect: "booleanSelect",
  rangeDate: "rangeDate",
  singleDate: "singleDate"
};
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      formTypes: FORM_TYPES,
      value: null,
      rangeValue: {
        min: null,
        max: null
      },
      rangeDateValue: [],
      singleDateValue: null,
      optionsByAsync: []
    };
  },
  methods: {
    emitChange(value) {
      const pl = {
        key: this.data.key,
        value: value
      };
      this.$emit("on-change", pl);
    },
    change() {
      this.emitChange(this.value);
    },
    multiSelect() {
      const value = this.value.join(",");
      this.emitChange(value);
    },
    rangeChange() {
      const value = {};
      value[this.data.minKey] = this.rangeValue.min;
      value[this.data.maxKey] = this.rangeValue.max;
      this.emitChange(value);
    },
    rangeDateChange() {
      const value = {};
      value[this.data.minKey] = this.rangeDateValue[0]
        ? this.rangeDateValue[0].getTime()
        : null;
      value[this.data.maxKey] = this.rangeDateValue[1]
        ? this.rangeDateValue[1].getTime()
        : null;
      this.emitChange(value);
    },
    singleDateChange(val) {
      const value = this.singleDateValue
        ? this.singleDateValue.getTime()
        : null;
      this.emitChange(value);
    }
  }
};
</script>

<style lang="scss">
</style>