<script>
	export let data;
	export let form
	let content = data.content;
	let selectedImage = content.image;
	const changeImage = (img) => {
		selectedImage = img;
	};

</script>

<section
	class="flex flex-col w-full  justify-center items-center sm:p-24 gap-2 p-2 sm:gap-5 text-xl font-mono"
>
	<div class=" w-full h-1/2 flex flex-col justify-center items-center gap-2">
		<div class="flex flex-row gap-5">
			{#each Object.entries(data.product) as [title, paragraph]}
				{#if title.includes('image')}
					<button
						on:click={() => {
							changeImage(paragraph.replaceAll('128', '416'));
						}}
					>
						<img src={paragraph} alt="" class="w-[50%]" />
					</button>
				{/if}
			{/each}
		</div>
		<div class="w-[40%] flex flex-col justify-center items-center">
			<img src={selectedImage} alt="" class="" />
		</div>
	</div>
	<div class="flex flex-col w-full items-center gap-5 justify-center">
		<div class="text-xl font-mono font-extrabold italic p-5">{content.title}</div>
		<div>Price:&nbsp;&#x20B9;{content.price}</div>
		<div>
			Rating:&nbsp;<span>{content.rating}</span>&nbsp;<span>({content.ratingStrength})</span>
		</div>
		{#each Object.entries(data.product) as [title, paragraph]}
			{#if title !== 'title' && !title.includes('image')}
				<h1 class="font-mono text-xl sm:text-2xl font-bold">{title}</h1>

				{#if typeof paragraph !== 'string'}
					{#each Object.entries(paragraph) as [title2, p2]}
						<div class="flex flex-row justify-between w-[90%] sm:w-1/2 flex-wrap">
							<h2 class="font-mono italic text-base sm:text-xl">{title2}:</h2>
							<div class="font-mono italic text-base sm:text-xl">{p2}</div>
						</div>
					{/each}
				{:else}
					<div class="flex flex-row p-5 flex-wrap">{paragraph}</div>
				{/if}
			{/if}
		{/each}
	</div>
	<form class=" flex flex-col justify-center items-center gap-5" method="post" action="?/cart">
		<div class="flex flex-row gap-5 w-full">
			<button
				class="rounded-3xl  font-bold font-mono text-lg tracking-widest bg-blue-500 p-2 hover:bg-transparent ease-in duration-150 hover:border-blue-700 hover:border-2"
				>AddToCart</button
			><button
				class="rounded-3xl font-bold font-mono text-lg tracking-widest bg-blue-500 p-2 hover:bg-transparent ease-in duration-150 hover:border-blue-700 hover:border-2"
				>BuyNow</button
			>
		</div>
		{#if form?.error}
		<div class="font-mono text-lg text-red-600">{form?.msg}</div>
		{/if}
		{#if form?.sucess}
		<div class="font-mono text-lg text-green-600">Added To Cart</div>
		{/if}
	</form>
</section>
