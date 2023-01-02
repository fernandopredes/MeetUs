<script lang="ts">
  import meetups from "./meetups-store";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty } from "../../helpers/validation";
  import { isValidEmail } from "../../helpers/validation";

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

  export let id:string = null


  let title: string = "";
  let subtitle: string = "";
  let description: string = "";
  let imageUrl: string = "";
  let address: string = "";
  let conctactEmail: string = "";

  //dont need these booleans to work
  let titleValid: boolean = false;
  let subtitleValid: boolean = false;
  let descriptionValid: boolean = false;
  let imageUrlValid: boolean = false;
  let addressValid: boolean = false;
  let conctactEmailValid: boolean = false;
  let formIsValid: boolean = false;

  if(id){

   const unsubscribe = meetups.subscribe(items => {
      const selectedMeetup = items.find(i => i.id ===id)
      title = selectedMeetup.title
      subtitle = selectedMeetup.title
      description = selectedMeetup.description
      imageUrl = selectedMeetup.imageUrl
      address = selectedMeetup.address
      conctactEmail = selectedMeetup.conctactEmail
    })

    unsubscribe()
  }
  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: conctactEmailValid = isValidEmail(conctactEmail);

  $: formIsValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    descriptionValid &&
    imageUrlValid &&
    conctactEmailValid;

  const func = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    return value;
  };
  const dispatch = createEventDispatcher();

  function submitForm() {
    const newMeetUp: MeetUp = {
    title: title,
    subtitle: subtitle,
    description: description,
    imageUrl: imageUrl,
    address: address,
    conctactEmail: conctactEmail,
    };

    if(id){
      meetups.updateMeetup(id, newMeetUp)
    }else{
      fetch('https://meetups-f271a-default-rtdb.firebaseio.com/meetups.json',{
        method:'POST',
        body: JSON.stringify({...newMeetUp, isFavorite: false}),
        headers:{'Content-Type':'application/json'}
      })
      .then(res => {
        if(!res.ok){
          throw new Error('An error has occurred, please try again!')
        }
        return res.json()
      })
      .then(data =>{
        meetups.addMeetup({...newMeetUp, isFavorite:false, id:data.name})
      })
      .catch(err => {console.log(err)})

    }
    dispatch("save");
  }

  function cancel() {
    dispatch("cancel");
  }

  function deleteMeetup() {
    meetups.removeMeetup(id)
    dispatch("save");
  }
</script>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      on:input={(event) => (title = func(event))}
      controlType={""}
      rows={0}
      text={"text"}
      validityMessage={"Please enter a valid title."}
      valid={titleValid}
    />
    <TextInput
      id="subtitle"
      label="Subitle"
      value={subtitle}
      on:input={(event) => (subtitle = func(event))}
      controlType={""}
      rows={0}
      text={"text"}
      validityMessage={"Please enter a valid subtitle."}
      valid={subtitleValid}
    />
    <TextInput
      id="address"
      label="Address"
      value={address}
      on:input={(event) => (address = func(event))}
      controlType={""}
      rows={0}
      text={"text"}
      validityMessage={"Please enter a valid address."}
      valid={addressValid}
    />
    <TextInput
      id="imageUrl"
      label="Image"
      value={imageUrl}
      on:input={(event) => (imageUrl = func(event))}
      controlType={""}
      rows={0}
      text={"text"}
      validityMessage={"Please enter a valid image URL."}
      valid={imageUrlValid}
    />
    <TextInput
      id="email"
      label="E-mail"
      value={conctactEmail}
      on:input={(event) => (conctactEmail = func(event))}
      controlType={""}
      rows={0}
      text={"email"}
      validityMessage={"Please enter a valid e-mail address."}
      valid={conctactEmailValid}
    />
    <TextInput
      id="description"
      label="Description"
      value={description}
      on:input={(event) => (description = func(event))}
      controlType={"textarea"}
      rows={3}
      text={"text"}
      validityMessage={"Please enter a valid description."}
      valid={descriptionValid}
    />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
    {#if id}
      <Button type="button" on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
