"use client";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../store/actions";

export default function Counter() {
  const count = useSelector((state: any) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
