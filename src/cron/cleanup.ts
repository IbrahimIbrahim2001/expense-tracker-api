import cron from "node-cron";
import AuthedUsers from "../auth/auth.model.ts";
import Transactions from "../transactions/transactions.model.ts";

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export const startCleanupJob = () => {
    cron.schedule("0 0 * * *", async () => {
        const oneYearAgo = new Date(Date.now() - ONE_YEAR_MS);

        const inactiveUsers = await AuthedUsers.find({
            isActive: false,
            deletedAt: { $lte: oneYearAgo },
        });

        for (const user of inactiveUsers) {
            await Transactions.deleteMany({ user: user._id });
            await AuthedUsers.findByIdAndDelete(user._id);
        }

        if (inactiveUsers.length > 0) {
            console.log(`Cleaned up ${inactiveUsers.length} inactive users`);
        }
    });
};
