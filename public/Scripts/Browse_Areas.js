const Browse_Areas_Coordinates = [
    {
        name: "Test",
        coordinates: [- 68.96700235393084, 12.168087037818271],
    },
    {
        name: "Mahuma",
        coordinates: [- 68.95093490759912, 12.17498176745906],
    },
    {
        name: "Santa Rosa",
        coordinates: [-68.9057018874389, 12.136694077607762],
        zoom_level: 18
    },
    {
        name: "Biesheuvel",
        coordinates: [- 68.88834426299822, 12.136768961644197],
    },
    {
        name: "Silver Spring",
        coordinates: [- 68.86044695559119, 12.112625033963242],
    },
    {
        name: "Arlington",
        coordinates: [- 68.85657156338728, 12.106410179847225],
    },
    {
        name: "Alexandria",
        coordinates: [- 68.86758485996288, 12.0799019704955],
    },
    {
        name: "Canyon",
        coordinates: [- 68.87315750650238, 12.090035407279986],
    },
];


$(".Browse_Area_Counter_Display").text("[1/" + Browse_Areas_Coordinates.length + "]")
Browse_Areas_Coordinates_Index = 0;
map.setCenter(Browse_Areas_Coordinates[Browse_Areas_Coordinates_Index]["coordinates"]);

function Browse_Areas(Browse_Areas_Direction) {

    if (Browse_Areas_Direction === "Left") {
        Browse_Areas_Coordinates_Index--;
        if (Browse_Areas_Coordinates_Index < 0) {
            Browse_Areas_Coordinates_Index = Browse_Areas_Coordinates.length - 1;
        }
    } else if (Browse_Areas_Direction === "Right") {
        Browse_Areas_Coordinates_Index++;
        if (Browse_Areas_Coordinates_Index >= Browse_Areas_Coordinates.length) {
            Browse_Areas_Coordinates_Index = 0;
        }
    }

    map.setCenter(Browse_Areas_Coordinates[Browse_Areas_Coordinates_Index]["coordinates"]);

    // log("Browse_Areas_Coordinates_Index: " + Browse_Areas_Coordinates_Index);
    // log("Browse_Areas_Direction: " + Browse_Areas_Direction);
    // log("Browse Areas Coordinates:" + Browse_Areas_Coordinates[Browse_Areas_Coordinates_Index]["coordinates"])
    $(".Browse_Area_Counter_Display").text("[" + (Browse_Areas_Coordinates_Index + 1) + "/" + Browse_Areas_Coordinates.length + "]");
    Change_Zoom(Standard_Zoom_Level);
    //Change_Zoom(Browse_Areas_Coordinates[2]['zoom_level']); 
    //var Set_To_Zoom_Level = Browse_Areas_Coordinates[2]?.zoom_level || Standard_Zoom_Level;
    // Change_Zoom(Set_To_Zoom_Level);


    //Set Zoom level based on property
    const Final_Zoom_Level = Browse_Areas_Coordinates[Browse_Areas_Coordinates_Index]?.zoom_level || Standard_Zoom_Level;
    Change_Zoom(Final_Zoom_Level);

}

var Standard_Zoom_Level = 16;
// Browse_Areas("Right");
Change_Zoom(Standard_Zoom_Level);