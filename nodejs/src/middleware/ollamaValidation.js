const { z } = require('zod');

const ollamaValidation = {
    chatRequest: z.object({
        messages: z.array(
            z.object({
                role: z.enum(['user', 'assistant', 'system']),
                content: z.string()
            })
        ),
        model: z.string(),
        baseUrl: z.string().url().optional(),
        stream: z.boolean().default(false),
        options: z.object({
            temperature: z.number().min(0).max(2).optional(),
            top_p: z.number().min(0).max(1).optional(),
            top_k: z.number().min(1).max(100).optional(),
            repeat_penalty: z.number().min(0.1).max(2.0).optional(),
            seed: z.number().optional(),
            num_ctx: z.number().min(1).optional(),
            num_predict: z.number().min(-1).optional()
        }).optional()
    }),

    generateRequest: z.object({
        prompt: z.string(),
        model: z.string(),
        baseUrl: z.string().url().optional(),
        stream: z.boolean().default(false),
        options: z.object({
            temperature: z.number().min(0).max(2).optional(),
            top_p: z.number().min(0).max(1).optional(),
            top_k: z.number().min(1).max(100).optional(),
            repeat_penalty: z.number().min(0.1).max(2.0).optional(),
            seed: z.number().optional(),
            num_ctx: z.number().min(1).optional(),
            num_predict: z.number().min(-1).optional()
        }).optional()
    }),

    pullRequest: z.object({
        model: z.string(),
        baseUrl: z.string().url().optional()
    }),

    embeddingsRequest: z.object({
        input: z.string(),
        model: z.string(),
        baseUrl: z.string().url().optional()
    }),

    copyRequest: z.object({
        source: z.string(),
        destination: z.string(),
        baseUrl: z.string().url().optional()
    }),

    deleteRequest: z.object({
        model: z.string(),
        baseUrl: z.string().url().optional()
    }),

    settingsUpdate: z.object({
        settings: z.object({
            enabled: z.boolean().optional(),
            allowedModels: z.array(z.string()).optional(),
            restrictedModels: z.array(z.string()).optional(),
            defaultModel: z.string().optional(),
            maxConcurrentRequests: z.number().min(1).max(20).optional(),
            defaultBaseUrl: z.string().url().optional(),
            teamSettings: z.object({
                allowModelPulling: z.boolean().optional(),
                allowModelDeletion: z.boolean().optional()
            }).optional()
        })
    }),

    modelName: z.string().regex(/^[a-zA-Z0-9._:-]+$/),

    timeRange: z.enum(['1d', '7d', '30d', '90d']).default('7d')
};

const validateOllamaRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                code: 'VALIDATION_ERROR',
                message: result.error.errors[0].message,
                details: result.error.errors
            });
        }
        // Assign parsed data back to req.body to use transformations/defaults
        req.body = result.data;
        next();
    };
};

const validateOllamaQuery = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.query);
        if (!result.success) {
            return res.status(400).json({
                code: 'VALIDATION_ERROR',
                message: result.error.errors[0].message,
                details: result.error.errors
            });
        }
        // Assign parsed data back to req.query
        req.query = result.data;
        next();
    };
};

const validateOllamaParams = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.params);
        if (!result.success) {
            return res.status(400).json({
                code: 'VALIDATION_ERROR',
                message: result.error.errors[0].message,
                details: result.error.errors
            });
        }
        // Assign parsed data back to req.params
        req.params = result.data;
        next();
    };
};

module.exports = {
    ollamaValidation,
    validateOllamaRequest,
    validateOllamaQuery,
    validateOllamaParams
};
