import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "Documentación oficial de la API de Productos",
    },
    tags: [
      {
        name: "Products",
        description: "Operaciones relacionadas con los productos",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID autogenerado del producto",
              example: 1,
            },
            name: {
              type: "string",
              description: "Nombre del producto",
              example: "Monitor Curvo de 49 Pulgadas",
            },
            price: {
              type: "number",
              description: "Precio del producto en dólares",
              example: 300,
            },
            availability: {
              type: "boolean",
              description: "Disponibilidad del producto",
              example: true,
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Product not found",
            },
          },
        },
        ValidationErrorResponse: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  msg: {
                    type: "string",
                    example: "The name product is required",
                  },
                },
              },
            },
          },
        },
      },
    },
    paths: {
      "/api/products": {
        get: {
          summary: "Obtener todos los productos",
          tags: ["Products"],
          responses: {
            200: {
              description: "Respuesta exitosa con la lista de productos",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/Product",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Crear un nuevo producto",
          tags: ["Products"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "Laptop Lenovo RTX 3050",
                    },
                    price: {
                      type: "number",
                      example: 3500,
                    },
                  },
                  required: ["name", "price"],
                },
              },
            },
          },
          responses: {
            201: {
              description: "Producto creado correctamente",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        $ref: "#/components/schemas/Product",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Error de validación en los campos enviados",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ValidationErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/products/{id}": {
        get: {
          summary: "Obtener un producto por su ID",
          tags: ["Products"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID único del producto",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Producto encontrado con éxito",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        $ref: "#/components/schemas/Product",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "ID no válido en la URL",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ValidationErrorResponse",
                  },
                },
              },
            },
            404: {
              description: "Producto no encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
        put: {
          summary: "Actualizar completamente un producto",
          tags: ["Products"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID del producto a actualizar",
              schema: {
                type: "integer",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "Monitor Curvo 32 Pulgadas",
                    },
                    price: {
                      type: "number",
                      example: 450,
                    },
                    availability: {
                      type: "boolean",
                      example: true,
                    },
                  },
                  required: ["name", "price", "availability"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Producto actualizado correctamente",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        $ref: "#/components/schemas/Product",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Errores de validación o ID no válido",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ValidationErrorResponse",
                  },
                },
              },
            },
            404: {
              description: "Producto no encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
        patch: {
          summary: "Cambiar la disponibilidad de un producto",
          tags: ["Products"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID del producto",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Disponibilidad actualizada",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        $ref: "#/components/schemas/Product",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "ID no válido",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ValidationErrorResponse",
                  },
                },
              },
            },
            404: {
              description: "Producto no encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
        delete: {
          summary: "Eliminar un producto",
          tags: ["Products"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID del producto a eliminar",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Producto eliminado correctamente",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "string",
                        example: "Deleted product",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "ID no válido",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ValidationErrorResponse",
                  },
                },
              },
            },
            404: {
              description: "Producto no encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
