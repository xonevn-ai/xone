const { z } = require('zod');

const huggingFaceAuthKeys = z.object({
    name: z.string(),
    taskType: z.string(),
    apiType: z.string(),
    description: z.string().optional().or(z.literal('')),
    endpoint: z.string(),
    repo: z.string(),
    tool: z.boolean(),
    context: z.number(),
    sample: z.boolean(),
    topK: z.number(),
    topP: z.number(),
    typicalP: z.number(),
    repetitionPenalty: z.number(),
    frequencyPenalty: z.number(),
    temperature: z.number(),
    sequences: z.string().optional().or(z.literal('')),
    key: z.string(),
    bot: z.object({
        title: z.string(),
        code: z.string(),
        id: z.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
    numInference: z.number(),
    gScale: z.number(),
})

const anthropicAuthKeys = z.object({
    key: z.string(),
    bot: z.object({
        title: z.string(),
        code: z.string(),
        id: z.string().regex(/^[0-9a-fA-F]{24}$/),
    })
})

module.exports = {
    huggingFaceAuthKeys,
    anthropicAuthKeys
}
