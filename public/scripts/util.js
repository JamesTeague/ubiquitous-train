exports.sortJsonArrayByKey = function (aList, aKey) {
   return aList.sort(function(a, b) {
      var x = a[aKey]; var y = b[aKey];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
   });
};