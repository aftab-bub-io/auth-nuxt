// export default defineNuxtRouteMiddleware((to, from) => {
//   const user = useSupabaseUser();

//   if (to.path === "/login" || to.path === "/signup") {
//     if (user.value) {
//       return navigateTo("/");
//     }
//     return;
//   }
//   if (!user.value) {
//     return navigateTo("/login");
//   }
//   return;
// });

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();


  if (to.path === "/login" || to.path === "/signup") {
    if (user.value) {
      return navigateTo("/");
    }
    return 
  }
  if (!user.value) {
    return navigateTo("/login");
  }
  return;
});