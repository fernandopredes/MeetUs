<script lang="ts">
  import Header from "./lib/UI/Header.svelte";
  import MeetUpItem from "./lib/MeetUpItem/MeetUpItem.svelte";

  const meetups: Array<Object>=[
    {
      id:'m1',
      title:'Coding Camp',
      subtitle: 'Learn to Code',
      description: 'In this meetup, we will have new experts',
      imageUrl:'https://poketouch.files.wordpress.com/2022/11/hammer_pokemon_tinkaton.png',
      address:'3744 E Chapman Ave',
      conctactEmail:'test@test.com'
    },
    {
      id:'m2',
      title:'Coding Camp',
      subtitle: 'Learn to Code part 2',
      description: 'In this meetup, we will MORE new experts',
      imageUrl:'https://poketouch.files.wordpress.com/2017/11/okemon_laptop_wrist_rest_mew_plushie_and_cushion.jpg',
      address:'3744 E Chapman Ave',
      conctactEmail:'test@test.com'
    }
  ]
</script>

<style>

  #meetups{
    margin-top: 5rem;
  }

</style>

<Header />

<section id="meetups">
  {#each meetups as meetup}
    <MeetUpItem title={meetup.title} subtitle={meetup.subtitle}/>
  {/each}
</section>
