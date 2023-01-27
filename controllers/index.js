import { Router } from 'express';

import apiRoutes from './api';
import homeRoutes from './homeRoutes';

const router = Router();

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

export default router;