const { z } = require('zod');

const createRoleSchemaKeys = z.object({
    name: z.string(),
    code: z.string(),
})

const updateRoleSchemaKeys = z.object({
    name: z.string(),
    code: z.string(),
    isActive: z.boolean().optional()
})

module.exports = {
    createRoleSchemaKeys,
    updateRoleSchemaKeys
}