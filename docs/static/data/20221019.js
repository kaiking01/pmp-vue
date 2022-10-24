
/** 正确答  */
var rigthAnswer = ' BDCDC  CADC（BCE） '
// 10月19日答案：BDCDC  CADC  BCE  +CADA
var rightAnswerA = `
b	4.5.2.2
d	6.6.3.3
c	7.2.3.2
d	4.5.2.2
c	敏捷实践指南
c	7.4.2.2
a	10.2.1.3
d	6.2.3.2
c	4.1.3.1
bce	6
`


/** 接龙数据 */
var allData = `
1. 歐陽紫陌 CDDAD  CBCC  (ACE)
2. @%@ BDBDD CACC (BDE) 
5. 林海波 cdca
7. 毅州牧 cbda
8. 关尔.ZERO  BBCDCDACC  (ABC)
9. 开水 ABDDD DADB ACE
10. 风 BDCCD  AADB  ACE
11. NICOLE  BDCAC  CADC（ACE）
12、 tyt BDCCC  CADA (ABE) 
13. 温炳辉 BDCDC  CADC（ABE）
14. 易江涛 BBCDC AADC (ACE) 
15. 谢成寿 BDCDC DAAC (ACE) 
16. secret BBCDD CACC (ACE)
17. 黄雅君 BDCDC DACC (BCE)
18. 陈秋丽Kitty BDBCC ABDC
19. 银河汽水🥤 BDCDC CACC (ACE) 
20. 赵艳焜 BBCDC CADC (ACE) 
21. 等等 CACAC AADD (ACE)
22. 瑶s CDCAD DCBC (ACE)
23. 琴 CACAC AADD (ACE)
24. 秦敏 CACDD +CBCC  (ACE)
25. Suzy芋圆 CDCDD AADD (ACE)
26. 陈庆娇 CACDD CBCC (BCE) 
27. 莫德坚 BDCDC CAAC(ABC)
28. Wilbur- BDCDC CCCD (BCE) 
29. Dream ABCCC  CADA(ACE)
30. 小婉儿 ADBDD CADA(ABC)
31. 邱婉菡 CDCAC CBBC(ABE)
32. 洪俊鑫 CBCDC CADC(ACE)
33. loading ADCDD CACA（BCE）
34. 心语 BDCDC  CACC  (ACE)
35. 粽子½ ABCDC CADC (ABC) 
36. 艾克丝ABCCD ABCC (BDE)
37. 曼陀罗 CDCCD CCCC（ACE）
38. 忠 ADCDD CABA(ACE)
39. 小翠 ADCDA CADC(BDE)
40. 、拾婲。 BDCDCCACC ADE
41. 王小琪 CDCAD DBAC（ACE）
42. 黄霍淋 BDCDC CBDC(ACE)
43. 韦永新 ADCACDCAC (AC)
44. Ss BDCCC  CADA(BDE) 
45. 雅 ADDAD BACC (ACE)
46. yc甘 ADDCD DBCD (ABE )
47. D_uende ABCDD CBBC (ACE)
48. Steven CDCBC CBCC (ABE)
49. 慌、如隔世 ADCACBBCC(ABE)
50. 于涛 BDCDD BACC (ACE)
51. 郭晓丽 BBBDD CADA(ABC)
52. 宇 DDCAD ABAD(ACE)
53. 郑舒颖 BBDDC DACA(ACE) 
`

