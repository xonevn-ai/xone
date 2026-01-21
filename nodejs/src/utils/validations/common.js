const { z } = require('zod');
const { countrySchemaKeys, updateCountrySchemaKeys, stateSchemaKeys, updateStateSchemaKeys, citySchemaKeys, userSchemaKeys } = require('./commonref');
const { PASSWORD_REGEX } = require('../../config/constants/common');

const partialUpdateKeys = z.object({
    isActive: z.boolean()
});

const countryCreateKeys = z.object({
    nm: z.string(),
    code: z.string(),
    dialCode: z.string(),
})

const countryUpdateKeys = z.object({
    nm: z.string(),
    code: z.string(),
    dialCode: z.string(),
})

const stateCreateKeys = z.object({
    nm: z.string(),
    code: z.string(),
    country: z.object(countrySchemaKeys),
})

const stateUpdateKeys = z.object({
    nm: z.string(),
    code: z.string(),
    country: z.object(updateCountrySchemaKeys),
})

const cityCreateKeys = z.object({
    nm: z.string(),
    code: z.string(),
    country: z.object(countrySchemaKeys),
    state: z.object(stateSchemaKeys),
})

const cityUpdateKeys = z.object({
    nm: z.string(),
    code: z.string(),
    country: z.object(updateCountrySchemaKeys),
    state: z.object(updateStateSchemaKeys),
})

const manualNotificationKeys = z.object({
    token: z.string()
})

const companyCreateKeys = z.object({
    fname: z.string(),
    lname: z.string(),
    email: z.string().email().toLowerCase(),
    password: z.string()
        .min(8)
        .regex(PASSWORD_REGEX, 'Your password should contain one uppercase letter, numeric and special characters'),
    confirmPassword: z.string(),
    companyNm: z.string(),
    countryName: z.string().optional(),
    countryCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const companyUpdateKeys = z.object({
    companyNm: z.string(),
    billingAdd: z.object({
        line1: z.string(),
        line2: z.string().optional(),
        country: z.object(countrySchemaKeys),
        state: z.object(stateSchemaKeys),
        city: z.object(citySchemaKeys),
        zipcode: z.string().optional(),
    }),
    renewDate: z.date(), // Zod handles dates if parsed correctly. Ensure input is date compatible or use coerce.date()
    renewAmt: z.number(),
});

const emailTemplateKeys = z.object({
    nm: z.string(),
    code: z.string(),
    subject: z.string(),
    body: z.string(),
    htmlPath: z.string(),
    cssPath: z.string(),
})

const kafkaTopicKeys = z.object({
    topic: z.string(),
    partition: z.number()
})

const setPromptLimitKeys = z.object({
    day: z.number(),
    week: z.number(),
    month: z.number(),
})

const addTeamMembersKeys = z.object({
    users: z.array(
        z.object({
            email: z.string().email(),
            roleId: z.string().regex(/^[0-9a-fA-F]{24}$/),
            roleCode: z.string(),
        })
    ),
});

const checkApiKeys = z.object({
    key: z.string(),
    code: z.string(),
})

const resendVerification = z.object({
    email: z.string().email().toLowerCase(),
    minutes: z.number().optional()
})

module.exports = {
    partialUpdateKeys,
    countryCreateKeys,
    countryUpdateKeys,
    stateCreateKeys,
    stateUpdateKeys,
    cityCreateKeys,
    cityUpdateKeys,
    manualNotificationKeys,
    companyUpdateKeys,
    emailTemplateKeys,
    kafkaTopicKeys,
    setPromptLimitKeys,
    companyCreateKeys,
    addTeamMembersKeys,
    checkApiKeys,
    resendVerification
}