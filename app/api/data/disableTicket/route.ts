import { disableTicket } from "@/app/lib/db";
import { ticketObject } from "@/app/lib/definitions";
import { checkToken } from "@/app/lib/token";


export async function PATCH(req:Request){
    //Check if the user is logged in
    const dataResponse = await checkToken();
    if(!dataResponse){
        return Response.json({message:"Invalid token"}, {status:401});
    }

    let data = await req.json();
    let ticket = data as ticketObject;
    let response = disableTicket(ticket);

    return Response.json(response, {status:200});
}