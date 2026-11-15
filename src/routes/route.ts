import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controllers/product.controller";

const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  // console.log(url,method)
  if (url === "/" && method === "GET") {
    // console.log("This is root route")
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This is root route" }));
  } else if (url?.startsWith("/products")) {
    productController(req,res)
  } else {
    // console.log("This is not root route")
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This root route is not found" }));
  }
};

export default routeHandler;
