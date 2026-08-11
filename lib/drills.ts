export interface DrillQuestion {
  id: string;
  prompt: string; // con un hueco marcado como ___
  translation: string;
  options: string[];
  answer: string;
}

export interface DrillImage {
  src: string;
  alt: string;
}

export interface Drill {
  id: string;
  title: string;
  description: string;
  lesson: string;
  questions: DrillQuestion[];
  image?: DrillImage;
}

// Contenido real de Lesson 2 - Introductions: el patrón "Where...from?" con
// el verbo to be conjugado según el pronombre (ver /clases).
export const DRILLS: Drill[] = [
  {
    id: "what-do-you-like-to-do",
    title: "What do you like to do?",
    description: "Practicá do / does en la pregunta y like / likes / don't like / doesn't like en la respuesta.",
    lesson: "Lesson 2 - Introductions",
    image: { src: "/gramatica/what-do-you-like-to-do.png", alt: "Slide de gramática: What do you like to do? — árbol de preguntas y respuestas con do/does, like/likes" },
    questions: [
      { id: "q1", prompt: "What ___ you like to do?", translation: "¿Qué te gusta hacer (a vos)?", options: ["do", "does"], answer: "do" },
      { id: "q2", prompt: "What ___ they like to do?", translation: "¿Qué les gusta hacer (a ellos)?", options: ["do", "does"], answer: "do" },
      { id: "q3", prompt: "What ___ he like to do?", translation: "¿Qué le gusta hacer (a él)?", options: ["do", "does"], answer: "does" },
      { id: "q4", prompt: "What ___ she like to do?", translation: "¿Qué le gusta hacer (a ella)?", options: ["do", "does"], answer: "does" },
      { id: "a1", prompt: "I ___ to cook.", translation: "Me gusta cocinar.", options: ["like", "likes", "don't like", "doesn't like"], answer: "like" },
      { id: "a2", prompt: "We ___ to travel.", translation: "Nos gusta viajar.", options: ["like", "likes", "don't like", "doesn't like"], answer: "like" },
      { id: "a3", prompt: "They ___ to sing.", translation: "Les gusta cantar.", options: ["like", "likes", "don't like", "doesn't like"], answer: "like" },
      { id: "a4", prompt: "He ___ to watch TV.", translation: "A él le gusta mirar TV.", options: ["like", "likes", "don't like", "doesn't like"], answer: "likes" },
      { id: "a5", prompt: "She ___ to sew.", translation: "A ella no le gusta coser.", options: ["like", "likes", "don't like", "doesn't like"], answer: "doesn't like" },
      { id: "a6", prompt: "She ___ swimming.", translation: "A ella no le gusta nadar.", options: ["like", "likes", "don't like", "doesn't like"], answer: "doesn't like" },
    ],
  },
  {
    id: "what-do-you-like-doing",
    title: "What do you like doing?",
    description: "Practicá do / does en la pregunta y like / likes / don't like / doesn't like + verbo-ing en la respuesta.",
    lesson: "Lesson 3",
    image: { src: "/gramatica/what-do-you-like-doing.png", alt: "Slide de gramática: What do you like doing? — árbol de preguntas y respuestas con do/does, like/likes + verbo-ing" },
    questions: [
      { id: "q1", prompt: "What ___ you like doing?", translation: "¿Qué te gusta hacer (a vos)?", options: ["do", "does"], answer: "do" },
      { id: "q2", prompt: "What ___ they like doing?", translation: "¿Qué les gusta hacer (a ellos)?", options: ["do", "does"], answer: "do" },
      { id: "q3", prompt: "What ___ he like doing?", translation: "¿Qué le gusta hacer (a él)?", options: ["do", "does"], answer: "does" },
      { id: "q4", prompt: "What ___ she like doing?", translation: "¿Qué le gusta hacer (a ella)?", options: ["do", "does"], answer: "does" },
      { id: "a1", prompt: "I ___ reading.", translation: "Me gusta leer.", options: ["like", "likes", "don't like", "doesn't like"], answer: "like" },
      { id: "a2", prompt: "We ___ writing.", translation: "Nos gusta escribir.", options: ["like", "likes", "don't like", "doesn't like"], answer: "like" },
      { id: "a3", prompt: "They ___ dancing.", translation: "Les gusta bailar.", options: ["like", "likes", "don't like", "doesn't like"], answer: "like" },
      { id: "a4", prompt: "He ___ jogging.", translation: "A él le gusta trotar.", options: ["like", "likes", "don't like", "doesn't like"], answer: "likes" },
      { id: "a5", prompt: "She ___ swimming.", translation: "A ella no le gusta nadar.", options: ["like", "likes", "don't like", "doesn't like"], answer: "doesn't like" },
      { id: "a6", prompt: "They ___ painting.", translation: "No les gusta pintar.", options: ["like", "likes", "don't like", "doesn't like"], answer: "don't like" },
    ],
  },
  {
    id: "where-are-you-from",
    title: "Where are you from?",
    description: "Practicá el verbo to be (am / is / are) en preguntas y respuestas sobre de dónde es alguien.",
    lesson: "Lesson 2 - Introductions",
    image: { src: "/gramatica/where-are-you-from.png", alt: "Slide de gramática: Where are you from? — árbol de preguntas y respuestas con am/is/are" },
    questions: [
      { id: "q1", prompt: "Where ___ you from?", translation: "¿De dónde sos (vos)?", options: ["am", "is", "are"], answer: "are" },
      { id: "q2", prompt: "Where ___ they from?", translation: "¿De dónde son (ellos)?", options: ["am", "is", "are"], answer: "are" },
      { id: "q3", prompt: "Where ___ he from?", translation: "¿De dónde es (él)?", options: ["am", "is", "are"], answer: "is" },
      { id: "q4", prompt: "Where ___ she from?", translation: "¿De dónde es (ella)?", options: ["am", "is", "are"], answer: "is" },
      { id: "a1", prompt: "I ___ from Ghana.", translation: "Soy de Ghana.", options: ["am", "is", "are"], answer: "am" },
      { id: "a2", prompt: "We ___ from Japan.", translation: "Somos de Japón.", options: ["am", "is", "are"], answer: "are" },
      { id: "a3", prompt: "They ___ from Mexico.", translation: "Son de México.", options: ["am", "is", "are"], answer: "are" },
      { id: "a4", prompt: "He ___ from Chile.", translation: "Él es de Chile.", options: ["am", "is", "are"], answer: "is" },
      { id: "a5", prompt: "She ___ from Germany.", translation: "Ella es de Alemania.", options: ["am", "is", "are"], answer: "is" },
      { id: "a6", prompt: "They ___ from the United States.", translation: "Son de Estados Unidos.", options: ["am", "is", "are"], answer: "are" },
    ],
  },
];

export function getDrill(id: string): Drill | undefined {
  return DRILLS.find((d) => d.id === id);
}
