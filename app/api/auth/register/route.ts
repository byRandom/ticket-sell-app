import { checkDuplicateEmail, createUser } from "@/app/lib/db";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
    //Parse credentials from body
    let data = await req.json();
    //Check if email is duplicated
    if(await checkDuplicateEmail(data.email) > 0){
        return Response.json({message: "Email already exists"}, {status: 400});
    };
    try {
        data.password = await bcrypt.hash(data.password, 10);
        await createUser(data);
    } catch (e) {
        return Response.json({message: "Error creating user"}, {status: 500});
    }
    return Response.json({ message:"User created successfully" }, { status: 200 });
}