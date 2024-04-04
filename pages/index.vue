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
  <header class="flex justify-evenly p-4 items-center border-b-2 m-auto">
    <div>Auther</div>
    <div>
      <button class="my-btn border-2" @click="signOut">Sign out</button>
    </div>
  </header>
  <div>
    <h1 class="text-center mt-4">Home</h1>
  </div>
</template>

<style>
.my-btn {
  background-color: rgb(47, 75, 167);
  border-radius: 5px;
  text-align: center;
  padding: 0.2rem 1rem !important;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 120px;
  height: 30px;
  margin: auto;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  font-size: 14px;
}
</style>