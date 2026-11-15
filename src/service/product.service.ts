import path from "path";
import fs from "fs";
import type { IProducts } from "../types/product";
const filePath = path.join(process.cwd(), "./src/database/db.json");

export const productsService = () => {
  // console.log(filePath)
  const result = fs.readFileSync(filePath, "utf-8");
  console.log(result);
  return JSON.parse(result);
};

export const createProduct= (payLoad:IProducts[])=>{
fs.writeFileSync(filePath,JSON.stringify(payLoad))
}
