import { Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react'

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const NotFoundPage = lazy(() => import('./pages/NotFound.jsx'))
const JobDetail = lazy(() => import("./pages/JobDetail.jsx"));
const Search = lazy(() =>import("./pages/Search.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));

function App() {

  return (
    <>
      <Header />
      <Suspense fallback={(
        <div>Cargando</div>
      )}>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/search" element={ <Search />} />
          <Route path="/contact" element={ <Contact />} />
          <Route path="/job/:jobId" element={ <JobDetail /> } />
          <Route path="*" element={ <NotFoundPage /> } />
        </Routes>

      </Suspense>

      <Footer />
    </>
  );
}

export default App;
