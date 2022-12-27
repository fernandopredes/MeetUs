<script lang="ts">
  import Header from "./lib/UI/Header.svelte";
  import MeetupGrid from "./lib/MeetUpItem/MeetupGrid.svelte";
  import TextInput from "./lib/UI/TextInput.svelte";
  import Button from "./lib/UI/Button.svelte";
  import EditMeetup from "./lib/MeetUpItem/EditMeetup.svelte";

  type MeetUp = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    address: string;
    conctactEmail: string;
    isFavorite: boolean
  };

  let editMode = null

  let meetups: Array<MeetUp> = [
    {
      id: "m1",
      title: "Coding Camp",
      subtitle: "Learn to Code",
      description: "In this meetup, we will have new experts",
      imageUrl:
        "https://i.picsum.photos/id/832/1000/300.jpg?hmac=7Um8aw9pY7XACDo2HolPxUMO62augEtR_hfv7a6-HLI",
      address: "3744 E Chapman Ave",
      conctactEmail: "test@test.com",
      isFavorite: false
    },
    {
      id: "m2",
      title: "Coding Camp",
      subtitle: "Learn to Code part 2",
      description: "In this meetup, we will MORE new experts",
      imageUrl:
        "https://i.picsum.photos/id/995/1000/300.jpg?hmac=cQdvzwMfKPGJzGRVju60qEce8RLQU5HYU6PeIKk2hkc",
      address: "3744 E Chapman Ave",
      conctactEmail: "test@test.com",
      isFavorite: false
    },
  ];

  function addMeetUp(event: CustomEvent) {


    const newMeetUp: MeetUp = {
      id: Math.random().toString(),
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      description: event.detail.description,
      imageUrl: event.detail.imageUrl,
      address: event.detail.address,
      conctactEmail: event.detail.conctactEmail,
      isFavorite: false
    };

    meetups = [newMeetUp, ...meetups];
    editMode = null
  }

  function toggleFavorite(event: CustomEvent) {
    const id = event.detail
    const updatedMeetup = {...meetups.find(m => m.id === id)}
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite
    const meetupIndex = meetups.findIndex(m => m.id === id)
    const updatedMeetups = [...meetups]
    updatedMeetups[meetupIndex] = updatedMeetup
    meetups = updatedMeetups

  }

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
  <MeetupGrid {meetups} on:togglefavorite="{toggleFavorite}" />>
</main>

<style>
  main {
    margin-top: 5rem;
  }
  .meetup-controls{
    margin: 1rem;
  }

</style>
