import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import FileViewer from "../modal/fileViewer/FileViewer";

import IconButton from "@mui/material/IconButton";
import IconClose from "@mui/icons-material/DeleteRounded";

import style from "./FileContainer.module.scss";

const FileContainer = ({files, index, onRemove, isAnalysed}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isAnalysing, setIsAnalysing] = useState(true);

    const handleAnalyse = () => {
        setIsAnalysing(true);
        setIsAnalysing(false);
    }

    return (
        <div className={style.container}>
            <FileViewer
                files={files.files}
                isAnalysed={isAnalysed}
                isAnalysing={isAnalysing}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <button onClick={() => setIsOpen(true)}>
                <div className={style.thumbnail}>
                    {
                        isAnalysing ?
                        (<div className={style.analysing}>
                            <CircularProgress />
                        </div>) :
                        (null)
                    }
                    <img src={URL.createObjectURL(files.files.prev)} alt={files.files.prev.name} />
                </div>
                <div className={style.label}>
                    <div className={style.line}>
                        <span className={style.name}>{files.files.prev.name}</span>
                        <span className={style.size}>{Math.floor(files.files.prev.size / 1000) + "kb"}</span>
                    </div>
                    <div className={style.line}>
                        <span>
                            {isAnalysing ? "解析中" : isAnalysed ? "解析完了" : "未解析"}
                        </span>
                    </div>
                </div>
            </button>
            <div className={style.button}>
                <IconButton onClick={() => onRemove(index)}>
                    <IconClose />
                </IconButton>
            </div>
        </div>
    )
};

export default FileContainer;