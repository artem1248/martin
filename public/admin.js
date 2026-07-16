const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const error = document.getElementById("error");

checkLogin();

loginButton.addEventListener("click", login);

passwordInput.addEventListener("keydown", (e)=>{

    if(e.key==="Enter"){

        login();

    }

});

async function login(){

    error.textContent="";

    const { error: loginError } =
        await supabase.auth.signInWithPassword({

            email: emailInput.value.trim(),

            password: passwordInput.value

        });

    if(loginError){

        error.textContent="Невірний email або пароль";

        return;

    }

    showAdmin();

}

async function checkLogin(){

    const {

        data:{session}

    }=await supabase.auth.getSession();

    if(session){

        showAdmin();

    }

}

function showAdmin(){

    document.body.innerHTML=`

<div class="dashboard">

<div class="topCard">

<h1>🐶 Martin Admin</h1>

<p>

Керування сайтом

</p>

</div>

<div class="menuGrid">

<div class="adminCard" id="photosCard">

<h2>📷 Фото</h2>

<p>

Завантаження та видалення фотографій

</p>

</div>

<div class="adminCard" id="videosCard">

<h2>🎥 Відео</h2>

<p>

Завантаження та видалення відео

</p>

</div>

<div class="adminCard" id="logoutCard">

<h2>🚪 Вийти</h2>

<p>

Завершити сеанс

</p>

</div>

</div>

</div>

`;

document
.getElementById("logoutCard")
.addEventListener("click",logout);
    document
.getElementById("photosCard")
.addEventListener("click",showPhotos);

document
.getElementById("videosCard")
.addEventListener("click",showVideos);

}
function showPhotos(){

document.body.innerHTML=`

<div class="dashboard">

<div class="topCard">

<h1>📷 Фото</h1>

<p>Керування фотографіями</p>

</div>

<div class="sectionBox">

<div class="sectionTop">

<h2>Фотографії</h2>

<button
id="uploadPhotos"
class="addButton">

+ Додати

</button>

<input
id="photoInput"
type="file"
accept="image/*"
multiple
hidden>

</div>

<div id="photoList">

Поки що тут порожньо 🐶

</div>

</div>

</div>

`;

}

function showVideos(){

document.body.innerHTML=`

<div class="dashboard">

<div class="topCard">

<h1>🎥 Відео</h1>

<p>Керування відео</p>

</div>

<div class="sectionBox">

<div class="sectionTop">

<h2>Відео</h2>

<button class="addButton">

+ Додати

</button>

</div>

<div>

Поки що тут порожньо 🐶

</div>

</div>

</div>

`;
    document
.getElementById("uploadPhotos")
.addEventListener("click",()=>{

document
.getElementById("photoInput")
.click();

});
    document
.getElementById("photoInput")
.addEventListener("change",(e)=>{

console.log(e.target.files);

});

}

async function logout(){

    await supabase.auth.signOut();

    location.reload();

}
