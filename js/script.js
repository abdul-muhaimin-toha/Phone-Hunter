// Selecting Necessary Elements
const ProductContainerElement = document.getElementById('product-container');
const viewMoreContainerElement = document.getElementById('view-more-container');
const searchButtonElement = document.getElementById('search-button');
const viewMoreButtonElement = document.getElementById('view-more-button');
const modalContainerElement = document.getElementById('productModal');

// Declaring Necessary Variables
let viewAllbtnClicked = false;
let searchText = 'huawei';

// Initializing First fetch Search
fetchMobileInformation(searchText);

// Fetch Function
async function fetchMobileInformation(searchText) {
  ProductContainerElement.innerHTML = '';
  viewMoreContainerElement.classList.add('hidden');
  const div = document.createElement('div');
  div.classList =
    'flex flex-col justify-center items-center text-center font-bold p-6 gap-2 col-span-3';
  div.innerHTML = ` <span class="loading loading-spinner text-primary text-[#0D6EFD]"></span>
                    <h5 class="text-2xl text-[#0D6EFD]">Loading</h5>`;
  ProductContainerElement.appendChild(div);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const { data: phones } = await response.json();
  ProductContainerElement.innerHTML = '';
  displayMobileCard(phones);
  phoneDetails();
}

// Displaying UI Function
function displayMobileCard(phones) {
  ProductContainerElement.innerHTML = '';
  if (!phones.length) {
    const div = document.createElement('div');
    div.classList =
      'flex flex-col justify-center text-center font-bold p-6 gap-2 col-span-3';
    div.innerHTML = ` <h5 class="text-2xl text-[#0D6EFD]">Sorry! Nothing Found.</h5>
                      <h4 class="text-xl">Try something else.</h4>`;
    ProductContainerElement.appendChild(div);
  }
  if (phones.length > 15 && !viewAllbtnClicked) {
    phones = phones.slice(0, 15);
    viewMoreContainerElement.classList.remove('hidden');
    viewMoreContainerElement.classList.add('flex');
  } else {
    viewMoreContainerElement.classList.add('hidden');
    viewMoreContainerElement.classList.remove('flex');
    viewAllbtnClicked = false;
  }

  phones.forEach((phone) => {
    const div = document.createElement('div');
    div.classList = `p-6 border shadow-md rounded-lg flex flex-col text-center items-center dark:border-slate-800 dark:bg-slate-900`;
    div.innerHTML = `
                    <div class="w-full flex justify-center bg-slate-100 py-7 px-2 pb-12 rounded-lg dark:bg-slate-200">
                      <img src="${
                        phone.image || '../media/product.png'
                      }" alt="Product Picture" class="w-4/6" />
                    </div>
                    <h3 class="text-2xl font-bold text-black mt-6 mb-2 dark:text-white min-h-16">${
                      phone.brand
                    } ${phone.phone_name}</h3>
                    <p class="text-base font-normal text-[#706F6F] dark:text-slate-300 mb-3 min-h-24">There are many variations of passages of available, but the majority have suffered</p>
                    <h4 class="text-2xl font-bold text-black mb-4 dark:text-white">$999</h4>
                    <button id="${
                      phone.slug
                    }" class="phone-details bg-[#0D6EFD] text-white md:text-lg font-semibold px-4 py-2 md:px-8 md:py-3 rounded-md hover:bg-opacity-90 duration-150 ease-in mb-2">Show Details</button>
                     `;

    ProductContainerElement.appendChild(div);
  });
}

// Search Button
searchButtonElement.addEventListener('click', function (event) {
  const inputElement = event.target.parentNode.querySelector('input');
  searchText = inputElement.value.toLowerCase();
  inputElement.value = '';
  fetchMobileInformation(searchText);
});

// View More Button
viewMoreButtonElement.addEventListener('click', function () {
  viewAllbtnClicked = true;
  fetchMobileInformation(searchText);
});

// Phone Details Button
function phoneDetails() {
  const phoneDetailsElements = document.querySelectorAll('.phone-details');
  phoneDetailsElements.forEach((phoneDetailsElement) => {
    phoneDetailsElement.addEventListener('click', function (event) {
      const id = event.target.id;
      fetchMobileDetails(id);
    });
  });
}

// Fetch Mobile Details
async function fetchMobileDetails(id) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const { data } = await response.json();
  displayDetails(data);
}

// Display Modal of Specefic Information
function displayDetails(data) {
  modalContainerElement.innerHTML = '';
  const div = document.createElement('div');
  div.classList = 'modal-box w-5/6';
  div.innerHTML = `
                    <div class="flex flex-col justify-center items-start text-left">
                      <img
                      class="w-4/6 md:w-2/6 mb-4 self-center rounded-xl"
                      src="${data.image || '../media/product.png'}"
                      alt="{phone.name}"
                      />
                      <h3 class="font-bold text-lg pb-6">${
                        data.brand || 'Information Unavialable'
                      } ${data.name || 'Information Unavialable'}</h3>
                      <p class="pb-2">
                        <span class="font-bold text-sm">Storage: </span>${
                          data.mainFeatures?.storage ||
                          'Information Unavialable'
                        }
                      </p>
                      <p class="pb-2">
                        <span class="font-bold text-sm">Display Size: </span>${
                          data.mainFeatures?.displaySize ||
                          'Information Unavialable'
                        }
                      </p>
                      <p class="pb-2">
                        <span class="font-bold text-sm">Chipset: </span>${
                          data.mainFeatures?.chipSet ||
                          'Information Unavialable'
                        }
                      </p>
                      <p class="pb-2">
                        <span class="font-bold text-sm">Memory: </span>${
                          data.mainFeatures?.memory || 'Information Unavialable'
                        }
                      </p>
                      <p class="pb-2">
                        <span class="font-bold text-sm">Release Date: </span> ${
                          data.releaseDate || 'Information Unavialable'
                        }
                      </p>
                      <p class="pb-2">
                        <span class="font-bold text-sm">Brand: </span>${
                          data.brand || 'Information Unavialable'
                        }
                      </p>
                      <p class="pb-2">
                        <span class="font-bold text-sm">GPS: </span>${
                          data.others?.GPS || 'Information Unavialable'
                        }
                      </p>
                    </div>
                    <div class="modal-action">
                      <form method="dialog">
                        <button class="btn">Close</button>
                      </form>
                    </div>
                  `;

  modalContainerElement.appendChild(div);
  productModal.showModal();
}
