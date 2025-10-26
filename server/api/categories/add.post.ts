import { categories } from "~~/server/db/schema";
import { db } from "~~/server/utils/db";

type CategoryBody = {
    category_name:string
}

export default defineEventHandler(async(e)=>{

    const body = await readBody<CategoryBody>(e)

    if(body.category_name.trim() === ""){
        return {
            success:false,
            message:"Please fill the category name"
        }
    }

    const category = await db.insert(categories).values({name:body.category_name})

    return {
        success:true,
        message:"Category added Successfully",
        category
    }

    

})