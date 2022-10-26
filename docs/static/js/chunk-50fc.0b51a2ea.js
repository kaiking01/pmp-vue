(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-50fc"],{F2Ph:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={name:"AnalysisPresoner",data:function(){return{isNoData:!1,dateList:[],isViewErr:!0,curRatio:0,originAnswer:"",examDate:"",testList:[],columns:[{label:"正确率",colName:"successRatio",width:120,isHtml:!1},{label:"章节题目总数",colName:"allNum",width:120,isHtml:!1},{label:"对 / 错",colName:"succAndErr",width:80,minWidth:400,isHtml:!0},{label:"章节",colName:"chapterName",width:"auto",isHtml:!1}],tableData:[],queryParam:{}}},created:function(){var t=this;this.dateList=window.dateList||this.$constant.dateList,this.queryParam=this.$route.query,this.examDate=this.queryParam.date,this.$com.recurArr(this.dateList,0,function(){t.initTableData(),t.initTestData()})},methods:{tableTrCls:function(t){var s="";return t.row.allNum<=0&&(s="tr-bg-red"),s},viewErrchange:function(){this.initTestData()},selectChange:function(t){this.examDate=t,this.initTestData()},initTableData:function(){var t=this.$com.analyzeStuAll({stuName:this.queryParam.stuName}),s=t.stuExamList;t.stuExamNum,t.avg;s.forEach(function(t){t.succAndErr=t.successNum+" / "+t.errNum}),this.tableData=s},initTestData:function(){var t=this.queryParam.stuName;if(t){var s="";if(this.$constant.loadAllData[this.examDate].tableData.some(function(a){if(a.stuName===t)return s=a,!0}),s){this.isNoData=!1,this.curRatio=s.score,this.originAnswer=""+s.originData;for(var a=s.studentAnswerList,e=this.$constant.subjectAllList[this.examDate].slice(),i=this.$constant.rightAswerObj[this.examDate],l="",n=[],r=0;r<e.length;r++){var c=e[r];if(c.answerAnalysis){l=!1;var o=i[r],u=a[r];if(o===u&&(l=!0),this.isViewErr&&l)continue;c.class={"font-red":!l},c.stuAnswer=u,c.rightAnswer=o,n.push(c)}}this.testList=n}else this.isNoData=!0}}}}},FR3u:function(t,s,a){"use strict";a.r(s);var e=a("rbSm"),i=a("rWP/");for(var l in i)["default"].indexOf(l)<0&&function(t){a.d(s,t,function(){return i[t]})}(l);a("aHhO");var n=a("ZrdR"),r=Object(n.a)(i.default,e.a,e.b,!1,null,"5a8bbbe6",null);r.options.__file="src\\views\\analysis-presoner\\index.vue",s.default=r.exports},aHhO:function(t,s,a){"use strict";var e=a("n00v");a.n(e).a},n00v:function(t,s,a){},"rWP/":function(t,s,a){"use strict";a.r(s);var e=a("F2Ph"),i=a.n(e);for(var l in e)["default"].indexOf(l)<0&&function(t){a.d(s,t,function(){return e[t]})}(l);s.default=i.a},rbSm:function(t,s,a){"use strict";a.d(s,"a",function(){return e}),a.d(s,"b",function(){return i});var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"app-container scroll-bar"},[a("div",{staticClass:"user-info",attrs:{id:"userInfoDom"}},[a("div",{staticClass:"line flex flex-l"},[a("div",{staticClass:"label-cls"},[t._v("姓名：")]),t._v(" "),a("div",{staticClass:"value-cls"},[t._v(t._s(t.queryParam.stuName))])]),t._v(" "),a("div",{staticClass:"line flex flex-l"},[a("div",{staticClass:"label-cls"},[t._v("答题次数：")]),t._v(" "),a("div",{staticClass:"value-cls"},[t._v(t._s(t.queryParam.stuExamNum))])])]),t._v(" "),a("div",{staticClass:"common-table no-edit-table"},[a("el-table",{staticClass:"common-table-box",staticStyle:{width:"100%"},attrs:{border:!0,data:t.tableData,"row-class-name":t.tableTrCls}},[a("el-table-column",{attrs:{label:"行号",type:"index",align:"center",fixed:"",width:"50"}}),t._v(" "),t._l(t.columns,function(s){return a("el-table-column",{key:s.colName,attrs:{prop:s.colName,label:s.label,width:s.width,"min-width":s.minWidth},scopedSlots:t._u([{key:"default",fn:function(e){return[s.isHtml?a("div",{staticClass:"flex flex-l",class:s.class,domProps:{innerHTML:t._s(e.row[s.colName])}}):s.isOpration?a("span",{class:s.class,style:s.style,attrs:{"data-islink":s.link?1:0}},[a("el-button",{attrs:{size:"mini"},on:{click:function(s){t.jumpToDetail(e.row)}}},[t._v("查看分析")])],1):a("span",{class:s.class,style:s.style,attrs:{"data-islink":s.link?1:0}},[t._v(t._s(e.row[s.colName]))])]}}])})})],2)],1),t._v(" "),a("div",{staticClass:"test-container mg-t20"},[a("div",{staticClass:"line"},[a("label",{attrs:{for:""}},[t._v("考试日期：")]),t._v(" "),a("el-select",{attrs:{size:"mini",placeholder:"请选择"},on:{change:t.selectChange},model:{value:t.examDate,callback:function(s){t.examDate=s},expression:"examDate"}},t._l(t.dateList,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),t.isNoData?a("div",{staticClass:"line error-cls"},[t._v("当前日期没有答题")]):[a("div",{staticClass:"line flex flex-l"},[a("div",{staticClass:"label-cls"},[t._v("本次答题正确率：")]),t._v(" "),a("div",{staticClass:"value-cls right-score",class:t.curRatio>60?"font-blue":"font-red"},[t._v(t._s(t.curRatio))])]),t._v(" "),a("div",{staticClass:"line flex flex-l"},[a("div",{staticClass:"label-cls"},[t._v("考生原答案：")]),t._v(" "),a("div",{staticClass:"value-cls pd-l10"},[t._v(t._s(t.originAnswer))])]),t._v(" "),a("div",{staticClass:"line flex flex-l"},[a("div",{staticClass:"label-cls"},[t._v("只看错题：")]),t._v(" "),a("div",{staticClass:"value-cls"},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ddd"},on:{change:t.viewErrchange},model:{value:t.isViewErr,callback:function(s){t.isViewErr=s},expression:"isViewErr"}})],1)]),t._v(" "),a("div",{staticClass:"text-wrap mg-t10"},[a("ul",{staticClass:"ul"},t._l(t.testList,function(s){return a("li",{key:s.stuName,staticClass:"li"},[a("div",{staticClass:"test-content"},[a("pre",[t._v(t._s(s.subject))])]),t._v(" "),a("div",{staticClass:"stu-answer",class:s.class},[t._v("考生答案："+t._s(s.stuAnswer))]),t._v(" "),a("div",{staticClass:"test-answer"},[a("pre",[t._v(t._s(s.answerAnalysis))])])])}))])]],2)])},i=[];e._withStripped=!0}}]);