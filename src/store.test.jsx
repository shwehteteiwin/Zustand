import { render } from "@testing-library/react";
import { useEffect } from "react";
import { expect, vi } from "vitest";
import { useStore } from "./store";
import { useShallow } from "zustand/react/shallow"; //got error chat said because of version so use shallow

function TestComponent({ selector, effect }) {
  const items = useStore(useShallow(selector));

  useEffect(() => effect(items), [items]);

  return null;
}

test("should return default value at the start", () => {
  const selector = (store) => store.tasks;
  const effect = vi.fn();

  render(<TestComponent selector={selector} effect={effect} />);

  expect(effect).toHaveBeenCalledWith([]);
});

test("should add an items to the store and return the effect", () => {
  const selector = (store) => ({
    tasks: store.tasks,
    addTask: store.addTask,
    deleteTask: store.deleteTask,
  });

  let createdTask = false;

  const effect = vi.fn().mockImplementation((items) => {
    if (!createdTask) {
      items.addTask("a", "b");
      createdTask = true;
    } else if (items.tasks.length === 1) {
      items.deleteTask("a");
    }
  });

  render(<TestComponent selector={selector} effect={effect} />);

  expect(effect).toHaveBeenCalledTimes(3);

  expect(effect).toHaveBeenCalledWith(
    expect.objectContaining({
      tasks: [{ title: "a", state: "b" }],
    })
  );
});


// Unit Testing = Zustand သင်ခန်းစာအသစ် မဟုတ်ဘူး။

// ကိုယ်ရေးထားတဲ့ Zustand logic မှန်မမှန် စစ်တဲ့အပိုင်း ပဲ။

// Zustand store တွေက React component tree မလိုဘဲ state/action logic ကို တိုက်ရိုက် test လုပ်နိုင်တာက testing အတွက် အားသာချက်တစ်ခုပါ။
