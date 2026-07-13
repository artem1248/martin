// ==========================
// ELEMENTS
// ==========================

const loader = document.getElementById("loader");

const popup = document.getElementById("welcomeOverlay");
const popupClose = document.getElementById("popupClose");
const popupNever = document.getElementById("popupNever");

const donateOverlay = document.getElementById("donateOverlay");
const openDonate = document.getElementById("openDonate");
const closeDonate = document.getElementById("closeDonate");

const goDonate = document.getElementById("goDonate");
const sendDonate = document.getElementById("sendDonate");

const nickname = document.getElementById("nickname");
const amount = document.getElementById("amount");
const showName = document.getElementById("showName");

const friendsList = document.getElementById("friendsList");

const tiktokBtn = document.getElementById("tiktokBtn");
const instagramBtn = document.getElementById("instagramBtn");
const youtubeBtn = document.getElementById("youtubeBtn");
const telegramBtn = document.getElementById("telegramBtn");

// ==========================
// LOADER
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        },700);

    },1800);

});

// ==========================
// WELCOME
// ==========================

if(localStorage.getItem("martinPopupHidden")){

    popup.style.display="none";

}

popupClose.onclick=()=>{

    popup.style.display="none";

}

popupNever.onclick=()=>{

    localStorage.setItem(

        "martinPopupHidden",

        "true"

    );

    popup.style.display="none";

};

// ==========================
// SOCIAL
// ==========================

function openLink(link){

    if(!link) return;

    window.open(

        link,

        "_blank"

    );

}

tiktokBtn.onclick=(e)=>{

    e.preventDefault();

    openLink(CONFIG.tiktok);

};

instagramBtn.onclick=(e)=>{

    e.preventDefault();

    openLink(CONFIG.instagram);

};

youtubeBtn.onclick=(e)=>{

    e.preventDefault();

    openLink(CONFIG.youtube);

};

telegramBtn.onclick=(e)=>{

    e.preventDefault();

    openLink(CONFIG.telegram);

};

// ==========================
// DONATE
// ==========================

openDonate.onclick=()=>{

    donateOverlay.style.display="flex";

};

closeDonate.onclick=()=>{

    donateOverlay.style.display="none";

};

goDonate.onclick=(e)=>{

    e.preventDefault();

    openLink(CONFIG.donate);

};

// ==========================
// SEND DONATION
// ==========================

async function sendDonation(){

    if(

        nickname.value.trim()===""

    ){

        alert("Введіть свій нік ❤️");

        return;

    }

    if(

        amount.value.trim()===""

    ){

        alert("Введіть суму ❤️");

        return;

    }

    try{

        const response=

        await fetch(

            "/api/donations",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    nickname:nickname.value.trim(),

                    amount:amount.value.trim(),

                    visible:showName.checked

                })

            }

        );

        const result=

        await response.json();

        if(result.success){

            nickname.value="";

            amount.value="";

            donateOverlay.style.display="none";

            loadSupporters();

            alert("❤️ Дякуємо за підтримку Мартіна!");

        }

    }catch(error){

        console.log(error);

        alert("Помилка відправки.");

    }

}

sendDonate.onclick=sendDonation;
// ==========================
// LOAD SUPPORTERS
// ==========================

async function loadSupporters(){

    try{

        const response=await fetch("/api/donations");

        const data=await response.json();

        friendsList.innerHTML="";

        if(data.length===0){

            friendsList.innerHTML=`

<div class="empty">

Поки що тут тихо ❤️

</div>

`;

            return;

        }

        data.forEach(item=>{

            if(!item.visible) return;

            const card=document.createElement("div");

            card.className="supportItem";

            card.innerHTML=`

<strong>

🐾 ${item.nickname}

</strong>

<span>

❤️ ${item.amount} грн

</span>

`;

            friendsList.appendChild(card);

        });

    }

    catch(error){

        console.log(error);

    }

}

// ==========================
// START
// ==========================

loadSupporters();

// ==========================
// SMALL EFFECTS
// ==========================

document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("touchstart",()=>{

        card.style.transform="scale(.97)";

    });

    card.addEventListener("touchend",()=>{

        setTimeout(()=>{

            card.style.transform="";

        },120);

    });

});

// ==========================
// PHOTO EFFECT
// ==========================

const heroPhoto=document.querySelector(".heroPhoto img");

if(heroPhoto){

    let zoom=true;

    setInterval(()=>{

        heroPhoto.style.transform=

        zoom

        ? "scale(1.03)"

        : "scale(1)";

        zoom=!zoom;

    },3500);

}
