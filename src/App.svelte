<script lang="ts">
  import meetups from "./lib/MeetUpItem/meetups-store";
  import Header from "./lib/UI/Header.svelte";
  import MeetupGrid from "./lib/MeetUpItem/MeetupGrid.svelte";
  import TextInput from "./lib/UI/TextInput.svelte";
  import Button from "./lib/UI/Button.svelte";
  import EditMeetup from "./lib/MeetUpItem/EditMeetup.svelte";
  import MeetUpDetail from "./lib/MeetUpItem/MeetUpDetail.svelte";

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

  let editMode:string = null
  let editedId: string
  let page:string = 'overview'
  let pageData:MeetUp = {}

  function savedMeetup() {

    editMode = null
  }

  function showDetails(event: CustomEvent) {
    page = 'details'
    pageData.id = event.detail
  }

  function closeDetails() {
    page = 'overview'
    pageData = {}
  }

  // function toggleFavorite(event: CustomEvent) {
  //   const id = event.detail
  //   meetups.toggleFavorite(id)

  // }

  function cancelEdit() {
    editMode = null
    editedId = null
  }

  function startEdit(event:CustomEvent) {
    editMode = 'edit'
    editedId = event.detail
  }

</script>

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
    <EditMeetup id={editedId} on:save="{savedMeetup}" on:cancel="{cancelEdit}" />
    {/if}
  <MeetupGrid meetups={$meetups} on:showdetails={showDetails} on:edit={startEdit} on:add={()=>{editMode = 'edit'}}/>>
  {:else}
  <MeetUpDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }

</style>
