const test = () =>  {
    const state = {
        fruits: ['apple', 'banana'],
        price: null,
        balance: void 0
    }
    const { fruits = [], price = 100, balance = 20 } = GUtils.proxy(state);
    console.log(fruits, price, balance);
}
test();

const store = {
    company: 'Apple',
    name: null,
    staffs: 10000,
    country: void 0
}

const { company = 'MS', name = 'bill', staffs = 9999, country = 'US'} = store;
console.log(company, name, staffs, country);
