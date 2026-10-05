export type Person = {
  name: string;
  nickname: string;
  role: string;
  image?: string;
  caption: string;
};

export type Team = {
  name: string;
  game: string;
  coverImage: string;
  leader: Person;
  members: Person[];
};