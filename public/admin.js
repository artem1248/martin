"use strict";

const PASSWORD = "martin2026";

const input = document.getElementById("password");
const button = document.getElementById("loginButton");
const error = document.getElementById("error");

button.addEventListener("click", login);

input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        login();

    }

});

function login(){

    if(input.value === PASSWORD){

        sessionStorage.setItem(
            "martin_admin",
            "true"
        );

        window.location.href =
            "dashboard.html";

        return;

    }

    error.textContent =
        "Невірний пароль";

    input.value = "";

    input.focus();

}
