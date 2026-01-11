import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FolderIcon from '@mui/icons-material/Folder';
import FlagIcon from '@mui/icons-material/Flag';
import { useNavigate } from 'react-router-dom';
import { TEXT } from '../../constants/textConstants';
import './Menu.scss';

function Menu() {
    const navigate = useNavigate();

    const menuItems = [
        {
            label: TEXT.MENU.DASHBOARD,
            icon: <DashboardIcon />,
            path: TEXT.ROUTES.DASHBOARD,
        },
        {
            label: TEXT.MENU.TRANSACTIONS,
            icon: <SwapHorizIcon />,
            path: TEXT.ROUTES.TRANSACTIONS,
        },
        {
            label: TEXT.MENU.CATEGORIES,
            icon: <FolderIcon />,
            path: TEXT.ROUTES.CATEGORIES,
        },
        {
            label: TEXT.MENU.GOALS,
            icon: <FlagIcon />,
            path: TEXT.ROUTES.GOALS,
        },
    ];

    return (
        <List className="menu dark">
            {menuItems.map((item) => (
                <ListItem
                    key={item.path}
                    onClick={() => navigate(item.path)}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                </ListItem>
            ))}
        </List>
    );
}

export default Menu;