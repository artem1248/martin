const PASSWORD = "martin2026";

const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const error = document.getElementById("error");

loginButton.addEventListener("click", login);

passwordInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        login();

    }

});

function login() {
    error.textContent = "";

    if (passwordInput.value !== PASSWORD) {

        error.textContent = "Невірний пароль";

        return;

    }

    showAdmin();

}

function showAdmin() {

    document.body.innerHTML = `

<div class="dashboard">

    <div class="topCard">

        <h1>🐶 Martin Admin</h1>

        <p>Керування сайтом</p>

    </div>

    <div class="menuGrid">

        <div class="adminCard" id="photosCard">

            <h2>📷 Фото</h2>

            <p>Керування фотографіями</p>

        </div>

        <div class="adminCard" id="videosCard">

            <h2>🎥 Відео</h2>

            <p>Керування відео</p>

        </div>

        <div class="adminCard" id="logoutCard">

            <h2>🚪 Вийти</h2>

            <p>Повернутися до входу</p>

        </div>

    </div>

</div>

`;

    document
        .getElementById("photosCard")
        .addEventListener("click", showPhotos);

    document
        .getElementById("videosCard")
        .addEventListener("click", showVideos);

    document
        .getElementById("logoutCard")
        .addEventListener("click", () => {

            location.reload();

        });

}

function showPhotos(){

document.body.innerHTML=`

<div class="dashboard">

<div class="topCard">

<h1>📷 Фото</h1>

<p>

Керування фотографіями

</p>

</div>

<div class="sectionBox">

<div class="sectionTop">

<h2>

Фотографії

</h2>

<button
id="addPhoto"
class="addButton">

+ Додати фото

</button>

</div>

<input
id="photoInput"
type="file"
accept="image/*"
multiple
hidden>

<div id="photoList"></div>

</div>

</div>

`;

initPhotos();
    loadPhotosFromSupabase();

}
function initPhotos(){

    const addButton = document.getElementById("addPhoto");
    const input = document.getElementById("photoInput");
    const list = document.getElementById("photoList");

    addButton.addEventListener("click",()=>{

        input.click();

    });

    input.addEventListener("change", async (e)=>{

        const files=[...e.target.files];
        const file = files[0];

if (!file) return;

const extension = file.name.split(".").pop();

const fileName = Date.now() + "." + extension;

const { data, error } = await window.db.storage
    .from("photos")
    .upload(fileName, file);

console.log("UPLOAD:", data);
console.log("ERROR:", error);
       if (!error) {

    const { data: urlData } = window.db.storage
        .from("photos")
        .getPublicUrl(fileName);

    const imageUrl = urlData.publicUrl;

    console.log(imageUrl);

    const { error: dbError } = await window.db
        .from("photos")
        .insert([
    {
        image_url: imageUrl,
        file_name: fileName
    }
]);

    console.log("DB ERROR:", dbError);
           if(!dbError){

    loadPhotosFromSupabase();

}

}
       console.log("Bucket:", window.db.storage.from("photos"));
       console.log(window.db);
        list.innerHTML="";

        if(files.length===0){

            list.innerHTML="<p>Поки що фотографій немає 🐾</p>";

            return;

        }

        files.forEach(file=>{

            const row=document.createElement("div");

            row.className="photoRow";

            const imageURL = URL.createObjectURL(file);

row.innerHTML = `
<div class="photoInfo">

<img src="${imageURL}">

<div>

<div class="photoName">

${file.name}

</div>

<div class="photoSize">

${Math.round(file.size/1024)} KB

</div>

</div>

</div>

<button class="deleteButton">

🗑

</button>
`;

            row.querySelector(".deleteButton").addEventListener("click",()=>{

                row.remove();

            });

            list.appendChild(row);

        });

    });

}
async function deletePhoto(photo){

    if(!confirm("Видалити фотографію?")){

        return;

    }
    console.log(photo);

    const fileName = photo.file_name;

    const { error: storageError } = await window.db.storage
        .from("photos")
        .remove([fileName]);
    console.log("STORAGE ERROR:", storageError);

    if(storageError){

        console.error(storageError);

        alert("Не вдалося видалити фото.");

        return;

    }
    const { data: before } = await window.db
    .from("photos")
    .select("*");

console.log("До удаления:", before);

    const { error: dbError } = await window.db
        .from("photos")
        .delete()
        .eq("id", photo.id);
    console.log("Удаляем ID:", photo.id);

const check = await window.db
    .from("photos")
    .select("*")
    .eq("id", photo.id);

console.log("После delete проверка:", check);
    console.log("DB ERROR:", dbError);

    if(dbError){

        console.error(dbError);

        alert("Не вдалося видалити запис.");

        return;

    }

    await loadPhotosFromSupabase();
    const { data: after } = await window.db
    .from("photos")
    .select("*");

console.log("После удаления:", after);

console.log("Удаление завершено");

}

