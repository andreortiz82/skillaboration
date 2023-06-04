/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderHead, e as renderSlot, _ as __astro_tag_component__, f as renderComponent, m as maybeRenderHead } from '../astro.2be00a2a.mjs';
import 'html-escaper';
import 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import 'cookie';
import 'kleur/colors';
import 'slash';
import 'path-to-regexp';
import 'mime';
import 'string-width';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" class="astro-SCKKX6R4">
	<head>
		<meta charset="UTF-8">
		<meta name="description" content="Skillaboration! Collaborative challenges for creative teams.">
		<meta name="viewport" content="width=device-width">
		<link rel="icon" type="image/svg+xml" href="/favicon.svg">
		<meta name="generator"${addAttribute(Astro2.generator, "content")}>
		<title>${title}</title>
	${renderHead($$result)}</head>
	<body class="astro-SCKKX6R4">
		${renderSlot($$result, $$slots["default"])}
	</body></html>`;
}, "/Users/andreortiz-reify/Desktop/skillaboration/src/layouts/Layout.astro");

const HowToPlayPrompt = () => {
  return /* @__PURE__ */ jsx("a", {
    href: "#howtoplay",
    className: "\n        cursor-pointer \n        bg-white\n        border-neutral-200\n        border-2\n        text-neutral-800 \n        hover:border-neutral-950\n        px-6\n        py-3 \n        flex \n        justify-center \n        items-center \n        text-center \n        rounded-full\n        transition\n        text-md\n        font-medium",
    children: "How to play"
  });
};
const HowToPlay = () => {
  return /* @__PURE__ */ jsxs("article", {
    id: "howtoplay",
    className: "text-white",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-7xl font-bold mb-3",
      children: "How to play:"
    }), /* @__PURE__ */ jsxs("p", {
      className: "text-2xl leading-relaxed text-neutral-300 font-light",
      children: [/* @__PURE__ */ jsx("span", {
        className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold",
        children: "Skillaboration! "
      }), " ", "requires at least  ", /* @__PURE__ */ jsx("code", {
        className: "p-1 bg-green-300 text-black rounded-md",
        children: "2-4 players"
      }), " ", "from various creative disciplines. The players will be given a design challenge and will have  ", /* @__PURE__ */ jsx("code", {
        className: "p-1 bg-green-300 text-black rounded-md",
        children: "9 working days"
      }), " ", "to complete the task and prepare a presentation. The players are encouraged to seek help from anyone at any time. It is also recommended that the players request feedback from a non-player at the midway point. Remember, your time is limited so prioritize accordingly. To successfully complete the challenge, the skillaborators must work as team, learn new skills, and flex those creative muscles."]
    }), /* @__PURE__ */ jsx("hr", {
      className: "my-10 border-neutral-700"
    }), /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsxs("p", {
        className: "text-2xl leading-relaxed text-neutral-300 font-light",
        children: [/* @__PURE__ */ jsx("span", {
          className: "italic",
          children: "Skillaboration! "
        }), "is a game designed to promote team building and personal growth. Be creative & have fun!"]
      })
    })]
  });
};
__astro_tag_component__(HowToPlayPrompt, "@astrojs/react");
__astro_tag_component__(HowToPlay, "@astrojs/react");

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const skills = [
    "a UI",
    "a lofi, UX workflow",
    "a poster",
    "a brand",
    "a clickable front-end",
    "a data visualization",
    "an animatimation",
    "a sticker set"
  ];
  const challenges = [
    "a music company, instrument, or artist",
    "a retail store or travel agency",
    "a restaurant or food item",
    "animals or animal products",
    "a technology company or digital product",
    "a single person or group of people",
    "an event in a specific location"
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Skillaboration!" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<main class="relative">
    <section class="relative p-20 min-h-screen">
      ${renderComponent($$result2, "ChallengeCard", null, { "client:only": true, "skills": skills, "challenges": challenges, "client:component-hydration": "only", "client:component-path": "/Users/andreortiz-reify/Desktop/skillaboration/src/components/ChallengeCard", "client:component-export": "ChallengeCard" })}
    </section>

    <section class="flex justify-center items-center bg-black p-40 min-h-screen">
      <div class="w-11/12 m-auto">
        ${renderComponent($$result2, "HowToPlay", HowToPlay, {})}
      </div>
    </section>
  </main>
` })}`;
}, "/Users/andreortiz-reify/Desktop/skillaboration/src/pages/index.astro");

const $$file = "/Users/andreortiz-reify/Desktop/skillaboration/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
