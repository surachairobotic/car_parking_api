import requests
import json

# Define the base URL for the API
BASE_URL = 'http://localhost:3000/api/gate-events'

def create_gate_event(event_data):
    url = BASE_URL
    response = requests.post(url, json=event_data)
    return response.json()

def get_all_gate_events():
    url = BASE_URL
    response = requests.get(url)
    return response.json()

def get_gate_event_by_id(event_id):
    url = f"{BASE_URL}/{event_id}"
    response = requests.get(url)
    return response.json()

def update_gate_event(event_id, event_data):
    url = f"{BASE_URL}/{event_id}"
    response = requests.put(url, json=event_data)
    return response.json()

def delete_gate_event(event_id):
    url = f"{BASE_URL}/{event_id}"
    response = requests.delete(url)
    return response.json()

def run_tests():
    print("Creating a gate event...")
    event_data = {
        'server_time': '2024-08-20T12:00:00',
        'gate': 'Gate 1',
        'event': 'Entry',
        'vehicle_type': 'Car',
        'media_link': 'http://example.com/media',
        'timestamp': '2024-08-20T12:00:00'
    }
    create_response = create_gate_event(event_data)
    print(json.dumps(create_response, indent=2))

    print("Getting all gate events...")
    events = get_all_gate_events()
    print(json.dumps(events, indent=2))

    if events:
        first_event_id = events[0]['id']

        print(f"Getting gate event by ID: {first_event_id}...")
        single_event = get_gate_event_by_id(first_event_id)
        print(json.dumps(single_event, indent=2))

        print(f"Updating gate event ID {first_event_id}...")
        updated_data = {
            'server_time': '2024-08-20T13:00:00',
            'gate': 'Gate 2',
            'event': 'Exit',
            'vehicle_type': 'Truck',
            'media_link': 'http://example.com/media-updated',
            'timestamp': '2024-08-20T13:00:00'
        }
        update_response = update_gate_event(first_event_id, updated_data)
        print(json.dumps(update_response, indent=2))

        print(f"Deleting gate event ID {first_event_id}...")
        delete_response = delete_gate_event(first_event_id)
        print(json.dumps(delete_response, indent=2))

    print("Final list of gate events...")
    final_events = get_all_gate_events()
    print(json.dumps(final_events, indent=2))

if __name__ == "__main__":
    run_tests()
