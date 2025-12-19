import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
    boxShadow: 'none',
    fontSize: 20,
}));

type BalanceCardProps = {
    icon: JSX.Element;
    title: string;
    balance: string;
}

export default function BalanceCard({ icon, title, balance }: BalanceCardProps) {
    const isExpense = title.toLowerCase().includes('expense');
    const displayColor = isExpense ? '#f44336' : '#4CAF50';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid size={4}>
                    <Item sx={{
                        height: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {icon}
                    </Item>
                </Grid>
                <Grid size={8}>
                    <Stack >
                        <Item>{title}</Item>
                        <Item sx={{fontSize: '30px', fontWeight: 'bold', color: displayColor,}}>
                            {Number(balance).toFixed(2)}
                        </Item>
                    </Stack>
                </Grid>

            </Grid>
        </Box>
    );
}
