<template>
  <div class="app-container">
    <!--<el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
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
          v-hasPermi="['collect:poor:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['collect:poor:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['collect:poor:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['collect:poor:export']"
        >导出</el-button>
      </el-col>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
          <el-button size="mini" circle icon="el-icon-search" @click="showSearch=!showSearch" />
        </el-tooltip>
      </div>
    </el-row>

    <el-table v-loading="loading" :data="poorList" @selection-change="handleSelectionChange">
      <el-table-column label="耕地面积" align="center" prop="poorGdArea" />
      <el-table-column label="林果面积" align="center" prop="poorLgArea" />
      <el-table-column label="退耕还林面积" align="center" prop="poorTghlArea" />
      <el-table-column label="林地面积" align="center" prop="poorLdArea" />
      <el-table-column label="水面面积" align="center" prop="poorSmArea" />
      <el-table-column label="住房面积" align="center" prop="houseArea" />
      <el-table-column label="是否加入农民专业合作社" align="center" prop="whetherNchzs" />
      <el-table-column label="是否有龙头企业带动" align="center" prop="whetherLtqydd" />
      <el-table-column label="是否同生活用电" align="center" prop="whetherShyd" />
      <el-table-column label="是否有卫生厕所" align="center" prop="whetherWsj" />
      <el-table-column label="主要燃料类型" align="center" prop="fuelType" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['collect:poor:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['collect:poor:remove']"
          >删除</el-button>
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

    <!-- 添加或修改监测户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="耕地面积" prop="poorGdArea">
          <el-input v-model="form.poorGdArea" placeholder="请输入耕地面积" />
        </el-form-item>
        <el-form-item label="林果面积" prop="poorLgArea">
          <el-input v-model="form.poorLgArea" placeholder="请输入林果面积" />
        </el-form-item>
        <el-form-item label="退耕还林面积" prop="poorTghlArea">
          <el-input v-model="form.poorTghlArea" placeholder="请输入退耕还林面积" />
        </el-form-item>
        <el-form-item label="林地面积" prop="poorLdArea">
          <el-input v-model="form.poorLdArea" placeholder="请输入林地面积" />
        </el-form-item>
        <el-form-item label="水面面积" prop="poorSmArea">
          <el-input v-model="form.poorSmArea" placeholder="请输入水面面积" />
        </el-form-item>
        <el-form-item label="住房面积" prop="houseArea">
          <el-input v-model="form.houseArea" placeholder="请输入住房面积" />
        </el-form-item>
        <el-form-item label="是否加入农民专业合作社" prop="whetherNchzs">
          <el-input v-model="form.whetherNchzs" placeholder="请输入是否加入农民专业合作社" />
        </el-form-item>
        <el-form-item label="是否有龙头企业带动" prop="whetherLtqydd">
          <el-input v-model="form.whetherLtqydd" placeholder="请输入是否有龙头企业带动" />
        </el-form-item>
        <el-form-item label="是否同生活用电" prop="whetherShyd">
          <el-input v-model="form.whetherShyd" placeholder="请输入是否同生活用电" />
        </el-form-item>
        <el-form-item label="是否有卫生厕所" prop="whetherWsj">
          <el-input v-model="form.whetherWsj" placeholder="请输入是否有卫生厕所" />
        </el-form-item>
        <el-form-item label="主要燃料类型">
          <el-select v-model="form.fuelType" placeholder="请选择主要燃料类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { listPoor, getPoor, delPoor, addPoor, updatePoor } from "@/api/collect/poor";

  export default {
    name: "Poor",
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
        // 监测户信息表格数据
        poorList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 省字典
        region01Options: [],
        // 市字典
        region02Options: [],
        // 县字典
        region03Options: [],
        // 乡字典
        region04Options: [],
        // 村字典
        region05Options: [],
        // 是否军烈属字典
        poorJlsOptions: [],
        // 户类型字典
        ffpHuTypeOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          poorName: [
            { required: true, message: "户主姓名不能为空", trigger: "blur" }
          ],
          poorCardid: [
            { required: true, message: "户主身份证不能为空", trigger: "blur" }
          ],
          region01: [
            { required: true, message: "省不能为空", trigger: "blur" }
          ],
          region02: [
            { required: true, message: "市不能为空", trigger: "blur" }
          ],
          region03: [
            { required: true, message: "县不能为空", trigger: "blur" }
          ],
          region04: [
            { required: true, message: "乡不能为空", trigger: "blur" }
          ],
          region05: [
            { required: true, message: "村不能为空", trigger: "blur" }
          ],
          poorPhone: [
            { required: true, message: "联系方式不能为空", trigger: "blur" }
          ],
          poorAddress: [
            { required: true, message: "家庭住址不能为空", trigger: "blur" }
          ],
          poorJls: [
            { required: true, message: "是否军烈属不能为空", trigger: "blur" }
          ],
          ffpHuType: [
            { required: true, message: "户类型不能为空", trigger: "blur" }
          ],
        }
      };
    },
    created() {
      this.getList();
      this.getDicts("sys_user_sex").then(response => {
        this.region01Options = response.data;
      });
      this.getDicts("sys_show_hide").then(response => {
        this.region02Options = response.data;
      });
      this.getDicts("sys_show_hide").then(response => {
        this.region03Options = response.data;
      });
      this.getDicts("sys_show_hide").then(response => {
        this.region04Options = response.data;
      });
      this.getDicts("sys_show_hide").then(response => {
        this.region05Options = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.poorJlsOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.ffpHuTypeOptions = response.data;
      });
    },
    methods: {
      /** 查询监测户信息列表 */
      getList() {
        this.loading = true;
        listPoor(this.queryParams).then(response => {
          this.poorList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 省字典翻译
      region01Format(row, column) {
        return this.selectDictLabel(this.region01Options, row.region01);
      },
      // 市字典翻译
      region02Format(row, column) {
        return this.selectDictLabel(this.region02Options, row.region02);
      },
      // 县字典翻译
      region03Format(row, column) {
        return this.selectDictLabel(this.region03Options, row.region03);
      },
      // 乡字典翻译
      region04Format(row, column) {
        return this.selectDictLabel(this.region04Options, row.region04);
      },
      // 村字典翻译
      region05Format(row, column) {
        return this.selectDictLabel(this.region05Options, row.region05);
      },
      // 是否军烈属字典翻译
      poorJlsFormat(row, column) {
        return this.selectDictLabel(this.poorJlsOptions, row.poorJls);
      },
      // 户类型字典翻译
      ffpHuTypeFormat(row, column) {
        return this.selectDictLabel(this.ffpHuTypeOptions, row.ffpHuType);
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
          poorNum: null,
          poorName: null,
          poorCardid: null,
          region01: null,
          region02: null,
          region03: null,
          region04: null,
          region05: null,
          regionCode01: null,
          regionCode02: null,
          regionCode03: null,
          regionCode04: null,
          regionCode05: null,
          poorPhone: null,
          poorAddress: null,
          poorJls: null,
          ffpHuType: null,
          poorGdArea: null,
          poorLgArea: null,
          poorTghlArea: null,
          poorLdArea: null,
          poorSmArea: null,
          houseArea: null,
          whetherNchzs: null,
          whetherLtqydd: null,
          whetherShyd: null,
          whetherWsj: null,
          fuelType: null,
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
        this.ids = selection.map(item => item.poorId)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加生产生活条件";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const poorId = row.poorId || this.ids
        getPoor(poorId).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改监测户信息";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.poorId != null) {
              updatePoor(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addPoor(this.form).then(response => {
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
        const poorIds = row.poorId || this.ids;
        this.$confirm('是否确认删除监测户信息编号为"' + poorIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPoor(poorIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('collect/poor/export', {
          ...this.queryParams
        }, `collect_poor.xlsx`)
      }
    }
  };
</script>
