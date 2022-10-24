
/** 正确答  */
var rigthAnswer = ' ADCCC  CBAAC '

var rightAnswerA = `
a	11.5.2.4
d	9.5.2.1
c	11.5.2.4
c	4.2.3.1
c	敏捷实践指南
c	13.2
b	4.3.2
a	6.6.1.1
a	10.1.3.1
c	4.3.2
`


/** 接龙数据 */


var allData = `

1. 易江涛 ADBCC CBBAD
2. 王鑫 ACABA  CBBAD
3. 邱婉菡 BDAAA CACAD
4. 卢维荣 ADCCD CDAAA
5. 温炳辉 ACBDC CAAAC
6. NICOLE ADCCC CBAAC
7. 林英 ADADA  CBAAA
8. 韦永新 ADDCA--CBAAA
9. 黄雅君 ADCCC CAAAC
10. jo an na ADAAD CBBAD
11. 银河汽水🥤 ADBCA  CBAAC
12. 李翠艳 ACCDA  CBDAD
13. 秦敏 ADBDA CACAC
14. 王炜 ACDAD  CBACA
15. 刘思婷 ADDCC CBAAA
16. 新 ADCCC CBAAC
17. Jyz ADCDA CCAAA
18. D_uende DDACD CBBAC
19. 陈书婷 DDADC BBBAD
20. 陈少芬 DDBCA CBAAC
21. 张焕忠 ADDCA CBAAC
22. 赵艳焜 DDAAC CBBAC
23. 陈妙玲 ADCCA CBAAC
24. 谢成寿 Ccccc cbdad
25. 吴佳佳 ABBCACCCBA
26. 杨欢 ADCDD CBA AA
27. 等等  DCADA CBBDC
28. 旭 ADDDABBAAA
29. 陈庆娇 ADDBC CBBAC
30. 袁天赐 ddacc cbdac
31. 阮晓梦 DCDAD CABAA
32. 汤燕婷 DDACA CBCAA
33. 文博 DDDAC CBBAA
34. 唐泷彪 DDDCA CBBAD
35. 洪俊鑫 DDCCC BBDAC
36. 李莹 ACDDDCDBAD
37. 小青 DDADC BDDAC
38. 莫德坚 ACBCD CDACA
39. 陈永发 ADACD CBAAC
40. 邹班庆 ADCCC CADAC
41. 艾克丝DDAAD CCAAA
42. 杨国鸿 ADDBD CBBCC
43. 雪落无痕 ADBBC CDAAB
44. 吴振成 DDACA BBBA
45. 曾丽珊 ADCDD BBACD
46. 于涛 DDBCC BBBCC
47. 熊佳 DBDAD CBAAD
48. 郑鸿斌 ADCCCCBAAC
49. 甘玉嫦 DDCBD BBBAB
50. 治安 BDDDD CBBAD
51. 李勇发 ADDDD CBAAB
52. 慌、如隔世 ADDCD CBAAC
53. 亮亮 DDDAC CBBAA
54. 郑舒颖 BDCAD CBAAC
55. 李凯旋 BDADA CCBAA
56. Stone ADBCA BABAA
57. 郭晓丽 ADACA CAAAD

`


/**
 * 试题
 * 题目之间的间隔符：  ==-=--=
 * 答案间隔符： |*|*|
 * **/
