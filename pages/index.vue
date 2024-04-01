<script setup>
const user = useSupabaseUser()
const { auth } = useSupabaseClient()
const runtimeConfig = useRuntimeConfig()

console.log('auth', auth)
console.log('user', user)
console.log('runtimeConfig', runtimeConfig.app.baseURL)

</script>

<template>
    <h1>Home / Login</h1>
</template>