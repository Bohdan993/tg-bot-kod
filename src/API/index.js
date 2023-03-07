import { URLS } from "../Constants/urls";


export function getBaseData(){
    return new Promise(async (res, rej) => {
        try {
            const result = await fetch(process.env.REACT_APP_BASE_URL + URLS.getCompanyConfig, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`
                },
            });

            if(!result.ok) {
                throw new Error('Something went wrong!');
            }

            const json = await result.json();
            res(json?.data);

        } catch(err) {
            console.error(err?.message);
            rej(err?.message);
        }

    });
}

export function getMasterFreeDate({locationId, serviceId, relatedIds}){
    return new Promise(async (res, rej) => {
        try {
            const queryString = `?service=${serviceId}${relatedIds?.length ? '&related[]=' + relatedIds.join('&related[]=') : ''}&location=${locationId}`;
            const result = await fetch(process.env.REACT_APP_BASE_URL + URLS.getMasterFreeDate + queryString, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`
                },
            });

            if(!result.ok) {
                throw new Error('Something went wrong!');
            }

            const json = await result.json();
            res(json?.data);
        } catch(err) {
            console.error(err?.message);
            rej(err?.message);
        }
    })
}

export function getFreeDates({start, end, serviceId, relatedIds, companyId, masterId}){
    return new Promise(async (res, rej) => {
        try {
            const queryString = `?range_start=${start}&range_end=${end}&service=${serviceId}${relatedIds?.length ? '&related[]=' + relatedIds.join('&related[]=') : ''}&branch=${companyId}${+masterId ? '&user=' + masterId : ''}`;
            const result = await fetch(process.env.REACT_APP_BASE_URL + URLS.getFreeDates + queryString, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`
                },
            });

            if(!result.ok) {
                throw new Error('Something went wrong!');
            }

            const json = await result.json();
            res(json?.data);
        } catch(err) {
            console.error(err?.message);
            rej(err?.message);
        }
    })
}

export function postOrder({masterId, reservedOn, companyId, serviceId, relatedIds, phone, name, comment}){
    const body = {
        user_id: masterId,
        reserved_on: reservedOn,
        branch_id: companyId,
        product_id: serviceId,
        related_ids: relatedIds,
        customer_phone: phone,
        customer_first_name: name,
        booking_comment: comment
    }
    return new Promise(async (res, rej) => {
        try {
            const result = await fetch(process.env.REACT_APP_BASE_URL + URLS.getFreeDates, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if(!result.ok) {
                throw new Error('Something went wrong!');
            }

            const json = await result.json();
            res(json?.data);
        } catch(err) {
            console.error(err?.message);
            rej(err?.message);
        }
    })
}