var testQuestion = `
1、  在某建设工程项目的地基开挖过程中，对于因气候原因造成的进度延后风险，项目经理采取了风险接受的策略。由于在施工期间下特大雨，工程不得不停工3天。项目经理应该怎么做？
During the foundation excavation of a construction project, the project manager adopts risk acceptance strategy for the delay risk caused by climate reasons. Due to the extremely heavy rain during the construction period, the project has to be suspended for 3 days.

 A ： 使用应急储备 To use emergency reserves

 B ：把项目工期延长3天 To extend the project duration by 3 days

 C ：要求保险公司赔偿 To make a claim to the insurer

 D ：与团队成员开会讨论处理方案 To meet and discuss with team members for handling solutions

|*|*|正确答案：A 
解析：知识点出处： PMBOK 6th 页码：P443 章节：11.5.2.4 接受风险接受是指承认威胁的存在，但不主动采取措施。 接受策略又分为主动或被动方式。最常见的主动接受策略是 建立应急储备。被动接受策略则不会主动采取行动。 最常见的主动接受策略是建立应急储备。

==-=--=

2、 两名项目团队成员经常对项目工作方法产生分歧，若要解决这样的情况，项目经理应该做什么？
Two project team members often disagree on project working methods. What should the project manager do to resolve this situation?

 A ：与这些团队成员的直接经理进行面对面的会谈 Have face-to-face meetings with the direct managers of these team members

 B ：审查团队绩效数据以确定这是否影响项目 Review team performance data to determine if this affects the project

 C ：组织团队建设活动以增强团队关系 Organize team building activities to enhance team relationships

 D ： 使用冲突管理技能，营造一个积极的工作环境 Use conflict management skills to create a positive work environment

|*|*|正确答案：D 
解析：知识点出处： PMBOK 6th 页码：348 章节：9.5.2.1 冲突管理 ：成功的冲突管理可提高生产力，改进工作关系。同时，如果管理得当，意见分歧有利于提高创造力和改进决策。 如果管理得当，有助于提高创造力和改进。

==-=--=


3、  项目发起人通知项目经理一项新的政府法律被批准了，该法律将影响项目的进度计划和预算，这种可能性作为一种主动接受的威胁包含在风险管理计划中。 项目经理下一步应该做什么？
The project sponsor informs the project manager that a new government law has been approved that will affect the project's schedule and budget, and this possibility is included in the risk management plan as a proactively accepted threat.What should the project manager do next?

 A ：更新风险管理计划，并记录经验教训 Update the risk management plan and record lessons learned

 B ：向变更控制委员会(CCB)提交一份变更请求 Submit a change request to the Change Control Board (CCB)

 C ： 使用应急储备来管理这种情况 Use emergency reserves to manage this situation

 D ：评估管理储备来控制该风险 Assess management reserves to control the risk

|*|*|正确答案：C 
解析：知识点出处： PMBOK 6th 页码：P443 章 节：11.5.2.4 接受风险：接受是指承认威胁的存在，但不主动采取措施。 接受策略又分为主动或被动方式。最常见的主动接受策略是建立应急储备。被动接受策略则不会主动。最常见的主动接受策略是建立应急储备。

==-=--=

4、  你被分配到一个软件开发项目。产品需求在一开始就没有明确定义。因此，决定是使用敏捷框架来开发产品。项目的其他方面将使用传统的瀑布式项目管理方法进行管理。以下哪一项可能会花费较少的时间来开发和/或实现该项目？
You are assigned to a software development project. The product requirements are not clearly defined upfront. Therefore, it has been decided to develop the product using an agile framework. Other aspects of the project will be managed using the traditional waterfall project management approach. Which of the following might you spend less time developing and/or implementing for this project?

 A ：项目章程 The project charter

 B ：问题日志 The issue log

 C ： 变更管理计划 The change management plan

 D ：确认范围过程 The Validate Scope process

|*|*|正确答案：C 
解析：知识点出处： PMBOK 6th 页码：P88 章节：4.2.3.1 变更管理计划：描述在整个项目期间如何正式审批和采纳变更请求。敏捷中没有变更管理计划。因此敏捷部门无须制定。

==-=--=


5、  作为估算活动持续时间过程的一部分，项目经理促成了与产品负责人和Scrum团队的冲刺计划会议。项目经理将用户故事分解为较小的任务项，以小时为单位估算所需时间，并根据团队的能力确定冲刺待办事项列表。尽管计划周密，冲刺还是失败了。项目经理当初可采取什么样的不同做法？
As part of the Estimate Activity Durations process, the project manager facilitates a sprint planning meeting with the product owner and Scrum team. The project manager breaks down the user stories into low-level tasks, estimates the time required in hours, and determines the sprint backlog based on the team's capacity. Despite meticulous planning, the sprint fails. What might the project manager have done differently?

 A ：在确定冲刺待办事项列表之前，要求团队为产品待办事项列表设优先级 Asked the team to prioritize the product backlog before determining the sprint backlog

 B ：将确定的低级任务分配给项目进度计划中的特定人员 Assigned the identified low-level tasks to specific individuals in the project schedule

 C ： 授权团队确定他们在冲刺期间可以完成多少用户故事 Empowered the team to determine how many user stories they can complete during the sprint

 D ：在估算用户故事和任务的大小时，使用故事点而不是小时 Used story points instead of hours while estimating the size of the user stories and tasks

|*|*|正确答案：C 
解析：知识点出处： 敏捷实践指南 页码：P153 章节：术语表 自组织团队：它是一种跨职能团队，其中为实现团队目标团队成员根据需要轮换着发挥领导作用。自组织团队的核心就是做什么事情，团队成员说了算。

==-=--=

6、 在项目执行阶段,项目经理了解到一些相关方认为已批准的变更是不必要的,所以他们对接受这些变更犹豫不决,这些变更对项目的成本和进度基准影响很小。 项目经理应该做什么?
During a project's execution phase,the project manager learns that some stakeholders are hesitant to accept approved changes because they believe the changes are unnecessary.These changes have minimal effect on the project's cost and schedule baselines. What should the project manager do?

 A ：将该问题升级上报给高级管理层 Execute the issue to senior management

 B ：要求变更控制委员会(CCB)重新审查批准的变更 Ask the change control board(CCB)to re-review the approved changes

 C ： 与这些相关方开会,打消他们的顾虑 Meet with these stakeholders do address their concerns

 D ：执行这些变更,因为它们的影响微不足道 Execute the changes since their impact is insignificant

|*|*|正确答案：C 
解析：知识点出处： PMBOK 6th 页码：P524 章节：13.2 在管理相关方参与过程中，需要开展多项活动，例如： • 在适当的项目阶段引导相关方参与，以便获取、确认或维持他们对项目成功的持续承诺； • 通过谈判沟通管理相关 方期望； • 处理与相关方管理有关的任何风险或潜在关注 点，预测相关方可能在未来引发的问题； • 澄清和解决已识别的问题。 变更已批准，通过谈判与沟通处理相关方期望。

==-=--=

7、  在敏捷迭代中，由于意外的挑战，任务1无法按时完成。项目中的另一个团队依赖于任务1的及时完成以完成他们的项目部分。项目经理应该如何解决这个问题？
During an agile iteration, Task 1 cannot be completed on time due to unexpected challenges. Another team within the project is depending on timely completion of Task 1 in order to fulfill their part of the project. How should the Project Manager resolve this issue?

 A ：分别与两个团队会面，让他们想出一个方法来满足要求的最后期限并按时完成项目 Meet with both teams separately and ask them to figure out a way to meet the required deadlines and complete the project on time

 B ： 与产品负责人会面，重新确定迭代待办事项列表的优先级，以免影响其他团队或义务 Meet with the product owner to reprioritize the iteration backlog so that it does not impact other teams or obligations

 C ：增加项目团队的成员数量，并增加迭代长度，以确保工作将按照进度计划完成 Increase the number of team members for the project team and increase the iteration length ensuring that the work will be completed according to schedule

 D ：让团队成员知道你希望他们在困难条件下尽最大努力，并确保在经验教训中注意迭代的挑战 Let team members know you want them to do their best under difficult circumstances, and make sure to note the iteration's challenges in lessons learned

|*|*|正确答案：B 
解析：知识点出处：敏捷实践指南 页码：41 章节：4.3.2 产品负责人 Product Owner： 创建待办列表并排序、 确认工作优先顺序、 提供反馈 、指导开发方向 本次迭代已经结束，下次迭代是解决问题还是做新任务，需要PO给出优先级。

==-=--=

8、  每次你与你的项目发起人会面，她都要强调对于你的新的电子商务项目的成本控制的必要性。她经常询问你成本业绩方面的问题，诸如哪一个预算达到了哪一个没有达到。为了回答她的问题，你应该提供什么？
Each time you meet with your project sponsor, she emphasizes the need for cost control on your new-business project. She always asks you about cost performance in terms of which budgets have been met and which have been met and which have not. What should you provide to answer her question?

 A ：绩效测量基准 Cost Performance baseline

 B ：业绩衡量图表 Performance measurement graphs and charts

 C ：资源生产力分析 Resource productivity analyses

 D ：趋势分析统计 Trend analysis statistics

|*|*|正确答案：A 
解析：知识点出处： PMBOK 6th 页码：P224 章节：6.6.1.1 绩效测量基准：使用挣值分析时，将绩效测量基准与实际结果比较，以决定是否有必要进行变更、采取纠正措施或预防措施。向发起人提供绩效测量基准，将绩效比较结果告之。

9、 一家公司开发了一种创新的，提升性能的产品设计，已启动一个项目来完成构建产品， 该项目涉及现场和远程团队。若要避免各个团队之间的沟通不畅，项目经理应该做什么？
A company has developed an innovative, performance-enhancing product design and has launched a project to complete building the product, which involves field and remote teams.What should a project manager do to avoid poor communication between teams?

 A ： 使用适当的沟通规划来解决差异 Use appropriate communication planning to resolve differences

 B ：要求团队接受文化意识培训 Require the team to receive cultural awareness training

 C ：创建新闻通话以沟通项目决策和状态 Create news call to communicate project decisions and status

 D ：在不同地点组织团队建设活动 Organize team building activities in different locations

|*|*|正确答案：A 
解析：知识点出处： PMBOK 6th 页码：P377 章节：10.1.3.1 沟通管理计划： 沟通管理计划是项目管理计划的组成部分，描述将如何规划，结构化、执行与监督项目沟通， 以提高沟通的有效性。该计划包括如下信息： • 相关方的沟通需求 遇到远程团队、虚拟团队之类的题目，优先想到沟通

==-=--=

10、  一个沉浸在预测性项目管理方法中的组织决定采用混合方法作为敏捷项目管理的过渡策略。已经特许了一个试点Scrum项目，并分配了Scrum角色和职责。项目经理希望确保向客户提供最优的价值。项目经理接下来应该做什么？
An organization that is steeped in a predictive project management approach has decided to adopt hybrid methods as a transition strategy to agile project management. A pilot scrum project has been chartered and scrum roles and responsibilities assigned. The project manager wants to ensure the optimal delivery of value to the customer. What should the project manager do next?

 A ：分配故事点以确定产品待办事项列表的优先级 Assign story points to prioritize the product backlog

 B ：要求该团队采用MoSCoW方法 Request that the team use the MoSCoW method

 C ： 为产品负责人安排Scrum培训 Schedule scrum training for the product owner

 D ：将WBS分解为Scrum用户故事 Decompose the WBS into scrum user stories

|*|*|正确答案：C 
解析：知识点出处：敏捷实践指南 页码：41 章节：4.3.2 产品负责人 Product Owner ：创建待办列表并排序、 确认工作优先顺序 、提供反馈、 指导开发方向 。ABD都是产品负责人做的事，因此，要先确认产品负责人有能力做这些事。


`