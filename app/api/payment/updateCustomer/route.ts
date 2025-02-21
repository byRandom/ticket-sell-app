import { getCustomerByUid } from "@/app/lib/db";
import { checkToken } from "@/app/lib/token";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY: "");


export async function PATCH(req:Request){
    const data = await req.json();
    //Check if user is logged in
    const dataResponse = await checkToken();
    if(!dataResponse) return Response.json({message:"Invalid token"}, {status:401});
    //Check if user id is related to the payment customer id
    let customer = await getCustomerByUid(data.id)
    delete data.id
    console.debug(customer)
    await stripe.customers.update(customer.stripe_id, {...data})
    .then(res => console.log(res))

    return Response.json({message:"Customer updated"}, {status:200})
}