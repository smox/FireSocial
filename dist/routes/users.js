"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
module.exports = router;
router.get("/", (req, res) => {
    res.send("Users Route...");
});
//# sourceMappingURL=users.js.map