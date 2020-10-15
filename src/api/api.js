import req from './axios.config.js';                 //连接接口文件
export function getNavList({ siteid, flag }) {
    return req({
        url: '/Type/getTypeListCacheV3',
        method: 'post',
        params:{
            siteid,
            flag
        },
        headers: {
            authorization: sessionStorage.getItem("token"),
            //设置请求报文头，没有可以不写
        },
    })
}