import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  tasks: [], //state

  draggedTask: null,

  //actions
  addTask: (title, state) => 
    set(
      (store) => ({
        tasks: [...store.tasks, { title, state }], 
      }),
      false,
      "addTask"
    ),

  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),

  setDraggedTask: (title) =>
    set({
      draggedTask: title,
    }),

  moveTask: (title, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, state } : task
      ),
    })),
});

export const useStore = create(
  persist(devtools(store), {
    name: "store",
  })//persist = middleware Browser refresh လုပ်ပြီးသွားရင် ထည့်ထားတဲ့ tasks တွေ မပျောက်အောင်ထားချင်
);

//simple zustand 
// const useStore = create((set) => ({
//   tasks: [],

//   addTask: (task) =>
//     set((state) => ({
//       tasks: [...state.tasks, task], //[...state.tasks, task]= old tasks + new task ရှိပြီးသား task ထဲ new task ထည့်
//     })),
// }));

//set က function = State ကို update လုပ်ဖို့ သုံး, tasks က state နဲ့ addTask က action
//increase: () =>
  // set((state) => ({
  //   count: state.count + 1,
  // })), // set((state))ကို ဘာလို့လိုလဲဆို current state ကို သိဖို့လိုလို့


//get function လည်းရှိသေးတယ်
// const useStore = create((set, get) => ({
//   cart: [],
//   discount: 10,

//   addToCart: (item) => {
//     const cart = get().cart;

//     set({
//       cart: [...cart, item],
//     });
//   },
// })); get က read, set က update
//get() ကို ဘယ်မှာသုံးလေ့ရှိလဲ? အထူးသဖြင့် action တစ်ခုလုပ်တဲ့အခါ အခြား state တစ်ခုရဲ့ current value ကို သိဖို့လိုတဲ့အခါ။

//ဒါက component က ပြန်ခေါ်သုံးရင် ဒီလိုသုံးတာ
//const tasks = useStore((state) => state.tasks);
//const tasks = useStore(...); "Zustand store ထဲက ငါလိုချင်တဲ့ data ကို ပေးပါ"
//(state) => state.tasks ဒီအပိုင်းက selector ပါ။ Store ထဲက ကိုယ်လိုချင်တဲ့အပိုင်းကို ရွေးယူတဲ့ function



