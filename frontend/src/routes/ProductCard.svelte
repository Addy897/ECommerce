<script>
     export let img;
    
    export let title;   
    export let price;
    export let rating;
    export let ratingStrength;
    

</script>
<a class='flex flex-col p-2 border-2 w-full h-full justify-center items-center font-mono' href={encodeURIComponent(title)}>
    <img src={img} alt="" class=" sm:max-h-[150px] sm:max-w-[150px] md:max-h-[200px] md:max-w-[200px] lg:max-h-[300px] lg:max-w-[300px] pb-2"/>
    <div class='  '>{title}</div>
    <div>Price:&nbsp;&#x20B9;{price}</div>
    <div>Rating:&nbsp;<span>{rating}</span>&nbsp;<span>({ratingStrength})</span></div>

</a>