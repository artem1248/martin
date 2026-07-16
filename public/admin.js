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

<div id="photoList">

<p>

Поки що фотографій немає 🐾

</p>

</div>

</div>

</div>

`;

initPhotos();

}
function initPhotos(){

document

.getElementById("addPhoto")

.addEventListener("click",()=>{

document

.getElementById("photoInput")

.click();

});

document

.getElementById("photoInput")

.addEventListener("change",(e)=>{

const files=e.target.files;

alert("Вибрано "+files.length+" фото");

});

}

function showVideos() {

    alert("Відео (поки що в розробці)");

}
