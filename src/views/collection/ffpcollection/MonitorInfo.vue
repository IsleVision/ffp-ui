<template>
  <div>
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="180px">
        <el-row gutter="15">
          <el-col :span="8">
            <el-row gutter="15">
              <el-col :span="8">
                <el-form-item label="省" prop="field105">
                  <el-select v-model="formData.field105" placeholder="请选择省" clearable
                    :style="{width: '200px'}">
                    <el-option v-for="(item, index) in field105Options" :key="index" :label="item.label"
                      :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row gutter="15">
              <el-col :span="8">
                <el-form-item label="市" prop="field106">
                  <el-select v-model="formData.field106" placeholder="请选择市" clearable
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
                <el-form-item label="县" prop="field107">
                  <el-select v-model="formData.field107" placeholder="请选择县" clearable
                    :style="{width: '200px'}">
                    <el-option v-for="(item, index) in field107Options" :key="index" :label="item.label"
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
                <el-form-item label="镇" prop="field112">
                  <el-select v-model="formData.field112" placeholder="请选择镇" clearable
                    :style="{width: '200px'}">
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
                <el-form-item label="村" prop="field113">
                  <el-select v-model="formData.field113" placeholder="请选择村" clearable
                    :style="{width: '200px'}">
                    <el-option v-for="(item, index) in field113Options" :key="index" :label="item.label"
                      :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row gutter="15">
              <el-col :span="8">
                <el-form-item label="户类型" prop="field114">
                  <el-select v-model="formData.field114" placeholder="请选择户类型" clearable
                    :style="{width: '200px'}">
                    <el-option v-for="(item, index) in field114Options" :key="index" :label="item.label"
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
                <el-form-item label="户主姓名" prop="field119">
                  <el-input v-model="formData.field119" placeholder="请输入户主姓名" clearable
                    :style="{width: '200px'}"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row gutter="15">
              <el-col :span="8">
                <el-form-item label="户编号" prop="field123">
                  <el-input v-model="formData.field123" placeholder="请输入户编号" clearable
                    :style="{width: '200px'}"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row gutter="15">
              <el-col :span="8">
                <el-form-item label="户主身份证号" prop="field124">
                  <el-input v-model="formData.field124" placeholder="请输入户主身份证号" clearable
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
                <el-form-item label="是否特困供养户" prop="field130">
                  <el-input v-model="formData.field130" placeholder="请输入是否特困供养户" clearable
                    :style="{width: '200px'}"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row gutter="15">
              <el-col :span="8">
                <el-form-item label="住址" prop="field131">
                  <el-input v-model="formData.field131" placeholder="请输入住址" clearable
                    :style="{width: '200px'}"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row gutter="15">
              <el-col :span="8">
                <el-form-item label="是否军烈属" prop="field132">
                  <el-select v-model="formData.field132" placeholder="请选择是否军烈属" clearable
                    :style="{width: '200px'}">
                    <el-option v-for="(item, index) in field132Options" :key="index" :label="item.label"
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
  inheritAttrs: false,
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field105: undefined,
        field106: undefined,
        field107: undefined,
        field112: undefined,
        field113: undefined,
        field114: undefined,
        field119: undefined,
        field123: undefined,
        field124: undefined,
        field130: undefined,
        field131: undefined,
        field132: undefined,
      },
      rules: {
        field105: [{
          required: true,
          message: '请选择省',
          trigger: 'change'
        }],
        field106: [{
          required: true,
          message: '请选择市',
          trigger: 'change'
        }],
        field107: [{
          required: true,
          message: '请选择县',
          trigger: 'change'
        }],
        field112: [{
          required: true,
          message: '请选择镇',
          trigger: 'change'
        }],
        field113: [{
          required: true,
          message: '请选择村',
          trigger: 'change'
        }],
        field114: [{
          required: true,
          message: '请选择户类型',
          trigger: 'change'
        }],
        field119: [{
          required: true,
          message: '请输入户主姓名',
          trigger: 'blur'
        }],
        field123: [{
          required: true,
          message: '请输入户编号',
          trigger: 'blur'
        }],
        field124: [{
          required: true,
          message: '请输入户主身份证号',
          trigger: 'blur'
        }],
        field130: [{
          required: true,
          message: '请输入是否特困供养户',
          trigger: 'blur'
        }],
        field131: [{
          required: true,
          message: '请输入住址',
          trigger: 'blur'
        }],
        field132: [{
          required: true,
          message: '请选择是否军烈属',
          trigger: 'change'
        }]
      },
      field105Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field106Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field107Options: [{
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
      field113Options: [{
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
      field132Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field137Options: [{
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
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.close()
      })
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

</style>
