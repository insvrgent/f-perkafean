// // cartItems.js

// const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// export const addToCart = (newItem) => {
//     const { id, price, qty } = newItem;
//     const existingItem = cartItems.find(item => item.id === id);

//     if (!existingItem) {
//         cartItems.push({ id, price, qty });
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     }
// };

// export const deleteFromCart = (itemId) => {
//     const index = cartItems.findIndex(item => item.id === itemId);
//     if (index !== -1) {
//         cartItems.splice(index, 1);
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     }
// };

// export const edit = (newItem) => {
//     const { id, price, qty } = newItem;
//     console.log(qty);
//     const index = cartItems.findIndex(item => item.id === id);
//     if (index !== -1) {
//         cartItems.splice(index, 1);

//         cartItems.push({ id, price, qty });
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     }
//     else addToCart(newItem);
// };

// export const checkItem = (itemId) => {
//     return cartItems.some(item => item.id === itemId);
// };

// export const getAll = () => {
//     return cartItems.map(item => item.id);
// };

// export const getItemById = (itemId) => {
//     const index = cartItems.findIndex(item => item.id === itemId);
//     if (index !== -1) {
//         return cartItems.find(item => item.id === itemId).qty;
//     }
//     return 1;
// };

// export const getLength = () => {
//     return cartItems.length;
// };

// export const getItemPrice = (itemId) => {
//     const item = cartItems.find(item => item.id === itemId);
//     return item ? item.price : 0;
// };

// export const getTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
// };