var isBillboardInformationVisible = "true";

$("#Parent_Hidden_Billboard_Information_Text").hide();
function Hide_Billboard_Information() {
  log("Hide_Billboard_Information clicked");

  if (Current_Step_Count >= 2) {
    return;
  }

  var Top_Bar_First_Section_Width = $(".Top_Bar_First_Section").width();
  $("#Parent_Hidden_Billboard_Information_Text").width(
    Top_Bar_First_Section_Width
  );

  if (isBillboardInformationVisible) {
    log("in hereeeQ");
    $(".Parent_Full_Card_Billboard_Info").hide();
    $("#Logo_Text").hide();

    $("#Parent_Hidden_Billboard_Information_Text").show();
    $("#Hide_Billboard_Information_Image").attr(
      "src",
      "../Media/Ico/Eye_Closed.png"
    );
  } else {
    $(".Parent_Full_Card_Billboard_Info").show();
    $("#Logo_Text").show();

    $("#Parent_Hidden_Billboard_Information_Text").hide();
    $("#Hide_Billboard_Information_Image").attr(
      "src",
      "../Media/Ico/Eye_Open.png"
    );
  }
  isBillboardInformationVisible = !isBillboardInformationVisible;
}
