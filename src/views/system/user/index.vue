<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
          <el-form-item label="省" prop="province">
            <el-input
              value="陕西省"
              placeholder="陕西省"
              clearable
              size="small"
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="市" prop="city">
            <el-input
              v-if="userInfo.regionCode02"
              :value="userInfo.region02"
              :placeholder="userInfo.region02"
              clearable
              size="small"
              style="width: 240px"
            />
            <el-select v-else v-model="queryParams.city" placeholder="请选择" @change="getAreaList('city','search')">
              <el-option
                v-for="dict in QueryAreaList.city"
                :key="dict.deptId"
                :lev="dict.lev"
                :label="dict.deptName"
                :value="dict.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="县" prop="county">
            <el-input
              v-if="userInfo.regionCode03"
              :value="userInfo.region03"
              :placeholder="userInfo.region03"
              clearable
              size="small"
              style="width: 240px"
            />
            <el-select v-else v-model="queryParams.county" placeholder="请选择" @change="getAreaList('county','search')">
              <el-option
                v-for="dict in QueryAreaList.county"
                :key="dict.deptId"
                :lev="dict.lev"
                :label="dict.deptName"
                :value="dict.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="乡" prop="town">
            <el-input
              v-if="userInfo.regionCode04"
              :value="userInfo.region04"
              :placeholder="userInfo.region04"
              clearable
              size="small"
              style="width: 240px"
            />
            <el-select v-else v-model="queryParams.town" placeholder="请选择" @change="getAreaList('town','search')">
              <el-option
                v-for="dict in QueryAreaList.town"
                :key="dict.deptId"
                :lev="dict.lev"
                :label="dict.deptName"
                :value="dict.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="村" prop="village">
            <el-input
              v-if="userInfo.regionCode05"
              :value="userInfo.region05"
              :placeholder="userInfo.region05"
              clearable
              size="small"
              style="width: 240px"
            />
            <el-select v-else v-model="queryParams.village" placeholder="请选择" @change="getAreaList('village','search')">
              <el-option
                v-for="dict in QueryAreaList.village"
                :key="dict.deptId"
                :lev="dict.lev"
                :label="dict.deptName"
                :value="dict.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登录账号" prop="userName">
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入登录账号"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input
              v-model="queryParams.phonenumber"
              placeholder="请输入手机号码"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="用户状态"
              clearable
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictCode"
                :label="dict.dictLabel"
                :value="dict.dictCode"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="dateRange"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
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
              v-hasPermi="['system:user:add']"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
              v-hasPermi="['system:user:edit']"
            >修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
              v-hasPermi="['system:user:remove']"
            >删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="info"
              icon="el-icon-upload2"
              size="mini"
              @click="handleImport"
              v-hasPermi="['system:user:import']"
            >导入</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['system:user:export']"
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

        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
         <!-- <el-table-column label="用户编号" align="center" prop="userId" />-->
          <el-table-column label="登录账号" align="center" prop="userName" :show-overflow-tooltip="true" />
          <el-table-column label="用户名" align="center" prop="nickName" :show-overflow-tooltip="true" />
        <!--  <el-table-column label="单位" align="center" prop="dept.deptName" :show-overflow-tooltip="true" />-->
          <el-table-column label="手机号码" align="center" prop="phonenumber" width="120" />
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="0"
                inactive-value="1"
                @change="handleStatusChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime" width="160">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:user:edit']"
              >修改</el-button>
              <el-button
                v-if="scope.row.userId !== 1"
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['system:user:remove']"
              >删除</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-key"
                @click="handleResetPwd(scope.row)"
                v-hasPermi="['system:user:resetPwd']"
              >重置</el-button>
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
      </el-col>
    </el-row>
    <!-- 添加或修改参数配置对话框 -->
    <!--打开回调open函数 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入用户名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色">
              <el-select v-model="form.roleIds" multiple placeholder="请选择">
                <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="省" prop="province">
              <el-input
                value="陕西省"
                placeholder="陕西省"
                clearable
                size="small"
                style="width: 200px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="市" prop="city">
              <el-input
                v-if="userInfo.regionCode02"
                :value="userInfo.region02"
                :placeholder="userInfo.region02"
                clearable
                size="small"
                style="width: 200px"
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
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="县" prop="county">
              <el-input
                v-if="userInfo.regionCode03"
                :value="userInfo.region03"
                :placeholder="userInfo.region03"
                clearable
                size="small"
                style="width: 200px"
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
          </el-col>
          <el-col :span="12">
            <el-form-item label="乡" prop="town">
              <el-input
                v-if="userInfo.regionCode04"
                :value="userInfo.region04"
                :placeholder="userInfo.region04"
                clearable
                size="small"
                style="width: 200px"
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
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="村" prop="village">
              <el-input
                v-if="userInfo.regionCode05"
                :value="userInfo.region05"
                :placeholder="userInfo.region05"
                clearable
                size="small"
                style="width: 200px"
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
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" label="登录账号" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入登录账号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" label="用户密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入用户密码" type="password" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictCode"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
          <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link>
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listUser, getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus,getArea } from "@/api/system/user";
import { getToken } from "@/utils/auth";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "User",
  components: { Treeselect },
  data() {
    return {
      //当前登录人信息
      userInfo:{},
      //当前选择的行政区划
      Area:{
        code:'',
        lev:1
      },
      //当前登录人deptId
      currentDeptId:'',
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
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
   /*   // 单位树选项
      deptOptions: undefined,*/
      // 是否显示弹出层
      open: false,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined,
        province: undefined,
        city: undefined,
        county: undefined,
        town:undefined,
        village:undefined
      },
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "登录账号不能为空", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        deptId: [
          { required: true, message: "所属单位不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {

  },
  created() {
    //获取当前用户信息
    this.userInfo=this.$store.getters.dept;
    this.currentDeptId = this.$store.getters.dept.deptId;
    this.Area.code = this.currentDeptId;
    this.Area.lev = this.$store.getters.dept.lev;
    //请求用户列表
    this.getList();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
    this.getConfigKey("sys.user.initPassword").then(response => {
      this.initPassword = response.msg;
    });
    //根据当前账号等级请求行政区划
    if(this.Area.lev == 1){
      this.getAreaList('city','add',this.currentDeptId);
    }else if(this.Area.lev == 2){
      this.getAreaList('county','add',this.currentDeptId);
    }else if(this.Area.lev == 3){
      this.getAreaList('town','add',this.currentDeptId);
    }else if(this.Area.lev == 4){
      this.getAreaList('village','add',this.currentDeptId);
    }else{
      this.getAreaList('city','add',this.currentDeptId);
    }
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
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      //处理行政区划参数,始终传最后一级
      if(this.queryParams.village){
        this.Area.code = this.queryParams.village
      }else if(this.queryParams.town){
        this.Area.code = this.queryParams.town
      }else if(this.queryParams.county){
        this.Area.code = this.queryParams.county
      }else if(this.queryParams.city){
        this.Area.code = this.queryParams.city
      }else if(this.queryParams.province){
        this.Area.code = this.queryParams.province
      }else{
        this.Area.code = this.currentDeptId
      }
      this.queryParams ={
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        userName: this.queryParams.userName,
        phonenumber: this.queryParams.phonenumber,
        status: this.queryParams.status,
        deptId: this.Area.code//行政区划
      };
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.userList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.userName + '"用户吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return changeUserStatus(row.userId, row.status);
        }).then(() => {
          this.msgSuccess(text + "成功");
        }).catch(function() {
          row.status = row.status === "0" ? "1" : "0";
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
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        status: "0",
        remark: undefined,
        roleIds: []
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      const that = this;
      getUser().then(response => {
        that.roleOptions = response.roles;
        that.open = true;
        that.title = "添加用户";
        that.form.password = that.initPassword;

        //清空市、县、乡镇、村list
        that.QueryAreaList.city =[];
        that.QueryAreaList.county =[];
        that.QueryAreaList.town=[];
        that.QueryAreaList.village= [];
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
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const that = this;
      const userId = row.userId || this.ids;
      //清空市、县、乡镇、村list
      that.QueryAreaList.city =[];
      that.QueryAreaList.county =[];
      that.QueryAreaList.town=[];
      that.QueryAreaList.village= [];

      getUser(userId).then(response => {
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
        //form绑定回显值
        that.form = response.data;
        that.roleOptions = response.roles;
        that.form.roleIds = response.roleIds;
        that.form.city = response.data.dept.regionCode02;
        that.form.county = response.data.dept.regionCode03;
        that.form.town = response.data.dept.regionCode04;
        that.form.village = response.data.dept.regionCode05;
        that.form.deptId = response.data.deptId;
        that.form.status = response.data.status;
        that.open = true;
        that.title = "修改用户";
        that.form.password = "";
      });
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
          resetUserPwd(row.userId, value).then(response => {
            if (response.code === 200) {
              this.msgSuccess("修改成功，新密码是：" + value);
            }
          });
        }).catch(() => {});
    },
    /** 提交按钮 */
    submitForm: function() {
      const that = this;
      this.$refs["form"].validate(valid => {
        //处理行政区划参数,始终传最后一级
        if(that.form.village){
          that.form.deptId = that.form.village
        }else if(that.form.town){
          that.form.deptId = that.form.town
        }else if(that.form.county){
          that.form.deptId = that.form.county
        }else if(that.form.city){
          that.form.deptId = that.form.city
        }else if(that.form.province){
          that.form.deptId = that.form.province
        }
        console.log(that.form.deptId);
        if (valid) {
          if (that.form.userId != undefined) {
            updateUser(that.form).then(response => {
              if (response.code === 200) {
                that.msgSuccess("修改成功");
                that.open = false;
                that.Area.code = that.currentDeptId
                that.getList();
              }
            });
          } else {
            addUser(that.form).then(response => {
              if (response.code === 200) {
                that.msgSuccess("新增成功");
                that.open = false;
                that.Area.code = that.currentDeptId
                that.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.userId || this.ids;
      this.$confirm('是否确认删除用户编号为"' + userIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delUser(userIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/user/export', {
        ...this.queryParams
      }, `user_${new Date().getTime()}.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('system/user/importTemplate', {
        ...this.queryParams
      }, `user_${new Date().getTime()}.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    }
  }
};
</script>
