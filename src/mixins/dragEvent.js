/**
 * 被拖拽的直接父级，引用方法 @dragstart="onDragStart" @dragover="onDragOver" @dragend="onDragEnd
 * 被拖拽的模块，需要添加标识
 *  1.class="boxItem" draggable="true" :data-value="item.keyId"
 *  2.设置关键字段，data-key="key-id"，比如：row.keyId -> data-key="key-id"（因为dataset无法试用驼峰式，这里用中横杠标识）
 *  3.设置值字段 :data-value="item.keyId"
 * dragList 所有可以拖拽的模块的数组，必须在引用界面赋值
 */
export default {
  data () {
    return {
      dragList: [] // 引用界面已经赋值
    }
  },
  mounted () {
    // 为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  methods: {
    // 开始拖拽
    onDragStart (event) {
      const startResult = this.$common.getParentByClass(event.target, 'boxItem')
      this.dragingDom = startResult.dom
      if (this.dragingDom) {
        // debugger
        this.dragingDom.classList.add('checkedItem')
      }
    },
    // 拖拽移动经过触发
    onDragOver (event) {
      const result = this.$common.getParentByClass(event.target, 'boxItem')
      if (!result) return
      const overDom = result.dom
      this.targetDom = overDom
      const isDifferent = this.targetDom !== this.dragingDom
      // const t1 = this.findNodeIndex(this.targetDom)
      // const t2 = this.findNodeIndex(this.dragingDom)
      // debugger
      if (overDom && isDifferent) {
        if (this.targetDom) {
          if (this.targetDom.animated) {
            return
          }
        }
        // debugger
        if (this.findNodeIndex(this.dragingDom) < this.findNodeIndex(this.targetDom)) {
          this.targetDom.parentNode.insertBefore(this.dragingDom, this.targetDom.nextSibling)
        } else {
          this.targetDom.parentNode.insertBefore(this.dragingDom, this.targetDom)
        }
        // debugger

        const targetTop = event.target.getBoundingClientRect().top
        const dragingTop = this.dragingDom.getBoundingClientRect().top
        this.animateFn(targetTop, this.targetDom)
        this.animateFn(dragingTop, this.dragingDom)
      }
    },
    // 添加拖拽动画
    animateFn (startPos, dom) {
      // debugger
      // console.log('animateFn', startPos, dom)
      const offset = startPos - dom.getBoundingClientRect().top
      dom.style.transition = 'none'
      dom.style.transform = `translateY(${offset}px)`

      // 触发重绘
      dom.offsetWidth
      dom.style.transition = 'transform .3s'
      dom.style.transform = ``
      // 触发重绘
      // setTimeout(() => {
      //   dom.style.transition = 'transform .3s'
      //   dom.style.transform = ``
      // }, 0)
      clearTimeout(dom.animated)

      dom.animated = setTimeout(() => {
        dom.style.transition = ''
        dom.style.transform = ``
        dom.animated = false
      }, 300)
    },
    // 拖拽结束触发
    onDragEnd (event) {
      if (this.dragingDom) {
        // debugger
        this.dragingDom.classList.remove('checkedItem')
      }

      // console.log('drag end')
      // 通过dom顺序，重新调整 数据 顺序
      const currentNodes = Array.from(this.$refs.parentNode.childNodes)
      this.rowKey = ''
      // debugger
      const arr = currentNodes.map((el, index) => {
        // debugger
        const item = this.dragList.find(c => {
          if (!this.rowKey) {
            this.initKey(el.dataset.key)
          }
          const val1 = c[this.rowKey]
          const val2 = el.dataset.value
          // debugger
          const flag = (val1 === val2)
          // debugger
          return flag
        })
        // debugger
        return item
      })
      // console.log(arr)
      this.dragList = arr
    },
    // 初始化key
    initKey (key) {
      let dataSetKey = key || 'keyId' // dataSet 会把驼峰全转小写
      const kArr = dataSetKey.split('-')
      dataSetKey = kArr.join('')
      kArr.forEach((o, i) => {
        if (i === 0) {
          this.rowKey = o
        } else {
          this.rowKey += o.replace(o[0], o[0].toUpperCase())
        }
      })
    },
    // 匹配node
    findNodeIndex (el) {
      // console.log('findNodeIndex', el)
      const domData = Array.from(this.$refs.parentNode.childNodes)
      return domData.findIndex(i => {
        const flag = i.innerText === el.innerText
        // debugger
        return flag
      })
    }
  }
}
