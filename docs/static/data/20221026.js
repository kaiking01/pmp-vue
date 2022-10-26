
/** 正确答  */
var rigthAnswer = 'BAADC CCBCC'

var rightAnswerA = `
b	敏捷实践指南
a	敏捷实践指南
a	敏捷实践指南
d	敏捷实践指南
c	敏捷实践指南
c	敏捷实践指南
c	敏捷实践指南
b	敏捷实践指南
c 敏捷实践指南
c	敏捷实践指南
`

/** 接龙数据 */
var allData = `


1. 赵艳焜  BABAC DBBCC
2. 于涛 BCADC DCBCC
3. 李翠艳 ABBBC CCCCC
4. 易江涛 BAAAC CCBCC
5. 姜嘉成 BBBDC CCBCC
6. 刘思婷 BAAAC CCBCC
7. 汪关心 BAADB CCBCC
8. 王鑫 BBAAC CCBAC
9. 吴贤玲 AAADC CCBCC
10. NICOLE  BABDC CCBCC
11. 陈少芬 BAADC CCBCC
12. 李勇发 BCAAB CCBBC
13. 卢维荣 BAAAC CCBCC
14. 陈小棋 BABDC CCBCC
15. 等等 BAACC ACCAA
16. 黄雅君 BAAAC CCBCC
17. 温炳辉 BAADC CCBCC
18. 文博 BAACC CCBCC
19. jo an na BAAAC BCBCC
20. 李莹 DAACC CCBCC
21. 盛洁 DAADC CCBCC
22. 谢成寿 bacbc abbcc
23. 莫德坚 DAAAB CABCC
24. 黄霍淋 BAAAC CCBCC
25. 阮晓梦 BAADC CCBCC
26. 袁天赐 BAADC CCBAC
27. 郭晓丽 BAADC CCBDC
28. 陈书婷 DAAAB ACBCC
29. 陈庆娇 BAAAC DCCCC
30. 黄建珩 bcaac dcbcc
31. 唐泷彪 BBDBC  CCCAC
32. 洪俊鑫 BBBBC CBCCC
33. 艾克丝 BABDC CCCAC
34. 陈永发 BBAAC CCBCC
35. loading BCBAC CCBCC
36. 新 BAADC CCBCC
37. 汤燕婷 BABDB CABAD
38. 邹班庆 BAAAC CCBAC
39. 林英 BAAAC  CCBCC
40. 熊佳 BAABD CABAC
41. 李凯旋 BAADC CCBCC
42. 宋欣瑶BAABC CCBAC
43. 邱婉菡 ABBAB ACBAA
44. 郑鸿斌 BBACCCCBCC
45. 陈妙玲 BAADC CCBAC
46. D_uende AABAC CCBAA
47. Ss BAAAD CCBBA
48. 秦敏 BBADC CBBAC
49. 何文槺 BABDC CBBDC
50. 旭 bcaac dcbdc
51. 慌、如隔世 BAAADCCBAC
52. 雪落无痕 BDBDC CCCAC
53. 郑舒颖 BCBAC DCBAC
54. 陆婉仪 BBCCC BCCAC


`

/**
 * 试题
 * 题目之间的间隔符：  ==-=--=
 * 答案间隔符： |*|*|
 * **/
