const {CloudImage}  = require('../db/models')

const UploadImage = async (req, res) => {
    try {
      const newImage = new CloudImage({url: req.body.url})
      newImage.save()
      res.send({msg: newImage})
    } 
    catch(err) { throw err }
}

const GetImages = async (req, res) => {
    try {
        const images = await CloudImage.find()
        res.send(images)
    } 
    catch(err) { throw err }
}

const DeleteImages = async (req, res) => {
    try {
        await CloudImage.deleteMany()
        res.send({msg: 'Deleted all images'})
    }
    catch(err) { throw err }
}

module.exports = {
    UploadImage,
    GetImages,
    DeleteImages,
}