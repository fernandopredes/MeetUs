<script>
  import MeetUpItem from "./MeetUpItem.svelte";
  export let meetups;
</script>

<section id="meetups">
  {#each meetups as meetup}
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
    />
  {/each}
</section>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
