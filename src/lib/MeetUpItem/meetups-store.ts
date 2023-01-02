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

const meetups = writable([])

const customMeetUpStore = {
  subscribe: meetups.subscribe,
  setMeetups:(meetupArray:any)=>{
    meetups.set(meetupArray)
  },
  addMeetup: (meetupData:MeetUp)=>{
    const newMeetup = {
      ...meetupData,
    }
    meetups.update(items =>{
      return [newMeetup, ...items]
    })
  },
  updateMeetup: (id:string, meetupData:MeetUp) => {
    meetups.update(items => {
      const meetupIndex = items.findIndex(i => i.id === id);
      const updatedMeetup = { ...items[meetupIndex], ...meetupData };
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  removeMeetup:(id:string)=>{
    meetups.update(items =>{
      return items.filter(i => i.id != id)
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
