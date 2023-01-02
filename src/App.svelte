<script lang="ts">
  import meetups from "./lib/MeetUpItem/meetups-store";
  import Header from "./lib/UI/Header.svelte";
  import MeetupGrid from "./lib/MeetUpItem/MeetupGrid.svelte";
  import TextInput from "./lib/UI/TextInput.svelte";
  import Button from "./lib/UI/Button.svelte";
  import EditMeetup from "./lib/MeetUpItem/EditMeetup.svelte";
  import MeetUpDetail from "./lib/MeetUpItem/MeetUpDetail.svelte";
  import MeetUpItem from "./lib/MeetUpItem/MeetUpItem.svelte";
  import LoadingSpinner from "./lib/UI/LoadingSpinner.svelte";

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
  let isLoading:boolean = true

  fetch('https://meetups-f271a-default-rtdb.firebaseio.com/meetups.json')
  .then(res =>{
    if(!res.ok){
      throw new Error('fetching meetups have failed. Try again later.')
    }
    return res.json()
  })
  .then(data => {
    const loadedMeetups:Array<MeetUp> = []
      console.log(loadedMeetups)
    for(const key in data){
        loadedMeetups.push({
          ...data[key],
          id:key
        })
    }
    setTimeout(() => {
      isLoading= false
      meetups.setMeetups(loadedMeetups.reverse())
    }, 1000);
  })
  .catch(err=>{
    isLoading= false
    console.log(err)
  })

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
    {#if isLoading}
    <LoadingSpinner />
    {:else}
    <MeetupGrid meetups={$meetups} on:showdetails={showDetails} on:edit={startEdit} on:add={()=>{editMode = 'edit'}}/>
    {/if}
  {:else}
  <MeetUpDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }

</style>
