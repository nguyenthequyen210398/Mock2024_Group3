import axios from 'axios';
import { useEffect, useState } from 'react';

export const getLisDataAPI = (api, setDataRes) => {

    const data = axios.get(api)
        .then((res) => { setDataRes(res.data) })
        .catch((er) => console.log(er, 'err'));

    return data;
};

// customhook call api
export const useGetListDataAPI = (api) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getLisDataAPI(api, setData);
    }, []);

    return [data, setData];
};