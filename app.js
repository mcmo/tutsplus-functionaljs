var beerData = JSON.parse(document.getElementById("beerData").textContent);
var beers = beerData.beers;
var beerTemplate = document.getElementById("tmpl-beer").textContent;
var beerList = document.getElementById("beerList");
var filters = document.getElementById("filters");
var filterLinks = filters.querySelectorAll("a");

function loadBeers(beers) {
  beerList.innerHTML = _.template(beerTemplate)({
    beers: beers
  });
}

function setActiveFilters(active){
  for (i = 0; i < filterLinks.length; i++) {
    filterLinks[i].classList.remove('btn-active');
  }
  active.classList.add('btn-active');
}

function filterBeers(property, value){
  var filteredBeers = [];
  for (i = 0; i < beers.length; i++) {
    if (compareValues(beers[i], property, value)) {
      filteredBeers.push(beers[i]);
    }
  }
  return filteredBeers;
}

function compareValues(item, property, value){
  if (!Array.isArray(value)){
    return item[property] === value;
  }
  for (var i = 0; i < value.length; i++){
    if (item[property] === value[i]){
      return true;
    }
  }
}

function makeFilter(property){
  return function(value){
    return filterBeers(property, value);
  }
}

filterByLocale = makeFilter('locale');
filterByType = makeFilter('type');

loadBeers(beers);

filters.addEventListener('click', function (e) {
  e.preventDefault();
  var clicked = e.target;
  var filter = clicked.dataset.filter;
  var filteredBeers = [];
  var i;

  setActiveFilters(clicked);

  switch (filter) {
    case 'all':
      filteredBeers = beers;
      break;
    case 'domestic':
      filteredBeers = filterByLocale('domestic');
      break;
    case 'imports':
      filteredBeers = filterByLocale('import');;
      break;
    case 'ale':
      filteredBeers = filterByType(['ipa', 'ale']);
      break;
    case 'lager':
      filteredBeers = filterByType('lager');
      break;
    case 'stout':
      filteredBeers = filterByType('stout');
      break;
  }

  loadBeers(filteredBeers);
});
