import { neon } from "@neondatabase/serverless";
import process from "process";
import { Credentials, Login } from "./definitions";
export async function getData() {
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM users;`;
    return data;
}

export async function createUser(credentials:Credentials){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`INSERT INTO users (email, username, password, receive_promotions) VALUES (${credentials.email}, ${credentials.user}, ${credentials.password}, ${credentials.receive_promotions})`;
    return data;
}

export async function checkDuplicateEmail(email: string){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM users WHERE email = ${email}`;
    return data.length;
}

export async function getUserData(email: string){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM users WHERE email = ${email}`;
    return data;
}