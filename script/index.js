import Swiper from "../lib/swiper-bundle.esm.browser.min.js";

// scroll

const scroll = () => {
  const links = document.querySelectorAll(".navigation__link");
  const bannerBtn = document.querySelector(".banner__button");

  const allLinks = [...links, bannerBtn];

  allLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const id = link.getAttribute("href").substring(1);
      const section = document.getElementById(id);

      if (section) {
        seamless.scrollIntoView(section, {
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    });
  });
};

scroll();

// simplebar

new SimpleBar(document.querySelector(".country__list"), {
  classNames: {
    scrollbar: "country__scrollbar",
    track: "country__track",
  },
});

// slider

new Swiper(".goods__block", {
  sliderPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
  navigation: {
    prevEl: ".goods__arrow-prev",
    nextEl: ".goods__arrow-next",
  },
  preventClicks: true,
  a11y: false,
});

// modal

const productMore = document.querySelectorAll(".product__more");
const modal = document.querySelector(".modal");

productMore.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.add("modal_open");
  });
});

modal.addEventListener("click", ({ target }) => {
  if (target === modal) {
    modal.classList.remove("modal_open");
  }
});

const formPlaceholder = document.querySelectorAll(".form__placeholder");
const formInput = document.querySelectorAll(".form__input");

formInput.forEach((input, i) => {
  input.addEventListener("focus", () => {
    formPlaceholder[i].classList.add("form__placeholder_active");
  });

  input.addEventListener("blur", () => {
    if (input.value === "") {
      formPlaceholder[i].classList.remove("form__placeholder_active");
    }
  });
});

// currency

const dataCurrency = {};

const formatCurrency = (value, currency) => {
  return new Intl.NumberFormat("EU", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
};

const showPrice = (currency = "USD") => {
  const priceElems = document.querySelectorAll("[data-price]");

  priceElems.forEach((elem) => {
    elem.textContent = formatCurrency(
      elem.dataset.price * dataCurrency[currency],
      currency
    );
  });
};

const myHeaders = new Headers();
myHeaders.append("apikey", "97fKujcKK3ukNWUCLdGBMJkDhX3n0gMS");

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

fetch("https://api.apilayer.com/fixer/latest?base=USD", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    Object.assign(dataCurrency, result.rates);
    showPrice();
  })
  .catch((error) => console.log("error", error));

// choices

const countryBtn = document.querySelector(".country__btn");
const countryWrapper = document.querySelector(".country__wrapper");

countryBtn.addEventListener("click", () => {
  countryWrapper.classList.toggle("country__wrapper_open");
});

countryWrapper.addEventListener("click", ({ target }) => {
  if (target.classList.contains("country__choise")) {
    countryWrapper.classList.remove("country__wrapper_open");
    showPrice(target.dataset.currency);
  }
});

// timer

const declOfNum = (n, titles) =>
  titles[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];

const timer = (deadline) => {
  const unitDay = document.querySelector(".timer__unit_day");
  const unitHour = document.querySelector(".timer__unit_hour");
  const unitMin = document.querySelector(".timer__unit_min");
  const descriptionDay = document.querySelector(".timer__description_day");
  const descriptionHour = document.querySelector(".timer__description_hour");
  const descriptionMin = document.querySelector(".timer__description_min");

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemaning = dateStop - dateNow;

    const minutes = Math.floor((timeRemaning / 1000 / 60) % 60);
    const hours = Math.floor((timeRemaning / 1000 / 60 / 60) % 24);
    const days = Math.floor(timeRemaning / 1000 / 60 / 60 / 24);

    return { timeRemaning, minutes, hours, days };
  };

  const start = () => {
    const timer = getTimeRemaining();

    unitDay.textContent = timer.days;
    unitHour.textContent = timer.hours;
    unitMin.textContent = timer.minutes;

    descriptionDay.textContent = declOfNum(timer.days, ["день", "дня", "дней"]);
    descriptionHour.textContent = declOfNum(timer.hours, [
      "час",
      "часа",
      "часов",
    ]);
    descriptionMin.textContent = declOfNum(timer.minutes, [
      "минута",
      "минуты",
      "минут",
    ]);

    const timerID = setTimeout(start, 60000);

    if (timer.timeRemaning < 0) {
      clearTimeout(timerID);

      unitDay.textContent = "0";
      unitHour.textContent = "0";
      unitMin.textContent = "0";
    }
  };

  start();
};

timer("2023/09/07 20:00");
