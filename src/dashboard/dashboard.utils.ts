export const getDateRange = (period: string): Date | null => {
    const now = new Date();

    switch (period) {
        case "daily":
            return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        case "weekly":
            return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        case "monthly":
            return new Date(now.getFullYear(), now.getMonth(), 1);
        case "yearly":
            return new Date(now.getFullYear(), 0, 1);
        case "all":
            return null;
        default:
            return null;
    }
};
