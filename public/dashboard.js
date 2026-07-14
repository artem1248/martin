"use strict";

/* ==========================================
   AUTH
========================================== */

const isLogged = sessionStorage.getItem(
    "martin_admin"
);

if(isLogged!=="true"){

    window.location.href="admin.html";

}

/* ==========================================
   CARDS
========================================== */

const photosCard =
document.getElementById("photosCard");

const videosCard =
document.getElementById("videosCard");

const donationsCard =
document.getElementById("donationsCard");

photosCard?.addEventListener("click",()=>{

    alert("Фото — скоро 🚀");

});

videosCard?.addEventListener("click",()=>{

    alert("Відео — скоро 🚀");

});

donationsCard?.addEventListener("click",()=>{

    alert("Донати — скоро 🚀");

});
