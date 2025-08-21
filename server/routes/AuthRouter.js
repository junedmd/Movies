import express from "express";
const router =express.Router();

import { signupValidation,loginValidation } from "../middleware/Authvalidation.js";
import {postUser, postLogin, getUser ,deleteUser} from "../controllers/user.js";

router.post("/signup",signupValidation,postUser);

router.post("/login",loginValidation,postLogin);

router.get("/users",getUser);

router.delete("/users/:id",deleteUser);


// app.post("/api/users",postUser);
// app.post("/api/logins",postLogin);
// app.get("/api/users",getUser)

export default router;