import axios from "axios";
import { BASE_URL, TIMEOUT } from './config'
import useMainStore from "@/stores/modules/main";
const mainStore=useMainStore()
class YJRequest {
    constructor(baseURL, timeout = 10000) {
        this.instance = axios.create({
            baseURL,
            timeout
        })

        //请求拦截器
        this.instance.interceptors.request.use(config =>{
            mainStore.isLoading=true
            return config
        },err =>{
            return err
        })
    
        //响应拦截器
        this.instance.interceptors.response.use(res =>{
            mainStore.isLoading=false
            return res
        },err =>{
            mainStore.isLoading=false
            return err
        })
    }

   

    request(config) {
        // mainStore.isLoading=true
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(res => {
                resolve(res.data)
                // mainStore.isLoading=false
            }).catch(err => {
                reject(err)
                // mainStore.isLoading=false
            })
        })
    }
    get(config) {
        return this.request({...config, method: "get" })
    }

    post(config) {
        return this.request({...config, method: "post" })
    }
}
export default new YJRequest(BASE_URL, TIMEOUT)