import { getUserData } from "@/app/lib/db";
import {  User } from "@/app/lib/definitions";
import { checkCredentials, checkPassword, checkUserExists } from "@/app/lib/userFunctions";
import { createSessionCookie } from "@/app/lib/token";
import { cookies } from "next/headers";
export async function POST(req:Request){
    //Check if theres some usable credentials in body
    try{
        const data:Exclude<User, "id"> = await req.json();
        const cookieStore = await cookies();
        checkCredentials(data)
        //////////////////////////////////////////
        await checkUserExists(data)
        //////////////////////////////////////////
        console.log(data.email)
        const userDB:User = await getUserData(data.email);
        checkPassword(data, userDB)
        //////////////////////////////////////////
        const cookieData = await createSessionCookie(userDB)
        cookieStore.set("Token", cookieData.tokenString, cookieData.cookieOptions);
        //Return a success message
       return Response.json({message:"Logged in succesfully"} , {status:200})
    }catch(e){
        Response.json({message:"Internal server error"}, {status:500})
    }
    
}