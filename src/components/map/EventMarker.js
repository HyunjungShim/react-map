import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { MapMarker } from 'react-kakao-maps-sdk';
export default function EventMarkerContainer({ item,selectId }){
    const [isVisible, setIsVisible] = useState(false)
    return (
        <MapMarker 
            key={item.id}
            position={{lat:item.y , lng:item.x }}
            onMouseOver={() => setIsVisible(true)}
            onMouseOut={() => setIsVisible(false)} // mouse over는 라벨형식으로 작게 표시 
        >
            { ( isVisible || selectId === item.id ) && <p>{item.place_name}<br/>{item.category_name}<br/><a href={`https://place.map.kakao.com/${item.id}`} target="_blank">상세정보</a> <br/> </p> }
            
        </MapMarker>
    )
}
