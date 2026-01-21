const { z } = require('zod');
const { brainSchemaKeys, companySchemaKeys } = require('./commonref');

/**
 * Validation schema for import chat upload
 */
const uploadImportChatSchema = z.object({
    user_id: z.string().regex(/^[0-9a-fA-F]{24}$/),
    company_id: z.string({ required_error: 'Company ID is required' })
        .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid company ID format' }),
    brain_id: z.string({ required_error: 'Brain ID is required' })
        .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid brain ID format' }),
    brain_title: z.string({ required_error: 'Brain title is required' }),
    brain_slug: z.string({ required_error: 'Brain slug is required' }),
    company_name: z.string({ required_error: 'Company name is required' }),
    code: z.enum(['OPENAI', 'ANTHROPIC', 'OPEN_AI'], {
        errorMap: (issue, ctx) => ({ message: 'Code must be one of OPENAI, ANTHROPIC, or OPEN_AI' })
    }),
}).passthrough();

/**
 * Validation schema for getting import chat status
 */
const getImportChatStatusSchema = z.object({
    importId: z.string({ required_error: 'Import ID is required' })
        .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid import ID format' }),
});

/**
 * Validation schema for getting all import chats
 */
const getImportChatsSchema = z.object({
    brain_id: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid brain ID format' }).optional(),
}).passthrough();

module.exports = {
    uploadImportChatSchema,
    getImportChatStatusSchema,
    getImportChatsSchema
};