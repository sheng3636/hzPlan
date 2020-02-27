import {
  getStructure
} from '@/api/thinkingApi'
export const menuMixin = {
  data() {
    let collectParams = {
      collect_no: '',
      title: '',
      content: '',
      source: '',
      type: this.$store.state.leftTabActive === 0 ? '历史借鉴' : this.$store.state.leftTabActive === 1 ? '上位指导' : '报告参考'
    }
    return {
      collectParams: collectParams,
      isMenu: false,
      selectTxt: '', // 鼠标选中文字
      menuTop: null, // 选中文字后显示菜单距离顶部位置
      menuLeft: null, // 选中文字后显示菜单距离左边位置
      summaryVisible: false, // 控制摘要弹窗显隐
    }
  },
  mounted() {},
  created() {

  },
  methods: {
    // 选中文字后显示菜单
    selectText(e, title, content) {
      this.collectParams.title = title
      this.collectParams.source = content
      if (document.Selection) {
        // ie浏览器
        this.selectTxt = document.selection.createRange().text
        this.collectParams.content = this.selectTxt
      } else {
        // 标准浏览器
        this.selectTxt = window.getSelection().toString()
        this.collectParams.content = this.selectTxt
      }
      if (this.selectTxt !== '') {
        this.menuTop = e.clientY
        this.menuLeft = e.clientX
        this.isMenu = true
      } else {
        this.isMenu = false
      }
    },
    // 打开摘要弹窗
    editCollect(title, content, source, id) {
      this.collectParams.title = title
      this.collectParams.content = content
      this.collectParams.source = source
      this.collectParams.collect_no = id

      this.summaryVisible = true
    },
    // 保存摘要并关闭弹窗
    submitSummaryInfo() {
      this.summaryVisible = false
      this.$parent.getEcollectFn()
    },
    // 关闭摘要弹窗
    closeSummaryInfo() {
      this.summaryVisible = false
    }
  }
}
export const mapMixin = {
  data() {
    return {
      provinceVal: {
        cityName: '浙江省',
        center: {
          P: 30.287459,
          R: 120.15357599999999,
          lng: 120.153576,
          lat: 30.287459
        },
        levelSub: 'province',
        cityCode: '330000'
      },
      cityVal: {},
      districtVal: {},
      provinceOpts: [],
      cityOpts: [],
      districtOpts: [],
      cityName: '中国',
      geoJsonData: '',
      echartsMap: null, // 中间地图echarts实例
      map: null,
      district: null,
      mapData: []
    }
  },
  mounted() {
    this.echartsMap = this.$echarts.init(document.getElementById('mapChart'))
    // 初始化地图
    this.map = new AMap.Map('mapContainer', {
      resizeEnable: true,
      center: [116.30946, 39.937629],
      zoom: 3
    })
    let opts = {
      subdistrict: 1, // 显示下级行政区级数
      showbiz: false // 是否显示商圈
    }
    this.district = new AMap.DistrictSearch(opts) //注意：需要使用插件同步下发功能才能这样直接使用
    this.district.search('中国', (status, result) => {
      if (status == 'complete') {
        this.getData(result.districtList[0], 'province', 100000)
        this.search('province', 'checkedCity')
      }
    })
    this.echartsMap.on('click', this.echartsMapClick)
  },
  methods: {
    /*
      利用 AMapUI.loadUI可以构造一个创建一个 DistrictExplorer 实例，然后利用 DistrictExplorer 的实例，
      可以根据当前需要加载城市的 areaCode获取到该城市的 geo 数据
    */
    loadMapData(areaCode) {
      AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        let districtExplorer = (window.districtExplorer = new DistrictExplorer({
          eventSupport: true, // 打开事件支持
          map: this.map
        }))
        // 创建一个实例
        districtExplorer.loadAreaNode(areaCode, (error, areaNode) => {
          if (error) {
            console.error(error)
            return
          }
          let mapJson = {}
          // 特别注意这里哦，如果查看过正常的geojson文件，都会发现，文件都是以features 字段开头的，所以这里要记得加上
          mapJson.features = areaNode.getSubFeatures()

          this.loadMapChart(this.cityName, mapJson)
          this.geoJsonData = mapJson
        })
      })
    },
    // 处理获取出来的边界数据
    getData(data, level, adcode) {
      // 清空下一级别的下拉列表
      if (level === 'province') {
        this.cityOpts = []
        this.districtOpts = []
        this.cityVal = {}
        this.districtVal = {}
      } else if (level === 'city') {
        this.districtOpts = []
        this.districtVal = {}
      }

      let subList = data.districtList
      if (subList) {
        let curlevel = subList[0].level
        if (curlevel === 'street') {
          // 为了配合echarts地图区县名称显示正常，这边街道级别数据需要特殊处理
          let mapJsonList = this.geoJsonData.features
          let mapJson = {}
          for (let i in mapJsonList) {
            if (mapJsonList[i].properties.name == this.cityName) {
              mapJson.features = [].concat(mapJsonList[i])
            }
          }
          this.mapData = []
          // 这个mapData里包含每个区域的code、名称、对应的等级，实现第三步功能时能用上
          this.mapData.push({
            name: this.cityName,
            value: Math.random() * 100,
            level: curlevel
          })
          this.loadMapChart(this.cityName, mapJson)
          this.geoJsonData = mapJson
          return
        }
        let levelList = curlevel + 'Opts'
        // 街道级以上的数据处理方式
        this.mapData = []
        this[levelList] = []
        for (let i = 0, l = subList.length; i < l; i++) {
          let name = subList[i].name
          let cityCode = subList[i].adcode
          let center = subList[i].center
          // 这个mapData里包含每个区域的code、名称、对应的等级，实现第三步功能时能用上
          this.mapData.push({
            name: name,
            value: Math.random() * 100,
            cityCode: cityCode,
            level: curlevel
          })
          let levelSub = subList[i].level
          this[levelList].push({
            cityName: name,
            value: {
              cityName: name,
              center: center,
              levelSub: levelSub,
              cityCode: cityCode
            }
          })
        }
        this.loadMapData(adcode)
      }
    },
    search(area, checkedCity) {
      let levelList = null
      if (checkedCity) {
        levelList = {
          cityName: '浙江省',
          center: {
            P: 30.287459,
            R: 120.15357599999999,
            lng: 120.153576,
            lat: 30.287459
          },
          levelSub: 'province',
          cityCode: '330000'
        }
      } else {
        levelList = this[area + 'Val']
      }

      let adcode = levelList.cityCode
      this.cityName = levelList.cityName

      this.district.setLevel(area) //行政区级别
      this.district.setExtensions('all')
      //行政区查询
      //按照adcode进行查询可以保证数据返回的唯一性
      this.district.search(adcode, (status, result) => {
        if (status === 'complete') {
          this.getData(result.districtList[0], area, adcode)
        }
      })

      if (this.leftTabActive === 1 && area === 'city') {
        this.getGuideCounts(levelList.cityCode)
      }
    },
    mapBack(level) {
      this.DocumentWrapClose()
      if (level === 'country') {
        this.district.search('中国', (status, result) => {
          if (status == 'complete') {
            this.getData(result.districtList[0], 'province', 100000)
            this.provinceVal = {}
          }
        })
      } else {
        this.search(level)
      }
    },
    // 渲染地图echarts
    loadMapChart(mapName, data) {
      this.$echarts.registerMap(mapName, data)
      let option = {
        series: [{
          name: '数据名称',
          type: 'map',
          roam: true, // 是否开启鼠标缩放和平移漫游
          mapType: mapName,
          selectedMode: 'single', // 表示是否支持多个选中
          showLegendSymbol: false, // 在图例相应区域显示图例的颜色标识（系列标识的小圆点），存在 legend 组件时生效。
          itemStyle: {
            normal: {
              areaColor: 'rgba(16,72,133)',
              borderColor: 'rgba(51, 136, 255)',
              borderWidth: 2,
              label: {
                show: true,
                textStyle: {
                  color: 'rgb(249, 249, 249)'
                }
              }
            },
            emphasis: {
              //鼠标经过区域样式
              areaColor: 'rgba(11,55,98)',
              borderColor: 'rgba(11,234,235)',
              areaStyle: {
                color: 'rgba(11,55,98)'
              },
              label: {
                show: true,
                textStyle: {
                  color: 'rgb(249, 249, 249)'
                }
              }
            }
          },
          data: this.mapData
        }]
      }
      this.echartsMap.clear()
      this.echartsMap.setOption(option)
    },
    // 地图点击事件-获取各市县五年规划纲要指导思想
    echartsMapClick(params) {
      if (this.leftTabActive === 0) {
        if (params.data.level === 'city') {
          this.structureParams.city_type = '0'
        } else if (params.data.level === 'district') {
          this.structureParams.city_type = '1'
        } else {
          this.structureParams.city_type = '2'
        }
        this.structureParams.city_code = params.data.cityCode
        getStructure(this.structureParams).then(res => {
          if (res.data) {
            this.documentWrapTop = params.event.offsetY
            this.documentWrapLeft = params.event.offsetX
            this.docuWrapData = res.data
            this.isDocumentWrap = true
          } else {
            this.$message({
              message: '该地区未在该时段上传文档',
              type: 'warning'
            })
          }
        })
      }
    }
  }
}
