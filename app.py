from flask import Flask, Response, jsonify
import cv2
from detection import process_frame
from analytics import get_stats, update_stats

app = Flask(__name__)

camera = cv2.VideoCapture("parking.mp4")

def generate_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break

        frame, slot_data = process_frame(frame)
        update_stats(slot_data)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/stats')
def stats():
    return jsonify(get_stats())
from flask import jsonify
from analytics import get_stats

@app.route("/api/stats")
def api_stats():
    return jsonify(get_stats())


if __name__ == "__main__":
    app.run(debug=True)
