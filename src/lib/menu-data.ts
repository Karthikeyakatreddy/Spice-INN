import curry from "@/assets/dish-curry.jpg";
import tandoori from "@/assets/dish-tandoori.jpg";
import noodles from "@/assets/dish-noodles.jpg";
import seafood from "@/assets/dish-seafood.jpg";
import biryani from "@/assets/hero-biryani.jpg";

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  isVeg: boolean;
  spiceLevel: 1 | 2 | 3;
  available: boolean;
};

export const CATEGORIES = [
  "Biryani",
  "Sea Food",
  "Veg Curries",
  "Non-Veg Curries",
  "Chicken Curries",
  "Egg Specials",
  "Mutton",
  "Rice & Noodles",
  "Soups",
  "Starters",
  "Tandoori",
  "Chef Specials",
] as const;

const pic = (i: number) => [biryani, curry, tandoori, noodles, seafood][i % 5];

export const MENU: MenuItem[] = [
  { id: "b1", name: "Hyderabadi Chicken Biryani", category: "Biryani", price: 320, description: "Long-grain basmati, slow-dum cooked with aromatic spices.", image: biryani, isVeg: false, spiceLevel: 2, available: true },
  { id: "b2", name: "Mutton Dum Biryani", category: "Biryani", price: 420, description: "Tender mutton layered with saffron rice.", image: biryani, isVeg: false, spiceLevel: 3, available: true },
  { id: "b3", name: "Veg Dum Biryani", category: "Biryani", price: 240, description: "Garden vegetables with fragrant basmati.", image: biryani, isVeg: true, spiceLevel: 2, available: true },
  { id: "s1", name: "Butter Chicken", category: "Chicken Curries", price: 360, description: "Creamy tomato gravy, mildly spiced.", image: curry, isVeg: false, spiceLevel: 1, available: true },
  { id: "s2", name: "Chicken Chettinad", category: "Chicken Curries", price: 340, description: "Bold South-Indian spice blend.", image: curry, isVeg: false, spiceLevel: 3, available: true },
  { id: "v1", name: "Paneer Butter Masala", category: "Veg Curries", price: 280, description: "Cottage cheese in rich tomato-cashew gravy.", image: curry, isVeg: true, spiceLevel: 1, available: true },
  { id: "v2", name: "Dal Tadka", category: "Veg Curries", price: 200, description: "Yellow lentils tempered with ghee and cumin.", image: curry, isVeg: true, spiceLevel: 1, available: true },
  { id: "m1", name: "Mutton Rogan Josh", category: "Mutton", price: 460, description: "Slow-cooked Kashmiri-style mutton curry.", image: curry, isVeg: false, spiceLevel: 2, available: true },
  { id: "t1", name: "Tandoori Chicken (Full)", category: "Tandoori", price: 520, description: "Clay-oven roasted with yogurt-spice marinade.", image: tandoori, isVeg: false, spiceLevel: 2, available: true },
  { id: "t2", name: "Paneer Tikka", category: "Tandoori", price: 320, description: "Charred paneer cubes with bell peppers.", image: tandoori, isVeg: true, spiceLevel: 2, available: true },
  { id: "sf1", name: "Prawns Pepper Fry", category: "Sea Food", price: 480, description: "Fresh prawns tossed in cracked pepper.", image: seafood, isVeg: false, spiceLevel: 3, available: true },
  { id: "sf2", name: "Fish Tikka", category: "Sea Food", price: 420, description: "Marinated fish grilled in tandoor.", image: seafood, isVeg: false, spiceLevel: 2, available: true },
  { id: "rn1", name: "Hakka Noodles", category: "Rice & Noodles", price: 220, description: "Wok-tossed noodles with vegetables.", image: noodles, isVeg: true, spiceLevel: 2, available: true },
  { id: "rn2", name: "Chicken Fried Rice", category: "Rice & Noodles", price: 260, description: "Smoky fried rice with chicken.", image: noodles, isVeg: false, spiceLevel: 2, available: true },
  { id: "st1", name: "Chicken 65", category: "Starters", price: 280, description: "Crispy spicy fried chicken bites.", image: tandoori, isVeg: false, spiceLevel: 3, available: true },
  { id: "st2", name: "Gobi Manchurian", category: "Starters", price: 220, description: "Indo-Chinese cauliflower in tangy sauce.", image: noodles, isVeg: true, spiceLevel: 2, available: true },
  { id: "e1", name: "Egg Bhurji", category: "Egg Specials", price: 180, description: "Scrambled spiced eggs.", image: curry, isVeg: false, spiceLevel: 2, available: true },
  { id: "so1", name: "Sweet Corn Soup", category: "Soups", price: 140, description: "Classic comfort soup.", image: noodles, isVeg: true, spiceLevel: 1, available: true },
  { id: "ncc1", name: "Chilli Chicken", category: "Non-Veg Curries", price: 320, description: "Indo-Chinese signature.", image: noodles, isVeg: false, spiceLevel: 3, available: true },
  { id: "cs1", name: "Chef's Spice Inn Special Thali", category: "Chef Specials", price: 480, description: "A curated tasting platter.", image: pic(0), isVeg: false, spiceLevel: 2, available: true },
];
