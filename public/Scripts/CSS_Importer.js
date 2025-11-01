// List of CSS file URLs
const styleSheetUrls = [
    '../StyleSheets/Style_A/Brand_Kit.css',
    '../StyleSheets/Style_A/Top_Bar.css',
    '../StyleSheets/Style_A/Browse_Areas.css',
    '../StyleSheets/Style_A/Landing_Page.css',
    '../StyleSheets/Style_A/Specific_Tags.css',
    '../StyleSheets/Style_A/Filter_By_Type.css',
    '../StyleSheets/Style_A/Step_Progress_Bar.css',
    '../StyleSheets/Style_A/Billboard_Slideshow.css',
    '../StyleSheets/Style_A/Billboard_Info_Tabs.css',
    '../StyleSheets/Style_A/Maximized_Slideshow.css',
    '../StyleSheets/Style_A/Billboard_Info_Section.css',
    '../StyleSheets/Style_A/Billboard_Info_Checkbox.css',
    '../StyleSheets/Style_A/Set_Campaign_Duration.css',
    '../StyleSheets/Style_A/Preview_Media_Embedded.css',
    '../StyleSheets/Style_A/Filter_By_Price.css',
    '../StyleSheets/Style_A/Get_Quote.css',
    '../StyleSheets/Style_A/Billboard_Description_News_Ticker.css',
    '../StyleSheets/Style_A/Parent_Final_Step_Message.css',
    '../StyleSheets/Style_A/Catalog.css',
    '../StyleSheets/Style_A/Ask_A_Question.css',
    '../StyleSheets/Style_A/Hidden_Billboard_Information.css',
    '../StyleSheets/Style_A/Voice_Control.css'



];

// Function to append stylesheets to the head with unique IDs
function appendStylesheetsToHead() {
    styleSheetUrls.forEach((url) => {
        // Extract filename from the URL
        const fileName = url.split('/').pop().replace('.css', '');

        // Create a unique ID based on the filename
        const id = `${fileName}_StyleSheet`;

        // Append the link element to the head
        $('head').append(`<link rel="stylesheet" id="${id}" type="text/css" href="${url}">`);
    });
}

// Call the function to append stylesheets to the head
appendStylesheetsToHead();
