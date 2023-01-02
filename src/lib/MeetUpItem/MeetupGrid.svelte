<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import MeetUpItem from "./MeetUpItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  import Button from "../UI/Button.svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";

  type MeetUp = {
    id?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    address?: string;
    conctactEmail?: string;
    isFavorite?: boolean
  };

  export let meetups:Array<MeetUp>;

  let favsOnly:boolean = false

  const dispatch = createEventDispatcher()

  $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups

  function setFilter(event: CustomEvent) {
    favsOnly = event.detail === 1

  }
</script>
<section id="meetup-controls">

  <MeetupFilter on:select={setFilter}/>

  <Button on:click="{() => dispatch('add')}">New Meetup</Button>

</section>
<section id="meetups">
  {#if filteredMeetups.length === 0}
     <p id="no-meetups">No meetups found, you can be the first to add =D</p>
  {/if}
  {#each filteredMeetups as meetup (meetup.id)}
  <div transition:scale animate:flip={{duration:500}}>
    <MeetUpItem
      id={meetup.id}
      title={meetup.title}
      subtitle={meetup.subtitle}
      imageUrl={meetup.imageUrl}
      description={meetup.description}
      address={meetup.address}
      email={meetup.conctactEmail}
      isFav={meetup.isFavorite}
      on:showdetails
      on:edit
    />
  </div>
  {/each}
</section>

<style>
  #no-meetups{
    margin: 1rem;
  }
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  #meetup-controls{
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
