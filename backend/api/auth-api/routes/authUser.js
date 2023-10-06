import { Router } from 'express';
import authenticateToken from './middleware/authenticateToken.js';

import UserAuthorization from '../../../component/user-authorization/user-authorization.js';
import UserRepository from '../../../component/user-authorization/data/user-repository.js';

const router = Router();

router.post('/login', authenticateToken, async (req, res) => {
    const userAuthorization = new UserAuthorization(new UserRepository());
    const userData = req.body;
    const result = await userAuthorization.login(userData);

});

export default router;