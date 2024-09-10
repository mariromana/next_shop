import { Ingredient } from '@prisma/client';
import React from 'react';
import { Api } from '@/services/api-client';
export const useIngredients = () => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        async function getIngredients() {
            try {
                setLoading(true);
                const ingredient = await Api.ingredients.getAll();
                setIngredients(ingredient);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getIngredients();
    }, []);

    return {
        ingredients,
        loading,
    };
};
