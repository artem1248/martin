const popup = document.getElementById("welcomeOverlay");
const popupGo = document.getElementById("popupGo");
const popupClose = document.getElementById("popupClose");
const popupNever = document.getElementById("popupNever");

const donatePopup = document.getElementById("donateOverlay");
const openDonate = document.getElementById("openDonate");
const closeDonate = document.getElementById("closeDonate");
const donateButton = document.getElementById("goDonate");
const sendDonate = document.getElementById("sendDonate");

const tiktokBtn = document.getElementById("tiktokBtn");
const instagramBtn = document.getElementById("instagramBtn");
const youtubeBtn = document.getElementById("youtubeBtn");
const telegramBtn = document.getElementById("telegramBtn");

if(localStorage.getItem("martinHidePopup")){
    popup.style.display="none";
}

popupClose.onclick=()=>{
    popup.style.display="none";
}

popupNever.onclick=()=>{

    localStorage.setItem(
        "martinHidePopup",
        "true"
    );

    popup.style.display="none";

}

popupGo.onclick=()=>{

    if(CONFIG.tiktok){

        window.open(
            CONFIG.tiktok,
            "_blank"
        );

    }

    popup.style.display="none";

}

tiktokBtn.onclick=(e)=>{

    e.preventDefault();

    if(CONFIG.tiktok){

        window.open(
            CONFIG.tiktok,
            "_blank"
        );

    }

};

instagramBtn.onclick=(e)=>{

    e.preventDefault();

    if(CONFIG.instagram){

        window.open(
            CONFIG.instagram,
            "_blank"
        );

    }

};

youtubeBtn.onclick=(e)=>{

    e.preventDefault();

    if(CONFIG.youtube){

        window.open(
            CONFIG.youtube,
            "_blank"
        );

    }

};

telegramBtn.onclick=(e)=>{

    e.preventDefault();

    if(CONFIG.telegram){

        window.open(
            CONFIG.telegram,
            "_blank"
        );

    }

};

openDonate.onclick=()=>{

    donatePopup.style.display="flex";

}

closeDonate.onclick=()=>{

    donatePopup.style.display="none";

}

donateButton.onclick=(e)=>{

    e.preventDefault();

    if(CONFIG.donate){

        window.open(
            CONFIG.donate,
            "_blank"
        );

    }

};

    if(CONFIG.donate){

        window.open(
            CONFIG.donate,
            "_blank"
        );

    }

} 
async function sendDonation(){

    const nickname=document
    .getElementById("nickname")
    .value.trim();

    const amount=document
    .getElementById("amount")
    .value.trim();

    const visible=document
    .getElementById("showName")
    .checked;

    if(!nickname){

        alert("Введіть свій нік ❤️");
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

"❤️ Дякуємо!

Після перевірки адміністрацією
твій донат з'явиться
на сайті."

            );

            document
            .getElementById("nickname")
            .value="";

            document
            .getElementById("amount")
            .value="";

            donatePopup.style.display="none";

            loadSupporters();

        }else{

            alert(

"Не вдалося відправити форму."

            );

        }

    }catch(e){

        console.log(e);

        alert(

"Помилка з'єднання із сервером."

        );

    }

}

sendDonate.onclick=sendDonation;



async function loadSupporters(){

    try{

        const response=await fetch(

            "/api/donations"

        );

        const list=await response.json();

        const box=document.getElementById(

            "friendsList"

        );

        box.innerHTML="";

        if(!list.length){

            box.innerHTML=`

<div class="empty">

Поки що тут
нікого немає ❤️

</div>

`;

            return;

        }

        list.forEach(item=>{

            if(!item.visible)return;

            const div=document.createElement("div");

            div.className="supportItem";

            div.innerHTML=`

<strong>

${item.nickname}

</strong>

<span>

${item.amount} грн

</span>

`;

            box.appendChild(div);

        });

    }catch(e){

        console.log(e);

    }

}

loadSupporters();
