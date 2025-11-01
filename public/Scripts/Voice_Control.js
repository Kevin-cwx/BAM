var log = console.log;
var longText;

/*
Always on
$(document).ready(function () {
    recognition.start();
});
*/

var message = document.querySelector('#message');

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var grammar = '#JSGF V1.0;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.continuous = true;
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;

var last;
var Long_Text_No_Dot;
recognition.onresult = function (event) {
    last = event.results.length - 1;
    longText = event.results[last][0].transcript;

    log("You just said: " + longText)
    //message.textContent = 'Voice Input: ' + longText;
    longText = longText.toLowerCase();
    var res = longText.split(" ");
    Long_Text_No_Dot = longText.replace(/[.,]/g, '').toLowerCase();
    Perform_Voice_Control_Action();

};

///
function Perform_Voice_Control_Action() {
    switch (Long_Text_No_Dot) {
        case "browse left":
            Browse_Areas("Left")
            log("browse previous")
            break;
        case "browse right":
            Browse_Areas("Right")
            log("browse next")
            break;
        case "view entire curacao":
            View_Entirety_Of_Curacao()
            log("View_Entirety_Of_Curacao")
            break;
        case "hide billboard information":
            Hide_Billboard_Information();
            log("hide billboard information")
            break;
        case "show billboard information":
            Hide_Billboard_Information();
            log("show billboard information")
            break;
        case "set campaign duration":
            Step_Progress_Button('Right');
            log("set campaign duration")
            break;
        case "set duration":
            Step_Progress_Button('Right');
            log("set campaign duration")
                break;
        case `set campaign duration to ${durationMonths} months`:
            $("#Campaign_Duration_Content").text(durationMonths.toString());
            $('#Set_Campaign_Duration').val(durationMonths);
            log("set campaign duration")
            break;

        default:
            break;
    }
}


///

recognition.onspeechend = function () {
    recognition.stop();
};

recognition.onerror = function (event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
}

Counter_Voice_Command = 0;
function Start_Speaking() {

    if (Counter_Voice_Command % 2 === 0) {
        $("#Parent_Voice_Commands").removeClass("Hide");
        log("showw")
        recognition.start();
    } else {
        $("#Parent_Voice_Commands").addClass("Hide");
        log("hidee")
        recognition.stop();

    }

    Counter_Voice_Command++;

}

function Stop_Speaking() {
    recognition.stop();
}



/* Modal Inputs*/
Arr_Voice_Input_Content = ["Move Left","Move Right","Browse Left","Browse Right","Hide Billboard Information","View Entire Curacao", "Show Print Billboards","Show Digital Billboards","Show All Billboards","Set Campaign Duration"];

$.each(Arr_Voice_Input_Content, function(index, value) {
   log(value);
   $("#Content_Voice_Commands").prepend(value+"<br>");
   
});


/* Draggable Element */
$("#Parent_Voice_Commands").addClass("Hide");

// Make the DIV element draggable:
dragElement(document.getElementById("Parent_Voice_Commands"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
   
        elmnt.onmousedown = dragMouseDown;
    

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}