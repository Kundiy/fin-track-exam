import { useState } from 'react';

export type IUseHeaderLogic = {
    auth: boolean;
    anchorEl: HTMLElement | null;
    totalBalance: number;
    handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
    handleClose: () => void;
    handleSignUp: () => void;
}

export const useHeaderLogic = (): IUseHeaderLogic => {
    const [auth, setAuth] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const totalBalance = 12500;

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAuth(false);
    };

    const handleSignUp = () => {
        console.log('Sing up logic triggered');
        setAuth(true);
    }

    // Logout logic, check auth ...

    return {
        auth,
        anchorEl,
        totalBalance,
        handleMenu,
        handleClose,
        handleSignUp,
    };
};