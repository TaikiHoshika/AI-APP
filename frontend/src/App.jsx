import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import style from "./App.module.scss";

import ImageRecog from "./pages/imageRecog/ImageRecog";
import Uploader from "./components/uploader/Uploader";

const App = () => {
    const [index, setIndex] = useState(0);
    const handleChange = (event, newValue) => {
        setIndex(newValue);
    }

    const pageComponents = [
        <ImageRecog />,
        <Uploader />
    ];

    return (
        <div className={style.container} id="modal">
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
      </div>
    );
}

export default App;