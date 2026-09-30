import { Team } from "@/types/team";

export const team: Team = {
  name: "GREEN TEEN",
  game: "Mobile Legends Esports Team",
  coverImage: "https://res.cloudinary.com/bvvlkx40/image/upload/v1790669980/team_cover.jpg",

  leader: {
    name: "Phout ",
    nickname: "Phut",
    role: "Gold lane",
    image: "/leader.png",
    description: "Leading the team with strategy, discipline and teamwork.",
  },

  members: [
    {
      name: "Shogun",
      nickname: "Shogun",
      role: "Jungler",
      image: "/player1.png",
      description: "Specialized in fast decision making and game control.",
    },
    {
      name: "Aiy Zang ",
      nickname: "Aiy ",
      role: "Exp",
      image: "/player2.png",
      description: "Focused on damage output and team fights.",
    },
    {
      name: "pepey",
      nickname: "Peypey",
      role: "Mid Lane",
      image: "/player3.png",
      description: "Creates opportunities and supports the team.",
    },
     {
      name: "Air Air",
      nickname: "Air",
      role: "Exp",
      image: "/player3.png",
      description: "Creates opportunities and supports the team.",
    },
     {
      name: "Air Noy",
      nickname: "Noy",
      role: "Roam",
      image: "/player3.png",
      description: "Creates opportunities and supports the team.",
    },
     {
      name: "Tola",
      nickname: "To",
      role: "Exp",
      image: "https://res.cloudinary.com/bvvlkx40/image/upload/v1790673701/Tola.png",
      description: "No one can bit you if you do not give they bit ",
    },
  ],
};