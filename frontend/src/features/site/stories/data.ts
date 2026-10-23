import type { Story, StoryCategory } from "./types";

export const editorialByline = "Stoa editorial preview";
export const storyCategories: StoryCategory[] = ["Technology", "Relationships", "Culture"];

// Original demonstration copy with sample dates, not reporting or professional
// advice. Human review and accountable authorship are required before launch.
export const stories: Story[] = [
  {
    slug: "your-attention-is-the-most-valuable-thing-you-own",
    title: "Your attention is the most valuable thing you own",
    excerpt: "A hundred things want a piece of your day. A few questions can help you decide which ones deserve it.",
    category: "Technology",
    image: "/images/stoa-genz-attention.png",
    imageAlt: "A young adult with short dark hair, translucent sunglasses, silver headphones, and a black jacket against city concrete at dusk",
    imagePosition: "50% 35%",
    publishedAt: "2026-10-22T09:00:00Z",
    readTime: 2,
    body: [
      { heading: "What did you come here to do?", paragraphs: [
        "You open your phone to check a train time. A message catches your eye, then a link, then something you meant to look at yesterday. The journey from one useful task to another can be almost invisible. This is a familiar kind of detour, not a personal failure or a diagnosis.",
        "Try asking a small question before you open an app: what did I come here to do? It does not have to become a rule. Sometimes the answer is simply to have a little fun. Naming the intention gives you a way to notice when you have finished, or when you have chosen to do something else.",
      ] },
      { heading: "Make a few deliberate choices", paragraphs: [
        "Look at the digital places you return to most often. Which help you make something, understand something, or stay in touch with someone? Which have become a habit you would not actively choose? Your answers may change from one week to the next.",
        "You could move an app off the first screen, leave a bookmark for the thing you actually need, or decide that one conversation deserves your full attention. These are experiments in arranging your day. There is no universal screen-time target hiding behind them.",
      ] },
      { heading: "Leave room for enjoyment", paragraphs: [
        "A more deliberate relationship with technology does not require every minute to be productive. A ridiculous video shared by a friend can be a perfectly good use of time. So can wandering through an archive of photographs or listening to a song twice.",
        "The distinction worth exploring is whether you are choosing the experience. Attention is personal: it is how you encounter the people, ideas, and small pleasures in a day. You are allowed to decide what deserves yours, and to change your mind tomorrow.",
      ] },
    ],
  },
  {
    slug: "the-conversations-we-keep-putting-off",
    title: "The conversations we keep putting off",
    excerpt: "Not every important conversation needs a perfect opening. Sometimes it starts with one honest, ordinary sentence.",
    category: "Relationships",
    image: "/images/stoa-genz-conversation.png",
    imageAlt: "Two women laughing together in a metallic laundromat, wearing a cobalt cardigan and charcoal denim",
    imagePosition: "50% 35%",
    publishedAt: "2026-10-20T09:00:00Z",
    readTime: 2,
    body: [
      { heading: "Start smaller than the whole story", paragraphs: [
        "There are everyday conversations that stay on the mental to-do list: asking a friend to make plans differently, saying you miss someone, or explaining why you have been quiet. It is easy to wait for a sentence that will make the whole exchange effortless.",
        "For an ordinary, mutually comfortable conversation, a smaller opening may be enough. “There is something I have been meaning to ask you” leaves room for the other person to respond. You do not have to deliver an entire explanation before the conversation has begun.",
      ] },
      { heading: "Ask whether now is a good time", paragraphs: [
        "Timing is part of the exchange. A person can care about what you are saying and still be distracted or halfway through something else. Asking when there is room to talk acknowledges that both people have a day unfolding around them.",
        "It can help to be specific about the ordinary thing you want to discuss. A missed plan is easier to describe than a sweeping statement about the friendship. Leave room for an account of the situation that is different from the one you have rehearsed.",
      ] },
      { heading: "Let the answer be unfinished", paragraphs: [
        "Some conversations end with a practical next step. Others end with a clearer understanding and a promise to return to the subject. An exchange does not have to settle everything to have been worth making time for.",
        "This is a reflection on everyday communication, not a guide to handling abuse, coercion, or a crisis. Those situations need different considerations. For ordinary conversations we can choose freely, a little honesty and a little space can be a useful place to begin.",
      ] },
    ],
  },
  {
    slug: "the-internet-is-bringing-back-the-beautifully-weird",
    title: "The internet is bringing back the beautifully weird",
    excerpt: "An appreciation of personal websites, unlikely collections, and making something simply because you want it to exist.",
    category: "Culture",
    image: "/images/stoa-genz-weird-web.png",
    imageAlt: "A translucent lilac retro desktop computer showing a chrome asterisk on a blue screen, set on a metal desk",
    imagePosition: "50% 50%",
    publishedAt: "2026-10-18T09:00:00Z",
    readTime: 2,
    body: [
      { heading: "A corner of the web with a personality", paragraphs: [
        "Imagine a website devoted to the lettering on old shop signs, a tiny game made for one friend, or a digital scrapbook with no intention of looking professional. The appeal is not polish. It is the feeling that someone has made a place for a very particular curiosity.",
        "This sample essay is an appreciation of that possibility, rather than a report measuring an internet trend. A personal corner of the web can offer a different pleasure from a perfectly consistent profile. It gives an interest room to become specific.",
      ] },
      { heading: "Make something with a small purpose", paragraphs: [
        "A creative project need not begin with a business plan. It can begin with a question, a collection, or an amusing idea that you want to show someone. A small purpose makes it easier to decide what belongs and when the first version is finished.",
        "Give the project a form that fits it. A page of photographs may be enough. A few notes can become a short illustrated guide. You can choose a color because you like it and leave a detail in because it makes the intended reader smile.",
      ] },
      { heading: "Keep the invitation open", paragraphs: [
        "Personality does not have to make a page difficult to use. Clear links, readable text, and thoughtful descriptions can sit alongside unusual ideas. The aim is to invite another person into your interest, not make them solve a puzzle to reach it.",
        "There is room online for work that is earnest, odd, small, or hard to categorize. Sometimes its value is simply that it lets one person recognize an enthusiasm in another. That is already a reason to make something.",
      ] },
    ],
  },
  {
    slug: "a-more-intentional-relationship-with-your-phone",
    title: "A more intentional relationship with your phone",
    excerpt: "A useful device, a personal arrangement. Small ways to make your phone fit the day you actually have.",
    category: "Technology",
    image: "/images/stoa-genz-phone.png",
    imageAlt: "A graphite smartphone, silver wired earphones, and dark sunglasses arranged on cobalt-grey concrete",
    imagePosition: "50% 50%",
    publishedAt: "2026-10-16T09:00:00Z",
    readTime: 2,
    body: [
      { heading: "Begin with what already works", paragraphs: [
        "Your phone may be a map, a camera, a notebook, and the way you hear from the people you love. Before making a list of things to remove, name the uses you would genuinely miss. Those are useful clues about how you want the device to fit into your day.",
        "Arrange the tools you reach for deliberately where they are easy to find. An accessible list or a direct shortcut to a frequently used function can be more helpful than a complicated system you need to remember to maintain.",
      ] },
      { heading: "Notice the interruptions you can choose", paragraphs: [
        "Different messages deserve different attention. A reply you are waiting for is not the same as an update from an app you rarely use. Look through the options your device offers and decide which interruptions are useful to you.",
        "Keep the experiment modest. Change one setting, try it for a while, and adjust if it gets in the way. The point is to make your ordinary tasks a little more straightforward, with an arrangement you chose yourself.",
      ] },
      { heading: "There is no perfect setup", paragraphs: [
        "A working day, a trip, and an evening with friends may ask different things of the same device. An arrangement that works for one situation can be inconvenient in another. You are allowed to adapt it.",
        "Treat your setup as something useful and revisable. If a change helps you find what you need and return to what you were doing, keep it. If it becomes another chore, simplify it. The phone is a tool you get to arrange.",
      ] },
    ],
  },
  {
    slug: "the-underrated-art-of-making-plans",
    title: "The underrated art of making plans",
    excerpt: "From “we should catch up” to an actual afternoon together. A case for making the invitation a little more concrete.",
    category: "Relationships",
    image: "/images/stoa-genz-plans.png",
    imageAlt: "Three adult friends laughing on city steps at blue hour, wearing denim and lilac clothing",
    imagePosition: "50% 35%",
    publishedAt: "2026-10-14T09:00:00Z",
    readTime: 2,
    body: [
      { heading: "Give the invitation a shape", paragraphs: [
        "“We should catch up” is a pleasant sentiment. It leaves the practical work for another day: choosing a place, finding a time, and deciding who will ask again. A more specific invitation gives the other person something they can actually consider.",
        "It can be small. Suggest a walk on an afternoon you are free, tea near someone’s usual route, or a short call. There is no need to design an impressive occasion when what you want is to spend time together.",
      ] },
      { heading: "Make it easy to answer honestly", paragraphs: [
        "An invitation is not an obligation. Leave room for a different time or an ordinary no. People have commitments and preferences you may not see, and a plan that works for both of you is more useful than one that looks good in a message.",
        "A couple of concrete options can make the exchange easier. So can saying what kind of plan you have in mind. A quick coffee and an entire evening are different invitations, even when both begin with the same friendly sentence.",
      ] },
      { heading: "Let ordinary time count", paragraphs: [
        "Friendship does not need every meeting to become a memorable event. An errand together, a familiar meal, or a conversation on a bench can make space for details that do not fit neatly into a text update.",
        "If a plan falls through, a clear message is a small kindness. If you would like to try again, offer another possibility when you can. The art is less about managing a calendar perfectly than making the invitation tangible.",
      ] },
    ],
  },
  {
    slug: "why-we-still-reach-for-paper",
    title: "Why we still reach for paper",
    excerpt: "An appreciation of margins, unfinished thoughts, and the pleasure of making a mark that stays put.",
    category: "Culture",
    image: "/images/stoa-genz-paper.png",
    imageAlt: "An open sketchbook surrounded by cobalt cut-paper shapes, photographic contact sheets, and silver scissors",
    imagePosition: "50% 50%",
    publishedAt: "2026-10-12T09:00:00Z",
    readTime: 2,
    body: [
      { heading: "A page has edges", paragraphs: [
        "A sheet of paper offers a small, visible space. You can put a thought in the center, draw a line toward another thought, or leave the margin open. It accepts a sentence, a sketch, and an untidy list without asking you to choose a format first.",
        "That physical limit can be part of its appeal. One page is a manageable place to begin. You can turn it over or start another, but for a moment the work has an edge you can see.",
      ] },
      { heading: "Leave the thinking visible", paragraphs: [
        "A notebook does not have to look beautiful on every page. Crossed-out lines can remain visible. A sketch can be unfinished. A list can include something you later decide not to do. These marks record a process, not only its results.",
        "Choose paper for the tasks you enjoy doing on paper. It may be a shopping list, a note to someone, or a rough plan. There is no need to move your entire life into a notebook to appreciate a few pages.",
      ] },
      { heading: "Let your tools coexist", paragraphs: [
        "A page saved from an ordinary day can become unexpectedly specific. Handwriting, a coffee ring, or a word squeezed into a corner gives it a material presence. It belongs to the moment in a way you may recognize later.",
        "Paper and screens can happily share a desk. One may suit a final draft, another an uncertain first line. Reach for the tool that lets you begin, and let the beginning be imperfect.",
      ] },
    ],
  },
  {
    slug: "friendship-beyond-the-group-chat",
    title: "Friendship beyond the group chat",
    excerpt: "The running joke, the quick reply, the longer conversation. Different ways of staying in each other’s lives.",
    category: "Relationships",
    image: "/images/stoa-genz-friendship.png",
    imageAlt: "Black-and-white photobooth strips of three adult friends on a metal surface beside a blue star charm",
    imagePosition: "50% 50%",
    publishedAt: "2026-10-10T09:00:00Z",
    readTime: 2,
    body: [
      { heading: "Appreciate the small exchanges", paragraphs: [
        "A group chat can hold a surprising amount of everyday life: photographs, small triumphs, unfinished jokes, and the question of what everyone is having for dinner. These exchanges do not have to be profound to matter to the people sharing them.",
        "They also have a particular rhythm. A message can arrive between meetings or during a commute, and a conversation may move on before someone has time to answer. Silence in that stream does not supply the whole story of a friendship.",
      ] },
      { heading: "Choose another shape sometimes", paragraphs: [
        "Some things are easier to share in a smaller conversation. You might want to ask about a change in a friend’s life, tell a longer story, or hear a familiar voice. A direct note can create a different kind of opening.",
        "Let the other person choose what works for them. A call, a walk, and a voice message each make different demands on someone’s time. Staying in touch does not require everyone to prefer the same format.",
      ] },
      { heading: "Keep the door open", paragraphs: [
        "There is no single correct frequency for a friendship. The people involved get to work out what feels possible and welcome. A clear invitation is often more useful than silently keeping track of who replied last.",
        "The group chat can remain a good place for the shared joke. It does not need to carry every conversation. There is room for small exchanges and longer ones, for online company and time spent in the same place.",
      ] },
    ],
  },
  {
    slug: "what-makes-a-tool-worth-your-time",
    title: "What makes a tool worth your time",
    excerpt: "Before adding one more app to your day, look closely at the job you actually want it to do.",
    category: "Technology",
    image: "/images/stoa-genz-tools.png",
    imageAlt: "A translucent purple mechanical keyboard, a silver trackball, and a stylus arranged together",
    imagePosition: "50% 50%",
    publishedAt: "2026-10-08T09:00:00Z",
    readTime: 2,
    body: [
      { heading: "Name the job first", paragraphs: [
        "A new tool arrives with a persuasive collection of possibilities. It can organize, summarize, remind, and rearrange. Before exploring all of them, name one concrete job you need help with. A specific task gives you a way to judge the experience.",
        "“Keep a list I can find later” is different from “manage a shared project.” The simplest useful option depends on the work and the people involved. A feature list is not the same thing as a good fit.",
      ] },
      { heading: "Look at the ordinary path", paragraphs: [
        "Try the sequence you expect to repeat: add something, find it, change it, and share or export it if that matters to you. Notice the steps that feel clear and the ones that make you stop. A polished first screen cannot tell you how the everyday work will feel.",
        "Read the current provider information before entering real material, especially when the work involves someone else. No particular product has been tested or recommended in this demonstration article. The useful habit is to understand a tool before depending on it.",
      ] },
      { heading: "Count the work around the work", paragraphs: [
        "Setup, maintenance, and moving information between places are part of using a tool. If an arrangement requires more attention than the task itself, it may be worth simplifying. Sometimes the familiar method is enough.",
        "A worthwhile tool earns its place through use. Keep the ones that make an actual job clearer or easier for you, and leave room to reconsider. Your collection does not have to grow every time a new possibility appears.",
      ] },
    ],
  },
];

export function findStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export function formatStoryDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}
