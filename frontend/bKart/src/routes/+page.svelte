<script>
	import ProductCard from "./ProductCard.svelte";
	/** @type {import('./$types').ActionData} */
export let form;
	export let data;
	let {content}=data
	
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Ecommerce Site" />
</svelte:head>

<section>
	<div class='w-screen px-8 h-screen grid place-items-center  gap-4 sm:grid-cols-2 md:grid-cols-3'>
		{#if form?.sucess}
		
			{#if form?.content}
				
				{#each form?.content as prd }
				<ProductCard title={prd.title} img={prd.image} price={prd.price} rating={prd.rating} ratingStrength={prd.ratingStrength}></ProductCard>
				{/each}
			{:else}
				
				<div class="text-black row-span-2 justify-center">No Products Found with keyword: </div>
			{/if}
		{:else}
			{#each content as prd }
				<ProductCard title={prd.title} img={prd.image} price={prd.price} rating={prd.rating} ratingStrength={prd.ratingStrength}></ProductCard>
			{/each}
		{/if}
	</div>
</section>


