// Card scura della landing: in hover sale e il cerchio dell'icona si riempie di sage
export const FeatureCard = ({ icon, title, text }) => {
  const Icon = icon;

  return (
    <article className="kick-reveal group flex min-h-[280px] flex-col justify-between gap-10 rounded-lg bg-forest p-7 text-cream transition-[translate,box-shadow] duration-350 ease-in-out hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(18,32,32,.16)] motion-reduce:transition-none">
      <span className="flex size-12 items-center justify-center rounded-full border border-cream/18 text-sage transition-colors duration-350 group-hover:border-sage group-hover:bg-sage group-hover:text-ink">
        <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-serif text-[26px] leading-[1.4]">{title}</h3>
        <p className="mt-2.5 text-base leading-[1.55] text-cream/76">{text}</p>
      </div>
    </article>
  );
};
