import { writable } from "svelte/store";

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

const meetups = writable([
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
])

const customMeetUpStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData:MeetUp)=>{
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false
    }
    meetups.update(items =>{
      return [newMeetup, ...items]
    })
  },
  updateMeetup: (id:string, newMeetup:MeetUp) => {
    meetups.update(items => {
      const meetupIndex = items.findIndex(i => i.id === id)
      const updatedMeetup = {...items[meetupIndex], ...newMeetup}
      const updatedMeetups = [...items]
      updatedMeetups[meetupIndex]= updatedMeetup
      return updatedMeetups
    })
  },
  toggleFavorite: (id:string)=>{
    meetups.update(items => {
      const updatedMeetup = {...items.find(m => m.id === id)}
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite
      const meetupIndex = items.findIndex(m => m.id === id)
      const updatedMeetups = [...items]
      updatedMeetups[meetupIndex] = updatedMeetup
      return updatedMeetups
    })
  }
}
export default customMeetUpStore;
