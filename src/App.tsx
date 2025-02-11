
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import CandidateSearch from './pages/CandidateSearch'; 
import SavedCandidates from './pages/SavedCandidates'; 
import Nav from './components/Nav';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "candidatesearch", 
        element: <CandidateSearch />,
      },
      {
        path: "savedcandidates", 
        element: <SavedCandidates />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

function MainApp() {
  return <RouterProvider router={router} />;
}

export default App;