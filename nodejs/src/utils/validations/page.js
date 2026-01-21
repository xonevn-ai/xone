const { z } = require('zod');
const { userSchemaKeys, botSchemaKeys, brainSchemaKeys } = require('./commonref');

const createPageKeys = z.object({
    originalMessageId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    title: z.string(),
    content: z.string(),
    chatId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    user: z.object({}).passthrough(),
    brain: z.object({}).passthrough().optional(),
    model: z.object({}).passthrough(),
    tokens: z.object({
        totalUsed: z.number().optional(),
        promptT: z.number().optional(),
        completion: z.number().optional(),
        totalCost: z.string().optional(),
        imageT: z.number().optional()
    }).optional(),
    responseModel: z.string().optional(),
    responseAPI: z.string().optional(),
    companyId: z.string().regex(/^[0-9a-fA-F]{24}$/)
}).passthrough();

const updatePageKeys = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
}).refine(data => Object.keys(data).length > 0, { message: "At least one field is required" });

const getAllPagesKeys = z.object({
    query: z.object({}).optional(),
    options: z.object({}).optional()
}).passthrough();

module.exports = {
    createPageKeys,
    updatePageKeys,
    getAllPagesKeys
};


