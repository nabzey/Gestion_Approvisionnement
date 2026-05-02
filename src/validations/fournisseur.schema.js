const Joi = require('joi');

const fournisseurSchema = Joi.object({
  nom: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Le nom du fournisseur est requis',
    'string.min': 'Le nom doit contenir au moins 2 caractères',
    'string.max': 'Le nom ne doit pas dépasser 100 caractères',
    'any.required': 'Le nom est requis'
  }),
  telephone: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
    'string.empty': 'Le téléphone est requis',
    'string.pattern.base': 'Le numéro de téléphone doit contenir entre 10 et 15 chiffres',
    'any.required': 'Le téléphone est requis'
  }),
  adresse: Joi.string().trim().max(255).allow(null, '').messages({
    'string.max': 'L\'adresse ne doit pas dépasser 255 caractères'
  }),
  email: Joi.string().email().lowercase().trim().allow(null, '').messages({
    'string.email': 'Email invalide'
  }),
  actif: Joi.boolean().(true)
});

const updateFournisseurSchema = fournisseurSchema.fork(['email'], (field) => field.optional());

module.exports = {
  fournisseurSchema,
  updateFournisseurSchema
};

