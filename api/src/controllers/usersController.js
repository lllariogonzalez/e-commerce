const { User } = require('../db.js');

const getUsers = async ( req, res) => {
    try {
        const newUser = await User.create({
            name: "client",
            email: "client@mail.com",
            role: "user",
            billing_address: "city 1720",
            country: "Argentina",
            phone: 542654512321
        });
        res.json(newUser);
    } catch (error) {
        res.json({error: error.message});
    }
}

const getUserId = () => {}
const postUser = () => {}
const deleteUser = () => {}
const updateUser = () => {}

module.exports = {
    getUsers,
    getUserId,
    postUser,
    deleteUser,
    updateUser,
}