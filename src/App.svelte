<script lang="ts">
  import Header from "./lib/UI/Header.svelte";
  import MeetupGrid from "./lib/MeetUpItem/MeetupGrid.svelte";
  import TextInput from "./lib/UI/TextInput.svelte";

  type MeetUp = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    address: string;
    conctactEmail: string;
  };

  let func = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement
     const value = element.value
     return value
  }

  let title: string = "";
  let subtitle: string = "";
  let description: string = "";
  let imageUrl: string = "";
  let address: string = "";
  let conctactEmail: string = "";

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
    },
  ];

  function addMeetUp() {
    const newMeetUp: MeetUp = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      conctactEmail: conctactEmail,
    };

    meetups = [newMeetUp, ...meetups];


  }


</script>

<Header />

<main>
  <form on:submit|preventDefault={addMeetUp}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      on:input={(event) => title = func(event)}
      controlType={''}
      rows={0}
      text={'text'}
    />
    <TextInput
      id="subtitle"
      label="Subitle"
      value={subtitle}
      on:input={(event) => subtitle = func(event)}
      controlType={''}
      rows={0}
      text={'text'}
    />
    <TextInput
      id="address"
      label="Address"
      value={address}
      on:input={(event) => address = func(event)}
      controlType={''}
      rows={0}
      text={'text'}
    />
    <TextInput
      id="imageUrl"
      label="Image"
      value={imageUrl}
      on:input={(event) => imageUrl = func(event)}
      controlType={''}
      rows={0}
      text={'text'}
    />
    <TextInput
      id="email"
      label="E-mail"
      value={conctactEmail}
      on:input={(event) => conctactEmail = func(event)}
      controlType={''}
      rows={0}
      text={'email'}
    />
    <TextInput
      id="description"
      label="Description"
      value={description}
      on:input={(event) => description = func(event)}
      controlType={'textarea'}
      rows={3}
      text={'text'}
    />
    <button type="submit">Save</button>
  </form>
  <MeetupGrid {meetups} />>
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
