import { getUserData } from "@/app/lib/db";
import {  User } from "@/app/lib/definitions";
import { checkCredentials, checkPassword, checkUserExists } from "@/app/lib/userFunctions";
import { createSessionCookie } from "@/app/lib/token";
export async function POST(req:Request){
    //Check if theres some usable credentials in body
    const data:Exclude<User, "id"> = await req.json();
    checkCredentials(data)
    //////////////////////////////////////////
    await checkUserExists(data)
    //////////////////////////////////////////
    const userDB:User = await getUserData(data.email);
    checkPassword(data, userDB)
    //////////////////////////////////////////
    createSessionCookie(userDB)
    //Return a success message
   return Response.json({message:"Logged in succesfully"} , {status:200})
}