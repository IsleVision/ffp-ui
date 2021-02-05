<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="户主键" prop="poorId">
        <el-input
          v-model="queryParams.poorId"
          placeholder="请输入户主键"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="成员姓名" prop="memberName">
        <el-input
          v-model="queryParams.memberName"
          placeholder="请输入成员姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="成员姓名" prop="memberConnect">
        <el-input
          v-model="queryParams.memberConnect"
          placeholder="请输入成员姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="成员身份证号" prop="memberCardid">
        <el-input
          v-model="queryParams.memberCardid"
          placeholder="请输入成员身份证号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="民族" prop="nation">
        <el-input
          v-model="queryParams.nation"
          placeholder="请输入民族"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="1.	小学
            2.	初中
            3.	高中
            4.	高职
            5.	中专
            6.	大专
            7.	本科
            8.	研究生及以上
            " prop="eDegree">
        <el-input
          v-model="queryParams.eDegree"
          placeholder="请输入1.	小学
            2.	初中
            3.	高中
            4.	高职
            5.	中专
            6.	大专
            7.	本科
            8.	研究生及以上
            "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="1.普通劳动力；
            2.无劳动力
            3.弱劳动力或半劳动力
            " prop="ldjn">
        <el-input
          v-model="queryParams.ldjn"
          placeholder="请输入1.普通劳动力；
            2.无劳动力
            3.弱劳动力或半劳动力
            "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="0是1否" prop="whetherLsjz">
        <el-input
          v-model="queryParams.whetherLsjz"
          placeholder="请输入0是1否"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="1.党员
            2.预备党员
            3.共青团员
            4.群众
            " prop="zzmm">
        <el-input
          v-model="queryParams.zzmm"
          placeholder="请输入1.党员
            2.预备党员
            3.共青团员
            4.群众
            "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="0是1否" prop="whetherSxcx">
        <el-input
          v-model="queryParams.whetherSxcx"
          placeholder="请输入0是1否"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="0是1否" prop="whetherPth">
        <el-input
          v-model="queryParams.whetherPth"
          placeholder="请输入0是1否"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="0是1否" prop="whetherLybx">
        <el-input
          v-model="queryParams.whetherLybx"
          placeholder="请输入0是1否"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="0是1否" prop="whetherBcbx">
        <el-input
          v-model="queryParams.whetherBcbx"
          placeholder="请输入0是1否"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="0是1否" prop="whetherYwbx">
        <el-input
          v-model="queryParams.whetherYwbx"
          placeholder="请输入0是1否"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="0是1否" prop="whetherXyjr">
        <el-input
          v-model="queryParams.whetherXyjr"
          placeholder="请输入0是1否"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="phoneNumber">
        <el-input
          v-model="queryParams.phoneNumber"
          placeholder="请输入联系电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省" prop="region01">
        <el-input
          v-model="queryParams.region01"
          placeholder="请输入省"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市" prop="region02">
        <el-input
          v-model="queryParams.region02"
          placeholder="请输入市"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="县" prop="region03">
        <el-input
          v-model="queryParams.region03"
          placeholder="请输入县"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="乡" prop="region04">
        <el-input
          v-model="queryParams.region04"
          placeholder="请输入乡"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="村" prop="region05">
        <el-input
          v-model="queryParams.region05"
          placeholder="请输入村"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省编码" prop="regionCode01">
        <el-input
          v-model="queryParams.regionCode01"
          placeholder="请输入省编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市编码" prop="regionCode02">
        <el-input
          v-model="queryParams.regionCode02"
          placeholder="请输入市编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="县编码" prop="regionCode03">
        <el-input
          v-model="queryParams.regionCode03"
          placeholder="请输入县编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="乡编码" prop="regionCode04">
        <el-input
          v-model="queryParams.regionCode04"
          placeholder="请输入乡编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="村编码" prop="regionCode05">
        <el-input
          v-model="queryParams.regionCode05"
          placeholder="请输入村编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="0有效1无效" prop="deleteFlag">
        <el-input
          v-model="queryParams.deleteFlag"
          placeholder="请输入0有效1无效"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="0减少" prop="isDie">
        <el-input
          v-model="queryParams.isDie"
          placeholder="请输入0减少"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

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
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['collect:member:export']"
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

    <el-table v-loading="loading" :data="memberList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="户主键" align="center" prop="poorId" />
      <el-table-column label="主键" align="center" prop="pMId" />
      <el-table-column label="成员姓名" align="center" prop="memberName" />
      <el-table-column label="成员姓名" align="center" prop="memberConnect" />
      <el-table-column label="成员身份证号" align="center" prop="memberCardid" />
      <el-table-column label="民族" align="center" prop="nation" />
      <el-table-column label="1.	小学
            2.	初中
            3.	高中
            4.	高职
            5.	中专
            6.	大专
            7.	本科
            8.	研究生及以上
            " align="center" prop="eDegree" />
      <el-table-column label="1.普通劳动力；
            2.无劳动力
            3.弱劳动力或半劳动力
            " align="center" prop="ldjn" />
      <el-table-column label="0是1否" align="center" prop="whetherLsjz" />
      <el-table-column label="1.党员
            2.预备党员
            3.共青团员
            4.群众
            " align="center" prop="zzmm" />
      <el-table-column label="0是1否" align="center" prop="whetherSxcx" />
      <el-table-column label="0是1否" align="center" prop="whetherPth" />
      <el-table-column label="0是1否" align="center" prop="whetherLybx" />
      <el-table-column label="0是1否" align="center" prop="whetherBcbx" />
      <el-table-column label="0是1否" align="center" prop="whetherYwbx" />
      <el-table-column label="0是1否" align="center" prop="whetherXyjr" />
      <el-table-column label="联系电话" align="center" prop="phoneNumber" />
      <el-table-column label="省" align="center" prop="region01" />
      <el-table-column label="市" align="center" prop="region02" />
      <el-table-column label="县" align="center" prop="region03" />
      <el-table-column label="乡" align="center" prop="region04" />
      <el-table-column label="村" align="center" prop="region05" />
      <el-table-column label="省编码" align="center" prop="regionCode01" />
      <el-table-column label="市编码" align="center" prop="regionCode02" />
      <el-table-column label="县编码" align="center" prop="regionCode03" />
      <el-table-column label="乡编码" align="center" prop="regionCode04" />
      <el-table-column label="村编码" align="center" prop="regionCode05" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="0有效1无效" align="center" prop="deleteFlag" />
      <el-table-column label="0减少" align="center" prop="isDie" />
      <el-table-column label="0减少" align="center" prop="dieReasion" />
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
        <el-form-item label="户主键" prop="poorId">
          <el-input v-model="form.poorId" placeholder="请输入户主键" />
        </el-form-item>
        <el-form-item label="成员姓名" prop="memberName">
          <el-input v-model="form.memberName" placeholder="请输入成员姓名" />
        </el-form-item>
        <el-form-item label="成员姓名" prop="memberConnect">
          <el-input v-model="form.memberConnect" placeholder="请输入成员姓名" />
        </el-form-item>
        <el-form-item label="成员身份证号" prop="memberCardid">
          <el-input v-model="form.memberCardid" placeholder="请输入成员身份证号" />
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input v-model="form.nation" placeholder="请输入民族" />
        </el-form-item>
        <el-form-item label="1.	小学
            2.	初中
            3.	高中
            4.	高职
            5.	中专
            6.	大专
            7.	本科
            8.	研究生及以上
            " prop="eDegree">
          <el-input v-model="form.eDegree" placeholder="请输入1.	小学
            2.	初中
            3.	高中
            4.	高职
            5.	中专
            6.	大专
            7.	本科
            8.	研究生及以上
            " />
        </el-form-item>
        <el-form-item label="1.普通劳动力；
            2.无劳动力
            3.弱劳动力或半劳动力
            " prop="ldjn">
          <el-input v-model="form.ldjn" placeholder="请输入1.普通劳动力；
            2.无劳动力
            3.弱劳动力或半劳动力
            " />
        </el-form-item>
        <el-form-item label="0是1否" prop="whetherLsjz">
          <el-input v-model="form.whetherLsjz" placeholder="请输入0是1否" />
        </el-form-item>
        <el-form-item label="1.党员
            2.预备党员
            3.共青团员
            4.群众
            " prop="zzmm">
          <el-input v-model="form.zzmm" placeholder="请输入1.党员
            2.预备党员
            3.共青团员
            4.群众
            " />
        </el-form-item>
        <el-form-item label="0是1否" prop="whetherSxcx">
          <el-input v-model="form.whetherSxcx" placeholder="请输入0是1否" />
        </el-form-item>
        <el-form-item label="0是1否" prop="whetherPth">
          <el-input v-model="form.whetherPth" placeholder="请输入0是1否" />
        </el-form-item>
        <el-form-item label="0是1否" prop="whetherLybx">
          <el-input v-model="form.whetherLybx" placeholder="请输入0是1否" />
        </el-form-item>
        <el-form-item label="0是1否" prop="whetherBcbx">
          <el-input v-model="form.whetherBcbx" placeholder="请输入0是1否" />
        </el-form-item>
        <el-form-item label="0是1否" prop="whetherYwbx">
          <el-input v-model="form.whetherYwbx" placeholder="请输入0是1否" />
        </el-form-item>
        <el-form-item label="0是1否" prop="whetherXyjr">
          <el-input v-model="form.whetherXyjr" placeholder="请输入0是1否" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="省" prop="region01">
          <el-input v-model="form.region01" placeholder="请输入省" />
        </el-form-item>
        <el-form-item label="市" prop="region02">
          <el-input v-model="form.region02" placeholder="请输入市" />
        </el-form-item>
        <el-form-item label="县" prop="region03">
          <el-input v-model="form.region03" placeholder="请输入县" />
        </el-form-item>
        <el-form-item label="乡" prop="region04">
          <el-input v-model="form.region04" placeholder="请输入乡" />
        </el-form-item>
        <el-form-item label="村" prop="region05">
          <el-input v-model="form.region05" placeholder="请输入村" />
        </el-form-item>
        <el-form-item label="省编码" prop="regionCode01">
          <el-input v-model="form.regionCode01" placeholder="请输入省编码" />
        </el-form-item>
        <el-form-item label="市编码" prop="regionCode02">
          <el-input v-model="form.regionCode02" placeholder="请输入市编码" />
        </el-form-item>
        <el-form-item label="县编码" prop="regionCode03">
          <el-input v-model="form.regionCode03" placeholder="请输入县编码" />
        </el-form-item>
        <el-form-item label="乡编码" prop="regionCode04">
          <el-input v-model="form.regionCode04" placeholder="请输入乡编码" />
        </el-form-item>
        <el-form-item label="村编码" prop="regionCode05">
          <el-input v-model="form.regionCode05" placeholder="请输入村编码" />
        </el-form-item>
        <el-form-item label="0有效1无效" prop="deleteFlag">
          <el-input v-model="form.deleteFlag" placeholder="请输入0有效1无效" />
        </el-form-item>
        <el-form-item label="0减少" prop="isDie">
          <el-input v-model="form.isDie" placeholder="请输入0减少" />
        </el-form-item>
        <el-form-item label="0减少" prop="dieReasion">
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
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          poorId: null,
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
          deleteFlag: null,
          isDie: null,
          dieReasion: null
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
      /** 查询监测户成员列表 */
      getList() {
        this.loading = true;
        listMember(this.queryParams).then(response => {
          this.memberList = response.rows;
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
