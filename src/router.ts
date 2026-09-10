import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductBydId,
  getProducts,
  updatedAvailability,
  updatedProduct,
} from "./handlers/product";
import { handleInputErros } from "./middleware";

const router = Router();

// Routing
router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  handleInputErros,
  getProductBydId,
);

router.post(
  "/",
  // Validación
  body("name").notEmpty().withMessage("The name product is required"),
  body("price")
    .isNumeric()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("The price cannot be empty")
    .custom((value) => value > 0)
    .withMessage("Invalid price"),
  handleInputErros,
  createProduct,
);

router.put(
  "/:id", // Validación
  param("id").isInt().withMessage("ID not valid"),
  body("name").notEmpty().withMessage("The name product is required"),
  body("price")
    .isNumeric()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("The price cannot be empty")
    .custom((value) => value > 0)
    .withMessage("Invalid price"),
  body("availability").isBoolean().withMessage("Invalid availability value"),
  handleInputErros,
  updatedProduct,
);
router.patch(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  handleInputErros,
  updatedAvailability,
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  handleInputErros,
  deleteProduct,
);

export default router;
