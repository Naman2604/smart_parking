import cv2
import random


car_cascade = cv2.CascadeClassifier("haarcascade_car.xml")

def process_frame(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    
    cars = car_cascade.detectMultiScale(gray, 1.1, 2)

    slot_data = []

    for (x, y, w, h) in cars:
        
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0,255,0), 2)

        
        slot_data.append(1)

    
    total_slots = 10
    while len(slot_data) < total_slots:
        slot_data.append(0)

    return frame, slot_data
