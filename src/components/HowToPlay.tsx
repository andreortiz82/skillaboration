import React from "react";

export const HowToPlayPrompt = () => {
  return (
    <a
      href="#howtoplay"
      // style={{ top: "calc(-100vh + 400px)" }}
      className="
        cursor-pointer 
        bg-white
        border-neutral-200
        border-2
        text-neutral-800 
        hover:border-neutral-950
        px-6
        py-3 
        flex 
        justify-center 
        items-center 
        text-center 
        rounded-full
        transition
        text-md
        font-medium
        whitespace-nowrap"
    >
      How to play
    </a>
  );
};

export const HowToPlay = () => {
  return (
    <article id="howtoplay" className="text-white">
      <h1 className="font-lilita text-6xl font-bold mb-3">How to play:</h1>
      <p className="text-2xl leading-relaxed text-neutral-300 font-light">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold">
          Skillaboration!&nbsp;
        </span>{" "}
        requires at least &nbsp;
        <code className="p-1 bg-green-300 text-black rounded-md">
          2-4 players
        </code>{" "}
        from various creative disciplines. The players will be given a design
        challenge and will have &nbsp;
        <code className="p-1 bg-green-300 text-black rounded-md">
          9 working days
        </code>{" "}
        to complete the task and prepare a presentation. The players are
        encouraged to seek help from anyone at any time. It is also recommended
        that the players request feedback from a non-player at the midway point.
        Remember, your time is limited so prioritize accordingly. To
        successfully complete the challenge, the skillaborators must work as
        team, learn new skills, and flex those creative muscles.
      </p>
      <hr className="my-10 border-neutral-700" />
      <div>
        <p className="text-2xl leading-relaxed text-neutral-300 font-light">
          <span className="italic">Skillaboration!&nbsp;</span>
          is a game designed to promote team building and personal growth. Be
          creative &amp; have fun!
        </p>
      </div>
    </article>
  );
};
