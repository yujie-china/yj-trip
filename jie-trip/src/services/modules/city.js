import YJRequest from '../request/index'

export function getCityAll() {
    return YJRequest.get({
        url: "/city/all"
    })
}