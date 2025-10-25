import { usersTable } from "~~/server/db/schema";
import { AuthBody } from "./signup.post"
import { db } from "~~/server/utils/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export default defineEventHandler(async(e)=>{

    const body = await readBody<AuthBody>(e)

    console.log(body)

     if (body.email.trim() === "" || body.password.trim() === "") {
      throw createError({
        statusCode: 401,
        message: "Email or Password Cannot Be Null",
      });

    }

    const user = await db.select().from(usersTable).where(eq(usersTable.email , body.email)).limit(1)


    if(user.length<= 0){
      return {
        message: "invalid credentials",
        success: false,
      };
    }
    
    const password = user[0].password

    const isValidPassword = bcrypt.compare(body.password , password)

    if(!isValidPassword){

    setResponseStatus(e, 400);
        return {
        message: "invalid credentials",
        success: false,
      };
    }

    

    const accessToken = jwt.sign({email:user[0].email} , "kaboi" , {expiresIn:"1h"})
    const refreshToken = jwt.sign({email:user[0].email} , "kaboi" , {expiresIn:"1d"})


    setCookie(e , "access_token" , accessToken , {
        httpOnly:true,
        sameSite:"lax",
        maxAge: 60 * 60 * 24 * 7 // 7 days
    })

  
    return{
        success:true,
        accessToken,
        message:"Login Successfull"
    }



})