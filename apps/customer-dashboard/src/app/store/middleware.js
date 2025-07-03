import { createLogger } from 'redux-logger';

export const middleware = [
  process.env.NODE_ENV === 'development' && createLogger({
    collapsed: true,
  }),
].filter(Boolean); 