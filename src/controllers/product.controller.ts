import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productsService } from "../service/product.service";
import type { IProducts } from "../types/product";
import { bodyParser } from "../utils/ParseBody";
import { sendResponse } from "../utils/sendResponse";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  //get single product
  const urlParams = url?.split("/");
  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

  //get all product
  if (url === "/products" && method === "GET") {
   try {
     const products = productsService();
     sendResponse(res,true,200,"Products retrived successfully",products)
   } catch (error) {
     sendResponse(res,false,201,"Internal server error")
   }
  } else if (method === "GET" && id !== null) {
    try {
      const products = productsService();
    const product = products.find((p: IProducts) => p.id === id);

    if (!product) {
      
    return sendResponse(res,false,404,"Products not found")
    }
     sendResponse(res,true,200,"Products retrived successfully",product)
    } catch (error) {
      sendResponse(res,false,201,"Internal server error")
    }
  } else if (method === "POST" && url === "/products") {
    const body = await bodyParser(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    const products = productsService();
    products.push(newProduct);

    createProduct(products);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products created successfully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await bodyParser(req);
    const products = productsService();

    const index = products.findIndex((p: IProducts) => p.id === id);
    // console.log(index)

    if (index < 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Products not found ",
        }),
      );
    }

    products[index] = { id: products[index].id, ...body };
    createProduct(products);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products updated successfully",
        data: products[index],
      }),
    );
  } else if (method === "DELETE" && id !== null) {
    const products = productsService();
    const index = products.findIndex((p: IProducts) => p.id === id);
    // console.log(index)

    if (index < 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Products not found ",
        }),
      );
    }

    products.splice(index,1)
    createProduct(products)

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products deleted successfully",
      }),
    );
  }
};
export default productController;
