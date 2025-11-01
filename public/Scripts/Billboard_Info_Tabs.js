document.getElementById("Opens_On_Default").click();
var Tab_Name_Currently_In;
function Open_Tab(evt, Tab_Name) {

    if(!isBillboardInformationVisible){
        Hide_Billboard_Information();
    }

    Tab_Name_Currently_In = Tab_Name;
    //log("Tab_Name_Currently_In: "+Tab_Name_Currently_In)
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(Tab_Name).style.display = "block";
    evt.currentTarget.className += " active";

    /*
    //Get CSS variables
    //Change tabs parent info background color
    var First_Color = getComputedStyle(document.body).getPropertyValue('--first-color');
    log("ff"+First_Color)
    var Third_Color = getComputedStyle(document.body).getPropertyValue('--third-color');

    if(Tab_Name =="Tab_1"){
        $('.Full_Card_Billboard_Info').css('background-color',First_Color);

    }else{
        $('.Full_Card_Billboard_Info').css('background-color', Third_Color);

    }
    */

}



//Open_Tab("", "Tab_1");
//$( "#Btn_Tab_1_ID" ).trigger( "click" );

//$("#Btn_Tab_1_ID").addClass("active");

$("#Billboard_Information_Basic_Text").text("Click on a marker, on the map, to view its information");