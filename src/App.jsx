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
import { Oval } from 'react-loader-spinner';
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
      <Oval
        height={75}
        width={75}
        wrapperStyle={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
        wrapperClass="preloader"
        visible={true}
        ariaLabel='oval-loading'
        strokeWidth={5}
        strokeWidthSecondary={5}

      />
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
          <Route path="masters/:companyId" element={<ChooseMaster />} />
          <Route path="related-services/:companyId" element={<RelatedServices/>}/>
          <Route path="our-team/:companyId" element={<OurTeam/>}/>
          <Route path="date/:companyId" element={<ChooseDate/>}/>
        </Route>
      </Routes>
  );
}

export default App;
export {
  tg
}
