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

function showPhotos() {

    alert("Фото (поки що в розробці)");

}

function showVideos() {

    alert("Відео (поки що в розробці)");

}
