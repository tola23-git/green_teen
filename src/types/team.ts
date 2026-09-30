export type Person = {
  name: string;
  nickname: string;
  role: string;
  image: string;
  description: string;
};

export type Team = {
  name: string;
  game: string;
  coverImage: string;
  leader: Person;
  members: Person[];
};