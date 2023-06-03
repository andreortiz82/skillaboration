import React from "react";
import { DiceThree } from "phosphor-react";
import _ from "lodash";

const teammates = [
  "Michael",
  "Brandon",
  "Michelle",
  "Christina",
  "Joann",
  "Andre",
  "Erik",
  "Yvonne",
  "Kylie",
  "Beth",
  "Nick",
  "Todd",
  "Julian",
];

const genre = [
  "a UI",
  "a lofi, UX workflow",
  "a poster",
  "a brand",
  "a clickable front-end",
  "a storyboard",
  "an animatimation",
];

const theme = [
  "a music company, instrument, or artist",
  "a retail store or travel agency",
  "a restaurant or food item",
  "animals or animal products",
  "a technology company or digital product",
  "a single person or group of people",
  "an event in a specific location",
];

export const ChallengeCard = () => {
  const [presenters, setPresenters] = React.useState([]);
  const [project, setProject] = React.useState([]);

  const chooseNames = () => {
    const team = _.sampleSize(teammates, 3);
    const teamGenre = _.sampleSize(genre, 1);
    const teamTheme = _.sampleSize(theme, 1);

    const result = {
      team: team,
      project: `Design ${teamGenre} for ${teamTheme}`,
    };

    setPresenters(result.team);
    setProject(result.project);
  };

  return (
    <article>
      <header className="mb-5 flex gap-6 items-center">
        <h1 className="text-2xl font-bold">Skillaboration!</h1>
        <button
          className="flex gap-2 items-center text-lg px-4 py-2 cursor-pointer rounded-md bg-green-300 hover:bg-green-400 ease-in-out duration-200"
          onClick={() => chooseNames()}
        >
          <DiceThree className="text-2xl" /> <span>Roll to play</span>
        </button>
      </header>

      <section className="mb-5">
        {presenters.length > 0 && (
          <h1 className="text-8xl font-bold">{project}</h1>
        )}
      </section>
      <section>
        {presenters.length > 0 && <b>Skillaborators:</b>}
        <ul>
          {presenters.map((p) => {
            return <li key={p}>{p}</li>;
          })}
        </ul>
      </section>
    </article>
  );
};
