const express = require("express");
const authController = require("../Controllers/authController");
const todoController = require("../Controllers/todoController");
const middlewares = require("../MIddlewares/middleware");
const router = express.Router();

router.get("/gettodo",todoController.getdata)
router.post("/addtodo",middlewares.authMiddleware,todoController.adddata)
router.put("/updatetodo",todoController.update)
router.delete("/deletetodo",todoController.delete)
router.post("/signup",authController.signup)
router.post("/login",authController.login)


module.exports = router;