/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Express from "express";
const router = Express.Router();
/* GET home page. */
router.get("/ping", function (req, res, next) {
    res.status(200).json({
        message: "hello world",
    });
});
export default router;
