import {
    Container,
    Title,
    TopBar,
    Filters,
    ProductList,
} from '@/shared/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    items: true,
                    ingredients: true,
                },
            },
        },
    });

    return (
        <>
            <Container className="mt-10">
                <Title text="All pizzas" size="lg" className="font-extrabold" />
            </Container>
            <TopBar
                categories={categories.filter(
                    (elem) => elem.products.length > 0
                )}
            />

            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px] ">
                    <div className="w-[250px]">
                        <Filters />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map(
                                (category) =>
                                    category.products.length > 0 && (
                                        <ProductList
                                            key={category.id}
                                            items={category.products}
                                            title={category.name}
                                            categoryId={category.id}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
