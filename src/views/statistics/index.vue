<template>
  <div class="app-container">

    <div class="line pd-b20">
      <label for="">考试日期：</label>
      <el-select v-model="examDate" size="mini" placeholder="请选择" @change="selectChange">
        <el-option v-for="item in dateList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <div class="common-table no-edit-table">
      <el-table :border="true" :data="tableData" class="common-table-box" style="width: 100%" height="500">
        <el-table-column label="行号" type="index" align="center" fixed width="50" />
        <el-table-column v-for="item of columns" :key="item.colName" :prop="item.colName" :label="item.label" :width="item.width" :min-width="item.minWidth">
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

    <!-- 统计图 -->
    <div class="box-line echart-box">
      <div id="lineChartDom" class="echart-cls"></div>
    </div>
  </div>
</template>

<script>

// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

export default {
  name: 'Statistics',
  data () {
    return {
      dateList: [],
      examDate: '',
      columns: [
        { label: '姓名', colName: 'stuName', width: 120, isHtml: false },
        { label: '本次正确率', colName: 'score', width: 90, isHtml: false },
        { label: '答案', colName: 'scoreHtml', width: 'auto', minWidth: 400, isHtml: true },
        { label: '答题次数', colName: 'stuExamNum', width: 80, isHtml: false },
        { label: '总平均分', colName: 'avg', width: 80, isHtml: false },
        { label: '分析&建议', colName: 'analysis', width: 120, isHtml: false, isOpration: true }
      ],
      tableData: []
    }
  },
  created () {
    this.dateList = window.dateList || this.$constant.dateList
  },
  mounted () {
    // debugger
    this.$com.recurArr(this.dateList, 0, () => {
      this.$constant.loadAllData
      this.$constant.countAllData
      this.$constant.userOtherInfo
      this.$constant.charpterExamNum
      this.$constant.chapterAnswerData
      this.$constant.subjectData
      this.$constant.analysisUserData

      // debugger
      this.initFn()
    })
  },
  methods: {
    getHtml (item, row) {
      const t = row[item.colName]
      return t
    },
    getTdValue (item, row) {
      const t = row[item.colName]
      return t
    },
    initFn () {
      const queryParams = this.$common.getCurPathParam()

      if (queryParams && queryParams.hasOwnProperty('date') && !this.$validate.isNull(queryParams.date)) {
        this.examDate = queryParams.date
      } else {
        this.examDate = this.dateList[0].value
      }

      this.selectChange(this.examDate)
    },
    // 跳转分析
    jumpToDetail (row) {
      const query = {
        stuName: row.stuName,
        date: row.date,
        stuExamNum: row.stuExamNum
      }

      // this.$router.push({ name: 'AnalysisPresoner', query })
      const urlStr = this.$common.obj2Str(query)
      const url = `/#/analysis-presoner${urlStr}`
      window.open(url)
    },
    // change event select
    selectChange (value) {
      this.examDate = value
      this.$common.setHrefParams({ date: this.examDate })
      const { tableData } = this.$constant.loadAllData[this.examDate]
      this.tableData = tableData
      // debugger
      this.$echartCom.initLineEchart({ echarts, domId: 'lineChartDom', countData: this.$constant.countAllData[this.curDate], curDate: this.examDate })
    }
  }
}
</script>
