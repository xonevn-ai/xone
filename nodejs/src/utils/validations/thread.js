const { z } = require('zod');
const { userSchemaKeys, botSchemaKeys, brainSchemaKeys } = require('./commonref');

const createConversationKeys = z.object({
    message: z.object({}).passthrough(),
    chatId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    model: z.object(botSchemaKeys),
    brain: z.object(brainSchemaKeys),
    responseModel: z.string(),
    media: z.object({
        name: z.string().optional(),
        uri: z.string().optional(),
        mime_type: z.string().optional(),
    }).passthrough().optional(),
    messageId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional()
}).passthrough();

const editMsgKeys = z.object({
    message: z.string().optional(),
    ai: z.string().optional(),
}).refine(data => Object.keys(data).length > 0, { message: "At least one field is required" });

const replyInThreadKeys = z.object({
    chatId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    messageId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    content: z.string().optional().or(z.literal('')),
    type: z.string(),
    attachment: z.array(z.unknown()).optional(),
    tagusers: z.array(z.unknown()).optional(),
}).passthrough();

const addReactionKeys = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/),
    user: z.object(userSchemaKeys),
    emoji: z.string(),
});

const saveResponseTimeKeys = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/),
    responseTime: z.string(),
})
module.exports = {
    createConversationKeys,
    editMsgKeys,
    replyInThreadKeys,
    addReactionKeys,
    saveResponseTimeKeys
};
