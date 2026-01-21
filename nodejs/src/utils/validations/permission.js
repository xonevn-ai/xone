const { z } = require('zod');

const updatePermissionKeys = z.object({
    roleId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    permissionIds: z.array(z.unknown()),
})

module.exports = {
    updatePermissionKeys
}