import User from "../models/User";
import Repository from "../models/Repository";

class UsersController {

    async index(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);

            if (!user) return res.status(404).json();

            const repositories = await Repository.findOne({ userId: user_id });

            if (!repositories) return res.status(404).json({ message: "Repositories not found." });

            return res.status(200).json(repositories);

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async create(req, res) {
        try {
            const { user_id } = req.params;
            const { name, url } = req.body;
            const user = await User.findById(user_id);

            if (!user) return res.status(404).json({ message: `User not found.` });

            const repository = await Repository.findOne({
                userId: user_id,
                name
            });

            if (repository) return res.status(422).json({ message: "Repository alread exits." });

            const newRepository = await Repository.create({ name, url, userId: user_id });
            return res.status(201).json(newRepository);

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async delete(req, res) {
        try {
            const { user_id, id } = req.params;
            const user = await User.findById(user_id);

            if (!user) return res.status(404).json({ message: "User not found." });

            const repository = await Repository.findOne({
                user_id: user_id,
                id
            });

            if (!repository) return res.status(404).json({ message: "Repository not found." });

            await repository.deleteOne();

            return res.status(200).json({ message: "User deleted." });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export default new UsersController();