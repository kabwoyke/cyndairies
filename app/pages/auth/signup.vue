<template>
    <div class="h-screen flex justify-center items-center p-6">
        <Card class="w-full max-w-md p-10">

            <CardHeader>
                <img src="../../assets/drink.jpg" class="size-18 mx-auto" alt="" srcset="">
                  <h2 class="text-center mb-4 font-bold">Sign Up</h2>
            </CardHeader>
        <CardContent>
        <form @submit.prevent="signup">
            <div>
                 <Input v-model="email" placeholder="Email" class="mb-4" type="email" />
                 <p v-if="emaillError" class="text-red-500 text-sm">{{ emaillError }}</p>
            </div>

             <div class="mt-6 mb-4">
                
                 <Input v-model="password" placeholder="password" class="mb-4" autocomplete="off" type="password" />
                  <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
            </div>

             <div>
                <Button type="submit" :disabled="isLoading" class="cursor-pointer">
                    <Spinner v-if="isLoading"/>
                    SignUp
                </Button>
            </div>
            <div class="mt-4">
                <p>Have an accoutn <NuxtLink href="/auth/login" >Login</NuxtLink> </p>
            </div>
        </form>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { isJSDocClassTag } from 'typescript';
import { routerKey } from 'vue-router';
import Button from '~/components/ui/button/Button.vue';
import Card from '~/components/ui/card/Card.vue';
import CardContent from '~/components/ui/card/CardContent.vue';
import CardHeader from '~/components/ui/card/CardHeader.vue';
import Input from '~/components/ui/input/Input.vue';
import Spinner from '~/components/ui/spinner/Spinner.vue';

const email = ref("")
const password = ref("")
const isLoading = ref(false)

const passwordError = ref<string|null>(null)
const emaillError = ref<string|null>(null)

const router = useRouter()


async function signup(){

     
    if(email.value.trim() === ""){
        emaillError.value = "Email cannot be empty"

        return
    }

    if(password.value.trim() === ""){

        passwordError.value = "Password field cannot be empty"

        return
    }

    try {

        isLoading.value = true

        const response = await $fetch("/api/auth/signup" , {method:"POST" , body:{
            email:email.value,
            password:password.value
        }})

        if(response.code == 201){
            isLoading.value = false

            router.push({path:"/auth/login" , query:{
                signup_success:"Account Created Successfully"
            }})

            
        }
        
    } catch (error) {
         isLoading.value = false
        console.error(error)
        
    }
    
   

  

}

</script>