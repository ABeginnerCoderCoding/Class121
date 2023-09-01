//https://teachablemachine.withgoogle.com/models/r7nW_hirc/
Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});
camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

    });
}
console.log("ml5 version:" ,ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/r7nW_hirc/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error ,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label
        prediction = results[0].label;
        speak();
        if(results[0].label == "Ok"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        else if(results[0].label == "Good"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        else if(results[0].label == "Victory"){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        else if(results[0].label == "Bad"){
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        else if(results[0].label == "Point right"){
            document.getElementById("update_emoji").innerHTML = "&#128073;";
        }
        else if(results[0].label == "Point Left"){
            document.getElementById("update_emoji").innerHTML = "&#128072;";
        }
        else if(results[0].label == "Point Up"){
            document.getElementById("update_emoji").innerHTML = "&#128070;"
        }
        else{
            document.getElementById("update_emoji").innerHTML = "&#128075";
        }
    }
}