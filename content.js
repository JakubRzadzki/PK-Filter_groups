let userConfig = null;

function cleanSchedule(config) {
    const events = document.querySelectorAll('.fc-timegrid-event-harness');

    if (events.length === 0) return;

    console.log("Schedule found! Filtering...");
    let hidden = 0;

    events.forEach(el => {
        el.style.display = '';

        // Normalize text: polish characters, commas, new lines -> spaces
        // Wrap with spaces to make edge matching easier
        let text = " " + el.innerText
            .replace(/[ĆĈ]/g, 'C')
            .replace(/[ćĉ]/g, 'c')
            .replace(/,/g, ' ')
            .replace(/\n/g, ' ') + " ";

        let hide = false;

        // Checks if there is a different group than myGroup with the given prefix in the text.
        // Checking order matters: 'Lek' and 'Lk' BEFORE 'L',
        // so that longer prefixes are checked first to avoid
        // false matches (e.g., "Lk3" matching the pattern for "L").
        const hasConflict = (prefix, myGroup) => {
            if (!myGroup) return false; // no configuration = ignore

            // Pattern: previous sign is not a letter, then prefix, then digit(s),
            // then a non-digit character.
            // [^a-zA-Z] ensures that "CoLek3" doesn't trigger a false "L" match.
            const pattern = new RegExp(`[^a-zA-Z]${prefix}(\\d+)[^0-9]`, 'i');
            const match = text.match(pattern);

            if (match) {
                const foundNum = match[1];
                if (foundNum != myGroup) {
                    return true; // different group -> hide
                }
            }
            return false;
        };

        // IMPORTANT order: longer prefixes first, then shorter ones
        // This ensures "Lk" and "Lek" are checked before "L"
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

    console.log(`Hidden ${hidden} classes.`);
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

// Reacts to dynamic calendar loading (FullCalendar renders asynchronously)
const observer = new MutationObserver(() => {
    if (userConfig) {
        cleanSchedule(userConfig);
    }
});
observer.observe(document.body, { childList: true, subtree: true });
