$("#Get_Quote_Continue_Btn").addClass("Hide");

function Send_Email_To_Billboard_Owner() { 
    Init_Email_Data();
    sendEmail(Arr_Final_Email_Objects);
    $("#Email_Example_Title").text("✅Email has been sent.");
    $("#Email_Example_Title").append("<br>Check your inbox for the attached message.");

    $(".Email_Example_Image").addClass("Hide");
    $("#Get_Quote_Continue_Btn").removeClass("Hide");
    


    function sendEmail() {
        $.ajax({
            url: '/send-email',
            type: 'POST',
            //data: JSON.stringify({ Arr_Campaign, Campaign_Duration, Desired_Campaign_Start_Date, Billboard_Owner_Data }),
            data: JSON.stringify({ Arr_Final_Email_Objects }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                console.log(response.message);
                // You can add additional functionality here, like updating the UI
            },
            error: function (xhr, status, error) {
                console.error('Error sending email:', error);
            }
        });
    }


}