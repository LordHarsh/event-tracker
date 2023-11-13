import { Router } from "express";
import { updateSheet } from "../../shared/utils/gsheets";

export default (): Router => {
    const app = Router();
    app.get('/', async (req, res) => {
        res.send('Hello World!');
    });
    return app;
};