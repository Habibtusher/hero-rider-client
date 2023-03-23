import { API } from "./Interceptors";

const getData = (url)=>API.get(url);
const postData = (url,data)=>API.post(url,data);
const updateData = (url)=>API.put(url);
const remove = (url)=>API.delete(url);
const getByEmail = (url,params)=>API.get(`${url}?email=${params}`);
const getDtaWithPagination = (url,params)=>API.get(url,params);

export {getData,postData,updateData,remove,getByEmail,getDtaWithPagination};