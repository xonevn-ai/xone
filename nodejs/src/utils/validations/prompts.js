const { z } = require('zod');
const { brainSchemaKeys } = require('./commonref');

const createPromptKeys = z.object({
    title: z.string(),
    content: z.string(),
    brains: z.array(z.object(brainSchemaKeys)).optional(),
    tags: z.array(z.unknown()), // items() without args means any type or unspecified? Joi items() usually means any.
    website: z.array(z.unknown()).optional(),
    summaries: z.object({}).passthrough().nullable().optional(),
    addinfo: z.object({}).passthrough().optional(),
    brandInfo: z.object({}).passthrough().nullable().optional(),
    companyInfo: z.object({}).passthrough().nullable().optional(),
    productInfo: z.object({}).passthrough().nullable().optional(),
    selected: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    isFavorite: z.boolean().optional(),
});

const editPromptKeys = z.object({
    title: z.string(),
    content: z.string(),
    brains: z.array(z.object(brainSchemaKeys)).optional(),
    tags: z.array(z.unknown()),
    website: z.array(z.unknown()).optional(),
    summaries: z.object({}).passthrough().nullable().optional(),
    addinfo: z.object({}).passthrough().optional(),
    brandInfo: z.object({}).passthrough().nullable().optional(),
    companyInfo: z.object({}).passthrough().nullable().optional(),
    productInfo: z.object({}).passthrough().nullable().optional(),
    selected: z.string().regex(/^[0-9a-fA-F]{24}$/),
    isFavorite: z.boolean().optional(),
});

module.exports = {
    createPromptKeys,
    editPromptKeys
};
