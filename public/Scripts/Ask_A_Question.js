Counter_Ask_A_Question = 1;
toggleElementsVisibility('Parent_Ask_A_Question', '');
function Ask_A_Question(Action) {
  if (Current_Step_Count >= 2) {
    return;
  }

  if (Counter_Ask_A_Question % 2 == 0) {
    toggleElementsVisibility('Parent_Ask_A_Question', '');
    Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
    Counter_Ask_A_Question++;
    Prevent_Div_Overlap = false;
    return;
  }

  if (Prevent_Div_Overlap) {
    return;
  }
  Prevent_Div_Overlap = true;


  Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
  toggleElementsVisibility('', 'Parent_Ask_A_Question');

  if (Action == "No") {
    log("action is no")
    toggleElementsVisibility('Parent_Ask_A_Question', '');
    Prevent_Div_Overlap = false;

  }
  Counter_Ask_A_Question++;


}

var Ask_A_Question_Email_Body;
function Send_Email_Ask_A_Question() {
  Ask_A_Question_Email_Body = $("#Ask_A_Question_Email_Body").val();

  if (Ask_A_Question_Email_Body.length <= 4 && (Ask_A_Question_Email_Body.match(/ /g) || []).length < 4) { 
    log("No message");
    return;
  }
    //Init_Send_Email_Ask_A_Question();
    //sendEmail(Arr_Final_Email_Objects);

    log("email bosy: " + Ask_A_Question_Email_Body);


  $("#Parent_Ask_A_Question_Buttons").addClass("Hide");
  $("#Ask_A_Question_Email_Body").addClass("Hide");
  $("#Ask_A_Question_Title_Text").text("✅ Email has been send.");

  setTimeout(() => {
    Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
    toggleElementsVisibility('Parent_Ask_A_Question', '');
    $("#Ask_A_Question_Title_Text").text("Need Support? Ask Away.");
    $("#Parent_Ask_A_Question_Buttons").removeClass("Hide");
    $("#Ask_A_Question_Email_Body").removeClass("Hide");
    $("#Ask_A_Question_Email_Body").val("")
    Counter_Ask_A_Question++;
    Prevent_Div_Overlap = false;

  }, 2300);
}
