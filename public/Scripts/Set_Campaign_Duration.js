var slider = document.getElementById("Set_Campaign_Duration");
var output = document.getElementById("Campaign_Duration_Content");
output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
}

$('#Set_Campaign_Duration').attr('min', 1);
$('#Set_Campaign_Duration').attr('max', 25);

var minValue = parseFloat(slider.min);
var maxValue = parseFloat(slider.max);

// Set the slider value to 70% of the range
slider.value = minValue + 0.7 * (maxValue - minValue);

// Set slider value to exact ammount
// slider.value = 11;
// output.innerHTML = slider.value;

$("#Campaign_Duration_Content").text(slider.value);
toggleElementsVisibility('Set_Campaign_Duration_Parent', '');

var Set_Campaign_Duration_Value;
function Set_Campaign_Duration_Submit() {
  Set_Campaign_Duration_Value = $('#Set_Campaign_Duration').val();
}

function Cancel_Set_Campaign_Duration() {
  Current_Step_Count--;
  toggleElementsVisibility('Set_Campaign_Duration_Parent', '');
  var Extra_Black_Translucent_Background = document.getElementById('Extra_Black_Translucent_Background');
  Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';

  $("#step_counter_1").text("1");
  $('#Stepper_Item_1').addClass('InProgress').removeClass('Completed');
  $('#Stepper_Item_2').removeClass('InProgress');
}


//    _____      __                                      _                     __             __         __      __     
//   / ___/___  / /_   _________ _____ ___  ____  ____ _(_)___ _____     _____/ /_____ ______/ /_   ____/ /___ _/ /____ 
//   \__ \/ _ \/ __/  / ___/ __ `/ __ `__ \/ __ \/ __ `/ / __ `/ __ \   / ___/ __/ __ `/ ___/ __/  / __  / __ `/ __/ _ \
//  ___/ /  __/ /_   / /__/ /_/ / / / / / / /_/ / /_/ / / /_/ / / / /  (__  ) /_/ /_/ / /  / /_   / /_/ / /_/ / /_/  __/
// /____/\___/\__/   \___/\__,_/_/ /_/ /_/ .___/\__,_/_/\__, /_/ /_/  /____/\__/\__,_/_/   \__/   \__,_/\__,_/\__/\___/ 
//                                      /_/            /____/                                                           

// Shows date as: 5 May 2024, and sets default value as +2 months
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#Desired_Campaign_Start_Date", {
    dateFormat: "d F Y", //d M Y
    defaultDate: new Date(new Date().setMonth(new Date().getMonth() + 2)).setDate(new Date().getDate() + 3), // Set the date two months from today
    minDate: new Date(), // Today's date
    maxDate: new Date().setFullYear(new Date().getFullYear() + 1), // One year from today
  });
});

var Campaign_Duration, Desired_Campaign_Start_Date;
function Get_Campaign_Duration_Val() {
  Desired_Campaign_Start_Date = $("#Desired_Campaign_Start_Date").val();
  Campaign_Duration = $("#Set_Campaign_Duration").val();
  log("Desired_Campaign_Start_Date: " + Desired_Campaign_Start_Date + "\nCampaign_Duration: " + Campaign_Duration)
}