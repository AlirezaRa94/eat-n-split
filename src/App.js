import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  function handleClick() {
    onSelectFriend(isSelected ? null : friend);
  }

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={handleClick}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
}

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function FormAddFriend({ onAddFriend }) {
  const defaultImageUrl = "https://i.pravatar.cc/48";
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState(defaultImageUrl);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !imageURL) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name: name,
      image: `${imageURL}?u=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);

    setName("");
    setImageURL(defaultImageUrl);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👨‍🤝‍👩🏻Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄Image URL</label>
      <input
        type="text"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ friend, onSplitBill }) {
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

export default function App() {
  const [addFriendIsOpen, setAddFriendIsOpen] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriendIsOpen() {
    setAddFriendIsOpen((isOpen) => !isOpen);
  }

  function handleAddFriend(new_friend) {
    setFriends((friends) => [...friends, new_friend]);
    setAddFriendIsOpen(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend(friend);
    setAddFriendIsOpen(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {addFriendIsOpen && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleAddFriendIsOpen}>
          {addFriendIsOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill friend={selectedFriend} onSplitBill={handleSplitBill} />
      )}
    </div>
  );
}
