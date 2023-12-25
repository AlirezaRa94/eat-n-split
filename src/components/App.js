import { useState } from "react";
import Button from "./Button";
import FriendsList from "./FriendsList";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitBill";

export default function App() {
  const [addFriendIsOpen, setAddFriendIsOpen] = useState(false);
  const [friends, setFriends] = useState([]);
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
