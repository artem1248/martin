<!DOCTYPE html>
<html lang="uk">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Усі фото • Мартін</title>

<link rel="stylesheet" href="style.css">

<style>

body{
    background:#f8f5ef;
    margin:0;
    font-family:Manrope,sans-serif;
}

.header{
    padding:30px 20px;
    text-align:center;
}

.header h1{
    margin:0;
}

.back{
    display:inline-block;
    margin-top:15px;
    text-decoration:none;
    color:#333;
    font-weight:700;
}

.grid{

    max-width:1200px;

    margin:auto;

    padding:20px;

    display:grid;

    grid-template-columns:
        repeat(auto-fill,minmax(220px,1fr));

    gap:20px;

}

.card img{

    width:100%;

    border-radius:16px;

    cursor:pointer;

    display:block;

}

.viewer{

    position:fixed;

    inset:0;

    background:rgba(0,0,0,.85);

    display:none;

    justify-content:center;

    align-items:center;

    z-index:9999;

}

.viewer img{

    max-width:95%;

    max-height:95%;

    border-radius:20px;

}

</style>

</head>

<body>

<div class="header">

<h1>📷 Усі фото</h1>

<a class="back" href="index.html">

← На головну

</a>

</div>

<div id="grid" class="grid"></div>

<div id="viewer" class="viewer">

<img id="viewerImage">

</div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

<script src="supabase.js"></script>

<script>

const grid=document.getElementById("grid");

const viewer=document.getElementById("viewer");

const viewerImage=document.getElementById("viewerImage");

async function loadPhotos(){

    const {data,error}=await window.db

        .from("photos")

        .select("*")

        .order("created_at",{ascending:false});

    if(error){

        console.error(error);

        return;

    }

    data.forEach(photo=>{

        const card=document.createElement("div");

        card.className="card";

        card.innerHTML=`
<img src="${photo.image_url}">
`;

        card.onclick=()=>{

            viewer.style.display="flex";

            viewerImage.src=photo.image_url;

        };

        grid.appendChild(card);

    });

}

viewer.onclick=()=>{

    viewer.style.display="none";

};

loadPhotos();

</script>

</body>
</html>
