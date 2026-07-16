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

}

async function logout(){

    await supabase.auth.signOut();

    location.reload();

}
