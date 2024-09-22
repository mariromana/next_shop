import { CartItemsDTO } from '../services/dto/cart.dto';

export const calcCartItemTotalPrice = (item: CartItemsDTO): number => {
    const ingredientsPrice = item.ingredients.reduce((acc, ing) => {
        return acc + ing.price;
    }, 0);

    return (ingredientsPrice + item.productItem.price) * item.quantity;
};
