export interface ScenarioStep {
  id: string;
  prompt: string; // pregunta/pie en inglés
  promptTranslation: string;
  hint: string; // patrón de respuesta sugerido
  example: string; // respuesta modelo concreta
}

export interface ScenarioImage {
  src: string;
  alt: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  lesson: string;
  steps: ScenarioStep[];
  images?: ScenarioImage[];
}

// Contenido real de Lesson 1 - Let's Warm Up (ver /clases), armado como una
// mini conversación guiada en vez de tarjetas sueltas.
export const SCENARIOS: Scenario[] = [
  {
    id: "presentarte",
    title: "Presentarte",
    description: "Un simulacro de conversación para practicar cómo presentarte en inglés: saludo, nombre, de dónde sos, edad y trabajo.",
    lesson: "Lesson 1 - Let's Warm Up",
    images: [
      { src: "/practicar/presentarte-intro.png", alt: "Slide de la clase: Introducing Yourself — preguntas de nombre y cómo deletrear el apellido" },
      { src: "/practicar/presentarte-practice1.png", alt: "Slide de la clase: Practice 1 — diálogo modelo de presentación" },
      { src: "/practicar/presentarte-conversation2.png", alt: "Slide de la clase: Conversation 2 — diálogo modelo con edad y trabajo" },
    ],
    steps: [
      {
        id: "saludo",
        prompt: "Hi! How are you?",
        promptTranslation: "¡Hola! ¿Cómo estás?",
        hint: "Fine, thanks. And you? / I'm great. / I'm good.",
        example: "I'm great, thanks! And you?",
      },
      {
        id: "nombre",
        prompt: "What's your name?",
        promptTranslation: "¿Cómo te llamás?",
        hint: "My name is... / I'm...",
        example: "My name is Fabián.",
      },
      {
        id: "deletrear",
        prompt: "Could you spell your last name, please?",
        promptTranslation: "¿Podrías deletrear tu apellido, por favor?",
        hint: "Deletrealo letra por letra, ej: S-M-I-T-H.",
        example: "Sure, it's M-A-R-T-I-N-E-Z.",
      },
      {
        id: "origen",
        prompt: "Where are you from?",
        promptTranslation: "¿De dónde sos?",
        hint: "I'm from... / I'm [nacionalidad].",
        example: "I'm from Argentina. I'm Argentinian.",
      },
      {
        id: "edad",
        prompt: "How old are you?",
        promptTranslation: "¿Cuántos años tenés?",
        hint: "I'm ... years old.",
        example: "I'm 26 years old.",
      },
      {
        id: "trabajo",
        prompt: "What's your job?",
        promptTranslation: "¿A qué te dedicás?",
        hint: "I'm a/an...",
        example: "I'm a teacher.",
      },
      {
        id: "cierre",
        prompt: "Nice to meet you!",
        promptTranslation: "¡Mucho gusto!",
        hint: "Nice to meet you too!",
        example: "Nice to meet you too!",
      },
    ],
  },
  {
    id: "restaurante",
    title: "En el restaurante",
    description: "Simulacro completo de un pedido en un restaurante: reservar mesa, pedir comida y bebida, postre, la cuenta y despedirte.",
    lesson: "Lesson 10 - Review",
    steps: [
      {
        id: "llegada",
        prompt: "Good afternoon! Can I help you?",
        promptTranslation: "¡Buenas tardes! ¿En qué puedo ayudarte?",
        hint: "Can I book a table for...? / Do you have a table for...?",
        example: "Can I book a table for one, please?",
      },
      {
        id: "menu",
        prompt: "Yes. Come with me… Here you are.",
        promptTranslation: "Sí. Vení conmigo... Acá tenés.",
        hint: "Thanks. Can I have...?",
        example: "Thanks. Can I have the menu?",
      },
      {
        id: "pedido",
        prompt: "The menu is on the table. Would you like anything to drink?",
        promptTranslation: "El menú está en la mesa. ¿Querés algo para tomar?",
        hint: "I want... / A ..., please.",
        example: "I want roast beef with mashed potatoes. A coke, please.",
      },
      {
        id: "postre",
        prompt: "Can I bring you anything else?",
        promptTranslation: "¿Te traigo algo más?",
        hint: "Yes, I want a portion of...",
        example: "Yes, I want a portion of apple pie.",
      },
      {
        id: "cuenta",
        prompt: "Anything else?",
        promptTranslation: "¿Algo más?",
        hint: "No, thanks. Could I have the bill, please?",
        example: "No, thanks. Could I have the bill, please?",
      },
      {
        id: "despedida",
        prompt: "Here you are. Have a nice day.",
        promptTranslation: "Acá tenés. Que tengas un buen día.",
        hint: "Thanks. You can keep the change. / Have a nice day too.",
        example: "Thanks. You can keep the change. Have a nice day.",
      },
    ],
  },
];
