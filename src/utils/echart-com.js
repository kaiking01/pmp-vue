
import $constant from '@/utils/open/constant'
export default {
  initEchart (type, { echarts, countData, curDate }) {
    // return
    console.log('---initEchart', curDate);
    if (!countData) return
    type = type || 'line'
    if (type === 'line') {
      this.initLineEchart({ echarts, countData, curDate })
    } else {
      this.initPieEchart({ echarts, countData, curDate })
    }
  },
  // 初始化饼图
  initPieEchart ({ echarts, domId, countData, curDate }) {
    var pieChartDom = echarts.init(document.getElementById(domId));
    const seriesData = {
      name: '错题占比',
      type: 'pie',
      radius: '50%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }

    // $constant.loadAllData
    // $constant.analysisUserData
    // $constant.countAllData
    // $constant.userOtherInfo
    // $constant.charpterExamNum
    // $constant.chapterAnswerData
    // debugger
    chapterList.forEach((o, i) => {
      const chapter = countData[i]
      // const curChapter = chapter.curChapter
      let errorNum = 0
      if (chapter) {
        errorNum = chapter.errorNum
      }
      // debugger
      seriesData.data.push({
        name: o.label,
        value: errorNum,
      })
    })


    const option = {
      color: echartColors,
      title: {
        text: `【${curDate}】题目分布`,
        // subtext: 'Fake Data',
        // left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        bottom: '0'
      },
      series: [seriesData]
    };

    option && pieChartDom.setOption(option);
  },

  /**
   * 按题目数，分析错题情况
   * 条形图+折线图：
   * x轴是题目数， 条形图：本次做题总人数 ， 折线图：错题人数
   */
  // 初始化条形统计图
  initLineEchart ({ echarts, domId, countData, curDate }) {
    const lineChartDom = echarts.init(document.getElementById(domId));
    // debugger
    // const curExamData = $constant.loadAllData[curDate]
    // const countAllPersionNum = curExamData.tableData.length
    const xAxisData = []

    const errorData = {
      name: '答错人数',
      type: 'line',
      data: [],
      itemStyle: { normal: { label: { show: true } } }
    }
    const allData = {
      name: '答题人数',
      type: 'bar',
      data: []
    }

    // x轴数据
    const testArr = $constant.chapterAnswerData[curDate] // 题目数据
    testArr.forEach((o, i) => {
      xAxisData.push(`第${i + 1}题`)
    })

    // y轴数据
    const curSubject = $constant.subjectData[curDate]
    // debugger
    xAxisData.forEach((o, i) => {
      const exam = curSubject[i]
      // debugger
      errorData.data.push(exam.errNum)
      allData.data.push(exam.allNum)
    })

    // 指定图表的配置项和数据
    var option = {
      color: ['#93A1A1', '#e45649', '#51a36d', '#859900', '#6C71C4', '#93A1A1', '#0996b3', '#e45649', '#259185'],
      title: {
        text: `错题情况【${curDate}】`
      },
      grid: {
        left: '10%',
        top: '15%',
        right: '10%',
        bottom: '15%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter (params) {
          let str = ''
          params.forEach((seriesObj, i) => {
            const dataIndex = seriesObj.dataIndex
            const t = testArr[dataIndex]
            if (!str) {
              str = `<span class="fs-16">${seriesObj.axisValue}</span> <span class="fs-12">${t.label}</span><br/>`
            }
            // debugger
            const iconHtml = `<span class="echart-tooltip-icon" style="background: ${seriesObj.color};"></span>`
            str += `<div class="echart-tooltip-line">${iconHtml} ${seriesObj.seriesName} ${seriesObj.value}</div>`
          })
          return str
        }
      },
      legend: {
        bottom: 0,
        data: ['答题人数', '答错人数']
      },
      xAxis: {
        data: xAxisData
      },
      yAxis: {},
      series: [
        allData, errorData
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    lineChartDom.setOption(option);
  }
}