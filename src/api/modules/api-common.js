/**
此模块为COMMON API接口的映射
操作日期:  2020-03-10
操作人员:  figochan.
事项备注:  创建
*/

import request1331 from '@/utils/open/request'

/**
 * ***********************************************************************************
 *  公共接口
 * ***********************************************************************************
 */
export const commonApi = {
  // 获取部门树数据
  /**
   * 获取部门树数据
   * @params {Object} params
   */
  getDepartTree (data, params) {
    const url = 'api/Common/GetTree'
    return request1331.postForm(url, data, params)
  },
  // 编辑表单 获取表单元素
  /**
   * @params {Object} params
   */
  getEditFormData (data, params) {
    const url = 'api/Common/GetDataForm'
    return request1331.postForm(url, data, params)
  },
  // 获取 新增表单 数据
  /**
   * @param {Array} data
   * @param {Object} params
   * HXUnickID=[表单的HXUnickID]
   */
  getAddForm (data, params) {
    const url = 'api/Common/GetAddForm'
    return request1331.postForm(url, data, params)
  },
  // 获取分页数据
  /**
   * 获取分页数据
   * @params {Object} data
   *   HXUnickID:'',
   *   pageNo:'',
   *   gridMode:'',
   */
  getPageData (params) {
    const url = 'api/Common/GetPageData'
    return request1331.postForm(url, [], params)
  },
  // 设置列表显示记录条数
  /**
   * 设置列表显示记录条数
   * @params {Object} data
   *   HXUnickID:'',
   *   pageSize:'',
   *   gridMode:'',
   */
  setPageSize (params) {
    const url = 'api/Common/SetPageSize'
    return request1331.postForm(url, [], params)
  },
  /**
   * 保存表单数据通用接口
   * @param {Array} data
   * @param {Object} params
   * 保存到通用接口
     (string HXUnickID, string keyId, List<TFieldValue> fields)
  */
  saveDataForm (data, params) {
    const url = 'api/Common/SaveDataForm'
    return request1331.postForm(url, data, params)
  },
  // 操作记录
  /**
   * 操作记录
   * @param {any} deptId 加密后的deptId
   * ?keyValue=[表格行的keyId]&tableName=A01
   * (string HXUnickID,string keyId)
   */
  getTableDataLog (data, params) {
    const url = 'api/Common/GetTableDataLog'
    return request1331.postForm(url, data, params)
  },
  // 导出xls
  /**
    * 导出xls
    * @params {Object} params
    * [Get](string HXUnickID, int gridMode)
      取表格中的HXUnickID和gridMode，即可将当前表格中的数据下载成Excel文件
    */
  downloadXLS (params, fileName) {
    const url = 'api/Common/GetDataToXls'
    return request1331.getDownload(url, [], params, fileName)
  },
  // 导入出错，下载出错明细excel
  /**
   * 导入出错，下载出错明细excel
   * @param {any} params
    [Get]?HXUnickID=[HXUnickID]
    下载一下Excel文件
   */
  getFailImportXls (params, fileName) {
    const url = 'api/Common/GetFailImportXls'
    return request1331.getDownload(url, [], params, fileName)
  },
  // 获取下拉列表数据: 行业类型, 人员规模
  /**
   * 获取下拉列表数据: 行业类型, 人员规模
   */
  getRYFieldDrop (data, params) {
    const url = 'api/Common/GetRYFieldDrop'
    return request1331.postForm(url, data, params)
  },
  /**
   * 获取字段下拉框 editFormat{BMTable,BMField,MCField}
   * deptId部门ID,需要取当前岗位、人员的时候 返回{code,message,data},取data
   */
  getFieldDrop (data, params) {
    const url = 'api/Common/GetFieldDrop'
    return request1331.postForm(url, data, params)
  },
  // 获取 删除表单 数据
  /**
   * @param {Array} data
   * @param {Object} params
   * HXUnickID=[表单的HXUnickID]&keyId=[表单的keyId]
   */
  getFormDelete (data, params) {
    const url = 'api/Common/GetFormDelete'
    return request1331.postForm(url, data, params)
  },
  /**
   * 获取 功能导航 数据
   * @param {Array} data
   * @param {Object} params
   */
  getMyShortCut (data, params) {
    const url = 'api/Common/WorkPlace/GetMyShortCut'
    return request1331.postForm(url, data, params)
  },
  /**
   * 待办事项
   * @params {Arrays} data
   * @params {Object} params
   */
  getMyWork (data, params) {
    const url = 'api/Common/WorkPlace/GetMyWork'
    return request1331.postForm(url, data, params)
  },
  /**
   * 添加 提醒事项
   * @params {Arrays} data
   * @params {Object} params
   * (string day)
   */
  addTips (data, params) {
    const url = 'api/Common/WorkPlace/AddTips'
    return request1331.postForm(url, data, params)
  },
  /**
   * 提醒事项
   * @params {Arrays} data
   * @params {Object} params
   */
  getMyTodayTips (data, params) {
    const url = 'api/Common/WorkPlace/GetMyTodayTips'
    return request1331.postForm(url, data, params)
  },
  /**
   * 日历中的提醒
   * @params {Arrays} data
   * @params {Object} params
   */
  getMyTips (data, params) {
    const url = 'api/Common/WorkPlace/GetMyTips'
    return request1331.postForm(url, data, params)
  },
  /**
   * 人事提醒
   * @params {Arrays} data
   * @params {Object} params
   */
  getMyAlarm (data, params) {
    const url = 'api/Common/WorkPlace/GetMyAlarm'
    return request1331.postForm(url, data, params)
  },
  /**
   * 人事概况
   * @params {Arrays} data
   * @params {Object} params
   */
  getRyStatic (data, params) {
    const url = 'api/Common/WorkPlace/GetRyStatic'
    return request1331.postForm(url, data, params)
  },
  /**
   * 新入职员工
   * @params {Arrays} data
   * @params {Object} params
   */
  getRynew (data, params) {
    const url = 'api/Common/WorkPlace/GetRynew'
    return request1331.postForm(url, data, params)
  },
  /**
   * 获取 动态 数据
   * @param {Array} data
   * @param {Object} params
   */
  getMyMessage (data, params) {
    const url = 'api/Common/WorkPlace/GetMyMessage'
    return request1331.postForm(url, data, params)
  },
  /**
   * 获取 新手任务 数据
   * @param {Array} data
   * @param {Object} params
   */
  getMyNavigation (data, params) {
    const url = 'api/Common/WorkPlace/GetMyNavigation'
    return request1331.postForm(url, data, params)
  },
  /**
   * 获取 重要公告
   * @param {Array} data
   * @param {Object} params
   * [{keyid:””, NoticeTitle:”标题”,Opdate:”发布时间”, isSys:”1或者2”},{},{}]
   * 点击查看公告内容，isSys=0时按2.1系统公告查看，isSys =1时2.2按企业公告查找
   */
  getImportantNoticeboard (data, params) {
    const url = 'api/Common/WorkPlace/GetImportantNoticeboard'
    return request1331.postForm(url, data, params)
  },
  /**
   * 获取 系统公告
   * @param {Array} data
   * @param {Object} params
   */
  getSysNoticeboard (data, params) {
    const url = 'api/Common/WorkPlace/GetSysNoticeboard'
    return request1331.postForm(url, data, params)
  },
  /**
   * 获取 系统公告 公告内容
   * @param {Array} data
   * @param {Object} params
   * (string KeyId) 返回的列表keyId
   * 返回 {“content:“公告内容”, attach:[{ keyId,filename},{}]}
   */
  // getSysNoticeboardContent (data, params) {
  //   const url = 'api/Common/WorkPlace/GetSysNoticeboardContent'
  //   return request1331.postForm(url, data, params)
  // },
  /**
   * 获取 系统/企业 公告内容
   * @param {Array} data
   * @param {Object} params
   * (string KeyId) 返回的列表keyId
   * 返回 {“content:“公告内容”, attach:[{ keyId,filename},{}]}
   */
  getSysNoticeboardContent (data, params) {
    const url = 'api/Common/WorkPlace/GetSysNoticeboardContent'
    return request1331.postForm(url, data, params)
  },
  /**
   * 获取 系统公告 附件列表
   * @param {Array} data
   * @param {Object} params
   * (string KeyId) KeyId：为 GetSysNoticeboard 返回的 attach 列表里面的keyId
   */
  getSysNoticeboardAttach (data, params, fileName) {
    const url = 'api/Common/WorkPlace/GetSysNoticeboardAttach'
    return request1331.postDownload(url, data, params, fileName)
  },
  /**
   * 获取 企业公告
   * @param {Array} data
   * @param {Object} params
   * (string KeyId) KeyId：为 GetSysNoticeboard 返回的 attach 列表里面的keyId
   */
  getMyNoticeboard (data, params) {
    const url = 'api/Common/WorkPlace/GetMyNoticeboard'
    return request1331.postForm(url, data, params)
  },
  /**
   * 获取 企业公告 公告内容
   * @param {Array} data
   * @param {Object} params
   * (string KeyId) KeyId ： GetMyNoticeboard 返回的列表keyId
   * 返回{“content:“公告内容”, attach:[{ keyId,filename},{}]}
   */
  getMyNoticeboardContent (data, params) {
    const url = 'api/Common/WorkPlace/GetMyNoticeboardContent'
    return request1331.postForm(url, data, params)
  },
  /**
   * 获取 企业公告 附件列表
   * @param {Array} data
   * @param {Object} params
   * (string KeyId) KeyId：为 GetMyNoticeboardContent 返回的 attach 列表里面的keyId
   */
  getMyNoticeboardAttach (data, params, fileName) {
    const url = 'api/Common/WorkPlace/GetMyNoticeboardAttach'
    return request1331.postDownload(url, data, params, fileName)
  },
  /**
   * 取得培训视频课件列表
   * @param {Array} data
   * @param {Object} params
   *  (string NameOrID,string ModuleId,int MovieClass=0)
   * ?MovieClass=0操作类的，=1理论类
   */
  getMovies (data, params) {
    const url = 'api/Common/WorkPlace/GetMovies'
    return request1331.postForm(url, data, params)
  },
  /**
   * 待办：完成和删除
   * @param {Array} data
   * @param {Object} params
   * (string keyId,int Dowhat=0)
   * Dowhat=0完成，1删除
   */
  setTips (data, params) {
    const url = 'api/Common/WorkPlace/SetTips'
    return request1331.postForm(url, data, params)
  },
  /**
   * 待办：编辑
   * @param {Array} data
   * @param {Object} params
   * (string keyId)
   */
  editTips (data, params) {
    const url = 'api/Common/WorkPlace/EditTips'
    return request1331.postForm(url, data, params)
  },
  /**
   * 下载附件
   * @param {Array} data
   * @param {Object} params
   * (string HXUnickID,string KeyId)
   * HXUnickID 当前表单或者表格的 HXUnickID
   * KeyId 当前表单或者表格的 KeyId
   */
  getAttachFile (data, params, fileName) {
    const url = 'api/Common/FileAttach/GetAttachFile'
    // return request1331.postDownload(url, data, params, fileName)
    return request1331.getDownload(url, data, params, fileName)
    // return request1331.postJson(url, data, params, fileName)
  },
  /**
   * 获取logo图
   * @param {Array} data
   * @param {Object} params
   */
  getLogo (data, params, fileName) {
    const url = 'api/Common/FileAttach/GetLogo'
    return request1331.postForm(url, data, params, fileName)
  },
  /**
   * 删除附件
   * @param {Array} data
   * @param {Object} params
   * (string HXUnickID,string KeyId)
   * HXUnickID 当前表单或者表格的 HXUnickID
   * KeyId 当前表单或者表格的 KeyId
   */
  delAttachFile (data, params) {
    const url = 'api/Common/FileAttach/DelAttachFile'
    return request1331.postForm(url, data, params)
  },
  /**
   * 获取修改日志
   * @param {Array} data
   * @param {Object} params
   * (string HXUnickID, string keyId)
   */
  getTableChgDataLog (data, params) {
    const url = 'api/Common/GetTableChgDataLog'
    return request1331.postForm(url, data, params)
  },
  /**
   * table 点击表头过滤图标 获取数据
   * @param {Array} data
   * @param {Object} params
   * (string HXUnickID, string ColName)
   */
  getColumnFilter (data, params) {
    const url = 'api/Common/GetColumnFilter'
    return request1331.postForm(url, data, params)
  },
  /**
   * table 点击表头图标 保存数据
   * @param {Array} data
   * @param {Object} params
   * (string HXUnickID,string ColName,int Sort,string[] ColValues)
   * lists.Type= List时: ColValues ：为列表选中的value,生成一个数组
   * lists.Type= Date时: ColValues ：开始日期和结束日期生成的一个数组
   * lists.Type= Int,Number时: ColValues ：从【】到【】的值一个数组
   */
  setDataFilter (data, params) {
    const url = 'api/Common/SetDataFilter'
    return request1331.postJson(url, data, params)
  },
  /**
   * table 点击表头锁图标 刷新数据
   * @param {Array} data
   * @param {Object} params
   * (string HXUnickID, string ColName)
   *  然后调用 getPageData （pageNo=1，默认到第一页）
   */
  unLockDataFilter (data, params) {
    const url = 'api/Common/UnLockDataFilter'
    return request1331.postForm(url, data, params)
  },
  /**
   * 获取状态下拉列表
   * @params {Object} params
   * @params {Object} data
   * (int Short = 1)
   */
  getFlowFlagDrop (data, params) {
    const url = 'api/common/GetFlowFlagDrop'
    return request1331.postForm(url, data, params)
  },
  /**
   * 获取会员过期信息
   * @params {Object} params
   * @params {Object} data
   */
  getMyLicense (data, params) {
    const url = 'api/Common/WorkPlace/GetMyLicense'
    return request1331.postForm(url, data, params)
  },
  /**
   * 联动通用机制
   * @params {Object} params
   * @params {Object} data
   * (string HXUnickID, string keyId, List<TFieldValue> fields)
   * 参数：HXUnickID, keyId表单对应的
   * Fields为当前表单中发生变化的所有字段，生成一个列表
   */
  setDataFormLink (data, params) {
    const url = 'api/Common/SetDataFormLink'
    return request1331.postForm(url, data, params)
  }
}

/**
 * ***********************************************************************************
 *  数据日志
 * ***********************************************************************************
 */
export const dataLogApi = {
  /**
   * 获取部门树数据
   * @params {Object} params
   * @params {Object} data
   * @return Promise
  * (string StartDate, string EndDate, string NameOrLabel = null)
  * 参数：
  * StartDat：开始日期
  * EndDate：结束日志
  * NameOrLabel：查找输入的内容
   */
  getList (data, params) {
    const url = 'api/Common/DBBuild/GetEventLog'
    return request1331.postForm(url, data, params)
  }
}
