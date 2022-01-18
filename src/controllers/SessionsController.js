import jwt from "jsonwebtoken";
import User from "../models/User";
import { checkPassword } from "../services/auth";
import authConfig from "../config/auth";

class SessionsController {

    async create(req, res) {

        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) return res.status(401).json({ message: "User not found." });

            const passwordChecked = await checkPassword(user, password);

            if (!passwordChecked) return res.status(401).json({ message: "User / Password Invalid." });

            // if (!checkPassword(user, password)) return res.status(401).json({ message: "User / Password Invalid." });

            const { id } = user;

            return res.json({
                user: { 
                    id, 
                    email
                },
                token: jwt.sign({ id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn,
                })
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

}

export default new SessionsController();