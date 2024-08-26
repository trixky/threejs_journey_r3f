import { NavLink, Outlet } from "react-router-dom";
import "./style/nav.css";
import routes from "./routes";

export default function Nav() {
  return (
    <>
      <header
        style={{
          width: "100%",
          backgroundColor: "azure",
          textAlign: "center",
          padding: "10px",
        }}
      >
        <h1>Three.js Journey Course (R3F)</h1>
        <nav>
          <ul>
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={`/${route.path}`}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <li>{route.path}</li>
              </NavLink>
            ))}
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
