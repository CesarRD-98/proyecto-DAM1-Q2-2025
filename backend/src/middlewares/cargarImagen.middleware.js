const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: 'uploads/users/',
    filename: (req, file, cb) => {
        const extImage = path.extname(file.originalname)
        const uniqueName = `${req.usuario.id}-${Date.now()}${extImage}`
        cb(null, uniqueName)
    }
})

const upload = multer({ storage })

module.exports = upload