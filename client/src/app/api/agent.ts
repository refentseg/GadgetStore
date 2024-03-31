import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Paginatedresponse } from "../models/pagination";
import { store } from "../Store/configureStore";
import { router } from "../router/Routes";

const sleep = () => new Promise(resolve=>setTimeout(resolve,500));

axios.defaults.baseURL=import.meta.env.VITE_APP_API_URL;
axios.defaults.withCredentials=true;

const responseBody = (response:AxiosResponse) => response.data;

axios.interceptors.request.use(config =>{
    const token = store.getState().account.user?.token;
    if(token) {
        (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
})


axios.interceptors.response.use(async response =>{
    if(import.meta.env.DEV) await sleep();
    //pagination in small letters because axios works with small letters
    const pagination = response.headers['pagination'];
    if(pagination){
        response.data = new Paginatedresponse(response.data,JSON.parse(pagination));
        return response 
    }
    return response
},
    (error:AxiosError)=>{
    const {data,status} = error?.response as AxiosResponse;
    switch (status) {
        case 400:
            if(data.errors){
                const modelStateErrors: string[] = [];
                for (const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }

                }
                throw modelStateErrors.flat()
            }
            toast.error(data.title)
            break;
        case 401:
            toast.error(data.title)
            break;
        case 403:
            toast.error("You are not allowed to do that")
            break;
        case 500:
            router.navigate('/server-error',{state:{error:data}})
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests ={
    get:(url:string,params?:URLSearchParams)=>axios.get(url,{params}).then(responseBody),
    post:(url:string,body:object)=>axios.post(url,body).then(responseBody),
    put:(url:string,body:object)=>axios.put(url,body).then(responseBody),
    delete:(url:string)=>axios.delete(url).then(responseBody),
    postForm:(url:string,data:FormData) => axios.post(url,data,{
        headers:{'Content-type':'multipart/form-data'}
    }).then(responseBody),
    putForm:(url:string,data:FormData) => axios.put(url,data,{
        headers:{'Content-type':'multipart/form-data'}
    }).then(responseBody)
}

function createFormData(item:any) {
    const formData = new FormData();
    for (const key in item){
        formData.append(key,item[key])
    }
    return formData;
}

const Admin = {
    createProduct: (product:any) => requests.postForm('products',createFormData(product)),
    updateProduct: (product:any) => requests.putForm('products',createFormData(product)),
    deleteProduct: (id:number) => requests.delete(`products/${id}`),
}
const Catalog = {
    list:(params: URLSearchParams)=>requests.get('products',params),
    details:(id:number) => requests.get(`products/${id}`),
    fetchFilters: () =>requests.get('products/filters')
}

const TestErrors ={
    get400Error: ()=>requests.get('buggy/bad-request'),
    get401Error: ()=>requests.get('buggy/unauthorised'),
    get404Error: ()=>requests.get('buggy/not-found'),
    get500Error: ()=>requests.get('buggy/server-error'),
    getVaildationError: ()=>requests.get('buggy/validation-error'),
}

const Basket ={
    get:()=>requests.get('basket'),
    addItem:(productId:number,quantity=1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem:(productId:number,quantity=1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const Account ={
    login: (values:any) =>requests.post('account/login',values),
    register: (values:any) =>requests.post('account/register',values),
    currentUser:() => requests.get('account/currentUser'),
    fetchAddress: () => requests.get('account/savedAddress')
}

const Orders = {
    list:() => requests.get('orders'),
    fetch:(id:number) => requests.get(`orders/${id}`),
    create:(values:any) => requests.post('orders',values)
}

//Add Payment here

const Payments ={
    createPaymentIntent:() => requests.post('payments',{})
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account,
    Admin,
    Orders,
    Payments
}

export default agent;