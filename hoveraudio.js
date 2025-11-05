document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".hover-sound");

  if (!items.length) {
    console.warn("Geen elementen met .hover-sound gevonden.");
    return;
  }

  // Cache met kant-en-klare Audio() objecten per src
  const cache = new Map();
  let current = null; // het Audio() dat nu speelt
  let currentEl = null; // element waar we overheen zitten

  function getAudio(src) {
    if (!cache.has(src)) {
      const a = new Audio(src);
      a.preload = "auto";
      a.addEventListener("error", () => {
        console.error("Audio kan niet geladen/gedecodeerd worden:", src);
      });
      cache.set(src, a);
    }
    return cache.get(src);
  }

  items.forEach((el) => {
    const src = el.getAttribute("data-audio");
    if (!src) return;

    // optioneel: alvast pre-loaden
    getAudio(src);

    // kleine delay voorkomt enter->leave flikkers
    let playTimer = null;

    el.addEventListener("pointerenter", () => {
      clearTimeout(playTimer);
      playTimer = setTimeout(async () => {
        const a = getAudio(src);

        // stop vorige clip als die speelde
        if (current && current !== a) {
          current.pause();
          current.currentTime = 0;
        }

        current = a;
        currentEl = el;
        a.currentTime = 0;
        try {
          await a.play();
        } catch (e) {
          // 'AbortError' negeren: gebeurt als je snel weg hovert
          if (e.name !== "AbortError") console.error("Kon audio niet afspelen:", e);
        }
      }, 80); // 80–150ms is vaak genoeg
    });

    el.addEventListener("pointerleave", () => {
      clearTimeout(playTimer);
      if (current && currentEl === el) {
        current.pause();
        current.currentTime = 0;
        current = null;
        currentEl = null;
      }
    });
  });
});
