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

const adminContent =
document.getElementById("adminContent");

photosCard?.addEventListener("click",()=>{

    openPhotos();

});

videosCard?.addEventListener("click",()=>{

    alert("Відео — скоро 🚀");

});

donationsCard?.addEventListener("click",()=>{

    alert("Донати — скоро 🚀");

});
/* ==========================================
   PHOTOS
========================================== */

function openPhotos(){

    adminContent.innerHTML = `

        <div class="sectionBox">

            <div class="sectionTop">

                <h2>

                    📷 Фото

                </h2>

                <button
                id="addPhotoButton"
                class="addButton">

                    + Додати фото

                </button>

            </div>

            <div id="photoList">

                <p>

                    Фото ще не завантажені.

                </p>

            </div>

        </div>

    `;

}
