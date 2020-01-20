<template>
  <el-dialog title="文档上传" :visible.sync="uploadDocuVisible" :close-on-click-modal="false" :close-on-press-escape="false"
    :show-close="false" custom-class="uploadDocuDialog" width="50%">
    <div class="inner">
      <!-- http://47.103.104.87:8880/AuxiliaryPlanning/programme/word/singlefile -->
      <el-upload class="uploadArea" ref="upload" drag :limit="1" :on-exceed="handleExceed"
        :before-upload="beforeDocuUpload" :on-success="handleDocuSuccess"
        action="http://192.168.0.117:8083/programme/word/singlefile">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传word文件，且不超过100M</div>
      </el-upload>
      <el-form :inline="true" ref="dialogForm" :model="formUpload" :rules="rules" class="formUploadForm">
        <el-form-item label="文档归属区域" prop="city_code">
          <el-cascader v-model="formUpload.city_code" :options="fileCityOpts" placeholder="请选择文档归属区域" :props="{ expandTrigger: 'hover',checkStrictly: true }"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="文档归属类型" prop="file_type">
          <el-select v-model="formUpload.file_type" placeholder="请选择文档归属类型">
            <el-option v-for="(item,index) in fileTypeOpts" :key="index" :label="item.LABEL" :value="item.VALUE">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文档归属时间" prop="file_year">
          <el-select v-model="formUpload.file_year" placeholder="请选择文档归属时间">
            <el-option v-for="(item,index) in fileYearOpts" :key="index" :label="item.LABEL" :value="item.VALUE">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="uploadDocuHide('dialogForm')">取消</el-button>
      <el-button type="primary" @click="onSubmit('dialogForm',formUpload)">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDocuInfo, uploadDocu } from '@/api/thinkingApi'
