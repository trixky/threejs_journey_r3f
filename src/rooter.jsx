import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lesson54 from "./lessons/54/Lesson";
import Nav from "./nav";
import routes from "./routes";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     routes.map((route) => (
//       <Route key={route.path} path={route.path} element={route.element} />
//     ))
//   ),
//   https://www.reddit.com/r/react/comments/1as5nnp/what_is_a_better_way_of_implementing_routing_in/
// { basename: import.meta.env.BASE_URL }
// );

export default function Router() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}
    >
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="/" element={<Lesson54 />} />
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<p>error 404</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
    // <div>
    //     <RouterProvider router={router} />
    // </div>
  );
}
