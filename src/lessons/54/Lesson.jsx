// import { createBrowserRouter } from "react-router-dom";
import App from "./SubApp";
import "./lesson.css";

export default function Lesson54() {
  const world = "to";
  const yes = true;

  return (
    <>
      {/* this is a comment */}
      <h1
        className="title"
        style={{ color: "green", backgroundColor: "floralwhite" }}
      >
        COME BACK {world} {<em>REACT</em>}
      </h1>
      <p>{yes ? "yes" : "no"}</p>
      <p className="cute-paragraph">
        COME BACK TO REACT Lorem <strong>ipsum</strong> dolor <br /> sit amet,
        consectetur adipisicing elit. Aut pariatur suscipit rem voluptate
        laboriosam consequatur quaerat, provident eos quod quas error
        voluptatibus cum autem voluptas, iste quam debitis. Explicabo, numquam.
      </p>
      <App clickerCount={5}>
        <h2>yolo</h2>
        {/* possible to give yolo in 'children' prop */}
      </App>
    </>
  );
}
