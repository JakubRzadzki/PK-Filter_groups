# PK Group Filter

[English Version Below]

## 🇵🇱 Wersja Polska

Rozszerzenie do przeglądarki Chrome, które filtruje plan zajęć na stronie Politechniki Krakowskiej (oparty na FullCalendar). Pozwala ukryć zajęcia innych grup, pozostawiając tylko te, do których należysz. Działa również wewnątrz ramek (iframe).

### Jak uruchomić (Instalacja)

Ponieważ rozszerzenie nie jest w sklepie Chrome Web Store, musisz zainstalować je ręcznie w trybie dewelopera:

1. **Pobierz pliki:** Upewnij się, że masz wszystkie 4 pliki (`manifest.json`, `content.js`, `popup.html`, `popup.js`) w jednym folderze na swoim komputerze (np. w folderze o nazwie `pk-filter`).
2. Otwórz przeglądarkę Google Chrome.
3. W pasku adresu wpisz: `chrome://extensions` i naciśnij Enter.
4. W prawym górnym rogu włącz przełącznik **"Tryb dewelopera" (Developer mode)**.
5. Pojawi się nowy pasek menu. Kliknij przycisk **"Załaduj rozpakowane" (Load unpacked)**.
6. Wybierz folder, w którym zapisałeś pliki rozszerzenia.
7. Rozszerzenie powinno pojawić się na liście i być aktywne.

### Jak zrobić, aby to działało (Instrukcja obsługi)

1. Wejdź na stronę z planem zajęć (domena: `eclipse.elektron.pk.edu.pl`).
2. Kliknij ikonę rozszerzenia na pasku przeglądarki (może być ukryta pod ikoną "puzzla").
3. W okienku, które się pojawi, wpisz numery swoich grup dla poszczególnych typów zajęć:
   * **C / Ć**: Ćwiczenia
   * **S**: Seminaria/Specjalizacje
   * **Lk / Lek**: Lektoraty
   * **P**: Projekty
   * **L**: Laboratoria
4. Kliknij przycisk **"FILTRUJ PLAN"**.
5. Plan na stronie powinien natychmiast ukryć zajęcia, które nie pasują do Twoich numerów grup.
6. Aby przywrócić widok wszystkich zajęć, kliknij **"POKAŻ WSZYSTKO"**.

---

## US English Version

A Chrome extension that filters the schedule on the Cracow University of Technology (PK) website (based on FullCalendar). It allows you to hide classes of other groups, keeping only the ones you attend. It also works inside iframes.

### How to Run (Installation)

Since this extension is not in the Chrome Web Store, you need to install it manually in developer mode:

1. **Download files:** Ensure you have all 4 files (`manifest.json`, `content.js`, `popup.html`, `popup.js`) inside a single folder on your computer (e.g., named `pk-filter`).
2. Open Google Chrome.
3. Type `chrome://extensions` in the address bar and press Enter.
4. In the top right corner, toggle on **"Developer mode"**.
5. A new menu bar will appear. Click the **"Load unpacked"** button.
6. Select the folder where you saved the extension files.
7. The extension should appear in the list and be active.

### How to Make It Work (Usage)

1. Go to the schedule website (domain: `eclipse.elektron.pk.edu.pl`).
2. Click the extension icon in the browser toolbar (it might be hidden under the "puzzle piece" icon).
3. In the popup, enter your group numbers for specific class types:
   * **C / Ć**: Exercises
   * **S**: Seminars
   * **Lk / Lek**: Language classes
   * **P**: Projects
   * **L**: Laboratories
4. Click the **"FILTRUJ PLAN" (FILTER SCHEDULE)** button.
5. The schedule on the page should immediately hide classes that do not match your group numbers.
6. To restore the view of all classes, click **"POKAŻ WSZYSTKO" (SHOW ALL)**.