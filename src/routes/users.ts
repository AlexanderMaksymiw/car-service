import { Router } from "express";
import { usersController } from "../controllers/usersController.ts";

const router = Router();

router.get("/", usersController.getUsers);
router.get("/:user_id", usersController.getUserById);
router.post("/", usersController.createUser);
router.delete("/:user_id", usersController.deleteUser);

export default router;
