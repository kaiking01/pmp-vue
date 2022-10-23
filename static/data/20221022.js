
/** 正确答  */
var rigthAnswer = ' DCADD  A (BCE) CCB'

var rightAnswerA = `
d	9.4
c	1.2.4
a	3.1
d	13.1.2.3
d	6.1.2
a	9.2.1.2
(bce)	6.3
c	3.1.6
c	1.2.1
b	11.7.1.2
`


/** 接龙数据 */


var allData = `

1. 卢维荣 CAADD A（BCE)ACB



`

/**
 * 试题
 * 题目之间的间隔符：  ==-=--=
 * 答案间隔符： |*|*|
 * **/
var testQuestion = `
1、 一位敏捷教练被分配到一个新成立的团队中，负责他们的第一个项目。教练安排了团队，提供了关于敏捷最佳实践的培训，并解释说敏捷团队是自我管理的。然而，团队成员正在努力从看板面板分配用户故事，并且由于缺乏协作，生产力正在受到影响。敏捷教练的最佳行动方案是什么？
An agile coach has been assigned to a newly formed team with their first project. The coach colocated the team, provided training on agile best practices, and explained that agile teams are self-managing. However, the team members are struggling to assign user stories from the Kanban board, and productivity is suffering as a result of the lack of collaboration. What is the best course of action for the agile coach?

 A ：忽略这个问题，因为敏捷团队应该是自我管理的 Ignore the problem as agile teams are supposed to be self-managing.

 B ：从现在开始，将用户故事标记给各个团队成员 Assign the user stories to individual team members from now onward

 C ：将团队章程替换为更有生产力的项目团队的章程 Replace the team charter with one from a more productive project team.

 D ： 采取更直接的方法，由于团队仍处于形成阶段 Take a more directive approach since the team is still in its forming stage.

|*|*| 正确答案：D 
解析：知识点出处： PMBOK 6th 页码：P338 章节：9.4 塔克曼阶梯理论：形成阶段 、 震荡阶段 、规范阶段、成熟阶段 、 解散阶段 形成阶段，敏捷教练应该指导团队。

==-=--=

2、 在新目标国家推出产品前不久，公司意识到该产品并不完全符合当地的数据隐私法。由于预算限制，公司管理层要求项目团队将可能的罚款成本与返工成本进行比较。返工的一部分包括向产品待办事项列表中添加新需求。在这种情况下，下面哪个选项最有可能帮助到你？
Shortly before rolling out a product in a newly targeted country, a company realizes that the product does not fully comply with local data privacy laws. Due to budget constraints, the company management asks the project team to compare costs for possible fines with costs for rework. Part of the rework would involve adding new requirements to the product backlog. In this situation, which of the following is most likely to help?

 A ：重构 Refactoring

 B ：用户画像 Personas

 C ： 阶段关口 A phase gate

 D ：快速跟进 Fast tracking

|*|*| 正确答案：C
解析：知识点出处： PMBOK 6th 页码：P18 章节：1.2.4 阶段关口： 为做出进入下个阶段、进行整改或结束项目集或项目的决定，做的阶段末审查。 审查一个阶段末的问题，做成本效益分析，以决定下个 阶段的项目。

==-=--=

3、 随着项目的进展，偏差分析表明与绩效测量基准相比，实际的项目绩效会恶化。因此，对成本、进度和范围的估算不再有效。团队确定大量的新功能、变更请求和缺陷修复是差异背后的主要原因。项目经理要确保在实际进展的基础上对项目的剩余工作进行进一步的估算，最好的行动方案是什么？
As the project progresses, the variance analysis shows that actual project performance compared to the performance measurement baseline deteriorates. As a result, estimates for cost, schedule, and scope are no longer valid. The team determines that a high volume of new features, change requests, and defect repairs are the main reason behind the variance. What is the project manager's best course of action to ensure that further estimates for the remainder of the work on the project are made based on real progress?

 A ： 将产品开发方法转换为通过短迭代来适应和度量进度 Switch the product development approach to adaptive and measure progress via short iterations

 B ：限制项目中允许的新功能、变更请求和缺陷修复的数量 Limit the number of new features, change requests, and defect repairs allowed on the project

 C ：请使用自下而上估算成本和进度计划估算技术以及三点估算范围 Use a bottom-up estimating technique for cost and schedule, and three-point estimating for scope

 D ：基于单个的基准而不是单一的综合基准来衡量进度 Measure progress based on the individual baselines instead of the single integrated baseline

|*|*| 正确答案：A 
解析：知识点出处： 敏捷实践指南 页码：P18 章节：3.1 四种生命周期特征。 变更过多，说明需求是动态的，不建议使用瀑布型。

==-=--=

4、 项目经理与多位高管相关方一起参与一个生命周期替换项目，其中一位相关方强烈反对该项目。若要获得该相关方的支持，项目经理应该怎么做？
A project manager joins a life cycle replacement project with multiple executive stakeholders,one stakeholders is strongly against the project.What should the project manager do to gain the stakeholders'support ?

 A ：制定权力/影响力方格，以确定该相关方影响项目的能力并确认其支持 Develop A power/influence grid to determine the stakeholders’ ability to influence the project and confirm its support

 B ：创建相关方参与计划，以确定该相关方的项目支持水平 Create a stakeholder engagement plan to determine the stakeholder’s level of project support

 C ：将该问题升级上报给项目推动者，并请求替换一个支持该项目的相关方 Escalate the issue to a project champion and request an alternate stakeholder that will support the project

 D ： 执行相关方分析，以确定缺乏项目支持的原因并对这些原因进行优先级排序 Conduct a stakeholder analysis to identify and prioritize reasons for the lack of project support

|*|*| 正确答案：D 
解析：知识点出处： PMBOK 6th 页码：P512 章节：13.1.2.3 相关方分析： 相关方分析会产生相关方清单和关于相关方的各种信息， 例如，在组织内的位置、在项目中的角色、与项目的利害关系、期望、态度（对项目的支持程度），以及对项目信息的兴趣。 先进行相关方分 析，再更新参与 计划。B在D后面。 A确认其支持 不对。

==-=--=

5、  项目经理正在制定项目进度计划，并希望赋予团队比过去项目更多的决策权。他创建了一个甘特图，显示WBS工作包级别的活动，这些活动被分配给团队而不是个人。然后，他将工作包记录在一个看板面板的待办事项列表中。项目经理如何通过理想化的属性和行为使用鼓舞人心的激励来授权团队？
A project manager is developing the project schedule and wants to empower the team with more decision making authority than past projects. He creates a Gantt chart that displays activities down to the work package level of the WBS, which are assigned to the team rather than individuals. He then records the work packages in the backlog of a Kanban board. How might the project manager use inspirational motivation to empower the team through idealized attributes and behaviors?

 A ：采取自由放任的领导风格 Adopt a Laissez-faire leadership style

 B ：融入仆人型领导者的要素 Incorporate the elements of a servant leader

 C ：利用例外管理 Utilize management by exception

 D ：使用变革型领导风格 Use a transformational leadership style

|*|*| 正确答案：D 
解析：知识点出处：敏捷实践指南 页码：P73 章节：6.1.2 变革就绪情况： • 积极明确的管理层支持； • 变革管理实践，包括沟通和引导； • 逐个项目应用敏捷实践 • 向团队增量地引入敏捷实践；以及 • 通过采取适用的敏捷技术和实践示范引导。 从题干看出，这明显是从瀑布型向敏捷型的变革，需要变革型领导风格。

==-=--=


6、 项目经理前往另一个国家执行最终可交付成果的上线过程，到达后，项目经理得知，由于任务计划在当地假日期间完成，关键资源将不可用，而延迟上线将使最终项目的交付处于危险之中。若要避免这个问题，项目经理应该在项目开始时完成哪一项工作？
The project manager travels to another country to perform the final deliverable on-line process. Upon arrival, the project manager learns that because the task is scheduled to be completed during the local holiday period, key resources will be unavailable, and the delayed on-line will make the final project delivery at risk.To avoid this problem, which task should the project manager complete at the beginning of the project?

 A ：创建一份团队日历并围绕该信息创建项目进度计划 Create a team calendar and create a project schedule around that information

 B ：要求所有团队，无论在哪个国家，均遵循总部的日历 Require all teams, regardless of country, to follow the headquarters calendar

 C ：制定加班预算以补偿在假期工作的资源 Develop an overtime budget to compensate for resources that work during the holidays

 D ：记录风险登记册中包含各个国家日历的影响 Record the effect of the national calendar in the risk register

|*|*| 正确答案：A 
解析：知识点出处： PMBOK 6th 页码：P323 章节：9.2.1.2 资源日历： 资源日历识别了每种具体资源 可用时的工作日、班次、正常营业的上下班时间、周末和公共假期。在规划活动期间，潜在的可用资源信息（如团队资源、设备和材料）用于估算资源可用性。资源日历还规定了在项目期间确定的团队和实物 资源何时可用、可用多久。 何时可用、 可用多久

==-=--=

7、  [多选] 为了生产可交付的产品，你的项目必须与几个供应商签订合同。可交付成果将使用一个敏捷框架进行开发，该框架采用约束驱动的交付方式，这将影响与供应商的合同关系。 以下哪一种策略最适合这个项目?(选择三个)
To produce deliverables, your project has to contract with several vendors. The deliverables will be developed using an agile framework with constraint-driven delivery, which will influence the contractual relationship with the vendors. Which of the following strategies would be the most appropriate for this project? (Choose three)?

 A ：根据详细的工作分解结构制定采购工作说明书 Develop the procurement statement of work based on the detailed WBS

 B ：追求与供应商共享风险和回报的关系。 Pursue a shared-risk-reward relationship with the vendors

 C ：与供应商签订合同时，采用固定价格增量。 Adopt fixed-price increments when contracting with the vendors

 D ：对每个供应商使用一个标准的固定价格合同。 Utilize a standard firm-fixed-price contract for each of the vendors

 E ：在供应商合同中包含提前取消的选项。 Include an early cancellation option in the vendor contracts

|*|*| 正确答案：B,C,E 
解析：知识点出处：敏捷实践指南 页码：P77-78 章节：6.3 采购和合同： • 多层结构 • 强调价值交付 • 总价增量 • 固定时间和材料 • 累进的时间和材料 • 提前取消方案 • 动态范围方案 • 团队扩充 • 支持全方位供应商 敏捷的采购和合同

==-=--=

8、 你将与你的团队会面来确定项目的生命周期。在分析了定义和管理需求、开发可交付成果、处理变更、控制风险和成本，以及与关键相关方合作的最佳方式之后，做出了选择混合生命周期的决定。在选定项目生命周期后，关键相关方多久参与一次？
You meet with your team to determine the life cycle for your project. After analyzing the best way to define and manage requirements, develop deliverables, handle changes, control risk and cost, and engage key stakeholders, the decision is made to select a hybrid life cycle. With the project life cycle selected, how often will the key stakeholders be involved?

 A ：持续参与 Continuously

 B ：在特定里程碑参与 At specific milestones

 C ： 定期参与 Regularly

 D ：完全不参与 Not involved at all

|*|*| 正确答案：C 
解析：知识点出处： 敏捷实践指南 页码：P26 章 节：3.1.6 混合生命周期的特征： 对于整个项目，没有必要使用单一的方法。为达到特定的目标，项目经常要结合不同的生命周期要素。预测、 迭代、增量和/或敏捷方法的组合就是一种混合方法。 A是敏捷， B是预测。 而混合型建议定期参与。

==-=--=

9、 客户希望增加股东权益的总和，提高其在全球市场的品牌知名度。客户的主要目标是什么？
Customer wants to increase the total shareholders' equity and increase their brand awareness in the global market. What is the main objective of the customer?

 A ：为组织战略改善整体业务支持 To improve the overall business support for organizational strategy

 B ：增加营销预算 To increase the marketing budget

 C ：提高商业价值 To increase the business value

 D ：通过重新投资其他业务组合提高市场份额 To increase the market share by reinvesting in other business portfolios

|*|*| 正确答案：C 
解析：知识点出处： PMBOK 6th 页码：P7 章节：1.2.1 有形效益的例子包括： • 货币资产； • 股东权益； • 公共事业； • 固定设施； • 工具； • 市场份额。 股东权益属于有形效益。

==-=--=

10、 在开发一个新产品时，耐久性测试是关键路径上的一项重要活动。然而，测试设施被一个优先级较高的项目占用，且占用时间比原计划长。项目经理接下来应该怎么做？
In the development of a new project the endurance testing is an important activity on the critical path. However, the last facility is occupied by a higher project. Which is taking longer than initially planned. What should the project manager do text?

 A ：为延迟的项目开展根本原因分析 Perform a root cause analysis for the delayed project

 B ：审查风险登记册中的适当响应 Review the risk register for the appropriate response

 C ：将延期情况通知项目相关方 Inform the project stakeholders about the delay

 D ：将问题上报给高级管理层 Escalate the issue to senior management

|*|*| 正确答案：B 
解析：知识点出处： PMBOK 6th 页码：P455 章节：11.7.1.2 风险登记册： • 已识别单个项目风险 • 风险责任人 • 商定的风险应对策略 • 以及具体的应对措施。 遇风险，先查册
 
==-=--=



`