export default {
  name: 'uploadDocument',
  data() {
    return {
      fileCityOpts: [
        {
          value: '330000',
          label: '浙江省',
          children: [
            {
              value: '330900',
              label: '舟山市',
              children: [
                {
                  value: '330922',
                  label: '嵊泗县'
                },
                {
                  value: '330921',
                  label: '岱山县'
                },
                {
                  value: '330903',
                  label: '普陀区'
                },
                {
                  value: '330902',
                  label: '定海区'
                }
              ]
            },
            {
              value: '330400',
              label: '嘉兴市',
              children: [
                {
                  value: '330482',
                  label: '平湖市'
                },
                {
                  value: '330402',
                  label: '南湖区'
                },
                {
                  value: '330411',
                  label: '秀洲区'
                },
                {
                  value: '330421',
                  label: '嘉善县'
                },
                {
                  value: '330424',
                  label: '海盐县'
                },
                {
                  value: '330483',
                  label: '桐乡市'
                },
                {
                  value: '330481',
                  label: '海宁市'
                }
              ]
            },
            {
              value: '330200',
              label: '宁波市',
              children: [
                {
                  value: '330206',
                  label: '北仑区'
                },
                {
                  value: '330225',
                  label: '象山县'
                },
                {
                  value: '330211',
                  label: '镇海区'
                },
                {
                  value: '330205',
                  label: '江北区'
                },
                {
                  value: '330213',
                  label: '奉化区'
                },
                {
                  value: '330226',
                  label: '宁海县'
                },
                {
                  value: '330212',
                  label: '鄞州区'
                },
                {
                  value: '330203',
                  label: '海曙区'
                },
                {
                  value: '330281',
                  label: '余姚市'
                },
                {
                  value: '330282',
                  label: '慈溪市'
                }
              ]
            },
            {
              value: '331000',
              label: '台州市',
              children: [
                {
                  value: '331082',
                  label: '临海市'
                },
                {
                  value: '331002',
                  label: '椒江区'
                },
                {
                  value: '331004',
                  label: '路桥区'
                },
                {
                  value: '331083',
                  label: '玉环市'
                },
                {
                  value: '331081',
                  label: '温岭市'
                },
                {
                  value: '331022',
                  label: '三门县'
                },
                {
                  value: '331023',
                  label: '天台县'
                },
                {
                  value: '331003',
                  label: '黄岩区'
                },
                {
                  value: '331024',
                  label: '仙居县'
                }
              ]
            },
            {
              value: '330300',
              label: '温州市',
              children: [
                {
                  value: '330305',
                  label: '洞头区'
                },
                {
                  value: '330327',
                  label: '苍南县'
                },
                {
                  value: '330326',
                  label: '平阳县'
                },
                {
                  value: '330381',
                  label: '瑞安市'
                },
                {
                  value: '330383',
                  label: '龙港市'
                },
                {
                  value: '330329',
                  label: '泰顺县'
                },
                {
                  value: '330328',
                  label: '文成县'
                },
                {
                  value: '330324',
                  label: '永嘉县'
                },
                {
                  value: '330382',
                  label: '乐清市'
                },
                {
                  value: '330302',
                  label: '鹿城区'
                },
                {
                  value: '330304',
                  label: '瓯海区'
                },
                {
                  value: '330303',
                  label: '龙湾区'
                }
              ]
            },
            {
              value: '331100',
              label: '丽水市',
              children: [
                {
                  value: '331102',
                  label: '莲都区'
                },
                {
                  value: '331124',
                  label: '松阳县'
                },
                {
                  value: '331181',
                  label: '龙泉市'
                },
                {
                  value: '331125',
                  label: '云和县'
                },
                {
                  value: '331123',
                  label: '遂昌县'
                },
                {
                  value: '331121',
                  label: '景宁畲族自治县'
                },
                {
                  value: '330922',
                  label: '青田县'
                },
                {
                  value: '331122',
                  label: '缙云县'
                },
                {
                  value: '331126',
                  label: '庆元县'
                }
              ]
            },
            {
              value: '330600',
              label: '绍兴市',
              children: [
                {
                  value: '330683',
                  label: '嵊州市'
                },
                {
                  value: '330604',
                  label: '上虞区'
                },
                {
                  value: '330602',
                  label: '越城区'
                },
                {
                  value: '330603',
                  label: '柯桥区'
                },
                {
                  value: '330681',
                  label: '诸暨市'
                },
                {
                  value: '330624',
                  label: '新昌县'
                }
              ]
            },
            {
              value: '330500',
              label: '湖州市',
              children: [
                {
                  value: '330521',
                  label: '德清县'
                },
                {
                  value: '330523',
                  label: '安吉县'
                },
                {
                  value: '330502',
                  label: '吴兴区'
                },
                {
                  value: '330522',
                  label: '长兴县'
                },
                {
                  value: '330503',
                  label: '南浔区'
                }
              ]
            },
            {
              value: '330800',
              label: '衢州市',
              children: [
                {
                  value: '330824',
                  label: '开化县'
                },
                {
                  value: '330822',
                  label: '常山县'
                },
                {
                  value: '330803',
                  label: '衢江区'
                },
                {
                  value: '330802',
                  label: '柯城区'
                },
                {
                  value: '330881',
                  label: '江山市'
                },
                {
                  value: '330825',
                  label: '龙游县'
                }
              ]
            },
            {
              value: '330700',
              label: '金华市',
              children: [
                {
                  value: '330726',
                  label: '浦江县'
                },
                {
                  value: '330784',
                  label: '永康市'
                },
                {
                  value: '330783',
                  label: '东阳市'
                },
                {
                  value: '330781',
                  label: '兰溪市'
                },
                {
                  value: '330727',
                  label: '磐安县'
                },
                {
                  value: '330723',
                  label: '武义县'
                },
                {
                  value: '330703',
                  label: '金东区'
                },
                {
                  value: '330782',
                  label: '义乌市'
                },
                {
                  value: '330702',
                  label: '婺城区'
                }
              ]
            },
            {
              value: '330100',
              label: '杭州市',
              children: [
                {
                  value: '330106',
                  label: '西湖区'
                },
                {
                  value: '330111',
                  label: '富阳区'
                },
                {
                  value: '330102',
                  label: '上城区'
                },
                {
                  value: '330122',
                  label: '桐庐县'
                },
                {
                  value: '330182',
                  label: '建德市'
                },
                {
                  value: '330110',
                  label: '余杭区'
                },
                {
                  value: '330127',
                  label: '淳安县'
                },
                {
                  value: '330112',
                  label: '临安区'
                },
                {
                  value: '330109',
                  label: '萧山区'
                },
                {
                  value: '330108',
                  label: '滨江区'
                },
                {
                  value: '330105',
                  label: '拱墅区'
                },
                {
                  value: '330103',
                  label: '下城区'
                },
                {
                  value: '330104',
                  label: '江干区'
                }
              ]
            }
          ]
        }
      ],
      rules: {
        file_city: [
          { required: true, message: '请选择文档归属区域', trigger: 'change' }
        ],
        file_type: [
          { required: true, message: '请选择文档归属类型', trigger: 'change' }
        ],
        file_year: [
          { required: true, message: '请选择文档归属时间', trigger: 'change' }
        ]
      },
      fileTypeOpts: [], // 文档归属类型
      fileYearOpts: [], // 文档归属时间
      formUpload: {
        // 上传参数
        folder_no: '',
        province_code: '330000',
        city_code: [],
        file_type: '',
        file_year: ''
      }
    }
  },
  props: {
    uploadDocuVisible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.getDocuInfoFn()
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    // 获取文档上传下拉框数据
    getDocuInfoFn() {
      getDocuInfo().then(res => {
        this.fileTypeOpts = res.data.fileTypeOpts
        this.fileYearOpts = res.data.fileYearOpts
      })
    },
    // 上传文件之前的钩子
    beforeDocuUpload(file) {
      let fileName = file.name
      let pos = fileName.lastIndexOf('.')
      let lastName = fileName.substring(pos, fileName.length)
      if (
        lastName.toLowerCase() !== '.doc' &&
        lastName.toLowerCase() !== '.docx'
      ) {
        this.$message.error('文件必须为.doc或者.docx类型')
        this.$refs.upload.clearFiles()
        return
      }
      // 限制上传文件的大小
      const isLt = file.size / 1024 / 1024 / 100 <= 1
      if (!isLt) {
        this.$message.error('上传文件不得大于100MB!')
        this.$refs.upload.clearFiles()
      }
      return isLt
    },
    // 文件选择时上传成功
    handleDocuSuccess(res, file) {
      if (res.code !== '0') {
        this.$message({
          message: '文件上传失败',
          type: 'error'
        })
        this.$refs.upload.clearFiles()
      } else {
        this.formUpload.folder_no = res.Folderno
      }
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    // 关闭文档上传弹窗并清空表单
    uploadDocuHide(formName) {
      this.$refs[formName].resetFields()
      this.$refs.upload.clearFiles()
      this.formUpload.folder_no = ''
      this.$emit('closeUploadDocu')
    },
    // 提交上传表单并清空表单
    onSubmit(formName, formData) {
      if (this.formUpload.folder_no == '') {
        this.$message({
          message: '请上传文件',
          type: 'warning'
        })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          uploadDocu(formData).then(res => {
            this.$message({
              message: res.message,
              type: res.code === '0' ? 'success' : 'error'
            })
            this.$refs[formName].resetFields()
            this.$refs.upload.clearFiles()
            this.formUpload.folder_no = ''
            this.$emit('submitUploadDocu')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './uploadDocu.scss';
</style>