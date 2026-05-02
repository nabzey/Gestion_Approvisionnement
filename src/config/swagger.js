const swaggerUi = require('swagger-ui-express');
const { swaggerAutogen, doc, outputFile, routes } = require('./swagger-annotation');
const env = require('./env');

const swaggerOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }'
};

const initSwagger = async (app) => {
  if (!env.SWAGGER_ENABLED) {
    console.log('Swagger documentation is disabled');
    return;
  }

  try {
    // Generate documentation if it doesn't exist or to keep it updated
    await swaggerAutogen(outputFile, routes, doc);
    
    // Use dynamic require to avoid issues with missing files during first start
    const swaggerDocument = require('./swagger-output.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
    console.log('📄 Swagger documentation available at /api-docs');
  } catch (error) {
    console.error('⚠️ Failed to initialize Swagger:', error.message);
  }
};

module.exports = {
  initSwagger,
  swaggerUi,
  swaggerOptions
};
