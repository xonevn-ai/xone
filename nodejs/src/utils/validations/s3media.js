const { z } = require('zod');

const s3FileDelete = z.object({
    key: z.string(),
})

const generatePresignedUrl = z.object({
    fileKey: z.array(z.object({
        key: z.string(),
        type: z.string(),
    })),
    folder: z.string(),
})

module.exports = {
    s3FileDelete,
    generatePresignedUrl
}