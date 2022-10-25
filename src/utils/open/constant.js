/**
 * 系统常量脚本
 */
export default {
  /**
   * 环境配置
   */
  isDevelop: process.env.NODE_ENV === 'development', // 是否开发坏境
  debug: true,
  isRouterHistory: false, // 路由模式 true:history; false:hash
  loadAllData: {},
  analysisUserData: {},
  rightAswerObj: {}, // 每次考试的正确答案
  countAllData: {}, // 统计每次答题情况（主要是分析出错情况）
  userOtherInfo: {}, // 比如考生答题次数，章节对应的题目数，答题数，正确数，错误数
  charpterExamNum: {}, // 统计章节对应的题目总数
  subjectData: {}, // 题目数对应的考生答题情况
  chapterAnswerData: {}, // 各章节的正确答案+章节名称+章节索引
  tableOprationData: {}, // 存储表格操作记录，比如排序的toggle
  rightTdDom: null, // table head td 正确答案单元格
  subjectAllList: {}, // 所有考试的题目，按日期分
  dateList: [
    { value: '20221018', label: '2022.10.18' },
    { value: '20221019', label: '2022.10.19' },
    { value: '20221020', label: '2022.10.20' },
    { value: '20221021', label: '2022.10.21' },
    { value: '20221024', label: '2022.10.24' },
    { value: '20221025', label: '2022.10.25' }
  ],
  /**
   * 章节
   */
  chapterList: [
    {
      label: '第一章 引论', value: 1,
      children: [
        { label: '1.1 指南概述呵呵目的', value: 1.1 },
        { label: '1.2 基本要素', value: 1.2 }
      ]
    },
    {
      label: '第二章 项目运行坏境', value: 2,
      children: [
        { label: '2.1 概述', value: 2.1 },
        { label: '2.2 事业坏境因素', value: 2.2 },
        { label: '2.3 组织过程资产', value: 2.3 },
        { label: '2.4 组织系统', value: 2.4 }
      ]
    },
    {
      label: '第三章 项目经理角色', value: 3,
      children: [
        { label: '3.1 概述', value: 3.1 },
        { label: '3.2 项目经理的定义', value: 3.2 },
        { label: '3.3 项目经理的影响力范围', value: 3.3 },
        { label: '3.4 项目经理的能力', value: 3.4 },
        { label: '3.5 执行整合', value: 3.5 }
      ]
    },
    {
      label: '第四章 项目整合管理', value: 4,
      children: [
        { label: '4.1 制定项目章程', value: 4.1 },
        { label: '4.2 制定项目管理计划', value: 4.2 },
        { label: '4.3 指导与管理项目工作', value: 4.3 },
        { label: '4.4 管理项目知识', value: 4.4 },
        { label: '4.5 监控项目工作', value: 4.5 },
        { label: '4.6 实施整体变更与控制', value: 4.6 },
        { label: '4.7 结束项目或阶段', value: 4.7 }
      ]
    },
    {
      label: '第五章 项目范围管理', value: 5,
      children: [
        { label: '5.1 规划范围管理', value: 5.1 },
        { label: '5.2 收集需求', value: 5.2 },
        { label: '5.3 定义范围', value: 5.3 },
        { label: '5.4 创建WBS', value: 5.4 },
        { label: '5.5 确认范围', value: 5.5 },
        { label: '5.6 控制范围', value: 5.6 }
      ]
    },
    {
      label: '第六章 项目进度管理', value: 6,
      children: [
        { label: '6.1 规划进度管理', value: 6.1 },
        { label: '6.2 定义活动', value: 6.2 },
        { label: '6.3 排列活动顺序', value: 6.3 },
        { label: '6.4 估算活动持续时间', value: 6.4 },
        { label: '6.5 制定进度计划', value: 6.5 },
        { label: '6.6 控制进度', value: 6.6 }
      ]
    },
    {
      label: '第七章 项目成本管理', value: 7,
      children: [
        { label: '7.1 规划成本管理', value: 7.1 },
        { label: '7.2 估算成本', value: 7.2 },
        { label: '7.3 制定预算', value: 7.3 },
        { label: '7.4 控制成本', value: 7.4 }
      ]
    },
    {
      label: '第八章 项目质量管理', value: 8,
      children: [
        { label: '8.1 规划质量管理', value: 8.1 },
        { label: '8.2 管理质量', value: 8.2 },
        { label: '8.3 控制质量', value: 8.3 }
      ]
    },
    {
      label: '第九章 项目资源管理', value: 9,
      children: [
        { label: '9.1 规划资源管理', value: 9.1 },
        { label: '9.2 估算活动资源', value: 9.2 },
        { label: '9.3 获取资源', value: 9.3 },
        { label: '9.4 建设团队', value: 9.4 },
        { label: '9.5 管理团队', value: 9.5 },
        { label: '9.6 控制资源', value: 9.6 }
      ]
    },
    {
      label: '第十章 项目沟通管理', value: 0,
      children: [
        { label: '10.1 规划沟通管理', value: 10.1 },
        { label: '10.2 管理沟通', value: 10.2 },
        { label: '10.3 监督沟通', value: 10.3 }
      ]
    },
    {
      label: '第十一章 项目风险管理', value: 11,
      children: [
        { label: '11.1 规划风险管理', value: 11.1 },
        { label: '11.2 识别风险', value: 11.2 },
        { label: '11.3 实施定性风险分析', value: 11.3 },
        { label: '11.4 实施定量风险分析', value: 11.4 },
        { label: '11.5 规划风险应对', value: 11.5 },
        { label: '11.6 实施风险应对', value: 11.6 },
        { label: '11.7 监督风险应对', value: 11.7 }
      ]
    },
    {
      label: '第十二章 项目采购管理', value: 12,
      children: [
        { label: '12.1 规划采购管理', value: 12.1 },
        { label: '12.2 管理采购', value: 12.2 },
        { label: '12.3 控制采购', value: 12.3 }
      ]
    },
    {
      label: '第十三章 项目相关方管理', value: 13,
      children: [
        { label: '13.1 识别相关方', value: 13.1 },
        { label: '13.2 规划相关方参与', value: 13.2 },
        { label: '13.3 管理相关方参与', value: 13.3 },
        { label: '13.4 监督相关方参与', value: 13.4 }
      ]
    },
    // 敏捷实践只能是最后一个，有js逻辑绑定
    {
      label: '敏捷实践指南', value: 14,
      children: [
        { label: '敏捷实践指南', value: 14 }
      ]
    }
  ]
}
// views/common/common-features
