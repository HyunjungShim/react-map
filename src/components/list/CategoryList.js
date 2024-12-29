import { useState } from 'react';
import { useFetchData } from '../../services/useFetchData'

export default function CategoryList({data,onClick}){
    // let apiKey = process.env.REACT_APP_REST_API_KEY;
    // let baseUrl = process.env.REACT_APP_catgory_url;
    // let params = {
    //     category_group_code:'FD6',
    //     x:x,
    //     y:y,
    //     radius:2000,
    //     page:1,
    //     sort:'distance'
    // }
    // let headers = {
    //     "Authorization": `${apiKey}`
    // }
    // const { data, isLoading, error } = useFetchData(baseUrl,params,headers)
    // console.log(data);
    
    // if(isLoading) return <div>Loading...</div>
    return (
        // 무한스크롤 구현 예정  / 스크롤시 meta.is_end false => refetch page+1
        <>
            {
                data && data.documents.map(item => {
                    return (
                        <p key={item.id} onClick={()=> {onClick(item.id)} }>{item.place_name} {item.id}</p>
                    )
                })
            }
            <button>더보기</button>
        </>
    )
}