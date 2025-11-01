var Filter_By_Price = window.Filter_By_Price || function () {};
var Filter_Marker_By_Type = window.Filter_Marker_By_Type || function () {};
var shouldMarkerBeVisible =
  window.shouldMarkerBeVisible ||
  function () {
    return true;
  };

var Last_Clicked_Marker_ID;
var HTML_Bones_Billboard_Info_Card;
var Modified_Html_Content_Add_To_Campaign;
var Marker_ID;
var JSON_Modified_HTML = [];
var Arr_Animation = [
  "animate__fadeInRight",
  "animate__fadeIn",
  "animate__zoomInDown",
  "animate__fadeInDown",
  "animate__pulse",
  "animate__headShake",
  "animate__fadeIn",
  "animate__flipInY",
  "animate__zoomInRight",
  "animate__zoomInLeft",
  "animate__slideInRight",
  "animate__zoomIn",
];
var Random_Number_Arr_Animation = Math.floor(
  Math.random() * Arr_Animation.length
);
var Counter_Marker_Clicked = 0;

//Simulate marker clicked
//Marker_Clicked([-68.96862275898457, 12.16754134817026], Marker_ID, '0', 'zuikertuin', 'Print', '434343', 'High', '4', 'popop description', 'yres', '123111', '22', '3333', '4', 'nice', 'pretty', 'cool', 'wowzer');

