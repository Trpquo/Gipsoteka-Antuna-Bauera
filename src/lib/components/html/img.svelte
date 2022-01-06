<script>
import Cursor from "$lib/gadgets/Cursor.svelte";
import Article from "../Article.svelte";

</script>
<figure>
    <img { ...$$props }  >
    <figcaption>{ $$props.alt }</figcaption>
</figure>