import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function useTelegramData() {
    const query = useQuery();
    const [startParam, setStartParam] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const startParamValue = query.get('tgWebAppStartParam');
        if (startParamValue) {
            setStartParam(startParamValue);
            console.log('ParamsID:', startParamValue);
        }

        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                setUserData(user);
                console.log('User Data:', user);
            } else {
                setUserData({
                    username: "bogdan_krvsk",
                    id: 874423521,
                    is_premium: false
                });
                console.log('Default User Data:', {
                    username: "bogdan_krvsk",
                    id: 874423521,
                    is_premium: false
                });
            }
        } else {
            setUserData({
                username: "bogdan_krvsk",
                id: 874423521,
                is_premium: false
            });
            console.log('Default User Data:', {
                username: "bogdan_krvsk",
                id: 874423521,
                is_premium: false
            });
        }
    }, [query]);

    return {  userData };
}
