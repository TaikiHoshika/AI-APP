import IconUpload from "@mui/icons-material/CollectionsRounded";

import style from "./Uploader.module.scss"

const Uploader = ({onFileUpload}) => {

    const onDragOver = (e) => {
        e.preventDefault();
    }
    const onDragLeave = (e) => {
        e.preventDefault();
    }
    const onDrop = (e) => {
        e.preventDefault();

        const files = Array.from(e.dataTransfer.files);
        onFileUpload(files);
    }

    return (
        <div className={style.container}>
            <div
                className={style.uploader}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
                style={{
                }}
            >
                <IconUpload />
                <span>Drag & Drop Pictures Here</span>
            </div>
        </div>
    );
}

export default Uploader;