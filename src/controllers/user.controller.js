import User from '../models/user.model.js';


 export async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving users", error });
    }
}