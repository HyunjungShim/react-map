import { useEffect, useState, useMemo } from "react";
import { GetCurrentPosition } from "../services/location/getCurrentPosition";
import { useFetchData } from "../services/useFetchData";
import ErrorComonent from "../components/common/ErrorComonent";
import CategoryList from "../components/list/CategoryList";
import ComommonMap from "../components/map/CommonMap";
import promptUserToChangePermission from "../services/location/promtUserPermission";
export default function MainPage() {
  // 현재위치 => 리스트 => 지도에도 marker 찍기
  const [retry, setRetry] = useState(0);
  const { currentPosition, errorMsg } = GetCurrentPosition(retry);
  console.log("currentPosition", currentPosition, errorMsg);
  let apiKey = process.env.REACT_APP_REST_API_KEY;
  let baseUrl = process.env.REACT_APP_catgory_url;
  let params = {
    category_group_code: "FD6",
    // x:currentPosition?.x,
    // y:currentPosition?.y,
    radius: 2000,
    page: 1,
    sort: "distance",
  };
  let headers = {
    Authorization: `${apiKey}`,
  };
  const { data, isLoading, refetch } = useFetchData(baseUrl, params, headers);
  useEffect(() => {
    if (
      currentPosition &&
      currentPosition.x &&
      currentPosition.y &&
      !errorMsg
    ) {
      params.x = currentPosition.x;
      params.y = currentPosition.y;
      refetch();
    }
  }, [currentPosition, errorMsg]);

  const [selectId, setSelectId] = useState(0);

  function handleListClick(id) {
    setSelectId(id);
  }

  //  장소 더보기 눌렀을때 => pagination
  // if(isSuccess && !data.meta.is_end){
  //     params.x = currentPosition.x
  //     params.y = currentPosition.y
  //     params.page++
  //     refetch();
  // }

  if (isLoading) return <div>Loading...</div>;
  else if (errorMsg)
    return (
      <ErrorComonent
        error={errorMsg}
        children={<p>{promptUserToChangePermission()}</p>}
      />
    );
  return (
    <>
      {currentPosition && (
        <CategoryList data={data} onClick={handleListClick} />
      )}
      {currentPosition && (
        <ComommonMap
          currentPosition={currentPosition}
          data={data}
          selectId={selectId}
        />
      )}
    </>
  );
}
