import { Router } from "express";
import { getAllUsers, getUnverifiedUsers, verifyUser } from "./user.controller";
import authenticateToken from "../../shared/middlewares/authenticate";
import isAdmin from "../../shared/middlewares/isAdmin";

export default (): Router => {
    const router = Router();  
    router.get('/unverified', authenticateToken(), getUnverifiedUsers);
    router.get('/all', authenticateToken(), isAdmin(), getAllUsers);
    router.get('/verify/:id', authenticateToken(), isAdmin(), verifyUser);
    return router;
};