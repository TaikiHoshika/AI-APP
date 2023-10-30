from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ultralytics import YOLO
import cv2
import numpy
import base64

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("./models/yolov8n.pt")
colors = {
    0: (255, 0, 0),
    5: (0, 0, 255),
}

class Img(BaseModel):
    image: str

@app.post("/recog")
async def recogImg(value: Img):
    imgBinary = base64.b64decode(value.image)
    img = numpy.frombuffer(imgBinary, dtype=numpy.uint8)
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)
    
    results = model(img)
    h, w, c = img.shape

    for result in results:
        boxes = result.boxes.xyxyn
        confs = result.boxes.conf
        ids   = result.boxes.cls

        for conf, box, id in zip(confs, boxes, ids):
            # if float(conf) >= 0.8:
            start = (int(box[0] * w), int(box[1] * h))
            end = (int(box[2] * w), int(box[3] * h))
            cv2.rectangle(img, start, end, colors[int(id)], 2)
            cv2.putText(
                img,
                result.names[int(id)],
                (end[0] - 12 * len(result.names[int(id)]), start[1] - 5),
                cv2.FONT_HERSHEY_PLAIN,
                1.2,
                colors[int(id)]
            )

    _, encoded = cv2.imencode(".jpeg", img)
    imgStr = base64.b64encode(encoded).decode("ascii")
    return {"image": f"data:image/jpeg;base64,{imgStr}"}