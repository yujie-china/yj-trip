//把city.js文件中导出的文件导入到index.js中再全部导出
export * from "./modules/city"
export * from "./modules/home"
    // 等价于
    // export {getCityAll} from "./modules/city"