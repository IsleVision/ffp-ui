<template>
  <div class="app-container">
   <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
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
      <!--<el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['collect:poor:export']"
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

    <el-table v-loading="loading" :data="poorList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="poorId" />
      <el-table-column label="户编号" align="center" prop="poorNum" />
      <el-table-column label="户主姓名" align="center" prop="poorName" />
      <el-table-column label="户主身份证" align="center" prop="poorCardid" />
      <el-table-column label="省" align="center" prop="region01" :formatter="region01Format" />
      <el-table-column label="市" align="center" prop="region02" :formatter="region02Format" />
      <el-table-column label="县" align="center" prop="region03" :formatter="region03Format" />
      <el-table-column label="乡" align="center" prop="region04" :formatter="region04Format" />
      <el-table-column label="村" align="center" prop="region05" :formatter="region05Format" />
      <el-table-column label="联系方式" align="center" prop="poorPhone" />
      <el-table-column label="家庭住址" align="center" prop="poorAddress" />
      <el-table-column label="是否军烈属(0:是,1:否)" align="center" prop="poorJls" :formatter="poorJlsFormat" />
      <el-table-column label="户类型(1:脱贫不稳定户2:边缘易致贫户3:预警户4:普通农户)" align="center" prop="ffpHuType" :formatter="ffpHuTypeFormat" />
      <el-table-column label="耕地面积" align="center" prop="poorGdArea" />
      <el-table-column label="林果面积" align="center" prop="poorLgArea" />
      <el-table-column label="退耕还林面积" align="center" prop="poorTghlArea" />
      <el-table-column label="林地面积" align="center" prop="poorLdArea" />
      <el-table-column label="水面面积" align="center" prop="poorSmArea" />
      <el-table-column label="住房面积" align="center" prop="houseArea" />
      <el-table-column label="是否加入农民专业合作社(0:是,1:否)" align="center" prop="whetherNchzs" />
      <el-table-column label="是否有龙头企业带动(0:是,1:否)" align="center" prop="whetherLtqydd" />
      <el-table-column label="是否同生活用电(0:是,1:否)" align="center" prop="whetherShyd" />
      <el-table-column label="是否有卫生厕所(0:是,1:否)" align="center" prop="whetherWsj" />
      <el-table-column label="主要燃料类型" align="center" prop="fuelType" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="0有效1无效" align="center" prop="deleteFlag" />
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
      <el-form id="baseform" ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="户编号" prop="poorNum">
          <el-input v-model="form.poorNum" placeholder="请输入户编号" />
        </el-form-item>
        <el-form-item label="户主姓名" prop="poorName">
          <el-input v-model="form.poorName" placeholder="请输入户主姓名" />
        </el-form-item>
        <el-form-item label="户主身份证" prop="poorCardid">
          <el-input v-model="form.poorCardid" placeholder="请输入户主身份证" />
        </el-form-item>
        <el-form-item label="省">
          <el-input
            value="陕西省"
            placeholder="陕西省"
            clearable
          />
        </el-form-item>
        <el-form-item label="市">
          <el-input
            v-if="userInfo.regionCode02"
            :value="userInfo.region02"
            :placeholder="userInfo.region02"
            clearable
          />
          <el-select v-else v-model="form.city" placeholder="请选择" @change="getAreaList('city','add')">
            <el-option
              v-for="dict in QueryAreaList.city"
              :key="dict.deptId"
              :lev="dict.lev"
              :label="dict.deptName"
              :value="dict.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="县">
          <el-input
            v-if="userInfo.regionCode03"
            :value="userInfo.region03"
            :placeholder="userInfo.region03"
            clearable
          />
          <el-select v-else v-model="form.county" placeholder="请选择" @change="getAreaList('county','add')">
            <el-option
              v-for="dict in QueryAreaList.county"
              :key="dict.deptId"
              :lev="dict.lev"
              :label="dict.deptName"
              :value="dict.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="乡">
          <el-input
            v-if="userInfo.regionCode04"
            :value="userInfo.region04"
            :placeholder="userInfo.region04"
            clearable
            size="small"
            style="width: 240px"
          />
          <el-select v-else v-model="form.town" placeholder="请选择" @change="getAreaList('town','add')">
            <el-option
              v-for="dict in QueryAreaList.town"
              :key="dict.deptId"
              :lev="dict.lev"
              :label="dict.deptName"
              :value="dict.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="村">
          <el-input
            v-if="userInfo.regionCode05"
            :value="userInfo.region05"
            :placeholder="userInfo.region05"
            clearable
            size="small"
            style="width: 240px"
          />
          <el-select v-else v-model="form.village" placeholder="请选择" @change="getAreaList('village','add')">
            <el-option
              v-for="dict in QueryAreaList.village"
              :key="dict.deptId"
              :lev="dict.lev"
              :label="dict.deptName"
              :value="dict.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="poorPhone">
          <el-input v-model="form.poorPhone" placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="家庭住址" prop="poorAddress">
          <el-input v-model="form.poorAddress" placeholder="请输入家庭住址" />
        </el-form-item>
        <el-form-item label="是否军烈属(0:是,1:否)" prop="poorJls">
          <el-input v-model="form.poorJls" placeholder="请输入是否军烈属(0:是,1:否)" />
        </el-form-item>
        <el-form-item label="户类型(1:脱贫不稳定户2:边缘易致贫户3:预警户4:普通农户)">
          <el-select v-model="form.ffpHuType" placeholder="请选择户类型(1:脱贫不稳定户2:边缘易致贫户3:预警户4:普通农户)">
            <el-option
              v-for="dict in ffpHuTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="是否加入农民专业合作社(0:是,1:否)" prop="whetherNchzs">
          <el-input v-model="form.whetherNchzs" placeholder="请输入是否加入农民专业合作社(0:是,1:否)" />
        </el-form-item>
        <el-form-item label="是否有龙头企业带动(0:是,1:否)" prop="whetherLtqydd">
          <el-input v-model="form.whetherLtqydd" placeholder="请输入是否有龙头企业带动(0:是,1:否)" />
        </el-form-item>
        <el-form-item label="是否同生活用电(0:是,1:否)" prop="whetherShyd">
          <el-input v-model="form.whetherShyd" placeholder="请输入是否同生活用电(0:是,1:否)" />
        </el-form-item>
        <el-form-item label="是否有卫生厕所(0:是,1:否)" prop="whetherWsj">
          <el-input v-model="form.whetherWsj" placeholder="请输入是否有卫生厕所(0:是,1:否)" />
        </el-form-item>
        <el-form-item label="主要燃料类型">
          <el-select v-model="form.fuelType" placeholder="请选择主要燃料类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="0有效1无效" prop="deleteFlag">
          <el-input v-model="form.deleteFlag" placeholder="请输入0有效1无效" />
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
  import { getArea } from "@/api/system/user";
  export default {
    name: "Poor",
    data() {
      return {
        //当前登录人信息
        userInfo:{},
        //当前选择的行政区划
        Area:{
          code:'',
          lev:1
        },
        //查询的行政区划树
        QueryAreaList:{
          //省
          province:[],
          //市
          city:[],
          //县
          county:[],
          //乡
          town:[],
          //村
          village:[]
        },
        //当前登录人deptId
        currentDeptId:'',
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
        // 是否军烈属(0:是,1:否)字典
        poorJlsOptions: [],
        // 户类型(1:脱贫不稳定户2:边缘易致贫户3:预警户4:普通农户)字典
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
          poorNum: [
            { required: true, message: "户编号不能为空", trigger: "blur" }
          ],
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
            { required: true, message: "是否军烈属(0:是,1:否)不能为空", trigger: "blur" }
          ],
          ffpHuType: [
            { required: true, message: "户类型(1:脱贫不稳定户2:边缘易致贫户3:预警户4:普通农户)不能为空", trigger: "blur" }
          ],
        }
      };
    },
    created() {
      //获取当前用户信息
      this.userInfo=this.$store.getters.dept;
      this.currentDeptId = this.$store.getters.dept.deptId;
      this.Area.code = this.currentDeptId;
      this.Area.lev = this.$store.getters.dept.lev;
  /*    this.getList();
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
      });*/
    },
    methods: {
      /** 获取行政区划 */
      /** area级别
       *  type业务类型
       * */
      getAreaList(area,type,code) {
        if(code){
          if(area == 'city' && type =='add'){
            //请求市list
            getArea({parentId:code}).then(response => {
              const that = this;
              if(response.data.length >0){
                that.QueryAreaList.city = response.data.filter(item =>{
                  return item.lev === 2
                })
              }
            })
          }else if(area == 'county' && type =='add'){
            //请求县区list
            getArea({parentId:code}).then(response => {
              const that = this;
              if(response.data.length >0){
                that.QueryAreaList.county = response.data.filter(item =>{
                  return item.lev === 3
                })
              }
            })
          }else if(area == 'town' && type =='add'){
            //请求乡镇list
            getArea({parentId:code}).then(response => {
              const that = this;
              if(response.data.length >0){
                that.QueryAreaList.town = response.data.filter(item =>{
                  return item.lev === 4
                })
              }
            })
          }else if(area == 'village' && type =='add'){
            //请求村list
            getArea({parentId:code}).then(response => {
              const that = this;
              if(response.data.length >0){
                that.QueryAreaList.village = response.data.filter(item =>{
                  return item.lev === 5
                })
              }
            })
          }
        }else{
          //选中option刷新改变视图
          this.$forceUpdate();
          if(area != 'village'){
            if(type == 'add'){
              //判断当前选中的是哪一级，将参数赋值给请求参数
              if(area == 'city'){
                this.Area.code = this.form.city
              }
              else if(area == 'county'){
                this.Area.code = this.form.county
              }
              else if(area == 'town'){
                this.Area.code = this.form.town
              }
            }else if(type == 'search'){
              //判断当前选中的是哪一级，将参数赋值给请求参数
              if(area == 'city'){
                this.Area.code = this.queryParams.city
              }
              else if(area == 'county'){
                this.Area.code = this.queryParams.county
              }
              else if(area == 'town'){
                this.Area.code = this.queryParams.town
              }
            }
            getArea({parentId:this.Area.code}).then(response => {
                const that = this;
                if(response.data.length >0){
                  //请求省级、市级行政区划树数组
                  if(area == 'province'){
                    //清空行政区划树数组
                    that.QueryAreaList.city = []
                    that.QueryAreaList.county =[]
                    that.QueryAreaList.town = []
                    that.QueryAreaList.village =[]
                    //清空查询参数
                    that.queryParams.city = ''
                    that.queryParams.county = ''
                    that.queryParams.town = ''
                    that.queryParams.village = ''
                    //清空新增修改参数
                    that.form.city = ''
                    that.form.county = ''
                    that.form.town = ''
                    that.form.village = ''
                    //进入页面默认请求出“省”，“市”行政区划List即lev等于1等于2的item
                    that.queryParams.province = response.data[0].deptId
                    that.QueryAreaList.province = response.data.filter(item =>{
                      return item.lev === 1
                    });
                    that.QueryAreaList.city = response.data.filter(item =>{
                      return item.lev === 2
                    })
                  }
                  //请求区县级行政区划树数组
                  if(area == 'city'){
                    //清空行政区划树数组
                    that.QueryAreaList.county =[]
                    that.QueryAreaList.town = []
                    that.QueryAreaList.village =[]
                    //清空查询参数
                    that.queryParams.county = ''
                    that.queryParams.town = ''
                    that.queryParams.village = ''
                    //清空新增修改参数
                    that.form.county = ''
                    that.form.town = ''
                    that.form.village = ''
                    //检出lev等于3的item
                    that.QueryAreaList.county = response.data.filter(item =>{
                      return item.lev === 3
                    })
                  }
                  //请求乡镇级别行政区划树数组
                  if(area == 'county'){
                    //清空行政区划树数组
                    that.QueryAreaList.town = []
                    that.QueryAreaList.village =[]
                    //清空查询参数
                    that.queryParams.town = ''
                    that.queryParams.village = ''
                    //清空新增修改参数
                    that.form.town = ''
                    that.form.village = ''
                    //检出lev等级等于4的item
                    that.QueryAreaList.town = response.data.filter(item =>{
                      return item.lev === 4
                    })
                  }
                  //请求村级行政区划树数组
                  if(area == 'town'){
                    //清空行政区划树数组
                    that.QueryAreaList.village =[]
                    //清空查询参数
                    that.queryParams.village = ''
                    //清空新增修改参数
                    that.form.village = ''
                    //检出lev等级等于5的item
                    that.QueryAreaList.village = response.data.filter(item =>{
                      return item.lev === 5
                    })
                  }
                }
              }
            );
          }else{
            //村选择option
            if(this.form.village){
              this.Area.code = this.form.village
            }else{
              this.Area.code = this.queryParams.village
            }
          }
        }

      },
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
      // 是否军烈属(0:是,1:否)字典翻译
      poorJlsFormat(row, column) {
        return this.selectDictLabel(this.poorJlsOptions, row.poorJls);
      },
      // 户类型(1:脱贫不稳定户2:边缘易致贫户3:预警户4:普通农户)字典翻译
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
          city:null,
          county:null,
          town:null,
          village:null,
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
        this.title = "添加监测户信息";

        //清空市、县、乡镇、村list
        this.QueryAreaList.city =[];
        this.QueryAreaList.county =[];
        this.QueryAreaList.town=[];
        this.QueryAreaList.village= [];
        //根据当前账号等级请求行政区划
        if(this.Area.lev == 1){
          this.getAreaList('city','add',this.currentDeptId);
        }
        if(this.Area.lev == 2){
          this.getAreaList('city','add',this.currentDeptId);
        }
        if(this.Area.lev == 3){
          this.getAreaList('county','add',this.currentDeptId);
        }
        if(this.Area.lev == 4){
          this.getAreaList('town','add',this.currentDeptId);
        }
        if(this.Area.lev == 5){
          this.getAreaList('village','add',this.currentDeptId);
        }
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        const that = this;
        this.reset();
        const poorId = row.poorId || this.ids
        //清空市、县、乡镇、村list
        that.QueryAreaList.city =[];
        that.QueryAreaList.county =[];
        that.QueryAreaList.town=[];
        that.QueryAreaList.village= [];
        getPoor(poorId).then(response => {
          let regionCode = response.data.dept;
          //请求市县乡村list
          if(regionCode.regionCode05){
            that.getAreaList('city','add',regionCode.regionCode01);
            that.getAreaList('county','add',regionCode.regionCode02);
            that.getAreaList('town','add',regionCode.regionCode03);
            that.getAreaList('village','add',regionCode.regionCode04);
          }else if(regionCode.regionCode04){
            that.getAreaList('county','add',regionCode.regionCode02);
            that.getAreaList('town','add',regionCode.regionCode03);
            that.getAreaList('village','add',regionCode.regionCode04);
          }else if(regionCode.regionCode03){
            that.getAreaList('town','add',regionCode.regionCode03);
            that.getAreaList('village','add',regionCode.regionCode04);
          }else if(regionCode.regionCode02){
            that.getAreaList('village','add',regionCode.regionCode04);
          }else if(regionCode.regionCode01){
            that.getAreaList('city','add',regionCode.regionCode01);
          }
          this.form = response.data;
          that.form.city = response.data.dept.regionCode02;
          that.form.county = response.data.dept.regionCode03;
          that.form.town = response.data.dept.regionCode04;
          that.form.village = response.data.dept.regionCode05;
          that.form.deptId = response.data.deptId;
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
<style>
  #baseform .el-form-item__label{
    width: 200px!important;
  }
  #baseform .el-form-item__content{
    margin-left: 200px!important;
  }
</style>
