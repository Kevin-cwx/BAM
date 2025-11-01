var log = console.log;

var BackgroundImageCounter = 1;
function ChangeBackgroundImage(offset) {
    BackgroundImageCounter = (BackgroundImageCounter + offset - 1 + 8) % 8 + 1;
    $('#BackgroundImageID').attr('src', `../Media/Landing_Page_Images/${BackgroundImageCounter}.jpeg`);
    SetLandingPageDataText(BackgroundImageCounter - 1);
}

function Next() {
    ChangeBackgroundImage(1);
}

// SlideShow LandingPage - 9999999999999
// setInterval(Next, 2000);

function Previous() {
    ChangeBackgroundImage(-1);
}

function StartBtn() {
    document.body.className = 'MyfadeOut';
    document.body.classList.add('MyfadeOut');
    window.open("../Screens/Map.html", "_self");
}

//Initialize Page in Landing_Page_Data.js
function SetLandingPageDataText(a) {
    $("#LocationText").text(LandingPageData[a]["Location"])
    $("#ReachCountText").text("Reach Count: " + LandingPageData[a]["Unique_Daily_Views"])
    $("#TrafficLevelValueText").text(LandingPageData[a]["Traffic_Level"])
    $("#BillboardTypeValueText").text(LandingPageData[a]["Billboard_Type"])
}

var myTimeout = setTimeout(FML, 100);
myTimeout;

function FML() {
    var Landing_Page_Video_or_Image = "v";
    switch (Landing_Page_Video_or_Image) {
        case "v":
            $("#BackgroundImageID").css("display", "none");
            $('#Background_Video_ID').show();
            break;
        case "i":
            $('#BackgroundImageID').show();
            $("#Background_Video_ID").css("display", "none");
            break;
        default:
    }

}

var Current_Time_In_Milliseconds = Date.now();
var Controls_Or_Text;
var Foreground_Action = ["controls", "text_1", "text_2"];
var Index_Foreground_Action = Current_Time_In_Milliseconds % Foreground_Action.length;
var Selected_Foreground_Action = Foreground_Action[Index_Foreground_Action];


//Controls_Or_Text = "t";
switch (Index_Foreground_Action) {
    case 0:
        $("#Parent_Landing_Page_Text_1, #Parent_Landing_Page_Text_2").css("display", "none");
        $('#ControlDivParent').show();
        break;
    case 1:
        $("#ControlDivParent, #Parent_Landing_Page_Text_2").css("display", "none");
        $('#Parent_Landing_Page_Text_1').show();
        break;
    case 2:
        $("#ControlDivParent, #Parent_Landing_Page_Text_1").css("display", "none");
        $('#Parent_Landing_Page_Text_2').show();
        break;
    default:
}


