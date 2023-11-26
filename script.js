document.addEventListener('DOMContentLoaded', function () {
    const getLocationButton = document.getElementById('get-location');
    const getIPButton = document.getElementById('get-ip');
    const getUserAgentButton = document.getElementById('get-user-agent');
    const trackActionButton = document.getElementById('track-action');
    const locationDataDiv = document.getElementById('location-data');
    const ipDataDiv = document.getElementById('ip-data');
    const userAgentDataDiv = document.getElementById('user-agent-data');
    const usageDataDiv = document.getElementById('usage-data');
    const browserDataDiv = document.getElementById('browser-data');

    // Get Location
    getLocationButton.addEventListener('click', function () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Use OpenCage Geocoder API to get address
                const apiKey = '1dce474fdd5346eda8a730295ddf92e1'; // Replace with your actual Geocoder API key
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

    // Get IP Information
    getIPButton.addEventListener('click', function () {
        // Use the IPinfo API to get more information about the user's IP address
        fetch('https://ipinfo.io/json')
            .then(response => response.json())
            .then(data => {
                const ipAddress = data.ip;
                const hostname = data.hostname;
                const city = data.city;
                const region = data.region;
                const country = data.country;
                const isp = data.org;

                ipDataDiv.innerHTML = `
                    IP Address: ${ipAddress}<br>
                    Hostname: ${hostname}<br>
                    City: ${city}<br>
                    Region: ${region}<br>
                    Country: ${country}<br>
                    ISP: ${isp}
                `;
            })
            .catch(error => {
                ipDataDiv.innerHTML = `Error: ${error.message}`;
            });
    });

    // Get User-Agent
    getUserAgentButton.addEventListener('click', function () {
        const userAgent = navigator.userAgent;
        userAgentDataDiv.innerHTML = `User-Agent: ${userAgent}`;
    });

    // Get Browser Data
    const browserData = navigator.userAgent;
    browserDataDiv.innerHTML = `Browser Data: ${browserData}`;

    // Track Action (a simple example of tracking a button click)
    let clickCount = 0;
    trackActionButton.addEventListener('click', function () {
        clickCount++;
        usageDataDiv.innerHTML = `Button Clicks: ${clickCount}`;
    });
});
