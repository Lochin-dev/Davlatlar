"use ctrict";

const baseURL = "https://restcountries.com/v2";

// ------------------------------- ALL COUNTRIES -------------------------------------

const getAllCountries = async () => {
  const countries = await fetch(`${baseURL}/all`);
  const result = await countries.json();
  $(".wrapper").innerHTML = `<div class="loader"></div>`;
  setTimeout(() => {
    $(".wrapper").innerHTML = "";
    dataRender(result);
  }, 2000);

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
              <button class="btn btn-primary" data-id="${e.name}" >RED MORE</button>
            </div>
   `
    );
    card.dataset.id = e.name;

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
  $(".wrapper").innerHTML = `<div class="loader"></div>`;
  if (e.target.value.trim().length !== 0 && e.keyCode === 13) {
    setTimeout(() => {
      $(".wrapper").innerHTML = "";
      findCountry(e.target.value);
    }, 1500);
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
  $(".wrapper").innerHTML = `<div class="loader"></div>`;
  setTimeout(() => {
    $(".wrapper").innerHTML = "";
    sortCountry(e.target.value.toLowerCase());
  }, 1500);
});

async function sortCountry(region) {
  $(".wrapper").innerHTML = "";

  if (region === "all") {
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

$(".wrapper").addEventListener("click", (e) => {
  $(".country-info").innerHTML = "";
  if (e.target.classList.contains("btn-primary")) {
    let id = e.target.getAttribute("data-id");
    getCountry(id);
    $(".sidebar").classList.remove("swipe");
  }
});

async function getCountry(country) {
  const response = await fetch(`${baseURL}/name/${country}`);
  const result = await response.json();
  console.log(result);

  const {
    name,
    capital,
    region,
    population,
    flags: { svg },
  } = result[0];
  const row = createElement(
    "div",
    "row",
    `
  <div class="col-md-4">
    <img src="${svg}" class="p-5 mt-5" width="420" id="img-country">
  </div>
  <div class="col-md-7 p-5 mt-5">
    <ul class="list-group">
      <li class="list-group-item" id="cName">Country:${name}</li>
      <li class="list-group-item">Population: ${population}</li>
      <li class="list-group-item">Region:${region}</li>
      <li class="list-group-item">Capital: ${capital}</li>
    </ul>
  </div>
`
  );
  $(".country-info").appendChild(row);
}

$(".close").addEventListener("click", (e) => {
  $(".sidebar").classList.add("swipe");
  $("body").style.overflow = "visibel";
});

// TUNGI REJIM

$(".white").addEventListener("click", () => {
  // $(".card").forEach(() => {
  //   $(".card").classList.add("bg-");
  // });

  $(".white").classList.toggle("d-none");
  $(".dark").classList.toggle("d-none");
  $("header").classList.toggle("bg-secondary");
  $("body").setAttribute("class", "text-light bg-dark");

  $(".form-control").classList.toggle("bg-secondary");
  $(".form-select").classList.toggle("bg-secondary");
});

$(".dark").addEventListener("click", () => {
  // $(".card").forEach(() => {
  //   $(".card").classList.remove("bg-");
  // });

  $(".white").classList.toggle("d-none");
  $(".dark").classList.toggle("d-none");
  $("body").classList.toggle("bg-dark");
  $("header").classList.toggle("bg-secondary");
  $("body").setAttribute("class", "text-dark ");

  $(".form-control").classList.toggle("bg-secondary");
  $(".form-select").classList.toggle("bg-secondary");
});
