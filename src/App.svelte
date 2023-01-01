<script lang="ts">
  import meetups from "./lib/MeetUpItem/meetups-store";
  import Header from "./lib/UI/Header.svelte";
  import MeetupGrid from "./lib/MeetUpItem/MeetupGrid.svelte";
  import TextInput from "./lib/UI/TextInput.svelte";
  import Button from "./lib/UI/Button.svelte";
  import EditMeetup from "./lib/MeetUpItem/EditMeetup.svelte";

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

  let editMode = null



  function addMeetUp() {

    editMode = null
  }

  // function toggleFavorite(event: CustomEvent) {
  //   const id = event.detail
  //   meetups.toggleFavorite(id)

  // }

  function cancelEdit() {
    editMode = null
  }

</script>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click="{() => editMode ='add'}">New Meetup</Button>
  </div>
    {#if editMode === 'add'}
    <EditMeetup on:save="{addMeetUp}" on:cancel="{cancelEdit}" />
    {/if}
  <MeetupGrid meetups={$meetups}  />>
</main>

<style>
  main {
    margin-top: 5rem;
  }
  .meetup-controls{
    margin: 1rem;
  }

</style>
