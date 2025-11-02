var My_API_Key = "yntnZOtHg5Ciw3VpKFi1";
maptilersdk.config.apiKey = My_API_Key;
var map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.STREETS,
  // True center is set in Browse_Areas.js
  center: [-60.988363, 14.008268],
  zoom: 11.15, // 11.15
  navigationControl: "top-left",
  geolocateControl: "top-left",
  MaptilerNavigationControl: "top-left",
  visualizePitch: true,
});

map.loadImage(
  "../Media/Marker/Default_Marker.png",
  function (error, First_Marker_Image) {
    map.addImage("First_Color_Icon", First_Marker_Image);
  }
);

map.loadImage(
  "../Media/Marker/Clicked_Marker.png",
  function (error, Second_Marker_Image) {
    map.addImage("Second_Color_Icon", Second_Marker_Image);
  }
);

var Max_Price_Per_Month, Min_Price_Per_Month;

// Order Price_Per_Month -> Asc
// Note: Filter by Price uses Price_Per_Month_1
map.on("load", function () {
  map.addSource("places", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: Map_Data,
    },
  });

  // Max and Min price from actual Map Data
  var features = map.getSource("places")._data.features;
  var prices = features.map((feature) => feature.properties.Price_Per_Month_1);
  Max_Price_Per_Month = Math.max(...prices);
  Min_Price_Per_Month = Math.min(...prices);

  // console.log('!@!@ - Max_Price_Per_Month:', Max_Price_Per_Month +" \nMin_Price_Per_Month:', Min_Price_Per_Month");

  // Add a layer showing the places.
  map.addLayer({
    id: "places",
    type: "symbol",
    source: "places",
    layout: {
      "icon-image": ["get", "icon-color"],
      "icon-size": 0.1,
      // Original size 0.1
      "icon-allow-overlap": true,
    },
  });

  map.on("click", "places", function (e) {
    log("In Map.js clicked");

    var targetMarkerID = e.features[0].properties["Marker_ID"];
    log("targetMarkerID: " + targetMarkerID);
    var features = map.getSource("places")._data.features;

    map.getSource("places").setData(map.getSource("places")._data);

    var {
      Marker_ID,
      Owner_ID,
      Billboard_Location,
      Billboard_Type,
      View_Count,
      View_Density,
      Minimum_Rental_Period,
      Description,
      Night_Time_Illumination,
      Price_Per_Month_1,
      Price_Per_Month_2,
      Price_Per_Month_3,
      Price_Per_Month_4,
      PPM_1_Description,
      PPM_2_Description,
      PPM_3_Description,
      PPM_4_Description,
    } = e.features[0].properties;

    var coordinates = e.features[0].geometry.coordinates.slice();

    Marker_Clicked(
      coordinates,
      Marker_ID,
      Owner_ID,
      Billboard_Location,
      Billboard_Type,
      View_Count,
      View_Density,
      Minimum_Rental_Period,
      Description,
      Night_Time_Illumination,
      Price_Per_Month_1,
      Price_Per_Month_2,
      Price_Per_Month_3,
      Price_Per_Month_4,
      PPM_1_Description,
      PPM_2_Description,
      PPM_3_Description,
      PPM_4_Description
    );
    changeIconColorById(String(targetMarkerID), "Second_Color_Icon");
  });

  // Change the cursor to a pointer when the mouse is over the places layer
  map.on("mouseenter", "places", function () {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "places", function () {
    map.getCanvas().style.cursor = "";
  });
});

//Removes Map Tiler logo
$(".maplibregl-ctrl-bottom-left").remove();

//Removes Map Tiler Reference
$(".maplibregl-ctrl-attrib-inner").remove();

//Removes Map Tiler Compass
$(window).on('load', function () {
  setTimeout(function () {
    $('.maplibregl-ctrl-compass').remove();
  }, 1000);
});

function changeIconColorById(Marker_ID, newIconColor) {
  var features = map.getSource('places')._data.features;
  var found = false;

  for (var i = 0; i < features.length; i++) {
    var currentFeature = features[i];
    if (currentFeature.properties.Marker_ID === Marker_ID) {
      currentFeature.properties['icon-color'] = newIconColor;
      found = true;
      break;
    }
  }

  if (found) {
    map.getSource('places').setData(map.getSource('places')._data);
  }
}

function Has_Multiple_Prices_Per_Month(markerId) {
  // Get the GeoJSON source data
  var sourceData = map.getSource("places")._data;

  // Find the feature with the given Marker_ID
  var feature = sourceData.features.find(function (f) {
    return f.properties.Marker_ID === markerId;
  });

  // Check if the feature exists and has multiple 'Price_Per_Month' properties
  if (feature) {
    var priceProperties = Object.keys(feature.properties)
      .filter((key) => key.startsWith("Price_Per_Month_"))
      .map((key) => feature.properties[key]);

    var pricePropertiesCount = priceProperties.length;

    return {
      Does_This_Marker_Have_Multiple_Prices: pricePropertiesCount > 1,
      allPrices: priceProperties,
    };
  }

  return {
    Does_This_Marker_Have_Multiple_Prices: false,
    allPrices: [],
  };
}

//

function Get_Marker_IDs_And_Coordinates() {
  var markerIDs = [];
  var duplicateIDs = [];
  var seenIDs = {}; // Object to store seen IDs
  var duplicateCoordinates = [];
  var seenCoordinates = {}; // Object to store seen coordinates

  for (var i = 0; i < Map_Data.length; i++) {
    var currentID = Map_Data[i].properties.Marker_ID;
    var currentCoordinates = Map_Data[i].geometry.coordinates.join(",");

    // Check for duplicate Marker IDs
    if (seenIDs[currentID]) {
      duplicateIDs.push(currentID); // Add duplicate to duplicateIDs array
    } else {
      seenIDs[currentID] = true; // Mark currentID as seen
    }

    // Check for duplicate Coordinates
    if (seenCoordinates[currentCoordinates]) {
      duplicateCoordinates.push(currentCoordinates); // Add duplicate to duplicateCoordinates array
    } else {
      seenCoordinates[currentCoordinates] = true; // Mark currentCoordinates as seen
    }

    markerIDs.push(currentID); // Add currentID to markerIDs array
  }

  // Sort the Marker IDs in ascending order
  markerIDs.sort(function (a, b) {
    return a - b;
  });

  // Log the results
  console.log("All Marker IDs:", markerIDs);
  console.log("Duplicate Marker IDs:", duplicateIDs);
  console.log("Duplicate Coordinates:", duplicateCoordinates);
}
