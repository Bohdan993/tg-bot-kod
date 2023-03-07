import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Loader } from "../Components/Loader";

export const withPageGuard = (Wrapped) => {

    const Component = (props) => {
        const navigate = useNavigate();
        const [ready, setReady] = useState(false);
        const companyId = useSelector(state => state.company.activeCompany?.id);
        
        useEffect(()=>{
            if(!companyId) {
                navigate('/');
                return;
            }
            setReady(true);
        }, []);

        if(!ready) {
            return <Loader w={75} h={75} className="loader" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/>
        }

        return (
            <Wrapped {...props}/>
        )
    }

    return Component;
}