
/** 正确答  */
var rigthAnswer = 'DCCCD  ABBDA'

var rightAnswerA = `
d	敏捷实践指南
c	敏捷实践指南
c	敏捷实践指南
c	敏捷实践指南
d	敏捷实践指南
a	敏捷实践指南
b	敏捷实践指南
b	敏捷实践指南
d 敏捷实践指南
a	敏捷实践指南
`

/** 接龙数据 */
var allData = `


1. 韶华倾负。 CDBCD ABBBA
2. 易江涛 DCCBD ABACB
3. 卢维荣 DCCCD ABBCB
4. 刘思婷 DCCCD ABBDA
5. 陈书婷 DCCCD ABBBC
6. 唐泷彪 DDCCD  ABADB
7. 吴贤玲 DCCCD ABACC
8. 张永禄 DCCCD ABADA
9. NICOLE DCCCD ABBDA
10. 方庆伟 cacdd adccc
11. 温炳辉 DCCCD ABBDB
12. 赵艳焜 DCCCD ABABB
13. 汪关心 DCCCD ABBCB
14. 陈小棋 DCCCD ABBDA
15. D_uende DCCCD ABACC
16. 黄雅君 DCCCD ABBCA
17. 陈妙玲 DCCCD ABBDC
18. 文博 DCCCD ABBCC
19. 等等 DCCCD ABBBA
20. 于涛 DCCCD ABACC
21. 李凯旋 DCCCD ABBDA
22. 陈雅 DCCCD ABABA
23. 李莹 DCCCD ABBCB
24. 杨欢 DCCCD ABACB
25. 黄霍淋 DCCCD ABABC
26. jo an na DACCD BBACC
27. Stone DCBCD ABBCB
28. 王鑫 DCCCD ABACC
29. 熊佳 DCCCD ABADC
30. 莫德坚 DCCCD ABABC
31. 陈少芬 DCCCD ABBDA
32. 陈永发 DCCCD ABBBB
33. 陈庆娇 DCCCD ABADB
34. 李勇发 DCCCD ABBCA
35. 阮晓梦 DCCCD ABBCC
36. 袁天赐 DCCCD ABADB
37. 谢成寿 caddd abbcb
38. 盛洁 DCCCB ABACA
39. 郭晓丽 DCCDB ABADB
40. 黄艳芬 CCCCD ABADC
41. 洪俊鑫 DCCCD ABACB
42. 宋欣瑶 DCCCB ABABB
43. 李翠艳 DDCCB BBADB
44. 小青 DCCCD ABACC
45. 张焕忠 DCCCB ABACB
46. 汤燕婷 CACCD BBACB
47. 艾克丝 DCCCD ABADC
48. 郑鸿斌 DCCCA ABBDB
49. 邹班庆 DCCCB ABACB
50. 王炜 CDCCD BBACB
51. 新 DCCCD ABBDA
52. 、拾婲。DCCCDBBADA

`

/**
 * 试题
 * 题目之间的间隔符：  ==-=--=
 * 答案间隔符： |*|*|
 * **/
