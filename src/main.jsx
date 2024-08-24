import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const world = "world";
const yes = true;

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <>
    {/* this is a comment */}
    <h1 className="title" style={{ color: "green", backgroundColor: "floralwhite" }}>
      Hello {world} {<em>ememem</em>}
    </h1>
    <p>{yes ? "yes" : "no"}</p>
    <p className="cute-paragraph">
      Lorem <strong>ipsum</strong> dolor <br /> sit amet, consectetur
      adipisicing elit. Aut pariatur suscipit rem voluptate laboriosam
      consequatur quaerat, provident eos quod quas error voluptatibus cum autem
      voluptas, iste quam debitis. Explicabo, numquam.
    </p>
    <App clickerCount={5}>
      <h2>yolo</h2>
      {/* possible to give yolo in 'children' prop */}
    </App>
  </>
);
