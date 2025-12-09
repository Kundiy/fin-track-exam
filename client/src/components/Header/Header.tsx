import Button from '@mui/material/Button';
import {AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {Person as PersonIcon, AccountBalanceWallet} from '@mui/icons-material';
import './Header.scss';
import {useHeaderLogic} from "../../hooks/useHeaderLogic.ts";

function Header() {
    const {
        auth,
        anchorEl,
        totalBalance,
        handleMenu,
        handleClose,
        handleSignUp
    } = useHeaderLogic();

    // Not authorized user
    const renderAuthButtons = () => (
        <Box sx={{display: 'flex', gap: 1}}>
            <Button
                variant="contained"
                onClick={handleSignUp}
                sx={{
                    backgroundColor: '#4CAF50',
                    '&:hover': {
                        backgroundColor: '#2e7d32',
                        boxShadow: 6,
                    },
            }}
            >
                Sign Up
            </Button>
            <Button
                variant="outlined" color="inherit"
                onClick={handleSignUp}
                startIcon={<PersonIcon/>}
                sx={{
                    '&:hover': {
                        backgroundColor: '#2e7d32',
                        boxShadow: 6,
                    },
                }}
            >
                Log In
            </Button>
        </Box>
    );

    // Authorized user
    const renderUserActions = () => (
        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
            <Button
                variant="contained"
                onClick={handleSignUp}
                sx={{
                    backgroundColor: '#4CAF50',
                    fontWeight: 600,
                    '&:hover': {
                        backgroundColor: '#2e7d32',
                        boxShadow: 6,
                    },
                }}
            >
                Add Transaction
            </Button>
            <IconButton onClick={handleMenu}>
                <Avatar sx={{width: 32, height: 32}}><PersonIcon/></Avatar>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClick={handleClose}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Exit</MenuItem>
            </Menu>
        </Box>
    );

    return (
        <Box sx={{flexGrow: 2}}>
            <AppBar
                position="static"
                sx=
                    {{
                        backgroundColor: !auth ? '#243D59' : '#FDFDFD',
                        padding: '10px 0',
                        borderRadius: '10px',
                    }}
            >
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'stretch', gap: 3}}>
                        <Typography
                            variant="h5"
                            sx={auth ? {fontWeight: 700, color: '#424242'} : {fontWeight: 600}}>
                            <span><AccountBalanceWallet sx={{marginRight: 0.5, marginBottom: -1.1, fontSize: 35}}/>
                                {'FinTrack'}
                            </span>
                        </Typography>

                        {auth && (
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    marginTop: 0.3,
                                    marginLeft: '80px',
                                    color: '#424242'
                            }}>
                                <span>{'Total Balance: '}</span>
                                ${totalBalance.toLocaleString()}
                            </Typography>
                        )}
                    </Box>

                    {auth ? renderUserActions() : renderAuthButtons()}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;