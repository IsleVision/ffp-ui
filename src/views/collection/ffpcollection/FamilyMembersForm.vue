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
          v-hasPermi="['collect:member:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['collect:member:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['collect:member:remove']"
        >删除</el-button>
      </el-col>
      <!--<el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['collect:member:export']"
        >导出</el-button>
      </el-col>-->
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
          <el-button size="mini" circle icon="el-icon-search" @click="showSearch=!showSearch" />
        </el-tooltip>
      </div>
    </el-row>

    <el-table v-loading="loading" :data="memberList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!--<el-table-column label="主键" align="center" prop="pMId" />-->
      <el-table-column label="成员姓名" align="center" prop="memberName" />
      <el-table-column label="与户主关系" align="center" prop="memberConnect" :formatter="memberConnectFormat" />
      <el-table-column label="成员身份证号" align="center" prop="memberCardid" width="200"/>
      <el-table-column label="民族" align="center" prop="nation" :formatter="nationFormat" />
      <el-table-column label="文化程度" align="center" prop="eDegree" :formatter="eDegreeFormat" />
      <el-table-column label="劳动技能" align="center" prop="ldjn" :formatter="ldjnFormat" />
      <el-table-column label="是否享受临时救助" align="center" prop="whetherLsjz" :formatter="whetherLsjzFormat" />
      <el-table-column label="政治面貌" align="center" prop="zzmm" :formatter="zzmmFormat" />
      <el-table-column label="是否失学或辍学" align="center" prop="whetherSxcx" :formatter="whetherSxcxFormat" />
      <el-table-column label="是否会讲普通话" align="center" prop="whetherPth" :formatter="whetherPthFormat" />
      <el-table-column label="是否参加城乡居民基本养老保险" align="center" prop="whetherLybx" :formatter="whetherLybxFormat" />
      <el-table-column label="是否参加商业补充医疗保险" align="center" prop="whetherBcbx" :formatter="whetherBcbxFormat" />
      <el-table-column label="是否享受人身意外保险补贴" align="center" prop="whetherYwbx" :formatter="whetherYwbxFormat" />
      <el-table-column label="是否现役军人" align="center" prop="whetherXyjr" :formatter="whetherXyjrFormat" />
      <el-table-column label="联系电话" align="center" prop="phoneNumber"  width="150"/>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="成员状态" align="center" prop="isDie" :formatter="isDieFormat" />
      <el-table-column label="减少原因" align="center" prop="dieReasion" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['collect:member:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['collect:member:remove']"
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

    <!-- 添加或修改监测户成员对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="成员姓名" prop="memberName">
          <el-input v-model="form.memberName" placeholder="请输入成员姓名" />
        </el-form-item>
        <el-form-item label="与户主关系">
          <el-select v-model="form.memberConnect" placeholder="请选择与户主关系">
            <el-option
              v-for="dict in memberConnectOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成员身份证号" prop="memberCardid">
          <el-input v-model="form.memberCardid" placeholder="请输入成员身份证号" />
        </el-form-item>
        <el-form-item label="民族">
          <el-select v-model="form.nation" placeholder="请选择民族">
            <el-option
              v-for="dict in nationOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文化程度">
          <el-select v-model="form.eDegree" placeholder="请选择文化程度">
            <el-option
              v-for="dict in eDegreeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="劳动技能">
          <el-select v-model="form.ldjn" placeholder="请选择劳动技能">
            <el-option
              v-for="dict in ldjnOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否享受临时救助">
          <el-select v-model="form.whetherLsjz" placeholder="请选择是否享受临时救助">
            <el-option
              v-for="dict in whetherLsjzOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select v-model="form.zzmm" placeholder="请选择政治面貌">
            <el-option
              v-for="dict in zzmmOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否失学或辍学">
          <el-select v-model="form.whetherSxcx" placeholder="请选择是否失学或辍学">
            <el-option
              v-for="dict in whetherSxcxOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否会讲普通话">
          <el-select v-model="form.whetherPth" placeholder="请选择是否会讲普通话">
            <el-option
              v-for="dict in whetherPthOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否参加城乡居民基本养老保险">
          <el-select v-model="form.whetherLybx" placeholder="请选择是否参加城乡居民基本养老保险">
            <el-option
              v-for="dict in whetherLybxOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否参加商业补充医疗保险">
          <el-select v-model="form.whetherBcbx" placeholder="请选择是否参加商业补充医疗保险">
            <el-option
              v-for="dict in whetherBcbxOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否享受人身意外保险补贴">
          <el-select v-model="form.whetherYwbx" placeholder="请选择是否享受人身意外保险补贴">
            <el-option
              v-for="dict in whetherYwbxOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否现役军人">
          <el-select v-model="form.whetherXyjr" placeholder="请选择是否现役军人">
            <el-option
              v-for="dict in whetherXyjrOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="成员状态">
          <el-select v-model="form.isDie" placeholder="请选择成员状态">
            <el-option
              v-for="dict in isDieOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="减少原因" prop="dieReasion">
          <el-input v-model="form.dieReasion" type="textarea" placeholder="请输入内容" />
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
  import { listMember, getMember, delMember, addMember, updateMember } from "@/api/collect/member";

  export default {
    name: "Member",
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
        // 监测户成员表格数据
        memberList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 与户主关系字典
        memberConnectOptions: [],
        // 民族字典
        nationOptions: [],
        // 文化程度字典
        eDegreeOptions: [],
        // 劳动技能字典
        ldjnOptions: [],
        // 是否享受临时救助字典
        whetherLsjzOptions: [],
        // 政治面貌字典
        zzmmOptions: [],
        // 是否失学或辍学字典
        whetherSxcxOptions: [],
        // 是否会讲普通话字典
        whetherPthOptions: [],
        // 是否参加城乡居民基本养老保险字典
        whetherLybxOptions: [],
        // 是否参加商业补充医疗保险字典
        whetherBcbxOptions: [],
        // 是否享受人身意外保险补贴字典
        whetherYwbxOptions: [],
        // 是否现役军人字典
        whetherXyjrOptions: [],
        // 成员状态字典
        isDieOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
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
      this.getDicts("sys_show_hide").then(response => {
        this.memberConnectOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.nationOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.eDegreeOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.ldjnOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.whetherLsjzOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.zzmmOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.whetherSxcxOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.whetherPthOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.whetherLybxOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.whetherBcbxOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.whetherYwbxOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.whetherXyjrOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.isDieOptions = response.data;
      });
    },
    methods: {
      /** 查询监测户成员列表 */
      getList() {
        this.loading = true;
        listMember(this.queryParams).then(response => {
          this.memberList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 与户主关系字典翻译
      memberConnectFormat(row, column) {
        return this.selectDictLabel(this.memberConnectOptions, row.memberConnect);
      },
      // 民族字典翻译
      nationFormat(row, column) {
        return this.selectDictLabel(this.nationOptions, row.nation);
      },
      // 文化程度字典翻译
      eDegreeFormat(row, column) {
        return this.selectDictLabel(this.eDegreeOptions, row.eDegree);
      },
      // 劳动技能字典翻译
      ldjnFormat(row, column) {
        return this.selectDictLabel(this.ldjnOptions, row.ldjn);
      },
      // 是否享受临时救助字典翻译
      whetherLsjzFormat(row, column) {
        return this.selectDictLabel(this.whetherLsjzOptions, row.whetherLsjz);
      },
      // 政治面貌字典翻译
      zzmmFormat(row, column) {
        return this.selectDictLabel(this.zzmmOptions, row.zzmm);
      },
      // 是否失学或辍学字典翻译
      whetherSxcxFormat(row, column) {
        return this.selectDictLabel(this.whetherSxcxOptions, row.whetherSxcx);
      },
      // 是否会讲普通话字典翻译
      whetherPthFormat(row, column) {
        return this.selectDictLabel(this.whetherPthOptions, row.whetherPth);
      },
      // 是否参加城乡居民基本养老保险字典翻译
      whetherLybxFormat(row, column) {
        return this.selectDictLabel(this.whetherLybxOptions, row.whetherLybx);
      },
      // 是否参加商业补充医疗保险字典翻译
      whetherBcbxFormat(row, column) {
        return this.selectDictLabel(this.whetherBcbxOptions, row.whetherBcbx);
      },
      // 是否享受人身意外保险补贴字典翻译
      whetherYwbxFormat(row, column) {
        return this.selectDictLabel(this.whetherYwbxOptions, row.whetherYwbx);
      },
      // 是否现役军人字典翻译
      whetherXyjrFormat(row, column) {
        return this.selectDictLabel(this.whetherXyjrOptions, row.whetherXyjr);
      },
      // 成员状态字典翻译
      isDieFormat(row, column) {
        return this.selectDictLabel(this.isDieOptions, row.isDie);
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
          pMId: null,
          memberName: null,
          memberConnect: null,
          memberCardid: null,
          nation: null,
          eDegree: null,
          ldjn: null,
          whetherLsjz: null,
          zzmm: null,
          whetherSxcx: null,
          whetherPth: null,
          whetherLybx: null,
          whetherBcbx: null,
          whetherYwbx: null,
          whetherXyjr: null,
          phoneNumber: null,
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
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          remark: null,
          deleteFlag: null,
          isDie: null,
          dieReasion: null
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
        this.ids = selection.map(item => item.pMId)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加监测户成员";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const pMId = row.pMId || this.ids
        getMember(pMId).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改监测户成员";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.pMId != null) {
              updateMember(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addMember(this.form).then(response => {
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
        const pMIds = row.pMId || this.ids;
        this.$confirm('是否确认删除监测户成员编号为"' + pMIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMember(pMIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('collect/member/export', {
          ...this.queryParams
        }, `collect_member.xlsx`)
      }
    }
  };
</script>
