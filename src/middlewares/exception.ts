import { Request, Response, NextFunction } from 'express';

export function exceptionHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status = err.status || 500;
  const message = err.message || 'internal server error';

  res.status(status).json({
    statusCode: status,
    message: message,
    timestamp: new Date().toISOString(),
    path: req.path,
  });
}
