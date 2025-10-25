import jwt from "jsonwebtoken"
export default defineEventHandler(async(e)=>{

    try {

    const token = getCookie(e ,'access_token')
    if(!token) throw createError({ statusCode: 401, message: "Missing token" })
    const decoded = jwt.verify(token , "kaboi")
    return {
        valid:true,
        user:decoded
    }
        
    } catch (error) {

        throw createError({ statusCode: 401, message: "Invalid token" })
        
    }
    

})