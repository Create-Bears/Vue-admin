<template>
  <div class="dialog">
    <div class="mask">
      <div class="mask-content">
        <div class="ivu-close">
          <h3>新增客户</h3>
          <div>
            <span @click="handClose">X</span>
          </div>
        </div>
        <div class="ivu-body">
          <el-form>
            <el-col v-for="(value,index) in forms" :key="index" :span="12">
              <el-form-item :label="value.label" class="form-label">
                <component
                  :is="value.is"
                  v-model="form[value.name]"
                  :placeholder="value.placeholder"
                  :range.sync="form[value.name]"
                >
                  <el-option
                    v-for="(v, k) in value.options"
                    :key="k"
                    :label="v.label"
                    :value="v.value"
                  />
                </component>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="ivu-footer">
          <div>
            <el-button round>取消</el-button>
            <el-button type="warning" round>保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isAddShow'],
  data() {
    return {
      form: {
        name: '',
        radio: ''
      },
      forms: [
        {
          label: '姓名',
          name: 'name',
          placeholder: '请填写',
          is: 'el-input'
        },
        {
          label: '性别',
          name: 'radio',
          is: 'el-radio'
        },
        {
          label: '职业',
          name: 'isAlpha',
          is: 'el-select',
          options: [
            {
              label: '是',
              value: 1
            },
            {
              label: '否',
              value: 0
            }
          ]
        },
        {
          label: '职务',
          name: 'isAlpha',
          is: 'el-select',
          options: [
            {
              label: '是',
              value: 1
            },
            {
              label: '否',
              value: 0
            }
          ]
        },
        {
          label: '所在机构',
          name: 'name',
          placeholder: '请填写',
          is: 'el-input'
        },
        {
          label: '手机',
          name: 'name',
          placeholder: '请填写',
          is: 'el-input'
        },
        {
          label: '邮箱',
          name: 'name',
          placeholder: '请填写',
          is: 'el-input'
        },
        {
          label: '微信',
          name: 'name',
          placeholder: '请填写',
          is: 'el-input'
        },
        {
          label: '执业年限',
          name: 'name',
          placeholder: '请填写',
          is: 'el-input'
        }
      ]
    }
  },
  methods: {
    handClose() {
      this.$emit('handCloseDialog', false)
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-size: 12px;
}
.dialog {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
  .mask {
    width: 100%;
    height: 100%;
    position: relative;
    .mask-content {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -300px;
      margin-top: -215px;
      background-color: #fff;
      height: 430px;
      width: 600px;
      border-radius: 6px;
      .ivu-close {
        width: 100%;
        display: flex;
        height: 50px;
        line-height: 50px;
        justify-content: space-between;
        padding: 0 15px;
        border-bottom: 1px solid #ccc;
      }
      .ivu-body {
        width: 100%;
        height: 317px;
        padding: 16px;
        font-size: 12px;
        line-height: 1.5;
      }
    }
  }
}
.el-form{
  width: 100%;
  height: 100%;
}
.el-form-item {
  display: flex;
}
.el-form-item > label {
  font-size: 12px;
  width: 80px;
  font-weight: normal;
}
.ivu-footer {
  border-top: 1px solid #e9eaec;
  padding: 12px 18px 12px 18px;
  text-align: right;
}
</style>
