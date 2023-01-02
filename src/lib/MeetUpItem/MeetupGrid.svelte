<script lang="ts">
  import MeetUpItem from "./MeetUpItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  export let meetups;


  let favsOnly:boolean = false

  $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups

  function setFilter(event: CustomEvent) {
    favsOnly = event.detail === 1

  }
</script>
<section id="meetup-controls">
  <MeetupFilter on:select={setFilter}/>
</section>
<section id="meetups">
  {#each filteredMeetups as meetup}
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
  {/each}
</section>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  #meetup-controls{
    margin: 1rem;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
