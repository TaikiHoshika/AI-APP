
import Button from "@mui/material/Button";

import IconDownload from "@mui/icons-material/CloudDownloadRounded";
import IconAnalyse from "@mui/icons-material/ImageSearchRounded";

import style from "./Controller.module.scss";

const Controller = ({onAnalysed}) => {

    return (
        <div className={style.container}>
            <Button variant="contained" onClick={() => onAnalysed()} endIcon={<IconAnalyse />}>
                解析
            </Button>
            <Button variant="contained" endIcon={<IconDownload />}>
                ダウンロード
            </Button>
        </div>
    );
}

export default Controller;