import { categories } from "~~/server/db/schema"
import {db} from "~~/server/utils/db"
export default defineEventHandler(async(e)=>{
    try {

        const all_categories = await db.select().from(categories)

        return {
            success:true,
            all_categories
        }
        
    } catch (error) {

        console.error(error)
        
    }
})