const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

let donations=[];

let nextId=1;
app.get("/api/donations",(req,res)=>{

const approved=donations.filter(

d=>d.approved===true

);

res.json(approved);

});



app.post("/api/donations",(req,res)=>{

const{

nickname,

amount,

visible

}=req.body;

if(!nickname||!amount){

return res.json({

success:false

});

}

donations.push({

id:nextId++,

nickname,

amount,

visible,

approved:false

});

res.json({

success:true

});

});
app.get("/api/admin/donations",(req,res)=>{

const waiting=

donations.filter(

d=>!d.approved

);

res.json(waiting);

});



app.post("/api/admin/approve",(req,res)=>{

const{id}=req.body;

const item=

donations.find(

d=>d.id===id

);

if(item){

item.approved=true;

}

res.json({

success:true

});

});
app.post("/api/admin/delete",(req,res)=>{

const{id}=req.body;

donations=

donations.filter(

d=>d.id!==id

);

res.json({

success:true

});

});
app.get("*",(req,res)=>{

res.sendFile(

path.join(

__dirname,

"public",

"index.html"

)

);

});

const PORT=

process.env.PORT||3000;

app.listen(PORT,()=>{

console.log(

"Martin server running"

);

});
