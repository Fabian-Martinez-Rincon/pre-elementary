"use client";

import { useState } from "react";
import { Reveal } from "./_components/reveal";
import { ResumenSection } from "./resumen/section";
import { RepasarSection } from "./repasar/section";
import { PracticarSection } from "./practicar/section";
import { GramaticaSection } from "./gramatica/section";
import { TarjetasSection } from "./tarjetas/section";
import { ClasesSection } from "./clases/section";
import { ProgresoSection } from "./progreso/section";

function scrollToTarjetas() {
  document.getElementById("tarjetas")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HomePage() {
  const [lessonFilter, setLessonFilter] = useState("");

  return (
    <>
      <section id="resumen" className="scroll-mt-24 pt-6 pb-10">
        <Reveal>
          <ResumenSection />
        </Reveal>
      </section>

      <section id="repasar" className="scroll-mt-24 border-t border-(--line) py-10">
        <Reveal>
          <RepasarSection />
        </Reveal>
      </section>

      <section id="practicar" className="scroll-mt-24 border-t border-(--line) py-10">
        <Reveal>
          <PracticarSection />
        </Reveal>
      </section>

      <section id="gramatica" className="scroll-mt-24 border-t border-(--line) py-10">
        <Reveal>
          <GramaticaSection />
        </Reveal>
      </section>

      <section id="tarjetas" className="scroll-mt-24 border-t border-(--line) py-10">
        <Reveal>
          <TarjetasSection lessonFilter={lessonFilter} onLessonFilterChange={setLessonFilter} />
        </Reveal>
      </section>

      <section id="clases" className="scroll-mt-24 border-t border-(--line) py-10">
        <Reveal>
          <ClasesSection
            onSelectLesson={(lesson) => {
              setLessonFilter(lesson);
              scrollToTarjetas();
            }}
          />
        </Reveal>
      </section>

      <section id="progreso" className="scroll-mt-24 border-t border-(--line) py-10">
        <Reveal>
          <ProgresoSection />
        </Reveal>
      </section>
    </>
  );
}
