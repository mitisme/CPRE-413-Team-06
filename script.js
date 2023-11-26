document.addEventListener('DOMContentLoaded', function () {
    const getLocationButton = document.getElementById('get-location');
    const getIPButton = document.getElementById('get-ip');
    const locationDataDiv = document.getElementById('location-data');
    const ipDataDiv = document.getElementById('ip-data');

    getLocationButton.addEventListener('click', function () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Use OpenCage Geocoder API to get address
                const apiKey = '1dce474fdd5346eda8a730295ddf92e1'; // Replace with your actual OpenCage Geocoder API key
                const geocodingApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

                fetch(geocodingApiUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.results && data.results.length > 0) {
                            const address = data.results[0].formatted;
                            locationDataDiv.innerHTML = `Location Address: ${address}`;
                        } else {
                            locationDataDiv.innerHTML = 'Unable to retrieve address for the provided coordinates.';
                        }
                    })
                    .catch(error => {
                        locationDataDiv.innerHTML = `Error: ${error.message}`;
                    });
            }, function (error) {
                locationDataDiv.innerHTML = `Error: ${error.message}`;
            });
        } else {
            locationDataDiv.innerHTML = 'Geolocation is not available in your browser.';
        }
    });

    getIPButton.addEventListener('click', function () {
        // Use a simple HTTP request to get the user's IP address from an IP lookup service
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const ipAddress = data.ip;
                ipDataDiv.innerHTML = `Your IP Address: ${ipAddress}`;
            })
            .catch(error => {
                ipDataDiv.innerHTML = `Error: ${error.message}`;
            });
    });
});
