import swaggerJsDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HRMS API",
      version: "1.0.0",
      description: "HRMS Backend APIs"
    }
  },

  apis: [
    "./src/routes/**/*.ts"
  ]
});