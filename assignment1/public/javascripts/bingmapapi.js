var map, searchManager, rsp;

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'AlCoXNURi0udkBEelafGQ8SLkV3-X_fFISNBM8u6_xn3XocyXs7vIBMYcC5_1R5b' // BingMapAPI key
    });
}

function SearchLocation() {
    if (!searchManager) {
        //Create an instance of the search manager and perform the search.
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
            SearchLocation()
        });
    } else {
        //Remove any previous results from the map.
        map.entities.clear();

        //Get the users query and geocode it.
        var query = document.getElementById('searchTbx').value;
        geocodeQuery(query);        
    }
}

function geocodeQuery(query) {
    var searchRequest = {
        where: query,
        callback: function (r) {
            if (r && r.results && r.results.length > 0) {    //If the target location is found
                
                //Get location images from FlickrAPI
                getFlickerImg();

                //Process the location results and put on the map
                var pin, pins = [], locs = [];

                for (var i = 0; i < r.results.length; i++) {
                    //Create a pushpin for each result. 
                    pin = new Microsoft.Maps.Pushpin(r.results[i].location, {
                        icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
                        anchor: new Microsoft.Maps.Point(12, 39),
                        text: i + 1 + '',
                        textOffset: new Microsoft.Maps.Point(0, 5)
                    });                    
                    pins.push(pin);
                    locs.push(r.results[i].location);
                }

                //Add the pins to the map
                map.entities.push(pins);

                //Determine a bounding box to best view the results.
                var bounds;

                if (r.results.length == 1) {
                    bounds = r.results[0].bestView;
                } else {
                    //Use the locations from the results to calculate a bounding box.
                    bounds = Microsoft.Maps.LocationRect.fromLocations(locs);
                }

                map.setView({ bounds: bounds });

                //Reset the search box
                document.getElementById('searchTbx').value=null;
            }
        },
        errorCallback: function (e) {
            //If there is an error, alert the user about it.
            alert("The location is invalid!!!");
            document.getElementById('searchTbx').value=null;
        }
    };

    //Make the geocode request.
    searchManager.geocode(searchRequest);
}