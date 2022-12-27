<script lang="ts">
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import { createEventDispatcher } from "svelte";

  let title: string = "";
  let subtitle: string = "";
  let description: string = "";
  let imageUrl: string = "";
  let address: string = "";
  let conctactEmail: string = "";

  const func = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement
     const value = element.value
     return value
  }
  const dispatch = createEventDispatcher()

  function submitForm() {
    dispatch('save', {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      conctactEmail: conctactEmail,
    })
  }
</script>

<style>
  form{
    width: 30rem;
    max-width: 90%;
    margin: auto;
 }
</style>

<form on:submit|preventDefault={submitForm}>
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
  <Button type="submit">Save</Button>
</form>
