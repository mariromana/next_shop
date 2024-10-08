import React from 'react';
import { Filters } from './use-filters';
import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useDeepCompareEffect } from 'react-use';
export const useQueryFilters = (filter: Filters) => {
    const isMounted = React.useRef(false);
    const router = useRouter();
    useDeepCompareEffect(() => {
        if (isMounted.current) {
            const params = {
                ...filter.prices,
                pizzaTypes: Array.from(filter.pizzaTypes),
                sizes: Array.from(filter.sizes),
                ingredients: Array.from(filter.selectedId),
            };
            const queryString = qs.stringify(params, { arrayFormat: 'comma' });

            router.push(`?${queryString}`, { scroll: false });
        }
        isMounted.current = true;
    }, [filter]);
};
