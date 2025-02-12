import { getUserData } from "@/app/lib/db";
import { Login } from "@/app/lib/definitions";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import process from "process";
export async function POST(req:Request){
    //Check if theres some usable credentials in body
    const data: Login = await req.json();
    if(!data.email || !data.password){
        return Response.json({message:"Missing credentials"}, {status:400})
    }
    //Check if the credentials are valid
    if(data.email.length < 6 || data.password.length < 6){
        return Response.json({message:"Invalid credentials"}, {status:400})
    }

    if(data.email.length > 255 || data.password.length > 255){
        return Response.json({message:"Invalid credentials"}, {status:400})
    }
    //////////////////////////////////////////

    //Check if the user exists
    const user = await getUserData(data.email);
    if(user.length === 0){
        return Response.json({message:"Invalid credentials"}, {status:401})
    }
    //////////////////////////////////////////

    //Check if the password is correct
    const match = await bcrypt.compare(data.password, user[0].password);
    console.log(match)
    if(!match){
        return Response.json({message:"Invalid credentials"}, {status:401})
    }
    //////////////////////////////////////////

    //Set the cookie
    const cookieStore = await cookies();
    const tokenJSON = {
        id: user[0].id,
        email: user[0].email,
        username: user[0].username,
        expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 7
    }
    const secret:string = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    const token = jwt.sign(tokenJSON, secret, {expiresIn: "7d"});
    const tokenString = JSON.stringify(token);


    cookieStore.set("Token", tokenString, {httpOnly:true, sameSite:"strict"})


    //Return a success message
   return Response.json({message:"Logged in succesfully"} , {status:200})
}