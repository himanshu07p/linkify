import Joi from 'joi';

export const createUrlSchema = Joi.object({
  url: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .messages({
      'string.uri': 'Please provide a valid URL',
      'any.required': 'URL is required'
    }),
  customCode: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .optional()
    .messages({
      'string.alphanum': 'Custom code must contain only letters and numbers',
      'string.min': 'Custom code must be at least 3 characters long',
      'string.max': 'Custom code must be at most 20 characters long'
    })
});

export const shortCodeSchema = Joi.object({
  shortCode: Joi.string()
    .alphanum()
    .required()
    .messages({
      'string.alphanum': 'Invalid short code format',
      'any.required': 'Short code is required'
    })
});
