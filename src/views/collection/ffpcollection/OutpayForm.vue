<template>
  <div class="app-container">

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['poor:pay:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['poor:pay:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['poor:pay:remove']"
        >删除</el-button>
      </el-col>
<!--      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['poor:pay:export']"
        >导出</el-button>
      </el-col>-->
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
<!--        <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
          <el-button size="mini" circle icon="el-icon-search" @click="showSearch=!showSearch" />
        </el-tooltip>-->
      </div>
    </el-row>

    <el-table border v-loading="loading" :data="payList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="日期" align="center" prop="putTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.putTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="户主键" align="center" prop="poorId" />
      <el-table-column label="主键" align="center" prop="pPId" />-->
      <el-table-column label="生产经营性支出" align="center" prop="payScjy" />
      <el-table-column label="因病支出" align="center" prop="payYb" />
      <el-table-column label="因意外支出" align="center" prop="payYw" />
      <el-table-column label="因婚支出" align="center" prop="payYh" />
      <el-table-column label="因丧支出" align="center" prop="payYs" />
      <el-table-column label="因非义务教育阶段学费" align="center" prop="payFyw" />

<!--      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="0有效1无效" align="center" prop="deleteFlag" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['poor:pay:edit']"
          >编辑</el-button>
<!--          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['poor:pay:remove']"
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

    <!-- 添加或修改支出信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="日期" labelWidth="180px" prop="putTime">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.putTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

<!--        <el-form-item label="户主键" prop="poorId">
          <el-input v-model="form.poorId" placeholder="请输入户主键" />
        </el-form-item>-->
        <el-form-item label="生产经营性支出" labelWidth="180px" prop="payScjy">
          <el-input v-model="form.payScjy" placeholder="请输入生产经营性支出" />
        </el-form-item>
        <el-form-item label="因病支出" labelWidth="180px" prop="payYb">
          <el-input v-model="form.payYb" placeholder="请输入因病支出" />
        </el-form-item>
        <el-form-item label="因意外支出" labelWidth="180px" prop="payYw">
          <el-input v-model="form.payYw" placeholder="请输入因意外支出" />
        </el-form-item>
        <el-form-item label="因婚支出" labelWidth="180px" prop="payYh">
          <el-input v-model="form.payYh" placeholder="请输入因婚支出" />
        </el-form-item>
        <el-form-item label="因丧支出" labelWidth="180px" prop="payYs">
          <el-input v-model="form.payYs" placeholder="请输入因丧支出" />
        </el-form-item>
        <el-form-item label="因非义务教育阶段学费" labelWidth="180px" prop="payFyw">
          <el-input v-model="form.payFyw" placeholder="请输入因非义务教育阶段学费" />
        </el-form-item>

    <!--    <el-form-item label="0有效1无效" prop="deleteFlag">
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
import { listPay, getPay, delPay, addPay, updatePay } from "@/api/poor/pay";

export default {
  name: "Pay",
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
      // 支出信息表格数据
      payList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        poorId: null,
        payScjy: null,
        payYb: null,
        payYw: null,
        payYh: null,
        payYs: null,
        payFyw: null,
        putTime: null,
        deleteFlag: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询支出信息列表 */
    getList() {
      this.loading = true;
      listPay(this.queryParams).then(response => {
        this.payList = response.rows;
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
        pPId: null,
        payScjy: null,
        payYb: null,
        payYw: null,
        payYh: null,
        payYs: null,
        payFyw: null,
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
      this.ids = selection.map(item => item.pPId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加支出信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const pPId = row.pPId || this.ids
      getPay(pPId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改支出信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.pPId != null) {
            updatePay(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addPay(this.form).then(response => {
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
      const pPIds = row.pPId || this.ids;
      this.$confirm('是否确认删除支出信息数据?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delPay(pPIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('poor/pay/export', {
        ...this.queryParams
      }, `poor_pay.xlsx`)
    }
  }
};
</script>
