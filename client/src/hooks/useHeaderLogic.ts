import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {openModal} from "../store/modal/modalSlice.ts";
import type {RootState} from "../store/store.ts";
import {getBalanceByUser} from "../store/balance/balanceSlice.ts";
import {logout} from "../store/user/userSlice.ts";
import type {Balance} from "../types";

export type UseHeaderLogic = {
    auth: boolean;
    anchorEl: HTMLElement | null;
    balance: Balance;
    handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
    handleCloseMenu: () => void;
    handleSignUpClick: () => void;
    handleLogOut: () => void;
}

export const useHeaderLogic = (): UseHeaderLogic => {
    const auth = useAppSelector((state: RootState) => state.user.isAuthenticated);
    const balance = useAppSelector((state: RootState) => state.balance);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBalanceByUser());
    }, [dispatch]);

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // Close user icon menu
    const handleSignUpClick = () => {
        dispatch(openModal({ type: 'REGISTER' }));
    }

    const handleLogOut = () => {
        setAnchorEl(null);
        dispatch(logout());
        sessionStorage.removeItem('token');
    };

    //Open menu user icon
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return {
        auth,
        anchorEl,
        balance,
        handleMenu,
        handleCloseMenu,
        handleSignUpClick,
        handleLogOut,
    };
};