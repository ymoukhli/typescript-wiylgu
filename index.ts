import './style.css';
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<div>
    <h1>Shopping List</h1>
    <input placeholder="please add your item" id="itemInput" type="text"/> <button id="addItemButton" >add item</button>
    <input placeholder="Search..." id="searchInput" type="text"/> <button id="searchButton" >search</button>
    <ul id="itemList"></ul>
</div>`;
// data
const vegetablesJson = [
  {
    name: 'Cabbage',
    photo_url: 'https://www.freepngimg.com/thumb/categories/2970.png',
    quantity: 'One Unit',
    id: 2,
    price: 30,
  },
  {
    name: 'Capsicum',
    photo_url:
      'https://www.nicepng.com/png/detail/52-525615_green-bell-pepper-png-green-capsicum-png.png',
    quantity: 'One Unit',
    id: 7,
    price: 5,
  },
  {
    name: 'Garlic',
    photo_url:
      'https://www.freepngimg.com/thumb/garlic/2-2-garlic-transparent-thumb.png',
    quantity: 'One Unit',
    id: 10,
    price: 20,
  },
  {
    name: 'Beetroot',
    photo_url: 'https://pngimg.com/uploads/beet/beet_PNG28.png',
    quantity: 'One Unit',
    id: 11,
    price: 20,
  },
  {
    name: 'Tomatoes',
    photo_url: 'https://www.freepngimg.com/thumb/categories/2985.png',
    quantity: 'One Unit',
    id: 13,
    price: 5,
  },
  {
    name: 'Celeriac',
    photo_url:
      'https://w7.pngwing.com/pngs/252/146/png-transparent-celeriac-leaf-vegetable-food-celery-herbes-leaf-vegetable-food-plant-stem-thumbnail.png',
    quantity: 'One Bunch',
    id: 16,
    price: 5,
  },
  {
    name: 'Carrots',
    photo_url: 'https://www.freepngimg.com/thumb/categories/2971.png',
    quantity: 'One Kg',
    id: 18,
    price: 60,
  },
  {
    name: 'Onions',
    photo_url:
      'https://www.freepngimg.com/thumb/onion/10-red-onion-png-image-thumb.png',
    quantity: 'One Kg',
    id: 19,
    price: 120,
  },
  {
    name: 'Potatoes',
    photo_url:
      'https://www.freepngimg.com/thumb/potato/7-potato-png-images-pictures-download-thumb.png',
    quantity: 'One container',
    id: 20,
    price: 80,
  },
];

type VegetableList = typeof vegetablesJson[0];

// const vegetables = [...vegetablesJson] as const;
// type Vegetable = typeof vegetables[number]['name'];
type Vegetable =
  | 'Cabbage'
  | 'Capsicum'
  | 'Garlic'
  | 'Beetroot'
  | 'Tomatoes'
  | 'Celeriac'
  | 'Carrots'
  | 'Onions'
  | 'Potatoes';

const vegetables: Vegetable[] = vegetablesJson.map(
  (e) => e.name
) as Vegetable[];
const ulNode: HTMLUListElement = document.getElementById(
  'itemList'
) as HTMLUListElement;
const itemInput: HTMLInputElement = document.getElementById(
  'itemInput'
) as HTMLInputElement;
const searchInput: HTMLInputElement = document.getElementById(
  'searchInput'
) as HTMLInputElement;
const addItemButton: HTMLButtonElement = document.getElementById(
  'addItemButton'
) as HTMLButtonElement;
const searchButton: HTMLButtonElement = document.getElementById(
  'searchButton'
) as HTMLButtonElement;

interface Vegetables {
  items: Vegetable[];
}

class Shop implements Vegetables {
  items: Vegetable[] = [];

  // event for add,search items
  addEvents(
    add: HTMLButtonElement = null,
    addInput: HTMLInputElement = null,
    search: HTMLButtonElement = null,
    searchInput: HTMLInputElement = null
  ): void {
    if (add)
      add.addEventListener('click', () => {
        if (!addInput || !addInput.value) return;

        if (!vegetables.find((e) => e === addInput.value)) return;
        this.items.push(addInput.value as Vegetable);
        this.render(ulNode, this.items, vegetablesJson);
      });
    if (searchInput) {
      searchInput.addEventListener('change', () => {
        if (!searchInput) return;
        if (!searchInput.value) {
          this.render(ulNode, this.items, vegetablesJson);
        } else {
          this.render(
            ulNode,
            this.items.filter((e) => e.includes(searchInput.value)),
            vegetablesJson
          );
        }
      });
    }
  }
  // render
  render(
    ul: HTMLUListElement,
    itemsList: Vegetable[],
    data: VegetableList[]
  ): void {
    ul.innerHTML = '';

    for (const vegetable of itemsList) {
      const liNode = document.createElement('li');
      const buttonNode = document.createElement('button');
      const imageNode = document.createElement('img');
      buttonNode.innerText = 'X';
      buttonNode.addEventListener('click', () => liNode.remove());
      imageNode.setAttribute(
        'src',
        data.find((element) => element.name === vegetable).photo_url
      );
      liNode.innerText = vegetable;
      ul.appendChild(liNode);
      liNode.appendChild(buttonNode);
      liNode.appendChild(imageNode);
    }
  }
}

const list = new Shop();
list.addEvents(addItemButton, itemInput, searchButton, searchInput);
list.render(ulNode, list.items, vegetablesJson);
