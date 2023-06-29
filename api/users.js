const express = require("express");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require('./utils');
const {
    getAllUsers,
    createUser,
    getUserByUsername,
    getUser,
    getUserById
} = require('../db');

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const _user = await getUserByUsername(username);

        if (_user) {
            res.send({
                message: `User ${_user.username} is already taken.`,
                name: 'UserExistsError',
                error: 'Error creating a new user as that username already exists'
            });
        }

        if (password.length < 8) {
            res.send({
                error: 'Eror Creating Password: Password must be at least 8 or more characters',
                message: 'Password Too Short!',
                name: "PasswordLengthError"
            });
        }

        const user = await createUser({
            username,
            password
        });

        const token = jwt.sign({
            id: user.id,
            username
        }, process.env.JWT_SECRET, {expiresIn: '1w'});

        res.send({
            user: {
                id: user.id,
                username: user.username
            },
            message: "thank you for signing up",
            token
        });
    } catch ({ name, message, error }) {
        next({ name, message, error });
    }
})

module.exports = usersRouter;