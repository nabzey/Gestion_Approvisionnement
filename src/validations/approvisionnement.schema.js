const Joi = require('joi');

const approvisionnementSchema = Joi.object({
  fournisseurId: Joi.number().integer().positive().required().messages({
    'number.base': 'L\'ID du fournisseur doit être un nombre',
    'number.integer': 'L\'ID du fournisseur doit être un entier',
    'number.positive': 'L\'ID du fournisseur doit être positif',
    'any.required': 'Le fournisseur est requis'
  }),
  produitId: Joi.number().integer().positive().required().messages({
    'number.base': 'L\'ID du produit doit être un nombre',
    'number.integer': 'L\'ID du produit doit être un entier',
    'number.positive': 'L\'ID du produit doit être positif',
    'any.required': 'Le produit est requis'
  }),
  quantite: Joi.number().integer().min(1).required().messages({
    'number.base': 'La quantité doit être un nombre',
    'number.integer': 'La quantité doit être un entier',
    'number.min': 'La quantité doit être au moins 1',
    'any.required': 'La quantité est requise'
  }),
  date: Joi.date().(() => new Date()).messages({
    'date.base': 'La date doit être une date valide'
  })
});

const updateApprovisionnementSchema = Joi.object({
  quantite: Joi.number().integer().min(1).messages({
    'number.base': 'La quantité doit être un nombre',
    'number.integer': 'La quantité doit être un entier',
    'number.min': 'La quantité doit être au moins 1'
  }),
  date: Joi.date().messages({
    'date.base': 'La date doit être une date valide'
  })
});

module.exports = {
  approvisionnementSchema,
  updateApprovisionnementSchema
};
