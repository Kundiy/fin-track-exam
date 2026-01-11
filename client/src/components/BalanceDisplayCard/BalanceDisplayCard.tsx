import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

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
}));

type BalanceDisplayCardProps = {
    icon: ReactNode;
    title: string;
    value: string | number;
    displayColor?: string;
    prefix?: string;
    suffix?: string;
};

export default function BalanceDisplayCard({
    icon,
    title,
    value,
    displayColor = '#4CAF50',
    prefix = '$',
    suffix = ''
}: BalanceDisplayCardProps) {
    const formattedValue = Number(value).toFixed(2);

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
                    <Stack>
                        <Item>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {title}
                            </Typography>
                        </Item>
                        <Item sx={{ fontSize: '24px', fontWeight: 'bold', color: displayColor }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                                {prefix}{formattedValue}{suffix}
                            </Typography>
                        </Item>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
