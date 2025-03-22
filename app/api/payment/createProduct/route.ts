import {  getProductByName, saveProductData, updateEventProduct } from "@/app/lib/db";
import { product } from "@/app/lib/definitions";
import { checkToken } from "@/app/lib/token";
import Stripe from "stripe";

const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : ""
);

export async function POST(req: Request) {
        const data = await req.json();
        const productName = data.name;
        const eventId = data.eventId;
        //Check if the user is logged in
        const dataResponse = await checkToken();
        if (!dataResponse) return Response.json({ message: "Invalid token" }, { status: 401 });
    
        //check if the product already exists
        let productdb = await getProductByName(data.name);
        if (productdb) {
            return Response.json({ message: "Product already exists" }, { status: 400 });
        }
        
        //create the product
        const product = await stripe.products.create(data && { name:productName });
        if(product){
            let savedProduct = await saveProductData(product);
            console.log(savedProduct);
            
            //Update event product id
            let update = await updateEventProduct(eventId, product.id);
            if(update){
                return Response.json(product, { status: 200 });
            }
        }
    
        return Response.json({ message: "Error creating product" }, { status: 500 });

}