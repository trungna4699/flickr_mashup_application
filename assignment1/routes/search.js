const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET search query */
router.get('/flickrapi', (req, res) => {
  const query = req.query; 
  const res_num = 50;           //Number of Flickr img results
  const options = createFlickrOptions(query['query'], res_num);  

  const FLICKR_ENDPOINT = `https://${options.hostname}${options.path}`;

  axios.get(FLICKR_ENDPOINT)
    .then( (response) => {
        const rsp = response.data;
        res.json({ rsp });      //Send JSON reponse with data received from Flickr
    })
    .catch((error) => {
        console.error(error);
    })
});

const flickr = {
  method: 'flickr.photos.search',
  api_key: "399b9818011b23916afee930abc81575",
  format: "json",
  media: "photos",
  nojsoncallback: 1
};

function createFlickrOptions(query,number) {
  const options = {
      hostname: 'api.flickr.com',
      port: 443,
      path: '/services/rest/?',
      method: 'GET'
  }

  const str = 'method=' + flickr.method +
          '&api_key=' + flickr.api_key +
          '&tags=' + query +
          '&per_page=' + number +
          '&format=' + flickr.format +
          '&media=' + flickr.media +
          '&nojsoncallback=' + flickr.nojsoncallback;
  options.path += str;
  return options;
}

module.exports = router;
