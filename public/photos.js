function initPhotos(){

    const addButton = document.getElementById("addPhoto");
    const input = document.getElementById("photoInput");
    const list = document.getElementById("photoList");

    addButton.addEventListener("click",()=>{

        input.click();

    });

    input.addEventListener("change",handlePhotoSelect);

}
async function handlePhotoSelect(e){

    const files=[...e.target.files];

    console.log(files);

}
