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

function Friend({ friend }) {
  return (
    <li>
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

      <Button>Select</Button>
    </li>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
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

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰Bill Value</label>
      <input type="text" />

      <label>🧑🏻Your Expenses</label>
      <input type="text" />

      <label>🤵🏻X's Expenses</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

export default function App() {
  const [addFriendIsOpen, setAddFriendIsOpen] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handleAddFriendIsOpen() {
    setAddFriendIsOpen((isOpen) => !isOpen);
  }

  function handleAddFriend(new_friend) {
    setFriends((friends) => [...friends, new_friend]);
    setAddFriendIsOpen(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {addFriendIsOpen && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleAddFriendIsOpen}>
          {addFriendIsOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}
