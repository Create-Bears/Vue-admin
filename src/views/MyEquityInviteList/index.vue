<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row v-for="(item, index) in forms" :key="index" type="flex">
        <el-col v-for="(value, key) in item" :key="key" :span="6" class="form-item">
          <el-form-item :label="value.label" class="form-label">
            <component
              :is="value.is"
              v-model="form[value.name]"
              :placeholder="value.placeholder"
              :range.sync="form[value.name]"
            >
              <el-option v-for="(v, k) in value.options" :key="k" :label="v.label" :value="v.value" />
            </component>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submit">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import RangeInput from '@/views/MyEquityInviteList/components/RangeInput'
export default {
  components: {
    RangeInput
  },
  data() {
    return {
      form: {
        name: '',
        isAlpha: '',
        date: '',
        range: [10, 100]
      },
      forms: [
        [
          {
            label: '姓名',
            name: 'name',
            placeholder: '请输入姓名',
            is: 'el-input'
          },
          {
            label: '所在机构',
            name: 'name',
            placeholder: '请输入所在机构',
            is: 'el-input'
          },
          {
            label: '手机号',
            name: 'name',
            placeholder: '请输入手机号',
            is: 'el-input'
          },
          {
            label: '职务',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入职务',
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
          }
        ],
        [
          {
            label: '课程次数',
            name: 'range',
            is: 'range-input'
          },
          {
            label: '是否Alpha用户',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入是否Alpha用户',
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
            label: '是否iCourt学员',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入是否iCourt学员',
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
            label: '上过的课程',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入上过的课程',
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
          }
        ],
        [
          {
            label: '课程名',
            name: 'name',
            is: 'el-input'
          },
          {
            label: '选择省',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入选择省',
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
            label: '选择市',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入选择市',
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
            label: '选择区县',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入选择区县',
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
          }
        ],
        [
          {
            label: '标签',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入标签',
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
            label: '是否为排除标签中所选',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入是否为排除标签中所选',
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
            label: '邀请状态',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入邀请状态',
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
            label: '邀请时间筛选',
            name: 'date',
            placeholder: '请选择邀请时间筛选',
            is: 'el-date-picker'
          }
        ],
        [
          {
            label: '跟进记录',
            name: 'name',
            is: 'el-input',
            placeholder: '请输入跟进记录'
          },
          {
            label: '最后联系时间',
            name: 'date',
            placeholder: '请选择最后联系时间',
            is: 'el-date-picker'
          },
          {
            label: '邀请级别',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入邀请级别',
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
            label: '橙子手机',
            name: 'name',
            is: 'el-input',
            placeholder: '请输入橙子手机'
          }
        ],
        [
          {
            label: '所在群',
            name: 'name',
            is: 'el-input',
            placeholder: '请输入所在群'
          },
          {
            label: '备注',
            name: 'name',
            is: 'el-input',
            placeholder: '请输入备注'
          },
          {
            label: '执业年限',
            name: 'range',
            is: 'range-input'
          },
          {
            label: '出生日期',
            name: 'date',
            placeholder: '请选择出生日期',
            is: 'el-date-picker'
          }
        ],
        [
          {
            label: '是否参加活动',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入是否参加活动',
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
            label: '活动类型',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入活动类型',
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
            label: '是否签到',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入是否签到',
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
            label: '参加时间',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入参加时间',
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
          }
        ],
        [
          {
            label: '是否购买该产品',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入是否购买该产品',
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
            label: '产品类型',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入产品类型',
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
            label: '产品名称',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入产品名称',
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
            label: '最近一次登录时间',
            name: 'date',
            placeholder: '请选择最近一次登录时间',
            is: 'el-date-picker'
          }
        ],
        [
          {
            label: '跟进人',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入跟进人',
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
            label: '计划跟进日期',
            name: 'date',
            placeholder: '请选择计划跟进日期',
            is: 'el-date-picker'
          },
          {
            label: '近一个月使用次数',
            name: 'name',
            is: 'el-select',
            placeholder: '请输入近一个月使用次数',
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
            label: '新增邀请日期',
            name: 'date',
            placeholder: '请选择新增邀请日期',
            is: 'el-date-picker'
          }
        ]
      ]
    }
  },
  methods: {
    submit() {
      console.log('form...', this.$refs.form.model)
    },
    reset() {
      this.$refs.form.resetField()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-item {
  height: 70px;
}
.form-item /deep/ .el-form-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.form-label /deep/ .el-form-item__label {
  text-align: left;
  font-size: 12px;
  width: 100% !important;
  font-weight: normal;
}
.form-label /deep/ .el-form-item__content {
  margin-left: 0 !important;
}
</style>
