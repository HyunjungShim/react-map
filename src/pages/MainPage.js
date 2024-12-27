import { useEffect,useState,useMemo } from "react"
import { GetCurrentPosition } from "../services/location/getCurrentPosition"
import { useFetchData } from '../services/useFetchData'
import CategoryList from "../components/list/CategoryList";
import ComommonMap from "../components/map/CommonMap";
export default function MainPage(){
    // 현재위치 => 리스트 => 지도에도 marker 찍기 
    const currentPosition = GetCurrentPosition()
    let apiKey = process.env.REACT_APP_REST_API_KEY;
    let baseUrl = process.env.REACT_APP_catgory_url;
    let params = {
        category_group_code:'FD6',
        // x:currentPosition?.x,
        // y:currentPosition?.y,
        radius:2000,
        page:1,
        sort:'distance'
    }
    let headers = {
        "Authorization": `${apiKey}`
    }
    const { data, isLoading, isSuccess,error,refetch } = useFetchData(baseUrl,params,headers)
    useEffect(()=> {
        
        if(currentPosition && currentPosition.x && currentPosition.y){
            params.x = currentPosition.x
            params.y = currentPosition.y
            refetch();
        }
    },[currentPosition])

    const [selectId,setSelectId] = useState(0);

    function handleListClick(id){
        setSelectId(id)
    }

    //  장소 더보기 눌렀을때 => pagination 
    // if(isSuccess && !data.meta.is_end){
    //     params.x = currentPosition.x
    //     params.y = currentPosition.y
    //     params.page++
    //     refetch();
    // }

    if(isLoading) return <div>Loading...</div>
    return (
        <>
        {
            currentPosition && <CategoryList  data={data} onClick={handleListClick}/>
        }
        {
            currentPosition && <ComommonMap  currentPosition={currentPosition} data={data} selectId={selectId}/>
        }
        {/* {currentPosition && (
            <>
            {currentPosition.x}<br/>
            {currentPosition.y}
            <Map
                center={{ lat: currentPosition.y, lng: currentPosition.x }}
                style={{ width: '800px', height: '600px' }}
                level={5}
                ref={mapRef}
            >
                <MapMarker position={{ lat: currentPosition.y, lng: currentPosition.x }} />
                <button onClick={getCoordinates}>현재 위치 좌표 얻기</button>
            </Map>
            </>
        )} */}

        {/* {coordinates && (
            <div>
                현재 위치의 좌표는..
                <p>위도 : {coordinates.center.lat}</p>
                <p>경도 : {coordinates.center.lng}</p>
            </div>
        )} */}
        </>
    )
}