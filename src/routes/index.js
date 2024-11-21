// https://www.heropy.dev/p/9tesDt 참조
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import MainPage from '../pages/MainPage'
//ScrollRestoration  : 페이지 이동시 스크롤 위치 복원,최상단이동 
const router = createBrowserRouter([
    {
        element:<div>Default layout <Outlet/> </div>,
        children:[
            {
                children: [
                    {
                      path: '/',
                      element:<MainPage/>
                    },
                    {
                      path: '/about',
                      element: <div>about</div>
                    }
                ]
            }   
        ]
    },
])

export default function Router(){
    return <RouterProvider router={router} />
}