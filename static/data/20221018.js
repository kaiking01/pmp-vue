
/** 正确答  */
var rigthAnswer = ' BaaDB CBCCD '

var rightAnswerA = `
b	13.2.3.1
a	8.1.3.2
a	9.3
d	敏捷实践指南
b	敏捷实践指南
c	敏捷实践指南
b	3.1.3
c	6.5.2.3
c	4.6.2.2
d	13.2.3.1
`


/** 接龙数据 */
var allData = `
1. 易江涛 。DCDCB BCADA
2. 曼陀罗 DADDBACAAC
3. 赵艳焜 DADAB BCCDC
4. 歐陽紫陌 dadcbbcaba
5. DADCB BCCDC
6. 邱婉菡 BADDB BBADC
7. 温炳辉 BAACBCBAAD
8. 陈少芬 BAADB CBCCD
9. 陈妙玲 BAADB  CBCDD
10. 郑鸿斌 BAADBCBACD
11. 卢维荣 BADAB CBADC
12. 等等  DCDBB CCDAD
13. zane*治安 DCDCB  DBAAA
14. jo an na DCACB BBDDA
15. 穿拖鞋的王子 DADDB  DBCDC
16. 黄雅君 DADAB CBADC
17. 钟洁莹 DCCAB BAADA
18. 、拾婲。 DADCBBCCAD
19. 陈庆娇 DADDDBCDDD
20. 袁天赐 BCDAB DCADC
21. 秦敏 BADCB  BCAAD
22. 慌、如隔世 DADABBCBDC
23. 莫德坚 BCDCB ACCAD
24. 小婉儿 DADCB BCADC
25. 粽子½ DCDDB DBCDC
26. tyt DCDDB BBCCC
27. 郑舒颖 BADDB CCCDD
28. 吴佳佳 DADCB CCBCD
29. Wilbur- BADAB BBDCC
30. 旭 BDDCBABADC
31. 瑶s  DCDBB BCDAC
32. 于涛 DCDCD BADAC
33. D_uende DADCD DCACD
34. secret DADCB DCAAD
35. Grace DCADB BBCBA
36. 梵高先生 DCDDB DCADC
37. 阿狸 DADAACAAAD
38. 谢成寿 BAAAD ACCDC
39. 陈秋丽Kitty CAADD BACBA
40. 雅 BCDCB BCCDD
41. Suzy芋圆 DCDBB BAADC
42. KLEE🔆 DADCB BCADC
43. Ss DADDB ACADC
44. loading DCDDB BBDAD
45. NICOLE  BAADB CBCDD
46. Stone DCDDB BCDDA
47. yc甘 BCDAD BACAD
48. Dream BCADB BBCCD
49. 肆肆 DCADB BCDDD
50. 陈安然 DADCB DCADA
51. 何文槺  DCCDB DBCDC
`



/**
 * 试题
 * 题目之间的间隔符：  ==-=--=
 * 答案间隔符： |*|*|
 * **/
