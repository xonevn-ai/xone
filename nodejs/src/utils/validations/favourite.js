const { z } = require('zod');

const addFavouriteKeys = z.object({
    username: z.string(),
    threadMsg: z.string(),
    threadId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    aiResponse: z.string().optional(),
});

const removeFavouriteKeys = z.object({
    threadId: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

module.exports = {
    addFavouriteKeys,
    removeFavouriteKeys
};
