const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

// POST /users/signup
router.post("/signup", userController.signup);

// POST /users/login
router.post("/login", userController.login);

// GET /users/:id
router.get("/:id", userController.getUser);

// PUT /users/:id
router.put("/:id", userController.updateUser);

// DELETE /users/:id
router.delete("/:id", userController.deleteUser);

module.exports = router;
