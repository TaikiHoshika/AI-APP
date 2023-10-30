import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ImageRecog from "./pages/imageRecog/ImageRecog";

const App = () => {
    const [index, setIndex] = useState(0);
    const handleChange = (event, newValue) => {
        setIndex(newValue);
    }

    const pageComponents = [
        <ImageRecog />,
        <div>a</div>
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Tabs
                    value={index}
                    onChange={handleChange}
                    indicatorColor="inherit"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="画像認識" />
                    <Tab label="その他" />
                </Tabs>
            </AppBar>
            <div>
                {pageComponents[index]}
            </div>
      </Box>
    );
}

export default App;