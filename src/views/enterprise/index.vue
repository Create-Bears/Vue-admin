<template>
  <div>
    <translateGroup />
    <div class="other-btn-group">
      <div class="other-btn-left">
        <el-button
          round
          @click="addUserDialog"
        >+新增客户</el-button>
        <el-button round>今日跟进</el-button>
        <el-button round>我的邀请</el-button>
      </div>
      <div class="other-btn-right">
        <el-button round>搜索</el-button>
        <el-button round>重置</el-button>
      </div>
      <div class="tableData">
        <i-table
          :columns="columns"
          :data="data"
        />
        <Page
          :total="100"
          show-elevator
          show-sizer
          show-total
        />
        <Modal
          v-model="flag"
          title="编辑律师信息"
          footer-hide="false"
          width="900px"
        >
          <Form
            ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80"
          >
            <FormItem
              label="姓名"
              prop="name"
            >
              <Input
                v-model="formValidate.name"
                placeholder="请输入你的姓名"
              />
            </FormItem>
            <FormItem
              label="所在机构"
              prop="name"
            >
              <Input
                v-model="formValidate.name"
                placeholder="请输入你的所在机构"
              />
            </FormItem>
            <FormItem
              label="职务"
              prop="city"
            >
              <Select
                v-model="formValidate.city"
                placeholder="请选择"
              >
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem
              label="手机号"
              prop="name"
            >
              <Input
                v-model="formValidate.name"
                placeholder="请输入你的手机号"
              />
            </FormItem>
            <FormItem
              label="性别"
              prop="gender"
            >
              <RadioGroup v-model="formValidate.gender">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              label="邀请状态"
              prop="city"
            >
              <Select
                v-model="formValidate.city"
                placeholder="请选择"
              >
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="计划跟进">
              <Row>
                <Col span="11" />
                <FormItem prop="date">
                  <DatePicker
                    v-model="formValidate.date"
                    type="date"
                    placeholder="计划跟进日期"
                  />
                </FormItem>
              </Row>
            </FormItem>
            <FormItem
              label="参加时间"
              prop="city"
            >
              <Select
                v-model="formValidate.city"
                placeholder="请选择"
              >
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem
              label="律师是否报名"
              prop="gender"
            >
              <RadioGroup v-model="formValidate.gender">
                <Radio label="yes">是</Radio>
                <Radio label="no">否</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              label="邀请记录"
              prop="gender"
            >
              <Button>邀请</Button>
              <Input
                v-model="formValidate.desc"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="Enter something..."
              />
            </FormItem>
            <FormItem
              label="备注"
              prop="desc"
            >
              <Input
                v-model="formValidate.desc"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="Enter something..."
              />
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formValidate')"
              >保存</Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
      <div style="position: relative;clear:both">
        <i-table
          :columns="columns"
          :data="data"
        />
        <Page
          :total="100"
          show-elevator
          show-sizer
          show-total
          class="ban-trigger"
        />
      </div>
      <addUserDialog
        v-if="isAddShow"
        :is-add-show="isAddShow"
        @handCloseDialog="handClick"
      />
    </div>
  </div>
</template>

