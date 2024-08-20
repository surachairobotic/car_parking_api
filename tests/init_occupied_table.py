import requests
from datetime import datetime

# Base URL of the Node.js API
API_BASE_URL = 'http://localhost:3000/api'  # Replace with your actual API URL

# Fetch all parking zones
def fetch_parking_zones():
    response = requests.get(f'{API_BASE_URL}/parking-zones')
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch parking zones: {response.status_code}")
        return []

# Initialize occupied lots for each parking zone
def initialize_occupied_lots(parking_zones):
    for zone in parking_zones:
        data = {
            'park_id': zone['id'],
            'num_occupied': 0,
            'gate_event_id': 0,  # Assuming this is set to None initially
            'timestamp': datetime.now().isoformat()       # Can be set to the current time or left as None
        }
        response = requests.post(f'{API_BASE_URL}/occupied-lots', json=data)
        if response.status_code == 201:
            print(f"Initialized occupied lot for zone {zone['name']} (ID: {zone['id']})")
        else:
            print(f"Failed to initialize occupied lot for zone {zone['name']} (ID: {zone['id']})")
            print(data)
            print(response.content)

def main():
    parking_zones = fetch_parking_zones()
    if parking_zones:
        initialize_occupied_lots(parking_zones)
    else:
        print("No parking zones found.")

if __name__ == "__main__":
    main()
