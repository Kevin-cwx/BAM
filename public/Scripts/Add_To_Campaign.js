var log = console.log;
var Arr_Campaign = [];
var Arr_Campaign_Only_Marker_ID = [];

function Add_To_Campaign(Billboard_Info_ID, action) {
    $("#Campaign_Is_Empty_Text").text("");
    // Check if the checkbox is checked
    var checkbox = document.getElementById(Billboard_Info_ID);
    var isChecked = checkbox.checked;
    Clicked_Marker_ID = Billboard_Info_ID.substring("A_Billboard_Info_M".length);
    //log("Billboard_Info_ID: " + Billboard_Info_ID);


    // If checked, add to the array if it's unique
    if (!Arr_Campaign.includes(Billboard_Info_ID)) {
        Arr_Campaign.push(Billboard_Info_ID);

        var Found_Object = JSON_Modified_HTML.find(item => item.Marker_ID === Clicked_Marker_ID.toString());
        var New_Campaign_HTML = Found_Object ? Found_Object.Campaign_HTML : null;
        // Add the modified HTML content to the selected campaign card
        $('#Insert_Selected_Campaign_Billboard_Card').prepend(New_Campaign_HTML);
    } else if (Arr_Campaign.includes(Billboard_Info_ID)) {
        // Had problem getting "Remove to work, it appears in the HTML but when you click the checkbox it still passes Add"
        var index = Arr_Campaign.indexOf(Billboard_Info_ID);
        Arr_Campaign.splice(index, 1);
        $("#Campaign_Parent_Billboard_Info_M" + Clicked_Marker_ID).addClass("animate__animated animate__fadeOutRight");

        setTimeout(() => {
            document.getElementById("Campaign_Parent_Billboard_Info_M" + Billboard_Info_ID.substring("A_Billboard_Info_M".length))?.remove();
        }, 200);

    }


    //Check if Campaign is empty, adds text back incase campaign is cleared
    Check_If_Campaign_Is_Empty();

}

var Campaign_Is_Empty_Text = "No billboards added to campaign.";
function Check_If_Campaign_Is_Empty() {
    $("#Campaign_Is_Empty_Text").text(Arr_Campaign.length === 0 ? Campaign_Is_Empty_Text : "");
}

Check_If_Campaign_Is_Empty();

function Populate_Arr_Only_Marker_ID() {
    // Populate Arr_Campaing_Only_Marker_ID with digits from Arr_Campaign
    // For some reason below commented out code doesnt show values on PDF
    // Arr_Campaign_Only_Marker_ID = Arr_Campaign.map(item => item.match(/\d+$/)[0]);
    for (var i = 0; i < Arr_Campaign.length; i++) {
        var matchResult = Arr_Campaign[i].match(/\d+$/);
        if (matchResult) {
            Arr_Campaign_Only_Marker_ID.push(matchResult[0]);
        }
    }
}

var Arr_Unique_Owner_ID;
function Get_Unique_Owner_ID(Arr_Campaign_Only_Marker_ID) {
    const ownerIDs = new Set();
    Arr_Campaign_Only_Marker_ID.forEach(markerID => {
        const item = window.Map_Data.find(i => i.properties.Marker_ID === markerID);
        if (item) {
            ownerIDs.add(item.properties.Owner_ID);
        }
    });
    return Array.from(ownerIDs);
}