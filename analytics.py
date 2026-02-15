stats = {
    "total": 10,
    "occupied": 0,
    "available": 10,
    "occupancy": 0
}

def update_stats(slot_data):
    occupied = sum(slot_data)
    total = len(slot_data)
    available = total - occupied
    occupancy = round((occupied/total)*100, 1)

    stats["total"] = total
    stats["occupied"] = occupied
    stats["available"] = available
    stats["occupancy"] = occupancy

def get_stats():
    return stats
