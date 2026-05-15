import { Response } from 'express';

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
  meta?: any
) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data: data || null,
    meta: meta || undefined,
  });
};
