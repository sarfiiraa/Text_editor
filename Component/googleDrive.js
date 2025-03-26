// const express = require('express');
// const { google } = require('googleapis');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const fs = require('fs');

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // OAuth2 client setup
// const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     process.env.GOOGLE_REDIRECT_URI
// );

// oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
// const drive = google.drive({ version: 'v3', auth: oauth2Client });

// // Upload letter to Google Drive
// app.post('/upload', async (req, res) => {
//     try {
//         const { content, title } = req.body;
//         if (!content || !title) {
//             return res.status(400).json({ error: 'Title and content are required' });
//         }

//         const fileMetadata = {
//             name: `${title}.docx`,
//             mimeType: 'application/vnd.google-apps.document'
//         };

//         const media = {
//             mimeType: 'text/plain',
//             body: content
//         };

//         const file = await drive.files.create({
//             resource: fileMetadata,
//             media,
//             fields: 'id'
//         });

//         res.json({ fileId: file.data.id, message: 'File uploaded successfully' });
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         res.status(500).json({ error: 'Failed to upload file' });
//     }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
