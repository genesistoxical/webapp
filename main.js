const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let img = new Image();
let fileName = '';

const uploadFile = document.getElementById('upload-file');
const downloadBtn = document.getElementById('download-btn');
const revertBtn = document.getElementById('revert-btn');

//Uploading the File in the Canvas
uploadFile.addEventListener('change', (e) => {
    const file = document.getElementById('upload-file').files[0];
    //Init the File Reader API
    const reader = new FileReader();
    //Check for the file and set the file name
    if (file) {
        fileName = file.name;
        //Read the data as the URL
        reader.readAsDataURL(file);
    }
    //Add Image to the Canvas
    reader.addEventListener('load', () => {
            //Create Image
            img = new Image();
            //Set src
            img.src = reader.result;
            //On Image Load, Add the Image to the Canvas
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);
                canvas.removeAttribute('data-caman-id');
            };
        },
        false);
});

//Downloading the File
downloadBtn.addEventListener('click', (e) => {
    //Get the File Ext
    const fileExtension = fileName.slice(-4);
    //Init New File
    let newFileName;
    //Check image type
    if (fileExtension === '.jpg' || fileExtension === 'png') {
        newFileName = fileName.substring(0, fileName.length - 4) + '-edited.jpg';
    }
    //Call Download
    download(canvas, newFileName);
});

//Download Function
function download(canvas, filename) {
    //init event
    let e;
    //Create link
    const link = document.createElement('a');
    //Set props
    link.download = filename;
    link.href = canvas.toDataURL('image/jpeg', 0.8);
    //New Mouse Event
    e = new MouseEvent('click');
    //Dispatch event
    link.dispatchEvent(e);
}


//Adding the Filters and Effects
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        if (e.target.classList.contains('brightness-add')) {
            Caman('#canvas', img, function () {
                this.brightness(10).render();
            });
        } else if (e.target.classList.contains('brightness-remove')) {
            Caman('#canvas', img, function () {
                this.brightness(-10).render();
            });
        } else if (e.target.classList.contains('contrast-add')) {
            Caman('#canvas', img, function () {
                this.contrast(10).render();
            });
        } else if (e.target.classList.contains('contrast-remove')) {
            Caman('#canvas', img, function () {
                this.contrast(-10).render();
            });
        } else if (e.target.classList.contains('saturation-add')) {
            Caman('#canvas', img, function () {
                this.saturation(10).render();
            });
        } else if (e.target.classList.contains('saturation-remove')) {
            Caman('#canvas', img, function () {
                this.saturation(-10).render();
            });
        } else if (e.target.classList.contains('vibrance-add')) {
            Caman('#canvas', img, function () {
                this.vibrance(10).render();
            });
        } else if (e.target.classList.contains('vibrance-remove')) {
            Caman('#canvas', img, function () {
                this.vibrance(-10).render();
            });
        } else if (e.target.classList.contains('vintage-add')) {
            Caman('#canvas', img, function () {
                this.vintage().render();
            });
        } else if (e.target.classList.contains('lomo-add')) {
            Caman('#canvas', img, function () {
                this.lomo().render();
            });
        } else if (e.target.classList.contains('clarity-add')) {
            Caman('#canvas', img, function () {
                this.clarity().render();
            });
        } else if (e.target.classList.contains('sincity-add')) {
            Caman('#canvas', img, function () {
                this.sinCity().render();
            });
        } else if (e.target.classList.contains('crossprocess-add')) {
            Caman('#canvas', img, function () {
                this.crossProcess().render();
            });
        } else if (e.target.classList.contains('pinhole-add')) {
            Caman('#canvas', img, function () {
                this.pinhole().render();
            });
        } else if (e.target.classList.contains('nostalgia-add')) {
            Caman('#canvas', img, function () {
                this.nostalgia().render();
            });
        } else if (e.target.classList.contains('hermajesty-add')) {
            Caman('#canvas', img, function () {
                this.herMajesty().render();
            });
        }
    };
});

//Revert Filters
revertBtn.addEventListener('click', (e) => {
    Caman('#canvas', img, function () {
        this.revert();
    });
});