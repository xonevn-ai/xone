const disposableDomains = require('disposable-email-domains');
const BlockedDomain = require('../../models/blockedDomain');

const isDisposableEmail = (email) => {
    if (!email) return false;
    const domain = email.split('@')[1];
    if (!domain) return false;
    return disposableDomains.includes(domain);
};

const isBlockedDomain = async (email) => {
    if (!email) return false;
    const domain = email.split('@')[1];
    if (!domain) return false;
    const blocked = await BlockedDomain.findOne({ domain: domain });
    return !!blocked;
};

module.exports = {
    isDisposableEmail,
    isBlockedDomain
};
