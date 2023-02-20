let tempArray = [];

let tempstorage = (object) => {
  tempArray.push(object);
};

let erase = () => {
  tempArray = [];
};

export { tempstorage, erase, tempArray };
