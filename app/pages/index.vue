<template>


    <section class="container mx-auto px-4 py-8">

        <nav class="p-4">
            <div class="flex justify-between items-center">

            <ul class="flex gap-4 text-xl">
                <li><a class="font-bold text-white bg-primary p-2 rounded-[40rem]" href="">Home</a></li>
                <li><a href="">Reports</a></li>
                 <li><a href="">Analytics</a></li>
            </ul>

            <!-- <img src="../assets//drink.jpg" alt="logo" class="size-8 self-center" > -->

            <ul>
                <li>
                    <Moon/>
                </li>
            </ul>
            </div>
        </nav>

        <header class="flex flex-row-reverse p-4 gap-4">

            <Dialog>
                <DialogTrigger as-child>
                    <Button variant="outline">
                        <PlusCircle />
                        Add Category
                    </Button>
                </DialogTrigger>

                <DialogContent class="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Category</DialogTitle>
                        <DialogDescription>Fill The Form To Add Category</DialogDescription>
                    </DialogHeader>

                    <!-- category form fields go here -->
                      <form action="">
                    <div class="grid gap-2.5 mt-4">
                       
                        <Label for="category_name">Category Name</Label>
                        <Input id="category_name" placeholder="Category Name" />
                       
                    </div>

                    <div class="flex flex-row-reverse mt-6">
                        <Button type="submit">
                            <PlusCircle />
                            Add Category
                        </Button>
                    </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog>

                <DialogTrigger as-child>
                    <Button>
                        <PlusCircle />
                        Add Product
                    </Button>

                </DialogTrigger>

                <DialogContent class="sm:max-w-[425px] lg:max-w-[900px]">
                    <DialogHeader>
                        <DialogTitle>
                            Add Product
                        </DialogTitle>
                        <DialogDescription>
                            Add Your Product Details
                        </DialogDescription>
                    </DialogHeader>
                    <form @submit.prevent="add_product">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="grid gap-2.5">
                            <Label for="product_name">Product Name</Label>
                            <Input v-model="product_name" id="product_name" placeholder="Product Name" />
                            <p v-if="product_name_error"> {{product_name_error}}</p>
                        </div>

                        <div class="grid gap-2.5">
                            <Label for="selling_price">Selling Price</Label>
                            <Input v-model="selling_price" id="selling_price" placeholder="Selling Price" type="number" />
                            <p v-if="selling_price_error">{{ selling_price_error }}</p>
                        </div>

                        <div class="grid gap-2.5">
                            <Label for="cost_price">Cost Price</Label>
                            <Input v-model="cost_price" id="cost_price" placeholder="Cost Price" type="number" />
                             <p v-if="cost_price_error">{{ cost_price_error }}</p>
                        </div>

                        <div class="grid gap-2.5">
                            <Label for="stock_quantity">Stock Quantity</Label>
                            <Input v-model="stock_quantity" id="stock_quantity" placeholder="Stock Quantity" type="number" />
                             <p v-if="stock_quantity_error">{{ stock_quantity_error }}</p>
                        </div>

                        <div class="grid gap-2.5 col-span-2">
                            <Label for="product_description">Description(optional)</Label>
                            <Textarea v-model="description" placeholder="description" />

                        </div>


                    </div>

                    <div class="flex flex-row-reverse mt-6">
                        <Button>
                            <PlusCircle />
                            Add Product
                        </Button>


                    </div>
                    </form>

                </DialogContent>

            </Dialog>

            <Dialog>
                <DialogTrigger>

                </DialogTrigger>
            </Dialog>

        </header>
        <div class="grid lg:grid-cols-3 gap-4 sm:grid-cols-1">
            <Card class="bg-primary">
                <CardHeader>
                    <Store class="size-8 text-white" />
                    <h2 class="text-white text-xl font-bold">Total Products</h2>
                </CardHeader>

                <CardContent>

                    <span class="text-white text-3xl font-bold">{{ products.length ?? 0 }}</span>

                </CardContent>

            </Card>

            <Card>

                <CardHeader>
                    <CircleDollarSign class="size-8" />
                    <h2 class="text-xl font-bold text-gray-800">Total Sales</h2>
                </CardHeader>

                <CardContent>

                    <span class="text-2xl text-gray-800 font-bold">0</span>

                </CardContent>

            </Card>

            <Card class="border-t-primary border-t-4">

                <CardHeader>
                    <CircleDollarSign class="size-8" />
                    <h2 class="text-xl font-bold text-gray-800">Total Categories</h2>
                </CardHeader>

                <CardContent>

                    <span class="text-2xl text-gray-800 font-bold">0</span>

                </CardContent>

            </Card>
        </div>

        <div class="mt-10">
            <Table>
                <TableCaption>A list of your recent products.</TableCaption>
                <TableHeader class="bg-primary">
                    <TableRow class="">
                        <TableHead class="w-[100px] text-white">
                            Product Name
                        </TableHead>
                        <TableHead class="text-white">Stock Quantity</TableHead>
                        <TableHead class="text-white">Cost Price</TableHead>
                        <TableHead class="text-right text-white">
                            Selling Price
                        </TableHead>

                        <TableHead class="text-right text-white">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="product in products" :key="product.product_name">
                        <TableCell class="font-medium">
                            {{ product.product_name }}
                        </TableCell>
                        <TableCell>{{ product.stock_quantity }}</TableCell>
                        <TableCell>{{ product.cost_price }}</TableCell>
                        <TableCell class="text-right">
                            {{ product.selling_price }}
                        </TableCell>

                        <TableCell class="text-right">
                            <Button variant="outline" class="mx-4 cursor-pointer hover:text-white">Update
                                Product</Button>
                            <Button variant="destructive" class="cursor-pointer">Delete Product</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </section>


