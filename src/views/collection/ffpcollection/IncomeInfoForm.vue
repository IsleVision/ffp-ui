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
      <el-table-column label="日期" align="center" prop="createTime" width="200">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="deptName" label="劳务收入" width="260"></el-table-column>
      <el-table-column prop="orderNum" label="生产经营性收入" width="200"></el-table-column>
      <el-table-column prop="status" label="转移性收入" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="计划生育金" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="低保金" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="特困供养金（元）" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="养老保险金（元）" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="生态补偿金（元）" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="其他转移性收入（元）" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="资产收益扶贫分红收入（元）" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="其他财产性收入（元）" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="上一年人均纯收入（元）" :formatter="statusFormat" width="100"></el-table-column>
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
              <el-form-item label-width="120px" label="日期" prop="field105">
                <el-date-picker v-model="formData.field105" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                  :style="{width: '200px'}" placeholder="请选择日期" clearable></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label-width="120px" label="劳务收入（元）" prop="field107">
                <el-input v-model="formData.field107" placeholder="请输入劳务收入（元）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label-width="120px" label="转移性收入（元）" prop="field109">
                <el-input v-model="formData.field109" placeholder="请输入转移性收入（元）" clearable
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
              <el-form-item label-width="120px" label="计划生育金（元）" prop="field114">
                <el-input v-model="formData.field114" placeholder="请输入计划生育金（元）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label-width="120px" label="低保金（元）" prop="field116">
                <el-input v-model="formData.field116" placeholder="请输入低保金（元）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label-width="120px" label="特困供养金（元）" prop="field119">
                <el-input v-model="formData.field119" placeholder="请输入特困供养金（元）" clearable
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
              <el-form-item label-width="120px" label="养老保险金（元）" prop="field122">
                <el-input v-model="formData.field122" placeholder="请输入养老保险金（元）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label-width="120px" label=" 生态补偿金（元）" prop="field124">
                <el-input v-model="formData.field124" placeholder="请输入 生态补偿金（元）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label-width="120px" label="其他转移性收入（元）" prop="field126">
                <el-input v-model="formData.field126" placeholder="请输入其他转移性收入（元）" clearable
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
              <el-form-item label-width="120px" label="财产性收入（元）" prop="field129">
                <el-input v-model="formData.field129" placeholder="请输入财产性收入（元）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label-width="120px" label="资产收益扶贫分红收入（元）" prop="field131">
                <el-input v-model="formData.field131" placeholder="请输入资产收益扶贫分红收入（元）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label-width="120px" label="  其他财产性收入（元）" prop="field133">
                <el-input v-model="formData.field133" placeholder="请输入  其他财产性收入（元）" clearable
                  :style="{width: '200px'}"></el-input>
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
        field105: null,
        field107: undefined,
        field109: undefined,
        field114: undefined,
        field116: undefined,
        field119: undefined,
        field122: undefined,
        field124: undefined,
        field126: undefined,
        field129: undefined,
        field131: undefined,
        field133: undefined,
      },
      rules: {
        field105: [],
        field107: [{
          required: true,
          message: '请输入劳务收入（元）',
          trigger: 'blur'
        }],
        field109: [],
        field114: [],
        field116: [],
        field119: [],
        field122: [],
        field124: [],
        field126: [],
        field129: [],
        field131: [],
        field133: [],
      },
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
</style>
