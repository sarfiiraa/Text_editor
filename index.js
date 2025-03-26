// Step 1: Backend Setup (Node.js + Express + Firebase Auth)
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const stream = require("stream");
const htmlToDocx = require("html-to-docx");
const path = require("path");
const MetaFile1 = require("./models/file.cjs");
const { google } = require('googleapis');
const fs = require('fs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Firebase Admin SDK Setup
// const serviceAccount = require('./letterapp-1fd56-firebase-adminsdk-fbsvc-cb81a1f617.json');
// const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// MongoDB Connection
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


    const verifyToken = async (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Unauthorized: No token provided" });

        try {
            const decodedToken = await admin.auth().verifyIdToken(token, true); // 'true' forces token check
            req.user = decodedToken;
            next();
        } catch (err) {
            if (err.code === "auth/id-token-expired") {
                return res.status(401).json({ error: "Token expired", needsRefresh: true });
            }
            console.error("Token verification error:", err);
            res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
    };


// OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
const drive = google.drive({ version: 'v3', auth: oauth2Client });

async function getOrCreateFolder(folderName) {
    try {
        // Search for existing folder
        const response = await drive.files.list({
            q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            fields: "files(id, name)",
        });

        if (response.data.files.length > 0) {
            // console.log(`Folder "${folderName}" already exists.`);
            return response.data.files[0].id; // Return existing folder ID
        }

        // Create folder if it does not exist
        const fileMetadata = {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder",
        };

        const folder = await drive.files.create({
            resource: fileMetadata,
            fields: "id",
        });

        console.log(`Created folder "${folderName}" and Folder Id: ${folder.data.id}`);
        return folder.data.id; // Return new folder ID
    } catch (error) {
        console.error("Error creating/getting folder:", error);
        throw new Error("Failed to create or find folder.");
    }
}


app.get("/files/:userEmail",verifyToken, async (req, res) => {
    try {
        const { userEmail } = req.params;
        const files = await MetaFile1.find({ ownerEmail: userEmail });
        res.status(200).json(files);
    } catch (error) {
        console.error("Error fetching user files:", error);
        res.status(500).json({ error: "Failed to fetch files." });
    }
});

app.delete("/delete/:fileId",verifyToken, async (req, res) => {
    try {
        await drive.files.delete({ fileId: req.params.fileId });
        // Remove metadata from MongoDB
        await MetaFile1.findOneAndDelete({ fileId: req.params.fileId });
        res.json({ message: "File deleted successfully" });
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ error: "Failed to delete file" });
    }
});



app.post("/upload",verifyToken, async (req, res) => {
    try {
        const { content, title, userEmail } = req.body;
        if (!content || !title) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        // Ensure the "Letters" folder exists
        const folderId = await getOrCreateFolder("Letters");

        // Convert HTML to DOCX format
        const docxBuffer = await htmlToDocx(content);
        const tempFilePath = path.join(__dirname, `${title}.docx`);
        fs.writeFileSync(tempFilePath, docxBuffer);

        // Upload to Google Drive
        const fileMetadata = {
            name: `${title}.docx`,
            parents: [folderId], // Save inside the "Letters" folder
        };

        const media = {
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            body: fs.createReadStream(tempFilePath),
        };

        const file = await drive.files.create({
            resource: fileMetadata,
            media,
            fields: "id",
        });

        // Fetch additional details using the file ID
        const fileData = await drive.files.get({
            fileId: file.data.id,
            fields: "id, name, webViewLink",
        });

        const newFile = await MetaFile1.create({
            fileId: fileData.data.id,
            name: fileData.data.name,
            webViewLink: fileData.data.webViewLink,
            ownerEmail: userEmail,
        });

        // Delete the temp file after upload
        fs.unlinkSync(tempFilePath);

        res.json({ fileId: file.data.id, message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
});

app.get('/protected', verifyToken, (req, res) => {
    res.send(`Hello ${req.user.name}, you are authenticated!`);
});

app.use(express.static(path.join(__dirname,"./Frontend/text_editor/dist")));

app.get('*',function(_, res){
    res.sendFile(path.join(__dirname, "./Frontend/text_editor/dist/index.html"), function(err){
        res.status(500).send(err);
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
