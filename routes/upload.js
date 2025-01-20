const Aws = require("aws-sdk");
const path = require('path');

const express = require('express');
const sharp = require("sharp");
const multer = require("multer");
const router = express.Router();



// VALIDATE FILE MIMETYPE
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// IF YOU WANT VALIDATION FOR FILE SIZE
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const validateFileSize = (req, file, cb) => {
    if (file.size > MAX_SIZE) {
        return cb(new Error("File too large. Max size is 5MB."), false);
    }
    cb(null, true);
};

// THUMBNAIL CREATOR
const createThumbnail = async (buffer) => {
    return await sharp(buffer)
        .resize({ width: 150, height: 150, fit: "cover" }) // Thumbnail size
        .jpeg({ quality: 70 })
        .toBuffer();
};

// VALIDATE IMAGE DIMENSIONS IF NEEDED
const validateImageDimensions = async (buffer) => {
    const metadata = await sharp(buffer).metadata();
    const { width, height } = metadata;

    if (width > 1920 || height > 1080) {
        throw new Error("Image dimensions exceed 1920x1080");
    }
};

// STORAGE, MULTER, S3 CONFIGURATIONS
const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, '')
    }
})
const upload = multer({ storage: storage, fileFilter: filefilter })
const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
})

router.post("/", upload.single("image"), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // IF YOU WANT TO RESIZE AND COMPRESS IMAGE
        const optimizedImage = await sharp(file.buffer)
            .resize({ width: 800, height: 800, fit: "inside" }) // Resize to max 800x800
            .jpeg({ quality: 80 }) // Compress with 80% quality
            .toBuffer();


        // IF YOU WANT TO CONVERT IMAGE TO ANOTHER EXTENSION
        const convertedImage = await sharp(file.buffer).toFormat("webp").toBuffer();


        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `images/file-${Date.now()}${path.extname(req.file.originalname)}`,
            Body: req.file.buffer,
            ACL: "public-read-write",
            ContentType: "image/jpeg"
        };
        s3.upload(params, async (error, data) => {
            if (error) {
                res.status(500).json({ error: error.message })
            }
            res.status(200).json({
                message: "File uploaded successfully",
                success: true,
                location: `${data.Location}`,
            })
        })
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "File upload failed", error: error.message });
    }
});

// Endpoint for uploading multiple images
router.post("/multiple", upload.array("images", 10), async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const uploadPromises = files.map((file) => {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `images/file-${Date.now()}-${file.originalname}`,
                Body: file.buffer,
                ACL: "public-read-write",
                ContentType: file.mimetype,
            };

            return s3.upload(params).promise();
        });

        const uploadResults = await Promise.all(uploadPromises);

        const locations = uploadResults.map((result) => result.Location);

        res.status(200).json({
            message: "Files uploaded successfully",
            success: true,
            locations: locations,
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "File upload failed", error: error.message });
    }
});

module.exports = router;
