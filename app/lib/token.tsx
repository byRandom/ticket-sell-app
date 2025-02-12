// Define common token functions

import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { interfaceToken } from "./definitions";

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