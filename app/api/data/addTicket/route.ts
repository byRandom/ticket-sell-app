import { addEvent, addTicket, checkAdmin } from "@/app/lib/db";
import { ticketObject } from "@/app/lib/definitions";
import { checkToken } from "@/app/lib/token";



export async function POST(req:Request){
    //Check if the user is logged in
    const dataResponse = await checkToken();
    if(!dataResponse){
        return Response.json({message:"Invalid token"}, {status:401});
    }
    //Check if the user is an admin
    let data = await req.json();
    let ticket = data as ticketObject;
    let response = addTicket(ticket);

    return Response.json(response, {status:200});
}