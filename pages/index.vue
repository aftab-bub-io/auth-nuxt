<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
// const { auth } = useSupabaseClient()
// const runtimeConfig = useRuntimeConfig()

definePageMeta({
    middleware: 'auth'
})
async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (!error) {
    // Redirect to the login page after signing out
    navigateTo("/login")
  } else {
    console.error('Sign out error:', error.message)
  }
}

</script>

<template>
    <h1>Home / Login</h1>
    <button @click="signOut">Sign out</button>
</template>