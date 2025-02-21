// Define common token functions

import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { interfaceToken, User } from "./definitions";
import * as jwt from "jsonwebtoken";

export async function checkToken(){
    //Check if the user is logged in
    const cookieStore = await cookies();
    if(!cookieStore.get("Token")){
        return false
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
        return false;
    }
    return dataResponse;
}

export const createSessionCookie = async (userDB:User) => {
    
    console.debug("Creating cookie...")
    const tokenJSON:interfaceToken = {
        id: userDB.id,
        email: userDB.email,
        username: userDB.username,
        expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 7
    }
    const secret:string = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    //Create the token and check if its in dev to set the secure flag
    const token = jwt.sign(tokenJSON, secret, {expiresIn: "7d"});
    const tokenString = JSON.stringify(token);
    const cookieOptions:any = {
        httpOnly:true,
        sameSite:"strict",
        secure: process.env.NODE_ENV === "production",
        path:"/",
        maxAge:60 * 60 * 24 * 7,
    }
    //Set the cookie
    
    return {tokenString, cookieOptions}
}