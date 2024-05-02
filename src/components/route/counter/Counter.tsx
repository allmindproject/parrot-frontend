import { useDispatch, useSelector } from "react-redux";
import { CounterActions } from "../../../services/state/slice/CounterSlice";
import classes from "./Counter.module.css";
import { RootState } from "../../../services/state/store";

const Counter = () => {
  const dispatch = useDispatch();

  const currentCount = useSelector((state: RootState) => state.counter.counter);

  const increment = () => {
    dispatch(CounterActions.increment());
  };
  const decrement = () => {
    dispatch(CounterActions.decrement());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{currentCount}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </main>
  );
};

export default Counter;
