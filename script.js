document.addEventListener('DOMContentLoaded', function () {
    const getLocationButton = document.getElementById('get-location');
    const getIPButton = document.getElementById('get-ip');
    const getUserAgentButton = document.getElementById('get-user-agent');
    const trackActionButton = document.getElementById('track-action');
    const dataDiv = document.getElementById('data');

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
                            dataDiv.innerHTML += `Location Address: ${address}<br>`;
                        } else {
                            dataDiv.innerHTML += 'Unable to retrieve address for the provided coordinates.<br>';
                        }
                    })
                    .catch(error => {
                        dataDiv.innerHTML += `Error: ${error.message}<br>`;
                    });
            }, function (error) {
                dataDiv.innerHTML += `Error: ${error.message}<br>`;
            });
        } else {
            dataDiv.innerHTML += 'Geolocation is not available in your browser.<br>';
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

                dataDiv.innerHTML += `
                    IP Address: ${ipAddress}<br>
                    Hostname: ${hostname}<br>
                    City: ${city}<br>
                    Region: ${region}<br>
                    Country: ${country}<br>
                    ISP: ${isp}<br>
                `;
            })
            .catch(error => {
                dataDiv.innerHTML += `Error: ${error.message}<br>`;
            });
    });

    // Get User-Agent
    getUserAgentButton.addEventListener('click', function () {
        const userAgent = navigator.userAgent;
        dataDiv.innerHTML += `User-Agent: ${userAgent}<br>`;
    });

    // Track Action (a simple example of tracking a button click)
    let clickCount = 0;
    trackActionButton.addEventListener('click', function () {
        clickCount++;
        dataDiv.innerHTML += `Button Clicks: ${clickCount}<br>`;
    });
});
