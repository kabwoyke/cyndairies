import { products } from "~~/server/db/schema"
import { db } from "~~/server/utils/db";

export default defineEventHandler(async(e)=>{

    try {

        const all_products = await db.select().from(products)
        return {
            success:true,
            products:all_products
        }
        
    } catch (error) {
        console.log(error)
        throw createError("An Error occured")
        
    }

})