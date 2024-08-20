import requests
import json

# Define the base URL for the API
BASE_URL = 'http://localhost:3000/api/parking-zones'

def create_parking_zone(name, size):
    url = BASE_URL
    data = {
        'name': name,
        'size': size
    }
    response = requests.post(url, json=data)
    return response.json()

def get_all_parking_zones():
    url = BASE_URL
    response = requests.get(url)
    return response.json()

def get_parking_zone_by_id(zone_id):
    url = f"{BASE_URL}/{zone_id}"
    response = requests.get(url)
    return response.json()

def update_parking_zone(zone_id, name, size):
    url = f"{BASE_URL}/{zone_id}"
    data = {
        'name': name,
        'size': size
    }
    response = requests.put(url, json=data)
    return response.json()

def delete_parking_zone(zone_id):
    url = f"{BASE_URL}/{zone_id}"
    response = requests.delete(url)
    return response.json()

def run_tests():
    print("Creating a parking zone...")
    create_response = create_parking_zone('Zone A', 200)
    print(json.dumps(create_response, indent=2))
    create_response = create_parking_zone('Zone B', 150)
    print(json.dumps(create_response, indent=2))
    create_response = create_parking_zone('Zone C', 100)
    print(json.dumps(create_response, indent=2))

    print("Getting all parking zones...")
    zones = get_all_parking_zones()
    print(json.dumps(zones, indent=2))

    if zones:
        first_zone_id = zones[0]['id']

        print(f"Getting parking zone by ID: {first_zone_id}...")
        single_zone = get_parking_zone_by_id(first_zone_id)
        print(json.dumps(single_zone, indent=2))

        # print(f"Updating parking zone ID {first_zone_id}...")
        # update_response = update_parking_zone(first_zone_id, 'Zone A Updated', 60)
        # print(json.dumps(update_response, indent=2))

        # print(f"Deleting parking zone ID {first_zone_id}...")
        # delete_response = delete_parking_zone(first_zone_id)
        # print(json.dumps(delete_response, indent=2))

    print("Final list of parking zones...")
    final_zones = get_all_parking_zones()
    print(json.dumps(final_zones, indent=2))

if __name__ == "__main__":
    run_tests()
