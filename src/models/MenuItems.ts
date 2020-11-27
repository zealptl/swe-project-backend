import { Document, model, Schema } from 'mongoose';

// NOTE/ TODO: For now I have set image as string, but I think we need some extra libraries to upload/ return from DB

export interface MenuItems extends Document {
  title: String;
  chefName: String;
  chefID: String;
  description: String;
  ingredients: String[];
  dietaryRestrictions: String[];
  image: String;
  type: String;
}

const menuItemsSchema = new Schema({
  title: String,
  chefName: String,
  chefID: Schema.Types.ObjectId,
  description: String,
  ingredients: Array,
  dietaryRestrictions: Array,
  image: String,
  type: String,
});

export default model<MenuItems>('MenuItemsModel', menuItemsSchema);
