import {jwtDecode} from "jwt-decode"
export default defineNuxtRouteMiddleware(async (to , from) => {
    try{

     if (process.server) {
      return
    }
    const response = await $fetch("/api/auth/verify")

     if (!response.valid) {
      return navigateTo("/auth/login")
    }
    
    return

   }catch(e){
     return navigateTo("/auth/login")

    }
})