const knowledgeBase = [
  {
    keywords: ["ram", "mémoire", "mémoire vive"],
    answer: "La RAM est la mémoire vive de l'ordinateur. Elle garde temporairement les programmes et les données utilisés pendant que l'ordinateur est allumé."
  },
  {
    keywords: ["windows", "système", "système d'exploitation"],
    answer: "Windows est un système d'exploitation. Il permet d'utiliser l'ordinateur, de lancer les programmes et de gérer les fichiers."
  },
  {
    keywords: ["word", "traitement de texte", "document"],
    answer: "Microsoft Word est un logiciel de traitement de texte. Il sert à écrire, corriger et mettre en forme des documents."
  },
  {
    keywords: ["excel", "tableau", "calcul", "formule"],
    answer: "Microsoft Excel est un tableur. Il permet de créer des tableaux, faire des calculs et présenter des données avec des graphiques."
  },
  {
    keywords: ["ordinateur", "composants", "matériel", "hardware"],
    answer: "Un ordinateur comprend notamment l'unité centrale, l'écran, le clavier, la souris et parfois des périphériques comme l'imprimante."
  },
  {
    keywords: ["internet", "navigateur", "moteur de recherche", "web"],
    answer: "Internet est un réseau mondial. Un navigateur comme Chrome ou Edge permet de visiter des sites, tandis qu'un moteur de recherche aide à trouver des informations."
  }
];

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");

  setTimeout(() => {
    addMessage(getAnswer(text), "bot");
  }, 400);

  input.value = "";
}

function getAnswer(text) {
  const normalizedText = text.toLowerCase();

  for (const item of knowledgeBase) {
    if (item.keywords.some(keyword => normalizedText.includes(keyword))) {
      return item.answer;
    }
  }

  return "Je n'ai pas encore cette réponse. Essaie une question sur la RAM, Windows, Word, Excel, les composants de l'ordinateur ou Internet.";
}

function addMessage(text, type) {
  const box = document.getElementById("chatBox");
  const wrapper = document.createElement("div");
  const content = document.createElement("div");

  wrapper.classList.add("message", type);
  content.classList.add("message-content");
  content.textContent = text;

  wrapper.appendChild(content);
  box.appendChild(wrapper);
  box.scrollTop = box.scrollHeight;
}
