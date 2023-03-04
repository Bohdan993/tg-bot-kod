import { URLS } from "../Constants/urls";


export function getBaseData(){
    return new Promise(async (res, rej) => {
        try {
           let t =  `<small>You are running this application in <pre>${JSON.stringify(process.env)}</pre> mode.</small>`;
           console.log(t);
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