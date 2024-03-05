
<script>
	import {loginStore} from "./../stores/loginstore"
    $: isVisible = false;
        const showNav = () => {
        isVisible = !isVisible;
    };
	
   
    let navButtonClass =
        "w-full sm:pl-0 cursor-pointer sm:w-auto max-sm:hover:text-black max-sm:hover:bg-white sm:hover:text-2xl lg:mx-3 px-2 shadow-md rounded-lg flex justify-center flex-row items-center text-center";
    navButtonClass = "";
</script>

<nav class="bg-white p-4 border-b-2">
    <div class="container mx-auto flex justify-between items-center flex-wrap gap-5">
        <div>
            <a href="?" class="text-black text-xl font-bold"
                >ECommerce</a
            >
        </div>
        <div class="md:hidden">
            <!-- Hamburger -->
            <button
                id="mobile-menu-button"
                class="text-black focus:outline-none"
                on:click={showNav}
            >
                <i class={!isVisible ? "fa fa-bars" : "fa fa-xmark"}></i>
            </button>
        </div>
        <form method="post" class="flex flex-row" action="/">
            <div class="relative">
                <input
                    type="text"
                    placeholder="Search"
                    class="bg-[#FEFFAC] font-mono text-black border-2 shadow-md rounded-xl px-6 py-1 focus:outline-none text-center w-full"
                />
                <button
                    class="absolute left-0 top-0 z-3 mt-3 ml-4 focus:outline-none fa fa-magnifying-glass"
                >
                </button>
            </div>
        </form>
        <div class="hidden md:flex flex-row text-xl font-sans gap-5">
            <a
                href="/"                    
                class="text-black border-solid hover:bg-blue-300 block px-3 py-2 rounded-lg font-medium"
                >Home</a
            >
            <a
                href="/about"   
                class="text-black border-solid  hover:bg-blue-300 block px-3 py-2 rounded-lg font-medium"
                >About</a
            >
            {#if $loginStore.isLogged}
                <a
					href="/dashboard"
                    class="text-black border-solid  hover:bg-blue-300 block px-3 py-2 rounded-lg font-medium"
                    >{$loginStore.userName}</a
                >
                
                <div class="text-black block px-3 py-2 rounded-md">
                    <img
                        class="rounded-full h-7 w-7"
                        src={"/images/Menu4.png"}
                        alt=""
                        referrerpolicy="no-referrer"
                    />
                </div>
            {:else}
                <a 
					href="/login"
                    class="text-black  hover:bg-blue-300 block px-3 py-2 rounded-lg font-medium"
                    >Login</a
                >
            {/if}
        </div>
    </div>
</nav>

<!-- Mobile Menu -->
<div
    class="md:hidden bg-white absolute left-0 top-0 h-full w-48 z-50 {!isVisible
        ? 'hidden'
        : ''}"
>
    <div
        class="flex flex-col justify-center items-center px-2 pt-2 pb-3 space-y-1 gap-5"
    >
        <a href="?" class="py-2 px-3 border-b-2 w-full flex justify-center text-black"
            >ECommerce</a
        >

        <button
            on:click={() => {
                
                  location.href="/"

            }}
            class="text-black hover:bg-blue-300 block px-3 py-2 rounded-md font-medium"
            >Home</button
        >
        <button
            on:click={() => {
               location.href="/about"
               
            }}
            class="text-black hover:bg-blue-300 block px-3 py-2 rounded-md font-medium"
            data-sveltekit-preload-data="hover"
            >about</button
        >
        {#if $loginStore.isLogged}
            <a
                href="/dashboard"
                on:click={()=>{isVisible=false}} 
                
                class="text-black hover:bg-blue-300 block px-3 py-2 rounded-md font-medium"
               
                >{$loginStore.userName}</a
            >
            <div class="text-black block px-3 py-2 rounded-md">
                <img
                    class="rounded-full h-7 w-7"
                    src={"/images/Menu4.png"}
                    alt=""
                    referrerpolicy="no-referrer"
                />
            </div>
        {:else}
            <button
                on:click={() => {
                    location.href="/login"
                }}
                class="text-black hover:bg-blue-300 block px-3 py-2 rounded-md font-medium"
                >Login</button
            >
        {/if}
    </div>
</div>

