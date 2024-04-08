<template>
    <div>
        <header class="flex justify-evenly p-4 items-center border-b-2 m-auto">
            <div class="flex gap-2 list-none">
                <NuxtLink to="/">
                    <li class="font-bold text-slate-500 hover:text-slate-800">Auther</li>
                </NuxtLink>
                <NuxtLink to="/todo">
                    <li class="font-bold text-slate-500 hover:text-slate-800">Todo</li>
                </NuxtLink>
            </div>
            <div>
                <button class="my-btn border-2" @click="signOut">Sign out</button>
            </div>
        </header>
        <slot />
    </div>
</template>


<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();


async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        // Redirect to the login page after signing out
        navigateTo("/login");
    } else {
        console.error('Sign out error:', error.message);
    }
}
</script>