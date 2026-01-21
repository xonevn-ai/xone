const { z } = require('zod');
const { userSchemaKeys, brainSchemaKeys } = require('./commonref');

const addChatMemberKeys = z.object({
    members: z.array(
        z.object({
            chatId: z.string().regex(/^[0-9a-fA-F]{24}$/),
            user: z.object(userSchemaKeys),
            brain: z.object(brainSchemaKeys),
        })
    ),
    isBulk: z.boolean(),
});

const createNewChatKeys = z.object({
    brain: z.object(brainSchemaKeys).optional().nullable(),
    isShare: z.boolean().optional(),
    addDefaultBrain: z.boolean().optional(),
    workspaceId: z.string().optional()
})

const updateChatKeys = z.object({
    title: z.string(),
})

const favouriteKeys = z.object({
    isFavourite: z.boolean()
})

const createForkChatKeys = z.object({
    brain: z.object(brainSchemaKeys),
    title: z.string(),
    conversation: z.array(
        z.object({
            message: z.string(),
            response: z.string(),
            responseModel: z.string(),
            id: z.string().regex(/^[0-9a-fA-F]{24}$/),
        }).passthrough()
    ),
});

const createShareChatKeys = z.object({
    brainId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    chatId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    access: z.number(),
    uri: z.string(),
    conversation: z.array(z.object({}).passthrough())
});

const deleteShareChatKeys = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    isBulk: z.boolean(),
});

const getSearchMetadataKeys = z.object({
    query: z.string(),
    messageId: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

module.exports = {
    addChatMemberKeys,
    favouriteKeys,
    createNewChatKeys,
    createForkChatKeys,
    updateChatKeys,
    createShareChatKeys,
    deleteShareChatKeys,
    getSearchMetadataKeys
};
