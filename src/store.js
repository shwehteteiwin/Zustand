// import { create } from "zustand";

// const store = (set)=>({
//     tasks: [{title: "TestTask",state: 'PLANNED'}],
// });//store ကို ဘယ်လိုတည်ဆောက်ရမလဲဆိုတဲ့ function
// export const useStore = create(store); //zustand store ကို create လုပ်တယ် ပြီးတော့ useStore က React component တွေမှာ store ကို access လုပ်ဖို့ အသုံးပြုမယ့် hook ဖြစ်



import { create } from "zustand";

const store = (set) => ({
  tasks: [
    {
      title: "TestTask",
      state: "ONGOING",
    },
  ],

  draggedTask: null,
   addTask: (title, state)=> 
    set((store)=>({tasks: [...store.tasks, {title,state}]})),


   deleteTask: (title)=> 
    set((store)=>({tasks: store.tasks.filter((task)=>task.title!==title)})),

   setDraggedTask: (title)=>
    set({draggedTask: title}),

   moveTask: (title,state)=> set(store=>({tasks: store.tasks.map(task=>task.title=== title ? {title,state} : task)}))

});//store ကို ဘယ်လိုတည်ဆောက်ရမလဲဆိုတဲ့ function

export const useStore = create(store); //zustand store ကို create လုပ်တယ် ပြီးတော့ useStore က React component တွေမှာ store ကို access လုပ်ဖို့ အသုံးပြုမယ့် hook ဖြစ်

//zustand store ထဲမှာ title testtask နဲ့  state planned ဆိုတာကို store လုပ်ထားခဲ့ပြီး ခေါ်ချင်တဲ့ component ကနေ useStore သုံးပြီး ပြန်ခေါ်သုံးမှာ