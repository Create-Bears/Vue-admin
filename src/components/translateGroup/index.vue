<template>
  <ul>
    <translateItem 
    v-for="(item,index) in data" 
    :key="index"
    :data="item"
    ></translateItem>
  </ul>
</template>

<script>
import translateItem from "../translateItem/index.vue";

const FORM_TYPES = {
  input: "input",
  range: "range",
  select: "select",
  multiSelect: "multiSelect",
  booleanSelect: "booleanSelect",
  rangeDate: "rangeDate",
  singleDate: "singleDate"
};

const BOOLEAN_SELECT_OPTIONS = [
  { value: "true", label: "是" },
  { value: "false", label: "否" }
];

// const FETCH_OPTIONS_FNS = {
//   sellerAlphaId: getOrangeSellerList,
//   activityId: fetchProductList, // 获取产品名称
//   joinActivityId: fetchActivityList, // 获取具体的活动名称
//   teamId: fetchTeams,
//   coursesTakenId: fetchCourseList,
//   contactSellerId: fetchContactSellerId,
//   intentLevel: fetchIntentLevel
// }
export default {
  data() {
    return {
      data: {
        name: {
          type: FORM_TYPES.input,
          label: "姓名",
          key: "name",
          default: null,
          placeholder: "输入姓名"
        },
        institution: {
          type: FORM_TYPES.input,
          label: "所在机构",
          key: "institution",
          default: null,
          placeholder: "请填写所在机构"
        },
        phone: {
          type: FORM_TYPES.input,
          label: "手机号",
          key: "phone",
          default: null,
          placeholder: "请填写手机号"
        },
        position: {
          type: FORM_TYPES.multiSelect,
          label: "职务",
          key: "position",
          placeholder: "请选择职务",
          default: null,
          configskey: "position"
        },
        courseNumber: {
          type: FORM_TYPES.range,
          label: "课程次数",
          minKey: "minCourseNumber",
          maxKey: "maxCourseNumber",
          default: null
        },
        isAlphaUser: {
          type: FORM_TYPES.booleanSelect,
          label: "是否Alpha用户",
          key: "isAlphaUser",
          placeholder: "是否Alpha用户",
          default: null,
          options: BOOLEAN_SELECT_OPTIONS
        },
        isIcourtStudent: {
          type: FORM_TYPES.booleanSelect,
          label: "是否iCourt学员",
          key: "isIcourtStudent",
          placeholder: "是否iCourt学员",
          default: null,
          options: BOOLEAN_SELECT_OPTIONS
        },
        coursesTakenId: {
          type: FORM_TYPES.multiSelect,
          label: "上过的课程",
          key: "coursesTakenId",
          default: null,
          filterable: true
          // fetchOptionFn: FETCH_OPTIONS_FNS.coursesTakenId
        },
        courseName: {
          type: FORM_TYPES.input,
          label: "课程名",
          key: "courseName",
          default: null
        },
        province: {
          type: FORM_TYPES.multiSelect,
          label: "选择省",
          key: "province",
          placeholder: "选择省",
          default: null
        },
        city: {
          type: FORM_TYPES.multiSelect,
          label: "选择市",
          key: "city",
          placeholder: "选择市",
          default: null
        },
        area: {
          type: FORM_TYPES.multiSelect,
          label: "选择区县",
          key: "area",
          placeholder: "选择区县",
          default: null
        },
        tags: {
          type: FORM_TYPES.multiSelect,
          label: "标签",
          key: "tags",
          placeholder: "选择标签",
          default: null,
          configskey: "userTags"
        },
        userTagsFlag: {
          type: FORM_TYPES.booleanSelect,
          label: "是否为排除标签中所选",
          key: "userTagsFlag",
          placeholder: "是否为排除标签中所选",
          default: null,
          options: BOOLEAN_SELECT_OPTIONS
        },
        inviteStatus: {
          type: FORM_TYPES.multiSelect,
          label: "邀请状态",
          key: "stockrightInviteStatus",
          placeholder: "选择邀请状态",
          default: null,
          configskey: "stockrightInviteStatus",
          appendOptions: [{ label: "空", value: "空" }]
        },
        inviter: {
          type: FORM_TYPES.multiSelect,
          label: "邀请人",
          key: "inviter",
          placeholder: "选择邀请人",
          default: null,
          filterable: true,
          // fetchOptionFn: FETCH_OPTIONS_FNS.sellerAlphaId,
          appendOptions: [{ label: "空", value: "空" }]
        },
        myInvitionTime: {
          type: FORM_TYPES.rangeDate,
          label: "邀请时间筛选",
          minKey: "minInvitationTime",
          maxKey: "maxInvitationTime",
          default: null
        },
        content: {
          type: FORM_TYPES.input,
          label: "跟进记录",
          key: "content",
          default: null,
          placeholder: "跟进记录"
        },
        lastContactTime: {
          type: FORM_TYPES.singleDate,
          label: "最后联系时间",
          key: "lastContactTime",
          default: null
        },
        intentLevel: {
          type: FORM_TYPES.multiSelect,
          label: "邀请级别",
          key: "intentLevel",
          default: null,
          configskey: "intentLevel"
          // fetchOptionFn: FETCH_OPTIONS_FNS.intentLevel
        },
        orangePhone: {
          type: FORM_TYPES.input,
          label: "橙子手机",
          key: "orangePhone",
          default: null
        },
        chatGroup: {
          type: FORM_TYPES.input,
          label: "所在群",
          key: "chatGroup",
          default: null
        },
        remark: {
          type: FORM_TYPES.input,
          label: "备注",
          key: "remark",
          default: null
        },
        lengthOfPractice: {
          type: FORM_TYPES.range,
          label: "执业年限",
          minKey: "minLengthOfPractice",
          maxKey: "maxLengthOfPractice",
          placeholder: "请输入执业年限",
          default: null
        },
        birthday: {
          type: FORM_TYPES.rangeDate,
          label: "出生日期",
          minKey: "minBirthday",
          maxKey: "maxBirthday",
          placeholder: "请输入出生日期",
          default: null
        },
        futureLawFlag: {
          type: FORM_TYPES.booleanSelect,
          label: "是否参加活动",
          key: "futureLawFlag",
          default: null,
          options: BOOLEAN_SELECT_OPTIONS
        },
        activityType: {
          type: FORM_TYPES.multiSelect,
          label: "活动类型",
          key: "activityType",
          placeholder: "活动类型",
          default: null,
          filterable: true,
          configskey: "activitySysType"
        },
        sign: {
          type: FORM_TYPES.booleanSelect,
          label: "是否签到",
          key: "sign",
          default: null,
          options: BOOLEAN_SELECT_OPTIONS
        },
        joinActivityId: {
          type: FORM_TYPES.multiSelect,
          label: "参加时间",
          key: "joinActivityId",
          placeholder: "参加时间",
          default: null
          // fetchOptionFn: FETCH_OPTIONS_FNS.joinActivityId
        },
        isOrNot: {
          type: FORM_TYPES.booleanSelect,
          label: "是否购买该产品",
          key: "isOrNot",
          default: null,
          options: BOOLEAN_SELECT_OPTIONS
        },
        type: {
          type: FORM_TYPES.multiSelect,
          label: "产品类型",
          key: "type",
          placeholder: "产品类型",
          default: null,
          filterable: true,
          configskey: "customerIntent"
        },
        activityId: {
          type: FORM_TYPES.multiSelect,
          label: "产品名称",
          key: "activityId",
          placeholder: "产品名称",
          default: null,
          filterable: true
          // fetchOptionFn: FETCH_OPTIONS_FNS.activityId
        },
        lastLoginTime: {
          type: FORM_TYPES.rangeDate,
          label: "最近一次登录时间",
          minKey: "minLastLoginTime",
          maxKey: "maxLastLoginTime",
          default: null
        },
        contactSellerId: {
          type: FORM_TYPES.multiSelect,
          label: "跟进人",
          key: "contactSellerId",
          default: null,
          filterable: true
          // fetchOptionFn: FETCH_OPTIONS_FNS.contactSellerId
        },
        inviterTime: {
          type: FORM_TYPES.rangeDate,
          label: "计划跟进日期",
          minKey: "feedDateStart",
          maxKey: "feedDateEnd",
          default: null
        },
        monthReqTimes: {
          type: FORM_TYPES.select,
          label: "近一个月使用次数",
          key: "monthReqTimes",
          default: null,
          configskey: "alphaMonthReqTimes"
        },
        upDataTime: {
          type: FORM_TYPES.rangeDate,
          label: "新增邀请日期",
          minKey: "increaseInviterBeginTime",
          maxKey: "increaseInviterEndTime",
          default: null
        }
      }
    };
  },
  components: {
    translateItem
  }
};
</script>

<style lang="scss">
</style>