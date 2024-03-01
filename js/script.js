// Selecting Necessary Elements
const ProductContainerElement = document.getElementById('product-container');
const viewMoreContainerElement = document.getElementById('view-more-container');
const searchButtonElement = document.getElementById('search-button');
const viewMoreButtonElement = document.getElementById('view-more-button');

// Declaring Necessary Variables
let viewAllbtnClicked = false;
let searchText = 'huawei';

// Initializing First fetch Search
fetchMobileInformation(searchText);

// Fetch Function
async function fetchMobileInformation(searchText) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const { data: phones } = await response.json();
  displayMobileCard(phones);
}

// Displaying UI Function
function displayMobileCard(phones) {
  ProductContainerElement.innerHTML = '';
  if (phones.length > 15 && !viewAllbtnClicked) {
    phones = phones.slice(0, 15);
    viewMoreContainerElement.classList.remove('hidden');
  } else {
    viewMoreContainerElement.classList.add('hidden');
    viewAllbtnClicked = false;
  }

  phones.forEach((phone) => {
    const div = document.createElement('div');
    div.classList = `p-6 border shadow-md rounded-lg flex flex-col text-center items-center dark:border-slate-800 dark:bg-slate-900`;
    div.innerHTML = `
                    <div class="w-full flex justify-center bg-slate-100 py-7 px-2 pb-12 rounded-lg dark:bg-slate-800">
                      <img src="${phone.image}" alt="Product Picture" class="w-4/6" />
                    </div>
                    <h3 class="text-2xl font-bold text-black mt-6 mb-2 dark:text-white min-h-16">${phone.brand} ${phone.phone_name}</h3>
                    <p class="text-base font-normal text-[#706F6F] dark:text-slate-300 mb-3 min-h-24">There are many variations of passages of available, but the majority have suffered</p>
                    <h4 class="text-2xl font-bold text-black mb-4 dark:text-white">$999</h4>
                    <button class="bg-[#0D6EFD] text-white md:text-lg font-semibold px-4 py-2 md:px-8 md:py-3 rounded-md hover:bg-opacity-90 duration-150 ease-in mb-2">Show Details</button>
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
