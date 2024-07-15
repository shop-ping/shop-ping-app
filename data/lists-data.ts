import itemList from "./list-data";

interface List1 {
  name: string;
  itemCount: number;
}

const lists1: List1[] = [
  { name: "Groceries", itemCount: itemList.length },
  { name: "Pharma", itemCount: 1 },
  { name: "Errands", itemCount: 1 },
];

export default lists1;
