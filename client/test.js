const currentSearchTerm;
const arrayOfBookmarks;
// const typeOfSearch;

function searchFilter (currentSearchTerm) {
  let searchedArray;
  let i = 0;
  let i2 = 0;
  arrayOfBookmarks.forEach(filterFunction);
  function filterFunction (bookmark) {
    while (i < 5 || i2 < arrayOfBookmarks.length) {
      if (bookmark.whatever has currentSearchTerm) {
        searchedArray.push((<div onClick={take you to the URL}></div>))
        i++
      }
      i2++
    }
  }
  call some action to dispatch that stuff
}