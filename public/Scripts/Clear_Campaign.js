var Prevent_Div_Overlap = false;
Counter_Confirm_Clear_Campaign = 1;
toggleElementsVisibility('Parent_Confirm_Clear_Campaign', '');
function Confirm_Clear_Campaign(Action) {
    log("in confirm clear a campaign")
    if (Current_Step_Count >= 2) {
        return;
    }

    if (Counter_Confirm_Clear_Campaign % 2 == 0) {
        toggleElementsVisibility('Parent_Confirm_Clear_Campaign', '');
        Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
        Counter_Confirm_Clear_Campaign++;
        Prevent_Div_Overlap = false;
        return;
    }

    if (Prevent_Div_Overlap) {
        return;
    }
    Prevent_Div_Overlap = true;

    Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
    toggleElementsVisibility('', 'Parent_Confirm_Clear_Campaign');

    if (Action == "No") {
        log("action is no")
        toggleElementsVisibility('Parent_Confirm_Clear_Campaign', '');
        Prevent_Div_Overlap = false;
    }
    Counter_Confirm_Clear_Campaign++;

}

function Clear_Campaign() {

    if (Current_Step_Count >= 2) {
        return;
    }

    Arr_Campaign.length = 0;
    $("#Insert_Selected_Campaign_Billboard_Card").empty();
    $("#Campaign_Is_Empty_Text").text(Campaign_Is_Empty_Text);
    $('input[type="checkbox"]').prop('checked', false);
    $("#Confirm_Clear_Campaign_Text").text("Campaign Cleared");
    Counter_Confirm_Clear_Campaign++;

    $("#Parent_Clear_Campaign_Buttons").hide();

    setTimeout(() => {
        Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
        toggleElementsVisibility('Parent_Confirm_Clear_Campaign', '');
        $("#Confirm_Clear_Campaign_Text").text("Are you sure you want to clear your campaign list?");
        $("#Parent_Clear_Campaign_Buttons").removeClass("Hide");
        Prevent_Div_Overlap = false;
    }, 1000);

}