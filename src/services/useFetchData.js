import { useQuery } from '@tanstack/react-query';

const fetchData = async (url,params,headers) => {
    let queryString = new URLSearchParams(params).toString();
    let reqUrl = `${url}?${queryString}` 
    console.log('headers',headers);
    
    const response = await fetch(reqUrl,{
        headers:headers
    })
    if(!response.ok) {
        throw new Error('error occured')
    }
    return response.json();
}

export const useFetchData = (url,params,headers,enabled=false) => {
    const result = useQuery({
        queryKey:['data',params,url,headers],
        queryFn:()=> fetchData(url,params,headers),
        enabled:enabled
    })
    return result;
}