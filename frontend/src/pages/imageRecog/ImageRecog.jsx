import { useState } from "react";
//import axios from "axios";

import style from "./ImageRecog.module.scss";
import Uploader from "../../components/uploader/Uploader";
import Controller from "../../components/controller/Controller";
import FileContainer from "../../components/fileContainer/FileContainer";

const ImageRecog = () => {
    const [files, setFiles] = useState([]);

    const handleOnRemove = (index) => {
        const newFiles = files.concat();
        newFiles.splice(index, 1);
        setFiles(newFiles);
    }

    /*
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
    */

    const handleOnFileUpload = (files) => {
        const newFiles = [];
        files.forEach((file) => {
            newFiles.push({
                isAnalysed: false,
                files: {
                    prev: file,
                    result: null
                }
            })
        })
        setFiles(newFiles);
    }

    const handleOnAnalysed = () => {
        const newFiles = files.map((file) => {
            file.isAnalysed = true;
            return file;
        })
        setFiles(newFiles);
    }

    return (
        <div className={style.container}>
            <Uploader onFileUpload={handleOnFileUpload}/>
            {
                files.map((file, index) => {
                    return (
                        <FileContainer
                            files={file}
                            isAnalysed={file.isAnalysed}
                            index={index}
                            onRemove={handleOnRemove}
                            key={index}
                        />
                    );
                })
            }
            <Controller onAnalysed={handleOnAnalysed} />
        </div>
    );
}

export default ImageRecog;