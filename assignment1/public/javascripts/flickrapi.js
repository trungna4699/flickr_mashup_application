function getFlickerImg() {
    var searchTarget = document.getElementById('searchTbx').value;

    fetch('/search/flickrapi?query=' + searchTarget)
        .then((res) => res.json())
        .then((data) => {
            //Retrieved data from FlickerAPI
            const rsp = data.rsp;

            //Set description above the image result box
            const searchedLocation = document.getElementById('searched-location');
            elementReset(searchedLocation);
            searchedLocation.innerHTML = 'Search results of <span id="location-name">" ' + searchTarget + ' "</span> : ';

            //Process the retrieved data and put on the webpage
            const resultList = document.getElementById('result-list');
            elementReset(resultList);
            for (let i = 0; i < rsp.photos.photo.length; i++) {
                photo = rsp.photos.photo[i];
                t_url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`;
                p_url = `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;                
                const item = document.createElement('a');
                item.setAttribute('href', p_url);
                const img = document.createElement('img');
                img.setAttribute('alt', photo.title);
                img.setAttribute('src', t_url);
                item.appendChild(img);
                resultList.appendChild(item);
            }
        })
        .catch((error) => console.log(error));
}

function elementReset(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}