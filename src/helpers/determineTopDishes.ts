export const determineTopDishes = (dishArr: string[], k: number): string[] => {
  let topDishesArr: string[] = [];
  var freqMap: any = {};

  // store frequencies of dishes in hashmap
  dishArr.forEach((dish) => {
    freqMap[dish] = freqMap[dish] ? freqMap[dish] + 1 : 1; // if key exists, value+=1, otherwise value=1
  });

  // sort hashmap to get dishes ranked by most to least bought
  let sortedFreqMap = new Map(
    [...Object.entries(freqMap)].sort((a: any, b: any) => b[1] - a[1])
  );

  // get all the keys of map as an array
  const mapKeys = Array.from(sortedFreqMap.keys());

  // return first k keys of map
  return mapKeys.slice(0, k);
};
