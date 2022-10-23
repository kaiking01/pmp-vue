<template>
  <div class="app-container scroll-bar">

    <div class="user-info" id="userInfoDom">
      <div class="line flex flex-l">
        <div class="label-cls">姓名：</div>
        <div class="value-cls">{{queryParam.stuName}}</div>
      </div>
      <div class="line flex flex-l">
        <div class="label-cls">答题次数：</div>
        <div class="value-cls">{{queryParam.stuExamNum}}</div>
      </div>
    </div>

    <div class="common-table no-edit-table">
      <el-table :border="true" class="common-table-box" :data="tableData" style="width: 100%" :row-class-name="tableTrCls">
        <el-table-column label="行号" type="index" align="center" fixed width="50"></el-table-column>
        <el-table-column v-for="item of columns" :key="item.colName" :prop="item.colName" :label="item.label" :width="item.width" :minWidth="item.minWidth">
          <template slot-scope="scope">
            <!-- <CellItem :group-item="colItem" :row="scope.row" @formEvent="formEvent" /> -->
            <div v-if="item.isHtml" :class="item.class" class="flex flex-l" v-html="scope.row[item.colName]"></div>
            <!-- isLink:1.链接，点击支持跳转 -->
            <span v-else-if="item.isOpration" :class="item.class" :style="item.style" :data-islink="item.link ? 1 : 0">
              <el-button size="mini" @click="jumpToDetail(scope.row)">查看分析</el-button>
            </span>
            <span v-else :class="item.class" :style="item.style" :data-islink="item.link ? 1 : 0">{{ scope.row[item.colName] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="test-container mg-t20">

      <div class="line">
        <label for="">考试日期：</label>
        <el-select size="mini" v-model="examDate" placeholder="请选择" @change="selectChange">
          <el-option v-for="item in dateList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>

      <!-- 有答题 -->
      <template v-if="!isNoData">
        <div class="line flex flex-l">
          <div class="label-cls">本次答题正确率：</div>
          <div class="value-cls right-score" :class="curRatio>60 ? 'font-blue' : 'font-red'">{{curRatio}}</div>
        </div>

        <div class="line flex flex-l">
          <div class="label-cls">考生原答案：</div>
          <div class="value-cls pd-l10">{{originAnswer}}</div>
        </div>

        <div class="line flex flex-l">
          <div class="label-cls">只看错题：</div>
          <div class="value-cls">
            <el-switch v-model="isViewErr" active-color="#13ce66" inactive-color="#ddd" @change="viewErrchange">
            </el-switch>
          </div>
        </div>

        <div class="text-wrap mg-t20">
          <ul class="ul">
            <li class="li" v-for="item of testList" :key="item.stuName">
              <div class="test-content">
                <pre>{{item.subject}}</pre>
              </div>
              <div class="stu-answer" :class="item.class">考生答案：{{item.stuAnswer}}</div>
              <div class="test-answer">
                <pre>{{item.answerAnalysis}}</pre>
              </div>
            </li>
          </ul>
        </div>

      </template>
      <div v-else class="line error-cls">当前日期没有答题</div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'AnalysisPresoner',
  data () {
    return {
      isNoData: false, // 当前日期是否有答题
      dateList: window.dateList,
      isViewErr: true,
      curRatio: 0,
      originAnswer: '',
      examDate: '',
      testList: [],
      columns: [
        { label: '正确率', colName: 'successRatio', width: 120, isHtml: false },
        { label: '章节题目总数', colName: 'allNum', width: 120, isHtml: false },
        { label: '对 / 错', colName: 'succAndErr', width: 80, minWidth: 400, isHtml: true },
        { label: '章节', colName: 'chapterName', width: 'auto', isHtml: false }
      ],
      tableData: [],
      queryParam: {}
    }
  },
  created () {
    this.queryParam = this.$route.query
    this.examDate = this.queryParam.date

    this.$com.recurArr(this.dateList, 0, () => {
      // debugger
      this.initTableData()// 初始化表格数
      this.initTestData()// 初始化题目数据
    })
  },
  methods: {
    tableTrCls ({ row }) {
      let cls = ''
      if (row.allNum <= 0) {
        cls = 'tr-bg-red'
        // debugger
      }
      return cls
    },
    viewErrchange () {
      // debugger 
      this.initTestData()// 初始化表格数
    },
    // 考试日期，查看题目
    // change event select
    selectChange (value) {
      this.examDate = value
      // debugger
      this.initTestData()// 初始化题目数据
    },
    // 初始化表格数
    initTableData () {
      const { stuExamList, stuExamNum, avg } = this.$com.analyzeStuAll({ stuName: this.queryParam.stuName }) // 统计考生多次答题情况，按章节划分
      stuExamList.forEach(row => {
        row.succAndErr = `${row.successNum} / ${row.errNum}`
      })
      this.tableData = stuExamList
    },
    // 初始化试题
    initTestData () {
      const stuName = this.queryParam.stuName
      if (!stuName) {
        return
      }
      const curData = this.$constant.loadAllData[this.examDate]
      const { tableData } = curData
      // debugger
      let stuData = ''
      tableData.some(o => {
        if (o.stuName === stuName) {
          stuData = o
          return true
        }
      })
      debugger
      if (!stuData) {
        this.isNoData = true
        return
      }

      this.isNoData = false

      this.curRatio = stuData.score

      this.originAnswer = `${stuData.originData}`
      const studentAnswerList = stuData.studentAnswerList
      const arr = this.$constant.subjectAllList[this.examDate].slice()
      // debugger
      const curRightAswer = this.$constant.rightAswerObj[this.examDate]
      let isSuccess = ''
      const tableArr = []
      debugger
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (item.answerAnalysis) {
          isSuccess = false
          const rightAnswer = curRightAswer[i]
          const stuAnswer = studentAnswerList[i]
          // console.log(i, rightAnswer, val2);
          // debugger
          if (rightAnswer === stuAnswer) { // 是否正确
            isSuccess = true
            // debugger
          }
          // debugger
          // if(this.isViewErr)
          if (this.isViewErr && isSuccess) { // 只看错题时，正确的不显示
            // debugger
            // console.log(i, '只看错题时，正确的不显示');
            continue
            // return
          }
          item.class = { 'font-red': !isSuccess }
          item.stuAnswer = stuAnswer
          item.rightAnswer = rightAnswer
          tableArr.push(item)

        }
      }
      // debugger
      this.testList = tableArr
    }
  }
}
</script>


<style scoped lang="scss">
@import '~@/styles/variables.scss'; // css变量
.font-red {
  color: #f00;
}

.font-blue {
  color: #22a6f2;
}

.right-score {
  font-weight: bold;
}

.test-container {
  padding: 20px 8px;
  background: #eee;
  border: 1px solid #eee;
}

.test-container .ul {
  padding: 0;
  height: 50vh;
  min-height: 500px;
  overflow: hidden;
  overflow-y: auto;
  @extend .scroll-bar;
}

.test-container .ul .li {
  list-style: none;
  margin: 0;
  margin-bottom: 14px;
  padding: 10px;
  line-height: 26px;
  background: #fff;
  border-radius: 4px;
  white-space: pre-line;
}

.test-container .ul .li pre {
  margin: 0;
  padding: 0;
  white-space: pre-line;
}

.test-container .ul .li .stu-answer {
  padding: 10px 0;
}

.test-container .ul .li .test-answer {
}
</style>