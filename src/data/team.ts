import { Team } from "@/types/team";
import { images } from "@/constants/images";

export const team: Team = {
  name: "GREEN TEEN",
  game: "Mobile Legends Esports Team",

  coverImage: images.teamCover,

  leader: {
    name: "Air",
    nickname: "Air",
    role: "COO",
    image: images.leader,
  },

  members: [
    {
      name: "Phout",
      nickname: "Phout",
      role: "Public Relations Manager",
      image: images.phout,
    },
    {
      name: "Tock",
      nickname: "Tock",
      role: "Frontline Support",
      image: images.tock,
    },
    {
      name: "Shogun",
      nickname: "Shogun",
      role: "BackEnd Developer",
      image: images.shogun,
    },
    {
      name: "XANGNAM",
      nickname: "Aiy",
      role: "R&D Manager",
      image: images.aiyZang,
    },
    {
      name: "Pepey",
      nickname: "Peypey",
      role: "Sales & Marketing",
      image: images.pepey,
    },
    {
      name: "Noy",
      nickname: "Noy",
      role: "Mobile Developer",
      image: images.airNoy,
    },
    {
      name: "Namfon",
      nickname: "Namfon",
      role: "QC Tester & IT Support",
      image: images.namfon,
    },
    {
      name: "Mitch",
      nickname: "Mitch",
      role: "Mobile Developer",
      image: images.mitch,
    },
    {
      name: "Tola",
      nickname: "To",
      role: "Intern Mobile Developer",
      image: images.tola,
    },
    {
      name: "Jo",
      nickname: "jo",
      role: "Intern BackEnd Developer",
      image: images.jo,
    },
  ],
};