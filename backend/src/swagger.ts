import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'QR Code Management API',
            version: '1.0.0',
            description: 'API for managing QR codes, events, and analytics',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./routes/*.ts'], // Specify where your routes are defined
};

export const swaggerSpec = swaggerJsDoc(options);
