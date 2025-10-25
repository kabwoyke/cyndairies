
<script setup lang="ts">
import LoginForm from '~/components/LoginForm.vue';
import 'vue3-toastify/dist/index.css';

let route = useRoute()
let router = useRouter()
const toast = useToast()

if(route.query.signup_success != undefined){
  toast.success({ title: 'Success!', message: route.query?.signup_success.toString() , position:"topCenter" })
  router.replace({path:route.path , query:{}})
}

</script>
<template>
  <div class="flex h-screen w-full items-center justify-center px-4">
    <LoginForm class="w-full max-w-md"/>
  </div>
</template>