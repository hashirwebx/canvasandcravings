import { useState, useEffect } from "react";
import CanvasCravings from "./CanvasCravings";
import CanvasCravingsMenu from "./CanvasCravingsMenu";

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || "#/");

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return route;
}

export default function App() {
  const route = useHashRoute();

  if (route === "#/menu") {
    return <CanvasCravingsMenu />;
  }

  return <CanvasCravings />;
}