// [{"Marker_ID":"", "Campaign_HTML":""}];
function Marker_Clicked(
  coordinates,
  Marker_ID,
  Owner_ID,
  Billboard_Location,
  Billboard_Type,
  View_Count,
  View_Density,
  Minimum_Rental_Period,
  Description,
  Night_Time_Illumination,
  Price_Per_Month_1,
  Price_Per_Month_2,
  Price_Per_Month_3,
  Price_Per_Month_4,
  PPM_1_Description,
  PPM_2_Description,
  PPM_3_Description,
  PPM_4_Description
) {
  log(
    "Marker_ID: " +
      Marker_ID +
      " coordinates: " +
      coordinates.join(", ") +
      " Billboard_Type: " +
      Billboard_Type
  );
  // $("#Dev_Marker_Clicked_Info").text("Marker_ID:  " + Marker_ID + " Owner_ID:   " + Owner_ID + " PPM: " + Price_Per_Month + " " + Billboard_Type + " " + Billboard_Location + " " + Description);

  //Hide_Billboard_Information();

  // Checks if marker is already clicked, Doesnt add same billboard information in tab
  if (Last_Clicked_Marker_ID == Marker_ID) {
    return;
  }

  // If in Campaign tab, auto set to Billboard Information Tab when marker is clicked
  if (Tab_Name_Currently_In == "Tab_2") {
    document.getElementById("Opens_On_Default").click();
  }

  // Removes text in billboard information
  $("#Billboard_Information_Basic_Text").remove();
  $("#Small_Marker_Billboard_Information").remove();
  Counter_Marker_Clicked++;

  if (Counter_Marker_Clicked == 3) {
    $("#Scroll_To_Top_Btn").removeClass("Hide");
  }

  //
  // Create Price_Dropdown
  //
  var Prices_Info = Has_Multiple_Prices_Per_Month(Marker_ID);
  var Boolean_Does_This_Maker_Have_Multiple_Prices =
    Prices_Info.Does_This_Marker_Have_Multiple_Prices;
  console.log(
    "Has Multiple Prices for Marker ID " + Marker_ID + ":",
    Boolean_Does_This_Maker_Have_Multiple_Prices
  );
  var Arr_Prices_Per_Month = Prices_Info.allPrices;
  console.log("All Prices:", Arr_Prices_Per_Month[1]);

  log(
    "Does_This_Marker_Have_Multiple_Prices: " +
      Boolean_Does_This_Maker_Have_Multiple_Prices
  );

  var Count_Price_Per_Month_Attribute = Arr_Prices_Per_Month.length;
  log("Count_Price_Per_Month_Attribute: " + Count_Price_Per_Month_Attribute);

  var HTML_PPM_Select = "";
  log(PPM_1_Description);
  for (let index = 1; index <= Count_Price_Per_Month_Attribute; index++) {
    const Value_PPM_Description = eval(`PPM_${index}_Description`);
    const Value_PPM_Price = eval(`Price_Per_Month_${index}`);
    HTML_PPM_Select += `
    <optgroup id="Additional_Information_M${Marker_ID}" class="PPM_Label" label="${Value_PPM_Description}">
      <option id="Option_M${Marker_ID}" class="PPM_Option" value="${Value_PPM_Price}">FL ${Value_PPM_Price}</option>
    </optgroup>
    `;
  }

  //log("HTML_PPM_Select:" +HTML_PPM_Select)

  var HTML_Bones_Price_Per_Month;
  if (Boolean_Does_This_Maker_Have_Multiple_Prices) {
    HTML_Bones_Price_Per_Month =
      `<select name="PPM_Name" id="Price_SelectM${Marker_ID}" class="Select_Price_Dropdown">` +
      HTML_PPM_Select +
      `</select ><br>`;
  } else {
    HTML_Bones_Price_Per_Month = `
            <span class="Billboard_Price_Section_Content" id="Billboard_Price_Per_Month_Section_Content_M${Marker_ID}"> </span> <br>`;
  }

  HTML_Bones_Billboard_Info_Card =
    `
  <div class="Parent_Billboard_Info animate__animated " id="Parent_Billboard_Info_M${Marker_ID}">
    <div class="Class_Billboard_Address" id="Billboard_Location_M${Marker_ID}">Santa maria kaya yeye 22</div>
    <div class="Column_Divider_By_2">
      <div class="image-container Non_Drag_Image" id="${Marker_ID}_Parent_ID">
        <img onclick="Maximize_Slideshow('Billboard_ID_${Marker_ID}')" class="Parent_Image_Slideshow Non_Drag_Image" id="Billboard_Slideshow_Presenter_M${Marker_ID}">
        <div class="left_overlay Left_Image_Slideshow" onclick="Show_Image(${Marker_ID},'Left')">⮜ </div>
        <div class="right_overlay Right_Image_Slideshow" onclick="Show_Image(${Marker_ID},'Right')">⮞</div>
      </div>
      <div class="Billboard_Info_section">
        <span class="Billboard_Price_Section_Title">Price Per Month:</span>
        ` +
    HTML_Bones_Price_Per_Month +
    ` <br>   
        <span class="Billboard_View_Density_Title">Audience Reach: </span>
        <span class="Billboard_View_Density_Content" id="Billboard_View_Density_Content_M${Marker_ID}">Very High</span> <br>        
       <!-- <span class="Billboard_View_Count_Title">Daily View Count: </span>
        <span class="Billboard_View_Count_Content" id="Billboard_View_Count_Content_M${Marker_ID}">3455</span> <br> -->
        <span class="Billboard_Type_Title">Type: </span>
        <span class="Billboard_Type_Content" id="Billboard_Type_Content_M${Marker_ID}">Digital</span> <br>
        <span class="Billboard_Minimum_Rental_Period_Title">Minimum Monthly Rental: </span>
        <span class="Billboard_Minimum_Rental_Period_Content" id="Billboard_Minimum_Rental_Period_Content_M${Marker_ID}">6 Months</span> <br>
        <span class="Billboard_Night_Time_Illumindation_Title">Night Time Lights: </span>
        <span class="Billboard_Night_Time_Illumindation_Content" id="Night_Time_Illumination_Content_M${Marker_ID}">Yes</span>
        <div class="Parent_Add_To_Campaign"> 
        <span class="Billboard_Checkbox_Title">Add To Campaign</span>
          <div class="checkbox-wrapper">
            <input type="checkbox" id="A_Billboard_Info_M${Marker_ID}" onclick="Add_To_Campaign(this.id,'Add')" />
              <label for="A_Billboard_Info_M${Marker_ID}" style="--size: 30px"><svg viewBox="0,0,50,50"><path d="M5 30 L 20 45 L 45 5"></path></svg></label></div>
        </div>
        <img class="Enlarge_Slideshow Non_Drag_Image" onclick="Maximize_Slideshow(this.id)" id="Billboard_ID_${Marker_ID}" src="../Media/Ico/2_Enlarge_Slideshow.png" title="Maximize Slideshow">
      </div>
    </div>
  </div>
`;

  HTML_Bones_Maximized_Slideshow = `
<div class="Parent_Maximized_Slideshow" id="Parent_Maximized_Slideshow_ID_${Marker_ID}">
<img class="Parent_Image_Slideshow Non_Drag_Image Maximized_Image_Class" id="Maximized_Image_ID_${Marker_ID}"
    >
    <video id="Video_Preview_Container_M_${Marker_ID}" class="Parent_Video_Preview Maximized_Image_Class Hide" autoplay muted loop controls>
    <source id="Video_Preview_Content_M_${Marker_ID}" src="../Media/Videos/V${Marker_ID}/1.mp4" type="video/mp4">
  
  </video>
<div class="Maximized_left_overlay Left_Image_Slideshow Non_Drag_Image" id="Maximized_left_overlay_ID"
    onclick="Show_Image(${Marker_ID},'Left')">⮜
</div>

<div class="container">
<div class="ticker">
  <div class="Billboard_Description_Background">
    <marquee>
      <p id="Billboard_Description_Content_${Marker_ID}">..
    </p>
    </marquee>
  </div>
</div>
</div>

<div class="Maximized_right_overlay Right_Image_Slideshow Non_Drag_Image" id="Maximized_right_overlay_ID"
    onclick="Show_Image(${Marker_ID},'Right')">⮞
</div>
<div class="Stack_Items_On_Top_Of_Each_Other"> 
<img id="Close_Slideshow" class="Maximized_Slideshow_Top_Right_Btn" onclick="Close_Slideshow()" src="../Media/Ico/close.png">
<!-- <img id="Video_Preview" class="Maximized_Slideshow_Top_Right_Btn" onclick="Show_Video_Preview()" src="../Media/Ico/Video.png"> -->

</div
</div>
`;

  // Uncomment #Video_Preview to view to activate

  $("#Insert_Maximized_Slideshow").prepend(HTML_Bones_Maximized_Slideshow);
  $(".Parent_Maximized_Slideshow").children().css("display", "none");
  $("#Insert_Billboard_Card").prepend(HTML_Bones_Billboard_Info_Card);

  // $('#Insert_Billboard_Card').prepend("<div class=\"Parent_Billboard_Info animate__animated\" id=\"Parent_Billboard_Info_M" + Marker_ID + "\"> <div class=\"Class_Billboard_Address\" id=\"Billboard_Location_M" + Marker_ID + "\">Santa maria kaya yeye 22</div> <div class=\"Column_Divider_By_2\"> <div class=\"image-container Non_Drag_Image\" id=\"B2_Parent_ID\"> <img onclick=\"Maximize_Slideshow()\" class=\"Parent_Image_Slideshow Non_Drag_Image\" id=\"Billboard_Slideshow_Presenter_M" + Marker_ID + "\"> <div class=\"left_overlay Left_Image_Slideshow\" id=\"B1_show\" onclick=\"Show_Image(this,'Left')\">⮜ </div> <div class=\"right_overlay Right_Image_Slideshow\" onclick=\"Show_Image(this,'Right')\">⮞</div> </div> <div class=\"Billboard_Info_section\"> <span class=\"Billboard_Price_Section_Title\">Price Per Month:</span> <span class=\"Billboard_Price_Section_Content\" id=\"Billboard_Price_Per_Month_Section_Content_M" + Marker_ID + "\">FL 700</span> <br> <span class=\"Billboard_View_Density_Title\">View Density: </span> <span class=\"Billboard_View_Density_Content\" id=\"Billboard_View_Density_Content_M" + Marker_ID + "\">Very High</span> <br> <span class=\"Billboard_View_Count_Title\">View Count: </span> <span class=\"Billboard_View_Count_Content\" id=\"Billboard_View_Count_Content_M" + Marker_ID + "\"> 3455</span> <br> <span class=\"Billboard_Type_Title\">Type: </span> <span class=\"Billboard_Type_Content\" id=\"Billboard_Type_Content_M" + Marker_ID + "\">Digital</span> <br> <span class=\"Billboard_Minimum_Rental_Period_Title\">Minimum Rental Period: </span> <span class=\"Billboard_Minimum_Rental_Period_Content\" id=\"Billboard_Minimum_Rental_Period_Content_M" + Marker_ID + "\"> 6 Months</span> <br>  <span class=\"Billboard_Checkbox_Title\">Add to campaign</span> <div class=\"checkbox-wrapper\"><input type=\"checkbox\" id=\"check-23\" /><label for=\"check-23\" style=\"--size: 30px\"><svg viewBox=\"0,0,50,50\"> <path d=\"M5 30 L 20 45 L 45 5\"></path> </svg></label></div> <img class=\"Enlarge_Slideshow\" onclick=\"Maximize_Slideshow(this.id)\" id=\"Billboard_ID_20\" src=\"../Media/Ico/2_Enlarge_Slideshow.png\" title=\"Maximize Slideshow\"> </div> </div> </div>");
  // Card Entrance Animation: Activate or not
  if (true) {
    $("#Parent_Billboard_Info_M" + Marker_ID).addClass(
      Arr_Animation[Random_Number_Arr_Animation]
    );
    setTimeout(() => {
      $("#Parent_Billboard_Info_M" + Marker_ID).removeClass(
        Arr_Animation[Random_Number_Arr_Animation]
      );
      //$("#Parent_Billboard_Info_M" + Marker_ID).addClass("animate__pulse");
    }, 1000);
  }

  // Assign data information to card
  Billboard_Location = Billboard_Location.charAt(0).toUpperCase() + Billboard_Location.slice(1);
  $("#Billboard_Location_M" + Marker_ID).text(Billboard_Location);

  $("#Billboard_Price_Per_Month_Section_Content_M" + Marker_ID).text("XCG " + Price_Per_Month_1);
  $("#Billboard_View_Density_Content_M" + Marker_ID).text(View_Density);
  $("#Billboard_View_Count_Content_M" + Marker_ID).text(View_Count);
  $("#Billboard_Type_Content_M" + Marker_ID).text(Billboard_Type);
  $("#Billboard_Minimum_Rental_Period_Content_M" + Marker_ID).text(
    Minimum_Rental_Period
  );
  $("#Billboard_Slideshow_Presenter_M" + Marker_ID).attr(
    "src",
    "/Media/Billboard_Images/M" + Marker_ID + "/1.jpeg"
  );
  $("#Night_Time_Illumination_Content_M" + Marker_ID).text(
    Night_Time_Illumination
  );

  //Assign data information to Hidden Billboard Information
  $("#HBI_Name").text(Billboard_Location);
  $("#HBI_Price").text("XCG " + Price_Per_Month_1);

  /*
  For new billboard property: 
  Pass value in Marker_Clicked
  Create Title and Content section in HTML Bones
  Set value to Marker ID
  Set property in Geo JSON / Map_Data
  */

  // HTML for Add to campaign
  var ParentDiv = document.getElementById(
    "Parent_Billboard_Info_M" + Marker_ID
  );
  var Pre_Add_To_Campaign_HTML_Content = ParentDiv.outerHTML;
  Pre_Add_To_Campaign_HTML_Content = Pre_Add_To_Campaign_HTML_Content.replace(
    /Parent_Billboard_Info_M/g,
    "Campaign_Parent_Billboard_Info_M"
  );

  // Create a temporary element and set its innerHTML
  var tempElement = document.createElement("div");
  tempElement.innerHTML = Pre_Add_To_Campaign_HTML_Content;

  // Remove the child elements and parent with class 'Parent_Add_To_Campaign'
  // var elementsToRemove = tempElement.querySelectorAll('.Parent_Add_To_Campaign');
  // elementsToRemove.forEach(function (element) {
  //   element.parentNode.removeChild(element);
  // });

  //Removed Left and Right Overlay
  var overlayDivs = tempElement.querySelectorAll(
    ".right_overlay.Right_Image_Slideshow, .left_overlay.Left_Image_Slideshow"
  );
  overlayDivs.forEach(function (div) {
    div.parentNode.removeChild(div);
  });

  // Get the modified HTML content from the temporary element
  // This changes text not function
  Modified_Html_Content_Add_To_Campaign = tempElement.innerHTML;
  Modified_Html_Content_Add_To_Campaign =
    Modified_Html_Content_Add_To_Campaign.replace(
      "Add To Campaign",
      "Remove From Campaign"
    );

  JSON_Modified_HTML.push({
    Marker_ID: Marker_ID,
    Campaign_HTML: Modified_Html_Content_Add_To_Campaign,
  });

  /* This is to fix, Digital is selected, then when you click a marker, it shows all markers
  Forces to re-assign color to marker */

  //changeIconColorById(String(Marker_ID), "Second_Color_Icon");
  Last_Clicked_Marker_ID = Marker_ID;

  // Add height to Full_Card_Billboard_Info, In order for last card to fully show
  //150
  $(".Full_Card_Billboard_Info").height(
    $(".Full_Card_Billboard_Info").height() + 120
  );

  // Check if marker is already added to campaign, if it is then it adds checkbox for add to campaign
  if (Arr_Campaign.includes("A_Billboard_Info_M" + Marker_ID)) {
    //$("#A_Billboard_Info_M"+Marker_ID).click();
    $("#A_Billboard_Info_M" + Marker_ID).prop("checked", true);
  }

  // Instead of calling Filter_By_Price() and Filter_Marker_By_Type(),
  // we'll just ensure all markers maintain their filtered state
  var features = placesSource._data.features;
  features.forEach((feature) => {
    const markerId = String(feature.properties.Marker_ID);

    // Check if this is the clicked marker
    if (markerId === String(Marker_ID)) {
      changeIconColorById(markerId, "Second_Color_Icon");
    }
    // For all other markers, apply current filters
    else {
      const shouldBeVisible = shouldMarkerBeVisible(feature);
      changeIconColorById(
        markerId,
        shouldBeVisible ? "First_Color_Icon" : "hide-icon"
      );
    }
  });
} // END Marker_Clicked

changeIconColorById(String(Marker_ID), "First_Color_Icon");

// Hides icon with ID 2
// changeIconColorById('2', 'hide-icon');

function Scroll_Billboard_And_Campaign_To_Top() {
  // Scrolls to top, Billboard Information and Campaign
  $(".Parent_Full_Card_Billboard_Info").animate(
    {
      scrollTop: 0,
    },
    1000
  );
}
