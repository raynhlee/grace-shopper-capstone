function requireUser(req, res, next) {
    if (!req.user) {
        res.status(401).json({
            name: "MissingUserError",
            message: "You must be logged in to perform this action",
            error: "Unauthorized"
        })
    }

    next();
}

function requireAdmin(req, res, next) {
    if (!req.user.isAdmin) {
        res.status(401).json({
            name: "NotAdminError",
            message: "You must be a site administrator to perform this action",
            error: "Unauthorized"
        })
    }

    next();
}

module.exports = {
    requireUser,
    requireAdmin
}