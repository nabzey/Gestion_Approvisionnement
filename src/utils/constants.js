module.exports = {
  // Standard HTTP response codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500
  },

  // Standard messages
  MESSAGES: {
    SUCCESS: 'Opération effectuée avec succès',
    CREATED: 'Ressource créée avec succès',
    UPDATED: 'Ressource mise à jour avec succès',
    DELETED: 'Ressource supprimée avec succès',
    NOT_FOUND: 'Ressource non trouvée',
    UNAUTHORIZED: 'Accès non autorisé',
    FORBIDDEN: 'Accès refusé',
    INTERNAL_ERROR: 'Erreur interne du serveur',
    VALIDATION_ERROR: 'Échec de la validation'
  },

  // Response types
  RESPONSE_TYPE: {
    SUCCESS: 'success',
    ERROR: 'error'
  }
};
