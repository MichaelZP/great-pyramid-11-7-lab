import { describe, expect, it } from "vitest";
import { translations } from "./i18n";
import { tutorialCopy } from "./pyramid/tutorial";

// Strings moved out of inline `locale === "pl" ? … : …` ternaries must stay byte-identical.
describe("strings moved from components to i18n keys", () => {
  it("keeps the ModelRail copy", () => {
    expect(translations.pl.modelDisclaimer).toBe("Model matematyczny i ilustracja. Dopasowanie proporcji nie dowodzi intencji budowniczych. Historię i źródła znajdziesz przy pozycjach w panelu Stałe.");
    expect(translations.en.modelDisclaimer).toBe("Mathematical model and illustration. Matching ratios do not establish builders’ intent. Find history and sources beside each position in Constants.");
    expect(translations.pl.geogebraLink).toBe("Eksperymentuj w GeoGebra");
    expect(translations.en.geogebraLink).toBe("Experiment in GeoGebra");
  });
  it("keeps the HistoryPanel copy", () => {
    expect(translations.pl.historyTitle).toBe("Historia i źródła");
    expect(translations.en.historyTitle).toBe("History and sources");
    expect([translations.pl.historyConcept, translations.pl.historyName, translations.pl.historySymbol]).toEqual(["Pojęcie", "Nazwa", "Symbol"]);
    expect([translations.en.historyConcept, translations.en.historyName, translations.en.historySymbol]).toEqual(["Concept", "Name", "Symbol"]);
    expect(translations.pl.historyEvidenceText).toBe("Źródła historii pojęcia, nazwy i zapisu nie są świadectwem intencji budowniczych. Nie ustalono takiego świadectwa dla tego porównania.");
    expect(translations.en.bibliographyNote).toBe("Each source’s scope is given below. Notes are local; full texts open over the internet.");
  });
  it("keeps the tutorial auto-play label", () => {
    expect(tutorialCopy("pl").autoPlay).toBe("Automat");
    expect(tutorialCopy("en").autoPlay).toBe("Auto-play");
  });
});
