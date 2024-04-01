<script setup>
import { ref } from 'vue'
// const supabase = useSupabaseClient()


const submitted = ref(false)
const submitHandler = async (formData) => {
  // const { data, error } = await supabase.auth.signUp({
  //   name: formData.name,
  //   email: formData.email,
  //   password: formData.password,
  //   options: {
  //     data: {
  //       first_name: formData.name,
  //     }
  //   }
  // })
  console.log(formData);
}


const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>

<template>
  <div class="w-80 m-auto h-screen flex flex-col items-center justify-center">
    <FormKit type="form" id="registration-example" :form-class="submitted ? 'hide' : 'show'" submit-label="Register"
      @submit="submitHandler" :actions="false" #default="{ value }">
      <h1 class="text-2xl font-bold mb-2 text-center uppercase text-slate-800">Sign Up</h1>
      <FormKit type="text" name="name" label="Your name" placeholder="Jane Doe" help="What do people call you?"
        validation="required" />
      <FormKit type="text" name="email" label="Your email" placeholder="jane@example.com"
        help="What email should we use?" validation="required|email" />
      <div class="double">
        <FormKit type="password" name="password" label="Password" validation="required|length:6|matches:/[^a-zA-Z]/"
          :validation-messages="{
      matches: 'Please include at least one symbol',
    }" placeholder="Your password" help="Choose a password" prefix-icon="password" suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick" suffix-icon-class="hover:text-blue-500" />
        <FormKit type="password" name="password_confirm" label="Confirm password" placeholder="Confirm password"
          validation="required|confirm" help="Confirm your password" prefix-icon="password" suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick" suffix-icon-class="hover:text-blue-500" />
      </div>

      <FormKit type="submit" label="Register" :classes="{ outer: { 'my-button': true }, input: { $reset: true } }" />
      <!-- <pre wrap>{{ value }}</pre> -->
    </FormKit>
    <div v-if="submitted">
      <h2 class="text-xl text-green-500">Submission successful!</h2>
    </div>
    <p>
      <!-- <NuxtLink to="/login">Login</NuxtLink> -->
    </p>
  </div>
</template>

<style>
.my-button {
  background-color: rgb(47, 75, 167);
  border-radius: 5px;
  text-align: center;
  padding: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>