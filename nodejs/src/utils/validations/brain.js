const { z } = require('zod');
const { userSchemaKeys, teamSchemaKeys } = require('./commonref');

const createBrainKeys = z.object({
    title: z.string(),
    isShare: z.boolean(),
    shareWith: z
        .array(
            z
                .object(userSchemaKeys)
        )
        .optional(),
    workspaceId: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/),
    teams: z
        .array(
            z
                .object(teamSchemaKeys)
        )
        .optional(),
    customInstruction: z.string().optional(),
    charimg: z.string().optional(),
});

const updateBrainKeys = z.object({
    title: z.string().optional(),
    isShare: z.boolean(),
    workspaceId: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/),
    shareWith: z
        .array(
            z
                .object(userSchemaKeys)
                .passthrough(),
        )
        .optional(),
    customInstruction: z.string().optional(),
});

const deleteBrainKeys = z.object({
    isShare: z.boolean(),
});

const convertToSharedKeys = z.object({
    shareWith: z
        .array(z.object(userSchemaKeys).passthrough())
        .optional(),
    teams: z
        .array(z.object(teamSchemaKeys))
        .optional(),
    customInstruction: z.string().optional(),
});

const shareBrainKeys = z.object({
    isShare: z.boolean(),
    slug: z.string(),
    shareWith: z.array(z.object(userSchemaKeys).passthrough()),
}).passthrough();

const unshareBrainKeys = z.object({
    user_id: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/),
})

const shareDocKeys = z.object({
    slug: z.string(),
    shareDoc: z
        .array(
            z.object({
                ...userSchemaKeys,
                file: z.string(),
            }),
        ),
});

module.exports = {
    createBrainKeys,
    updateBrainKeys,
    shareBrainKeys,
    unshareBrainKeys,
    shareDocKeys,
    deleteBrainKeys,
    convertToSharedKeys
};