var testQuestion = `


1. 你正在处理一个为某位客户开发产品的项目。你已经决定采用敏捷开发方法论。你注意到，客户并不有意参与项目，因为他们认为，一旦已与你签下订单，你的团队应该在商定的时间和成本内交付产品。在这种情况下，最好的方法是什么？
You are handling a project to develop a product for one of your clients. You have decided on Agile methodology for development. You notice that the client is not very involved in the project because they believe that once the order has been placed with you, your team should deliver the product within the time and cost agreed on. What would be the best approach in this scenario?

A 在项目的开始签署
Take a sign-off at the beginning of the project

B 与产品负责人合作，并进行冲刺审查
Engage product owner and conduct sprint reviews

C等待客户提供反馈
Wait for the client to give you feedback

D 基于类似的项目做出决定
Make a decision based on similar projects

|*|*|正确答案：B 
解析：知识点出处：敏捷实践指南 页码：41 章节：4.3.2 产品负责人Product Owner：创建待办列表并排序、确认工作优先顺序、提供反馈、指导开发方向 在Scrum中，一切对客户的沟通为PO。


==-=--=



2. —家跨国公司的组织单位有大量的产品增强功能待办事项，这些产品增强功能是暂时保留的用户故事。待批准的预算申请在上周获得批准。作为初始程序的一部分，新指派的项目经理应该做什么？ An organization unit of a multinational corporation has a very large backing of product enhancements described as user stories on hol The pending budget was approved last week.What should the newly assigned project manager do as part of initial procedures?

A 记录项目生命周期和方法讨论需求 Document the project life cycle and methodology requirements

B 为所有用户故事制定一份进度计划 Prepare a schedule for all user stories

C 对所有用户故事执行风险评估 Performa a risk assessment of at user stories

D 根据以前相同产品的项目分配资源 Assign resource based on previous projects for the same product

|*|*|正确答案 A
解析：PMBOK（6）P145，敏捷项目管理先明确生命期类型和开发方法为适应型生命期项目，采用敏捷开发方法。明确第一个迭代的需求、用户故事和待办事项。产品待办事项列表（Product Backlog）存放未完成的用户故事（产品未完项），类似软件开发需求池，由产品负责人负责生成、维护和更新。用户故事：用户故事是一个用来确认用户和用户的需求的简短的描述，把你的用户角色提炼出来。


==-=--=


3. 一名高管在生产上线期间加入敏捷团队，在上线之后，该高管希望知道sprint冲刺期间哪些进展顺利，以及哪些进展不顺利，该高管应该参加什么会议? A senior executive joins an agile team during production go-live following the go-live，The Executive wants to know what did and did not go well during the sprint。What meeting should the executive have attended？

A 回顾会议 Retrospective

B 每日scrum会议 Daily scrum 

C sprint评审会议 Sprint review

D sprint计划会议 Sprint planning

|*|*|正确答案A
解析：敏捷知识点，回顾会议是由Scrum团队的所有成员参加。这次会议的焦点是对整个迭代进行回顾。细节包括：什么进行顺利，缺少什么，需要改变什么等等。团队就未来的迭代改进计划达成一致。这个会议时间框为一个月的迭代，3个小时，比迭代评审时间短。每日站立会（Daily Scrum Meeting），15分钟，一天一次，每个人回答：昨天做什么，今天做什么，遇到什么问题，更新任务燃尽图。Sprint评审会议（Sprint Review Meeting）每次Sprint结束前召开，团队展示产品增量，会议组织评审和验收，确定是否可以交付。


==-=--=


4. 你被指派领导一个敏捷项目。然而，当你第一次与你的团队见面时，你意识到由于公司强加的各种各样的限制，大多数的团队成员不可能100%致力于项目。你的最佳行动方案是什么？
You have been assigned to lead an agile project. However, when you meet with your team for the first time, you realize that due to various company's imposed constraints, most of the team members would not be able to be 100% dedicated to the project. What is your best course of action?

A 将开发方法从敏捷切换到Scrum
Switch the development approach from agile to scrum

B 将迭代时间从两周增加到四周
Increase iteration length from two to four weeks

C 向加班的团队成员提供奖励
Offer rewards to the team members to work overtime

D 根据个人能力调整任务
Adjust assignments based on individual capacity

|*|*|正确答案：D 
解析：知识点出处：敏捷实践指南 页码：P44 章节：4.3.5 专职小组成员：任务切换时，人员工作效率的损失在 20% 到 40% 之间。随着任务数量的增加，效率损失会呈指数级增长。团队通过使用协作工具来跟踪和监督他们的工作进度，并根据个人的能力来调整工作分配。 敏捷倡导专职，若实在无法专职，则需要根据团队能力自行安排调整任务


==-=--=



5. 敏捷团队正在根据商业分析师团队提供的用户故事开发产品。在第四次冲刺之后，相关方举行了一次演示，其中三个已完成的故事获得通过，其余两个故事未能满足相关方的期望，项目经理应该怎么做？<br/>An Agile teams is working on product according to the user stories provided by a team of business analysts. After the fourth sprint, a demo for stakeholders is held and Three completed stories pass, The remaining two stories fail to meet stakeholders expectations. What should the project manager do?

A 要求商业分析师开发新的用户故事 Ask the business analysts to develop new user stories

B 审查用户故事并签发变更请求 Review the user stories and issue a change request

C 确认相关方的期望，然后更新并重新编写用户故事 Confirm stakeholder expectations, then update and rework the user stories

D 启动一个新项目，将修订后的用户故事纳入工作范围 Initiate a new project to incorporate revised user stories into the scope of work

|*|*|正确答案C
解析：敏捷问题，敏捷方法用用户故事来显示项目范围（相关方需求和期望），如果没有满足，要重新编写故事即重新确定范围。 


==-=--=


6、客户对交付的产品不满意，称其并不符合他们的期望。项目经理很惊讶，因为敏捷开发团队提前几个迭代交付了产品。项目经理有什么方法可以避免这种结果？
A customer is not satisfied with the delivered product, saying that it was not what they expected. The project manager is surprised, because the agile development team delivered the product several iterations early. What is one way that the project manager could have avoided this result?

A 要求团队对需求的每一个持续的变更签字
Required team sign off for each of the constant changes to the requirements

B 在做出变更之后，为产品测试留出更多资源
Set aside more resources for product testing after changes are made

C 确保客户意识到演示的价值
Made sure that the customer was aware of the value of demos

D 确保团队充分参与开发项目范围
Ensured that the team fully participated in developing the project scope

|*|*|正确答案：C 
解析：知识点出处：敏捷实践指南 页码：P57 章节：5.2.8 交付的第一部分是一次演示。团队会收到关于产品的外观和运行方式的反馈。团队成员回顾如何检查和调整有关过程以取得成功。演示或评审是敏捷项目流程的必要组成部分。为团队的交付节奏安排适当的演示。 演示或评审是必要组成部分。演示与反馈要频繁进行


==-=--=



7、在项目最后一次迭代结束前两天，敏捷教练注意到其中一位开发人员的绩效明显下降，危及迭代目标。教练和开发人员在迭代结束后的一天安排了一对一的指导会议。在这种情况下，敏捷教练最好采取什么行动方案？
Two days before the end of the last iteration of the project, an agile coach has noticed that the performance of one of the developers significantly degraded, risking the iteration goal. The coach and the developer have a one-on-one coaching meeting scheduled a day after the iteration’s end date. What is the best course of action for the agile coach to take in this situation?

A 对开发人员进行个人绩效评估
Conduct the individual performance appraisal of the developer

B 要求团队一起完成本应分配给此开发人员的任务
Ask the team to swarm on the tasks assigned to the developer

C 利用实时反馈与开发人员一起解决问题
Employ real-time feedback to address the issue with the developer

D 等待与开发人员安排的一对一会议
Wait for the one-on-one meeting scheduled with the developer

|*|*|正确答案：C 
解析：知识点出处：敏捷实践指南 页码：P35 章节：4.2.1.1 仆人式领导的促进作用：仆人式领导促进团队内部和团队之间的合作与对话。例如，仆人式领导在团队内部和团队之间帮助发现瓶颈问题，并进行相应沟通。 有问题要实时解决，而不是事后再处理。


==-=--=


8、敏捷教练一直在通过或超越他们当前的角色来培养和发展团队成员。这帮助一些团队成员发展了他们的个人和专业技能，使他们觉得他们已经超越了自己的角色。最终，他们中的一些人离开了团队，在组织内外寻找新的机会。敏捷教练的方法正确吗？
An agile coach has been nurturing and growing team members through and beyond their current roles. This helped several team members to develop their personal and professional skills to the level where they felt that they outgrew their roles. Eventually, some of them left the team to pursue new opportunities within the organization and outside of it. Was the agile coach right in her approach?

A 不正确，敏捷领导者必须确保团队成员永远不会离开他们的团队
No, agile leaders must ensure the team members never leave their teams

B 正确，敏捷领导者应该培养团队成员，即使这意味着失去他们
Yes, agile leaders should develop team members even if that means losing them

C 不正确，敏捷领导者可能会培养团队成员，但不会超越他们当前的角色
No, agile leaders may develop team members but not beyond their current roles

D 正确，敏捷领导者必须确保团队成员最终离开团队
Yes, agile leaders have to make sure team members eventually leave the team

|*|*|正确答案：B 
解析：知识点出处：敏捷实践指南 页码：P37 章节：4.2.1 仆人式领导的职责:仆人式领导的一个关键作用是，培养和发展团队成员，帮助他们超越自身当前的角色，即使团队将失去他们也在所不惜.


==-=--=


9、一位来自传统项目管理组织的项目经理被分配到正在进行的项目中。最近，该组织开始在其项目中使用敏捷方法。项目经理听说有些团队成员感觉缺少关键主题的专业知识，并且团队内部协作不足。项目经理应该如何回应这些团队成员的担忧？
A Project Manager from a traditional project management organization is assigned to an ongoing project. Recently, the organization has started to use agile methodologies in its projects. The Project Manager hears that some team members feel like key subject matter expertise is missing and there is insufficient collaboration within the team. How should the Project Manager respond to these team members' concerns?

A 聘请第三方专家来填补知识空白
Employ third-party specialists to fill the knowledge gap

B 通过请求向发起人添加额外资源
Add additional resources via a request to the sponsor

C 添加跨职能的内部资源
Add cross-functional internal resources

D 在可能的情况下，修改甘特图到看板面板
Where possible, modify Gantt charts to Kanban boards

|*|*|正确答案：C 
解析：知识点出处：敏捷实践指南 页码：P42 章节：4.3.3 通才型专家：敏捷团队是跨职能的，但其人员往往不会一开始就做到这样。不过，许多成功的敏捷团队都由通才型专家组成，他们也称为 T 型人才。 这意味着这些团队成员在具备一项擅长的专业化技能的同时，还拥有多种技能的工作经验，而不是单一的专业化。 T型、通才型、跨职能型人才是敏捷团队成员的重要特点。


==-=--=


10、一个开发团队正在为他们的敏捷项目进行计划中的一次冲刺。一位相关方找到scrum master，想知道为什么在上一次冲刺中删除某一功能、在下次冲刺中交付什么功能计划、以及钱是如何花在项目上的。在这种情况下，scrum master最好采取什么行动方案？
A development team is working through one of the sprints planned for their agile project. A stakeholder approaches the scrum master wondering why a certain feature was removed from the last sprint, what features are planned to be delivered in the next sprint, and how the money is being spent on the project. What is the best course of action for the scrum master to take in this situation?

A 建议相关方查阅项目燃尽图
Advise the stakeholder to consult the project burndown charts

B 将相关方推荐给团队成员以获取信息
Refer the stakeholder to the team members to get the information

C 建议相关方与产品负责人交谈
Recommend that the stakeholder talk to the product owner

D 在每日站会上提供所要求的信息
Provide the requested information at the daily standup meeting

|*|*|正确答案：C 
解析：知识点出处：敏捷实践指南 页码：41 章节：4.3.2 产品负责人Product Owner： · 创建待办列表并排序 · 确认工作优先顺序 · 提供反馈 · 指导开发方向所有的待办列表优先级的划分，都由PO来决定。



`
