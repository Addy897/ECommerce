<script>
	import { enhance } from "$app/forms";
	import {loginStore} from "../stores/loginstore"
	$: isVisible = false;
	const showNav = () => {
		isVisible = !isVisible;
	};
	let c1 =
		'w-3/4 max-sm:pt-5 sm:w-[33%] sm:flex max-sm:fixed p-1  flex-row justify-evenly sm:pl-0 z-10 bg-orange-500 sm:bg-transparent left-[0px] top-0 sm:left-0 h-screen sm:h-auto text-xl duration-300 scale-x-1';
	let c2 =
		' w-3/4 sm:w-[33%] sm:flex max-sm:absolute p-1 flex-row justify-evenly z-10 left-[-500px] duration-300 scale-x-1 h-screen sm:h-auto top-0 text-xl ';
	let keyword = '';

</script>

<header class="bg-blue-200 pb-4 font-mono">
	<div
		class="w-full pt-4 flex flex-col flex-wrap justify-between sm:flex-row sm:justify-between sm:items-center sm:flex-wrap"
	>
		<button class="sm:hidden pl-[90%]" on:click={showNav}
			><i class={!isVisible ? 'fa fa-bars' : 'fa fa-xmark'}></i></button
		>
		<div class="flex flex-row justify-center sm:justify-start items-center flex-wrap">
			<div
				class="max-sm:w-full sm:w-1/2 text-2xl flex flex-row justify-evenly font-mono lg:text-4xl tracking-wider"
			>
				Navbar
			</div>
			<div
				class="sm:w-[33%] h-8 my-0 font-mono text-lg flex flex-row flex-nowrap text-black sm:text-xl tracking-wider"
			>
				<form method="post" class="flex flex-row" action="/">
					<input
						class="focus:outline-none pl-2 w-auto rounded-lg"
						name="keyword"
						bind:value={keyword}
						type="text"
					/><button type="submit" class="ml-1.5 pt-1.5 fa fa-magnifying-glass"></button>
				</form>
			</div>
		</div>

		<div class={isVisible ? c1 : c2}>
			<a
				class="w-full flex justify-center items-center sm:pl-0 cursor-pointer sm:w-auto max-sm:hover:text-black max-sm:hover:bg-white sm:hover:text-2xl hover:no-underline"
				href="/" on:click={showNav}>Home</a
			><br />
			<a
				class="w-full flex justify-center items-center sm:pl-0 cursor-pointer sm:w-auto max-sm:hover:text-black max-sm:hover:bg-white sm:hover:text-2xl hover:no-underline"
				href="/about" on:click={showNav}>About</a
			><br />
			{#if $loginStore.isLogged}
				
			<a
				class="flex flex-row  justify-center sm:items-center sm:justify-center w-full  sm:pl-0 cursor-pointer sm:w-auto max-sm:hover:text-black max-sm:hover:bg-white sm:hover:text-2xl hover:no-underline"
				href="/dashboard" on:click={showNav}><img class="rounded-full h-7 w-7" src={"/images/Menu4.png"} alt='' referrerpolicy="no-referrer"/>&nbsp;{$loginStore.userName}</a
				>
			{:else}
			<a
				class="flex flex-row justify-center w-full sm:pl-0 cursor-pointer sm:w-auto max-sm:hover:text-black max-sm:hover:bg-white sm:hover:text-2xl hover:no-underline"
				href="/login" on:click={showNav}>Login</a
			>
			{/if}
		</div>
	</div>
</header>
