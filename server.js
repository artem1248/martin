const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* ==========================================
   DATA
========================================== */

const DATA_DIR = path.join(__dirname, "data");

const DONATIONS_FILE = path.join(DATA_DIR, "donations.json");
const PHOTOS_FILE = path.join(DATA_DIR, "photos.json");
const VIDEOS_FILE = path.join(DATA_DIR, "videos.json");

/* ==========================================
   HELPERS
========================================== */

function ensureFile(file) {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, "[]");
    }
}

ensureFile(DONATIONS_FILE);
ensureFile(PHOTOS_FILE);
ensureFile(VIDEOS_FILE);

function readData(file) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeData(file, data) {
    fs.writeFileSync(
        file,
        JSON.stringify(data, null, 2)
    );
}

/* ==========================================
   MEMORY
========================================== */

let donations = readData(DONATIONS_FILE);
let photos = readData(PHOTOS_FILE);
let videos = readData(VIDEOS_FILE);

let nextDonationId =
    donations.length
        ? Math.max(...donations.map(d => d.id)) + 1
        : 1;

let nextPhotoId =
    photos.length
        ? Math.max(...photos.map(p => p.id)) + 1
        : 1;

let nextVideoId =
    videos.length
        ? Math.max(...videos.map(v => v.id)) + 1
        : 1;
/* ==========================================
   DONATIONS
========================================== */

app.get("/api/donations", (req, res) => {

    donations = readData(DONATIONS_FILE);

    const approved = donations.filter(
        donation => donation.approved === true
    );

    res.json(approved);

});

app.post("/api/donations", (req, res) => {

    donations = readData(DONATIONS_FILE);

    const {
        nickname,
        amount,
        visible
    } = req.body;

    if (!nickname || !amount) {

        return res.status(400).json({
            success: false,
            message: "Missing nickname or amount"
        });

    }

    const donation = {

        id: nextDonationId++,

        nickname,

        amount,

        visible: visible ?? true,

        approved: false,

        createdAt: Date.now()

    };

    donations.push(donation);

    writeData(
        DONATIONS_FILE,
        donations
    );

    res.json({
        success: true,
        donation
    });

});

app.get("/api/admin/donations", (req, res) => {

    donations = readData(DONATIONS_FILE);

    const waiting = donations.filter(
        donation => !donation.approved
    );

    res.json(waiting);

});

app.post("/api/admin/approve", (req, res) => {

    donations = readData(DONATIONS_FILE);

    const id = Number(req.body.id);

    const donation = donations.find(
        item => item.id === id
    );

    if (!donation) {

        return res.status(404).json({
            success: false
        });

    }

    donation.approved = true;

    writeData(
        DONATIONS_FILE,
        donations
    );

    res.json({
        success: true
    });

});

app.delete("/api/admin/donations/:id", (req, res) => {

    donations = readData(DONATIONS_FILE);

    const id = Number(req.params.id);

    donations = donations.filter(
        donation => donation.id !== id
    );

    writeData(
        DONATIONS_FILE,
        donations
    );

    res.json({
        success: true
    });

});
/* ==========================================
   PHOTOS
========================================== */

app.get("/api/photos", (req, res) => {

    photos = readData(PHOTOS_FILE);

    res.json(photos);

});

app.post("/api/photos", (req, res) => {

    photos = readData(PHOTOS_FILE);

    const {
        image,
        title
    } = req.body;

    if (!image) {

        return res.status(400).json({
            success: false,
            message: "Image is required"
        });

    }

    const photo = {

        id: nextPhotoId++,

        image,

        title: title || "",

        createdAt: Date.now()

    };

    photos.push(photo);

    writeData(
        PHOTOS_FILE,
        photos
    );

    res.json({
        success: true,
        photo
    });

});

app.delete("/api/photos/:id", (req, res) => {

    photos = readData(PHOTOS_FILE);

    const id = Number(req.params.id);

    photos = photos.filter(
        photo => photo.id !== id
    );

    writeData(
        PHOTOS_FILE,
        photos
    );

    res.json({
        success: true
    });

});
/* ==========================================
   VIDEOS
========================================== */

app.get("/api/videos", (req, res) => {

    videos = readData(VIDEOS_FILE);

    res.json(videos);

});

app.post("/api/videos", (req, res) => {

    videos = readData(VIDEOS_FILE);

    const {
        title,
        image,
        duration,
        views,
        url
    } = req.body;

    if (!image) {

        return res.status(400).json({
            success: false,
            message: "Image is required"
        });

    }

    const video = {

        id: nextVideoId++,

        title: title || "",

        image,

        duration: duration || "",

        views: views || "",

        url: url || "",

        createdAt: Date.now()

    };

    videos.push(video);

    writeData(
        VIDEOS_FILE,
        videos
    );

    res.json({
        success: true,
        video
    });

});

app.delete("/api/videos/:id", (req, res) => {

    videos = readData(VIDEOS_FILE);

    const id = Number(req.params.id);

    videos = videos.filter(
        video => video.id !== id
    );

    writeData(
        VIDEOS_FILE,
        videos
    );

    res.json({
        success: true
    });

});

/* ==========================================
   INDEX
========================================== */

app.get("*", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );

});

/* ==========================================
   START
========================================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `🚀 Martin server running on port ${PORT}`
    );

});
