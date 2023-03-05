import { getBaseData as fetchBaseData } from '../API';
import { setLoading, setCompanyInfo } from '../Slices/app';


export const getBaseData = () => async (dispatch) => {
    const data = await fetchBaseData();
    await dispatch(setCompanyInfo(data));
    await dispatch(setLoading(false));
};