import { useEffect,useRef,useState } from "react"
import { GetCurrentPosition } from "../services/getCurrentPosition"
import { Map,MapMarker } from 'react-kakao-maps-sdk';

export default function MainPage(){
    const currentPosition = GetCurrentPosition()
    const mapRef = useRef();
    const [coordinates,setCoordinates] = useState(null)
    const getCoordinates = () => {
		const map = mapRef.current;

		setCoordinates({
			center: {
				lat: map.getCenter().getLat(),
				lng: map.getCenter().getLng(),
			},
		});
	};

    useEffect(()=> {
        fetch(`https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&x=${currentPosition.x}&y=${currentPosition.y}&radius=2000&page=1`,{
            headers:{
                "Authorization": "KakaoAK c8726f9fcec10726850740217f090add"
            }
        }).then((res)=> {
            console.log(res);
        })
    },[currentPosition])
    return (
        <>
        {currentPosition.x}<br/>
        {currentPosition.y}
        <Map 
            center={{ lat: currentPosition.y, lng: currentPosition.x }}   // 지도의 중심 좌표
            style={{ width: '800px', height: '600px' }} // 지도 크기
            level={3}                                   // 지도 확대 레벨
            ref={mapRef}
        >
            <MapMarker position={{ lat: currentPosition.y, lng: currentPosition.x }}> </MapMarker>
            <button onClick={getCoordinates}>현재 위치 좌표 얻기</button>
        </Map>
        {coordinates && (
            <div>
                현재 위치의 좌표는..
                <p>위도 : {coordinates.center.lat}</p>
                <p>경도 : {coordinates.center.lng}</p>
            </div>
        )}
        </>
    )
}