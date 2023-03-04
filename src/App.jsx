import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { About } from './Pages/About';
import { ChooseCity } from './Pages/ChooseCity';
import { ChooseMaster } from './Pages/ChooseMaster';
import { useDispatch, useSelector } from "react-redux";
import { getBaseData } from './Thunks/app';
import { MainLayout } from './Components/MainLayout';
import { RelatedServices } from './Pages/RelatedServices';



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
      <div>App is loading ... </div>
    )
  }

  if(!data) {
    return <div>Something went wrong!</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ChooseCity />} />
        <Route path="/" element={<MainLayout />}>
          {/* <Route path={`/${ROUTES['employment']}`} element={<ChooseMaster />} /> */}
          <Route path="about" element={<About />} />
          <Route path="masters/:companyId" element={<ChooseMaster />} />
          <Route path="related-services/:companyId/:serviceId" element={<RelatedServices/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
export {
  tg
}
