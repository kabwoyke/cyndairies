<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Milk } from 'lucide-vue-next'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

type AuthenticationResponse = {
  message:string,
  success:boolean,
  accessToken?:string
}


const email = ref("")
const password = ref("")

const passwordError = ref<string|null>(null)
const emaillError = ref<string|null>(null)

const toast = useToast()
const router = useRouter()

// toast.success({title:"Error" , color:"red" , message:"hello" , position:"topCenter"})

async function login(){

    
    if(email.value.trim() === ""){
        emaillError.value = "Email cannot be empty"

        return
    }

    if(password.value.trim() === ""){

        passwordError.value = "Password field cannot be empty"

        return
    }

    try {
      const loginResponse = await $fetch<AuthenticationResponse>("/api/auth/login" , {
        method:"POST",
        body:{
          email:email.value,
          password:password.value
        }
      })

      // /console.log("res" , loginResponse)

      if(!loginResponse.success){

        toast.success({title:"Error" , color:"red" , message:loginResponse.message , position:"topCenter"})
        email.value = ""
        password.value = ""
        return

      }

      localStorage.removeItem("accessToken")
      localStorage.setItem("accessToken" , loginResponse.accessToken || "")

      router.replace({
        path:"/",
        query:{
          message:loginResponse.message
        }
      })
    } catch (error) {

      toast.success({title:"Error" , color:"red" , message:"an error ocuured!!" , position:"topCenter"})
      
    }

}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <div class="flex justify-center mb-6 items-center">
           <img src="../assets/drink.jpg" class="size-16" alt="" srcset="">
        </div>
        
        <CardTitle class="text-center">Login to your account</CardTitle>
        <CardDescription class="text-center">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="login">
          <div class="flex flex-col gap-6">
            <div class="grid gap-3">
              <Label for="email">Email</Label>
              <Input
              v-model="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div class="grid gap-3">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a
                  href="#"
                  class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" v-model="password" type="password" required />
            </div>
            <div class="flex flex-col gap-3">
              <Button type="submit" class="w-full cursor-pointer">
                Login
              </Button>
              <!-- <Button variant="outline" class="w-full">
                Login with Google
              </Button> -->
            </div>
          </div>
          <!-- <div class="mt-4 text-center text-sm">
            Don't have an account?
            <a href="#" class="underline underline-offset-4">
              Sign up
            </a>
          </div> -->
        </form>
      </CardContent>
    </Card>
  </div>
</template>
