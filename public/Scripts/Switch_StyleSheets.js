function Switch_StyleSheets(StyleSheet_Folder) {
    // Landing_Page
    $('#Landing_Page_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Landing_Page.css`);
    $('#CSS_Importer_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/CSS_Importer.css`);
    $('#Brand_Kit_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Brand_Kit.css`);

    // Map
    $('#Top_Bar_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Top_Bar.css`);
    $('#Browse_Areas_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Browse_Areas.css`);
    $('#Specific_Tags_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Specific_Tags.css`);
    $('#Filter_By_Type_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Filter_By_Type.css`);
    $('#Step_Progress_Bar_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Step_Progress_Bar.css`);
    $('#Billboard_Slideshow_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Billboard_Slideshow.css`);
    $('#Billboard_Info_Tabs_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Billboard_Info_Tabs.css`);
    $('#Maximized_Slideshow_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Maximized_Slideshow.css`);
    $('#Billboard_Info_Section_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Billboard_Info_Section.css`);
    $('#Billboard_Info_Checkbox_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Billboard_Info_Checkbox.css`);
    $('#Set_Campaign_Duration_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Set_Campaign_Duration.css`);
    $('#Preview_Media_Embedded_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Preview_Media_Embedded.css`);
    $('#Filter_By_Price_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Filter_By_Price.css`);
    $('#Get_Quote_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Get_Quote.css`);
    $('#Billboard_Description_News_Ticker_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Billboard_Description_News_Ticker.css`);
    $('#Parent_Final_Step_Message_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Parent_Final_Step_Message.css`);
    $('#Catalog_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Catalog.css`);
    $('#Ask_A_Question_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Ask_A_Question.css`);
    $('#Hidden_Billboard_Information_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Hidden_Billboard_Information.css`);
    $('#Voice_Control_StyleSheet').attr('href', `../StyleSheets/${StyleSheet_Folder}/Voice_Control.css`);

    //Add "_StyleSheet" at end of ID
}

//Add __StyleSheet
Switch_StyleSheets('Style_B');