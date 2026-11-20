const e = (m, f, def) => ({ m, f, def });
const BANK = [
  { letter: "A", bank: [e("Arzt", "Ärztin", "Diese Person untersucht kranke Menschen in einer Praxis."), e("Apotheker", "Apothekerin", "Diese Person verkauft Medikamente in der Apotheke."), e("Architekt", "Architektin", "Diese Person plant und zeichnet Häuser.")] },
  { letter: "B", bank: [e("Bäcker", "Bäckerin", "Diese Person backt jeden Morgen Brot und Brötchen."), e("Busfahrer", "Busfahrerin", "Diese Person fährt einen Bus durch die Stadt.")] },
  { letter: "C", bank: [e("Chef", "Chefin", "Diese Person leitet eine Firma oder ein Team."), e("Chemiker", "Chemikerin", "Diese Person arbeitet im Labor mit Stoffen und Reaktionen.")] },
  { letter: "D", bank: [e("Dolmetscher", "Dolmetscherin", "Diese Person übersetzt mündlich von einer Sprache in eine andere."), e("Designer", "Designerin", "Diese Person entwirft Kleidung, Möbel oder Grafiken.")] },
  { letter: "E", bank: [e("Elektriker", "Elektrikerin", "Diese Person repariert Lampen und Stromkabel."), e("Erzieher", "Erzieherin", "Diese Person arbeitet im Kindergarten und spielt mit Kindern.")] },
  { letter: "F", bank: [e("Friseur", "Friseurin", "Diese Person schneidet Haare."), e("Feuerwehrmann", "Feuerwehrfrau", "Diese Person löscht Feuer und hilft bei Unfällen."), e("Fotograf", "Fotografin", "Diese Person macht Fotos, zum Beispiel auf Hochzeiten.")] },
  { letter: "G", bank: [e("Gärtner", "Gärtnerin", "Diese Person arbeitet im Garten mit Blumen und Pflanzen."), e("Goldschmied", "Goldschmiedin", "Diese Person macht Ringe und Ketten aus Gold.")] },
  { letter: "H", bank: [e("Hausmeister", "Hausmeisterin", "Diese Person kümmert sich um ein großes Haus oder eine Schule und repariert kleine Dinge."), e("Handwerker", "Handwerkerin", "Diese Person arbeitet mit den Händen, zum Beispiel auf der Baustelle.")] },
  { letter: "I", bank: [e("Ingenieur", "Ingenieurin", "Diese Person konstruiert Maschinen, Brücken oder Autos."), e("Informatiker", "Informatikerin", "Diese Person arbeitet mit Computern und schreibt Programme.")] },
  { letter: "J", bank: [e("Journalist", "Journalistin", "Diese Person schreibt Artikel für die Zeitung."), e("Jurist", "Juristin", "Diese Person hat Jura studiert und kennt die Gesetze.")] },
  { letter: "K", bank: [e("Koch", "Köchin", "Diese Person kocht im Restaurant."), e("Kellner", "Kellnerin", "Diese Person bringt im Restaurant das Essen an den Tisch."), e("Krankenpfleger", "Krankenpflegerin", "Diese Person arbeitet im Krankenhaus und hilft dem Arzt.")] },
  { letter: "L", bank: [e("Lehrer", "Lehrerin", "Diese Person unterrichtet Schüler in der Schule."), e("Lokführer", "Lokführerin", "Diese Person fährt einen Zug.")] },
  { letter: "M", bank: [e("Mechaniker", "Mechanikerin", "Diese Person repariert Autos in der Werkstatt."), e("Maler", "Malerin", "Diese Person streicht Wände in einer Wohnung."), e("Metzger", "Metzgerin", "Diese Person verkauft Fleisch und Wurst.")] },
  { letter: "N", bank: [e("Nachrichtensprecher", "Nachrichtensprecherin", "Diese Person liest im Fernsehen die Nachrichten vor."), e("Notarzt", "Notärztin", "Diese Person kommt mit dem Krankenwagen, wenn es einen Notfall gibt.")] },
  { letter: "O", bank: [e("Optiker", "Optikerin", "Diese Person verkauft Brillen und testet die Augen."), e("Opernsänger", "Opernsängerin", "Diese Person singt in der Oper.")] },
  { letter: "P", bank: [e("Polizist", "Polizistin", "Diese Person sorgt für Sicherheit und kontrolliert den Verkehr."), e("Pilot", "Pilotin", "Diese Person fliegt ein Flugzeug."), e("Postbote", "Postbotin", "Diese Person bringt Briefe und Pakete.")] },
  { letter: "Q", bank: [e("Quizmaster", "Quizmasterin", "Diese Person stellt in einer Fernsehshow Fragen."), e("Qualitätsprüfer", "Qualitätsprüferin", "Diese Person kontrolliert in der Fabrik, ob die Produkte gut sind.")] },
  { letter: "R", bank: [e("Rechtsanwalt", "Rechtsanwältin", "Diese Person hilft Menschen vor Gericht."), e("Reiseführer", "Reiseführerin", "Diese Person zeigt Touristen die Stadt.")] },
  { letter: "S", bank: [e("Sekretär", "Sekretärin", "Diese Person arbeitet im Büro, schreibt E-Mails und macht Termine."), e("Schauspieler", "Schauspielerin", "Diese Person spielt im Theater oder im Film.")] },
  { letter: "T", bank: [e("Tierarzt", "Tierärztin", "Diese Person hilft kranken Hunden und Katzen."), e("Tischler", "Tischlerin", "Diese Person macht Tische und Schränke aus Holz.")] },
  { letter: "U", bank: [e("Uhrmacher", "Uhrmacherin", "Diese Person repariert Uhren."), e("Übersetzer", "Übersetzerin", "Diese Person übersetzt Bücher und Texte in eine andere Sprache.")] },
  { letter: "V", bank: [e("Verkäufer", "Verkäuferin", "Diese Person arbeitet im Geschäft und hilft den Kunden."), e("Vertreter", "Vertreterin", "Diese Person reist viel und verkauft Produkte für eine Firma.")] },
  { letter: "W", bank: [e("Winzer", "Winzerin", "Diese Person macht Wein."), e("Wissenschaftler", "Wissenschaftlerin", "Diese Person forscht an der Universität.")] },
  { letter: "X", contains: true, bank: [e("Taxifahrer", "Taxifahrerin", "Diese Person fährt Gäste mit dem Taxi zum Bahnhof."), e("Boxer", "Boxerin", "Diese Person kämpft im Ring mit Handschuhen.")] },
  { letter: "Y", contains: true, bank: [e("Physiotherapeut", "Physiotherapeutin", "Diese Person hilft bei Rückenschmerzen mit Übungen und Massagen."), e("Psychologe", "Psychologin", "Diese Person hilft Menschen mit Problemen im Kopf und in der Seele.")] },
  { letter: "Z", bank: [e("Zahnarzt", "Zahnärztin", "Diese Person kontrolliert und repariert Zähne."), e("Zugbegleiter", "Zugbegleiterin", "Diese Person kontrolliert im Zug die Fahrkarten.")] }
];
function normalize(s) {
  return s.toLowerCase().trim().replace(/^(der|die|das|ein|eine)\s+/, "").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z]/g, "");
}
function isCorrect(input, entry) {
  const n = normalize(input);
  return n.length > 0 && (n === normalize(entry.m) || n === normalize(entry.f));
}
const KEY = "berufe-rosco-scores";
function loadScores() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function saveScore(r) {
  const all = [...loadScores(), r].sort((a, b) => b.score - a.score || a.seconds - b.seconds).slice(0, 10);
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
function clearScores() {
  localStorage.removeItem(KEY);
}

window.Berufe = { BANK, normalize, isCorrect, loadScores, saveScore, clearScores };
