<template>
  <div>
    <!-- <translateGroup /> -->
    <div style="position: relative;">
      <i-table
        :columns="columns"
        :data="data"
      />
      <div
        :style="{'background-image': 'url('+ watermarkbgUrl +')'}"
        class="water-mark"
      />
      <Page
        :total="100"
        show-elevator
        show-sizer
        show-total
        class="ban-trigger"
      />
    </div>
  </div>
</template>

<script>
// import translateGroup from '@/components/translateGroup/index.vue'
export default {
  components: {
    // translateGroup
  },
  data() {
    return {
      // * 列表格式
      columns: [
        { type: 'selection', fixed: 'left', width: 40 },
        {
          title: '姓名',
          key: 'name',
          sortable: 'custom',
          fixed: 'left',
          width: 100,
          render: (h, params) => {
            return h('span', {
              on: {
                click: () => {
                  window.open(`#/client-overview?id=${params.row.baseId}&from=invitelist`, '_blank')
                }
              },
              style: {
                cursor: 'pointer'
              }
            }, params.row.name)
          }
        },
        { title: '所在机构', key: 'institution', width: 200 },
        { title: '是否Alpha律所', key: 'isAlphaIns', width: 100, render: (h, params) => h('span', params.row.isAlphaIns ? '是' : '否') },
        { title: '职务', key: 'position', width: 100 },
        { title: '执业年限', key: 'lengthOfPractice', width: 100, sortable: 'custom' },
        {
          title: '手机号',
          key: 'mobilePhone',
          width: 120,
          render: (h, params) => {
            if (params.row.partnerOwnStatus === 1) {
              return h('div', params.row.mobilePhone)
            } else if (params.row.mobilePhone) {
              return h('div', '***********')
            }
          }
        },
        {
          title: '最后更新时间',
          key: 'gmtModify',
          sortable: 'custom',
          minWidth: 150
          //   render: (h, params) => {
          //     return h('span', params.row.gmtModify ? Util.fmtDate(params.row.gmtModify, 'yyyy-MM-dd hh:mm:ss') : '')
          //   }
        },
        {
          title: '区域',
          width: 140,
          render: (h, params) => {
            return h('span', `${params.row.province || ''} ${params.row.city || ''} ${params.row.area || ''}`)
          }
        },
        { title: '邀请状态', key: 'partnerInviteStatus', align: 'center', minWidth: 140 },
        { title: '邀请人', key: 'partnerInviter', align: 'center', minWidth: 73 },
        {
          title: '邀请记录',
          key: 'partnerInviteRecord',
          minWidth: 180,
          render: (h, params) => {
            return h('p', {
              style: {
                maxHeight: '150px',
                overflow: 'scroll'
              }
            }, this.getList(params.row.partnerInviteRecord).map(item => h('div', item)))
          }
        },
        {
          title: '计划跟进日期',
          key: 'partnerInviterTime',
          minWidth: 130,
          sortable: 'custom'
          //   render: (h, params) => {
          //     return h('span', params.row.partnerInviterTime ? Util.fmtDate(params.row.partnerInviterTime, 'yyyy-MM-dd') : '')
          //   }
        },
        {
          title: 'Alpha用户',
          key: 'isAlphaUser',
          width: 100,
          render: (h, params) => {
            return h('span', params.row.isAlphaUser ? '是' : '否')
          }
        },
        {
          title: 'Alpha用户最近登录时间',
          key: 'lastLoginTime',
          sortable: 'custom',
          width: 170
          //   render: (h, params) => {
          //     return h('span', params.row.lastLoginTime ? Util.fmtDate(params.row.lastLoginTime, 'yyyy-MM-dd hh:mm:ss') : '')
          //   }
        },
        {
          title: '近一个月的使用次数',
          key: 'monthReqTimesStr',
          sortable: 'custom',
          width: 150
        },
        {
          title: 'iCourt学员',
          key: 'isIcourtStudent',
          width: 100,
          render: (h, params) => {
            return h('span', params.row.isIcourtStudent ? '是' : '否')
          }
        },
        {
          title: '参加课程次数',
          key: 'courseCount',
          minWidth: 100
        },
        {
          title: '是否线上法学院',
          width: 120,
          sortable: 'custom',
          render: (h, params) => {
            return h('span', params.row.isLawCourseOnline ? '是' : '否')
          }
        },
        {
          title: '美国行学员',
          key: 'isUsaStudent',
          width: 80,
          render: (h, params) => {
            return h('span', params.row.isUsaStudent ? '是' : '否')
          }
        },
        {
          title: '是否未来律所',
          key: 'isFutureLaw',
          width: 120,
          render: (h, params) => {
            return h('span', params.row.isFutureLaw ? '是' : '否')
          }
        },
        { title: '标签', key: 'tags', width: 100 },
        { title: '邀请级别', key: 'partnerIntentLevel', align: 'center', minWidth: 73 },
        { title: '决策点', key: 'decisionPoint', align: 'center', minWidth: 73 },
        { title: '橙子手机', key: 'partnerOrangePhone', align: 'center', minWidth: 73 },
        { title: 'Alpha用户数', key: 'row', align: 'center', minWidth: 100 },
        {
          title: '出生日期',
          key: 'birthday',
          width: 120,
          sortable: 'custom'
          //   render: (h, params) => h('span', Util.fmtDate(params.row.birthday, 'yyyy-MM-dd'))
        },
        {
          title: '最后联系时间',
          key: 'lastContactTime',
          minWidth: 160,
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.lastContactTime)
          }
        },
        {
          title: '参加时间',
          key: 'partnerJoinActivityId',
          minWidth: 160,
          align: 'center'
        },
        { title: '参加人数', key: 'partnerJoinActivityPersonNum', align: 'center', minWidth: 70 },
        { title: '所在群', key: 'partnerChatGroup', align: 'center', minWidth: 70 },
        { title: '备注', key: 'partnerRemark', align: 'center', minWidth: 70 },
        {
          title: '操作',
          width: 210,
          fixed: 'right',
          align: 'center'
          //   render: (h, params) => {
          //     return h(inviteButtonGroup, {
          //       props: {
          //         index: params.index,
          //         row: params.row,
          //         isAllotFlag: this.isAllotFlag
          //       },
          //       on: {
          //         edit: this.edit,
          //         detail: this.clientDetail,
          //         myInvite: this.myInvite,
          //         allot: this.allot
          //       }
          //     })
          //   }
        }
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          province: '北京市',
          city: '朝阳区',
          zip: 100000
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          province: '北京市',
          city: '海淀区',
          zip: 100000
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          province: '上海市',
          city: '浦东新区',
          zip: 100000
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          province: '广东',
          city: '南山区',
          zip: 100000
        },
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          province: '北京市',
          city: '朝阳区',
          zip: 100000
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          province: '北京市',
          city: '海淀区',
          zip: 100000
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          province: '上海市',
          city: '浦东新区',
          zip: 100000
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          province: '广东',
          city: '南山区',
          zip: 100000
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
