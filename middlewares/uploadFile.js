const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'public/files';

        // Vérifier si le dossier existe, sinon le créer
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uploadPath = 'public/files';
        const originalname = file.originalname;
        const fileExtension = path.extname(originalname);
        const baseName = path.basename(originalname, fileExtension);

        let fileName = originalname;
        let fileIndex = 1;

        // Boucle pour éviter les conflits de nom
        while (fs.existsSync(path.join(uploadPath, fileName))) {
            fileName = `${baseName}(${fileIndex})${fileExtension}`;
            fileIndex++;
        }

        cb(null, fileName);
    }
});

const uploadFile = multer({ storage: storage });

module.exports = uploadFile;
