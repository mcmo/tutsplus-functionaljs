var beerData = JSON.parse(document.getElementById("beerData").textContent);
var allBeers = beerData.beers;
var beerTemplate = document.getElementById("tmpl-beer").textContent;
var beerList = document.getElementById("beerList");
var averageAbv = document.getElementById('averageAbv');
var filters = document.getElementById("filters");
var filterLinks = filters.querySelectorAll("a");

function loadBeers(beers) {
  beerList.innerHTML = _.template(beerTemplate)({
    beers: beers
  });
  averageAbv.innerHTML = getAverageAbv(beers);
}

function setActiveFilters(active) {
  for (i = 0; i < filterLinks.length; i++) {
    filterLinks[i].classList.remove('btn-active');
  }
  active.classList.add('btn-active');
}

function roundDecimal(number, places){
  var factor = Math.pow(10, places);
  return Math.round(number * factor) / factor;
}

function getAverageAbv(beers) {
  var mean = fp.mean(beers, 'abv');
  return 'Average ABV: ' + roundDecimal(mean, 1) + '%';
}

function makeFilter(collection, property) {
  return function (value) {
    return collection.filter(function (beer) {
      return beer[property] === value;
    });
  }
}

filterByLocale = makeFilter(allBeers, 'locale');
filterByType = makeFilter(allBeers, 'type');

loadBeers(allBeers);

// w/o loop: $('#filters a').click(function(e){
for (var i = 0; i < filterLinks.length; i++){

  filterLinks[i].addEventListener('click', function (e) {
    e.preventDefault();
    var clicked = e.target;
    var filterName = clicked.dataset.filter;
    var filteredBeers = [];
    var i;

    setActiveFilters(clicked);

    switch (filterName) {
      case 'all':
        filteredBeers = allBeers;
        break;
      case 'domestic':
        filteredBeers = filterByLocale('domestic');
        break;
      case 'imports':
        filteredBeers = filterByLocale('import');;
        break;
      case 'ale':
        filteredBeers = allBeers.filter(function (beer) {
          return beer.type === 'ipa' || beer.type === 'ale';
        });
        break;
      case 'lager':
        filteredBeers = filterByType('lager');
        break;
      case 'stout':
        filteredBeers = filterByType('stout');
        break;
      case 'surprise':
        console.log(allBeers);
        filteredBeers = [_.sample(allBeers)];
        console.log(filteredBeers);
        break;
    }

    loadBeers(filteredBeers);
  });

}