async function loadPhotosFromSupabase(){

    const list = document.getElementById("photoList");

    list.innerHTML = "";

    const { data, error } = await window.db
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });
    console.log("VIDEOS:", data);
console.log("ERROR:", error);

    if(error){

        console.error(error);

        return;

    }

    data.forEach(photo=>{

        const row=document.createElement("div");

        row.className="photoRow";

        row.innerHTML=`

<div class="photoInfo">

<img src="${photo.image_url}">

<div>

<div class="photoName">

Фото

</div>

</div>

</div>

<button
class="deleteButton">

🗑

</button>

`;

        list.appendChild(row);
        row.querySelector(".deleteButton").addEventListener("click",()=>{

    deletePhoto(photo);

});

    });

}        

function showVideos(){

document.body.innerHTML=`

<div class="dashboard">

<div class="topCard">

<h1>🎥 Відео</h1>

<p>

Керування відео

</p>

</div>

<div class="sectionBox">

<div class="sectionTop">

<h2>

Відео

</h2>

<button
id="addVideo"
class="addButton">

+ Додати відео

</button>

</div>

<input
id="videoInput"
type="file"
accept="video/*"
hidden>

<input
id="posterInput"
type="file"
accept="image/*"
hidden>

<div style="margin:20px 0">

<button
id="chooseVideo"
class="addButton">

🎥 Обрати відео

</button>

<button
id="choosePoster"
class="addButton"
style="margin-left:10px">

🖼 Обрати обкладинку

</button>

<button
id="uploadVideo"
class="addButton"
style="margin-left:10px">

⬆ Завантажити

</button>

</div>

<div id="videoList"></div>

</div>

</div>

`;

initVideos();
loadVideosFromSupabase();

}
function initVideos(){

    const addButton = document.getElementById("addVideo");
const input = document.getElementById("videoInput");
const posterInput = document.getElementById("posterInput");

let selectedVideo = null;

    addButton.addEventListener("click",()=>{

        input.click();

    });

    input.addEventListener("change", async (e)=>{
        selectedVideo = e.target.files[0];

if(!selectedVideo) return;

posterInput.click();

return;

        const file = e.target.files[0];

        if(!file) return;

        const extension = file.name.split(".").pop();

        const fileName = Date.now() + "." + extension;

        // Загружаем в Storage
        const { error } = await window.db.storage
            .from("videos")
            .upload(fileName, file);

        console.log("VIDEO ERROR:", error);

        if(error) return;

        // Получаем публичную ссылку
        const { data: urlData } = window.db.storage
            .from("videos")
            .getPublicUrl(fileName);

        const videoUrl = urlData.publicUrl;

        // Записываем в таблицу videos
        const { error: dbError } = await window.db
            .from("videos")
            .insert([
                {
                    video_url: videoUrl,
                    file_name: fileName
                }
            ]);

        console.log("DB ERROR:", dbError);

        if(!dbError){

            loadVideosFromSupabase();

        }

    });

}
async function loadVideosFromSupabase(){

    const list = document.getElementById("videoList");

    list.innerHTML = "";

    const { data, error } = await window.db
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });

    if(error){

        console.error(error);

        return;

    }
    data.forEach(video => console.log(video));

    data.forEach(video=>{
        console.log(video.video_url);

        const row=document.createElement("div");

        row.className="photoRow";

       row.innerHTML = `

<div class="photoInfo">

    <video src="${video.video_url}" width="90" controls></video>

    <div>

        <div class="photoName">

            Відео

        </div>

    </div>

</div>

<button class="deleteButton">

🗑

</button>

`;

                list.appendChild(row);

        row.querySelector(".deleteButton").addEventListener("click",()=>{

            deleteVideo(video);

        });

    });

}
async function deleteVideo(video){

    if(!confirm("Видалити відео?")){
        return;
    }

    const { error: storageError } = await window.db.storage
        .from("videos")
        .remove([video.file_name]);

    if(storageError){
        console.error(storageError);
        alert("Не вдалося видалити відео.");
        return;
    }

    const { error: dbError } = await window.db
        .from("videos")
        .delete()
        .eq("id", video.id);

    if(dbError){
        console.error(dbError);
        alert("Не вдалося видалити запис.");
        return;
    }

    loadVideosFromSupabase();

}
