// Purpose: Provide the route for listing events
import { checkAdmin, getEvents } from "@/app/lib/db";
import { checkToken } from "@/app/lib/token";
export async function GET(){

    //Check if the user is logged in
    const dataResponse = await checkToken();
    if(!dataResponse){
        return Response.json({message:"Invalid token"}, {status:401});
    }
    //get the events
    let events = await getEvents();

    //return the data
    return Response.json(events, {status:200});
}