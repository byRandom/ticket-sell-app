import { cookies } from "next/headers";
import {verify} from "jsonwebtoken";
import { interfaceToken } from "@/app/lib/definitions";
import { checkAdmin, getEvents } from "@/app/lib/db";
export async function GET(){
    //Check if the user is logged in
    const cookieStore = await cookies();

    if(!cookieStore.get("Token")){
        return Response.json({message:"Not logged in"}, {status:401});
    }
    //get the token
    const tokenCookie = cookieStore.get("Token");
    //clean the token
    const tokenValue = tokenCookie? tokenCookie.value : '';
    const cleanToken = tokenValue.replace(/"/g, '');
    //get the secret
    const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    //verify the token
    let dataResponse = verify(cleanToken, secret) as interfaceToken;
    if(!dataResponse){
        return Response.json({message:"Invalid token"}, {status:401});
    }
    
    const isAdmin = checkAdmin(dataResponse.id);
    if(!isAdmin){
        return Response.json({message:"Unauthorized"}, {status:401});
    }

    let events = await getEvents();


    //return the data
    return Response.json(events, {status:200});
}