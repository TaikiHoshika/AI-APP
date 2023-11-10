import AppBar from "@mui/material/AppBar";
import Typography from '@mui/material/Typography';

import IconLogo from '@mui/icons-material/PsychologyRounded';

const Header = () => {
    return (
        <AppBar position="static">
            <div>
                <IconLogo />
                <Typography
                    variant="h6"
                    component="h2"
                >
                    AI-APP
                </Typography>
            </div>
        </AppBar>
    );
}

export default Header;