<template>
  <div class="app-container">
    <!--<el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item label="单位名称" prop="deptName">
        <el-input
          v-model="queryParams.deptName"
          placeholder="请输入单位名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="单位状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>-->

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:dept:add']"
        >新增</el-button>
      </el-col>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
        <!--<el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
          <el-button size="mini" circle icon="el-icon-search" @click="showSearch=!showSearch" />
        </el-tooltip>-->
      </div>
    </el-row>

    <el-table
      v-loading="loading"
      :data="jchList"
      row-key="poorId"
      default-expand-all
    >
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="region02" label="市"></el-table-column>
      <el-table-column prop="region03" label="县"></el-table-column>
      <el-table-column prop="region04" label="乡镇"></el-table-column>
      <el-table-column prop="region05" label="村"></el-table-column>
      <el-table-column prop="poorName" label="户主"></el-table-column>
      <el-table-column prop="poorNum" label="成员人数"></el-table-column>
      <el-table-column prop="ffpHuType" label="监测类型"></el-table-column>
      <el-table-column prop="createTime" label="监测时间" ></el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dept:edit']"
          >修改</el-button>
          <!--<el-button
            v-if="scope.row.parentId != 0"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dept:remove']"
          >删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
<!--    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />-->
    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1200px" append-to-body>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
          <BaseInfoForm/>
        </el-tab-pane>
        <el-tab-pane label="家庭成员信息" name="second">
          <FamilyMembersForm/>
        </el-tab-pane>
        <el-tab-pane label="生产生活条件" name="third">
          <ProductionLifeForm/>
        </el-tab-pane>
        <el-tab-pane label="收入信息" name="fourth">
          <IncomeForm :poor-id="poorId"/>
        </el-tab-pane>
        <el-tab-pane label="支出信息" name="outlay">
          <OutlayForm/>
        </el-tab-pane>
        <!--<el-tab-pane label="监测信息" name="monitor">
          &lt;!&ndash;<MonitorInfo/>&ndash;&gt;
        </el-tab-pane>-->
      </el-tabs>
     <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import {jchlist} from "@/api/collect/list";
import BaseInfoForm from './BaseInfoForm';
import FamilyMembersForm from './FamilyMembersForm';
import ProductionLifeForm from './ProductionLifeForm';
// import IncomeInfoForm from './IncomeInfoForm';
import IncomeForm from './IncomeForm';
import OutlayForm from './OutlayForm';
import MonitorInfo from  './MonitorInfo'
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Dept",
  components: {
    Treeselect,
    BaseInfoForm,
    FamilyMembersForm,
    ProductionLifeForm,
    // IncomeInfoForm,
    IncomeForm,
    OutlayForm,
    MonitorInfo
  },
  data() {
    return {
      poorId:'',
      //总条数
      total:'',
      //tabs
      activeName: 'first',
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 表格树数据
      jchList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum:1,
        pageSize:10
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parentId: [
          { required: true, message: "上级单位不能为空", trigger: "blur" }
        ],
        deptName: [
          { required: true, message: "单位名称不能为空", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    //tabs切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    /** 查询部门列表 */
    getList() {
      this.loading = false;
      this.loading = true;
      jchlist(this.queryParams).then(response => {
        this.jchList = response.rows;
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
        deptId: undefined,
        parentId: undefined,
        deptName: undefined,
        orderNum: undefined,
        leader: undefined,
        phone: undefined,
        email: undefined,
        status: "0"
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      if (row != undefined) {
        this.form.parentId = row.deptId;
      }
      this.open = true;
      this.title = "添加监测户";
 /*     listDept().then(response => {
	        this.deptOptions = this.handleTree(response.data, "deptId");
      });*/
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.poorId = row.poorId;
      this.open = true;
      // this.reset();
/*      getDept(row.deptId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改部门";
      });
      listDeptExcludeChild(row.deptId).then(response => {
	        this.deptOptions = this.handleTree(response.data, "deptId");
      });*/
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.deptId != undefined) {
            updateDept(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addDept(this.form).then(response => {
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
      this.$confirm('是否确认删除名称为"' + row.deptName + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDept(row.deptId);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    }
  }
};
</script>
