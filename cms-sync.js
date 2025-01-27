const apiKey = '3bae73b75bc9ed1a058ff5cc03eaf8a295feb1c370f0e041350c600d35bf8007';  // Replace with your Webflow API key
const siteId = '5abebcf1b3e0cb4bb9718bba';  // Replace with your Webflow site ID

// URL for getting site details from Webflow API
const url = `https://api.webflow.com/v2/sites/${siteId}/collections`;

// Making the request to Webflow API
fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'accept-version': '1.0.0'  // Specify the API version you are working with
  }
})
  .then(response => response.json())
  .then(data => {
    console.log('Site Data:', data);
  })
  .catch(error => {
    console.error('Error fetching Webflow API:', error);
  });
