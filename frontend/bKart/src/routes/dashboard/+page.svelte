<script>
	export let data;
	export let form;
	import { enhance } from '$app/forms';
</script>

<section class="flex w-full flex-col sm:p-20 justify-center items-center gap-5">
	{#each Object.entries(data.cart) as [key, value]}
		{#if value.quantity}
			<div class="w-[30%] pt-5"><img src={key} alt="" /></div>
			<a
				class="flex w-3/4 flex-col justify-start items-start"
				href={encodeURIComponent(value.title)}
			>
				{#each Object.entries(value) as [title2, p2]}
					<div class="flex flex-row justify-center gap-10 w-full">
						{#if title2 !== 'title'}
							<h2 class="font-mono italic text-base sm:text-lg">{title2.toUpperCase()}:</h2>
						{/if}
						<div class="font-mono italic text-base sm:text-lg">{p2}</div>
					</div>
				{/each}
			</a>

			<div class="flex flex-row justify-center gap-20 w-3/4 lg:w-[60%] flex-wrap pt-5">
				<button
					on:click={() => {
						value.quantity++;
					}}
					class="flex p-2 items-center justify-center bg-green-400"
					><i class="fa-solid fa-plus"></i></button
				>
				<button
					on:click={() => {
						if (value.quantity) {
							value.quantity--;
						}
					}}
					class="flex p-2 items-center justify-center bg-red-400"
					><i class="fa-solid fa-minus"></i></button
				>
			</div>
		{/if}
	{/each}
	<form class=" flex flex-col justify-center items-center gap-5" method="post" action="?/save">
		<div class="flex flex-row gap-5 w-full">
			<button
				class="rounded-3xl font-bold font-mono text-lg tracking-widest bg-blue-500 p-2 hover:bg-transparent ease-in duration-150 hover:border-blue-700 hover:border-2"
				value={JSON.stringify(data.cart)}
				name="cart">Save Cart</button
			>
			<form method="post" action="?/buy">
				<button
					type="submit"
					value={JSON.stringify(data.cart)}
					name="cart"
					class="rounded-3xl font-bold font-mono text-lg tracking-widest bg-blue-500 p-2 hover:bg-transparent ease-in duration-150 hover:border-blue-700 hover:border-2"
					>BuyNow</button
				>
			</form>
		</div>
		{#if form?.error}
			<div class="font-mono text-lg text-red-600">{form?.msg}</div>
		{/if}
		{#if form?.sucess}
			<div class="font-mono text-lg text-green-600">Saved</div>
		{/if}
	</form>
</section>
