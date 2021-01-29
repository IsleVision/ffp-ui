<template>
  <div>

    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-row gutter="15">
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="耕地面积（亩）" prop="field117">
                <el-input v-model="formData.field117" placeholder="请输入耕地面积（亩）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="林地面积（亩）" prop="field118">
                <el-input v-model="formData.field118" placeholder="请输入林地面积（亩）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="退耕还林面积（亩）" prop="field119">
                <el-input v-model="formData.field119" placeholder="请输入退耕还林面积（亩）" clearable
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
              <el-form-item label="林果面积（亩）" prop="field120">
                <el-input v-model="formData.field120" placeholder="请输入林果面积（亩）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="水面面积（亩）" prop="field121">
                <el-input v-model="formData.field121" placeholder="请输入水面面积（亩）" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="是否加入农民专业合作社" prop="field122">
                <el-select v-model="formData.field122" placeholder="请选择是否加入农民专业合作社" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field122Options" :key="index" :label="item.label"
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
              <el-form-item label="是否有龙头企业带动" prop="field123">
                <el-select v-model="formData.field123" placeholder="请选择是否有龙头企业带动" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field123Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="是否有创业致富带头人带动" prop="field124">
                <el-select v-model="formData.field124" placeholder="请选择是否有创业致富带头人带动" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field124Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="住房面积（平方米）" prop="field125">
                <el-input v-model="formData.field125" placeholder="请输入住房面积（平方米）" clearable
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
              <el-form-item label="是否通生活用电" prop="field130">
                <el-select v-model="formData.field130" placeholder="请选择是否通生活用电" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field130Options" :key="index" :label="item.label"
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
              <el-form-item label="主要燃料类型" prop="field138">
                <el-input v-model="formData.field138" placeholder="请输入主要燃料类型" clearable
                  :style="{width: '200px'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row gutter="15">
            <el-col :span="8">
              <el-form-item label="是否有卫生厕所" prop="field139">
                <el-select v-model="formData.field139" placeholder="请选择是否有卫生厕所" clearable
                  :style="{width: '200px'}">
                  <el-option v-for="(item, index) in field139Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
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
      formData: {
        field117: undefined,
        field118: undefined,
        field119: undefined,
        field120: undefined,
        field121: undefined,
        field122: undefined,
        field123: undefined,
        field124: undefined,
        field125: undefined,
        field130: undefined,
        field138: undefined,
        field139: undefined,
      },
      rules: {
        field117: [],
        field118: [],
        field119: [],
        field120: [],
        field121: [],
        field122: [],
        field123: [],
        field124: [],
        field125: [],
        field130: [],
        field131: [],
        field138: [],
        field139: [],
      },
      field122Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field123Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field124Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field130Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field139Options: [{
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

