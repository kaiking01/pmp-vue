
/** 正确答  */
var rigthAnswer = 'BBCAD  CAB(ABDE)A'

var rightAnswerA = `
b	敏捷实践指南
b	敏捷实践指南
c	敏捷实践指南
a	6.6.3.5
d	9.5.2.1
c	敏捷实践指南
a	12.2.2.5
b	4
abde 敏捷实践指南
a	敏捷实践指南
`

/** 接龙数据 */
var allData = `

1. 谢成寿 Bacad bab(abce)a
2. 卢维荣 bcbad bab(adef)a
3. 方庆伟 BCCACCAB(ACDE) C
4. 王鑫 bccad  cdd(acde)a
5. 温炳辉 BACAD CDB(ABDE)A
6. 唐泷彪 BCBAD  CAB（ACDF）A
7. 刘思婷 BCCAD CDB（ADEF）A
8. 汤燕婷 BBCDD CAB(ABDE)D
9. Stone BBBAD CAB（ABCE）D
10. 李翠艳 DACDD CCA(DE)B
11. 范梦燕 BCBAD CBC(ABDE)A
12. NICOLE BBCAD  CAB(ABDE)A
13. 袁天赐 BACAD BAB(ABDE)A
14. 新 BCCAD CAB(ABDE)A
15. 等等 BBDAD  CCD（ABDE）D
16. 陈少芬 BBCAC  CAB(ABDE)A
17. 陈永发 DCBAC CAB(ABCE)A
18. 雪落无痕 BDCAC  BAA（ABDE）D
19. 易江涛  bbcad cab(abde)a
20. 于涛 BACAC CDD(ABDE)A
21. 李莹 dcccb acb(abef)a
22. 莫德坚 BCCAD CAB(ABDE)B
23. 汪关心 BBCAC BAB（ABDE）B
24. 赵艳焜 bdcac cab（abde）a
25. 陈庆娇 BCCDC BCD(ACDE)A
26. 阮晓梦 BBCAD CDB (ABDE)A
27. 郑鸿斌 BCCACCAB (ABDE) A
28. 阿狸 bccdd cbb(abce)b
29. 黄雅君 bbcad cab(abde)a
30. 洪俊鑫 BCBAD CDB(ACDE)B
31. 黄艳芬 ABCAD CAB(ABCE)A
32. 李凯旋 BACAD CAB(ABDE)A
33. 高桥 BACCD CAB(ABDE)A
34. 陈雅 BACAD CAB(ABDE)A
35. 文博 BCCDD AAB（ABDE）A
36. 陈小棋 BCCAD CAB（ABDE）A
37. 小青 BCCAC CAA（ABDE）A
38. 熊佳 BBCAD CAB（ABCD）A
39. 艾克丝 BCCCD AAB(ACDE)A
40. 吴贤玲 BCCAD CAB（ADEF）B
41. D_uende BCDAC CAD(ABDE)C
42. jo an na BCCAD CDB(ABDE)A
43. 陈书婷  BBCAD CCD(ADEF)A
44. 黄霍淋 BCCAD CAB(ACDE)A
45. 陈妙玲 BCCAD CAB（ABDE）A
46. 宋欣瑶 BBBAD CDB(ABEF)A
47. 黄建珩 baccd bdb（abde）a
48. 邱婉菡 BCCAC AAB（ABDE)B
49. 李勇发 BBCCD CDD(ABEF)A
50. 盛洁 DACAC CAB(ABEF)A
51. Ss BDCAC CDB(ADEF)A
52. 陆婉仪 BDCAC BAB(ABDE)A
53. 胡林宇 BCCAC   ADB(ADE)B
54. loading BCCAD CAB(ABDE)A
55. 秦敏 BDCDC  CAB（ACDE）A
56. 吴洪宏 Bbcdc bdb（abde）a
57. 慌、如隔世  BBBAD ACB(ABDE)A
58. 旭 bdcad cab(abde)b


`

/**
 * 试题
 * 题目之间的间隔符：  ==-=--=
 * 答案间隔符： |*|*|
 * **/
