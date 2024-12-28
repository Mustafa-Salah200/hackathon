import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login"
import Emergencies from "./Components/Emergencies/Emergencies"
import Profile from "./Components/Profile/Profile"
import Learn from "./Components/Learn/Learn"
import Post from "./Components/Post/Post"
import Community from "./Components/Community/Community"

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Emergencies />
        },
        {
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'learn',
          element: <Learn/>
        },
        {
          path: "post",
          element: <Post />
        },
        {
          path: 'community',
          element: <Community />
        }
      ]

    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "*",
      element: <h3>error page</h3>
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App