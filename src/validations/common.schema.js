const Joi = require('joi');

const commonSchema = Joi.object({
  nom: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Le nom est requis',
    'string.min': 'Le nom doit contenir au moins 2 caractères',
    'string.max': 'Le nom ne doit pas dépasser 100 caractères',
    'any.required': 'Le nom est requis'
  }),
  email: Joi.string().email().lowercase().trim().required().messages({
    'string.email': 'Email invalide',
    'string.empty': 'L\'email est requis',
    'any.required': 'L\'email est requis'
  }),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).allow(null, '').messages({
    'string.pattern.base': 'Le numéro de téléphone doit contenir entre 10 et 15 chiffres',
    'any.required': 'Le téléphone est requis'
  }),
  adresse: Joi.string().trim().max(255).allow(null, '').messages({
    'string.max': 'L\'adresse ne doit pas dépasser 255 caractères'
  })
});

module.exports = {
  commonSchema
};
