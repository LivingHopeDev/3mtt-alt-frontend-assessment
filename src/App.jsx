import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "../src/layouts/RootLayout";
import Dashboard from "../src/pages/Dashboard";
import RepoDetails from "../src/pages/RepoDetails";
import NotFound from "./pages/NotFound";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="repo-details/:name" element={<RepoDetails />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
