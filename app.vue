<script setup>
const user = useSupabaseUser()
const loading = ref(true)

onMounted(() => {
  watchEffect(async () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 500);
    if (user.value) {
      // Redirect to the home page if the user is authenticated
      navigateTo("/")
    } else {
      if (!window.location.pathname.includes("/login") && !window.location.pathname.includes("/signup")) {
        navigateTo("/login")
      }
    }
    loading.value = false
  })
})

</script>

<template>
  <NuxtLoadingIndicator />
  <div v-if="loading">
    loading...................
  </div>
  <div v-else>
    <NuxtPage />
  </div>
</template>
