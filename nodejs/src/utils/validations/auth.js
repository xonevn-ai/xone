const { z } = require('zod');
const { PASSWORD_REGEX } = require('../../config/constants/common');

const PASSWORD_REGEX_MESSAGE = 'Your password should contain one uppercase letter, numeric and special characters';

const commonSignupKeys = z.object({
    users: z.array(z.object({
        email: z.string().email().toLowerCase(),
    })),
    roleCode: z.string(),
});

const signInSchemaKeys = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string()
});

const changePasswordKeys = z.object({
    oldpassword: z.string()
        .regex(PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE),
    newpassword: z.string()
        .regex(PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE),
});

const forgotPasswordKeys = z.object({
    email: z.string().email().toLowerCase()
});

const resendOtpKeys = z.object({
    email: z.string().email(),
});

const verifyOtpKeys = z.object({
    email: z.string().email().optional(),
    otp: z.string(),
});

const resetPasswordKeys = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/),
    resetHash: z.string().optional(),
    password: z.string()
        .regex(PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE),
});

const inviteLoginKeys = z.object({
    inviteLink: z.string(),
})

const logoutKeys = z.object({
    fcmToken: z.string(),
})

const mfaStatusKeys = z.object({
    mfa: z.boolean(),
})

const mfaLogin = z.object({
    otp: z.string()
})

const onBoardProfileKeys = z.object({
    email: z.string().email().toLowerCase(),
    fname: z.string(),
    lname: z.string(),
    password: z.string()
})

module.exports = {
    signInSchemaKeys,
    changePasswordKeys,
    forgotPasswordKeys,
    verifyOtpKeys,
    resendOtpKeys,
    resetPasswordKeys,
    commonSignupKeys,
    inviteLoginKeys,
    logoutKeys,
    mfaStatusKeys,
    mfaLogin,
    onBoardProfileKeys
};
