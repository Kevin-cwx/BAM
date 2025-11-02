var log = console.log;
// Disables console log
// console.log = function() {}

function Change_Zoom(newZoomLevel) {
  map.setZoom(newZoomLevel);
}

function toggleElementsVisibility(hideClassName, showClassName) {
  var hideContainers = document.getElementsByClassName(hideClassName);
  var showContainers = document.getElementsByClassName(showClassName);

  // Hide elements with the specified class name
  for (var i = 0; i < hideContainers.length; i++) {
    var hideContainer = hideContainers[i];
    var hideChildElements = hideContainer.children;

    for (var j = 0; j < hideChildElements.length; j++) {
      hideChildElements[j].style.display = 'none';
    }
  }

  // Show elements with the specified class name
  for (var k = 0; k < showContainers.length; k++) {
    var showContainer = showContainers[k];
    var showChildElements = showContainer.children;

    for (var l = 0; l < showChildElements.length; l++) {
      showChildElements[l].style.display = 'block';
    }
  }
}

function Redirect_To_LandingPage() {
  window.open("../Screens/Landing_Page.html", "_self");
}

function Show_All_Markers() {
  placesSource._data.features.forEach((feature) => {
    var markerID = feature.properties.Marker_ID;
    changeIconColorById(String(markerID), 'First_Color_Icon');
  });


  //Filter_Marker_By_Type("Both");

  Filter_Marker_By_Type(Last_Selected_Filter_Marker_By_Type_Selected);
  log("in  show all markers - current type: " + Last_Selected_Filter_Marker_By_Type_Selected)
}

var PDF_Current_Date;
function Get_Current_Date() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var monthIndex = currentDate.getMonth();
  var year = currentDate.getFullYear();

  // Array of month names
  var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Format the date
  PDF_Current_Date = "Date: " + (day < 10 ? '0' : '') + day + ' ' + monthNames[monthIndex] + ' ' + year;

}
Get_Current_Date();

// Disbale all action buttons if step_progress_bar is at step 2
$(document).ready(function () {
  // loop through all elements with the class Action_Button
  $('.Action_Button').each(function () {
    // add an event listener to each button
    $(this).on('click', function () {
      // check the condition and disable the button if necessary
      if (Current_Step_Count >= 2) {
        $(this).prop('disabled', true);
        return;
      }

      // your existing code for the button click event goes here

    });
  });
});

function Show_All_Markers_Visually() {

  // Show all markers when 'Both' is clicked
  for (let i = 0; i < Number_Of_Markers; i++) {
    changeIconColorById(String(i), "First_Color_Icon");
  }

}

// In interval to account for marker clicked
// Select all images and add the class "Non_Drag_Image"
var intervalId = window.setInterval(function () {
  $('img').addClass('Non_Drag_Image');
}, 1000);


function Open_Catalog() {

  if (Current_Step_Count >= 2) {
    return;
  }

  if (Prevent_Div_Overlap) {
    return;
  }

  Prevent_Div_Overlap = true;
  window.open('catalog.html', '_blank');
  // window.open('other/catalog.html', '_blank');

}


// Set logo text same width as logo image


