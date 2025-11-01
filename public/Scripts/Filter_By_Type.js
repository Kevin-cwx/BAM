var log = console.log;

var Number_Of_Markers;
var placesSource;
map.on("sourcedata", function (e) {
  if (e.isSourceLoaded && e.sourceId === "places") {
    // Get the 'places' source
    placesSource = map.getSource("places");

    // Check if the source exists
    if (placesSource) {
      // Get the length of the features array
      Number_Of_Markers = placesSource._data.features.length;

      // Log or use the Number_Of_Markers as needed
      // log('Number of markers:', Number_Of_Markers);
    } else {
      log('Source "places" not found');
    }
  }
});

var Last_Selected_Filter_Marker_By_Type_Selected;
var Billboard_Type_Text_To_Hide;
var Billboard_Type_Text_To_Show;

function Filter_Marker_By_Type(Type_Text) {
  Last_Selected_Filter_Marker_By_Type_Selected = Type_Text;

  // Update button states (your existing code)
  $(
    "#Billboard_Type_Digital, #Billboard_Type_Print, #Billboard_Type_Both"
  ).removeClass("Billboard_Type_Selected Billboard_Type_Not_Selected");

  if (Type_Text === "Both") {
    $(
      "#Billboard_Type_Print, #Billboard_Type_Digital, #Billboard_Type_Both"
    ).addClass("Billboard_Type_Selected");
  } else {
    var Billboard_Type_Text_To_Hide =
      Type_Text === "Print" ? "Digital" : "Print";
    $(
      "#Billboard_Type_" +
        Billboard_Type_Text_To_Hide +
        ", #Billboard_Type_Both"
    ).addClass("Billboard_Type_Not_Selected");
    $("#Billboard_Type_" + Type_Text).addClass("Billboard_Type_Selected");
  }

  // Apply BOTH type and existing price filters
  var features = placesSource._data.features;
  features.forEach((feature) => {
    const markerId = String(feature.properties.Marker_ID);
    const markerType = feature.properties.Billboard_Type.toLowerCase();
    const shouldBeVisible = shouldMarkerBeVisible(feature);

    const markerPrice = feature.properties.Price_Per_Month_1;

    // Check type filter
    const typeMatches =
      Type_Text === "Both" || markerType === Type_Text.toLowerCase();

    // Check existing price filter (if any)
    const priceInRange =
      (!Minimum_Value && !Maximum_Value) ||
      (markerPrice >= (Minimum_Value || 0) &&
        markerPrice <= (Maximum_Value || Infinity));

    // Only show if matches BOTH filters
    if (typeMatches && priceInRange) {
      changeIconColorById(markerId, "First_Color_Icon");
    } else {
      changeIconColorById(markerId, "hide-icon");
    }
  });
}

// log('Filtered Digital IDs To Hide:', Filtered_Digital_IDs_To_Hide);
// log('Filtered Digital IDs To Show:', Filtered_Digital_IDs_To_Show);

//Initialize by showing both
Filter_Marker_By_Type("Both");

// Displays singular hidden marker again
// changeIconColorById("1", 'First_Color_Icon')
