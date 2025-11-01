var Image_Counter = 1;
var totalImages = 4;

function Show_Image(Marker_ID, Direction) {
    log("Marker_ID: " + Marker_ID);
    if (Image_Counter == (totalImages + 1) || Image_Counter == 0) { Image_Counter = 1 }

    if (Direction === 'Right') {
        Image_Counter++;
        if (Image_Counter > totalImages) {
            Image_Counter = 1;
        }
    } else if (Direction === 'Left') {
        Image_Counter--;
        if (Image_Counter < 1) {
            Image_Counter = totalImages;
        }
    }

    var imageSrcMarker = "../Media/Billboard_Images/M" + Marker_ID + "/" + Image_Counter + ".jpeg";
    //var imageSrcMaximized = "/Media/Billboard_Images/M" + Image_Counter + ".jpg";
    $("#Billboard_Slideshow_Presenter_M" + Marker_ID).attr("src", imageSrcMarker);
    $("#Maximized_Image_ID_" + Marker_ID).attr("src", imageSrcMarker);
    // Re_Align_Map_To_Current_Center();
}

Navigate_Slideshow_With_Keypress();
function Navigate_Slideshow_With_Keypress() {
    log("In Navigate_Slideshow_With_Keypress");

    $(function () {
        $(document).keydown(function (e) {
            if (e.which === 37) {
                Show_Image(Last_Clicked_Marker_ID, 'Left');
                if(isSlideshowMaximized == true){
                    Show_Image(Billboard_ID_Number, 'Left');
                }
            }
            else if (e.which === 39) {
                Show_Image(Last_Clicked_Marker_ID, 'Right');
                if(isSlideshowMaximized == true){
                    Show_Image(Billboard_ID_Number, 'Right');
                }
            }
            Re_Align_Map_To_Current_Center();
        });
    });
}

function Re_Align_Map_To_Current_Center() {
    var center = map.getCenter();
    map.setCenter(center);
}