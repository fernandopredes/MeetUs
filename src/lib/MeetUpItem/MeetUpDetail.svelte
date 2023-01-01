<script lang="ts">
import { onDestroy, createEventDispatcher } from "svelte";
import Button from "../UI/Button.svelte";
import meetups from "./meetups-store";


type MeetUp = {
    id?: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    address: string;
    conctactEmail: string;
    isFavorite?: boolean
  };

export let id:string;

let selectedMeetUp:MeetUp

const unsubcribe = meetups.subscribe(items => {
  selectedMeetUp =  items.find(i => i.id === id)
})

const dispatch = createEventDispatcher()

onDestroy(()=> {
  unsubcribe()
})

</script>

<style>
  section {
  margin-top: 4rem;
}

.image {
  width: 100%;
  height: 25rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image {
  background: #e7e7e7;
}

.content {
  text-align: center;
  width: 80%;
  margin: auto;
}

h1 {
  font-size: 2rem;
  font-family: 'Roboto Slab', sans-serif;
  margin: 0.5rem 0;
}

h2 {
  font-size: 1.25rem;
  color: #6b6b6b;
}

p {
  font-size: 1.5rem;
}

</style>

<section>
  <div class="image">
    <img src="{selectedMeetUp.imageUrl}" alt="">
  </div>
  <div class="content">
    <h1>{selectedMeetUp.title}</h1>
    <h2>{selectedMeetUp.subtitle}</h2>
    <p>{selectedMeetUp.description}</p>
    <Button href="mailto:{selectedMeetUp.conctactEmail}">Contact</Button>
    <Button type="button" mode="outline" on:click={()=> dispatch('close')}>Close</Button>
  </div>
</section>
