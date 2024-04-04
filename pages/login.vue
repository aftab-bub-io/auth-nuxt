<script setup>
import { ref } from 'vue'
const supabase = useSupabaseClient()

definePageMeta({
    middleware: 'auth'
})

const submitted = ref(false)
const submitHandler = async (formData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
    })
}


const handleIconClick = (node, e) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
    })
}

async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    })
}

async function signInWithLinkedIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
    })
}

async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithOtp({
        email: 'example@email.com',
        options: {
            // set this to false if you do not want the user to be automatically signed up
            shouldCreateUser: false,
            emailRedirectTo: 'https://example.com/welcome',
        },
    })
    console.log('data', data, error)
}



</script>

<template>
    <div class="w-80 m-auto h-screen flex flex-col items-center justify-center">
        <FormKit type="form" id="registration-example" :form-class="submitted ? 'hide' : 'show'" submit-label="Register"
            @submit="submitHandler" :actions="false" #default="{ value }">
            <h1 class="text-2xl font-bold mb-2 text-center uppercase text-slate-800">Log In</h1>
            <FormKit type="text" name="email" label="Your email" placeholder="jane@example.com"
                help="What email should we use?" validation="required|email" />
            <div class="double">
                <FormKit type="password" name="password" label="Password"
                    validation="required|length:6|matches:/[^a-zA-Z]/" :validation-messages="{
            matches: 'Please include at least one symbol',
        }" placeholder="Your password" help="Choose a password" prefix-icon="password" suffix-icon="eyeClosed"
                    @suffix-icon-click="handleIconClick" suffix-icon-class="hover:text-blue-500" />
            </div>

            <FormKit type="submit" label="Login" :classes="{ outer: { 'my-button': true }, input: { $reset: true } }" />
            <!-- <pre wrap>{{ value }}</pre> -->
        </FormKit>
        <p class="text-slate-600 p-2 font-semibold">Not a member? <NuxtLink to="/signup" class="text-red-600 font-semibold">
                Signup</NuxtLink>
        </p>
        <div class="flex flex-wrap justify-around mt-2 gap-2">
            <button @click="signInWithEmail" class="my-button">Magic Link</button>
            <button @click="signInWithGithub" class="my-button">Github</button>
            <button @click="signInWithGoogle" class="my-button">Google</button>
            <button @click="signInWithLinkedIn" class="my-button">LinkedIn</button>
        </div>
    </div>
</template>

<style>
.my-button {
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
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}
</style>