import { defineStore } from "pinia";
import { getHotSuggest,getHomeCategories,getHomeHouselist } from "@/services";


export const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests:[],
        categories:[],
        currentPage: 1,
        houselist:[]
    }),
    actions: {
       async fetchHotSuggestData() {
          const res = await getHotSuggest()
          this.hotSuggests=res.data
        },
        async fetchCategoriesData(){
            const res=await getHomeCategories()
            this.categories=res.data
        },
        async fetchHouselistData(){
            const res =await getHomeHouselist(this.currentPage)
            this.houselist.push(...res.data)
            this.currentPage++
        }
    }
})