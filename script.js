const timeStemp = "1627904423";
const apiKey = "209675a6c91c94c2bb8ad65773eb9d53";
const md5 = "09c586d3b7b17163a0c283bbe84e4ee5";

const f = `http://gateway.marvel.com/v1/public/characters?ts=${timeStemp}&apikey=${apiKey}&hash=${md5}&limit=100`;

fetch(f)
  .then((response) => {
    return response.json();
  })
  .then((jsonParsed) => {
    jsonParsed.data.results.forEach((item, index) => {
      console.log(item);
      const srcImgHero = item.thumbnail.path + "." + item.thumbnail.extension;
      const nameHero = item.name;
      const idHero = item.id;
      const series = item.series.items;
      const stories = item.stories.items;
      const comics = item.comics.items;

      createDivsCards(
        srcImgHero,
        nameHero,
        idHero,
        index,
        series,
        stories,
        comics
      );
    });

    const todosLinks = document.querySelectorAll(".list a");
    const todosListContent = document.querySelectorAll(".list .listContent");

    function createDivsCards(
      srcImg,
      nameHero,
      idHero,
      heroiIndex,
      series,
      stories,
      comics
    ) {
      const heros = document.querySelector(".heros");
      const container = document.querySelector(".container");
      const novoContainer = container.cloneNode(true);
      heros.appendChild(novoContainer);

      novoContainer.setAttribute("id", idHero);
      const img = novoContainer.querySelector("img");
      img.setAttribute("src", srcImg);
      const name = novoContainer.querySelector(".content h5");
      name.innerText = nameHero;
      const id = novoContainer.querySelector(".imgHero p");
      id.innerText = "#" + idHero;

      const listas = [series, stories, comics];
      const listContent = novoContainer.querySelectorAll(".listContent");

      listas.forEach((lista, index) => {
        Array.from(lista).forEach((item) => {
          let novaLi = document.createElement("li");
          let nameS = item.name;
          novaLi.innerText = nameS;
          listContent[index].querySelector("ul").appendChild(novaLi);
        });
      });
    }

    todosLinks.forEach((item, index) => {
      item.addEventListener("click", (evt) => {
        evt.preventDefault();
        removeAtivo(index);
        todosListContent[index].classList.toggle("ativo");
      });
    });

    function removeAtivo(index) {
      todosListContent.forEach((item, index2) => {
        if (index != index2) {
          item.classList.remove("ativo");
        }
      });
    }
  });
