
/** 正确答  */
var rigthAnswer = ' CAACC  BDCBC'

var rightAnswerA = `
c	8.2.2.5
a	4.6
a	4.2.2.4
c	7.2.2.2
c	12.3.2.5
b	4.3.2.1
d	12.3.2.3
c	敏捷实践指南
b	13.2
c	13
`

/** 接龙数据 */
var allData = `

1. 林英 DBACA  CAAAB
2. 易江涛 CCACC BDCBC
3. 王鑫 BCACD BCCBB
4. 陈少芬 CAACC BDCBC
5. 黄雅君 BCACC BCCBC
6. 郑鸿斌 CBACCBDABC
7. 熊佳 CDACA CDABC
8. 卢维荣 CDACC BDCAC
9. 等等 CDCCC BCBBC
10. 李翠艳 CCABB BDBAB
11. 旭 BDCCAADAAC
12. 陈小棋 CDACC BDABC
13. 刘思婷 CDACCBDABC
14. 钟洁莹 BCACD BDCBB
15. 袁天赐 bcabc  bdcac
16. 莫德坚 DBCBC BACAC
17. 赵艳焜 ACACC BDCBC
18. 阮晓梦 BCACA  BCCBC
19. 唐泷彪 CCACB  BDCBC
20. 陈庆娇 BBABD CDABC
21. 谢成寿 BAACC BDAAC
22. 雪落无痕 CCCCA BCABB
23. 李凯旋 DCCCB DCABC
24. 洪俊鑫 CADBA CACBC
25. 陈书婷 BBCAA BDCBC
26. 于涛 DCCCA CDCBC
27. 汪关心 BACCC. BDCBB
28. 艾克丝 BAACD BDCBB
29. 陈妙玲 DCACC BDCBC
30. 温炳辉 CAACC BDCBC
31. 陈永发 CBCCD BBCBC
32. NICOLE CAACC BDCBC
33. 慌、如隔世 CACADDBCAB
34. 李勇发 CBABD CBABA
35. @%@ BCDCA DBCBB
36. 汤燕婷 CCCCA  BCABC
37. jo an na CACAD DDCBB
38. 邱婉菡 BAACB BCBBC
39. 胡林宇 CBDBD DBABC
40. 秦敏 BCCCD CCADC
41. 陆婉仪 BDABC BDACC
42. 阿狸 ACACC BCAAB
43. 郭晓丽 CCCCC DCCBC
44. 何文槺 DDCCB DCCDC
45. 郑舒颖 CBCCD BCCBB

`

/**
 * 试题
 * 题目之间的间隔符：  ==-=--=
 * 答案间隔符： |*|*|
 * **/
