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
      <el-table-column prop="deptName" label="生产经营性支出" width="260"></el-table-column>
      <el-table-column prop="orderNum" label="因病支出" width="200"></el-table-column>
      <el-table-column prop="status" label="因意外支出" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="因婚支出" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="因丧支出" :formatter="statusFormat" width="100"></el-table-column>
      <el-table-column prop="status" label="因非义务教育阶段学费（元）" :formatter="statusFormat" width="100"></el-table-column>
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
              <el-form-item label-width="120px" label="日期" prop="field103">
                <el-date-picker v-model="formData.field103" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                  :style="{width: '200px'}" placeholder="请选择日期" clearable></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label-width="120px" label="生产经营性支出（元）" prop="field105">
                <el-input v-model="formData.field105" placeholder="请输入生产经营性支出（元）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label-width="120px" label="因病支出（元）" prop="field108">
                <el-input v-model="formData.field108" placeholder="请输入因病支出（元）" clearable
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
              <el-form-item label-width="120px" label="因意外支出（元）" prop="field113">
                <el-input v-model="formData.field113" placeholder="请输入因意外支出（元）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label-width="120px" label="因婚支出（元）" prop="field115">
                <el-input v-model="formData.field115" placeholder="请输入因婚支出（元）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label-width="120px" label="因丧支出（元）" prop="field117">
                <el-input v-model="formData.field117" placeholder="请输入因丧支出（元）" clearable
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
              <el-form-item label-width="120px" label="因非义务教育阶段学费（元）" prop="field122">
                <el-input v-model="formData.field122" placeholder="请输入因非义务教育阶段学费（元）" clearable
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
        field103: null,
        field105: undefined,
        field108: undefined,
        field113: undefined,
        field115: undefined,
        field117: undefined,
        field122: undefined,
      },
      rules: {
        field103: [],
        field105: [],
        field108: [],
        field113: [],
        field115: [],
        field117: [],
        field122: [],
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
