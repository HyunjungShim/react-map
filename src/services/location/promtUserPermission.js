export default function promptUserToChangePermission() {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("chrome")) {
    return "Chrome에서 권한을 재설정하려면:\n1. 브라우저 주소창 왼쪽의 자물쇠 아이콘을 클릭하세요.\n2. '위치' 권한을 '허용'으로 변경하세요. \n 3. 페이지를 새로고침 해주세요.";
  } else if (userAgent.includes("firefox")) {
    return "Firefox에서 권한을 재설정하려면:\n1. 브라우저 주소창 왼쪽의 아이콘을 클릭하세요.\n2. '권한'에서 '위치'를 '허용'으로 변경하세요. \n 3. 페이지를 새로고침 해주세요.";
  } else if (userAgent.includes("safari")) {
    return "Safari에서 권한을 재설정하려면:\n1. 브라우저 메뉴에서 'Safari > 환경설정'으로 이동하세요.\n2. '웹사이트' 탭에서 '위치' 권한을 '허용'으로 변경하세요. \n 3. 페이지를 새로고침 해주세요.";
  } else {
    return "브라우저 권한을 변경하려면 브라우저 설정을 확인하세요.";
  }
}
