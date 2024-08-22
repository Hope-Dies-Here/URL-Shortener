
const palettes = [
  {
    "--background-color": "#0f2a54cd",
    "--card-background": "#161b22",
    "--accent-color": "#223850",
    "--text-color": "#c9d1d9",
    "--text-secondary": "#e5e5e5",
    "--button-color": "#58a6ff",
    "--button-hover": "#3a8ccd"
  },
  {
    "--background-color": "#091910",
    "--card-background": "#0d1117",
    "--accent-color": "#22504188",
    "--text-color": "#e0f7fa",
    "--text-secondary": "#c3e8e4",
    "--button-color": "#1b5a48",
    "--button-hover": "#1aa87c"
  },
  {
    "--background-color": "#0f2a54cd",
    "--card-background": "#161b22",
    "--accent-color": "#50224d9d",
    "--text-color": "#c9d1d9",
    "--text-secondary": "#e5e5e5",
    "--button-color": "#ec638f",
    "--button-hover": "#d75176"
  },
  {
    "--background-color": "#190c09",
    "--card-background": "#181010",
    "--accent-color": "#50222268",
    "--text-color": "#e0e0e0",
    "--text-secondary": "#c3c3c3",
    "--button-color": "#e74c3c",
    "--button-hover": "#d94437"
  }
];
let currentPalette = 0;

function changePalette() {
  currentPalette = (currentPalette + 1) % palettes.length;
  const newPalette = palettes[currentPalette];

  for (const [key, value] of Object.entries(newPalette)) {
    document.documentElement.style.setProperty(key, value);
  }
}

//setInterval(changePalette, 5000);
