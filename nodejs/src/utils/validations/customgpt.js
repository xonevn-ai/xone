const { z } = require('zod');
const { brainSchemaKeys, companySchemaKeys, botSchemaKeys } = require('./commonref');

const createCustomGptKeys = z.object({
    title: z.string(),
    systemPrompt: z.string(),
    type: z.enum(['agent', 'supervisor']).default('agent'),
    description: z.string(),
    Agents: z.union([z.string(), z.array(z.string())]).optional(),
    coverImg: z.union([z.array(z.unknown()), z.null(), z.literal("null")]).optional(),
    doc: z.array(z.unknown()).optional(),
    responseModel: z.object({
        name: z.string(),
        company: z.object(companySchemaKeys),
        id: z.string().regex(/^[0-9a-fA-F]{24}$/),
        bot: z.object(botSchemaKeys),
        provider: z.string().optional()
    }),
    maxItr: z.number().optional().nullable(),
    itrTimeDuration: z.string().optional().or(z.literal('')),
    brain: z.object(brainSchemaKeys),
    imageEnable: z.boolean().optional(),
    charimg: z.string().optional(),
}).passthrough().superRefine((data, ctx) => {
    if (data.type === 'supervisor') {
        if (!data.Agents) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Agents are required when type is supervisor",
                path: ["Agents"]
            });
        }
    } else {
        if (data.Agents) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Agents are forbidden when type is not supervisor",
                path: ["Agents"]
            });
        }
    }
});

const updateCustomGptKeys = z.object({
    title: z.string(),
    type: z.enum(['agent', 'supervisor']).optional(),
    description: z.string(),
    Agents: z.union([z.string(), z.array(z.string())]).optional(),
    coverImg: z.union([z.array(z.unknown()), z.null(), z.literal("null")]).optional(),
    doc: z.array(z.unknown()).optional(),
    systemPrompt: z.string(),
    responseModel: z.object({
        name: z.string(),
        company: z.object(companySchemaKeys),
        id: z.string().regex(/^[0-9a-fA-F]{24}$/),
        bot: z.object(botSchemaKeys),
        provider: z.string().optional()
    }),
    maxItr: z.number().optional().nullable(),
    itrTimeDuration: z.string().optional().or(z.literal('')),
    brain: z.object(brainSchemaKeys),
    imageEnable: z.boolean().optional(),
    removeDoc: z.string().optional(),
    charimg: z.string().optional(),
}).passthrough().superRefine((data, ctx) => {
    if (data.type === 'supervisor') {
        if (!data.Agents) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Agents are required when type is supervisor",
                path: ["Agents"]
            });
        }
    } else if (data.type && data.type !== 'supervisor') {
        if (data.Agents) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Agents are forbidden when type is not supervisor",
                path: ["Agents"]
            });
        }
    }
});

const assignDefaultGpt = z.object({
    title: z.string(),
    systemPrompt: z.string(),
    responseModel: z.object({
        name: z.string().optional(),
        company: z.object(companySchemaKeys)
    }),
    maxItr: z.number().optional().nullable(),
    itrTimeDuration: z.string().optional().or(z.literal('')),
    selectedBrain: z.array(z.object(brainSchemaKeys)).min(1, { message: 'At least one brain is required' }),
    imageEnable: z.boolean().optional(),
    charimg: z.string().optional()
}).passthrough();

module.exports = {
    createCustomGptKeys,
    updateCustomGptKeys,
    assignDefaultGpt
};
