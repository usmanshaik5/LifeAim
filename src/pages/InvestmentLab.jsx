import { useState } from "react";

const products = [
    {
        id: 1,
        name: "Ashwagandha Capsules",
        price: 799,
        image:
            "https://plus.unsplash.com/premium_photo-1672941426599-44cc7bc767b9?q=80&w=996&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "Triphala Powder",
        price: 499,
        image:
            "https://plus.unsplash.com/premium_photo-1668487826871-2f2cac23ad56?q=80&w=1112&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Neem Tablets",
        price: 599,
        image:
            "https://images.unsplash.com/photo-1678945253323-f21bd7f13817?q=80&w=735&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "Immunity Booster Syrup",
        price: 999,
        image:
            "https://plus.unsplash.com/premium_photo-1671886498603-a71f79861aa8?q=80&w=1332&auto=format&fit=crop",
    },
];

export default function InvestmentLab() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-gray-50 to-gray-100">

            {/* Header */}
            <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                        Investment Lab
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Premium Ayurvedic Wellness Collection
                    </p>
                </div>

                {/* Cart Badge */}
                <div className="relative">
                    <div className="bg-white shadow-lg px-6 py-3 rounded-full text-sm font-medium">
                        🛒 Cart
                        <span className="ml-2 bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
                            {cart.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden"
                    >
                        {/* Image */}
                        <div className="h-56 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {product.name}
                            </h3>

                            <p className="mt-2 text-2xl font-bold text-green-600">
                                ₹{product.price}
                            </p>

                            <button
                                onClick={() => addToCart(product)}
                                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold tracking-wide hover:scale-105 transition transform duration-300"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
