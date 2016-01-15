var fp = {};

fp.filter = function (collection, callback) {
  var filtered = [];
  for (i = 0; i < collection.length; i++) {
    if (callback(collection[i])) {
      filtered.push(collection[i]);
    }
  }
  return filtered;
}

fp.map = function (collection, callback) {
  var mapped = [];
  for (var i = 0; i < collection.length; i++) {
    mapped.push(callback(collection[i]));
  }
  return mapped;
};

fp.reduce = function (collection, callback, initial) {
  var last = initial;
  for (var i = 0; i < collection.length; i++) {
    last = callback(last, collection[i]);
  }
  return last;
};

fp.add = function (a, b) {
  return a + b;
}

fp.pluck = function (collection, property) {
  return fp.map(collection, function (item) {
    return item[property];
  });
}

fp.mean = function (collection, property) {
  if (property) {
    collection = fp.pluck(collection, property);
  }
  return fp.reduce(collection, fp.add, 0) / collection.length;
}
