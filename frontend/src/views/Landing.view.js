import React from "react";

//components
import Team from "../components/teamMembers.component";
import Hero from "../components/Hero.component";
import Steps from "../components/steps.component";
import Statisct from "../components/statistc.component";

export default function Landing() {
  const [Landing, setLanding] = React.useState({ theme: "yellow" });
  window.localStorage.setItem("page",0);
  return (
    <>
      <Hero />
      <Steps theme={Landing.theme} />
      <Statisct theme={Landing.theme} />
    </>
  );
}
