<template>
  <div class="app-container">

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['poor:income:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['poor:income:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['poor:income:remove']"
        >删除</el-button>
      </el-col>
<!--      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['poor:income:export']"
        >导出</el-button>
      </el-col>-->
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
     <!--   <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
          <el-button size="mini" circle icon="el-icon-search" @click="showSearch=!showSearch" />
        </el-tooltip>-->
      </div>
    </el-row>

    <el-table border v-loading="loading" :data="incomeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--     <el-table-column label="户主键" align="center" prop="poorId" />
      <el-table-column label="主键" align="center" prop="pIId" />
    -->
      <el-table-column label="日期" align="center" prop="putTime" width="150">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.putTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="劳务收入" align="center" prop="incomeWg" />
      <el-table-column label="生产经营性收入" align="center" prop="incomeScjy" />
      <el-table-column label="转移性收入" align="center" prop="incomeZy" />
      <el-table-column label="计划生育金" align="center" prop="incomeJhsy" />
      <el-table-column label="低保金" align="center" prop="incomeDb" />
      <el-table-column label="特困供养金" align="center" prop="incomeTkgy" />
      <el-table-column label="生态补偿金" align="center" prop="incomeStbc" />
      <el-table-column label="其他转移性收入" align="center" prop="incomeQtzy" />
      <el-table-column label="财产性收入" align="center" prop="incomeCy" />
      <el-table-column label="资产收益扶贫分红收入" align="center" prop="incomeZcbf" />
      <el-table-column label="其他财产性收入" align="center" prop="incomeQt" />

<!--      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="0有效1无效" align="center" prop="deleteFlag" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['poor:income:edit']"
          >编辑</el-button>
<!--          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['poor:income:remove']"
          >删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改收入信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="户主键" prop="poorId">
          <el-input v-model="form.poorId" placeholder="请输入户主键" />
        </el-form-item>-->
        <el-form-item label="日期" labelWidth="180px" prop="putTime">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.putTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="劳务收入" labelWidth="180px" prop="incomeWg">
          <el-input v-model="form.incomeWg" placeholder="请输入劳务收入" />
        </el-form-item>
        <el-form-item label="生产经营性收入" labelWidth="180px" prop="incomeScjy">
          <el-input v-model="form.incomeScjy" placeholder="请输入生产经营性收入" />
        </el-form-item>
        <el-form-item label="转移性收入" labelWidth="180px" prop="incomeZy">
          <el-input v-model="form.incomeZy" disabled  />
        </el-form-item>
        <el-form-item label="计划生育金" labelWidth="180px" prop="incomeJhsy">
          <el-input v-model="form.incomeJhsy" placeholder="请输入计划生育金" />
        </el-form-item>
        <el-form-item label="低保金" labelWidth="180px" prop="incomeDb">
          <el-input v-model="form.incomeDb" placeholder="请输入低保金" />
        </el-form-item>
        <el-form-item label="特困供养金" labelWidth="180px" prop="incomeTkgy">
          <el-input v-model="form.incomeTkgy" placeholder="请输入特困供养金" />
        </el-form-item>
        <el-form-item label="生态补偿金" labelWidth="180px" prop="incomeStbc">
          <el-input v-model="form.incomeStbc" placeholder="请输入生态补偿金" />
        </el-form-item>
        <el-form-item label="其他转移性收入" labelWidth="180px" prop="incomeQtzy">
          <el-input v-model="form.incomeQtzy" placeholder="请输入其他转移性收入" />
        </el-form-item>
        <el-form-item label="财产性收入" labelWidth="180px" prop="incomeCy">
          <el-input v-model="form.incomeCy" disabled />
        </el-form-item>
        <el-form-item label="资产收益帮扶分红收入" labelWidth="180px" prop="incomeZcbf">
          <el-input v-model="form.incomeZcbf" placeholder="请输入资产收益帮扶分红收入" />
        </el-form-item>
        <el-form-item label="其他财产性收入" labelWidth="180px" prop="incomeQt">
          <el-input v-model="form.incomeQt" placeholder="请输入其他财产性收入" />
        </el-form-item>

<!--        <el-form-item label="0有效1无效" prop="deleteFlag">
          <el-input v-model="form.deleteFlag" placeholder="请输入0有效1无效" />
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">提 交</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listIncome, getIncome, delIncome, addIncome, updateIncome } from "@/api/poor/income";

export default {
  name: "Income",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 收入信息表格数据
      incomeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        poorId: null,
        incomeWg: null,
        incomeScjy: null,
        incomeZy: null,
        incomeJhsy: null,
        incomeDb: null,
        incomeTkgy: null,
        incomeStbc: null,
        incomeQtzy: null,
        incomeCy: null,
        incomeZcbf: null,
        incomeQt: null,
        putTime: null,
        deleteFlag: null
      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: {
        incomeWg: [
          { required: true, message: "劳务收入不能为空", trigger: "blur" }
        ]

      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询收入信息列表 */
    getList() {
      this.loading = true;
      listIncome(this.queryParams).then(response => {
        this.incomeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        poorId: null,
        pIId: null,
        incomeWg: null,
        incomeScjy: null,
        incomeZy: null,
        incomeJhsy: null,
        incomeDb: null,
        incomeTkgy: null,
        incomeStbc: null,
        incomeQtzy: null,
        incomeCy: null,
        incomeZcbf: null,
        incomeQt: null,
        putTime: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        deleteFlag: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.pIId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加收入信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const pIId = row.pIId || this.ids
      getIncome(pIId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改收入信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.pIId != null) {
            updateIncome(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addIncome(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const pIIds = row.pIId || this.ids;
      const putTime = this.ids ;
      this.$confirm('是否确认删除收入信息数据?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delIncome(pIIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('poor/income/export', {
        ...this.queryParams
      }, `poor_income.xlsx`)
    }
  },

  computed:{
  },

  watch:{
    form:{
      handler(){
        this.form.incomeZy=Number(this.form.incomeJhsy)+Number(this.form.incomeDb)+Number(this.form.incomeTkgy)+Number(this.form.incomeStbc)+Number(this.form.incomeQtzy);
        this.form.incomeCy=Number(this.form.incomeZcbf)+Number(this.form.incomeQt);
      },
      deep:true
    }
  }


};
</script>
