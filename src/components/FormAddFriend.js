import { useState } from "react";
import Button from "./Button";

export default function FormAddFriend({ onAddFriend }) {
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
