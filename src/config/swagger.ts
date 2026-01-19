import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HelpDesk API",
      version: "1.0.0",
      description: "Documentação da API do HelpDesk",
    },
    servers: [
      {
        url: "http://localhost:7771",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      }
    }
  },
  apis: [
    "src/routes/**/*.ts",
    "src/docs/**/*.ts"
],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
