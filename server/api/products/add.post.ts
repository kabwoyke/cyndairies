import { products } from "~~/server/db/schema"
import { db } from "~~/server/utils/db";
type ProductBody = {
    product_name:string,
    selling_price:string,
    cost_price:string,
    stock_quantity:string,
    description?:string
}

export default defineEventHandler(async(e)=>{

    const body = await readBody<ProductBody>(e)

    if(
        !body.product_name
        || !body.selling_price
        || !body.cost_price
        || !body.stock_quantity
    ){
        return {
            success:false,
            message:"Please Fill All The Fields!!"
        }
    }

    // @ts-ignore
    const product = await db.insert(products).values({cost_price:body.cost_price , selling_price:body.selling_price , stock_quantity:body.stock_quantity , product_name:body.product_name}).returning()

    return {
        success:true,
        data:product,
        message:"Product Added Successfully"
    }


})