var testQuestion = `

1、  在一个公路施工项中，最近出现了返工的情况，导致项目经理非常担心项目的不一致性成本。项目经理来寻求你的帮助。你能给他的最好的建议是？
In a road construction project, the rework that happened lately makes the project manager very concerned about the inconsistency cost of no-conformance. The project manager turns to you for help. What is the best advice you can offer?

 A ：重新进行规划质量管理过程 To re-plan the quality management process

 B ：加强质量控制 To strengthen the quality control

 C ：开展质量审计 To perform quality audit

 D ：开展标杆对照 To carry out benchmarking control

|*|*|正确答案：C 
解析：知识点出处： PMBOK 6th 页码：P295 章节：8.2.2.5 审计：采取后续措施纠正问题，可以降低质量成本，并提高发起人或客户对项目产品的接受度。 审计可以降低质量成本。


==-=--=


2、 一家公司已与一家水电站签订了软件开发合同。项目管理计划指定Scrum作为开发方法。在项目的几次冲刺阶段，监管机构通知执行机构，由于新的环境法，原本不包括在范围基准中的安全功能将需要被内置到软件中。项目经理的最佳行动方案是什么？
A company has been contracted to develop software for a hydroelectric plant. The project management plan specifies Scrum as the development approach. Few sprints into the project, regulators notify the performing organization that due to new environmental laws, safety features originally not included in the scope baseline will need to be built into the software. What is the project manager's best course of action?

 A ： 发出变更请求以更新项目管理计划，一旦获得批准，确保范围基准得到更新 Issue a change request to update the project management plan and, once approved, ensure that the scope baseline is updated

 B ：与产品负责人进行根本原因分析，以确定为安全功能最初未包含在范围中的原因 Conduct a root cause analysts with the product owner to determine why the safety features were not included in the scope in the first place

 C ：使用MoSCoW优先级模型来梳理范围基准，并将新的安全功能分类为"应具有" Use the MoSCoW model of prioritization to groom the scope baseline and categorize the new safety features as "should have"

 D ：在冲刺计划期间与团队讨论新功能，如果团队同意，请他们在下次冲刺中实现功能 Discuss the new features with the team during sprint planning and if the team agrees, ask them to implement the features in the next sprint

|*|*|正确答案：A 
解析：知识点出处： PMBOK 6th 页码：P113 章节：4.6 变更流程：变更提出后，先分析影响，再提交含解决措施的变更请求给 CCB 存在范围基准，说明使用了混合方法 改变了范围基准，需要提交变更请求。


==-=--=


3、 由于没有空，具有批准权限的相关方拒绝了参与项目开工会议的邀请。该项目时间紧迫，及时开工对于满足截止日期至关重要。项目经理应该做什么？
Due to the lack of time, interested parties with approval authority rejected the invitation to participate in the kick-off meeting. The project is urgent, and timely start-up is essential to meet the deadline. What should the project manager do?

 A ： 升级上报给项目发起人 The upgrade is reported to the project sponsor

 B ：在没有他们参加的情况下举行项目开工会议 Hold project kick-off meeting without their participation

 C ：将会议重新安排在他们能够参与的时间 Reschedule the meeting at a time when they can participate

 D ：询问与会者以确定开工会议是否有必要 Ask participants to determine if a kick-off meeting is necessary

|*|*|正确答案：A 
解析：知识点出处： PMBOK 6th 页码：P86 章节：4.2.2.4 Kick-off 会议：项目开工会议通常意味着规 划阶段结束和执行阶段开始， 旨在传达项目目标、获得团队对项目的承诺，以及阐明每个相关方的角色和职责。规划已经结束，就等着审批后执行了，此时应尽快解决。


==-=--=


4、 项目经理正在制定一个项目计划。项目赞助人得知后，立即让项目经理针对项目成本开展初始粗略评估，以满足未来财政预算的需求。项目经理采用下列哪一项评估项目成本？
The project manager is developing a project plan, on short notice project sponsor asks the project manager to create an initial rough estimate of project cost to satisfy requirements for the upcoming fiscal budget. The project manager uses which of the following for estimating the project cost?

 A ：自下而上估算 Bottom-up estimating

 B ：三点结算 Three-point estimating

 C ： 类比估算 Analogous estimating

 D ：建立参数模型 Parametric modeling

|*|*|正确答案：C 
解析：知识点出处： PMBOK 6th 页码：P244 章节：7.2.2.2 成本类比估算使用以往类似项目的参数值或属性来估算。项目的参数值和属性包括 （但不限于）范围、成本、预算、持续时间和规模指标， 类比估算以这些项目参数值 或属性为基础来估算当前项目的同类参数或指标。一般题目中出现粗略、需要快速估算、量级字眼，都是选 择类比估算


==-=--=



5、  项目经理希望在新项目中使用一名特定供应商。该供应商目前正在为项目经理管理的另一个项目工作。项目经理希望在开始为新项目工作之前，先完成当前项目。在供应商开始为新项目工作之前，项目经理应该做什么？
The project manager wants to use a specific vendor in the new project. The vendor is currently working on another project managed by the project manager. The project manager wants to complete the current project before starting work on the new project. What should the project manager do before the vendor starts working on the new project?

 A ：与供应商一起评审合同协议。 Review contract agreements with suppliers

 B ：更新采购文档。 Update purchase document

 C ：执行采购审计。 Perform procurement audits

 D ：要求供应商完成所有现有工作。 Require suppliers to complete all existing work

|*|*|正确答案：C 
解析：知识点出处： PMBOK 6th 页码：P498 章节：12.3.2.5 采购审计：审计是对采购过程的结构化审查。应该在采购合同中明确规定与审计有关的权利和义务。买方的项目经理和卖方的项目经理都应该关注审计结果，以便对项目进行必要调整。注意题干中提到的问题的逻辑关系


==-=--=


6、  项目经理加入一个项目，但项目经理在该项目所涉及的行业经验有限，在该项目的整个生命周期中，项目经理精心记录每个差距、问题和不一致性。但是，无论项目经理如何记录和跟踪生产问题，但问题都没有得到解决，这使项目交付面临风险。 若要解决这些问题，项目经理事先应该做什么？
A project manager joins a project in an industry with which they have limited experience.Throughout the project's life cycle,the project manager meticulously documents each gap, problem,and inconsistency.However,production issues remain ,unresolved；regardless of the project manager's efforts to record and track them,which puts project delivery at risk. What should the project manager have done to resolve these issues?

 A ：调整范围基准和项目进度计划与客户需求保持一致 Aligned the scope baseline and project schedule to the customer's needs

 B ：使用主题专家(SMEs)提供适合的应对行动 Used subject matter experts(SMEs) to provide suitable response actions

 C ：审查相关方的需求与验收标准相匹配 Reviewed stakeholder requirements to match the acceptance criteria

 D ：检查需求跟踪矩阵，以确保它与可交付成果相联系 Examined the requirements tractability matrix to insure that it linked to the deliverables.

|*|*|正确答案：B 
解析：知识点出处： PMBOK 6th 页码：P94 章节：4.3.2.1 • 关于项目所在的行业以及项目关注的领域的技术知识； • 成本和预算管理； • 法规与采购； • 法律法规； • 组织治理。 看到行业领域的事情，一般都找专家判断。


==-=--=


7、  项目经理正在领导一个高度敏感的政府项目，按时交付该项目至关重要。第三方供应商按时交付一个关键项目组件，但不满足规范要求。目前尚不清楚交付的组件是否会按照批准的项目设计进行。项目经理应该做什么？
The project manager is leading a highly sensitive government project, and delivering the project on time is critical. A third-party vendor delivered a critical project component on time, but did not meet the specification requirements. It is unclear whether the delivered components will follow the approved project design.What should the project manager do?

 A ：接受该组件并按时交付该项目 Accept the component and deliver the project on time

 B ：要求退还该项目的款项，并告知相关方该延迟情况 Request a refund of the project and inform the parties of the delay

 C ：与客户协商接受不合格的组件 Negotiate with customers to accept substandard components

 D ：拒绝该组件并重新订购，并且重新制定项目的进度计划 Reject the component and reorder, and re-schedule the project

|*|*|正确答案：D 
解析：知识点出处： PMBOK 6th 页码：P498 章节：12.3.2.3 绩效审查 ：对照协议，对质量、资源、进度和成本绩效进行测量、比较和分析， 以审查合同工作的绩效。其中包括确定工作包提前或落后于进度计划、超出或低于预算，以及是否存在 资源或质量问题。质量不合格，退了重新定。


==-=--=


8、  作为向敏捷转变的一部分，一个组织为一个项目选择一个试点团队来开发一个软件工具。一位敏捷教练被分配到团队中，在整个过渡过程中指导他们。在最初的几次迭代中，教练与项目经理和团队一起指导他们进行敏捷实践，并将任务分配给团队成员。敏捷教练采用什么最佳行动方案来确定团队是否获得了在没有教练的情况下执行即将到来的迭代所需的技能？
As part of its transformation to agile, an organization selects a pilot team for a project to develop a software tool. An agile coach is assigned to the team to guide them throughout their transition. For the first few iterations, the coach works with the project manager and team to coach them on agile practices and assign tasks to the team members. What is agile coach's best course of action to determine if the team has acquired the required skills to perform the upcoming iterations without coaching?

 A ：参加每日站会 Attend daily standup meetings

 B ：进行产品演示 Conduct product demonstrations

 C ： 举行迭代回顾 Hold iteration retrospectives

 D ：开展团队建设活动 Carry out team building activities

|*|*|正确答案：C 
解析：知识点出处：敏捷实践指南 页码：P50 章节：5.2.1 回顾总结会： 回顾是最重要的一个实践，原因是它能让团队学习、改进和调整其过程。 开始是敏捷教练分配任务，在回顾会后， 团队成员可以自组织来安排任务、 改进过程。


==-=--=


9、  一位项目团队成员在工作场所之外与项目发起人会面后,向项目经理告知该发起人的新期望。项目经理应如何解决这个问题?
After meeting with the project sponsor outside the workplace,a project team member update the project manager on the sponsor's new expectations.How should the project manager address this?

 A ：与团队和发起人一起审查沟通管理计划 Review the communications management plan with the team and the sponsor

 B ：与发起人开会,以确认期望 Meet with the sponsor to confirm expectations

 C ：将发起人的期望纳入项目中 Incorporate the sponsor's expectations into the project

 D ：指示团队成员不要与发起人讨论该项目 Instruct the team member not to discuss the project with the sponsor

|*|*|正确答案：B 
解析：知识点出处： PMBOK 6th 页码：P524 章节：13.2 在管理相关方参与过程中，需要开展多项活动，例如： • 在适当的项目阶段引导相关方参与，以便获取、确认或维持他们对项目成功的持续承诺； • 通过谈判沟通管理相关方期望； • 处理与相关方管理有关的任何风险或潜在关注点，预测相关方可能在未来引发的问题； • 澄清和解决已识别的问题 通过谈判与沟通了解相关方的期望。


==-=--=


10、  项目经理为一个具有按时完成盈利项目历史记录的组织工作。然而,由于缺乏相关方的支持以及他们未能提供信息,这些项目都经历过问题。若要避免这些问题,项目经理在新项目开始时应该做些什么?
A project manager works for an organization with a history of completing projects on time.However,these projects have all experienced issues due to alack of stakeholder's support and their failure to provide information.What should the project manager do at the beginning of a new project to avoid these issues?

 A ：管理所有相关方的期望,并为每个人提供解决方案 Manage all stakeholder's expectation,and provide a solution for each one

 B ：准备一份包含所有相关方的沟通管理计划 Prepare a communications management plan that includes all stakeholders

 C ： 在启动阶段识别关键相关方并进行优先级排序 Identify and prioritize the key stakeholders during the initiating stage

 D ：复制之前项目的工作,因为这些项目结束时都很好 Duplicate efforts from previous projects since they ended well

|*|*|正确答案：C 
解析：知识点出处： PMBOK 6th 页码：P504 章节：13 相关方的观点：项目经理和团队正确识别并合理引导所有相关方参与的能力，能决定着项目的成败 要尽早地识别关键的相关方，因此识别相关方在启动阶段开始





`
