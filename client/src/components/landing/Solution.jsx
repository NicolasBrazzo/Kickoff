import { FeatureCard } from "./FeatureCard";
import { Eyebrow } from "./Eyebrow";
import { solution } from "./content";
import { grid, h2, lead, section, wrap } from "./layout";

export const Solution = () => (
  <section id="vantaggi" className={`${section} scroll-mt-28 pt-0 md:pt-0`}>
    <div className={wrap}>
      <div className={grid}>
        <div className="kick-reveal col-span-full md:col-span-6">
          <Eyebrow>{solution.eyebrow}</Eyebrow>
          <h2 className={h2}>{solution.title}</h2>
        </div>
        <div className="kick-reveal col-span-full self-end md:col-start-8 md:col-end-13">
          <p className={lead}>{solution.lead}</p>
        </div>

        <div className="col-span-full grid grid-cols-1 gap-6 md:max-[1079px]:grid-cols-2 min-[1080px]:grid-cols-4">
          {solution.features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </div>
  </section>
);
