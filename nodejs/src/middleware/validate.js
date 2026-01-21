const { z } = require('zod');

const validate = (validator) => {
    return async function (req, res, next) {
        try {
            await validator.parseAsync(req.body);
            next();
        } catch (err) {
            if (err instanceof z.ZodError) {
                // Format Zod error messages to be user-friendly
                const errorMessage = err.errors.map(e => e.message).join(', ') || err.message;
                return util.inValidParam(errorMessage, res);
            }
            return util.failureResponse(err.message, res);
        }
    };
};

module.exports = validate;