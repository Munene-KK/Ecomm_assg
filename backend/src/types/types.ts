//create a new product
export interface ProductsObj {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}
//update the product
export interface ProductsObjUpdate {
  name?: string;
  price?: number;
  image?: string;
  description?: string;
  category?: string;
  status?: string;
}
//create a new admin
export interface AdminsObJ {
  fullname: string;
  role: string;
  email: string;
  password: string;
}
//login admin
export interface AdminsLoginObj {
  email: string;
  password: string;
}
//create a new user
export interface UserRegisterObj {
  fullname: string;
  email: string;
  password: string;
}
//login users
export interface UserLoginObj {
  email: string;
  password: string;
}
