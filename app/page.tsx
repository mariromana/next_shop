import {
    Container,
    Title,
    TopBar,
    Filters,
    ProductList,
} from '@/components/shared';

export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <Title text="All pizzas" size="lg" className="font-extrabold" />
            </Container>
            <TopBar />

            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px] ">
                    <div className="w-[250px]">
                        <Filters />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductList
                                title="Pizzas"
                                categoryId={1}
                                items={[
                                    {
                                        id: 1,
                                        name: 'Cheese burger',
                                        price: 20,
                                        imageUrl:
                                            'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?t=st=1725267784~exp=1725271384~hmac=744a419caef0b6fa6fc0d80d3a17059631484f28a3f82b8308a463035aa3bb0d&w=1060',
                                        items: [{ price: 40 }],
                                    },
                                    {
                                        id: 2,
                                        name: 'Cheese burger',
                                        price: 20,
                                        imageUrl:
                                            'https://images.unsplash.com/photo-1576458088443-04a19bb13da6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        items: [{ price: 40 }],
                                    },
                                    {
                                        id: 3,
                                        name: 'Cheese burger',
                                        price: 20,
                                        imageUrl:
                                            'https://images.unsplash.com/photo-1576458088443-04a19bb13da6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        items: [{ price: 40 }],
                                    },
                                    {
                                        id: 4,
                                        name: 'Cheese burger',
                                        price: 20,
                                        imageUrl:
                                            'https://images.unsplash.com/photo-1576458088443-04a19bb13da6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        items: [{ price: 40 }],
                                    },
                                ]}
                            />
                            <ProductList
                                title="Breakfast"
                                categoryId={2}
                                items={[
                                    {
                                        id: 5,
                                        name: 'Cheese burger',
                                        price: 20,
                                        imageUrl:
                                            'https://images.unsplash.com/photo-1576458088443-04a19bb13da6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        items: [{ price: 40 }],
                                    },
                                    {
                                        id: 6,
                                        name: 'Cheese burger',
                                        price: 20,
                                        imageUrl:
                                            'https://images.unsplash.com/photo-1576458088443-04a19bb13da6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        items: [{ price: 40 }],
                                    },
                                    {
                                        id: 7,
                                        name: 'Cheese burger',
                                        price: 20,
                                        imageUrl:
                                            'https://images.unsplash.com/photo-1576458088443-04a19bb13da6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        items: [{ price: 40 }],
                                    },
                                    {
                                        id: 8,
                                        name: 'Cheese burger',
                                        price: 20,
                                        imageUrl:
                                            'https://images.unsplash.com/photo-1576458088443-04a19bb13da6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        items: [{ price: 40 }],
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
