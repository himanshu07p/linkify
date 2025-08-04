import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validateBody = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      res.status(400).json({
        success: false,
        error: error.details[0]?.message || 'Validation error'
      });
      return;
    }
    
    next();
  };
};

export const validateParams = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.params);
    
    if (error) {
      res.status(400).json({
        success: false,
        error: error.details[0]?.message || 'Validation error'
      });
      return;
    }
    
    next();
  };
};
