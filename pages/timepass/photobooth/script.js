/*
 * Photobooth
 * Ramon Morcillo @reymon359
 * ramonmorcillo.com
 */
const canvasBlank = document.createElement('canvas');
const video = document.querySelector('.player');
var canvas = document.getElementById('photoCanvas');
var ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
var img = document.getElementById('img');


const alphaNumber = document.querySelector('.alphaContainer input');

let redEffectBoolean = false;
let rgbSplitBoolean = false;


//add constraints object
var constraints = {
    audio: true,
    video: true
};

video.onloadeddata = function() {
    canvas.width = $('video').width();
    canvas.height = $('video').height();
    var bkGround = new Image();
    bkGround.onload = function() {
        ctx.drawImage(bkGround, 0, 0, $('video').width(), $('video').height());
        // img.src = canvas.toDataURL('image/jpg');
    }
    bkGround.src = 'frame.png';
};



function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            console.log(localMediaStream);

            //  DEPRECIATION :
            //       The following has been depreceated by major browsers as of Chrome and Firefox.
            //       video.src = window.URL.createObjectURL(localMediaStream);
            //       Please refer to these:
            //       Depreceated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
            //       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject

            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error(`OH NO!!!`, err);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        // mess with them
        if (redEffectBoolean) {
            pixels = redEffect(pixels);
        }
        if (rgbSplitBoolean) {
            pixels = rgbSplit(pixels);
        }
        ctx.globalAlpha = alphaNumber.value;

        pixels = greenScreen(pixels);
        // put them back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    // played the sound
    snap.currentTime = 0;
    snap.play();
    canvasBlank.width = video.videoWidth;
    canvasBlank.height = video.videoHeight;
    var canvasBlankContext = canvasBlank.getContext('2d');
    canvasBlankContext.save();
    canvasBlankContext.scale(-1, 1);
    canvasBlankContext.drawImage(video, 0, 0, canvasBlank.width * -1, canvasBlank.height);
    canvasBlankContext.restore();
    // prompt2.style.display = 'none'
    var data = canvasBlank.toDataURL('image/png');
    img.src = data;
    img.style.display = 'block';
    var leftOffset = (canvas.width - canvas.width * 0.84)/2;
    var topOffset = (canvas.height - canvas.height * 0.84)/2;

    img.onload = function() {    
        ctx.drawImage(img, leftOffset, topOffset, canvas.width * 0.84, canvas.height * 0.84);        
    }
    img.style.display = 'none';
    document.getElementById('download').classList.remove("disabled");
}

function downloadPhoto(){
    var link = document.createElement('a');
    link.download = 'manishjoy.github.io-photobooth-' + Date.now() + '.png';
    link.href = document.getElementById('photoCanvas').toDataURL()
    link.click();
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin &&
            green >= levels.gmin &&
            blue >= levels.bmin &&
            red <= levels.rmax &&
            green <= levels.gmax &&
            blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

getVideo();

// video.addEventListener('canplay', paintToCanvas);