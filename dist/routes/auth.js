"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require("express").Router();
module.exports = auth;
const User = require("../models/User");
auth.get("/", (req, res) => {
    res.send("Auth Route...");
});
auth.get("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield new User({
        username: "John",
        email: "john@gmail.com",
        password: "123456"
    });
    yield user.save();
    res.send("OK");
}));
//# sourceMappingURL=auth.js.map