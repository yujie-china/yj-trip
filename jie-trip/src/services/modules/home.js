import YJRequest from "../request/index"

export function getHotSuggest(){
   return YJRequest.get({
    url: "/home/hotSuggests" 
      })
}

export function getHomeCategories() {
    return YJRequest.get({
      url: "/home/categories"
    })
  }
  
  export function getHomeHouselist(currentPage) {
    return YJRequest.get({
      url: "/home/houselist",
      params: {
        page: currentPage
      }
    })
  }
  