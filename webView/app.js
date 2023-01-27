// modules importing
import express from "express";
import path from "path";
import "dotenv/config";
import indexRouter from "./routes/index.js";
import apiRouter from "./routes/api.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
export const app = express();
// router and view
console.log(process.cwd());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use("/", indexRouter);
app.use("/api", apiRouter);
app.set("views", path.join(__dirname, "views"));
export async function start(port) {
    port = port || 8080;
    app.listen(port, () => console.log(`Server started on port ${port}`));
}
