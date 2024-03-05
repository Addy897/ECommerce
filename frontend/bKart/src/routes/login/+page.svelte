<style>
    .body-bg{    
    background-color: #9921e8;
    background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
    }
</style>
<script>
	import { enhance } from "$app/forms";
    export let form;
</script>

<div class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style="font-family:'Lato',sans-serif;">
    <div class="max-w-lg mx-auto">
        <a href="/about">
            <h1 class="text-4xl font-bold text-white text-center">Startup</h1>
        </a>
    </div>

    <div class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
            <h3 class="font-bold text-2xl">Welcome to Startup</h3>
            <p class="text-gray-600 pt-2">Sign in to your account.</p>
        </section>

        <section class="mt-10">
            <form class="flex flex-col" method="post"
            action="?/login"
            use:enhance>
                <div class="mb-6 pt-3 rounded bg-gray-200">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Email</label>
                    <input type="text" id="email" name="email" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" required>
                </div>
                <div class="mb-6 pt-3 rounded bg-gray-200">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Password</label>
                    <input type="password" id="password" name="password" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" required>
                </div>
                <div class="flex justify-between">
                    <a href="/" class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a>
                    {#if form?.serror}
                        <div class="text-red-800">{form?.errormsg}</div>
                    {/if}
                </div>
                
                <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
            </form>
        </section>
    </div>

    <div class="max-w-lg mx-auto text-center mt-12 mb-6">
        <p class="text-white">Don't have an account? <a href="/" class="font-bold hover:underline">Sign up</a>.</p>
    </div>

    <div class="max-w-lg mx-auto flex justify-center text-white">
        <a href="/" class="hover:underline">Contact</a>
        <span class="mx-3">•</span>
        <a href="/" class="hover:underline">Privacy</a>
    </div>
</div>