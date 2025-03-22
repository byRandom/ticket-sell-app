import { addEvent, checkAdmin } from "@/app/lib/db";
import { eventObject } from "@/app/lib/definitions";
import { checkToken } from "@/app/lib/token";



export async function POST(req:Request){
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

    let data = await req.json();
    let event = data as eventObject;
    let response = addEvent(event);

    return Response.json(response, {status:200});
}