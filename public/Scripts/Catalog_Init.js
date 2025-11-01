var log = console.log;
log("lloooj");
var HTML_Bones_Catalog_Card;
for (let index = 1; index < 10; index++) {
    HTML_Bones_Catalog_Card = `
    <div class="Parent_Catalog_Card">
        <img id="Catalog_Image_1" class="Catalog_Image Non_Drag_Image" src="../Media/Catalog/${index}.jpeg">
        <div class="Parent_Information_Text">
            <div class="Catalog_Billboard_Location_Content" id="Catalog_Billboard_Location_Content_ID_1">Mahuma</div>
            <div class="Catalog_Billboard_Price" id="Catalog_Billboard_Price_ID_1">FL ${index*5}${index*2}</div>
        </div>
    </div>`

    $('.Parent_Catalog').prepend(HTML_Bones_Catalog_Card);
}