var Billboard_Owner_Data = window.Billboard_Owner_Data;
//var Arr_Campaign_Only_Marker_ID = ["0", "1", "2", "3","4","5"];
//var Campaign_Duration = 5;
var Email_Object = {};
//var Desired_Campaign_Start_Date = "2023-04-01";
var Each_Email_Body;
var Arr_Final_Email_Bodies = [];
var Arr_Final_Email_Objects = [];

Init_Email_Data();

function Get_Owner_Name_By_ID(ownerId) {
    const ownerData = Billboard_Owner_Data.find(owner => owner.Owner_ID == ownerId);
    return ownerData.Owner_Name;
}

function Init_Email_Data() {
    Get_Campaign_Duration_Val();
    Populate_Arr_Only_Marker_ID();

    Arr_Unique_Owner_ID = Get_Unique_Owner_ID(Arr_Campaign_Only_Marker_ID);
    log("Arr_Unique_Owner_ID: " + Arr_Unique_Owner_ID);
    log("Desired_Campaign_Start_Date: " + Desired_Campaign_Start_Date);

    const Arr_Billboard_Location_By_Owner = Group_Billboard_Location_By_Owner(Arr_Campaign_Only_Marker_ID);

    Arr_Unique_Owner_ID.forEach(ownerId => {
        const ownerName = Get_Owner_Name_By_ID(ownerId);
        const ownerLastName = ownerName.split(' ')[1];
        const billboardLocations = Arr_Billboard_Location_By_Owner[ownerId];
        const ownerEmail = Get_Owner_Email_By_ID(ownerId);


        let billboardList = "";
        billboardLocations.forEach(location => {
            billboardList += location + "\n";
        });

        Each_Email_Body =
            `Felis dia Mr ${ownerLastName},
            
I'm interested in renting the following billboard(s) for ${Campaign_Duration} months.
${billboardList}
Will they be available for ${Desired_Campaign_Start_Date} ?
Would you also be able to provide me with an official quotation?

Many thanks.
Felis dia
    `;
        Email_Object = {
            Recipient_Email: ownerEmail,
            Email_Body: Each_Email_Body
        };
        Arr_Final_Email_Objects.push(Email_Object);

    });
    console.log(Arr_Final_Email_Objects);

}

function Get_Owner_Email_By_ID(ownerId) {
    const ownerData = Billboard_Owner_Data.find(owner => owner.Owner_ID == ownerId);
    return ownerData.Email;
}

function Group_Billboard_Location_By_Owner(Arr_Campaign_Only_Marker_ID) {
    var billboardData = window.Map_Data;
    var groupedData = {};
    var filteredData = billboardData.filter(item => Arr_Campaign_Only_Marker_ID.includes(item.properties.Marker_ID));

    filteredData.forEach(item => {
        var ownerId = item.properties.Owner_ID;
        if (!groupedData[ownerId]) {
            groupedData[ownerId] = [];
        }
        groupedData[ownerId].push(item.properties.Billboard_Location);
    });

    return groupedData;

}