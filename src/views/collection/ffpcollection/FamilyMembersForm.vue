<template>
  <div>
    <el-row style="margin-bottom: 20px">
      <el-button type="primary" @click="AddInfo">新增</el-button>
    </el-row>
    <el-table
      v-loading="loading"
      :data="deptList"
      row-key="deptId"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="deptName" label="姓名" width="260"></el-table-column>
      <el-table-column prop="orderNum" label="与户主关系" width="200"></el-table-column>
      <el-table-column prop="status" label="证件号码" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="民族" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="文化程度" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="政治面貌" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="健康状态" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="劳动技能" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="联系电话" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="联系电话" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="是否现役军人" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="是否会讲普通话" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="是否参加城乡居民基本养老保险" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="是否参加商业补充医疗保险" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="是否享受人身意外保险补贴" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="减少原因" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="成员状态" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dept:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:dept:add']"
          >新增</el-button>
          <el-button
            v-if="scope.row.parentId != 0"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dept:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form style="margin-top: 20px" v-show="formState" ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-row gutter="15">
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="姓名" prop="field105">
                <el-input v-model="formData.field105" placeholder="请输入姓名" clearable :style="{width: '200px'}">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="与户主关系" prop="field106">
                <el-select v-model="formData.field106" placeholder="请选择与户主关系" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field106Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="证件号码" prop="field107">
                <el-input v-model="formData.field107" placeholder="请输入证件号码" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row gutter="15">
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="民族" prop="field112">
                <el-select v-model="formData.field112" placeholder="请选择民族" clearable :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field112Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="文化程度" prop="field114">
                <el-select v-model="formData.field114" placeholder="请选择文化程度" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field114Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="成员状态" prop="field115">
                <el-select v-model="formData.field115" placeholder="请选择成员状态" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field115Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row gutter="15">
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="健康状态" prop="field121">
                <el-select v-model="formData.field121" placeholder="请选择健康状态" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field121Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="劳动技能" prop="field122">
                <el-select v-model="formData.field122" placeholder="请选择劳动技能" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field122Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="联系电话" prop="field123">
                <el-input v-model="formData.field123" placeholder="请输入联系电话" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row gutter="15">
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="是否现役军人" prop="field129">
                <el-select v-model="formData.field129" placeholder="请选择是否现役军人" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field129Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="政治面貌" prop="field138">
                <el-select v-model="formData.field138" placeholder="请选择政治面貌" clearable
                           :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field138Options" :key="index" :label="item.label"
                             :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="是否会讲普通话" prop="field145">
                <el-select v-model="formData.field145" placeholder="请选择是否会讲普通话" clearable
                           :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field145Options" :key="index" :label="item.label"
                             :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row gutter="15">
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="是否参加城乡居民基本养老保险" prop="field152">
                <el-select v-model="formData.field152" placeholder="请选择是否参加城乡居民基本养老保险" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field152Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="是否参加商业补充医疗保险" prop="field153">
                <el-select v-model="formData.field153" placeholder="请选择是否参加商业补充医疗保险" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field153Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="是否享受人身意外保险补贴" prop="field154">
                <el-select v-model="formData.field154" placeholder="请选择是否享受人身意外保险补贴" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field154Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row gutter="15">
        <el-col :span="8">
          <el-row gutter="15">
              <el-col :span="8">
                <el-form-item label="减少原因" prop="field109">
                  <el-input v-model="formData.field105" placeholder="请输入减少原因" clearable :style="{width: '200px'}">
                  </el-input>
                </el-form-item>
              </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formState:false,
      formData: {
        field105: undefined,
        field106: undefined,
        field107: undefined,
        field112: undefined,
        field114: undefined,
        field115: undefined,
        field121: undefined,
        field122: undefined,
        field123: undefined,
        field129: undefined,
        field138: undefined,
        field145: undefined,
        field152: undefined,
        field153: undefined,
        field154: undefined,
      },
      rules: {
        field105: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        field106: [{
          required: true,
          message: '请选择与户主关系',
          trigger: 'change'
        }],
        field107: [{
          required: true,
          message: '请输入证件号码',
          trigger: 'blur'
        }],
        field112: [{
          required: true,
          message: '请选择民族',
          trigger: 'change'
        }],
        field114: [{
          required: true,
          message: '请选择文化程度',
          trigger: 'change'
        }],
        field121: [{
          required: true,
          message: '请选择健康状态',
          trigger: 'change'
        }],
        field109:[{
          required: false,
          message: '请输入减少原因',
          trigger: 'blur'
        }],
        field122: [{
          required: true,
          message: '请选择劳动技能',
          trigger: 'change'
        }],
        field123: [{
          required: true,
          message: '请输入联系电话',
          trigger: 'blur'
        }],
        field129: [{
          required: true,
          message: '请选择是否现役军人',
          trigger: 'change'
        }],
        field138: [{
          required: true,
          message: '请选择政治面貌',
          trigger: 'change'
        }],
        field145: [{
          required: true,
          message: '请选择是否会讲普通话',
          trigger: 'change'
        }],
        field152: [{
          required: true,
          message: '请选择是否参加城乡居民基本养老保险',
          trigger: 'change'
        }],
        field153: [{
          required: true,
          message: '请选择是否参加商业补充医疗保险',
          trigger: 'change'
        }],
        field154: [{
          required: true,
          message: '请选择是否享受人身意外保险补贴',
          trigger: 'change'
        }],
      },
      field106Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field112Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field114Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field115Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field121Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field122Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field129Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field138Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field145Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field152Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field153Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field154Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    AddInfo(){
      this.formState = true
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
  }
}

</script>
<style>
  .el-form-item__error{
    min-width: 180px!important;
  }
</style>
<style scoped>
  .footer{
    text-align: center;
  }
</style>
