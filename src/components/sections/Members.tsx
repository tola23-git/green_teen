"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { team } from "@/data/team";
import type { Person } from "@/types/team";

const reveal = (delay = 0) => ({
  initial: {
    opacity: 0,
    y: 50,
    filter: "blur(12px)",
  },
  whileInView: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  viewport: {
    once: false,
    amount: 0.3,
  },
  transition: {
    duration: 0.8,
    delay,
    ease: "easeOut" as const,
  },
});


type MemberRowProps = {
  member: Person;
  reverse: boolean;
};


function MemberRow({ member, reverse }: MemberRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });


  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [40, -40]
  );


  const bgTextX = useTransform(
    scrollYProgress,
    [0, 1],
    reverse
      ? ["-10%", "10%"]
      : ["10%", "-10%"]
  );


  const [firstName, ...restName] =
    member.name.split(" ");


  return (
    <section
      ref={rowRef}
      className="
      relative
      min-h-screen
      overflow-hidden
      px-6
      py-20
      md:px-24
      "
    >

      {/* glow */}
      <div
        className={`
        pointer-events-none
        absolute
        top-1/4
        h-[350px]
        w-[350px]
        rounded-full
        bg-green-500/20
        blur-[120px]

        md:h-[600px]
        md:w-[600px]

        ${
          reverse
            ? "-left-40"
            : "-right-40"
        }
        `}
      />


      {/* background name */}
      <motion.p
        style={{
          x: bgTextX,
          WebkitTextStroke:
            "1px rgba(34,197,94,0.25)",
        }}
        className="
        pointer-events-none
        absolute
        left-0
        top-1/2
        -translate-y-1/2
        whitespace-nowrap
        font-brand
        text-[25vw]
        uppercase
        text-transparent

        md:text-[22vw]
        "
      >
        {member.nickname}
      </motion.p>



      <div
        className="
        relative
        mx-auto
        flex
        max-w-7xl
        flex-col
        items-center
        gap-12

        md:grid
        md:grid-cols-2
        md:gap-16
        "
      >


        {/* IMAGE */}
        <motion.div
          {...reveal(0.2)}
          className={`
          order-1
          flex
          w-full
          justify-center

          ${
            reverse
              ? "md:order-1"
              : "md:order-2"
          }
          `}
        >

          <motion.div
            style={{
              y: imageY,
            }}
            className="relative"
          >

            <div
              className={`
              absolute
              inset-0
              rounded-3xl
              border
              border-green-500/60

              translate-y-4

              ${
                reverse
                ? "-translate-x-4 -rotate-3"
                : "translate-x-4 rotate-3"
              }

              md:translate-y-5
              `}
            />


            <img
              src={member.image}
              alt={member.name}
              className="
              relative

              h-[420px]
              w-[280px]

              rounded-3xl
              object-cover
              object-top

              shadow-[0_0_80px_rgba(34,197,94,0.35)]

              md:h-[520px]
              md:w-[400px]
              "
            />

          </motion.div>

        </motion.div>




        {/* TEXT */}
        <div
          className={`
          order-2
          w-full
          text-left

          ${
            reverse
              ? "md:order-2"
              : "md:order-1"
          }
          `}
        >


          <motion.div
            {...reveal()}
            className="
            flex
            items-center
            gap-3
            "
          >

            <span
              className="
              h-[3px]
              w-10
              bg-green-500
              "
            />

            <p
              className="
              font-tech
              text-sm
              uppercase
              tracking-[0.25em]
              text-green-400

              md:text-4xl
              "
            >
              Meet the player
            </p>

          </motion.div>



          <motion.h2
            {...reveal(0.15)}
            className="
            mt-5
            font-brand
            text-5xl
            leading-none
            text-white

            md:text-9xl
            "
          >

            {firstName}{" "}

            <span
              className="
              bg-linear-to-b
              from-green-300
              to-green-600
              bg-clip-text
              text-transparent
              "
            >
              {restName.join(" ")}
            </span>

          </motion.h2>




          <motion.div
            {...reveal(0.3)}
            className="
            mt-5
            flex
            items-center
            gap-3
            "
          >

            <span
              className="
              h-1
              w-10
              bg-green-500
              "
            />


            <p
              className="
              font-brand
              text-3xl
              uppercase
              tracking-widest
              text-green-400

              md:text-7xl
              "
            >
              {member.role}
            </p>


          </motion.div>



          <motion.p
            {...reveal(0.45)}
            className="
            mt-5
            max-w-md
            text-sm
            leading-relaxed
            text-gray-400

            md:text-lg
            "
          >
            {member.description}
          </motion.p>


        </div>


      </div>


    </section>
  );
}



export default function Members() {

  return (
    <section
      className="
      relative
      z-10
      bg-black
      "
    >

      {
        team.members.map(
          (member,index)=>(
            <MemberRow
              key={member.name}
              member={member}
              reverse={
                index % 2 === 1
              }
            />
          )
        )
      }


    </section>
  );
}