// const multer = require('multer');
// const path = require('path');

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     console.log("jvbjkdf",req.files);
// //     cb(null, 'public/images');
// //   },
// //   filename: function (req, file, cb) {
// //     console.log("jvbjkdf")
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log(req.file,req.file);
//         cb(null, path.join(__dirname, '..', 'public', 'uploads'))
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;

const multer=require('multer')
const path=require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("njk");
        cb(null, path.join(__dirname, '..', 'public', 'images'))
    },
    filename: (req, file, cb) => {
        console.log("djfnzvjk");
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Set your file size limit
    fileFilter: (req, file, cb) => {
        // Add your file filter logic here
        // Example: Check file types or other conditions
        cb(null, true);
    }
});


module.exports = upload;
