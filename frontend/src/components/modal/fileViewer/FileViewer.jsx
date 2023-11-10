import { createPortal } from "react-dom";
import Button from "@mui/material/Button";

import IconClose from "@mui/icons-material/CloseRounded";
import IconDownload from "@mui/icons-material/CloudDownloadRounded";
import IconAnalyse from "@mui/icons-material/ImageSearchRounded";

import style from "./FileViewer.module.scss"

const FileViewer = ({files, isAnalysed, isAnalysing, isOpen, onClose}) => {
    const handleDownload = () => {
        const a = document.createElement("a");
        a.download = files.prev.name;
        a.href = URL.createObjectURL(files.prev);
        a.click();
    }

    if(isOpen) {
        return createPortal((
            <div className={style.background}>
                <div className={style.container}>
                    <div className={style.file}>
                        {
                            isAnalysed ?
                            <div></div> :
                            <img src={URL.createObjectURL(files.prev)} alt={files.prev.name} />
                        }
                    </div>
                    <div className={style.content}>
                        <div className={style.label}>
                            <div className={style.line}>
                                <span className={style.name}>{files.prev.name}</span>
                                <span className={style.size}>{Math.floor(files.prev.size / 1000) + "kb"}</span>
                            </div>
                            <div className={style.line}>
                                <span>{isAnalysed}</span>
                            </div>
                        </div>
                        <div className={style.buttons}>
                            <div className={style.interact}>
                                <Button
                                    onClick={() => {}}
                                    disabled={isAnalysing}
                                    variant="contained"
                                    endIcon={<IconAnalyse />}
                                >
                                    解析
                                </Button>
                                <Button
                                    onClick={handleDownload}
                                    disabled={isAnalysing} 
                                    variant="contained"
                                    endIcon={<IconDownload />}
                                >
                                    ダウンロード
                                </Button>
                            </div>
                            <div className={style.close}>
                                <Button
                                    onClick={() => onClose()}
                                    variant="contained"
                                    endIcon={<IconClose />}
                                >
                                    閉じる
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ), document.getElementById("modal"))
    }
}

export default FileViewer;