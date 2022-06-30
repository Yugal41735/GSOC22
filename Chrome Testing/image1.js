// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL1 = "https://teachablemachine.withgoogle.com/models/maCzfIBx9/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL1 + "model.json";
    const metadataURL = URL1 + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}
    

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

var prediction;

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    prediction = await model.predict(webcam.canvas);
    
    // Condition for which image to be shown based on probability
    if (prediction[0].probability.toFixed(2)>0.5) {
        document.getElementById("img").src = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg";
    }
    if(prediction[1].probability.toFixed(2)>0.5){
        document.getElementById("img").src = "data:image/jpeg;base64,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";
    }

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}
