const { z } = require('zod');
const { companySchemaKeys, botSchemaKeys } = require('./commonref');

const addBotKeys = z.object({
    title: z.string(),
    modelType: z.number(),
});

const updateBotKeys = z.object({
    title: z.string(),
});

const createUserBotKeys = z.object({
    bot: z.object(botSchemaKeys),
    config: z.object({
        apiKey: z.string(),
    })
});

const updateUserBotKeys = z.object({
    bot: z.object(botSchemaKeys),
    company: z.object(companySchemaKeys),
    config: z.object({
        apikey: z.string(),
    }),
});

const updateChatKeys = z.object({
    botId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    msg: z.string(),
})

const viewApiKeys = z.object({
    apikey: z.string()
})

const removeUserBotKeys = z.object({
    code: z.string(),
})

module.exports = {
    addBotKeys,
    updateBotKeys,
    createUserBotKeys,
    updateUserBotKeys,
    updateChatKeys,
    viewApiKeys,
    removeUserBotKeys
};
