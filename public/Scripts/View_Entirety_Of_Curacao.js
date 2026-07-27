Bool_View_Entirety_Of_Curacao = true;
var Current_Zoom_Level = map.getZoom();
var Last_Map_Center;
function View_Entirety_Of_Curacao() {

  if (Current_Step_Count >= 2) {
    return;
  }

  if (Prevent_Div_Overlap) {
    return;
  }
  Prevent_Div_Overlap = true;


  log("in View_Entirety_Of_Curacao");
  if (Bool_View_Entirety_Of_Curacao || Current_Zoom_Level > 12) {
    Last_Map_Center = map.getCenter();
    Last_Map_Zoom = map.getZoom();
    Change_Zoom(9.5);
    //map.setCenter([-68.78010861765489, 12.246400750420747]);
    map.setCenter([-68.78010861765489, 12.292300750420747]);

  } else if (!Bool_View_Entirety_Of_Curacao) {
    //Returns to next Browse Area
    Change_Zoom(Standard_Zoom_Level);
    //Browse_Areas("Right");

    // Returns to previous location on map
    map.setCenter([Last_Map_Center.lng, Last_Map_Center.lat]);
    Change_Zoom(Last_Map_Zoom);
  }
  Bool_View_Entirety_Of_Curacao = !Bool_View_Entirety_Of_Curacao;
  Current_Zoom_Level = map.getZoom();
  Prevent_Div_Overlap = false;
}