// debugger
// const $constant.loadAllData = {}
// const $constant.analysisUserData = {}
// const $constant.rightAswerObj = {} // 每次考试的正确答案
// const $constant.countAllData = {} // 统计每次答题情况（主要是分析出错情况）
// const $constant.userOtherInfo = {} // 比如考生答题次数，章节对应的题目数，答题数，正确数，错误数
// let $constant.charpterExamNum = {} // 统计章节对应的题目总数
// let $constant.subjectData = {} // 题目数对应的考生答题情况
// let $constant.chapterAnswerData = {} // 各章节的正确答案+章节名称+章节索引
// const $constant.tableOprationData = {} // 存储表格操作记录，比如排序的toggle
// const $constant.rightTdDom = document.querySelector('#rightTdDom') // table head td 正确答案单元格
// const $constant.subjectAllList = {} // 所有考试的题目，按日期分

import $constant from '@/utils/open/constant'
// import $common from '@/utils/open/common'
import $validate from '@/utils/open/validate'

const regSecialSymbols = /(\n|\r|\r\n|↵)/g // 正则：换行符等

export default {
  // 处理答案 对应的章节数据
  initChapterData (data) {
    $constant.charpterExamNum = {}
    // 根据换行符，拆成数组
    const list = []
    const arr = data.split(regSecialSymbols)
    // console.log(arr);
    // debugger
    // let charpterNum = 0
    arr.forEach(o => {
      if (o && !regSecialSymbols.test(o)) {
        const val = o.split(/\s/g)
        // console.log('1.',o);
        const charpterNum = val[1] // 章节序号
        // debugger

        // 注意：章节数是从1开始，索引是从0开始
        let firstN = charpterNum.split('.')[0]
        // eslint-disable-next-line
        if (firstN == '敏捷实践指南') { // 敏捷没有章节数
          // debugger
          firstN = $constant.chapterList.length
        } else {
          firstN = Number(firstN)
        }
        // debugger
        if (!$constant.charpterExamNum[firstN]) {
          $constant.charpterExamNum[firstN] = {
            allNum: 0
          }
        }
        $constant.charpterExamNum[firstN].allNum++

        const curChaObj = $constant.chapterList[firstN - 1] // 取单一章节数据
        // debugger
        list.push({
          label: curChaObj.label,
          answer: val[0].toUpperCase(),
          chapter: charpterNum
        })
      }
    })
    // debugger
    return list
  },

  // 递归动态加载所有数据
  recurArr (arr, index, fn) {
    // debugger
    if (index < arr.length) {
      const value = arr[index].value
      const src = `../../static/data/${value}.js`

      // debugger
      this.loadScript(src, value, () => {
        // eslint-disable-next-line
        const { tableData } = this.initData({ allData, testQuestion }, { rigthAnswer, rightAnswerA, curDate: value })
        // debugger
        $constant.loadAllData[value].tableData = tableData
        index++
        this.recurArr(arr, index, fn)
      })
    } else {
      // debugger
      fn && fn()
    }
  },
  // 处理答案，有的答案中有中英文括号
  execuAnswerbrackets (str) {
    let rigthList = []
    // const letterReg = /\((.+?)\)[A-Z|a-z]+/g // 英文字母正则匹配

    if (!$validate.isNull(str)) { // 不能为空
      const regex1 = /(?<=\(|\（)(.+?)(?=\)|\）)/g // 是否存在中英文括号
      // const letterReg = /\((.+?)\)|\（(.+?)\）|[A-Z|a-z]+/g // 英文字母正则匹配
      // const letterReg = /[\(|\（](.+?)[\)|\）] | [A-Z|a-z]+/g // 英文字母正则匹配
      const letterReg = /(\(|\（)(.+?)(\)|\）)|[A-Z|a-z]+/g // 中英文括号+英文字母正则匹配

      const rightArr = str.match(letterReg)

      if ($validate.isNull(rightArr)) {
        return rigthList
      }

      if (regex1.test(str)) { // 存在中英文括号(是多选的情况)
        // debugger

        // 包含 中英文 括号的
        const reg1 = /\((.+?)\)/g // 判断是否存在 英文的括号
        const reg2 = /\（(.+?)\）/g // 判断是否存在 中文的括号

        // 不包含 中英文 括号的
        const reg11 = /(?<=\()(.+?)(?=\))/g // 英文
        const reg22 = /(?<=\（)(.+?)(?=\）)/g // 中文
        const reg33 = /(\(|\（)(.+?)(\)|\）)/g // 中文 + 英文 括号混合
        rightArr.forEach(o => {
          const t1 = reg1.test(o) // 是否存在 英文
          const t2 = reg2.test(o) // 是否存在 中文
          const t3 = reg33.test(o) //  中文 + 英文 括号混合

          if (t1) { // 英文
            const v1 = o.match(reg11).map(r => r.toUpperCase())
            rigthList = rigthList.concat(`(${v1})`)
            // debugger
          } else if (t2) { // 中文
            const v2 = o.match(reg22).map(r => r.toUpperCase())
            rigthList = rigthList.concat(`(${v2})`)
            // debugger
          } else if (t3) { // 中英文括号混合（多选题）
            // let v3 = o.replace(/[\(\（\(\）]/g, '') // 把中英文括号替换掉
            const v3 = o.replace(/[\（]/g, '(').replace(/[\）]/g, ')') // 把中文括号替换掉
            rigthList.push(v3.toUpperCase())
            // debugger
          } else {
            if (o.length > 1) { // 字符数大于1才需要拆解
              const arr = o.split('').map(r => r.toUpperCase())
              rigthList = rigthList.concat(arr)
            } else if (o.length > 0) {
              rigthList.push(o.toUpperCase())
            }

            // debugger
          }
        })
      } else { // 没有中英文括号
        try {
          rigthList = rightArr.join('').split('').map(o => o.toUpperCase()) // 统一转大写
        } catch (error) {
          console.error(error)
          // debugger
        }
      }
    }
    return rigthList
  },
  // 按答题批次，整合题目相关数据
  initTestQuestion ({ testQuestion, curDate }) {
    if (!$constant.subjectAllList[curDate]) {
      $constant.subjectAllList[curDate] = []
    }
    // const list1 = testQuestion.replace(regSecialSymbols, '') // 剔除换行符等特殊字符
    const list2 = testQuestion.split('==-=--=')
    const list3 = []
    // debugger
    list2.forEach((o, i) => {
      const arr = o.split('|*|*|').map(a => a.replace(/^\s*|\s*$/g, '')) // 拆分题目和答案，并且剔除开头和末尾空字符
      const obj = {
        subjectIndex: i,
        subject: arr[0], // 题目
        answerAnalysis: arr[1] // 答案分析
      }
      // debugger
      list3.push(obj)
    })

    $constant.subjectAllList[curDate] = list3
    return list3
  },
  // 初始化表格数据
  initData ({ allData, testQuestion }, { rigthAnswer, rightAnswerA, curDate }) {
    // console.log('1.initData');
    const data = allData
    let curCharpterAnswerList = [] // 本次章节答题数据
    const newRightArr = this.execuAnswerbrackets(rigthAnswer)
    if (!$constant.rightAswerObj[curDate]) {
      $constant.rightAswerObj[curDate] = newRightArr
    }
    // debugger
    this.initTestQuestion({ testQuestion, curDate })
    // console.log('$constant.subjectAllList', $constant.subjectAllList);
    // console.log('curDate', curDate);
    // debugger

    // 题目的正确答案，和对应的章节
    if (!$constant.chapterAnswerData[curDate]) {
      $constant.chapterAnswerData[curDate] = []
    }

    // 处理本次答案 对应的章节数据
    if (rightAnswerA) {
      curCharpterAnswerList = this.initChapterData(rightAnswerA)
      // debugger
      $constant.chapterAnswerData[curDate] = curCharpterAnswerList
    }

    // 题目数对应的考生答题情况
    if (!$constant.subjectData[curDate]) {
      $constant.subjectData[curDate] = {}
    }
    // debugger
    curCharpterAnswerList.forEach((o, i) => {
      if (!$constant.subjectData[curDate][i]) {
        $constant.subjectData[curDate][i] = { // 每道题，对应的答对答错统计
          chapIndex: 0, // 章节索引
          errNum: 0,
          successNum: 0,
          allNum: 0
        }
      }
    })

    // debugger
    // console.log(data);

    // 根据换行符，拆成数组
    // const regEng = /[^a-zA-Z]/g
    const chinaReg = /[\u4e00-\u9fa5]+/g
    // const letterReg = /(\(|\（)(.+?)(\)|\）)|[A-Z|a-z]+/g // 中英文括号+英文字母正则匹配
    const stuInfoList = [] // 所有考生答题数据数组，就是每个考生的接龙字符数据：序号名字答案
    const arr = data.split(regSecialSymbols)
    // console.log(arr);
    arr.forEach(o => {
      if (o && !regSecialSymbols.test(o)) {
        stuInfoList.push(o)
      }
    })

    // console.log('stuInfoList:', stuInfoList);
    // 剔除名字前的序号
    const stuScoreData = {} // 学生本次答题数据

    let spaceName = 0 // 接龙会有空白名字情况
    stuInfoList.forEach(originData => {
      if (originData) {
        let stuNameAndAnswerArr = ''
        try {
          stuNameAndAnswerArr = originData.replace(regSecialSymbols, '').split(' ') // 每个学生接龙的数据，拆成数组： [序号，名字，答案]
        } catch (error) {
          console.error(error)
          // debugger
        }
        // console.log(stuNameAndAnswerArr.length, stuNameAndAnswerArr);
        let stuName = stuNameAndAnswerArr[1] // 接龙的格式，默认是： 序号.stuName 答案。 比如： 1.张三 abcdd abede

        // 统计考生答题次数
        if (rightAnswerA) {
          if (!$constant.userOtherInfo[stuName]) {
            $constant.userOtherInfo[stuName] = {
              examNum: 0
            }
          }
          $constant.userOtherInfo[stuName].examNum++
        }

        // 名字为空
        if ($validate.isNull(stuName)) {
          //   debugger
          stuName = spaceName + '.名字空白'
          spaceName++
        }

        // debugger
        const arr1111 = stuNameAndAnswerArr.reverse() // 取反后，从末尾取答案。
        // debugger
        //
        // console.log(stuNameAndAnswerArr);
        const studentAnswerList = [] // 获取考生答案
        if (!stuScoreData[stuName]) { // 按名字统计，避免重复
          // debugger
          arr1111.some(a => {
            let str = a
            if (regSecialSymbols.test(a)) { // 剔除 回车，换行符等
              str = a.replace(regSecialSymbols, '')
              // debugger
            }

            if (chinaReg.test(a)) { // 剔除 回车，换行符等
              str = a.replace(chinaReg, '')
              // debugger
            }

            const asList = this.execuAnswerbrackets(str)
            // debugger

            // $constant.loadAllData
            // $constant.countAllData
            // $constant.userOtherInfo
            // $constant.charpterExamNum
            // $constant.chapterAnswerData
            // $constant.subjectData

            if (asList.length > 0) {
              studentAnswerList.unshift(...asList) // 在数组开头插入元素
            }
            if (studentAnswerList.length >= newRightArr.length) { // 匹配到的字符答案为正确答案个数，就停止匹配，
              return true
            }
          })

          // debugger
          if (studentAnswerList.length > 0) {
            // studentAnswerList = studentAnswerList.join('').split('').map(o => o.toUpperCase()) // 统一转大写
            // debugger

            // 计算正确率
            let score = 0
            let scoreHtml = ''
            // 遍历正确答案
            newRightArr.forEach((rightAnswer, i) => {
              const stuVal = studentAnswerList[i]

              // debugger
              let error = 'error-cls'

              let curChapter = null
              let chaNum = 100 // 章节号（若有100章节号，则说明有错）
              // debugger
              if (curCharpterAnswerList.length > 0) {
                // 匹配每道题对应的章节
                let cha1 = ''
                try {
                  const anCha = curCharpterAnswerList[i]
                  // debugger
                  cha1 = anCha.chapter.split('.')
                } catch (error) {
                  console.error(error)
                }

                // eslint-disable-next-line
                if (cha1 == '敏捷实践指南') {
                  // debugger
                  curChapter = $constant.chapterList[$constant.chapterList.length - 1] // 章节
                  chaNum = $constant.chapterList.length - 1
                } else {
                  chaNum = Number(cha1[0]) - 1

                  curChapter = $constant.chapterList[chaNum] // 章节
                }
              }

              if (!$constant.countAllData[curDate]) {
                $constant.countAllData[curDate] = {}
              }
              // debugger
              if (!$constant.countAllData[curDate][chaNum]) {
                $constant.countAllData[curDate][chaNum] = {
                  rightAnswer, // 正确答案
                  allNum: 0,
                  successNum: 0,
                  errorNum: 0,
                  curChapter
                }
              }

              // debugger
              $constant.countAllData[curDate][chaNum].allNum++
              $constant.subjectData[curDate][i].allNum++ // 每道题总数
              $constant.subjectData[curDate][i].chapIndex = chaNum // 章节号
              // if (stuName === 'NICOLE') {
              //   debugger
              // }
              // debugger
              let isSuccess = false
              if (rightAnswer === stuVal) { // 答对
                isSuccess = true
                $constant.countAllData[curDate][chaNum].successNum++
                score++
                $constant.subjectData[curDate][i].successNum++ // 统计每道题目，答对答错人数

                error = ''
              } else { // 答错
                $constant.subjectData[curDate][i].errNum++ // 统计每道题目，答对答错人数
                // debugger
                $constant.countAllData[curDate][chaNum].errorNum++
              }

              // $constant.analysisUserData
              // debugger
              this.countErrNum({ curDate, stuName, curChapter, isSuccess }) // 统计 每个人错对应的章节
              // debugger
              //
              scoreHtml += `<span class="score-cls ${error}" title="第${i + 1}题">${stuVal || 'x'}</span>`
            })
            // console.log(studentAnswerList);
            stuScoreData[stuName] = {
              date: curDate, // 日期
              originData,
              stuName,
              studentAnswerList,
              scoreHtml,
              rightNum: score,
              score: score / newRightArr.length * 100 + '%'
            }
          }
        } else { // 监听重复名字
          // , originData, stuScoreData
          console.error('学生名字重复了', curDate, 'stuName:', stuName)
        }

        // $constant.loadAllData
        // $constant.countAllData
        // $constant.userOtherInfo
        // $constant.charpterExamNum
        // $constant.chapterAnswerData
        // $constant.subjectData

        // 补齐本次未有涉及题目的章节
        const analyStu = $constant.analysisUserData[stuName]
        try {
          if (analyStu && analyStu[curDate]) {
            var analyseData = analyStu[curDate]
            if (analyseData) {
              // debugger
              $constant.chapterList.forEach(chapterItem => {
                const cpIndex = chapterItem.value
                // const dd = analyseData[cpIndex]
                if (!analyseData[cpIndex]) {
                  // console.log(stuName, 'cpIndex', cpIndex);
                  analyseData[cpIndex] = {
                    chapter: chapterItem,
                    errNum: 0,
                    successNum: 0
                  }
                }
                // debugger
              })
            }
          }
        } catch (error) {
          debugger
        }
      }
    })

    // console.log('stuScoreData', stuScoreData);

    // 整成表格数据
    const tableData = []
    // debugger
    for (const name in stuScoreData) {
      const row = stuScoreData[name]
      // debugger
      const { stuExamNum, avg } = this.analyzeStuAll({ stuName: name }) // 统计考生多次答题情况，按章节划分
      // debugger
      row.avg = avg
      row.stuExamNum = stuExamNum
      tableData.push(row)
    }
    // debugger
    // 从大到小排序
    tableData.sort((data1, data2) => {
      return data2.rightNum - data1.rightNum
    })

    // console.log(curDate, '******tableData', tableData);

    // console.log('2.initData');
    return {
      tableData
    }
  },
  // 统计 每个人错题对应的章节
  countErrNum ({ curDate, stuName, curChapter, isSuccess }) {
    // if(curDate === '20221018' && name === '易江涛'){
    // }
    // debugger
    if (!curChapter) return
    // 统计错题对应的章节

    // 按姓名分
    if (!$constant.analysisUserData[stuName]) {
      // debugger
      $constant.analysisUserData[stuName] = {}
    }

    // 按日期分
    if (!$constant.analysisUserData[stuName][curDate]) {
      $constant.analysisUserData[stuName][curDate] = {}
    }
    // if (stuName === 'NICOLE') {
    //   debugger
    // }
    // debugger
    // 按章节分
    if (!$constant.analysisUserData[stuName][curDate][curChapter.value]) {
      $constant.analysisUserData[stuName][curDate][curChapter.value] = {
        chapter: curChapter,
        errNum: 0,
        successNum: 0
      }
    }

    if (isSuccess) {
      $constant.analysisUserData[stuName][curDate][curChapter.value].successNum++
    } else {
      $constant.analysisUserData[stuName][curDate][curChapter.value].errNum++
    }
  },
  // 统计考生多次答题情况，按章节划分
  analyzeStuAll ({ stuName }) {
    let stuExamNum = 0 // 答题次数
    const stuExamData = {} // 按章节，统计考生所有答题
    const allExam = $constant.analysisUserData[stuName] // 按考生姓名
    let stuExamList = []
    // debugger
    // if (stuName === 'NICOLE') {
    //   debugger
    // }
    for (const date in allExam) { // 按日期（这里的日期是考试类型）
      stuExamNum++
      const chapObj = allExam[date] // 按章节
      for (const chapIndex in chapObj) {
        const examItem = chapObj[chapIndex]
        // debugger
        if (!stuExamData[chapIndex]) {
          stuExamData[chapIndex] = {
            allNum: 0, // 出题次数
            errNum: 0,
            successNum: 0,
            chapterName: examItem.chapter.label,
            chapterIndex: examItem.chapter.value
          }

          // stuExamList.push(stuExamData)
        }
        // debugger
        stuExamData[chapIndex].allNum += examItem.errNum + examItem.successNum
        stuExamData[chapIndex].errNum += examItem.errNum
        stuExamData[chapIndex].successNum += examItem.successNum
      }
    }

    // 计算某次考试，每章节正确率
    const otherList = []
    for (const index in stuExamData) {
      const obj = stuExamData[index]
      // debugger
      if (obj.allNum > 0) {
        obj.successRatio = parseInt(obj.successNum / obj.allNum * 10000) / 100
        stuExamList.push(obj)
      } else {
        obj.successRatio = 0
        otherList.push(obj)
      }
    }

    // 按成功率更高排序
    stuExamList.sort((a, b) => b.successRatio - a.successRatio)
    stuExamList = stuExamList.concat(otherList) // 加入未出过题的章节

    // 平均分（所有章节答题正确数/答题次数）
    let countSuccessNum = 0
    // debugger
    stuExamList.forEach(o => {
      // debugger
      countSuccessNum += o.successNum
    })
    const avg = parseInt(countSuccessNum / stuExamNum * 1000) / 100

    return {
      avg,
      stuExamList,
      stuExamNum
    }
  },
  // 表格列排序
  tableSortFn (colName, curDate) {
    // curDate
    // eslint-disable-next-line
    const { tableData } = $constant.loadAllData[curDate]
    if (!$constant.tableOprationData[curDate]) {
      $constant.tableOprationData[curDate] = {}
    }

    if (!$constant.tableOprationData[curDate][colName]) {
      $constant.tableOprationData[curDate][colName] = {
        sortNum: false
      }
    }

    if (!$constant.tableOprationData[curDate][colName].sortIsUp) {
      // 从大到小排序
      tableData.sort((data1, data2) => {
        return data2[colName] - data1[colName]
      })
    } else {
      // 从小到大排序
      tableData.sort((data1, data2) => {
        return data1[colName] - data2[colName]
      })
    }

    $constant.tableOprationData[curDate][colName].sortIsUp = !$constant.tableOprationData[curDate][colName].sortIsUp
    // debugger
    this.initTableDom1(tableData, { curDate: curDate })
  },

  initTableDom (arr, { tbodyDom, curDate }) {
    tbodyDom = tbodyDom || document.querySelector('#tbodyDom')
    tbodyDom.innerHTML = ''
    setTimeout(() => {
      this.initTableDom1(arr, { tbodyDom, curDate })
      // alert('已打印', curDate)
    }, 200)
  },
  // 初始化表格数据
  initTableDom1 (arr, { tbodyDom, curDate }) {
    // debugger
    tbodyDom = tbodyDom || document.querySelector('#tbodyDom')
    let bodyStr = ''
    //
    // 表头 单元格 正确答案
    let rightAnswerHtml = ''
    const curRightList = $constant.chapterAnswerData[curDate]
    // debugger
    curRightList.forEach((a, i) => {
      rightAnswerHtml += `<span class="score-cls" title="第${i + 1}题">${a.answer}</span>`
    })
    $constant.rightTdDom.innerHTML = rightAnswerHtml

    // const { tableData } = $constant.loadAllData[curDate]
    // $constant.loadAllData
    // $constant.countAllData
    // $constant.userOtherInfo
    // $constant.charpterExamNum
    // $constant.chapterAnswerData
    // $constant.subjectData
    // $constant.analysisUserData

    // 参与答题次数
    // 平均分
    // debugger
    arr.forEach((row, i) => {
      const { stuExamNum, avg } = this.analyzeStuAll({ stuName: row.stuName }) // 统计考生多次答题情况，按章节划分
      row.avg = avg
      row.stuExamNum = stuExamNum
      // debugger
      bodyStr += `
          <tr>
            <td class="td">${i + 1}</td>  
            <td class="td" title="原始答案： ${row.originData}" >${row.stuName}</td>  
            <td class="td">${row.score}</td>  
            <td class="td">${row.scoreHtml}</td>  
            <td class="td">${stuExamNum}</td>  
            <td class="td">${avg}%</td>  
            <td class="td"><button onClick="jumpToDetail(this)" data-index="${i}" data-date="${row.date}">查看分析</button></td>  
          </tr>
        `
      //  <td class="td"></td>
      //  <td class="td"><button onClick="jumpToDetail(this)" data-index="${i}" data-date="${row.date}">查看分析</button></td>
    })
    tbodyDom.innerHTML = bodyStr
  },
  /**
   * 动态加载资源
   * @param {String} src 资源路径
   * @param {Function} callback 回调函数
   */
  loadScript (src, date, callback) {
    const head = document.getElementsByTagName('head')[0]
    // debugger
    let scriptDom = null
    if ($constant.loadAllData[date]) { // 存在，则剔除
      // head.removeChild($constant.loadAllData[date].dom)
      // scriptDom = document.createElement('script') // 位置不能动，需要重新加载数据
      callback()
      return
    } else {
      scriptDom = document.createElement('script') // 位置不能动，需要重新加载数据
      $constant.loadAllData[date] = {
        dom: scriptDom,
        date
      }
    }
    // debugger
    scriptDom.type = 'text/javascript'
    scriptDom.charset = 'UTF-8'
    scriptDom.src = src
    // debugger
    if (scriptDom.addEventListener) {
      scriptDom.addEventListener('load', function () {
        // debugger
        callback()
      }, false)
    } else if (scriptDom.attachEvent) {
      scriptDom.attachEvent('onreadystatechange', function () {
        const target = window.event.srcElement
        if (target.readyState === 'loaded') {
          // debugger
          callback()
        }
      })
    }

    head.appendChild(scriptDom)
  }

}