var testQuestion = `


1、 项目经理安排一次会议，让Scrum项目团队进行反思和调整。与会者在这次会议上最可能做什么？
A project manager schedules a meeting for the scrum project team to reflect and adapt. What will the participants be most likely doing at this meeting?

A： 向客户演示产品增量
Demonstrating the product increment to the customer
B： 为下次冲刺选择用户故事
Selecting user stories for the next sprint
C： 讨论正在进行的工作和阻碍进展的障碍
Discussing the on-going work and impediments to progress
D： 寻找对团队过程的任何改进
Looking for any improvements to the team's process

|*|*| 正确答案：D 解析：知识点出处：敏捷实践指南 页码：P50 章节：5.2.1 回顾总结会： 回顾是最重要的一个实践，原因是它能让团队学习、改进和调整其 过程。 回顾会三件事：总结经验 过程改进 提出计划

==-=--=


2、 一个沉浸在预测性项目管理方法中的组织决定采用混合方法作为敏捷项目管理的过渡策略。已经特许了一个试点Scrum项目，并分配了Scrum角色和职责。项目经理希望确保向客户提供最优的价值。项目经理接下来应该做什么？
An organization that is steeped in a predictive project management approach has decided to adopt hybrid methods as a transition strategy to agile project management. A pilot scrum project has been chartered and scrum roles and responsibilities assigned. The project manager wants to ensure the optimal delivery of value to the customer. What should the project manager do next?

A： 分配故事点以确定产品待办事项列表的优先级
Assign story points to prioritize the product backlog
B： 要求该团队采用MoSCoW方法
Request that the team use the MoSCoW method
C： 为产品负责人安排Scrum培训
Schedule scrum training for the product owner
D： 将WBS分解为Scrum用户故事
Decompose the WBS into scrum user stories

|*|*| 正确答案：C 
解析：知识点出处：敏捷实践指南 页码：41 章节：4.3.2 产品负责人 Product Owner ：创建待办列表并排序、 确认工作优先顺序 、提供反馈、 指导开发方向 。 ABD都是产品负责人做的事，因此， 要先确认产品负责 人有能力做这些事。

==-=--=

3、一个敏捷团队正处于冲刺中，此时发起人要求项目经理停止当前冲刺中几个用户故事的工作。由于最近发布的一项新技术即将上市，发起人倾向于认为这些用户故事没有什么价值。项目经理应该做什么？
An agile team is in the middle of a sprint when the sponsor asks the project manager to stop work on several user stories in the current sprint. With a recent news announcement of new technology soon to hit the market, the sponsor is inclined to think that these user stories would be of little value. What should the project manager do?

A： 从冲刺待办事项列表移除发起人指定的用户故事
Remove the user stories indicated by the sponsor from the sprint backlog
B： 忽略发起人意见，并指示团队按原计划进行
Ignore the sponsor's input and instruct the team to proceed as originally planned
C： 联系产品负责人，询问用户故事是否仍具有优先级
Contact the product owner and ask if the user stories are still a priority
D： 进行市场调查以确认新技术的发布
Conduct market research to confirm the announcement of the new technology

|*|*| 正确答案：C 
解析：知识点出处：敏捷实践指南 页码：41 章节：4.3.2 产品负责人 Product Owner ：创建待办列表并排序、 确认工作优先顺序 、提供反馈、 指导开发方向。 优先级的问题， 应该听PO的。

==-=--=

4、 一位敏捷教练被要求为即将到来的敏捷项目团队建立团队。管理层希望利用公司现有的人才，而不要使用外部资源。敏捷教练联系人力资源部门，在公司内部网站上为未来的团队成员发布招聘广告。敏捷教练在广告中提出的以下哪项工作要求是最好的？
An agile coach has been requested to put together a team for the upcoming agile project. The management wants to use the talent available in the company without the need to go outside. The agile coach approaches the human resource department to advertise the position for the prospective team members on the company internal website. Which of the following job requirements is best for the agile coach to indicate in the ad?

A： 熟悉动态系统软件开发方法（DSDM）
Experienced with the dynamic systems software development methods (DSDM)
B： 熟练掌握自动化测试过程和程序
Self-starter and proficient in the automated testing processes and procedures
C： 对不同技能是否有专注的专长和丰富的经验
Has a focused specialty as well as a breadth of experience across multiple skills
D： 具有团队合作精神，熟悉所有敏捷软件开发工具
Team player and briefly familiar with all agile software development tools

|*|*| 正确答案：C 
解析：知识点出处：敏捷实践指南 页码：P42 章节：4.3.3 通才型专家： 敏捷团队是跨职能的。不过，许多成功的敏捷团队都由通才型专家组成，他们也称为 T 型人才。 这意味着这些团队成员在具备一项擅长的专业化技能的同时，还拥有多种技能的工作经验，而不是单一的专业化 T型、通才型、跨职能型人才是敏捷团队成员的重要特点。

==-=--=

5、一个敏捷团队的四名成员在同一地点工作，另外两名成员在家远程工作。项目经理希望为团队成员购买办公用品和其他物理和数字工具，以支持他们的日常工作，支持协作，并促进敏捷最佳实践的使用。项目经理最好购买以下哪一项？
Four members of an agile team are co-located while two others work remotely from home. The project manager wants to purchase office supplies and other physical and digital tools for the team members to support their day-to-day work, enable collaboration, and promote the use of agile best practices. Which of the following is best for the project manager to buy?

A： 白板、索引卡、便签、活动挂图
Whiteboards, index cards, sticky notes, flip charts
B： 即时通信应用、网络摄像头、麦克风
Instant messaging applications, web cameras, microphones
C： 甘特图和项目管理信息系统
Gantt charts and project management information system
D： 白板、索引卡、便利贴、网络摄像头、麦克风
Whiteboards, index cards, sticky notes, web cameras, microphones

|*|*| 正确答案：D 
解析：知识点出处：敏捷实践指南 页码：103 章节：A3.4 看板方法：“看板”一词按字面翻译为“视觉符号”或“卡”。带有卡片的物理看板面板能够推动和实现整个系统中工作流的可视化，让每个人都可以看到。该信息发射源（大型显示屏）包含许多列，表示需要完成的工作流的状态。 A没有网络设备、 B没有本地设备、 C非敏捷。

==-=--=

6、 一个敏捷项目已经进入了第七次冲刺阶段。在冲刺结束前两天，客户通知产品负责人，他们忘记在冲刺中包含某个功能。高级经理无意中听到谈话，并表示包含该功能意味着范围蔓延，并不应被允许。产品负责人的最佳行动方案是什么？
An agile project has entered its seventh sprint. Two days before the end of the sprint, the customer informs the product owner that they forgot to include one feature in the sprint. A senior manager overhears the conversation and states that including the feature represents scope creep and should not be allowed. What is the product owner's best course of action?

A： 与客户合作，在产品待办事项列表中为该功能设优先级
Work with the customer to prioritize the feature in the product backlog
B： 请求客户提交变更请求
Request that the customer submit a change request
C： 指导团队在当前的冲刺中开发该功能
Instruct the team to develop the feature in the current sprint
D： 按照高级经理的指示拒绝该功能
Reject the feature as instructed by the senior manager

|*|*| 正确答案：A 
解析：知识点出处：敏捷实践指南 页码：41 章节：4.3.2 产品负责人 Product Owner： 创建待办列表并排序 、确认工作优先顺序、 提供反馈、 指导开发方向 敏捷拥抱变更， PO与客户一起确认优先级。

==-=--=

7、在冲刺计划会议上，Scrum主管重申，如果在冲刺结束时敏捷项目团队正在构建的产品增量没有达到冲刺开始时指定的标准，那么这项工作将不会包含在当前冲刺的速度中。Scrum主管指的是什么？
At the sprint planning meeting, the scrum master reiterates that if by the end of the sprint the product increment that the agile project team is building does not meet the criteria specified at the beginning of the sprint, this work will not be included in the velocity for the current sprint. What does the scrum master refer to?

A： 完工尚需估算 Estimate to complete
B： 完成的定义 Definition of done
C： 项目退出标准 Project exit criteria
D： 质量测量指标 Quality metrics

|*|*| 正确答案：B 
解析：知识点出处：敏捷实践指南 页码：P151 章节：术语表 完成的定义DoD ：它是团队需要满足的所有标准的核对单，只有可交付成果满足该核对单才能视为准备就绪可 供客户使用。 敏捷项目完成后，检查DOD，以验证是否满足标准

==-=--=

8、在迭代计划过程中，敏捷教练希望确保她的开发团队有一种简单的方法来组织他们的工作，以及在迭代中剩余工作的可视化表示。敏捷教练最好使用以下哪一种工具来实现她的目标？
During iteration planning, an agile coach wants to ensure that her development team has an easy way of organizing their work as well as a visual representation at a glance of the work remaining to be completed in an iteration. Which of the following tools is best for the agile coach to use to accomplish his goals?

A： 燃尽图 A burndown chart
B： 任务板 A task board
C： 燃起图 A burnup chart
D： 一览表 A glance chart

|*|*| 正确答案：B 
解析：知识点出处：敏捷实践指南 页码：P105 章节：A3.4 看板面板是一种技术含量低但接触广泛的技术，使用者在一开始时可能会认为其过于简单，但很快便会发现其强大的功能。看板面板利用列进入和退出 策略以及限制在制品等制约因素，可提供一目了然的工作流、瓶颈、 阻碍和整体状态信息。此外，面板可作为面向所有观众的信息发射源，提供团队工作状态的最新信息。 只有看板面板能够 同时规划工作和了解进度。燃尽图和燃起图仅能了解进度。

==-=--=

9、在你的项目中，镀金一直是反复出现的问题，因为团队一直在添加他们认为对客户有用的功能，尽管这些功能并没有包含在WBS中。变更请求是在事后提交的，并且一些功能最终被添加到项目范围。你担心与计划的偏差。你会怎样做才能更好地控制范围，防止进一步镀金？
Gold plating had been a recurring issue on your project as the team has been adding features they think are useful for the customer even though the features were not included in the WBS. Change requests have been submitted after the fact, and some of the features were eventually added to the project scope. You are concerned about deviations from the plan. What might you do to control scope better and prevent further gold plating?

A： 采用敏捷方法，这样团队就可以开发任何他们认为有价值的功能
Adopt an agile approach so the team can develop any features they deem valuable
B： 提交变更请求，以获取问题日志中的镀金问题
Submit a change request to capture the gold plating problem in the issue log
C： 在项目回顾中讨论问题，并更新经验教训登记册
Discuss the issue at the project retrospective and update the lessons learned register
D： 与团队成员进行日常站会的敏捷实践相协调
Incorporate the agile practice of holding daily standup meetings with the team

|*|*| 正确答案：D 
解析：补充知识点 范围蔓延： 在客户的要求下，没有经过正常的范围变更控制批准程序， 而直接扩大了项目定义范围的工作内容。 镀金：范围蔓延的一种，指在定义范围的工作范围以内，项目团队主动增加的额外工作。 镀金是在任何开发方法中 都不建议的。因此A不对， 即使到敏捷，也是PO决定范围。 D，每日站会让开发团队集中在现有范围内。

==-=--=

10、敏捷项目的第一次迭代即将开始。发起人召集团队、Scrum主管、产品负责人和其他项目相关方参加启动会议。发起人强调需要在项目尽可能早的时候以最小的成本识别和应对项目风险。与会者实现发起人要求的最佳方式是什么？
The first iteration of an agile project is about to begin. The sponsor gathers the team, the scrum master, the product owner, and other project stakeholders for the kick-off meeting. The sponsor emphasizes the need to identify and respond to the project risks as early in the project as possible and at the minimal cost. What is the best way for the meeting participants to implement the sponsor's request?

A： 团队和相关方应该经常审查产品增量
The team and stakeholders should frequently review product increments.
B： 项目相关方应该在每次冲刺中执行基于风险的刺探
The project stakeholders should conduct risk-based spikes in each sprint.
C： 产品负责人和发起人应该对高风险的用户故事进行优先级排序
The product owner and the sponsor should prioritize high-risk user stories.
D： 团队应该与Scrum主管一起实现结对编程
The team should implement pair programming with the scrum master.

|*|*| 正确答案：A 
解析：知识点出处： 敏捷实践指南 页码：P56 章节：5.2.7 持续集成： 在不同层面测试、验收测试驱动开发 （ATDD） 、测试驱动开发和行为驱动开发、 刺探 。 B刺探应由团队做 C，PO与团队和相关方共同确认优先级。 D，结对编程应由团队来做。

==-=--=




`
