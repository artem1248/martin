"use strict";

/* ==========================================
   DOM
========================================== */

const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");
const closeMenu = document.getElementById("closeMenu");

const supportButton = document.getElementById("supportButton");
const openDonate = document.getElementById("openDonate");
const donateOverlay = document.getElementById("donateOverlay");
const closeDonate = document.getElementById("closeDonate");
const goDonate = document.getElementById("goDonate");
const sendDonate = document.getElementById("sendDonate");

const accordionButton = document.getElementById("aboutToggle");
const accordionContent = document.getElementById("accordionContent");
const accordionArrow = document.getElementById("accordionArrow");

const photoViewer = document.getElementById("photoViewer");
const viewerImage = document.getElementById("viewerImage");
const closeViewer = document.getElementById("closeViewer");

const loader = document.getElementById("loader");

const photoSlider = document.getElementById("photoSlider");
const videoSlider = document.getElementById("videoSlider");
const friendsList = document.getElementById("friendsList");

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

menuButton?.addEventListener("click",openMenu);

closeMenu?.addEventListener("click",closeSideMenu);

menuOverlay?.addEventListener("click",closeSideMenu);

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

supportButton?.addEventListener(
    "click",
    openDonateWindow
);

openDonate?.addEventListener(
    "click",
    openDonateWindow
);

closeDonate?.addEventListener(
    "click",
    closeDonateWindow
);

donateOverlay?.addEventListener("click",(event)=>{

    if(event.target===donateOverlay){

        closeDonateWindow();

    }

});
/* ==========================================
   ACCORDION
========================================== */

function toggleAccordion(){

    accordionContent.classList.toggle("open");

    accordionArrow.classList.toggle("rotate");

}

accordionButton?.addEventListener(
    "click",
    toggleAccordion
);

/* ==========================================
   PHOTO VIEWER
========================================== */

function openViewer(src){

    viewerImage.src = src;

    photoViewer.style.display = "flex";

    document.body.style.overflow = "hidden";

}

function closePhotoViewer(){

    photoViewer.style.display = "none";

    viewerImage.src = "";

    document.body.style.overflow = "";

}

closeViewer?.addEventListener(
    "click",
    closePhotoViewer
);

photoViewer?.addEventListener("click",(event)=>{

    if(event.target===photoViewer){

        closePhotoViewer();

    }

});

/* ==========================================
   IMAGE PRELOAD
========================================== */

function preloadImage(src){

    return new Promise(resolve=>{

        const image = new Image();

        image.onload = resolve;

        image.onerror = resolve;

        image.src = src;

    });

}

/* ==========================================
   LOADER
========================================== */

window.addEventListener("load",()=>{

    if(!loader) return;

    setTimeout(()=>{

        loader.classList.add("hide");

        setTimeout(()=>{

            loader.remove();

        },500);

    },1200);

});
/* ==========================================
   PHOTOS
========================================== */

async function loadPhotos(){

    try{

        const response = await fetch(
            "data/photos.json"
        );

        const photos = await response.json();

        if(!photoSlider) return;

        photoSlider.innerHTML = "";

        for(const photo of photos){

            await preloadImage(photo.image);

            const card = document.createElement("div");

            card.className = "photoCard";

            card.innerHTML = `

<img
src="${photo.image}"
alt="Martin">

`;

            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";

            card.addEventListener(
                "click",
                ()=>openViewer(photo.image)
            );

            photoSlider.appendChild(card);

            requestAnimationFrame(()=>{

                card.style.transition =
                    ".35s ease";

                card.style.opacity = "1";

                card.style.transform =
                    "translateY(0)";

            });

        }

    }

    catch(error){

        console.error(
            "Photos:",
            error
        );

    }

}
/* ==========================================
   VIDEOS
========================================== */

async function loadVideos(){

    try{

        const response = await fetch(
            "data/videos.json"
        );

        const videos = await response.json();

        if(!videoSlider) return;

        videoSlider.innerHTML = "";

        for(const video of videos){

            await preloadImage(video.image);

            const card = document.createElement("div");

            card.className = "videoCard";

            card.innerHTML = `

<div class="videoPreview">

    <img
    src="${video.image}"
    alt="${video.title}">

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

            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";

            if(video.url){

                card.addEventListener("click",()=>{

                    window.open(
                        video.url,
                        "_blank"
                    );

                });

            }

            videoSlider.appendChild(card);

            requestAnimationFrame(()=>{

                card.style.transition=".35s ease";

                card.style.opacity="1";

                card.style.transform="translateY(0)";

            });

        }

    }

    catch(error){

        console.error(
            "Videos:",
            error
        );

    }

}
/* ==========================================
   SUPPORTERS
========================================== */

async function loadSupporters(){

    if(!friendsList) return;

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

        console.error("Supporters:", error);

    }

}

/* ==========================================
   SOCIAL LINKS
========================================== */

function openSocial(link){

    if(!link) return;

    window.open(link,"_blank");

}

document.getElementById("tiktokBtn")
    ?.addEventListener("click",e=>{

        e.preventDefault();

        openSocial(CONFIG.tiktok);

});

document.getElementById("instagramBtn")
    ?.addEventListener("click",e=>{

        e.preventDefault();

        openSocial(CONFIG.instagram);

});

document.getElementById("youtubeBtn")
    ?.addEventListener("click",e=>{

        e.preventDefault();

        openSocial(CONFIG.youtube);

});

document.getElementById("telegramBtn")
    ?.addEventListener("click",e=>{

        e.preventDefault();

        openSocial(CONFIG.telegram);

});

if (goDonate && CONFIG.donate) {

    goDonate.href = CONFIG.donate;

    goDonate.target = "_blank";

    goDonate.rel = "noopener noreferrer";

}

/* ==========================================
   INIT
========================================== */

loadPhotos();

loadVideos();

loadSupporters();
