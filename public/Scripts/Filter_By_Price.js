//Set min and max for input field
$('#Filter_By_Price_Min').attr('min', 600);
$('#Filter_By_Price_Min').attr('max', 1000);
$('#Filter_By_Price_Max').attr('min', 600);

// Placeholder text
$('#Filter_By_Price_Min').attr('placeholder', 'Min. 600');
$('#Filter_By_Price_Max').attr('placeholder', 'Max. 1500');


var Maximum_Value, Minimum_Value;

function shouldMarkerBeVisible(marker) {
    // Check type filter
    const typeMatches = !Last_Selected_Filter_Marker_By_Type_Selected || 
                       Last_Selected_Filter_Marker_By_Type_Selected.toLowerCase() === "both" ||
                       marker.properties.Billboard_Type.toLowerCase() === 
                       Last_Selected_Filter_Marker_By_Type_Selected.toLowerCase();
    
    // Check price filter (only if values are entered)
    let priceInRange = true;
    if ($("#Filter_By_Price_Min").val() || $("#Filter_By_Price_Max").val()) {
        const price = marker.properties.Price_Per_Month_1;
        priceInRange = price >= (Minimum_Value || 0) && 
                      price <= (Maximum_Value || Infinity);
    }
    
    return typeMatches && priceInRange;
}

function Filter_By_Price() {
  // Get current filter values
  Maximum_Value = $("#Filter_By_Price_Max").val();
  Minimum_Value = $("#Filter_By_Price_Min").val();

  // If both values are empty, just show markers based on current type filter
  if (!Minimum_Value && !Maximum_Value) {
    Filter_Marker_By_Type(Last_Selected_Filter_Marker_By_Type_Selected);
    return;
  }

  // Validate inputs (your existing code)
  if (Minimum_Value < 0 || Maximum_Value < 0) return;
  if (parseInt(Minimum_Value) > parseInt(Maximum_Value)) {
    Message_Box_Warning();
    $("#Array_Is_Empty_Text").text(
      "Minimum Value entered is larger than Maximum Value"
    );
    $("#Filter_By_Price_Max").val("");
    $("#Filter_By_Price_Min").val("");
    return;
  }

  // Apply BOTH price and existing type filters
  var features = placesSource._data.features;
  features.forEach((feature) => {
    const markerId = String(feature.properties.Marker_ID);
            const shouldBeVisible = shouldMarkerBeVisible(feature);

    const markerType = feature.properties.Billboard_Type.toLowerCase();
    const markerPrice = feature.properties.Price_Per_Month_1;

    // Check price filter
    const priceInRange =
      markerPrice >= (Minimum_Value || 0) &&
      markerPrice <= (Maximum_Value || Infinity);

    // Check current type filter
    const typeMatches =
      !Last_Selected_Filter_Marker_By_Type_Selected ||
      Last_Selected_Filter_Marker_By_Type_Selected.toLowerCase() === "both" ||
      markerType === Last_Selected_Filter_Marker_By_Type_Selected.toLowerCase();

    // Only show if matches BOTH filters
    if (priceInRange && typeMatches) {
      changeIconColorById(markerId, "First_Color_Icon");
    } else {
      changeIconColorById(markerId, "hide-icon");
    }
  });
}

// Displays singular hidden marker again
// changeIconColorById("1", 'First_Color_Icon')

// Allows Filter by price to be pressed via enter
$(document).on("keydown", function (e) {
  // Check if the Enter key is pressed
  if (e.key === "Enter" && $("#Filter_By_Price_Btn").is(":focus")) {
    // Execute the button click
    $("#Filter_By_Price_Btn").click();
  }
});

function Message_Box_Warning() {
  toggleElementsVisibility("", "Parent_Array_Is_Empty");

  Extra_Black_Translucent_Background.style.display =
    Extra_Black_Translucent_Background.style.display === "block"
      ? "none"
      : "block";
  setTimeout(() => {
    Extra_Black_Translucent_Background.style.display =
      Extra_Black_Translucent_Background.style.display === "block"
        ? "none"
        : "block";
    toggleElementsVisibility("Parent_Array_Is_Empty", "");
  }, 2500);
}

// Resets to show all markers
/*$("#Filter_By_Price_Min, #Filter_By_Price_Max").click(function () {
    log("min and max buttons clicked");
    Show_All_Markers();
});
*/

//Disables: . , - e +
$(document).ready(function () {
  $(".Filter_By_Price_Input").on("keydown", function (event) {
    if (
      event.key === "e" ||
      event.keyCode === 190 ||
      event.keyCode === 110 ||
      event.keyCode === 188 ||
      event.keyCode === 189 ||
      event.keyCode === 187
    ) {
      event.preventDefault();
    }
  });
});