</template>


<script setup lang="ts">
import Card from '~/components/ui/card/Card.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import { Store, CircleDollarSign, PlusCircle , Moon } from "lucide-vue-next"
import CardContent from '~/components/ui/card/CardContent.vue'
import Button from '~/components/ui/button/Button.vue'
import Table from '~/components/ui/table/Table.vue'
import TableCaption from '~/components/ui/table/TableCaption.vue'
import TableHeader from '~/components/ui/table/TableHeader.vue'
import TableRow from '~/components/ui/table/TableRow.vue'
import TableHead from '~/components/ui/table/TableHead.vue'
import TableBody from '~/components/ui/table/TableBody.vue'
import TableCell from '~/components/ui/table/TableCell.vue'
import Dialog from '~/components/ui/dialog/Dialog.vue'
import DialogTrigger from '~/components/ui/dialog/DialogTrigger.vue'
import DialogContent from '~/components/ui/dialog/DialogContent.vue'
import DialogHeader from '~/components/ui/dialog/DialogHeader.vue'
import DialogTitle from '~/components/ui/dialog/DialogTitle.vue'
import DialogDescription from '~/components/ui/dialog/DialogDescription.vue'
import Input from '~/components/ui/input/Input.vue'
import Label from '~/components/ui/label/Label.vue'
import Textarea from '~/components/ui/textarea/Textarea.vue'


interface Product{
    id:string,
    product_name:string,
    selling_price:string,
    cost_price:string,
    stock_quantity:string,
}


interface ProductResponse {
    products:Product[],
    success:boolean
}

const toast = useToast()
const route = useRoute()
const router = useRouter()


const product_name = ref("")
const selling_price = ref("")
const stock_quantity = ref("")
const cost_price = ref("")
const description = ref("")

const product_name_error = ref<string | null >(null)
const selling_price_error = ref<string | null >(null)
const stock_quantity_error = ref<string | null >(null)
const cost_price_error = ref<string | null >(null)

const isLoading = ref(false)

const products = ref<Product[] | []>([])

definePageMeta({
    middleware: ['auth']
})

if (route.query.message) {
    toast.success({ title: "Login Success", message: route.query.message.toString() })
    router.replace({ path: route.path, query: {} })
}


async function add_product(){

    // alert("hello")

    if(!product_name.value){
        product_name_error.value = "Please fill the product name"
        return
    }

     if(!selling_price.value){
        selling_price_error.value = "Please fill the selling price"
        return
    }

    if(!stock_quantity.value){
        stock_quantity_error.value = "Please fill the selling price"
        return
    }

    if(!cost_price.value){
        cost_price_error.value = "Please fill the cost price"
        return
    }

    const response = await $fetch("/api/products/add" , {
        method:"POST",
        body:{
            product_name:product_name.value,
            selling_price:selling_price.value,
            cost_price:cost_price.value,
            stock_quantity:stock_quantity.value,
            description:description.value
        }
    })

    if(!response.success){
        toast.error({title:"An error Occured" , message:response.message , position:"topCenter"})
        return
    }

    toast.success({message:`${product_name.value} added successfully` , position:"topCenter"})

    product_name.value = ""
    cost_price.value = ""
    selling_price.value = ""
    description.value = ""
    stock_quantity.value = ""

    await get_all_products()

}

async function get_all_products(){
    try {
        
        const db_products = await $fetch<ProductResponse | null>("/api/products")

        if(!db_products){
            toast.error({title:"Error" , message:"Error in getting products from the database" , position:"topCenter" })
            return
        }

        products.value = db_products.products


    } catch (error) {
        
    }
}

onMounted(async()=>{
    await get_all_products()
})
</script>