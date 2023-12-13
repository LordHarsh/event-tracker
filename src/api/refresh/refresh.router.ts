import { Router } from "express";
import { refresh } from "./refresh.controller";

export default (): Router => {
    const app = Router();
    app.get("/", refresh);
    return app;
}