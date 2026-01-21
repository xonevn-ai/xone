const { z } = require('zod');

const createSchemaKeys = z.object({
    username: z.string(),
    email: z.string().email(),
    roleId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    roleCode: z.string(),
})

const updateSchemaKeys = z.object({
    fname: z.string().optional(),
    lname: z.string().optional(),
}).passthrough();

const storageRequestKeys = z.object({
    requestSize: z.number()
})

const updateCreditKeys = z.object({
    email: z.string().email(),
    credit: z.number()
})

const changeRoleKeys = z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    roleCode: z.string()
})

module.exports = {
    createSchemaKeys,
    updateSchemaKeys,
    storageRequestKeys,
    updateCreditKeys,
    changeRoleKeys
}