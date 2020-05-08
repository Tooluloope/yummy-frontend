export const  deliveryFee =  parseInt("15");

export const addNewItem = (state, item) => {
    let data = Object.create(state);
    
   
    // Check if item in cart
    let result = data.items.findIndex(({name}) => name === item.name);

    if (result !== -1) {
        data.items = [...data.items];
        data.items[result] = {
            ...data.items[result], amount: data.items[result].amount + 1
        };
    }
    else{
        result = item;
        data.items = [...data.items, {...result, amount: 1} ];
    }
    const {items} = data;
    console.log(items);
    const total = getTotal(items);
    return {items, total};   
};

export const decreaseItem = (state, item) => {
    let data = Object.create(state);
    // Check if item in cart
    let result = data.items.findIndex(({name}) => name === item.name);

    if (result > -1) {
        data.items = [...data.items];
        if (data.items[result].amount >1 ) {
            data.items[result] = {
                ...data.items[result], amount: data.items[result].amount - 1
            };
        }
        else{
            data.items.splice(result, 1);
        }
        
    }
    else{
        result = item;
        data.items = [...data.items];
    }
    const {items} = data;
    const total = getTotal(items);
    return {items, total}; 

};

export const increaseItem = (state, item) => {
    let data = Object.create(state);
    // Check if item in cart
    let result = data.items.findIndex(({name}) => name === item.name);

    if (result !== -1) {
        data.items = [...data.items];
        data.items[result] = {
            ...data.items[result], amount: data.items[result].amount + 1
        };
    }

    const {items} = data;
    const total = getTotal(items);
    return {items, total}; 


};

export const removeItem = (state, item)=> {
    let data = Object.create(state);
    // Check if item in cart
    let result = data.items.findIndex(({name}) => name === item.name);
    data.items = [...data.items];
    data.items.splice(result, 1);
    const {items} = data;
    const total = getTotal(items);
    return {items, total};

};

const getTotal = (arr) => 
    
    arr.reduce((acc, currItem) => {
        
        const {price, amount} = currItem;
        const totalPrice = parseFloat(price).toFixed(2) * amount;
        return parseFloat(acc + totalPrice);

    }, deliveryFee);

    // 1 USD  -->  0.926238 EUR
export const usdToEuros = (amount) => parseFloat(amount * 0.926238).toFixed(2);
