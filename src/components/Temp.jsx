// import { useMemo } from "react";
import { useStore } from "../store";
import {shallow} from 'zustand';

export default function Temp({ state }) {
  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state == state),
    shallow,
  );
  // when we use filter it re-render even the same state and add to arraw same value that's why we use compare function shallow
  //and this shallow or compare function runs whenever anythig in your store update.
  //တစ်ခုတည်းယူရင် shallow မလို။
// Multiple values ကို object အဖြစ်ယူရင် shallow က အသုံးဝင်တယ်။
//shallow = Store ကနေ values အများကြီးကို object/array အနေနဲ့ယူတဲ့အခါ၊ အဲဒီ selected values တွေ တကယ်ပြောင်းလဲမှ component ကို re-render လုပ်စေဖို့ comparison လုပ်ပေးတဲ့နည်း။



  //    const tasks = useStore((store)=>
  // store.tasks//.((task)=>task.state==state))
  // );

  //    const filtered = useMemo(()=>tasks.filter((task)=>task.state==state),
  // [tasks,state]); //useMemo ကိုသုံးတာက task မပြောင်းရင် calculation မလုပ်ပဲ အရင် result ကို  ပြန်သုံးတာ task ပြောင်းမှ ပြန် calculate လုပ်တာ

  // const tasks = useStore(
  //     (store)=> store.tasks.filter((task)=>task.state== state),
  //     (prev,next)=> {
  //         const longest = prev.lengh> next.lengh ? prev.lengh : next.lengh;
  //         for (let i = 0; i<longest; i++){
  //             if (!prev[i]||!next[i]) return false;
  //             if (prev[i] !== next[i] )return false;
  //         }
  //         return true;
  //     }   // this is not build in fun for comparation we can use our own fun if we don't use shallow
}
