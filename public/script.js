/* ==========================================
   MARTIN
========================================== */

"use strict";

/* ==========================================
   DOM
========================================== */

const menuButton =
document.getElementById("menuButton");

const sideMenu =
document.getElementById("sideMenu");

const menuOverlay =
document.getElementById("menuOverlay");

const closeMenu =
document.getElementById("closeMenu");

const supportButton =
document.getElementById("supportButton");

const donateOverlay =
document.getElementById("donateOverlay");

const closeDonate =
document.getElementById("closeDonate");

const openDonate =
document.getElementById("openDonate");

const goDonate =
document.getElementById("goDonate");

const sendDonate =
document.getElementById("sendDonate");

const accordionButton =
document.getElementById("aboutToggle");

const accordionContent =
document.getElementById("accordionContent");

const accordionArrow =
document.getElementById("accordionArrow");

const photoViewer =
document.getElementById("photoViewer");

const viewerImage =
document.getElementById("viewerImage");

const closeViewer =
document.getElementById("closeViewer");

const loader =
document.getElementById("loader");

const photoSlider =
document.getElementById("photoSlider");

const videoSlider =
document.getElementById("videoSlider");

const friendsList =
document.getElementById("friendsList");

/* ==========================================
   MENU
========================================== */

function openMenu(){

sideMenu.classList.add("open");

menuOverlay.classList.add("open");

document.body.style.overflow="hidden";

}

function closeSideMenu(){

sideMenu.classList.remove("open");

menuOverlay.classList.remove("open");

document.body.style.overflow="";

}

menuButton.onclick=openMenu;

closeMenu.onclick=closeSideMenu;

menuOverlay.onclick=closeSideMenu;
/* ==========================================
   DONATE
========================================== */

function openDonateWindow(){

    donateOverlay.style.display="flex";

    document.body.style.overflow="hidden";

}

function closeDonateWindow(){

    donateOverlay.style.display="none";

    document.body.style.overflow="";

}

supportButton.addEventListener(

    "click",

    openDonateWindow

);

openDonate.addEventListener(

    "click",

    openDonateWindow

);

closeDonate.addEventListener(

    "click",

    closeDonateWindow

);

donateOverlay.addEventListener(

    "click",

    (event)=>{

        if(event.target===donateOverlay){

            closeDonateWindow();

        }

    }

);

/* ==========================================
   ACCORDION
========================================== */

function toggleAccordion(){

    accordionContent.classList.toggle("open");

    accordionArrow.classList.toggle("rotate");

}

accordionButton.addEventListener(

    "click",

    toggleAccordion

);

/* ==========================================
   PHOTO VIEWER
========================================== */

function openViewer(src){

    viewerImage.src=src;

    photoViewer.style.display="flex";

    document.body.style.overflow="hidden";

}

function closePhotoViewer(){

    photoViewer.style.display="none";

    viewerImage.src="";

    document.body.style.overflow="";

}

closeViewer.addEventListener(

    "click",

    closePhotoViewer

);

photoViewer.addEventListener(

    "click",

    (event)=>{

        if(event.target===photoViewer){

            closePhotoViewer();

        }

    }

);
.rotate{

transform:rotate(180deg);

}
/* ==========================================
   PHOTOS
========================================== */

async function loadPhotos(){

    try{

        const response=await fetch(

            "data/photos.json"

        );

        const photos=await response.json();

        photoSlider.innerHTML="";

        photos.forEach(photo=>{

            const card=document.createElement("div");

            card.className="photoCard";

            card.innerHTML=`

                <img
                src="${photo.image}"
                alt="Martin">

            `;

            card.addEventListener(

                "click",

                ()=>openViewer(photo.image)

            );

            photoSlider.appendChild(card);

        });

    }catch(error){

        console.error(error);

    }

}

/* ==========================================
   VIDEOS
========================================== */

async function loadVideos(){

    try{

        const response=await fetch(

            "data/videos.json"

        );

        const videos=await response.json();

        videoSlider.innerHTML="";

        videos.forEach(video=>{

            const card=document.createElement("div");

            card.className="videoCard";

            card.innerHTML=`

<div class="videoPreview">

<img
src="${video.image}"
alt="">

<div class="videoDuration">

${video.duration}

</div>

</div>

<div class="videoInfo">

<h3>

${video.title}

</h3>

<p>

${video.views}

</p>

</div>

`;

            videoSlider.appendChild(card);

        });

    }catch(error){

        console.error(error);

    }

}
/* ==========================================
   SUPPORTERS
========================================== */

async function loadSupporters(){

    try{

        const response = await fetch("/api/donations");

        const supporters = await response.json();

        friendsList.innerHTML = "";

        if(!supporters.length){

            friendsList.innerHTML = `

<div class="friendCard">

<div class="friendName">

Поки що нікого ❤️

</div>

<div class="friendAmount">

—

</div>

</div>

`;

            return;

        }

        supporters.forEach(item=>{

            if(!item.visible) return;

            const card=document.createElement("div");

            card.className="friendCard";

            card.innerHTML=`

<div class="friendName">

${item.nickname}

</div>

<div class="friendAmount">

${item.amount} грн

</div>

`;

            friendsList.appendChild(card);

        });

    }

    catch(error){

        console.error(error);

    }

}

/* ==========================================
   SEND DONATION
========================================== */

async function sendDonation(){

    const nickname=document
        .getElementById("nickname")
        .value
        .trim();

    const amount=document
        .getElementById("amount")
        .value
        .trim();

    const visible=document
        .getElementById("showName")
        .checked;

    if(!nickname){

        alert("Введіть нік ❤️");

        return;

    }

    if(!amount){

        alert("Введіть суму ❤️");

        return;

    }

    try{

        const response=await fetch(

            "/api/donations",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    nickname,

                    amount,

                    visible

                })

            }

        );

        const result=await response.json();

        if(result.success){

            alert(

                "❤️ Дякуємо за підтримку!"

            );

            closeDonateWindow();

            loadSupporters();

        }

        else{

            alert(

                "Помилка відправки."

            );

        }

    }

    catch(error){

        console.error(error);

    }

}

sendDonate.addEventListener(

    "click",

    sendDonation

);
/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hide");

        setTimeout(() => {

            loader.remove();

        }, 500);

    }, 1200);

});

/* ==========================================
   SOCIAL LINKS
========================================== */

const socials={

    tiktok:CONFIG.tiktok,

    instagram:CONFIG.instagram,

    youtube:CONFIG.youtube,

    telegram:CONFIG.telegram

};

function openSocial(link){

    if(!link) return;

    window.open(

        link,

        "_blank"

    );

}

document
.getElementById("tiktokBtn")
.addEventListener(

    "click",

    ()=>openSocial(

        socials.tiktok

    )

);

document
.getElementById("instagramBtn")
.addEventListener(

    "click",

    ()=>openSocial(

        socials.instagram

    )

);

document
.getElementById("youtubeBtn")
.addEventListener(

    "click",

    ()=>openSocial(

        socials.youtube

    )

);

document
.getElementById("telegramBtn")
.addEventListener(

    "click",

    ()=>openSocial(

        socials.telegram

    )

);

goDonate.addEventListener(

    "click",

    ()=>{

        if(CONFIG.donate){

            window.open(

                CONFIG.donate,

                "_blank"

            );

        }

    }

);

/* ==========================================
   INIT
========================================== */

loadPhotos();

loadVideos();

loadSupporters();
