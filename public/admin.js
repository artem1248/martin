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

    const imageUrl = photo.image_url;

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
    console.log("DB ERROR:", dbError);

    if(dbError){

        console.error(dbError);

        alert("Не вдалося видалити запис.");

        return;

    }

    loadPhotosFromSupabase();
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

function showVideos() {

    alert("Відео (поки що в розробці)");

}
