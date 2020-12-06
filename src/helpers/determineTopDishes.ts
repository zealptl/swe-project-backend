export const determineTopDishes = (dishArr:string[], k:number) : string[] => {
  let topDishesArr: string[] = [];
  var freqMap: any = {};

  // store frequencies of dishes in hashmap
  dishArr.forEach(dish => {
    freqMap[dish] = freqMap[dish] ? freqMap[dish]+1 : 1; // if key exists, value+=1, otherwise value=1
  })

  // sort hashmap to get dishes ranked by most to least bought
  let sortedFreqMap = new Map([...freqMap.entries()].sort((a, b) => b[1] - a[1]));

  // add top k elements in hashmap to menuItemsIdsArr
  for(let i=0; i<k; i++)
    topDishesArr[i] = sortedFreqMap.keys().next().value;

  return topDishesArr;
}