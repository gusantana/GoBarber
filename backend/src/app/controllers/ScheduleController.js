import { startOfDay, endOfDay, parseISO } from "date-fns";
import { Op } from "sequelize";
import Appointment from "../models/Appointment";
import User from "../models/User";

module.exports = {
    async index(req, res) {
        const isUserProvider = await User.findOne({
            where: {
                id: req.userId,
                provider: true,
            },
        });

        if (!isUserProvider) {
            return res.status(401).json({ error: "User is not a provider." });
        }

        const { date } = req.query;
        const parsedDate = parseISO(date);

        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.userId,
                canceledAt: null,
                date: {
                    [Op.between]: [
                        startOfDay(parsedDate),
                        endOfDay(parsedDate),
                    ],
                },
            },
            order: ['date']
        });

        return res.json(appointments);
    },
};
