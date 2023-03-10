const multer = require("multer"); //for images
const path = require("path");
// const AWS = require('aws-sdk');
// const multerS3 = require('multer-s3');


// // S3 bucket
// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });
//
// // Set up multer storage engine to upload files to S3
// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.AWS_BUCKET_NAME,
//         acl: 'public-read',
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         key: (req, file, cb) => {
//             cb(null, Date.now().toString() + '-' + file.originalname);
//         }
//     })
// });

// multer upload middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()  + path.extname(file.originalname));
    },
});
// create multer instance with storage and limits
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
});
// serve the "uploads" directory as a static directory
// serve the "uploads" directory as a static directory
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


module.exports = upload;