var testQuestion = `
 
 
 
 1.一家组织正在开展一个软件应用程序开发项目，有不同的相关方参与到该项目的不同阶段。项目经理应该如何让相关方在整个项目过程中参与？
An organization is working on a software application development project with different stakeholders involved in different stages of the project. How should the project manager involve stakeholders throughout the project?

 A ：使用来自相关方的信息来制定项目需求 Use information from interested parties to develop project requirements

 B ： 定期与所有相关方确认关键项目决策 Regularly confirm key project decisions with all interested parties

 C ：让相关方参与制定项目商业论证 Involve interested parties in developing project business case

 D ：不断与所有相关方分享项目状态报告 Continuously share project status reports with all interested parties

|*|*|正确答案：B 
解析：知识点出处：PMBOK 6th 页码：P522 章节：13.2.3.1 相关方参与计划是项目管理计划的组成部分。 它确定用于促进相关方有效参与决策和执行的策略和行动。 解析规划好相关方的定期决策，让相关方持续参与项目。

==-=--=

2、  一个项目涉及来自一个知名供应商的硬件，在项目的中间阶段，该项目经理注意到硬件的质量下降。一名团队成员希望立即开展质量检查。哪一份文件中包含检查规定？
A project involves hardware from a reputable supplier.In the middle of the project,the project manager notice that the quality of the hardware has declined;a team member wants to conduct a quality inspection immediately.What document contains the provisions for inspection?

 A ： 质量测量指标 Quality metrics

 B ：风险登记册 Risk register

 C ：采购合同 Procurement contract

 D ：绩效报告 Performance reporting

|*|*|正确答案：A 
解析：知识点出处： PMBOK 6th 页码：P287 章节：8.1.3.2 质量测量指标： 质量测量指标专用于描述项目或产品属性，以及控制质量过程将如何验证符合程度 质量该怎么检查，检查到什么程度，在质量测量指标里。

==-=--=

3.一个项目已获得批准，且资源管理计划已到位。项目经理联系职能经理，并要求他们所在地区的主题专家(SME)分配给项目团队。然而，由于年终收尾活动，首席财务官拒绝从其他部门分配主题专家。项目经理应该做什么?
A project has been approved and a resource management plan is in place. The project manager contacts the functional managers and asks the subject matter experts (SME) in their area to be assigned to the project team. However, due to year-end closing activities, the CFO refused to assign subject matter experts from other departments.What should the project manager do?

 A ： 请求发起人使用他们的影响力来释放该资源 Ask the initiator to use their influence to release the resource

 B ：为该项目雇用一个新的永久性资源 Hire a new permanent resource for the project

 C ：推迟该项目直到该资源可用为止 Postpone the project until the resource is available

 D ：获得一个临时、技能熟练的外部资源 Obtain a temporary, skilled external resource

|*|*|正确答案：A 
解析：知识点出处： PMBOK 6th 页码：P330 章节：9.3 获取资源的重要性：不能获得项目所需的资源时，可能会影响项目进度、预算、客户满意度、质量和风险；资源 或人员能力不足会降低 项目成功的概率，最坏的情况可能导致项目取消。 不能获取资源，项目可能失败。职能经理不给人，可以 考虑找领导。

==-=--=

4、  项目集经理要求定期更新计划下项目的进展情况。除了一个项目外，所有项目都使用传统方法进行管理。项目集经理指出在整个规划中有太多的范围变更，并希望看到这些变更是如何影响各种项目的总体进度的。对于领导敏捷项目的Scrum主管来说，要满足项目经理的要求，最好的行动方案是什么？
A program manager requests regular updates on the progress of the projects under the program. All but one project in the program are managed using traditional methods. The program manager indicates that there are too many scope changes across the program and wants to see how these changes affect the overall progress of the various projects. What is the best course of action for the scrum master leading the agile project to address the program manager's request?

 A ：邀请项目集经理参加迭代审查会议 Invite the program manager to attend the iteration review meeting

 B ：建议项目集经理参加每日站会 Suggest that the program manager participate in the daily standups

 C ：让项目集经理审查迭代燃尽图 Have the program manager view the iteration burndown chart

 D ： 定期将发布燃起图发送给项目集经理 Periodically send the release burnup chart to the program manager

|*|*|正确答案：D 
解析：知识点出处： 敏捷实践指南 页码：P152 章节：术语表 信息发射源： 它是一种可见的实物展示其向组织内其他成员提供信息在不干扰团队的情况下即时实现知识共享。 信息发射源一般包括看板、燃尽图、燃起图、障碍日志等 信息发射源可以实现信息共享。 C：不应该是审查，而是定期发送。

==-=--=

5.一个使用新技术的复杂敏捷项目被技术挑战、不断变更的优先级、严格的截止日期和客户对敏捷交付方法的不熟悉所困扰。这种环境会给团队成员带来压力和挫折。他们中的许多人开始找项目经理，抱怨这些问题。项目经理首先应该做什么？
A complex agile project that uses a new technology has been plagued by technical challenges, constantly changing priorities, strict deadlines, and the customer's lack of familiarity with agile delivery methods. This environment causes stress and frustration for the team members. Many of them started to come to see the project manager and complain about the issues. What should the project manager do first?

 A ：提交变更请求 Submit a change request

 B ： 消除团队成员的挫败感 Absorb the frustration of the team members

 C ：将问题升级上报给管理层 Escalate the issue to management

 D ：向产品负责人介绍团队成员 Refer the team members to the product owner

|*|*|正确答案：B 
解析：知识点出处：敏捷实践指南 页码：P35 章节：4.2.1.2 消除组织障碍： 仆人式领导还应该关注其他冗长的过程，这些过程往往造成瓶颈问题，阻碍团队或组织的敏捷性。可能需要处理的过程或部门的例子包括，财务部门、变更控制委员会或审计部门。仆人式领导可以与他人携手合作，共同质疑和审核他们的过程，为敏捷团队和领导提供支持。 团队促进者消除组织障碍。

==-=--=

6、 项目经理制定了一个全面的项目管理计划，包括完全详细的WBS和详细的项目进度计划。尽管做了这些努力，但项目仍然落后于计划，因为变更控制委员会（CCB）无法处理大量变更，即使其中大部分已经被产品负责人批准了。项目经理的最佳行动方案是什么？
A project manager has developed a comprehensive project management plan, including a fully elaborated WBS and detailed project schedule. Despite these efforts, the project is running behind schedule because the change control board (CCB) is unable to cope with the high volume of changes, even though most of them have been approved by the product owner. What is the project manager's best course of action?

 A ：要求终止现有的项目，并寻求批准来启动一个将使用敏捷方法的新项目 Request the termination of the existing project and seek approval to initiate a new project that will utilize agile methodologies

 B ：提交变更请求来更新项目进度计划，以反映CCB的长过程时间所造成的延迟 Submit a change request to update the project schedule to reflect the delays caused by the CCB's long process times

 C ： 寻求批准绕过变更控制过程，让项目团队直接与产品负责人合作 Seek approval to bypass the change control process and have the project team collaborate directly with the product owner

 D ：告诉产品负责人项目正在使用预测模型，这意味着大多数变更都应该被拒绝 Instruct the product owner that the project is using a predictive model, which means most of the changes should be rejected

|*|*|正确答案：C 
解析：知识点出处：敏捷实践指南 页码：41 章节：4.3.2 产品负责人 Product Owner： 创建待办列表并排序 、确认工作优先顺序、 提供反馈、 指导开发方向 。 设立了PO，还要经过CCB，那设立PO就没有意义。

==-=--=

7、  一个敏捷团队正在为客户开发定制制造设备。经过三次迭代，一个功能原型已经就绪，但是它缺乏关键的安全功能，以及一些可以在未来版本中现场安装的增强功能。为了尽早得到客户的反馈，产品负责人要求团队尽快交付MVP。项目经理应如何处理产品负责人的要求？
An agile team is developing custom manufacturing equipment for a client. After three iterations, a functional prototype is ready, but it lacks critical safety features as well as several enhancements that can be installed on-site in future releases. To get early feedback from the client, the product owner requests that the team deliver an MVP as soon as possible. What should the project manager do to address the product owner's request?

 A ：在原型上安装安全功能和增强功能，并交付给客户端 Install safety features and enhancements on the prototype and deliver it to the client

 B ： 仅安装原型上的安全功能，然后交付给客户端 Install only the safety features on the prototype and deliver it to the client

 C ：将原型以当前状态交付给客户端，因为它已经正常运行 Deliver the prototype to the client in its current condition as it is already functional

 D ：仅安装原型上的增强功能并交付给客户端 Install only the enhancements on the prototype and deliver it to the client

|*|*|正确答案：B 
解析：知识点出处： PMBOK 6th 页码：P23 章节：3.1.3 MVP 最小可行产品：完整性和交付是主观的。团队可能需要获得关于原型的反馈， 然后可能选择将最小可行性产 品 (MVP) 交付给部分客户。客户的反馈将帮助团队了解他们 需要为随后交付的最终功能的完善提供些什么。 缺安全功能，就给安全功能

==-=--=


8、  项目经理资源有限,无法获得更多资源。项目经理应该使用什么技术来充分利用现有资源,而不会令项目完成时间延期?
A project manager has limited resources and is unable to obtain more. What technique should the project manager use to fully exploit the existing resources without delaying project completion?

 A ：快速跟进 Fast tracking

 B ：赶工 Crashing

 C ：资源平滑 Resource smoothing

 D ：资源平衡 Resource leveling

|*|*|正确答案：C 
解析：知识点出处： PMBOK 6th 页码：P211 章节：6.5.2.3 资源优化： 资源平衡，改变关键路径。 资源平滑，不改变关键路径。 题干提到不能让项目延期，因此只能选择资源优化。

==-=--=

9、  一个产品开发项目正在进行中。该项目在软件开发中使用敏捷的生命周期，并在一个包罗万象的项目管理计划中运行。尽管经过周密的计划，但在发布了两个软件版本之后，用户指南并没有更新以反映最新的版本，这给最终用户造成了很大的混乱。项目经理应该做什么来确保此问题不再发生？
A product development project is underway. The project uses an agile life cycle in software development and runs in an all-encompassing project management plan. Despite careful planning, after the release of two software versions, the user guide was not updated to reflect the latest version, which caused a lot of confusion to end users. What should the project manager do to ensure that this problem does not occur again?

 A ：提交变更请求以修改用户指南，使指南与当前软件版本保持一致 Submit a change request to modify the user's guide in a way that the guide will be consistent with the current software release

 B ：还原到软件的用户指南与发布给用户的软件一致的最后一个版本 Revert back to the last version of the software where the user's guide was consistent with the software released to the users

 C ： 要求CCB执行配置审查，以确保项目配置项的组成正确 Ask the CCB to perform a configuration audit to ensure that the composition of the project's configuration items is correct

 D ：提交变更请求以修订变更管理计划，以确保将用户指南标识为配置要素 Submit a change request to revise the change management plan to ensure that the user's guide is identified as a configuration element

|*|*|正确答案：C 
解析：知识点出处： PMBOK 6th 页码：P118 章节：4.6.2.2 变更控制工具：为了便于开展配置和变更管理，可以使用一些手动或自动化的工具。配置控制重点关注可交付成果及各个过程的技术规范，而变更控制则着眼于识别、记录、批准或否决对项目文件、可交付成果或基准的变更。 配置管理的一个重要功能就是管理产品版本

==-=--=

10、  在项目开工会议期间,一个相关方公开反对该项目在组织内的必要性和优先级。项目经理下一步应该做什么?
During a project kick-off meeting,one stakeholder openly rejects the project's necessity and priority within the organization. What should the project manager do next?

 A ：在相关方登记册中记录该相关方的评估 Document the stakeholder's assessment in the stakeholder register

 B ：将该相关方的问题升级上报给项目发起人 Escalate the stakeholder's concern to the project sponsor

 C ：了解该相关方的立场,并更新风险登记册 Gain an understanding of the stakeholder's position,and update the risk register

 D ： 考虑该相关方的立场,并制定相关方参与计划 Consider the stakeholder's position,and develop the stakeholder engagement plan

|*|*|正确答案：D 
解析：知识点出处： PMBOK 6th 页码：P522 章节：13.2.3.1 相关方参与计划： 是项目管理计划的组成部分。它确定用于促进相关方有效参 与决策和执行的策略和行动。 相关方参与计划可包括（但不限于）调动个人或相关方参与 的特定策略或方法。 遇抵制，找相关方参与计划。

==-=--=
 
 `