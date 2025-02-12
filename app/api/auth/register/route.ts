import { checkDuplicateEmail, createUser } from "@/app/lib/db";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
    let data = await req.json();
    data.password = await bcrypt.hash(data.password, 10);
    if(await checkDuplicateEmail(data.email) > 0){
        return Response.json({message: "Email already exists"}, {status: 400});
    };
    try {
        await createUser(data);
    } catch (e) {
        return Response.json({message: "Error creating user"}, {status: 500});
    }
    return Response.json({ message:"User created successfully" }, { status: 200 });
}