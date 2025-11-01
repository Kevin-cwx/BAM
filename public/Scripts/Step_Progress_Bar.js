var log = console.log;

/*
1.Choose Billboards
2.Set Duration
3.Preview Media
4.Get Quote
*/

var Top_Bar_Content = {
    second: $('.Top_Bar_Second_Section').html(),
    third: $('.Top_Bar_Third_Section').html()
};

var Current_Step_Count = 1;
var Extra_Black_Translucent_Background = document.getElementById('Extra_Black_Translucent_Background');
Animation_Is_Done_Message_Box_Array_Is_Empty = true;
function Step_Progress_Button(Direction) {
    // 1.Select Billboards 
    if (Direction == "Right" && Prevent_Div_Overlap == false) {
        if (Current_Step_Count == 1 && Arr_Campaign.length > 0) {
            log("Aaa")
            Next_Edit_Step_Counter_Status(Current_Step_Count);
            // Show set campaign duration

            // Hide top bar content
            $('.Top_Bar_Second_Section, .Top_Bar_Third_Section').empty();

            Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
            toggleElementsVisibility('', 'Set_Campaign_Duration_Parent');
        } else if (Current_Step_Count == 1 && Arr_Campaign.length == 0) {
            Message_Box_Array_Is_Empty();
        } else if (Current_Step_Count == 2) {
            // 2.Set Duration
            log("Show preview media");
            Next_Edit_Step_Counter_Status(Current_Step_Count);
            toggleElementsVisibility('Set_Campaign_Duration_Parent', 'Parent_Get_Quote');
            // Must have 2 lines in order for it to show the black screen
            Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
            Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
            // toggleElementsVisibility('', 'Parent_Preview_Media');

            // 3.Preview Media
        } else if (Current_Step_Count == 3) {
            
            log("Final Step Message");
            toggleElementsVisibility('Parent_Get_Quote', 'Parent_Final_Step_Message');
            Next_Edit_Step_Counter_Status(Current_Step_Count);
            //Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
            //Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';

            //Moved in reset function
            //Current_Step_Count = 1;
            Clear_Campaign();
            $("#Insert_Billboard_Card").empty();
            document.getElementById("Opens_On_Default").click();
            //$("#Get_Quote_Continue_Btn").addClass("Hide");
            setTimeout(() => {
                //Reset_Step_Progress_Bar();
                Redirect_To_LandingPage();

            }, 2000);

            // Must have 2 lines in order for it to show the black screen
           // Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
            //Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';

        } else if (Current_Step_Count == 4) {
           


        }
    } else if (Direction == "Left" && Prevent_Div_Overlap == false) {
        if (Current_Step_Count == 1 && Arr_Campaign.length > 0) {
            // No action needed, user needs to press Next

        } else if (Current_Step_Count == 1 && Arr_Campaign.length == 0) {
            Message_Box_Array_Is_Empty();
        } else if (Current_Step_Count == 2) {
            //Previous_Edit_Step_Counter_Status(Current_Step_Count);
            // Show top bar content again
            $('.Top_Bar_Second_Section, .Top_Bar_Third_Section').each((i, el) => $(el).html([Top_Bar_Content.second, Top_Bar_Content.third][i]));
            
            // Init, since items were removed from view
            Filter_Marker_By_Type("Both")
            $(".Browse_Area_Counter_Display").text("[1/" + Browse_Areas_Coordinates.length + "]")
            // Placeholder text
            $('#Filter_By_Price_Min').attr('placeholder', 'Min. 600');
            $('#Filter_By_Price_Max').attr('placeholder', 'Max. 1500');



            Cancel_Set_Campaign_Duration();
        } else if (Current_Step_Count == 3) {
            log("At Step 3, just clicked left");
            Previous_Edit_Step_Counter_Status(Current_Step_Count);
            toggleElementsVisibility('Parent_Get_Quote', 'Set_Campaign_Duration_Parent');
        } else if (Current_Step_Count == 4) {
            log("At Step 4, just clicked left");
            Previous_Edit_Step_Counter_Status(Current_Step_Count);
            toggleElementsVisibility('Parent_Get_Quote', 'Parent_Preview_Media');
            Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
            Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';

        }
        log("left was clicked")
        //$("#step_counter_" + Current_Step_Count).css("color", "white");
        $("#step_counter_" + (Current_Step_Count+1)).css("color", "black");
       

    }



    log("Arr_Campaign: " + Arr_Campaign)
}

function Skip_Preview_Media() {
    // window.open("../Screens/Map.html", "_self");
    $('#Step_Progress_Button_Right').click();
}

function Next_Edit_Step_Counter_Status(Number) {
    $("#step_counter_" + Number).text("✔");
    $("#step_counter_" + Number).css("color", "white");
    $("#step_counter_" + Number).css("color", "white");
    $("#Stepper_Item_" + Number).addClass('Completed').removeClass('InProgress');
    $("#Stepper_Item_" + (Number + 1)).addClass('InProgress');
    Current_Step_Count++;
}

function Previous_Edit_Step_Counter_Status(Number) {
    var Decrement_Current_Step_Count = Number - 1;
    $("#step_counter_" + Decrement_Current_Step_Count).text(Decrement_Current_Step_Count);
    $("#Stepper_Item_" + Decrement_Current_Step_Count).removeClass('Completed').addClass('InProgress');
    $("#Stepper_Item_" + Number).removeClass('InProgress');
    Current_Step_Count--;
}

function Message_Box_Array_Is_Empty() {
    log("Array is empty. Must have atleast one item in your campaign.");
    Prevent_Div_Overlap = true;
    if(!Animation_Is_Done_Message_Box_Array_Is_Empty){
        return;
    }
    Animation_Is_Done_Message_Box_Array_Is_Empty =false;
    log("do not show me")

    toggleElementsVisibility('', 'Parent_Array_Is_Empty');

    Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
    $("#Tab_Campaign").addClass("attention_grabber");
    $(".Parent_Add_To_Campaign").addClass("attention_grabber");
    //$(".checkbox-wrapper").addClass("attention_grabber");

    setTimeout(() => {
        Extra_Black_Translucent_Background.style.display = Extra_Black_Translucent_Background.style.display === 'block' ? 'none' : 'block';
        toggleElementsVisibility('Parent_Array_Is_Empty', '');
        $("#Tab_Campaign").removeClass("attention_grabber");
      

        Animation_Is_Done_Message_Box_Array_Is_Empty = true;
        Prevent_Div_Overlap = false;
    }, 2500);

    setTimeout(() => {
        $(".Parent_Add_To_Campaign").removeClass("attention_grabber");
        //$(".checkbox-wrapper").removeClass("attention_grabber");

    }, 5000);

}

function Reset_Step_Progress_Bar() {
    Current_Step_Count = 1;
    for (let i = 1; i <= 5; i++) {
        $("#step_counter_" + i).text(i);
        $("#Stepper_Item_" + i).removeClass('Completed');
        //$("#step_counter_" + i).css("color", "black");
    }
    $("#Stepper_Item_" + 1).addClass('InProgress');
}

toggleElementsVisibility('Parent_Array_Is_Empty', '');