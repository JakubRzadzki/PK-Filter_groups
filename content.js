let userConfig = null;

function cleanSchedule(config) {
    const events = document.querySelectorAll('.fc-timegrid-event-harness');

    if (events.length === 0) return;

    console.log("Znaleziono plan! Filtruję...");
    let hidden = 0;

    events.forEach(el => {
        el.style.display = '';

        // Normalizujemy tekst: polskie znaki, przecinki, nowe linie -> spacje
        // Otaczamy spacjami żeby ułatwić dopasowanie na brzegach
        let text = " " + el.innerText
            .replace(/[ĆĈ]/g, 'C')
            .replace(/[ćĉ]/g, 'c')
            .replace(/,/g, ' ')
            .replace(/\n/g, ' ') + " ";

        let hide = false;

        // Sprawdza czy w tekście jest inna grupa niż myGroup z danym prefixem.
        // Kolejność sprawdzania ma znaczenie: 'Lek' i 'Lk' PRZED 'L',
        // żeby dłuższe prefiksy były sprawdzane jako pierwsze i nie było
        // fałszywych dopasowań (np. "Lk3" nie pasuje do wzorca dla "L").
        const hasConflict = (prefix, myGroup) => {
            if (!myGroup) return false; // brak konfiguracji = ignoruj

            // Wzorzec: poprzedni znak to nie litera, potem prefix, potem cyfra(y),
            // potem znak który nie jest cyfrą.
            // [^a-zA-Z] zapewnia że "CoLek3" nie wywoła fałszywego "L" dopasowania.
            const pattern = new RegExp(`[^a-zA-Z]${prefix}(\\d+)[^0-9]`, 'i');
            const match = text.match(pattern);

            if (match) {
                const foundNum = match[1];
                if (foundNum != myGroup) {
                    return true; // inna grupa -> ukryj
                }
            }
            return false;
        };

        // WAŻNA kolejność: najpierw dłuższe prefiksy, potem krótsze
        // Dzięki temu "Lk" i "Lek" są sprawdzane zanim "L"
        if (hasConflict('Lek', config.Lek)) hide = true;
        if (hasConflict('Lk',  config.Lk))  hide = true;
        if (hasConflict('L',   config.L))    hide = true;
        if (hasConflict('C',   config.C))    hide = true;
        if (hasConflict('S',   config.S))    hide = true;
        if (hasConflict('P',   config.P))    hide = true;

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
    }
    if (request.action === "reset") {
        document.querySelectorAll('.fc-timegrid-event-harness')
            .forEach(e => e.style.display = '');
        userConfig = null;
    }
});

// Reaguje na dynamiczne załadowanie kalendarza (FullCalendar renderuje asynchronicznie)
const observer = new MutationObserver(() => {
    if (userConfig) {
        cleanSchedule(userConfig);
    }
});
observer.observe(document.body, { childList: true, subtree: true });
