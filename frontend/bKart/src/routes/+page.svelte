<script>
	import ProductCard from './ProductCard.svelte';
	/** @type {import('./$types').ActionData} */
	export let form;
	export let data;
	let { content } = data;
	let l=0
	try{
	 l= content.length;
	}catch(err){}
	let page = 1;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Ecommerce Site" />
</svelte:head>

<section class="flex flex-col gap-2 py-4">
	<div class="w-screen px-8 h-full grid place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
		{#if form?.sucess}
			{#if form?.content}
				{#each Object.entries(form?.content) as [i, prd]}
					{#if l / 2 > i}
						{#if page === 1}
							<ProductCard
								title={prd.title}
								img={prd.image}
								price={prd.price}
								rating={prd.rating}
								ratingStrength={prd.ratingStrength}
							></ProductCard>
						{/if}
					{:else if page === 2}
						<ProductCard
							title={prd.title}
							img={prd.image}
							price={prd.price}
							rating={prd.rating}
							ratingStrength={prd.ratingStrength}
						></ProductCard>
					{/if}
				{/each}
			{:else}
				<div class="text-black row-span-2 justify-center">No Products Found with keyword:</div>
			{/if}
		{:else}
			{#each Object.entries(content) as [i, prd]}
				{#if l / 2 > i}
					{#if page === 1}
						<ProductCard
							title={prd.title}
							img={prd.image}
							price={prd.price}
							rating={prd.rating}
							ratingStrength={prd.ratingStrength}
						></ProductCard>
					{/if}
				{:else if page === 2}
					<ProductCard
						title={prd.title}
						img={prd.image}
						price={prd.price}
						rating={prd.rating}
						ratingStrength={prd.ratingStrength}
					></ProductCard>
				{/if}
			{/each}
		{/if}
	</div>
	{#if form?.sucess }
		{#if form?.content && form?.content.length > 9}
		<div class="w-full flex flex-row justify-center gap-10 items-center">
			<button
				class="py-2 px-5 bg-blue-400"
				on:click={() => {
					page = 1;
				}}>1</button
			>
			<button class="py-2 px-5 bg-blue-400" on:click={() => (page = 2)}>2</button>
		</div>
		{/if}
	{:else if l > 9}
		<div class="w-full flex flex-row justify-center gap-10 items-center">
			<button
				class="py-2 px-5 bg-blue-400"
				on:click={() => {
					page = 1;
				}}>1</button
			>
			<button
				class="py-2 px-5 bg-blue-400"
				on:click={() => {
					page = 2;
				}}>2</button
			>
		</div>
	{/if}
</section>
