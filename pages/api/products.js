import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function findAllProducts(){
    return Product.find().exec();
}

export default async function handle(req, res){
    await initMongoose();
    res.json(await findAllProducts());
}