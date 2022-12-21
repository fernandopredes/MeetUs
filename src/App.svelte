<script lang="ts">
  import Header from "./lib/UI/Header.svelte";
  import MeetupGrid from "./lib/MeetUpItem/MeetupGrid.svelte";

  type MeetUp = {
    id: string
    title: string
    subtitle: string
    description: string
    imageUrl: string
    address:string
    conctactEmail:string
  }

  let title:string = ''
  let subtitle:string = ''
  let description:string = ''
  let imageUrl:string = ''
  let address:string = ''
  let conctactEmail:string = ''

  let meetups: Array<MeetUp>=[
    {
      id:'m1',
      title:'Coding Camp',
      subtitle: 'Learn to Code',
      description: 'In this meetup, we will have new experts',
      imageUrl:'https://i.picsum.photos/id/832/1000/300.jpg?hmac=7Um8aw9pY7XACDo2HolPxUMO62augEtR_hfv7a6-HLI',
      address:'3744 E Chapman Ave',
      conctactEmail:'test@test.com'
    },
    {
      id:'m2',
      title:'Coding Camp',
      subtitle: 'Learn to Code part 2',
      description: 'In this meetup, we will MORE new experts',
      imageUrl:'https://i.picsum.photos/id/995/1000/300.jpg?hmac=cQdvzwMfKPGJzGRVju60qEce8RLQU5HYU6PeIKk2hkc',
      address:'3744 E Chapman Ave',
      conctactEmail:'test@test.com'
    }
  ]

  function addMeetUp() {
    const newMeetUp:MeetUp = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      conctactEmail: conctactEmail
    }

    meetups = [newMeetUp, ...meetups]
  }
</script>

<style>

main{
    margin-top: 5rem;
  }

</style>

<Header />

<main>
  <form on:submit|preventDefault="{addMeetUp}">
    <div class="form-control">
      <label for="title">Title</label>
      <input type="text" id="title" bind:value={title}>
    </div>
    <div class="form-control">
      <label for="subtitle">Subtitle</label>
      <input type="text" id="subtitle" bind:value={subtitle}>
    </div>
    <div class="form-control">
      <label for="address">Address</label>
      <input type="text" id="address"bind:value={address}>
    </div>
    <div class="form-control">
      <label for="imageUrl">Image</label>
      <input type="text" id="imageUrl" bind:value={imageUrl}>
    </div>
    <div class="form-control">
      <label for="email">E-mail</label>
      <input type="text" id="email" bind:value={conctactEmail}>
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea  id="description"rows="3" bind:value={description}></textarea>
    </div>
    <button type="submit">Save</button>
  </form>
  <MeetupGrid {meetups} />>
</main>
