import Image from "next/image";
import Reveal from "@/components/Reveal";
import shop from "@/content/shop";

export default function TeamGrid() {
  return (
    <ul className="grid gap-8 sm:grid-cols-3">
      {shop.team.map((person, i) => (
        <li key={person.name}>
          <Reveal delay={i * 0.08}>
            {/* Same crop, same background, same framing for all three */}
            <figure className="group">
              <div className="relative aspect-4/5 overflow-hidden rounded-md bg-sunken">
                <Image
                  src={`/images/${person.image}`}
                  alt={`${person.name}, ${person.role}`}
                  fill
                  quality={75}
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[var(--ac-dur-slower)] ease-[var(--ac-ease-out)] group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="mt-5">
                <h3 className="text-xl text-espresso">{person.name}</h3>
                <p className="mt-1 eyebrow">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{person.bio}</p>
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
