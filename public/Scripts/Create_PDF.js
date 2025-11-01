toggleElementsVisibility('Parent_Get_Quote', '');
toggleElementsVisibility('Parent_Final_Step_Message', '');

var First_Campaign_Billboard;
function Create_PDF(Arr_Campaign, Arr_Campaign_Only_Marker_ID, Map_Data, PDF_Current_Date, Arr_Unique_Owner_ID) {

    log("In Create_PDF");

    Execute_PDF_Doc_Definition();

    const pdfDoc = pdfMake.createPdf(docDefinition, fonts);
    pdfDoc.download("BAM_Billboard_Quotation_" + PDF_Current_Date.replace("Date: ", "_") + ".pdf");

}

function Init_For_PDF(){
    Populate_Arr_Only_Marker_ID();
    Get_Campaign_Duration_Val();
    Arr_Unique_Owner_ID = Get_Unique_Owner_ID(Arr_Campaign_Only_Marker_ID);


    


    Create_PDF(Arr_Campaign, Arr_Campaign_Only_Marker_ID, Map_Data, PDF_Current_Date, Arr_Unique_Owner_ID);
    
}


function Find_CompanyName_By_OwnerID(ownerID) {
    var companyName = "";
    $.each(Billboard_Owner_Data, function(index, data) {
        if (data.Owner_ID == ownerID) {
            companyName = data.Company_Name;
            return false; // Exit the loop once the company name is found
        }
    });
    return companyName;
}