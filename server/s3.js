require("dotenv").config()
const fs = require("fs")
const S3 = require("aws-sdk/clients/s3")

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

// eslint-disable-next-line
const uploadFile = (res, filePath, fileName) => new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath)

    const params = {
        Bucket: bucketName,
        Body: fileStream,
        Key: fileName
    }

    s3.upload(params, (err, data) => {
        if (err) {
            fs.unlinkSync(filePath)
            reject(err)
        } else {
            fs.unlinkSync(filePath)
            resolve(data.key)
        }
    })
})

const getFileStream = (key) => {
    const params = {
        Bucket: bucketName,
        Key: key
    }

    return s3.getObject(params).createReadStream()
}

const deleteFile = (res, fileKey) => new Promise((resolve, reject) => {
    const params = {
        Bucket: bucketName,
        Key: fileKey
    }

    s3.deleteObject(params, (err, data) => {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

// eslint-disable-next-line import/prefer-default-export
module.exports = {
    uploadFile,
    getFileStream,
    deleteFile
}
