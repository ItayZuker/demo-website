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
const uploadFile = (file) => new Promise(resolve => {
    const fileStream = fs.createReadStream(file.path)

    const params = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    s3.upload(params, (err, data) => {
        if (err) {
            resolve({
                err
            })
        } else {
            resolve({
                key: data.key
            })
        }
    })
})

const getFile = (fileKey) => new Promise((resolve) => {
    const params = {
        Bucket: bucketName,
        Key: fileKey
    }

    s3.getObject(params, (err, data) => {
        if (err) {
            resolve({
                err
            })
        } else {
            resolve({
                data
            })
        }
    })
})

const deleteFile = (fileKey) => new Promise((resolve) => {
    const params = {
        Bucket: bucketName,
        Key: fileKey
    }

    s3.deleteObject(params, (err, data) => {
        if (err) {
            resolve({
                err
            })
        } else {
            resolve({
                data
            })
        }
    })
})

// eslint-disable-next-line import/prefer-default-export
module.exports = {
    uploadFile,
    getFile,
    deleteFile
}
