import { getCityAll } from "@/services";
import { defineStore } from "pinia";

export const useCityStore =defineStore("city",{
    state:()=>({
        allCities:{},
        currentCity:"南昌"
    }),
    actions: {
       async fetchAllCitiesData(){
        const res = await getCityAll()
        this.allCities=res.data
        }
    }
})
