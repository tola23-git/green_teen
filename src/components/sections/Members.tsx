"use client";

import { team } from "@/data/team";
import MemberRow from "./members/MemberRow";

export default function Members() {
  return (
    <section className="relative z-10 bg-black">
      {team.members.map((member, index) => (
        <MemberRow
          key={member.name}
          member={member}
          reverse={index % 2 === 1}
        />
      ))}
    </section>
  );
}