/**
 * var allData = `
1. 歐陽紫陌 CDDAD  CBCC  (ACE)
2. @%@ BDBDD CACC (BDE) 
5. 林海波 cdca
7. 毅州牧 cbda
8. 关尔.ZERO  BBCDCDACC  (ABC)
9. 开水 ABDDD DADB ACE
10. 风 BDCCD  AADB  ACE
11. NICOLE  BDCAC  CADC（ACE）
12、 tyt BDCCC  CADA (ABE) 
13. 温炳辉 BDCDC  CADC（ABE）
14. 易江涛 BBCDC AADC (ACE) 
15. 谢成寿 BDCDC DAAC (ACE) 
16. secret BBCDD CACC (ACE)
17. 黄雅君 BDCDC DACC (BCE)
18. 陈秋丽Kitty BDBCC ABDC
19. 银河汽水🥤 BDCDC CACC (ACE) 
20. 赵艳焜 BBCDC CADC (ACE) 
21. 等等 CACAC AADD (ACE)
22. 瑶s CDCAD DCBC (ACE)
23. 琴 CACAC AADD (ACE)
24. 秦敏 CACDD +CBCC  (ACE)
25. Suzy芋圆 CDCDD AADD (ACE)
26. 陈庆娇 CACDD CBCC (BCE) 
27. 莫德坚 BDCDC CAAC(ABC)
28. Wilbur- BDCDC CCCD (BCE) 
29. Dream ABCCC  CADA(ACE)
30. 小婉儿 ADBDD CADA(ABC)
31. 邱婉菡 CDCAC CBBC(ABE)
32. 洪俊鑫 CBCDC CADC(ACE)
33. loading ADCDD CACA（BCE）
34. 心语 BDCDC  CACC  (ACE)
35. 粽子½ ABCDC CADC (ABC) 
36. 艾克丝ABCCD ABCC (BDE)
37. 曼陀罗 CDCCD CCCC（ACE）
38. 忠 ADCDD CABA(ACE)
39. 小翠 ADCDA CADC(BDE)
40. 、拾婲。 BDCDCCACC ADE
41. 王小琪 CDCAD DBAC（ACE）
42. 黄霍淋 BDCDC CBDC(ACE)
43. 韦永新 ADCACDCAC (AC)
44. Ss BDCCC  CADA(BDE) 
45. 雅 ADDAD BACC (ACE)
46. yc甘 ADDCD DBCD (ABE )
47. D_uende ABCDD CBBC (ACE)
48. Steven CDCBC CBCC (ABE)
49. 慌、如隔世 ADCACBBCC(ABE)
50. 于涛 BDCDD BACC (ACE)
51. 郭晓丽 BBBDD CADA(ABC)
52. 宇 DDCAD ABAD(ACE)
53. 郑舒颖 BBDDC DACA(ACE) 
`

 */
/**
 * 试题
 * 题目之间的间隔符：  ==-=--=
 * 答案间隔符： |*|*|
 * **/
