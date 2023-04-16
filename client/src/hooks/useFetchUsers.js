import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest.js";

const useFetchUsers = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true)
                const res = await makeRequest.get(url);
                setData(res.data[0]);
            } catch (err) {
                setError(true)
            }
            setLoading(false)
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetchUsers;