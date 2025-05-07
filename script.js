const choix = document.querySelector("#choix");
const champs = document.querySelector(".champ");
const submitBtn = document.querySelector("#calculer");
const results = document.querySelector(".resultats");
const error = document.querySelector(".erreur");

choix.addEventListener("change", () => {
  const figure = choix.value;
  champs.innerHTML = ""; // Réinitialise les champs

  if (figure === "cercle" || figure === "sphère" || figure === "cylindre") {
    champs.innerHTML += `<label for="rayon">Rayon :</label><input type="text" id="rayon" placeholder="Rayon en cm">`;
  }

  if (figure === "carré") {
    champs.innerHTML += `<label for="cote">Côté :</label><input type="text" id="cote" placeholder="Côté en cm">`;
  }

  if (figure === "rectangle") {
    champs.innerHTML += `
      <label for="longueur">Longueur :</label><input type="text" id="longueur" placeholder="Longueur en cm">
      <label for="largeur">Largeur :</label><input type="text" id="largeur" placeholder="Largeur en cm">
    `;
  }

  if (figure === "triangle" || figure === "pyramide" || figure === "cylindre") {
    champs.innerHTML += `
      <label for="hauteur">Hauteur :</label><input type="text" id="hauteur" placeholder="Hauteur en cm">
    `;
  }

  if (figure === "triangle" || figure === "pyramide") {
    champs.innerHTML += `<label for="base">Base :</label><input type="text" id="base" placeholder="Base en cm">`;
  }

  if (figure === "cube") {
    champs.innerHTML += `<label for="arete">Arête :</label><input type="text" id="arete" placeholder="Arête en cm">`;
  }

  results.classList.remove("visible");
  error.classList.remove("visible");
});

submitBtn.addEventListener("click", () => {
  const figure = choix.value;
  const inputs = document.querySelectorAll(".champ input");
  const valeurs = Array.from(inputs).map((input) => parseFloat(input.value));

  error.classList.remove("visible");
  results.classList.remove("visible");
  error.innerHTML = "";
  results.innerHTML = "";

  if (valeurs.some(val => isNaN(val) || val <= 0)) {
    error.innerHTML = "<p>Veuillez entrer des valeurs numériques valides et positives.</p>";
    error.classList.add("visible");
    return;
  }

  let res = "";

  switch (figure) {
    case "cercle":
      const rayon = valeurs[0];
      res = `Aire du cercle : ${(Math.PI * rayon * rayon).toFixed(2)} cm²`;
      break;

    case "carré":
      const cote = valeurs[0];
      res = `Aire du carré : ${(cote * cote).toFixed(2)} cm²`;
      break;

    case "rectangle":
      const [longueur, largeur] = valeurs;
      res = `Aire du rectangle : ${(longueur * largeur).toFixed(2)} cm²`;
      break;

    case "triangle":
      const [base, hauteur] = valeurs;
      res = `Aire du triangle : ${((base * hauteur) / 2).toFixed(2)} cm²`;
      break;

    case "cube":
      const arete = valeurs[0];
      const surfaceCube = 6 * arete * arete;
      const volumeCube = Math.pow(arete, 3);
      res = `Surface du cube : ${surfaceCube.toFixed(2)} cm²<br>Volume : ${volumeCube.toFixed(2)} cm³`;
      break;

    case "cylindre":
      const [rayonC, hauteurC] = valeurs;
      const aireBase = Math.PI * rayonC * rayonC;
      const surfaceCylindre = 2 * Math.PI * rayonC * (rayonC + hauteurC);
      const volumeCylindre = aireBase * hauteurC;
      res = `Surface du cylindre : ${surfaceCylindre.toFixed(2)} cm²<br>Volume : ${volumeCylindre.toFixed(2)} cm³`;
      break;

    case "pyramide":
      const [baseP, hauteurP] = valeurs;
      const volumeP = (baseP * hauteurP) / 3;
      res = `Volume de la pyramide : ${volumeP.toFixed(2)} cm³`;
      break;

    case "sphère":
      const rayonS = valeurs[0];
      const surfaceS = 4 * Math.PI * Math.pow(rayonS, 2);
      const volumeS = (4 / 3) * Math.PI * Math.pow(rayonS, 3);
      res = `Surface de la sphère : ${surfaceS.toFixed(2)} cm²<br>Volume : ${volumeS.toFixed(2)} cm³`;
      break;

    default:
      res = "Figure non reconnue.";
  }

  results.innerHTML = `<p>${res}</p>`;
  results.classList.add("visible");
});
