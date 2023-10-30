import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import IconImgNotExist from "@mui/icons-material/ImageNotSupportedOutlined";
import IconArrowRight from "@mui/icons-material/NavigateNextOutlined";
import IconUpload from "@mui/icons-material/FileUploadRounded";
import IconDownload from "@mui/icons-material/DownloadRounded";

import style from "./ImageRecog.module.scss";

const ImageRecog = () => {
    const [file, setFile] = useState(null);
    const [resultFile, setResultFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUploadFile = (event) => {
        const files = event.target.files;
        if(files.length <= 0) { return; }
        const file = files[0]

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setFile(fileReader.result);
        }
    }

    const handleRecogImage = async () => {
        if(file == null) { return; }
        setIsProcessing(true);
        await axios.post(
            "http://localhost:8000/recog",
            {"image": file.split(",")[1]}
        ).then((response) => {
            setResultFile(response.data.image);
        }).catch((error) => {
            console.log(error);
        })
        setIsProcessing(false);
    }

    return (
        <div className={style.container}>
            <div className={style.imgContainer}>
                <div className={style.imgBox}>
                    <div className={style.img}>
                        {file == null ? <IconImgNotExist /> : <img src={file} />}
                    </div>
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<IconUpload />}
                    >
                        アップロード
                        <input
                            accept="image/*"
                            type="file"
                            name="inputImg"
                            id="uploadImgInput"
                            style={{
                                display: "none"
                            }}
                            onChange={handleUploadFile}
                        />
                    </Button>
                </div>
                <div>
                    <Button
                        variant="contained"
                        disabled={file == null || isProcessing == true}
                        endIcon={<IconArrowRight />}
                        onClick={handleRecogImage}
                    >
                        解析
                    </Button>
                </div>
                <div className={style.imgBox}>
                    <div className={style.img}>
                        {file == null ? <IconImgNotExist /> : <img src={resultFile} />}
                    </div>
                    <Button component="label" variant="contained" disabled startIcon={<IconDownload />}>
                        ダウンロード
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ImageRecog;