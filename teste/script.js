let num_offSet = 0;
function requisition(num) {
  num_offSet += num;
  console.log(num_offSet);
  if (num_offSet < 1 || num_offSet == null) {
    num_offSet = 0;
  }

  const timeStemp = "1627904423";
  const apiKey = "209675a6c91c94c2bb8ad65773eb9d53";
  const md5 = "09c586d3b7b17163a0c283bbe84e4ee5";

  const f = `http://gateway.marvel.com/v1/public/characters?ts=${timeStemp}&apikey=${apiKey}&hash=${md5}&offset=${num_offSet}&limit=1`;

  fetch(f)
    .then((response) => {
      return response.json();
    })
    .then((jsonParsed) => {
      return jsonParsed.data.results[0];
    })
    .then((hero) => {
      console.log(hero);
      const name = hero.name;
      const descrition = hero.description;
      const id = hero.id;
      const imgHero = hero.thumbnail.path + "." + hero.thumbnail.extension;

      const cardHero = document.querySelectorAll(".card");

      cardHero.forEach((card) => {
        card.querySelector("img").setAttribute("src", imgHero);
        card.querySelector(".idHero").innerText = id;
        card.querySelector(".content .name").innerText = name;
        card.querySelector(".descritions").innerText = descrition;
      });
    });
}

requisition(0);
