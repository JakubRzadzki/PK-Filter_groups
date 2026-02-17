// Konfiguracja domyślna (zostanie nadpisana przez popup)
let userConfig = null;

// Główna funkcja czyszcząca
function cleanSchedule(config) {
    // Szukamy kafelków (to klasa FullCalendar używana na PK)
    const events = document.querySelectorAll('.fc-timegrid-event-harness');
    
    if (events.length === 0) return; // To nie jest ramka z planem, wychodzimy

    console.log("Znaleziono plan! Filtruję...");
    let hidden = 0;

    events.forEach(el => {
        // Resetujemy widoczność
        el.style.display = '';

        // Pobieramy tekst i czyścimy go ze śmieci (zamiana Ć na C, spacje)
        // Dodajemy spacje na początku i końcu, żeby łatwiej szukać
        let text = " " + el.innerText.replace(/Ć/g, 'C').replace(/ć/g, 'c').replace(/,/g, ' ').replace(/\n/g, ' ') + " ";
        
        let hide = false;

        // Funkcja sprawdzająca konflikt
        // prefix: np. "C", myGroup: np. "2"
        // Jeśli w tekście znajdzie C5, a my chcemy C2 -> UKRYJ
        const hasConflict = (prefix, myGroup) => {
            // Regex szuka: (coś co nie jest literą) + PREFIX + (CYFRA) + (coś co nie jest cyfrą)
            // Np. dla L: szuka " L5 ", ale ignoruje " Lek5 "
            
            let pattern;
            if (prefix === 'L') {
                // Dla L musimy uważać na Lk i Lek (negative lookahead)
                // Szukamy L, po którym jest cyfra, ale przed L nie ma litery
                pattern = new RegExp(`[^a-zA-Z]L(\\d+)[^0-9]`, 'i');
            } else {
                pattern = new RegExp(`[^a-zA-Z]` + prefix + `(\\d+)[^0-9]`, 'i');
            }

            const match = text.match(pattern);
            if (match) {
                const foundNum = match[1];
                if (foundNum != myGroup) {
                    // Znaleziono grupę tego typu, ale numer się nie zgadza
                    return true; 
                }
            }
            return false;
        };

        if (hasConflict('C', config.C)) hide = true;
        if (hasConflict('S', config.S)) hide = true;
        if (hasConflict('Lk', config.Lk)) hide = true;
        if (hasConflict('P', config.P)) hide = true;
        if (hasConflict('Lek', config.Lek)) hide = true;
        if (hasConflict('L', config.L)) hide = true;

        if (hide) {
            el.style.display = 'none';
            hidden++;
        }
    });
    
    console.log(`Ukryto ${hidden} zajęć.`);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "filter") {
        userConfig = request.config;
        cleanSchedule(userConfig);
        
        if (document.querySelectorAll('.fc-timegrid-event-harness').length > 0) {
        }
    }
    if (request.action === "reset") {
        document.querySelectorAll('.fc-timegrid-event-harness').forEach(e => e.style.display = '');
    }
});

const observer = new MutationObserver(() => {
    if (userConfig) {
        cleanSchedule(userConfig);
    }
});
observer.observe(document.body, { childList: true, subtree: true });