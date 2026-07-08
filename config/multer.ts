import multer from "multer";
import path from "node:path";
import fs from "node:fs";

// const dir = "uploads/avatars";
const dir = path.join(process.cwd(), "uploads", "avatars");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
    destination: dir,
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only jpg, png, webp, gif allowed"));
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
