const { hostname, protocol } = window.location;

// TODO: Use Geolocation API to get latitude / longitude
export const GET_CURRENT_WEATHER = `${protocol}//${hostname}:8000/weather/47.608013/-122.335167`;
