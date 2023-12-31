const express = require("express");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require('./utils');
const {
    getAllUsers,
    createUser,
    getUserByUsername,
    getUser,
    getUserById,
    getOrderByUser,
    getUserByEmail
} = require('../db');

// GET /api/users
usersRouter.get('/', async (req, res, next) => {
    try {
        const allUsers = await getAllUsers();
        res.send(allUsers);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password, email } = req.body;
    console.log('email:', email);
    try {
        const _user = await getUserByUsername({username});
        console.log(_user)
        if (_user) {
            next({
                message: `User ${_user.username} is already taken.`,
                name: 'UserExistsError',
                error: 'Error creating a new user as that username already exists'
            });
        }

        const duplicateEmail = await getUserByEmail({email});

        if (duplicateEmail) {
            next({
                message: `${duplicateEmail.email} is already in use on an other account`,
                name: 'DuplicateEmailError',
                error: 'Error creating a new user as that email is already in use'
            });
        }

        if (password.length < 8) {
            next({
                error: 'Error Creating Password: Password must be at least 8 or more characters',
                message: 'Password Too Short!',
                name: "PasswordLengthError"
            });
        }

        const user = await createUser({
            username,
            password,
            email
        });

        const token = jwt.sign({
            id: user.id,
            username
        }, process.env.JWT_SECRET, {expiresIn: '1w'});

        if(user){
        res.send({
            user: {
                id: user.id,
                username: user.username
            },
            message: "thank you for signing up",
            token
        })};
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }

    try {
        const user = await getUser({ username, password });

        console.log("user: ", user);

        if (!user) {
            next({
                name: "InvalidUsername",
                message: "That user does not exist"
            });
        }

        const token = jwt.sign({
            id: user.id,
            username: user.username,
        }, process.env.JWT_SECRET, {expiresIn: '1w'});

        res.send({ user, token, message: "you're logged in!"});
    } catch ({ name, message }) {
        console.log({name, message});
    }
});

// GET /api/users/me
usersRouter.get('/me', async (req, res, next) => {
    try {
        const verifiedUser = await getUserById(req.user.id);
        console.log("verifiedUser: ", verifiedUser);

        if (verifiedUser) {
            res.send(verifiedUser);
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// GET /api/users/:username/orders
usersRouter.get('/:username/orders', async (req, res, next) => {
    const { username } = req.params;

    try {
        if (req.user.username === username) {
            const userOrders = await getOrderByUser({ username });
            res.send(userOrders);
        } else {
            res.send({
                message: `Could not find orders associated with ${username}`,
                name: "NoExistingOrders"
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

module.exports = {
    usersRouter
};