// https://www.heropy.dev/p/9tesDt 참조
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import ErrorPage from '../pages/ErrorPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

//ScrollRestoration  : 페이지 이동시 스크롤 위치 복원,최상단이동 
const router = createBrowserRouter([
    {
        element:
        <QueryClientProvider client={queryClient}>
            Default layout
            <Outlet/>
        </QueryClientProvider>,
        children:[
            {
                children: [
                    {
                      path: '/',
                      element:<MainPage/>,
                      errorElement:<ErrorPage />
                    },
                    {
                      path: '/about',
                      element: <div>about</div>
                    }
                ]
            }   
        ],
    },
    {
        basename:process.env.PUBLIC_URL
    }
])

export default function Router(){
    return <RouterProvider router={router} />
}