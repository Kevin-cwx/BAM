var log = console.log;

const HTML_Parent_Container_Direct_Media = `
<div class="Parent_Container_Direct_Media">
            <h2 class="Preview_Media_Header">Preview Billboard Media</h2>
        </div>`;

const HTML_Parent_Container_Upload_Media = `<div class="Parent_Container_Upload_Media">

<div class="Button" id="Skip_Preview_Media" onclick="Skip_Preview_Media()">Skip this step</div>

<input class="Button" type="file" id="imageInput" accept="image/*">
<button class="Button" id="processImages" onclick="processImages()">Process Images</button>

<div>
    <img id="Advertisement_Image" alt="Ad Image">
</div>

<div >
    <h2 class="Preview_Media_Header">Preview Media</h2>
    <!-- <canvas id="resultCanvas" width="500" height="500"></canvas> -->
    <div id="resultContainer"></div>
</div>


</div>`;



















// Show Upload Media or Show Direct Media
var Media_Selection = "d";
switch (Media_Selection) {
    // Upload Media
    case "u":
        toggleElementsVisibility('Parent_Container_Direct_Media', 'Parent_Container_Upload_Media');
        $('.Parent_Preview_Media').prepend(HTML_Parent_Container_Upload_Media);
        break;
    // Direct Media
    case "d":
        toggleElementsVisibility('Parent_Container_Upload_Media', 'Parent_Container_Direct_Media');
        $('.Parent_Preview_Media').prepend(HTML_Parent_Container_Direct_Media);
        Add_Image_To_Direct_Media_Container();
        break;
    case "v":
        toggleElementsVisibility('Parent_Container_Direct_Media', 'Parent_Container_Video_Preview');
        toggleElementsVisibility('Parent_Container_Upload_Media', '');
        $('.Parent_Preview_Media').prepend(HTML_Parent_Container_Video_Preview);
        break;
    default:
}

//Because elements were not yet loaded
// try{

//     const imageInput = document.getElementById('imageInput');
//     const adImage = document.getElementById('Advertisement_Image');
//     const resultContainer = document.getElementById('resultContainer');

// }catch(error){

// }

/*

var User_Uploaded_Image = false;
imageInput.addEventListener('change', handleImageUpload);

function handleImageUpload() {
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            adImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = url;
        User_Uploaded_Image = true;
    });
}

var processImages_Ran_Successful =false;
async function processImages() {
    log("in processImages");
    $(".Parent_Container_Upload_Media").height(1900);
    const billboardImageInfo = [
        { url: "../Media/Billboard_Images/Preview_Media/Empty_Billboard_Images/1.jpeg", x: 10, y: 20, width: 150, height: 150 },
        { url: "../Media/Billboard_Images/Preview_Media/Empty_Billboard_Images/2.jpeg", x: 50, y: 30, width: 120, height: 120 },
        { url: "../Media/Billboard_Images/Preview_Media/Empty_Billboard_Images/3.jpeg", x: 30, y: 40, width: 100, height: 100 },
        { url: "../Media/Billboard_Images/Preview_Media/Empty_Billboard_Images/4.jpeg", x: 200, y: 10, width: 400, height: 200 },
    ];

    // resultContainer.innerHTML = ''; // Clear previous content

    // Load adImage and all billboardImages
    const [adLoaded, ...billboardImagesLoaded] = await Promise.all([
        loadImage(adImage.src),
        ...billboardImageInfo.map(info => loadImage(info.url))
    ]);

    for (let i = 0; i < billboardImagesLoaded.length; i++) {
        const billboardImage = billboardImagesLoaded[i];
        const info = billboardImageInfo[i];

        const billboardContainer = document.createElement('span');
        billboardContainer.classList.add('billboard-container');

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = billboardImage.width;
        canvas.height = billboardImage.height;

        // Draw the billboard image on the canvas
        ctx.drawImage(billboardImage, 0, 0);

        // Calculate the new size for ad image to have a 16:9 ratio
        const aspectRatio = 16 / 9;
        const adWidth = info.width;
        const adHeight = adWidth / aspectRatio;

        // Draw the ad image on top of the billboard image with specific coordinates and new size
        ctx.drawImage(adLoaded, info.x, info.y, adWidth, adHeight);

        // Set the canvas as the content of the billboard container
        billboardContainer.appendChild(canvas);

        // Append the billboard container to the result container
        resultContainer.appendChild(billboardContainer);
    }

    // window.scrollTo({
    //     top: document.body.scrollHeight,
    //     behavior: 'smooth',
    // });
    processImages_Ran_Successful = true;

}
*/

function Add_Image_To_Direct_Media_Container() {
    const numberOfImages = 5;

    // Base path for the images
    const basePath = "../Media/Billboard_Images/M11/";
    // Reference to the parent container
    const parentContainer = document.querySelector('.Parent_Container_Direct_Media');

    // Loop to add images
    for (let i = 1; i <= numberOfImages; i++) {
        // Construct the image source path
        const imagePath = `${basePath}${i}.jpeg`;

        // Create an image element
        const imgElement = document.createElement('img');

        // Set the src attribute of the image
        imgElement.src = imagePath;

        // Add the class Preview_Edited_Advertisement_Image to the image
        imgElement.classList.add('Preview_Edited_Advertisement_Image');
        imgElement.classList.add('Non_Drag_Image');

        // Append the image to the parent container
        parentContainer.appendChild(imgElement);
    }
}

// Init Hide
toggleElementsVisibility('Parent_Preview_Media', '');
//toggleElementsVisibility('Parent_Container_Upload_Media', '');
//toggleElementsVisibility('Parent_Container_Direct_Media', '');


