import { checkAdmin, getTicketByUuid, getTickets } from "@/app/lib/db";
import { checkToken } from "@/app/lib/token";
import { type NextRequest } from 'next/server'


export async function GET(req:NextRequest){
    //Check if the user is logged in
    const dataResponse = await checkToken();
    if(!dataResponse){
        return Response.json({message:"Invalid token"}, {status:401});
    }
    //Check if the user is an admin

    const isAdmin = await checkAdmin(dataResponse.id);
    
    if(!isAdmin){
        return Response.json({message:"Unauthorized"}, {status:401});
    }

    //Extract ticket data from request

    let urlData = req.nextUrl.searchParams;
    let ticket = urlData.get("ticket");
    let user = urlData.get("user_id");

    //Check if the ticket is valid

    if(ticket){
        getTicketByUuid(ticket);
        let data = await getTicketByUuid(ticket);
        if(!data){
            return Response.json({message:"Ticket not found"}, {status:404});
        }

        return Response.json(data, {status:200});

    }

    //Get tickets by user

    if(user){
        let data = await getTickets(parseInt(user));
        return Response.json(data, {status:200});
    }
}