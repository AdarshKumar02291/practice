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
const express = require("express");
const app = express();
const cors = require("cors");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
app.use(express.json());
app.use(cors());
app.get("/api/v1/testing", (req, res) => {
    res.json({ msg: "testing" });
});
app.post("/api/v1/signin", (req, res) => {
    res.json({ msg: "hellow from signin" });
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    const user = yield prisma.user.findFirst({
        where: {
            username: body.username
        }
    });
    if (user)
        return res.json({ "msg": "user already" });
    try {
        const user = yield prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                firstName: body.firstName,
                lastName: body.lastName
            }
        });
        return res.json({ "msg": 'user created' });
    }
    catch (e) {
        return res.status(403);
    }
}));
app.listen(5000);
// postgresql://adarsh.kumar02291:9ZDFl7ChTcYH@ep-bitter-field-a1v4l1da.ap-southeast-1.aws.neon.tech/test?sslmode=require