var testQuestion = `
 1、 一家组织执行了电子邮件迁移项目，虽然电子邮件迁移成功，但用户地址簿信息的迁移却不正确，这会影响到该组织的内部沟通。项目经理应该怎么做？
An organization implemented an email migration project. Although the email migration was successful, the migration of user address book information was incorrect, which would affect the organization's internal communication. What should the project manager do?

 A ：向所有相关方解释这种情况，然后就后续步骤达成一致 Explain the situation to all interested parties and then agree on the next steps

 B ： 确定迁移错误的根本原因 Determine the root cause of the migration error

 C ：要求项目团队提出纠正措施 Ask the project team to propose corrective actions

 D ：请求发起人批准延长项目时间 Ask the sponsor to approve the extension of the project

|*|*|正确答案：B 
解析：知识点出处： PMBOK 6th 页码：P111 章节：4.5.2.2 根本原因分析关注识别问题的主要原因，它可用于识别出现偏差的原因以及项目经理为达成项目目标应重点关注的领域。 选项的顺序应该是B-C-A

 ==-=--=

2、  一位项目经理领导着一个六人的敏捷团队。团队当前的速度和待办事项列表中剩余的故事点的数量表明项目趋向于满足进度基准。在项目执行的中途，项目发起人通知三名团队成员被重新分配到一个新的更高优先级的项目，并且不会被替换。项目经理接下来应该做什么？
A project manager is leading a six-member agile team. The team's current velocity and the number of story points remaining in the backlog indicate that the project is trending to meet the schedule baseline. Midway into project execution, the project sponsor informs that three team members are being reassigned to a new higher priority project and will not be replaced. What should the project manager do next?

 A ：向发起人提供一份正式的信函，说明项目已经终止，因为用剩余的资源实现项目目标并不现实 Provide the sponsor with a formal letter that the project is terminated since achieving the project objectives is unrealistic with the remaining resources

 B ：请求剩余的团队成员再跑三次冲刺，以确定新的速度，这样就可以估算新的项目完成日期 Request the remaining team members to run three more sprints to determine a new velocity so that a new project completion date can be estimated

 C ：要求加班并为剩余的团队成员分配奖金，以弥补差距并确保项目目标的实现 Mandate the use of overtime and allocate bonuses for the remaining team members to bridge the gap and ensure that the project objectives are met

 D ： 根据剩余的资源提交变更请求来修改进度和/或范围基准，并评估如何继续进行的选项 Submit a change request to revise the schedule and/or scope baseline based on the remaining resources and evaluate the options on how to proceed

|*|*|正确答案：D 
解析：知识点出处： PMBOK 6th 页码：P229 章节：6.6.3.3 变更请求：通过分析进度偏差，审查进展报告、绩效测量 结果和项目范围或进度调整情况，可能会对进度基准、范围基准和/或项目管理计划的其他组成部分提出变更请求。确定不给资源，进度一定会受影响，因此要重新评估后提出变更。若是纯敏捷，可以考虑B选项。

 ==-=--=

3、  你向项目出资人提供了项目的成本估算，他对估算不满意，因为他认为价格太高了。他要你削减项目估算的15%，你该怎么做？
You provide a project cost estimate to the project sponsor. He is unhappy with the estimate, because he thinks the price should be lower. He asks you to cut 15 percent off the project estimate. What should you do?

 A ：启动该项目，并不断的节约成本 Start the project and constantly look for cost savings

 B ：告诉所有团队成员削减其估算的15% Tell all the team members to cut 15 percent from their estimates

 C ： 告诉出资人要削减的活动 Inform the sponsor of the activities to be cut

 D ：加入工资率低的额外资源 Add additional resources with low hourly rates

|*|*|正确答案：C 
解析：知识点出处： PMBOK 6th 页码：P247 章节：7.2.3.2 估算依据： 成本估算所需的支持信息的数量和种类，因应用领域而异，不论其细程度如何，支持性文件都应该清晰、完整地说明成本估算是如何得出的。 有清晰明确的估算依据，若发起人认为还要缩减，就需要缩减项目范围了。

 ==-=--=

4、  一个使用多个供应商的项目估计将在两年内完成。在第一年结束时,发现存在重大预算超支。项目经理意识到必须将项目重新拉回控制,因此签发一项变更请求。若要支持这项变更请求,项目经理应该做什么?
A project that uses several vendors is estimated to complete in two years.At the end of the first year,a significant budget overrun is identified that project must be brought back under control,the project manager issues change request.What should the project manager do to support the change request?

 A ：更新变更控制过程 Update the change control progresses

 B ：完成质量审计 Complete a quality audit

 C ：召开风险研讨会 Conduct a risk workshop

 D ： 执行根本原因分析 Perform a root cause analysis

|*|*|正确答案：D 
解析：知识点出处： PMBOK 6th 页码：P111 章节：4.5.2.2 根本原因分析关注识别问题的主要原因，它可用于识别出现偏差的原因以及项目经 理为达成项目目标应重点关注的领域。 注意监控过程组六个数据分析的工具，根本原因分析为其之一。

 ==-=--=

5、  一位敏捷教练被要求为即将到来的敏捷项目团队建立团队。管理层希望利用公司现有的人才，而不要使用外部资源。敏捷教练联系人力资源部门，在公司内部网站上为未来的团队成员发布招聘广告。敏捷教练在广告中提出的以下哪项工作要求是最好的？
An agile coach has been requested to put together a team for the upcoming agile project. The management wants to use the talent available in the company without the need to go outside. The agile coach approaches the human resource department to advertise the position for the prospective team members on the company internal website. Which of the following job requirements is best for the agile coach to indicate in the ad?

 A ：熟悉动态系统软件开发方法（DSDM） Experienced with the dynamic systems software development methods (DSDM)

 B ：熟练掌握自动化测试过程和程序 Self-starter and proficient in the automated testing processes and procedures

 C ：对不同技能是否有专注的专长和丰富的经验 Has a focused specialty as well as a breadth of experience across multiple skills

 D ：具有团队合作精神，熟悉所有敏捷软件开发工具 Team player and briefly familiar with all agile software development tools

|*|*|正确答案：C 
解析：知识点出处：敏捷实践指南 页码：P42 章节：4.3.3 通才型专家： 敏捷团队是跨职能的。不过，许多成功的敏捷团队都由通才型专家组成，他们也称为 T 型人才。 这意味着这些团队成员在具备一项擅长的专业化技能的同时，还拥有多种技能的工作经验，而不是单一的专业化 T型、通才型、跨职能型人才是敏捷团队成员的重要特点。

 ==-=--=


6、 在什么时候通过增加剩余项目的预算（利用业绩表现修正的）达到当前实际的计算EAC的方法最经常使用？
When is the most frequently used method of calculating EAC by increasing the budget of the remaining projects (corrected by performance) to achieve the current actual calculation?

 A ：在偏离被视为非典型的偏离的时候 Current variances are viewed as atypical ones

 B ：由于条件发生变化，初始的估计假定不再可信的时候 Original estimating assumptions are no longer reliable because conditions have changed

 C ： 当前的偏离被视为未来偏离的代表的时候 Current variances are viewed as typical of future variances

 D ：初始的估计假定被认为存在根本性缺陷的时候 Original estimating assumptions are considered to be fundamentally flawed

|*|*|正确答案：C 
解析：知识点出处： PMBOK 6th 页码：P265 章节：7.4.2.2 预测：假设以当前 CPI 完成 ETC 工作。这种方法假设项目将按 截至目前的情况继续进行，即 ETC工作将按项目截至目前的累计成本绩效指数（CPI） 实施。公式：EAC = BAC/CPI。 利用业绩表现修正，说明偏差具备代表性， 属于典型偏差。

 ==-=--=

7、 项目经理在项目执行中途负责管理该项目。项目相关方对团队绩效和交付表示担忧。团队成员向项目经理保证，根据批准的范围，项目符合进度计划和预算。 若要管理这项目的相关方，项目经理应查阅哪份文件？
The project manager is responsible for managing the project in the midway of the project. Project stakeholders are concerned about team performance and delivery. The team members assure the project manager that the project is in line with the schedule and budget according to the approved scope. Which document should the project manager review to manage the stakeholders involved in this project?

 A ： 绩效报告 Performance Report

 B ：项目管理信息系统 （PMIS）Project Management Information System (PMIS)

 C ：绩效改进计划 Performance Improvement Plan

 D ：培训计划 Training Program

|*|*|正确答案：A 
解析：知识点出处： PMBOK 6th 页码：P382 章节：10.2.1.3 工作绩效报告： 根据沟通管理计划的定义，工作绩效报告会通过本过程传递给项目相关方可以表现为有助于引起关注、制定决策和采取行动的仪表指示图、热点报告、 信号灯图或其他形式。 相关方担心绩效，就把绩效报告给相关方看，用以引起 关注或制定决策。

 ==-=--=


8、 项目经理在制定项目进度计划时，希望按照符合逻辑的方式排列任务顺序，并使用至少有高级的承包商。项目经理应该查阅哪份文件？
The project manager wants to arrange the task order in a logical way and use at least a noble contractor while developing the project schedule. Which document should the project manager check?

 A ：里程碑清单 List of milestones

 B ：项目范围说明书 Project scope statement

 C ：活动清单 Activity list

 D ： 活动属性 Activity attributes

|*|*|正确答案：D 
解析：知识点出处： PMBOK 6th 页码：P186 章节：6.2.3.2 活动属性：活动属性可能包括活动描述、紧前活动、紧后活动、逻辑关系、提前量和滞后量（见 6.3.2.3 节）、 资源需求、 强制日期、制约因素和假设条件 活动属性的概念

 ==-=--=

9、  在一个项目的早期阶段，项目经理与许多相关方开会，就项目的目标、关键可交付成果和预算达成共识。项目经理现在可以完成哪份文件？
In the early stages of a project, the project manager meets with many interested parties to reach consensus on the project's goals, key deliverable, and budget. Which document can the project manager complete now?

 A ：项目管理计划 Project management plan

 B ：商业论证 Business case

 C ： 项目章程 Project charter

 D ：可行性计划 Feasibility plan

|*|*|正确答案：C 
解析：知识点出处： PMBOK 6th 页码：P81 章节：4.1.3.1 项目章程：项目章程是由项目启动者或发起人发布的，正式批准项目成立，并授权项目经理使用组织资源开展项目活动的文件。它记录了关于项目和项目预期交付的产品、服务或成果的高层级信息。项目章程的三个作用。

 ==-=--=

10、 [多选] 项目经理正在制定进度管理计划。由于客户表示需要尽早频繁地交付商业价值，因此项目经理选择将迭代计划与待办事项列表合并。该项目的进度管理计划中需要解决以下哪项？（选择三项）
The project manager is in the process of developing the schedule management plan. Since the customer has expressed the need for early and frequent delivery of business value the project manager elects to incorporate iterative scheduling with a backlog. Which of the following will need to be addressed in the schedule management plan for this project?(Choose three）

 A ：在资源可用时使用看板面板来从待办事项列表拉动工作 Using a Kanban board to pull work from the backlog when resources become available

 B ： 使用基于适应型生命周期的滚动式规划 Accounting for rolling wave planning based on an adaptive life cycle

 C ： 以用户故事的形式记录需求 Documenting the requirements in the form of user stories

 D ：在初始项目计划期间将工作包分解为活动清单 Decomposing work packages into an activity list during initial project planning

 E ： 在项目待办事项中确定并优化用户故事的优先级 Prioritizing and refining the user stories in the project backlog

|*|*|正确答案：B,C,E 
解析：知识点出处：PMBOK 6th 页码：P177 章节：6 项目进度管理的发展趋势和新兴实践：具有未完项的迭代型进度计划。这是一种基于适应型生命周期的滚动式规划（B），例如敏捷的产品开发方法。这种方法将需求记录在用户故事中（C），然后在建造之前按先级排序（E）并优化用户故事，最后在规定的时间盒内开发产品功能。 具有未完成项的迭代型进度计划，而非按需进度计划，因此不选A。

 
 `