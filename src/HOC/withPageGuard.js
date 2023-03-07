import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

export const withPageGuard = (Wrapped) => {

    const Component1 = (props) => {
        const navigate = useNavigate();
        const [ready, setReady] = useState(false); // HERE
        const companyId = useSelector(state => state.company.activeCompany?.id);
        
        useEffect(()=>{
            if(!companyId) {
                navigate('/');
                return;
            }
            setReady(true); // HERE
        }, []);

        if (!ready) return null; // HERE

        return (
            <Wrapped {...props}/>
        )
    }

    return Component1;
}