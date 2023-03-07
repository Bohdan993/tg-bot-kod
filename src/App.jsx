import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { About } from './Pages/About';
import { ChooseCity } from './Pages/ChooseCity';
import { ChooseMaster } from './Pages/ChooseMaster';
import { useDispatch, useSelector } from "react-redux";
import { getBaseData } from './Thunks/app';
import { MainLayout } from './Components/MainLayout';
import { RelatedServices } from './Pages/RelatedServices';
import { OurTeam } from './Pages/OurTeam';
import { ChooseDate } from './Pages/ChooseDate';
import { Order } from './Pages/Order';
import { Loader } from './Components/Loader';
import './App.css';



const tg = window.Telegram.WebApp;

function App() {
  const isLoading = useSelector(state => state.app.loading);
  const data = useSelector(state => state.app.info);
  const dispatch = useDispatch();

  useEffect(() => {
    tg.ready();
    dispatch(getBaseData());
  }, [dispatch]);


  if(isLoading) {
    return (
      <Loader w={75} h={75} className="preloader" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/>
    )
  }

  if(!data) {
    return <div>Something went wrong!</div>
  }

  return (
      <Routes>
        <Route index element={<ChooseCity />} />
        <Route path="/" element={<MainLayout />}>
          {/* <Route path={`/${ROUTES['employment']}`} element={<ChooseMaster />} /> */}
          <Route path="about/:companyId" element={<About />} />
          <Route path="masters/:companyId" element={<ChooseMaster/>} />
          <Route path="related-services/:companyId" element={<RelatedServices/>}/>
          <Route path="order/:companyId" element={<Order/>}/>
        </Route>
        <Route path="our-team/:companyId" element={<OurTeam/>}/>
        <Route path="date/:companyId" element={<ChooseDate/>}/>
      </Routes>
  );
}

export default App;
export {
  tg
}
