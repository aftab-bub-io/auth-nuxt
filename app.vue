<script setup>
const user = useSupabaseUser()

onMounted(() => {
  watchEffect(async () => {
    console.log("watcheffect user", user.value);
    if (user.value) {
      // Redirect to the home page if the user is authenticated
      navigateTo("/")
    } else {
      if (!window.location.pathname.includes("/login") && !window.location.pathname.includes("/signup")) {
        navigateTo("/login")
      }
    }
  })
})

</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