var testQuestion = `

1、  一个开发新药的安全性和有效性可视化的项目正在进行中。Scrum被选为开发方法。在第三次冲刺的中途，项目团队成员发现所提供的数据缺少一个强制性参数。在项目计划期间，获得不完整数据的风险被提前识别并记录在风险登记册中。什么时候是使这个问题浮出水面的最合适的方法？
A project to develop visualizations of the safety and efficacy of a new drug is underway. Scrum has been selected as the development approach. Midway into the third sprint, a project team member finds that the data provided is missing a mandatory parameter. The risk of getting incomplete data was identified and recorded in the risk register earlier, during project planning. When would be the most appropriate approach to surface this problem?

 A ：问题应作为主题包含来在下次冲刺回顾上进行讨论 The problem should be included as a topic for discussion at the next sprint retrospective.

 B ： 团队成员应在每日Scrum会议上将问题作为障碍提出来 The team member should raise the issue as an impediment during the daily scrum meeting.

 C ：在冲刺审查中应演示具有缺失参数的产品增量 The product increment with the missing parameter should be demonstrated at the sprint review.

 D ：已实现的风险应触发并由规划风险应对过程解决 The realized risk should trigger and be addressed by the Plan Risk Responses process.

|*|*|正确答案：B 
解析：知识点出处： 敏捷实践指南 页码：P53 章节：5.2.4 每日站会：• 上次站会以来我都完成 了什么？ • 从现在到下一次站会， 我计划完成什么？ • 我的障碍（或风险或 问题）是什么？ 每日站会会提出问题或风险或障碍


==-=--=



2. 公司聘用一名项目经理来协调一个期限紧迫的敏捷项目，项目经理和敏捷团队都由一位项目组合经理管理，该项目组合经理倾向于根据需要将开发人员重新分配给其他紧急事项，当项目经理与其接洽时，项目组合经理坚持认为他们有权根据需要调动资源，项目经理应该怎么做？ A Company hires a project manager to coordinate an agile project with tight deadlines, The project managers and the agile team are all managed by a portfolio manager who has a tendency to reassigned developers to other urgent items as needed, when approached by the project manager , the portfolio manager is adamant that they have the authority to more required, what should the project manager do?

A: 将此问题提升为问题日志中的问题 Raise this ad an issue in the issue log

B: 更新风险登记册 Update the risk register

C: 将此问题升级上报给项目组合经理的主管 Escalate it to the portfolio manager's supervisor

D: 请求额外的资源 Request additional resources

|*|*|正确答案 B
解析：相关方的错误认识将可能给项目带来麻烦，是潜在的（尚未发生问题），更像风险而不是问题。A的“提升”不合适。组合经理的做法对本项目而言是一种风险,需要更新到风险登记册并分析\制定应对措施。 


==-=--=


3. 一个在地理位置上分散的团队正在从事一个IT项目，他们发现自己会改写彼此的代码,有时还会处理相同的功能，Scrum主管正在评估他们如何能够促进团队成员之间更加一致的沟通，从而避免这些问题，Scrum主管应该怎么做？ A geographically dispersed team working on an IT project find themselves overwriting each others’ code and sometimes working on the same features The Scrum master is assessing ways in which they can promote more consistent communication among team members to avoid these issues. What should the Scrum master do?

A: 举行冲刺评审 Hold a sprint review

B: 召开回顾总结会议 Convene a retrospective

C: 安排每日站会 Schedule a daily stand up 

D: 开发一个任务分配系统 Develop a task allocation system

|*|*|正确答案C
解析：题干已经认为是沟通问题,与C关系更大。A主要用于检查完成的工作；B主要用于总结经验和改进；C可以讨论问题，有异常及时纠正；D与沟通无关。
敏捷相关知识整理：
Scrum 是最受欢迎的敏捷技术，超过 50%以上的项目在运用这项方法。Scrum Master 负责确保所有人都能正确地理解并实施 Scrum。因此，Scrum Master 要确保 Scrum 团队遵循 Scrum 的理论、实践和规则。Scrum Master 是 Scrum 团队中的服务型领导。Scrum Master 帮助 Scrum 团队外的人员了解他们如何与 Scrum 团队交互是有益的，通过改变他们与 Scrum 团队的互动方式来最大化 Scrum 团队所创造的价值。


==-=--=


4. 在一次迭代结束时，一位团队成员告诉项目经理，由于几天前出现了无法解决的问题， 一个计划任务未完成。若要在将来避免这种情况，项目经理应该怎么做？ At the end of an iteration, a team member tells the project manager that a planned task is unfinished because of an issue that appeared several days ago but unable to be resolved. What  should the project manager do to prevent this type of situation in the future?

A: 在回顾总结会议上讨论该问题 Discuss the issue during the retrospective

B: 在演示中说明该问题 Address the issue in the demo

C: 在下一次迭代规划会上讨论该问题 Discuss the issue during the next iteration planning meeting

D: 在下一次迭代每日站立会上审查该问题 Review the issue in the next daily standup meeting


|*|*|正确答案A
解析：pmbok6的230页6.6.3.5项目文件更新：避免未来发生，要总结经验教训并更新到组织过程资产中。A 是总结经验教训。
迭代：产品大框架和范围确定，产品细节需要进一步细化通过一系列重复循环活动和过程来完善和清晰化产品，每次迭代产生一个原型，通过多次迭代生成最终产品。
敏捷知识点，冲刺回顾会议：是由Scrum团队的所有成员参加。这次会议的焦点是对整个迭代进行回顾。细节包括：什么进行顺利，缺少什么，需要改变什么等等。团队就未来的迭代改进计划达成一致。这个会议时间框为一个月的迭代，3个小时，比迭代评审时间短。总结经验教训纳入组织过程资产，在下一次迭代启动时做为输入。


==-=--=


5. 实践敏捷方法的开发负责人被任命为一个项目的迭代经理，该负责人与使用瀑布式方法的业务分析师密切合作，但这两个方法的差异已经开始对团队绩效产生负面影响，项目经理分别与开发负责人和业务分析师就这种情况进行会面，但未能解决问题。
项目经理下一步应该怎么做？ A development leader, who practices agile methodology, is assigned as the iteration manager for a project.This leader works closely with a business analyst who uses the waterfall methodology. The differences in these methodologies have begun to negatively impact team performance. The project manager meets individually with the development lead and business analyst about the situation, but fails to resolve the issue.

A: 与业务分析师的经理谈话 Speak with the business analyst’s manager.

B: 请求提供一位具有敏捷方法经验的新业务分析师 Request a new business analyst with experience in the agile methodology. 

C: 为业务分析师提供敏捷方法团队的培训 Train the business analyst on the agile methodology.

D: 与业务分析师和开发负责人一起召开一次联合会议 Conduct a joint meeting with the business analyst and development team.

|*|*|正确答案D
解析：PMBOK（6）P348-9.5.2.1冲突管理-合作/解决问题。利用合作/解决问题的方法解决项目中的冲突，选项D比较合适。


==-=--=


6、一位敏捷教练加入了一个团队，这个团队在过去的几个月里一直致力于一个项目。教练注意到团队成员正在努力消除障碍，没有关于时间限制事件的规则，也没有使用信息发射源来显示项目状态。敏捷教练应该采取的最佳行动方案是什么？
An agile coach joined a team that has been working on a project for the last few months. The coach noticed that the team members were struggling to remove impediments, did not have a discipline around time-boxed events, and were not using information radiators to display the project status. What is the best course of action for the agile coach to take?

A： 帮助团队处理障碍，提醒时间限制的重要性，并强制团队使用信息发射源
Help the team deal with impediments, remind of the importance of time-boxing, and force the team to use information radiators

B： 告诉团队处理障碍，提醒时间限制的重要性，并建议团队使用信息发射源
Tell the team to deal with impediments, remind of the importance of time-boxing, and suggest the team to use information radiators

C： 帮助团队处理障碍，提醒时间限制的重要性，并建议团队使用信息发射源
Help the team to deal with impediments, remind of the importance of time-boxing, and suggest the team to use information radiators

D： 什么都不做，因为问题很小，可以由团队处理，因为敏捷团队是自我管理和自我组织的
Do nothing, since the issues are minor and can be handled by the team because agile teams are self- managing and self-organizing

|*|*|正确答案：C 
解析：知识点出处：敏捷实践指南 页码：P38 章节：4.2.3 仆人式领导：在敏捷环境中，项目经理充当仆人式领导，其工作重点转变为引导需要帮助的人，促进团队的合作，保持与相关方的需要一致。 敏捷教练的重要角色，就是帮助团队清除障碍。另外，时间盒与信息发射源也是重要的敏捷工具。


==-=--=


7、一个敏捷团队成员在开发她为当前冲刺选择的用户故事时遇到了一个技术问题。在多次尝试解决这个问题失败后，团队成员向scrum master寻求建议。对于scrum master来说，最好的行动方案是什么？
An agile team member encounters a technical issue while developing one of the user stories she selected for the current sprint. After multiple unsuccessful attempts to resolve the issue, the team member approaches the scrum master for advice. What is the best course of action for the scrum master?

A： 请求其他团队成员一起充实用户故事并解决问题
Request that the rest of the team members swarm on the user story

B： 将团队成员替换为另一名更有经验的团队成员
Replace the team member with another more experienced one

C： 要求撰写用户故事的产品负责人解决问题
Ask the product owner who wrote the user story to resolve the issue

D： 建议团队成员尝试其他替代解决方案
Recommend that the team member try other alternative solutions

|*|*|正确答案：A
解析：知识点出处：PMBOK 6th 页码：P488 章节：12.2.2.5 谈判：谈判是为达成协议而进行的讨论。采购谈判是指在合同签署之前，对合同的结构、各方的权利和义务，以及其他条款加以澄清，以便双方达成共识。最终的文件措辞应该反映双方达成的全部一致意见。谈判以签署买方和卖方均可执行的合同文件或其他正式协议而结束。 自组织团队，若遇到问题，原则上应该让团队自己处理问题。


==-=--=


8、你被指派领导一个敏捷项目。项目团队由经验丰富的敏捷实践者组成，他们在一起工作了很长时间。在这个敏捷的环境中，对你来说管理项目整合的最佳方法是什么？
You have been assigned to lead an agile project. The project team is comprised of experienced agile practitioners who have been working together for a long time. In this agile environment, what is the best approach for you to take to manage project integration?

A： 制定整合所有项目活动的项目管理计划
Develop the project management plan that integrates all project activities

B： 让团队确定如何整合计划和组件
Let the team determine how plans and components should be integrated

C： 寻求批准聘请外部项目整合管理专家
Seek approval to hire an external project integration management expert

D： 在敏捷环境中，项目整合管理不适用
In agile environments, project integration management is not applicable

|*|*|正确答案：B 
解析：知识点出处：PMBOK 6th 页码：P74 章节：4 在敏捷或适应型环境中需要考虑的因素 在适应型环境下，整合管理的核心概念中所述的对项目经理的期望不变，但是把对具体的产品的规划和交付授权给团队来控制。 在成熟的敏捷环境里，项目经理是仆人式领导的角色，很多决定让自组织成员去做。


==-=--=


9、在项目的第一个阶段发布给客户的最新软件充满了缺陷。客户很生气，并要求计划在第二阶段交付的新版本的开发过程更加透明。客户希望更有规律地看到团队的结果，而不需要很长的开发间隔。 项目团队可以在第二阶段引入下列哪项来更好地满足客户的要求? (选择四个）
The latest software released to the customer in the first project phase is full of defects. The customer is angry and demands that the development of the new release, which is planned to be delivered in the second phase, is much more transparent. The customer wants to see the team’s results more regularly and without very long development intervals in-between. Which of the following could the project team introduce in the second phase to better comply with the customer's demand? (Choose four)

A： 有规律时间框的节奏

A cadence with regular timeboxes

B： 定期和频繁的回顾

Regular and frequent retrospectives

C： 在每个团队成员的层次上进行优化

Optimization at the level of each individual team member

D： 测试驱动的开发实践

Test-driven development practices

E： 使用待办事项列表进行增量交付

Incremental delivery using a backlog

F： 在软件发布之前限制更改的数量

Limiting the number of changes before the software is released

|*|*|正确答案：A,B,D,E
解析：知识点出处：敏捷实践指南 页码：P9 章节：2.2 敏捷的12条原则 排除法 C：敏捷注重团队协作，而非单兵作战 F：敏捷拥抱变化


==-=--=


10、一个敏捷团队的任务是开发一款机器人。项目经理希望确保在机器人被实际建造之前，团队能够收到关于需求的早期反馈并相应地调整设计。项目经理应该使用以下哪一项来实现这个目标？
An agile team is tasked with the development of a robot. The project manager wants to ensure that before the actual robot is built, the team receives early feedback on requirements and adapts the design accordingly. Which of the following should the project manager use to achieve that goal?

A： 原型设计
Prototyping

B： 设计审查
Design review

C： 核对单
Checklists

D： 商业论证
Business case

|*|*|正确答案：A 
解析：知识点出处：敏捷实践指南 页码：P21 章节：3.1.2 迭代型生命周期通过连续的原型或概念验证来改进产品或成果。每一个新的原型都能带来新的相关方新的反馈和团队见解。 题目中明确提到需要反馈，因此原型法比较好用。



`
