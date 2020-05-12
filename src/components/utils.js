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
    const total = getTotal(items);
    stateToLocalStorage("state", {items, total});
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
    let deliveryFee = items.length < 1 ? 0 : 15;
    const total = getTotal(items, deliveryFee);
    stateToLocalStorage("state",{items, total});
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
    stateToLocalStorage("state",{items, total});
    return {items, total}; 


};






export const removeItem = (state, item)=> {
    

    let data = Object.create(state);
    // Check if item in cart
    let result = data.items.findIndex(({name}) => name === item.name);
    data.items = [...data.items];
    data.items.splice(result, 1);
    const {items} = data;
    let deliveryFee = items.length < 1 ? 0 : 15;
    
    const total = getTotal(items, deliveryFee);
    stateToLocalStorage("state", {items, total});
    return {items, total};

};






export const removeAll = () => {

    removeStateFromLocalStorage();
    return {
        items: [],
        total:0
      };
};

// Deleivery Fee is USD 15
const getTotal = (arr, deliveryFee = 15 ) => 
    
    arr.reduce((acc, currItem) => {
        
        const {price, amount} = currItem;
        const totalPrice = parseFloat(price).toFixed(2) * amount;
        return parseFloat(acc + totalPrice);

    }, deliveryFee);





    // 1 USD  -->  0.926238 EUR
export const eurosToUsd = (amount) => parseFloat(amount / 0.926238).toFixed(2);






export const stateToLocalStorage = (key = "state", data) => {
    localStorage.setItem(key, JSON.stringify(data));
};





export const removeStateFromLocalStorage = (key = "state") => localStorage.removeItem(key);





export const getStateFromLocalStorage = (key = "state") => {

    const data = JSON.parse(localStorage.getItem(key));
    return data;
};





export const formatDate = (date) => {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = "0" + month;
    if (day.length < 2) 
        day = "0" + day;

    return [year, month, day].join("-");
};