import { memoryStorage } from 'multer';

export const MULTER_CONFIG = {
  storage: memoryStorage(),
};
