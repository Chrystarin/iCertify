const { Unauthorized } = require('../miscellaneous/errors');
const { roles } = require('../miscellaneous/tools');

const adminOnly = async (res, res, next) => {
    if(res.user && res.user !== roles.ADMIN)
        return next(new Unauthorized('Not an Admin'));

    next();
}

const accountantOnly = async (res, res, next) => {
    if(res.user && res.user !== roles.ACCOUNTANT)
        return next(new Unauthorized('Not an Accountant'));

    next();
}

const organizerOnly = async (res, res, next) => {
    if(res.user && res.user !== roles.ORGANIZER)
        return next(new Unauthorized('Not an Organizer'));

    next();
}

const memberOnly = async (res, res, next) => {
    if(res.user && res.user !== roles.MEMBER)
        return next(new Unauthorized('Not a Member'));

    next();
}

module.exports = {
    adminOnly,
    accountantOnly,
    organizerOnly,
    memberOnly
}