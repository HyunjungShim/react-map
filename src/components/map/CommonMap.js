import { Map,MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useMemo, useRef, useState } from 'react';
import EventMarkerContainer from './EventMarker';

export default function CommonMap({currentPosition,data,selectId}){
    const mapRef = useRef();
    console.log(currentPosition);
    
    let {x,y} = currentPosition
    let [centerPos,setCenterPos] = useState({lat:y,lng:x})

    console.log(x,y);
    console.log(data);
    let [items,setItems] = useState([])
    useEffect(()=> {
        if(data && data.documents){
            let selectedData = data.documents.find(item=> item.id === selectId)
            console.log('selectedData',selectedData);
            if(selectedData){
                setCenterPos({
                    ...centerPos,
                    lat:selectedData.y,
                    lng:selectedData.x
                })
            }
        }
    },[selectId])
    return (
        <>
        <Map 
            center={centerPos}
            isPanto={true}
            style={{ width: '800px', height: '600px' }}
            level={3}
            ref={mapRef}
        >   
            <MapMarker position={{ lat: y, lng: x }}>현재 위치</MapMarker>
            {
                data && data.documents.map(item => {
                    return (
                        <EventMarkerContainer key={item.id} item={item} selectId={selectId}/>
                    )
                })
            }
        </Map>
        {
            <div>
                
            </div>
        }
        </>
    )
}