<script>
import translateGroup from '@/components/translateGroup/index.vue'
import { getInputData } from '@/api/enterprise.js'
import addUserDialog from '@/components/addUserDialog/index.vue'
export default {
  components: {
    translateGroup,
    addUserDialog
  },
  data() {
    return {
      formValidate: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        date: '',
        time: '',
        desc: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      },
      flag: false,
      // 列表
      columns: [
        { type: 'selection', fixed: 'left', width: 40 },
        {
          title: '姓名',
          key: 'name',
          sortable: 'custom',
          fixed: 'left',
          width: 100,
          render: (h, params) => {
            return h(
              'span',
              {
                on: {
                  click: () => {
                    window.open(
                      `#/client-overview?id=${params.row.baseId}&from=invitelist`,
                      '_blank'
                    )
                  }
                },
                style: {
                  cursor: 'pointer'
                }
              },
              params.row.name
            )
          }
        },
        { title: '所在机构', key: 'institution', width: 200 },
        {
          title: '是否Alpha律所',
          key: 'isAlphaIns',
          width: 100,
          render: (h, params) => h('span', params.row.isAlphaIns ? '是' : '否')
        },
        { title: '职务', key: 'position', width: 100 },
        {
          title: '执业年限',
          key: 'lengthOfPractice',
          width: 100,
          sortable: 'custom'
        },
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
        },
        {
          title: '区域',
          width: 140,
          render: (h, params) => {
            return h(
              'span',
              `${params.row.province || ''} ${params.row.city || ''} ${params
                .row.area || ''}`
            )
          }
        },
        {
          title: '邀请状态',
          key: 'partnerInviteStatus',
          align: 'center',
          minWidth: 140
        },
        {
          title: '邀请人',
          key: 'partnerInviter',
          align: 'center',
          minWidth: 73
        },
        {
          title: '邀请记录',
          key: 'partnerInviteRecord',
          minWidth: 180,
          render: (h, params) => {
            return h(
              'p',
              {
                style: {
                  maxHeight: '150px',
                  overflow: 'scroll'
                }
              },
            )
          }
        },
        {
          title: '计划跟进日期',
          key: 'partnerInviterTime',
          minWidth: 130,
          sortable: 'custom'
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
        {
          title: '邀请级别',
          key: 'partnerIntentLevel',
          align: 'center',
          minWidth: 73
        },
        {
          title: '决策点',
          key: 'decisionPoint',
          align: 'center',
          minWidth: 73
        },
        {
          title: '橙子手机',
          key: 'partnerOrangePhone',
          align: 'center',
          minWidth: 73
        },
        { title: 'Alpha用户数', key: 'row', align: 'center', minWidth: 100 },
        {
          title: '出生日期',
          key: 'birthday',
          width: 120,
          sortable: 'custom'
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
        {
          title: '参加人数',
          key: 'partnerJoinActivityPersonNum',
          align: 'center',
          minWidth: 70
        },
        {
          title: '所在群',
          key: 'partnerChatGroup',
          align: 'center',
          minWidth: 70
        },
        { title: '备注', key: 'partnerRemark', align: 'center', minWidth: 70 },
        {
          title: '操作',
          width: 210,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  shape: 'circle'
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  shape: 'circle'
                },
                on: {
                  click: () => {
                    this.editorModel(params)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  shape: 'circle',
                  disabled: true
                }
              }, '我来邀请')
            ])
          }
        }
      ],
      data: [
        {
          alpAccountCategory: null,
          alpActiveTime: null,
          alpAddTime: null,
          alpOfficeCreatedTime: null,
          alphaUser: null,
          alphaUserNum: 0,
          antipathyLevel: null,
          area: '南沙区',
          baseId: 482250,
          birthday: null,
          birthdayYear: null,
          businessArea: null,
          chatGroup: null,
          city: '广州市',
          communicationStatus: null,
          country: '中国',
          courseCount: 0,
          customerIntent: null,
          customerLevel: '{"美国行":"M","平台版":"预测"}',
          decisionPoint: null,
          email: null,
          gender: '女',
          gmtModify: '2019-10-09 16:31:54',
          icourtStudent: null,
          insId: 42659,
          institution: '广州市法律援助处',
          intentLevel: null,
          invitationId: 2210,
          inviteRecord: null,
          inviteStatus: '已联系',
          inviter: '王储00',
          inviterId: '01CEB4E16D2411E6A5C200163E0020D1',
          inviterTime: null,
          isAlphaIns: false,
          isAlphaUser: false,
          isFutureLaw: true,
          isIcourtStudent: false,
          isLawCourseOnline: false,
          isMyCustomer: true,
          isSameArea: true,
          isUsaStudent: true,
          joinActivityId: null,
          joinActivityPersonNum: null,
          lastContactTime: null,
          lastLoginTime: null,
          lawFirmRecommendations: null,
          lengthOfPractice: null,
          licenseNumber: null,
          liveBaseId: null,
          memberNum: 24,
          message: null,
          mobilePhone: '16666666666',
          modifyUserName: '王储00',
          monthReqTimes: null,
          monthReqTimesStr: '无',
          name: '王五',
          orangePhone: null,
          ownStatus: 1,
          partnerChatGroup: null,
          partnerDecisionPoint: null,
          partnerIntentLevel: null,
          partnerInvitationId: 2795,
          partnerInviteRecord: null,
          partnerInviteStatus: 'A+ 联系企业家中',
          partnerInviter: '王储00',
          partnerInviterId: '01CEB4E16D2411E6A5C200163E0020D1',
          partnerInviterTime: 1570644000000,
          partnerJoinActivityId: null,
          partnerJoinActivityPersonNum: null,
          partnerLastContactTime: null,
          partnerOrangePhone: null,
          partnerOwnStatus: 1,
          partnerRemark: null,
          personalRecommendations: null,
          position: '主任',
          practiceYear: null,
          province: '广东省',
          remark: null,
          sellerAlphaNames: ['王储00', 'ccjx', '秦雁鹏', '王鹏', '吴佳强'],
          tags: null,
          telephone: null,
          totalCourseCount: 0,
          userModify: '01CEB4E16D2411E6A5C200163E0020D1',
          wechatOnTheOrange: null,
          wechatOnThePhone: null
        },
        {
          alpAccountCategory: '团队版',
          alpActiveTime: '2018-06-01 21:31:01',
          alpAddTime: 1524204400000,
          alpOfficeCreatedTime: '2016-08-24 22:16:08',
          alphaUser: null,
          alphaUserNum: 960,
          antipathyLevel: null,
          area: '海淀区',
          baseId: 471342,
          birthday: null,
          birthdayYear: null,
          businessArea: null,
          chatGroup: null,
          city: '北京市',
          communicationStatus: null,
          country: '中国',
          courseCount: 0,
          customerIntent: null,
          customerLevel: '{"平台版":"预测","D币系统":"预测"}',
          decisionPoint: null,
          email: null,
          gender: '男',
          gmtModify: '2019-10-08 20:19:19',
          icourtStudent: null,
          insId: 50077,
          institution: 'iCourt双师系统测试',
          intentLevel: null,
          invitationId: 2188,
          inviteRecord: null,
          inviteStatus: '已联系',
          inviter: '杨嘉钦',
          inviterId: 'F63D29414EAA11E998137CD30AEB153E',
          inviterTime: null,
          isAlphaIns: true,
          isAlphaUser: true,
          isFutureLaw: true,
          isIcourtStudent: false,
          isLawCourseOnline: false,
          isMyCustomer: false,
          isSameArea: true,
          isUsaStudent: false,
          joinActivityId: null,
          joinActivityPersonNum: null,
          lastContactTime: null,
          lastLoginTime: null,
          lawFirmRecommendations: null,
          lengthOfPractice: null,
          licenseNumber: null,
          liveBaseId: null,
          memberNum: 988,
          message: null,
          mobilePhone: '17621001122',
          modifyUserName: '吴佳强',
          monthReqTimes: 0,
          monthReqTimesStr: '无',
          name: '刘小溪',
          orangePhone: null,
          ownStatus: 2,
          partnerChatGroup: null,
          partnerDecisionPoint: null,
          partnerIntentLevel: null,
          partnerInvitationId: 2223,
          partnerInviteRecord:
                        '渠道：电话当日邀约报名 |  微信跟进报名 | 电话跟进报名 | 【姓名】推荐 | KP【姓名】 |  跟团队一起过来【团队联络人姓名】 \n联系的基本情况：【被邀请的情况概述，意愿判断的依据】\n是否知道iCourt：熟悉 | 知道 | 陌生\n课程参加意愿度：高 | 中 | 低\n报名几人来参加：\n下一步跟进计划：发送视频及文章 | 电话确认 |  引导带团队来 |  推荐其他人\n',
          partnerInviteStatus: 'M 已报名',
          partnerInviter: '王储00',
          partnerInviterId: '01CEB4E16D2411E6A5C200163E0020D1',
          partnerInviterTime: 1565024400000,
          partnerJoinActivityId: '20190805',
          partnerJoinActivityPersonNum: null,
          partnerLastContactTime: '2019-08-06',
          partnerOrangePhone: null,
          partnerOwnStatus: 1,
          partnerRemark: null,
          personalRecommendations: null,
          position: '主任',
          practiceYear: null,
          province: '北京市',
          remark: null,
          sellerAlphaNames: [],
          tags: null,
          telephone: null,
          totalCourseCount: 0,
          userModify: '4F88225F1EC011E9A6AC7CD30AEB153E',
          wechatOnTheOrange: null,
          wechatOnThePhone: null
        },
        {
          alpAccountCategory: '团队版',
          alpActiveTime: '2019-01-22 15:55:56',
          alpAddTime: 1541388704000,
          alpOfficeCreatedTime: '2016-08-24 22:16:08',
          alphaUser: null,
          alphaUserNum: 963,
          antipathyLevel: null,
          area: '海淀区',
          baseId: 471909,
          birthday: null,
          birthdayYear: null,
          businessArea: null,
          chatGroup: null,
          city: '北京市',
          communicationStatus: null,
          country: '中国',
          courseCount: 0,
          customerIntent: null,
          customerLevel:
                        '{"大中台":"未接触；美国行","美国行":"M","证据智能系统":"M","大中台:未接触；美国行:A；D币系统:预测":"拜访","大中台:未接触；美国行:A；大中台:未接触；美国行:A；D币系统:预测:拜访；D币系统:预测":"拜访","D币系统":"预测","日本行":"M"}',
          decisionPoint: null,
          email: '23333333322@ss.com',
          gender: '女',
          gmtModify: '2019-09-29 20:02:24',
          icourtStudent: null,
          insId: 50077,
          institution: 'iCourt双师系统测试',
          intentLevel: null,
          invitationId: null,
          inviteRecord: null,
          inviteStatus: null,
          inviter: null,
          inviterId: null,
          inviterTime: null,
          isAlphaIns: true,
          isAlphaUser: true,
          isFutureLaw: true,
          isIcourtStudent: false,
          isLawCourseOnline: false,
          isMyCustomer: true,
          isSameArea: true,
          isUsaStudent: true,
          joinActivityId: null,
          joinActivityPersonNum: null,
          lastContactTime: null,
          lastLoginTime: null,
          lawFirmRecommendations: null,
          lengthOfPractice: null,
          licenseNumber: null,
          liveBaseId: null,
          memberNum: 980,
          message: null,
          mobilePhone: '13343345157',
          modifyUserName: '张三',
          monthReqTimes: 0,
          monthReqTimesStr: '无',
          name: '赵明',
          orangePhone: null,
          ownStatus: 0,
          partnerChatGroup: null,
          partnerDecisionPoint: null,
          partnerIntentLevel: null,
          partnerInvitationId: 2794,
          partnerInviteRecord:
                        '渠道：电话当日邀约报名 |  微信跟进报名 | 电话跟进报名 | 【姓名】推荐 | KP【姓名】 |  跟团队一起过来【团队联络人姓名】 \n联系的基本情况：【被邀请的情况概述，意愿判断的依据】\n是否知道iCourt：熟悉 | 知道 | 陌生\n课程参加意愿度：高 | 中 | 低\n报名几人来参加：\n下一步跟进计划：发送视频及文章 | 电话确认 |  引导带团队来 |  推荐其他人\n猜猜猜\n',
          partnerInviteStatus: 'A+ 联系企业家中',
          partnerInviter: '王储00',
          partnerInviterId: '01CEB4E16D2411E6A5C200163E0020D1',
          partnerInviterTime: 1569520800000,
          partnerJoinActivityId: null,
          partnerJoinActivityPersonNum: null,
          partnerLastContactTime: '2019-09-19',
          partnerOrangePhone: null,
          partnerOwnStatus: 1,
          partnerRemark: null,
          personalRecommendations: null,
          position: '副主任',
          practiceYear: null,
          province: '北京市',
          remark: null,
          sellerAlphaNames: [
            '王储00',
            null,
            '杨嘉钦',
            '刘宏建',
            '孙晟',
            '吴佳强',
            '王鹏'
          ],
          tags: null,
          telephone: null,
          totalCourseCount: 0,
          userModify: '27E8DA3B9EA911E8AAE67CD30AEB120C',
          wechatOnTheOrange: null,
          wechatOnThePhone: null
        },
        {
          alpAccountCategory: null,
          alpActiveTime: null,
          alpAddTime: null,
          alpOfficeCreatedTime: null,
          alphaUser: null,
          alphaUserNum: 963,
          antipathyLevel: null,
          area: '海淀区',
          baseId: 482710,
          birthday: null,
          birthdayYear: null,
          businessArea: null,
          chatGroup: null,
          city: '北京市',
          communicationStatus: null,
          country: '中国',
          courseCount: 0,
          customerIntent: null,
          customerLevel: null,
          decisionPoint: null,
          email: null,
          gender: '男',
          gmtModify: '2019-09-23 15:51:45',
          icourtStudent: null,
          insId: 50077,
          institution: 'iCourt双师系统测试',
          intentLevel: null,
          invitationId: null,
          inviteRecord: null,
          inviteStatus: null,
          inviter: null,
          inviterId: null,
          inviterTime: null,
          isAlphaIns: true,
          isAlphaUser: false,
          isFutureLaw: false,
          isIcourtStudent: false,
          isLawCourseOnline: false,
          isMyCustomer: false,
          isSameArea: true,
          isUsaStudent: false,
          joinActivityId: null,
          joinActivityPersonNum: null,
          lastContactTime: null,
          lastLoginTime: null,
          lawFirmRecommendations: null,
          lengthOfPractice: null,
          licenseNumber: null,
          liveBaseId: null,
          memberNum: 979,
          message: null,
          mobilePhone: '18518254398',
          modifyUserName: '杨晓风',
          monthReqTimes: null,
          monthReqTimesStr: '无',
          name: '张凯',
          orangePhone: null,
          ownStatus: 0,
          partnerChatGroup: null,
          partnerDecisionPoint: null,
          partnerIntentLevel: null,
          partnerInvitationId: 4964,
          partnerInviteRecord: null,
          partnerInviteStatus: 'A+ 联系企业家中',
          partnerInviter: '王储00',
          partnerInviterId: '01CEB4E16D2411E6A5C200163E0020D1',
          partnerInviterTime: null,
          partnerJoinActivityId: null,
          partnerJoinActivityPersonNum: null,
          partnerLastContactTime: null,
          partnerOrangePhone: null,
          partnerOwnStatus: 1,
          partnerRemark: null,
          personalRecommendations: null,
          position: '',
          practiceYear: null,
          province: '北京市',
          remark: null,
          sellerAlphaNames: ['孙晟', '王鹏'],
          tags: null,
          telephone: null,
          totalCourseCount: 0,
          userModify: '258F60FD658511E998137CD30AEB153E',
          wechatOnTheOrange: null,
          wechatOnThePhone: null
        },
        {
          alpAccountCategory: '团队版',
          alpActiveTime: null,
          alpAddTime: 1563001119000,
          alpOfficeCreatedTime: '2019-03-04 19:39:47',
          alphaUser: null,
          alphaUserNum: 963,
          antipathyLevel: null,
          area: '海淀区',
          baseId: 482709,
          birthday: null,
          birthdayYear: null,
          businessArea: null,
          chatGroup: null,
          city: '北京市',
          communicationStatus: null,
          country: '中国',
          courseCount: 0,
          customerIntent: null,
          customerLevel: null,
          decisionPoint: null,
          email: null,
          gender: '男',
          gmtModify: '2019-09-23 15:51:45',
          icourtStudent: null,
          insId: 50077,
          institution: 'iCourt双师系统测试',
          intentLevel: null,
          invitationId: null,
          inviteRecord: null,
          inviteStatus: null,
          inviter: null,
          inviterId: null,
          inviterTime: null,
          isAlphaIns: true,
          isAlphaUser: true,
          isFutureLaw: true,
          isIcourtStudent: false,
          isLawCourseOnline: false,
          isMyCustomer: false,
          isSameArea: true,
          isUsaStudent: false,
          joinActivityId: null,
          joinActivityPersonNum: null,
          lastContactTime: null,
          lastLoginTime: null,
          lawFirmRecommendations: null,
          lengthOfPractice: null,
          licenseNumber: null,
          liveBaseId: null,
          memberNum: 979,
          message: null,
          mobilePhone: '15801284402',
          modifyUserName: '杨晓风',
          monthReqTimes: 0,
          monthReqTimesStr: '无',
          name: '秦长超',
          orangePhone: null,
          ownStatus: 0,
          partnerChatGroup: null,
          partnerDecisionPoint: null,
          partnerIntentLevel: null,
          partnerInvitationId: 4965,
          partnerInviteRecord: null,
          partnerInviteStatus: 'A+ 联系企业家中',
          partnerInviter: '王储00',
          partnerInviterId: '01CEB4E16D2411E6A5C200163E0020D1',
          partnerInviterTime: null,
          partnerJoinActivityId: null,
          partnerJoinActivityPersonNum: null,
          partnerLastContactTime: null,
          partnerOrangePhone: null,
          partnerOwnStatus: 1,
          partnerRemark: null,
          personalRecommendations: null,
          position: '',
          practiceYear: null,
          province: '北京市',
          remark: null,
          sellerAlphaNames: ['孙晟', '王鹏'],
          tags: null,
          telephone: null,
          totalCourseCount: 0,
          userModify: '258F60FD658511E998137CD30AEB153E',
          wechatOnTheOrange: null,
          wechatOnThePhone: null
        },
        {
          alpAccountCategory: null,
          alpActiveTime: null,
          alpAddTime: null,
          alpOfficeCreatedTime: null,
          alphaUser: null,
          alphaUserNum: 0,
          antipathyLevel: null,
          area: '朝阳区',
          baseId: 3784,
          birthday: 357494400000,
          birthdayYear: null,
          businessArea: null,
          chatGroup: null,
          city: '北京市',
          communicationStatus: null,
          country: '中国',
          courseCount: 0,
          customerIntent: null,
          customerLevel: null,
          decisionPoint: null,
          email: null,
          gender: '女',
          gmtModify: '2019-09-23 15:51:45',
          icourtStudent: null,
          insId: 3815,
          institution: '北京市齐进律师事务所',
          intentLevel: null,
          invitationId: null,
          inviteRecord: null,
          inviteStatus: null,
          inviter: null,
          inviterId: null,
          inviterTime: null,
          isAlphaIns: false,
          isAlphaUser: false,
          isFutureLaw: false,
          isIcourtStudent: false,
          isLawCourseOnline: false,
          isMyCustomer: false,
          isSameArea: true,
          isUsaStudent: false,
          joinActivityId: null,
          joinActivityPersonNum: null,
          lastContactTime: null,
          lastLoginTime: null,
          lawFirmRecommendations: null,
          lengthOfPractice: 10,
          licenseNumber: '11101201011499172',
          liveBaseId: null,
          memberNum: 1,
          message: null,
          mobilePhone: null,
          modifyUserName: '高健1',
          monthReqTimes: null,
          monthReqTimesStr: '无',
          name: '王静',
          orangePhone: null,
          ownStatus: 0,
          partnerChatGroup: null,
          partnerDecisionPoint: null,
          partnerIntentLevel: null,
          partnerInvitationId: 4966,
          partnerInviteRecord: null,
          partnerInviteStatus: 'A+ 联系企业家中',
          partnerInviter: '王储00',
          partnerInviterId: '01CEB4E16D2411E6A5C200163E0020D1',
          partnerInviterTime: null,
          partnerJoinActivityId: null,
          partnerJoinActivityPersonNum: null,
          partnerLastContactTime: null,
          partnerOrangePhone: null,
          partnerOwnStatus: 1,
          partnerRemark: null,
          personalRecommendations: null,
          position: '未知',
          practiceYear: null,
          province: '北京市',
          remark: null,
          sellerAlphaNames: ['孙晟', '王鹏'],
          tags: null,
          telephone: null,
          totalCourseCount: 0,
          userModify: '4E30535EF9D211E7A23000163E0691A5',
          wechatOnTheOrange: null,
          wechatOnThePhone: null
        },
        {
          alpAccountCategory: null,
          alpActiveTime: null,
          alpAddTime: null,
          alpOfficeCreatedTime: null,
          alphaUser: null,
          alphaUserNum: 0,
          antipathyLevel: null,
          area: '和平区',
          baseId: 482708,
          birthday: null,
          birthdayYear: null,
          businessArea: null,
          chatGroup: null,
          city: '天津市',
          communicationStatus: null,
          country: '中国',
          courseCount: 0,
          customerIntent: null,
          customerLevel: null,
          decisionPoint: null,
          email: '',
          gender: '男',
          gmtModify: '2019-09-23 15:51:45',
          icourtStudent: null,
          insId: 10955,
          institution: '天津国嘉律师事务所',
          intentLevel: null,
          invitationId: null,
          inviteRecord: null,
          inviteStatus: null,
          inviter: null,
          inviterId: null,
          inviterTime: null,
          isAlphaIns: false,
          isAlphaUser: false,
          isFutureLaw: false,
          isIcourtStudent: false,
          isLawCourseOnline: false,
          isMyCustomer: false,
          isSameArea: true,
          isUsaStudent: false,
          joinActivityId: null,
          joinActivityPersonNum: null,
          lastContactTime: null,
          lastLoginTime: null,
          lawFirmRecommendations: null,
          lengthOfPractice: null,
          licenseNumber: null,
          liveBaseId: null,
          memberNum: 1,
          message: null,
          mobilePhone: '18322343456',
          modifyUserName: '王储00',
          monthReqTimes: null,
          monthReqTimesStr: '无',
          name: '康师傅',
          orangePhone: null,
          ownStatus: 0,
          partnerChatGroup: null,
          partnerDecisionPoint: null,
          partnerIntentLevel: null,
          partnerInvitationId: 4967,
          partnerInviteRecord: null,
          partnerInviteStatus: 'A+ 联系企业家中',
          partnerInviter: '王储00',
          partnerInviterId: '01CEB4E16D2411E6A5C200163E0020D1',
          partnerInviterTime: null,
          partnerJoinActivityId: null,
          partnerJoinActivityPersonNum: null,
          partnerLastContactTime: null,
          partnerOrangePhone: null,
          partnerOwnStatus: 1,
          partnerRemark: null,
          personalRecommendations: null,
          position: '主任',
          practiceYear: null,
          province: '天津市',
          remark: null,
          sellerAlphaNames: [],
          tags: null,
          telephone: null,
          totalCourseCount: 0,
          userModify: '01CEB4E16D2411E6A5C200163E0020D1',
          wechatOnTheOrange: null,
          wechatOnThePhone: null
        },
        {
          alpAccountCategory: null,
          alpActiveTime: null,
          alpAddTime: null,
          alpOfficeCreatedTime: null,
          alphaUser: null,
          alphaUserNum: 0,
          antipathyLevel: null,
          area: '朝阳区',
          baseId: 482367,
          birthday: null,
          birthdayYear: null,
          businessArea: null,
          chatGroup: null,
          city: '北京市',
          communicationStatus: null,
          country: '中国',
          courseCount: 0,
          customerIntent: null,
          customerLevel: null,
          decisionPoint: null,
          email: null,
          gender: '女',
          gmtModify: '2019-09-23 15:51:45',
          icourtStudent: null,
          insId: 3874,
          institution: '北京市国汉律师事务所',
          intentLevel: null,
          invitationId: null,
          inviteRecord: null,
          inviteStatus: null,
          inviter: null,
          inviterId: null,
          inviterTime: null,
          isAlphaIns: false,
          isAlphaUser: null,
          isFutureLaw: false,
          isIcourtStudent: null,
          isLawCourseOnline: false,
          isMyCustomer: false,
          isSameArea: true,
          isUsaStudent: false,
          joinActivityId: null,
          joinActivityPersonNum: null,
          lastContactTime: null,
          lastLoginTime: null,
          lawFirmRecommendations: null,
          lengthOfPractice: null,
          licenseNumber: '11101201410627380',
          liveBaseId: null,
          memberNum: 15,
          message: null,
          mobilePhone: null,
          modifyUserName: null,
          monthReqTimes: null,
          monthReqTimesStr: '无',
          name: '刘超',
          orangePhone: null,
          ownStatus: 0,
          partnerChatGroup: null,
          partnerDecisionPoint: null,
          partnerIntentLevel: null,
          partnerInvitationId: 4968,
          partnerInviteRecord: null,
          partnerInviteStatus: 'A+ 联系企业家中',
          partnerInviter: '王储00',
          partnerInviterId: '01CEB4E16D2411E6A5C200163E0020D1',
          partnerInviterTime: null,
          partnerJoinActivityId: null,
          partnerJoinActivityPersonNum: null,
          partnerLastContactTime: null,
          partnerOrangePhone: null,
          partnerOwnStatus: 1,
          partnerRemark: null,
          personalRecommendations: null,
          position: null,
          practiceYear: null,
          province: '北京市',
          remark: null,
          sellerAlphaNames: [],
          tags: null,
          telephone: null,
          totalCourseCount: 0,
          userModify: 'DATA_TRANSFER',
          wechatOnTheOrange: null,
          wechatOnThePhone: null
        },
        {
          alpAccountCategory: null,
          alpActiveTime: null,
          alpAddTime: null,
          alpOfficeCreatedTime: null,
          alphaUser: null,
          alphaUserNum: 1,
          antipathyLevel: null,
          area: '西夏区',
          baseId: 181091,
          birthday: 153849600000,
          birthdayYear: null,
          businessArea: null,
          chatGroup: null,
          city: '银川市',
          communicationStatus: null,
          country: '中国',
          courseCount: 0,
          customerIntent: null,
          customerLevel: '{"美国行":"M"}',
          decisionPoint: null,
          email: 'Wuyingxue135@163.com',
          gender: '女',
          gmtModify: '2019-09-23 15:51:45',
          icourtStudent: null,
          insId: 25588,
          institution: '宁夏昊诺律师事务所',
          intentLevel: null,
          invitationId: null,
          inviteRecord: null,
          inviteStatus: null,
          inviter: null,
          inviterId: null,
          inviterTime: null,
          isAlphaIns: false,
          isAlphaUser: false,
          isFutureLaw: true,
          isIcourtStudent: false,
          isLawCourseOnline: false,
          isMyCustomer: false,
          isSameArea: true,
          isUsaStudent: true,
          joinActivityId: null,
          joinActivityPersonNum: null,
          lastContactTime: null,
          lastLoginTime: null,
          lawFirmRecommendations: null,
          lengthOfPractice: 7,
          licenseNumber: '16401201211436285',
          liveBaseId: null,
          memberNum: 1,
          message: null,
          mobilePhone: '13895688477',
          modifyUserName: '岳婷',
          monthReqTimes: null,
          monthReqTimesStr: '无',
          name: '吴迎雪',
          orangePhone: null,
          ownStatus: 0,
          partnerChatGroup: null,
          partnerDecisionPoint: null,
          partnerIntentLevel: null,
          partnerInvitationId: 4027,
          partnerInviteRecord: null,
          partnerInviteStatus: 'A+ 联系企业家中',
          partnerInviter: '王储00',
          partnerInviterId: '01CEB4E16D2411E6A5C200163E0020D1',
          partnerInviterTime: null,
          partnerJoinActivityId: null,
          partnerJoinActivityPersonNum: null,
          partnerLastContactTime: null,
          partnerOrangePhone: null,
          partnerOwnStatus: 1,
          partnerRemark: null,
          personalRecommendations: null,
          position: '未知',
          practiceYear: null,
          province: '宁夏回族自治区',
          remark: null,
          sellerAlphaNames: ['岳婷', '刘宏建', '孙晟'],
          tags: null,
          telephone: null,
          totalCourseCount: 0,
          userModify: '0B69D893FDB811E8A6AC7CD30AEB153E',
          wechatOnTheOrange: null,
          wechatOnThePhone: null
        },
        {
          alpAccountCategory: null,
          alpActiveTime: null,
          alpAddTime: null,
          alpOfficeCreatedTime: null,
          alphaUser: null,
          alphaUserNum: 1,
          antipathyLevel: null,
          area: '朝阳区',
          baseId: 482251,
          birthday: null,
          birthdayYear: null,
          businessArea: null,
          chatGroup: null,
          city: '北京市',
          communicationStatus: null,
          country: '中国',
          courseCount: 0,
          customerIntent: null,
          customerLevel: '{"课程":"接触"}',
          decisionPoint: null,
          email: '',
          gender: '男',
          gmtModify: '2019-09-02 15:59:36',
          icourtStudent: null,
          insId: 3,
          institution: '北京市永浩律师事务所',
          intentLevel: null,
          invitationId: 2211,
          inviteRecord: null,
          inviteStatus: '已联系',
          inviter: null,
          inviterId: null,
          inviterTime: null,
          isAlphaIns: true,
          isAlphaUser: false,
          isFutureLaw: false,
          isIcourtStudent: false,
          isLawCourseOnline: false,
          isMyCustomer: false,
          isSameArea: true,
          isUsaStudent: false,
          joinActivityId: null,
          joinActivityPersonNum: null,
          lastContactTime: null,
          lastLoginTime: null,
          lawFirmRecommendations: null,
          lengthOfPractice: null,
          licenseNumber: null,
          liveBaseId: null,
          memberNum: 8,
          message: null,
          mobilePhone: '18322695915',
          modifyUserName: '王储00',
          monthReqTimes: null,
          monthReqTimesStr: '无',
          name: '焦磊',
          orangePhone: null,
          ownStatus: 0,
          partnerChatGroup: null,
          partnerDecisionPoint: null,
          partnerIntentLevel: null,
          partnerInvitationId: 2796,
          partnerInviteRecord:
                        '渠道：电话当日邀约报名 |  微信跟进报名 | 电话跟进报名 | 【姓名】推荐 | KP【姓名】 |  跟团队一起过来【团队联络人姓名】 \n联系的基本情况：【被邀请的情况概述，意愿判断的依据】\n是否知道iCourt：熟悉 | 知道 | 陌生\n课程参加意愿度：高 | 中 | 低\n报名几人来参加：\n下一步跟进计划：发送视频及文章 | 电话确认 |  引导带团队来 |  推荐其他人\n渠道：电话当日邀约报名 |  微信跟进报名 | 电话跟进报名 | 【姓名】推荐 | KP【姓名】 |  跟团队一起过来【团队联络人姓名】 \n联系的基本情况：【被邀请的情况概述，意愿判断的依据】\n是否知道iCourt：熟悉 | 知道 | 陌生\n课程参加意愿度：高 | 中 | 低\n报名几人来参加：\n下一步跟进计划：发送视频及文章 | 电话确认 |  引导带团队来 |  推荐其他人\n',
          partnerInviteStatus: 'M 已报名',
          partnerInviter: '王储00',
          partnerInviterId: '01CEB4E16D2411E6A5C200163E0020D1',
          partnerInviterTime: 1567360800000,
          partnerJoinActivityId: '20190830g',
          partnerJoinActivityPersonNum: null,
          partnerLastContactTime: '2019-09-11',
          partnerOrangePhone: null,
          partnerOwnStatus: 1,
          partnerRemark: null,
          personalRecommendations: null,
          position: '律师',
          practiceYear: null,
          province: '北京市',
          remark: null,
          sellerAlphaNames: ['吴佳强'],
          tags: null,
          telephone: null,
          totalCourseCount: 0,
          userModify: '01CEB4E16D2411E6A5C200163E0020D1',
          wechatOnTheOrange: null,
          wechatOnThePhone: null
        }
      ],
      isAddShow: false
    }
  },
  mounted() {
    getInputData({
      pageNo: 1,
      pageSize: 10,
      inviter: '01CEB4E16D2411E6A5C200163E0020D1'
    }).then(res => {
      console.log(res.data)
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    addUserDialog() {
      this.isAddShow = true
    },
    handClick(flag) {
      this.isAddShow = flag
    },
    editorModel(column) {
      console.log(column)
      this.flag = true
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('保存信息成功!')
          this.flag = !this.flag
        } else {
          this.$Message.error('验证表单失败!')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.other-btn-group {
    margin: 5px 0;
    height: 60px;
    line-height: 60px;
    .el-button {
        font-size: 12px;
    }
    .other-btn-left {
        float: left;
        margin-left: 25px;
    }
    .other-btn-left > .el-button {
        background-color: #f7f7f7;
    }
    .other-btn-right {
        float: right;
        margin-right: 25px;
    }
}
.tableData {
    width: 96%;
    height: auto;
    margin: 2%;
}
.ivu-table-wrapper {
    border: 1px solid #dddee1;
}
.ivu-page {
    justify-content: flex-end;
    margin-top: 1%;
}
.ivu-table-cell {
    div {
        button {
            background: white;
            border: 1px solid #cfc7c1;
            color: #4a4a4a;
            margin: 0 1px;
            &:last-child {
                background: #ebebee;
                color: #a9a9a9;
                border: none;
            }
        }
    }
}
</style>
