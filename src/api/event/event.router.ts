import { Router } from 'express';
import { createEvent } from './event.controller';
import authenticateToken from '../../shared/middlewares/authenticate';
import { validateRequest } from '../../shared/middlewares/valiator';
import { createEventSchema } from './event.schema';
import isAdmin from '../../shared/middlewares/isAdmin';

export default (): Router => {
    const app = Router();
    app.post('/create', authenticateToken(), isAdmin(), validateRequest("body", createEventSchema), createEvent);
    return app;
};