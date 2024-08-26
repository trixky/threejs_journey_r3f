import { useState, useEffect } from "react";

export default function People() {
  const [people, setPeople] = useState([
    { id: 1, name: "John" },
    { id: 2, name: "Doe" },
    { id: 3, name: "Jane" },
    { id: 4, name: "Smith" },
  ]);

  const getPeople = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setPeople(data);
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <>
      <h1>People</h1>
      {people.map((person, index) => (
        <p key={person.id}>{person.name}</p>
      ))}
    </>
  );
}
