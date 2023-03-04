import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { ChooseCity } from './Pages/ChooseCity';
import { ChooseMaster } from './Pages/ChooseMaster';
import { useDispatch, useSelector } from "react-redux";
import { getBaseData } from './Thunks/app';
import { MainLayout } from './Components/MainLayout';



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
          <Route path="masters/:cityId" element={<ChooseMaster />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
export {
  tg
}
