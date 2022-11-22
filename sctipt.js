"use ctrict";

const baseURL = "https://restcountries.com/v2";

// ------------------------------- ALL COUNTRIES -------------------------------------

const getAllCountries = async () => {
  const countries = await fetch(`${baseURL}/all`);
  const result = await countries.json();
  dataRender(result);
  diynamicCategory(result);
};

getAllCountries();

// ------------------------------- ALL COUNTRIES END-------------------------------------

// ------------------------------ RENDER ALL DATA ---------------------------------------
function dataRender(data = []) {
  data.forEach((e) => {
    const card = createElement(
      "div",
      "card shadow-ig",
      `
   <img src="${e.flags.svg}" alt="bayroq" class="card-top-img">
            <div class="card-body p-4">
              <h3 class="card-title">
              ${e.name}
              </h3>
              <ul class="card-list p-0">
                <li class="card-list-item list-unstyled"><strong>Population: </strong>${e.population}</li>
                <li class="card-list-item list-unstyled"><strong>Region:</strong> ${e.region}</li>
                <li class="card-list-item list-unstyled"><strong>Capital: </strong>${e.capital}</li>
              </ul>
            </div>
   `
    );

    $(".wrapper").appendChild(card);
  });
}
// ------------------------------ RENDER ALL DATA END ---------------------------------------

// ------------------------------
function diynamicCategory(data) {
  const category = [];
  data.forEach((e) => {
    if (!category.includes(e.region)) {
      category.push(e.region);
    }
  });

  category.sort();
  category.unshift("All");
  category.forEach((e) => {
    const option = createElement("option", "item", e);
    $("#region").appendChild(option);
  });
}

$("#search").addEventListener("keypress", (e) => {
  if (e.target.value.trim().length !== 0 && e.keyCode === 13) {
    findCountry(e.target.value);
  }
});

// ---------------- FIND COUNTRIES ------------------

async function findCountry(country) {
  $(".wrapper").innerHTML = "";
  const response = await fetch(`${baseURL}/name/${country}`);
  const data = await response.json();
  if (response.status === 404) {
    $(".info").innerHTML = "<h1 class='text-center'>BUNDAY DAVLAT YUQ</h1>";
  } else {
    $(
      ".info"
    ).innerHTML = `<h1 class='text-center'> QIDIRUV NATIJASI: ${data.length} TA</h1>`;
    dataRender(data);
  }
}
// ---------------- FIND COUNTRIES END------------------

$("#region").addEventListener("change", (e) => {
  sortCountry(e.target.value.toLowerCase());
});

async function sortCountry(region) {
  $(".wrapper").innerHTML = "";

  if (region=== "all") {
    const response = await fetch(`${baseURL}/all`);
    const data = await response.json();
    if (response.status === 404) {
      $(".info").innerHTML = "<h1 class='text-center'>NOT FOUND 404</h1>";
    } else {
      $(
        ".info"
      ).innerHTML = `<h1 class='text-center'> QIDIRUV NATIJASI: ${data.length} TA</h1>`;
      dataRender(data);
    }
  } else {
    const response = await fetch(`${baseURL}/region/${region}`);
    const data = await response.json();
    if (response.status === 404) {
      $(".info").innerHTML = "<h1 class='text-center'>NOT FOUND 404</h1>";
    } else {
      $(
        ".info"
      ).innerHTML = `<h1 class='text-center'> QIDIRUV NATIJASI: ${data.length} TA</h1>`;
      dataRender(data);
    }
  }
}

// TUNGI REJIM

$(".white").addEventListener("click", () => {
  $(".white").classList.toggle("d-none");
  $(".dark").classList.toggle("d-none");
  $("header").classList.toggle("bg-secondary");
  $("body").setAttribute("class", "text-light bg-dark");
  $(".card").classList.toggle("bascgrount");
  $(".form-control").classList.toggle("bg-secondary");
  $(".form-select").classList.toggle("bg-secondary");
});

$(".dark").addEventListener("click", () => {
  $(".white").classList.toggle("d-none");
  $(".dark").classList.toggle("d-none");
  $("body").classList.toggle("bg-dark");
  $("header").classList.toggle("bg-secondary");
  $("body").setAttribute("class", "text-dark ");
  $(".card").classList.toggle("bascgrount");
  $(".form-control").classList.toggle("bg-secondary");
  $(".form-select").classList.toggle("bg-secondary");
});
