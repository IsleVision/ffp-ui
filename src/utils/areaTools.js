import { getArea } from "@/api/system/user";
//清空行政区划数组
/**
 * areaList行政区划数组集合
 * 省 province
 * 市 city
 * 县 county
 * 乡 town
 * 村 village
 */
let clearAreaList = (areaList) => {
    areaList.province = [];
    areaList.city = [];
    areaList.county = [];
    areaList.town = [];
    areaList.village = [];
}
//根据当前等级请求行政区划
/**查询新增时使用
 * level行政区划数组集合
 * getAreaFun请求行政区划
 * currentDeptId当前账号的行政区划Id
 */
let getLevList = (level,currentDeptId,QueryAreaList) => {
  if(level == 1){
    getAreaCityFun(currentDeptId,QueryAreaList);
  }else if(level == 2){
    getAreaCountyFun(currentDeptId,QueryAreaList);
  }else if(level == 3){
    getAreaTownFun(currentDeptId,QueryAreaList);
  }else if(level == 4){
    getAreaVillageFun(currentDeptId,QueryAreaList);
  }else{
    getAreaCityFun(currentDeptId,QueryAreaList);
  }
}
//请求市列表
let getAreaCityFun = (code,QueryAreaList) => {
  getArea({parentId:code}).then(response => {
    if(response.data.length >0){
      QueryAreaList.city = response.data.filter(item =>{
        return item.lev === 2
      })
    }
  })
}
//请求区县列表
let getAreaCountyFun = (code,QueryAreaList) =>{
  getArea({parentId:code}).then(response => {
    if(response.data.length >0){
     QueryAreaList.county = response.data.filter(item =>{
        return item.lev === 3
      })
    }
  })
}
//请求乡镇列
let getAreaTownFun = (code,QueryAreaList) =>{
  getArea({parentId:code}).then(response => {
    if(response.data.length >0){
      QueryAreaList.town = response.data.filter(item =>{
        return item.lev === 4
      })
    }
  })
}
//请求村列表
let getAreaVillageFun = (code,QueryAreaList) => {
  getArea({parentId:code}).then(response => {
    if(response.data.length >0){
      QueryAreaList.village = response.data.filter(item =>{
        return item.lev === 5
      })
    }
  })
}
/**
 * 编辑的时候根据regionCode请求各级别的arealist
 */
let getAllArea = (regionCode) => {
  if(regionCode.regionCode05){
      getAreaCityFun(regionCode.regionCode01);
      getAreaCountyFun(regionCode.regionCode02);
      getAreaTownFun(regionCode.regionCode03);
      getAreaVillageFun(regionCode.regionCode04);
  }else if(regionCode.regionCode04){
      getAreaCountyFun(regionCode.regionCode02);
      getAreaTownFun(regionCode.regionCode03);
      getAreaVillageFun(regionCode.regionCode04);
  }else if(regionCode.regionCode03){
      getAreaTownFun(regionCode.regionCode03);
      getAreaVillageFun(regionCode.regionCode04);
  }else if(regionCode.regionCode02){
      getAreaVillageFun(regionCode.regionCode04);
  }else if(regionCode.regionCode01){
      getAreaCityFun(regionCode.regionCode01);
  }
}
export {
  clearAreaList,
  getLevList,
  getAreaCityFun,
  getAreaCountyFun,
  getAreaTownFun,
  getAreaVillageFun,
  getAllArea
}
