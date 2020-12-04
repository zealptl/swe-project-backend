import { Request, Response } from 'express';
import MenuItemsModel, { MenuItems } from '../../../models/MenuItems';
import CustomersModel, { Customers } from '../../../models/Customers';

function findTopDishes(dishArr:string[], k:number) {
  let menuItems: MenuItems[] = [];
  var freqMap: any = {};

  // store frequencies of dishes in hashmap
  dishArr.forEach(dish => {
    freqMap[dish] = freqMap[dish] ? freqMap[dish]+1 : 1; // if key exists, value+=1, otherwise value=1
  })

  // sort hashmap to get dishes ranked by most to least bought
  let sortedFreqMap = new Map([...freqMap.entries()].sort((a, b) => b[1] - a[1]));

  // add top k elements in hashmap to menuItems
  for(let i=0; i<k; i++)
    menuItems[i] = sortedFreqMap.keys().next().value;

  return menuItems;
}

export const getMenuItems = async (req: Request, res: Response) => {
  let menuItems: MenuItems[] = [];

  if (req.body.type == "ForYouDishes") { // show top 3 menu items for customer
    const customer: Customers | null = await CustomersModel.findById(
      req.body.customerID
    ).select('-password');

    if (customer != null) {
      let customerOrdersArray = customer.ordersMade;
      menuItems = findTopDishes(customerOrdersArray, 3);
    }
    
  }
  // else if (req.body.type == "TopThreeOverallDishes") // show top 3 menu items across all customers
  //   menuItems = await MenuItemsModel.find({});
  else // show all orders
    menuItems = await MenuItemsModel.find({});

  if (!menuItems) res.status(404).json({ msg: 'Menu items not found' });

  res.json(menuItems);
};
