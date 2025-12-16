import './App.scss'
import Header from "../Header/Header.tsx";
import Content from "../Content/Content.tsx";
import AppModal from "../AppModal/AppModal.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "../../store/hooks.ts";
import {setAuthToken} from "../../store/user/userSlice.ts";
import {getCategoryTypes} from "../../store/category/categorySlice.ts";

function App() {
    const dispatch = useAppDispatch();
    const isAuth = sessionStorage.getItem('token');

    useEffect(() => {
        dispatch(setAuthToken());
        dispatch(getCategoryTypes());
    }, [dispatch, isAuth]);

    return (
        <>
            <Header/>
            <AppModal/>
            <Content/>
        </>
    )
}

export default App
