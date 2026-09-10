import { Request, Response } from "express";
import Product from "../models/Product.module";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt", "availability"],
      },
    });
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductBydId = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const updatedProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Actualziar
  await product.update(req.body);
  await product.save();
  res.json({ data: product });
};

export const updatedAvailability = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Cambiar la disponibilidad alternando el valor actual
    product.availability = !product.availability;
    await product.save();

    return res.json({ data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Eliminar
  await product.destroy();
  res.json({ data: "Deleted product" });
};
