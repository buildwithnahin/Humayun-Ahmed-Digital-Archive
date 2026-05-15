import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import workRoutes from './routes/work.routes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use('/api/v1/works', workRoutes);

// Catch undefined routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global Error Handler
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode.`);
});
