<script lang="ts">
  import meetups from "./meetups-store";
  import Button from "../UI/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import Badge from "../UI/Badge.svelte";


  export let id: string;
  export let title: string;
  export let subtitle: string;
  export let imageUrl: string;
  export let description: string;
  export let address: string;
  export let email: string;
  export let isFav: boolean

  const dispatch = createEventDispatcher()

  function toggleFavorite(){
    fetch(`https://meetups-f271a-default-rtdb.firebaseio.com/meetups/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify({isFavorite: !isFav}),
        headers: { "Content-Type": "application/json" }
      })
      .then(res =>{
        if (!res.ok) {
            throw new Error("An error occurred, please try again!");
          }
          meetups.toggleFavorite(id)
      })
      .catch(err =>{console.log(err)})
  }
</script>

<article>
  <header>
    <h1>
      {title}
      {#if isFav}
        <Badge>Favorite</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>
  <div class="image">
    <img src={imageUrl} alt={imageUrl} />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button mode="outline" type="button" on:click={()=>dispatch('edit',id)}> Edit</Button>
    <Button
      mode="outline"
      color={isFav ? null : 'success'}
      type="button"
      on:click={toggleFavorite}
    >
      {isFav ? 'Unfavorite' : 'Favorite'}
    </Button>
    <Button type="button" on:click={()=>dispatch('showdetails', id)}>Show Details</Button>
  </footer>
</article>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h1.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }
</style>
