import {useEffect,useState} from 'react';
export function GetCurrentPosition(){
    const [position,setPosition] = useState({x:0,y:0})
    useEffect(()=> {
        function adjustLatLng(longitude,latitude,accuracy) {
            const earthRadius = 6371000; // 지구 반지름 (미터)
            const latAdjustment = accuracy / earthRadius * (180 / Math.PI); // 위도 조정 값
            const lngAdjustment = accuracy / (earthRadius * Math.cos(latitude * Math.PI / 180)) * (180 / Math.PI); // 경도 조정 값
        
            return {
                minLat: latitude - latAdjustment,
                maxLat: latitude + latAdjustment,
                minLng: longitude - lngAdjustment,
                maxLng: longitude + lngAdjustment,
            };
        }
        function onSuccess(position){
            const {longitude,latitude,accuracy} = position.coords
            console.log(longitude,latitude,accuracy); //latitude 위도 longitude 경도
            // let {minLat,minLng} = adjustLatLng(longitude,latitude,accuracy)
            const range = adjustLatLng(latitude, longitude, accuracy);
            console.log(`검색 범위: 
                위도(${range.minLat} ~ ${range.maxLat}), 
                경도(${range.minLng} ~ ${range.maxLng})`);
            setPosition({
                ...position,
                x:longitude,
                y:latitude,
                accuracy:accuracy
            })
            if(accuracy > 10) {

            }
        }
        function onError(error){
            switch(error.code) {
                case error.PERMISSION_DENIED:
                // loc.innerHTML = "이 문장은 사용자가 Geolocation API의 사용 요청을 거부했을 때 나타납니다!"
                break;
        
                case error.POSITION_UNAVAILABLE:
                // loc.innerHTML = "이 문장은 가져온 위치 정보를 사용할 수 없을 때 나타납니다!"
                break;
        
                case error.TIMEOUT:
                // loc.innerHTML = "이 문장은 위치 정보를 가져오기 위한 요청이 허용 시간을 초과했을 때 나타납니다!"
                break;
        
                case error.UNKNOWN_ERROR:
                // loc.innerHTML = "이 문장은 알 수 없는 오류가 발생했을 때 나타납니다!"
                break;
            }
        }
        const options = {
            enableHighAccuracy: true,
            timeout:10000,
            maximumAge:0
        }
        const getGeo = navigator.geolocation.watchPosition(onSuccess,onError,options)
        return(()=> {
            console.log('clear watch geo');
            navigator.geolocation.clearWatch(getGeo)
        })
    },[])
    return position 
}