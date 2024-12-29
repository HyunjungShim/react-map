import { useEffect, useState } from "react";
export function GetCurrentPosition(retry) {
  const [position, setPosition] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    function adjustLatLng(longitude, latitude, accuracy) {
      const earthRadius = 6371000; // 지구 반지름 (미터)
      const latAdjustment = (accuracy / earthRadius) * (180 / Math.PI); // 위도 조정 값
      const lngAdjustment =
        (accuracy / (earthRadius * Math.cos((latitude * Math.PI) / 180))) *
        (180 / Math.PI); // 경도 조정 값

      return {
        minLat: latitude - latAdjustment,
        maxLat: latitude + latAdjustment,
        minLng: longitude - lngAdjustment,
        maxLng: longitude + lngAdjustment,
      };
    }
    function onSuccess(position) {
      const { longitude, latitude, accuracy } = position.coords;
      // console.log(longitude,latitude,accuracy); //latitude 위도 longitude 경도
      // let {minLat,minLng} = adjustLatLng(longitude,latitude,accuracy)
      const range = adjustLatLng(latitude, longitude, accuracy);
      // console.log(`검색 범위:
      //     위도(${range.minLat} ~ ${range.maxLat}),
      //     경도(${range.minLng} ~ ${range.maxLng})`);
      setPosition({
        // ...position,
        x: longitude,
        y: latitude,
        accuracy: accuracy,
      });
      setErrorMsg(null);
    }
    function onError(error) {
      console.log("error", error);
      setErrorMsg({
        code: error.code,
        msg: error.message,
      });
      //   switch (error.code) {
      //     case 1:
      //       return msg = error.message;
      //     case 3:
      //       return msg = error.message;
      //     default:
      //       return msg = "Unknwon Error occured";
      //   }
    }
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    // const getGeo = navigator.geolocation.getCurrentPosition(
    //   onSuccess,
    //   onError,
    //   options
    // );
    // return () => {
    //   // console.log('clear watch geo');
    //   navigator.geolocation.clearWatch(getGeo);
    // };
  }, [retry]);
  return { currentPosition: position, errorMsg };
}
