$('.Parent_Maximized_Slideshow').children().css('display', 'none');

var Current_Image_Src;
var Billboard_ID;
var elementsToRemove;
var Billboard_ID_Number;
var isSlideshowMaximized = false;
var Billboard_Description;

function Maximize_Slideshow(Billboard_ID) {
    log("Billboard_ID: " + Billboard_ID);
    Billboard_ID_Number = parseInt(Billboard_ID.match(/\d+/)[0], 10);
    log("Billboard_ID_Number: " + Billboard_ID_Number);

    Current_Image_Src = $('#Billboard_Slideshow_Presenter_M' + Billboard_ID_Number).attr('src');
    log("Current_Image_Src: " + Current_Image_Src);
    $("#Maximized_Image_ID_" + Billboard_ID_Number).attr("src", Current_Image_Src);

    // if you change to class "Hide", Video is shown when maximized. Need to adjust class and check for all other cases
    $('#Parent_Maximized_Slideshow_ID_' + Billboard_ID_Number + ' *').removeClass("My_Hidden_Class");
    $('#Parent_Maximized_Slideshow_ID_' + Billboard_ID_Number).children().css('display', 'block');
    var Black_Translucent_Background = document.getElementById('Black_Translucent_Background');
    Black_Translucent_Background.style.display = Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
    isSlideshowMaximized = true;

    Billboard_Description = Get_Billboard_Description(Billboard_ID_Number);
    $("#Billboard_Description_Content_" + Billboard_ID_Number).text(Billboard_Description);
}

function Close_Slideshow() {
    if (isSlideshowMaximized) {
        // Same as comment above
        $('#Parent_Maximized_Slideshow_ID_' + Billboard_ID_Number + ' *').addClass("My_Hidden_Class");
        Black_Translucent_Background.style.display = Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
        isSlideshowMaximized = false;
        Close_Video_Preview();
    }
}

// Allows for escape key to Close_Slideshow
$(function () {
    $(document).keydown(function (e) {
        if (e.which === 27) Close_Slideshow();
    });
});

// F Button for fullscreen
document.addEventListener('keydown', function (e) {
    if ((e.key === 'f' || e.key === 'F') && !isSlideshowMaximized) {
        //Maximize_Slideshow(Marker_ID);
        Maximize_Slideshow(Last_Clicked_Marker_ID);
    }
});

function Get_Billboard_Description(markerID) {
    // Find the feature in the 'places' source with the matching Marker_ID
    var feature = map.getSource('places')._data.features.find(function (feature) {
        return feature.properties.Marker_ID === markerID.toString();
    });

    // Return the description if found, otherwise return a default value or handle it as needed
    return feature && feature.properties.Description ? feature.properties.Description : "Description not available.";
}

Counter_Video_Preview = 0;
function Show_Video_Preview() {
    if (Counter_Video_Preview % 2 == 0) {
        $("#Video_Preview_Container_M_" + Billboard_ID_Number).removeClass("Hide");
        $("#Maximized_right_overlay_ID, #Maximized_left_overlay_ID, .container").addClass("Hide");
        $("#Maximized_Image_ID_" + Billboard_ID_Number).attr("src", "../Media/Other/Black_Wallpaper.jpg");

    }else{
        Close_Video_Preview();
    }

    Counter_Video_Preview++;
}


function Close_Video_Preview() {
    $("#Video_Preview_Container_M_" + Billboard_ID_Number).addClass("Hide");
    $("#Maximized_right_overlay_ID, #Maximized_left_overlay_ID, .container").removeClass("Hide");
    $("#Maximized_Image_ID_" + Billboard_ID_Number).attr("src", Current_Image_Src);

}