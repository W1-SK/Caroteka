interface LogPageProps {
  added: string[];
  fixed: string[];
  changed: string[];
  removed: string[];
  version: string;
  date: string;
  color: "primary" | "secondary" | "tertiary";
}

const colorClasses = {
  primary: "bg-primary-100",
  secondary: "bg-secondary-100",
  tertiary: "bg-tertiary-100",
};

function LogBox({
  added,
  fixed,
  changed,
  removed,
  version,
  date,
  color,
}: LogPageProps) {
  return (
    <article
      className={`flex flex-col gap-4 ${colorClasses[color]} w-4/5 sm:w-3/5 md:2/5 p-8 rounded-xl`}
    >
      <section className="flex flex-col">
        <h2 className="text-h2 font-title font-semibold">Čarotéka {version}</h2>
        <p className="text-m">{date}</p>
      </section>

      {added.length > 0 && (
        <section className="flex flex-col">
          <h3 className="text-h5 font-title font-semibold">Přidáno</h3>
          <ul className="list-disc pl-8">
            {added.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {fixed.length > 0 && (
        <section className="flex flex-col">
          <h3 className="text-h5 font-title font-semibold">Opraveno</h3>
          <ul className="list-disc pl-8">
            {fixed.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {changed.length > 0 && (
        <section className="flex flex-col">
          <h3 className="text-h5 font-title font-semibold">Přetvořeno</h3>
          <ul className="list-disc pl-8">
            {changed.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {removed.length > 0 && (
        <section className="flex flex-col">
          <h3 className="text-h5 font-title font-semibold">Vymazáno</h3>
          <ul className="list-disc pl-8">
            {removed.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

export default LogBox;
