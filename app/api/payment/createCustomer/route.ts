import { checkCustomerExists, saveCustomerData } from "@/app/lib/db";
import { checkToken } from "@/app/lib/token";
import Stripe from "stripe";

const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : ""
);

export async function POST(req: Request) {
    const data = await req.json();

    //check if user is logged in
    const dataResponse = await checkToken();
    if (!dataResponse) return Response.json({ message: "Invalid token" }, { status: 401 });

    const customer = await stripe.customers.create(data && { ...data });

    //Check if customer exists in db

    let customerExists = await checkCustomerExists(dataResponse.id);
    if (customerExists) {
        return Response.json(
            { message: "Customer already exists" },
            { status: 400 }
        );
    }
    //save the customer data

    let customerData = await saveCustomerData(dataResponse.id, customer.id);

    console.log(customerData);
    return Response.json(customer, { status: 200 });
}
