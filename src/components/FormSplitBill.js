import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ friend, onSplitBill }) {
  const [bill, setBill] = useState(0);
  const [userExpense, setUserExpense] = useState(0);
  const friendExpense = bill - userExpense;
  const [payer, setPayer] = useState("user");

  function handleUserExpense(e) {
    const value = Number(e.target.value);
    bill >= value && setUserExpense(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill) return;

    onSplitBill(payer === "user" ? friendExpense : -userExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friend.name}</h2>

      <label>💰Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) =>
          !isNaN(Number(e.target.value)) && setBill(Number(e.target.value))
        }
      />

      <label>🧑🏻Your Expenses</label>
      <input type="text" value={userExpense} onChange={handleUserExpense} />

      <label>🤵🏻{friend.name}'s Expenses</label>
      <input type="text" disabled value={friendExpense} />

      <label>🤑 Who is paying the bill?</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
