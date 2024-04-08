<template>
    <section class="flex flex-col m-auto p-4">
        <div class="m-auto flex items-center">
            <FormKit type="form" id="todo-form" submit-label="Register" @submit="submitHandler" :actions="false"
                #default="{ value }">
                <FormKit type="text" name="todo" placeholder="start project" validation="required" />
                <FormKit type="submit" label="add"
                    :classes="{ outer: { 'my-button': true }, input: { $reset: true } }" />
            </FormKit>
        </div>
        <div class="flex flex-col m-auto">
            <ul class="w-full m-auto">
                <li class="flex justify-between p-4 items-center border-b-2 border-slate-300 m-auto gap-4"
                    v-for="todo in todoArr" :key="todo.id">
                    <div class="p-2">
                        <div class="text-slate-600 font-bold w-72 p-2" @click="updateTodo(todo.id)"
                            :class="{ 'line-through': todo.is_complete, 'no-underline': !todo.is_complete }">{{
                                todo.task }}</div>
                        <div class="text-slate-500 text-xs italic pl-2">-{{ formatTimestamp(todo.time) }}</div>
                    </div>
                    <div class="px-2 rounded-lg bg-red-900" @click="deleteTodo(todo.id)">
                        <button class="text-white fond-bold text-xm">X</button>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>


<script setup>
definePageMeta({
    middleware: 'auth',
    layout: 'custom'
});

onMounted(() => {
    getTodos()
})

const todoArr = ref([])
const supabase = useSupabaseClient()
const user = useSupabaseUser()
// const complete = ref(false)

const getTodos = async () => {
    let { data: tasks, error } = await supabase.from('tasks').select('*')
    todoArr.value = tasks
}

const formatTimestamp = (str) => {
    const [datePart, timePart] = str.split('T');
    const [timeWithoutMillis] = timePart.split('.');
    return `${datePart} ${timeWithoutMillis}`;
}

const deleteTodo = async (id) => {
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

    getTodos()
}

const updateTodo = async (id) => {
    const currentTodo = todoArr.value.find(todo => todo.id === id);
    const newCompletionStatus = !currentTodo.is_complete;

    const { data, error } = await supabase
        .from('tasks')
        .update({ is_complete: newCompletionStatus })
        .eq('id', id)
        .select()

    currentTodo.is_complete = newCompletionStatus
}

const submitHandler = async (formData) => {
    const { data, error } = await supabase
        .from('tasks')
        .insert([
            { user_id: user.value.id, email: user.value.email, task: formData.todo },
        ])
        .select()
    getTodos()
};
</script>


<style>
.formkit-inner {
    width: 300px;
    margin: auto;
}

.search-box {
    display: flex;
    border: 2px solid red;
}

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