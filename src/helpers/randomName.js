export default function randomName() {
  const ime = [
    "Maria",
    "Pamela",
    "Vedrana",
    "Anne",
    "Dora",
    "Missy",
    "Zoe",
    "Tea",
    "Petra",
    "Gabi",
    "Iva",
    "Barbara",
    "Veronica",
    "Ivana",
    "Vera",
    "Leonarda",
    "Patricia",
    "Estee",
    "Amelia",
    "Kenza",
    "Avril",
    "Reese",
    "Emilia",
    "Alessia",
    "Katarina",
    "Cath",
    "Nikki",
    "Nicole",
    "Hana",
    "Lena",
    "Simona",
    "Martina",
    "Sanja",
    "Vesna",
    "Daniela",
    "Ela",
    "Elizabeta",
    "Marina",
    "Irena",
    "Tanja",
    "Vanja",
    "Lea",
    "Mila",
    "Tena",
    "Andriana",
    "Jelena",
    "Jelka",
    "Mara",
    "Sara",
    "Jana",
  ];
  const opis = [
    "rose",
    "lilly",
    "tulip",
    "hyacinth",
    "peruvian lily",
    "chrysanthenum",
    "deep rose",
    "daisy",
    "marigold",
    "violet",
    "alpenrose",
    "amaryllis",
    "lotus",
    "wisteria",
    "hyssop",
    "aztec lilly",
    "iris",
    "beeblossom",
    "begonia",
    "lantana",
    "bearberry",
    "lechenaultia",
    "bluestar",
    "bluet",
    "plume",
    "bussy lizzie",
    "poppy",
    "calla",
    "camelia",
    "sorrel",
    "candytuft",
    "leadwort",
    "climber",
    "carnation",
    "catmint",
    "clematis",
    "cliffbush",
    "rose",
    "cockcomb",
    "primrose",
    "gorse",
    "lilac",
    "mallow",
    "orchid",
    "varvain",
    "zinnia",
    "conflower",
    "bells",
    "wildflower",
    "cranesbill",
    "mahonia",
    "mazus",
    "phlox",
    "cyclamen",
    "daffodil",
    "dahlias",
    "daylily",
    "hyacinth",
    "lavander",
    "feverfew",
    "fiddleneck",
    "fuchsisas",
    "peony",
    "daisy",
  ];

  const userName = ime[Math.floor(Math.random() * ime.length)];
  const userSurname = opis[Math.floor(Math.random() * opis.length)];
  return `${userName} ${userSurname}`;
}
