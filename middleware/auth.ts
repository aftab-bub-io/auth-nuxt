export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser();
  // console.log(user)
  if (user.value) {
    navigateTo("/");
  }
});
