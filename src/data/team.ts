import { Team } from "@/types/team";
import { images } from "@/constants/images";

export const team: Team = {
  name: "GREEN TEEN",
  game: "Mobile Legends Esports Team",

  coverImage: images.teamCover,

  leader: {
    name: "Air",
    nickname: "Air",
    role: "Gold lane",
    image: images.leader,
    caption: "ນຳທີມດ້ວຍຍຸດທະສາດ ແລະ ຄວາມສາມັກຄີ",
  },

  members: [
    {
      name: "Phout",
      nickname: "Phout",
      role: "Exp",
      image: images.phout,
      caption: "ສ້າງໂອກາດ ແລະ ຢືນຢູ່ຂ້າງທີມສະເໝີ",
    },

    {
      name: "Tock",
      nickname: "Tock",
      role: "Exp",
      image: images.tock,
      caption: "ບໍ່ຍອມແພ້ ຈົນກວ່າຈະຊະນະ",
    },

    {
      name: "Shogun",
      nickname: "Shogun",
      role: "Jungler",
      image: images.shogun,
      caption: "ຕັດສິນໃຈໄວ ຄວບຄຸມເກມໄດ້",
    },

    {
      name: "Aiy Zang",
      nickname: "Aiy",
      role: "Exp",
      image: images.aiyZang,
      caption: "ແຮງເຕັມທີ່ ທຸກການຕໍ່ສູ້",
    },

    {
      name: "Pepey",
      nickname: "Peypey",
      role: "Mid Lane",
      image: images.pepey,
      caption: "ສ້າງຈັງຫວະ ນຳພາໄຊຊະນະ",
    },

    {
      name: " Noy",
      nickname: "Noy",
      role: "Roam",
      image: images.airNoy,
      caption: "ປົກປ້ອງທີມ ດ້ວຍໃຈເຕັມຮ້ອຍ",
    },

    {
      name: "Namfon",
      nickname: "Namfon",
      role: "Exp",
      image: images.namfon,
      caption: "ຄວາມຜິດພາດຄືບົດຮຽນ",
    },

    {
      name: "Mitch",
      nickname: "Mitch",
      role: "Exp",
      image: images.mitch,
      caption: "ຮຽນຮູ້ຈາກຄວາມຜິດພາດ ແລ້ວແຂງແກ່ນຂຶ້ນ",
    },

    {
      name: "Tola",
      nickname: "To",
      role: "Exp",
      image: images.tola,
      caption: "ເຈົ້າຄຽດຫວາ ຂ້ອຍເປັນກົບ",
    },
  ],
};