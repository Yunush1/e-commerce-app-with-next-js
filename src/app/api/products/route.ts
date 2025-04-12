import { NextResponse } from 'next/server';

const products = [
    {
        "id": 1,
        "name": "Luxurious Red Lipstick",
        "price": 25.99,
        "description": "A bold and long-lasting lipstick for the perfect red pout.",
        "imageUrl": "https://m.media-amazon.com/images/I/71w3oGhZMYL._AC_UF400,400_QL80_.jpg",
        "category": "Lipsticks"
    },
    {
        "id": 2,
        "name": "Hydrating Face Mask",
        "price": 12.50,
        "description": "Deeply moisturizes and rejuvenates skin for a radiant complexion.",
        "imageUrl": "https://m.media-amazon.com/images/I/71z3kpMAYsL._AC_SY450_.jpg",
        "category": "Face Masks"
    },
    {
        "id": 3,
        "name": "Precision Black Eyeliner",
        "price": 18.75,
        "description": "Create sharp and defined lines with this smudge-proof eyeliner.",
        "imageUrl": "https://m.media-amazon.com/images/I/71pWzhdypcL._AC_UL640_QL65_ML3_.jpg",
        "category": "Eyeliners"
    },
    {
        "id": 4,
        "name": "Shimmering Nail Polish Set",
        "price": 32.00,
        "description": "A collection of vibrant and chip-resistant nail polishes with a shimmering finish.",
        "imageUrl": "https://m.media-amazon.com/images/I/61sbMiUnoGL._AC_UL480_QL65_ML3_.jpg",
        "category": "Nail Polishes"
    },
    {
        "id": 5,
        "name": "Velvet Touch Blush",
        "price": 22.50,
        "description": "Add a natural flush of color to your cheeks with this silky smooth blush.",
        "imageUrl": "https://m.media-amazon.com/images/I/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
        "category": "Blushes"
    },
    {
        "id": 6,
        "name": "Flawless Finish Foundation",
        "price": 39.99,
        "description": "Achieve a smooth and even complexion with this lightweight foundation.",
        "imageUrl": "https://m.media-amazon.com/images/I/51eg5OLwL5L._AC_UL640_QL65_ML3_.jpg",
        "category": "Foundations"
    },
    {
        "id": 7,
        "name": "Brightening Concealer",
        "price": 19.25,
        "description": "Instantly conceal dark circles and imperfections with this creamy concealer.",
        "imageUrl": "https://m.media-amazon.com/images/I/61pHnJ96oPL._AC_UL640_QL65_ML3_.jpg",
        "category": "Concealers"
    },
    {
        "id": 8,
        "name": "Radiant Bronzer",
        "price": 28.00,
        "description": "Create a sun-kissed glow with this blendable and buildable bronzer.",
        "imageUrl": "https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SX679_.jpg",
        "category": "Bronzers"
    },
    {
        "id": 9,
        "name": "Luminous Highlighter",
        "price": 24.75,
        "description": "Add a touch of radiance to your complexion with this shimmering highlighter.",
        "imageUrl": "https://m.media-amazon.com/images/I/71HblAHs5xL._AC_UY879_-2.jpg",
        "category": "Highlighters"
    },
    {
        "id": 10,
        "name": "Long-Lasting Setting Spray",
        "price": 15.50,
        "description": "Keep your makeup in place all day with this weightless setting spray.",
        "imageUrl": "https://m.media-amazon.com/images/I/71z3kpMAYsL._AC_UY226_.jpg",
        "category": "Setting Sprays"
    },
    {
        "id": 11,
        "name": "Matte Liquid Lipstick",
        "price": 27.99,
        "description": "A highly pigmented liquid lipstick that dries to a comfortable matte finish.",
        "imageUrl": "https://www.sephora.com/productimages/sku/s2575122-av-02-zoom.jpg",
        "category": "Lipsticks"
    },
    {
        "id": 12,
        "name": "Detoxifying Clay Mask",
        "price": 13.00,
        "description": "Draws out impurities and minimizes pores for clearer skin.",
        "imageUrl": "https://www.sephora.com/productimages/sku/s2633558-av-01-zoom.jpg",
        "category": "Face Masks"
    },
    {
        "id": 13,
        "name": "Waterproof Gel Eyeliner",
        "price": 20.00,
        "description": "A long-wearing gel eyeliner that glides on smoothly and stays put.",
        "imageUrl": "https://www.sephora.com/productimages/sku/s2264542-av-01-zoom.jpg",
        "category": "Eyeliners"
    },
    {
        "id": 14,
        "name": "Holographic Nail Polish",
        "price": 35.00,
        "description": "Create a mesmerizing effect with this color-shifting holographic nail polish.",
        "imageUrl": "https://www.sephora.com/productimages/sku/s2099592-av-01-zoom.jpg",
        "category": "Nail Polishes"
    },
    {
        "id": 15,
        "name": "Baked Mineral Blush",
        "price": 25.00,
        "description": "A natural-looking blush with a subtle shimmer for a healthy glow.",
        "imageUrl": "https://www.sephora.com/productimages/sku/s1343826-av-03-zoom.jpg",
        "category": "Blushes"
    },
    {
        "id": 16,
        "name": "Full Coverage Cream Foundation",
        "price": 42.00,
        "description": "A luxurious cream foundation that provides full coverage with a dewy finish.",
        "imageUrl": "https://www.sephora.com/productimages/sku/s2523543-av-01-zoom.jpg",
        "category": "Foundations"
    },
    {
        "id": 17,
        "name": "Color Correcting Concealer Palette",
        "price": 22.00,
        "description": "A palette of color correcting concealers to neutralize discoloration and even out skin tone.",
        "imageUrl": "https://www.sephora.com/productimages/sku/s2279607-av-01-zoom.jpg",
        "category": "Concealers"
    },
    {
        "id": 18,
        "name": "Contour Bronzer Stick",
        "price": 30.00,
        "description": "A creamy bronzer stick for sculpting and defining your facial features.",
        "imageUrl": "https://www.sephora.com/productimages/sku/s2345480-av-01-zoom.jpg",
        "category": "Bronzers"
    },
    {
        "id": 19,
        "name": "Iridescent Body Highlighter",
        "price": 26.00,
        "description": "A shimmering body highlighter to add a luminous glow to your skin.",
        "imageUrl": "https://www.sephora.com/productimages/sku/s2153133-av-01-zoom.jpg",
        "category": "Highlighters"
    },
    {
        "id": 20,
        "name": "Makeup Finishing Spray",
        "price": 17.00,
        "description": "A fine mist that sets your makeup and extends its wear time.",
        "imageUrl": "https://www.sephora.com/productimages/sku/s2062640-av-01-zoom.jpg",
        "category": "Setting Sprays"
    }
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const category = searchParams.get('category')

    let filteredProducts = [...products];

    if (category) {
        filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }

    if (limit) {
        filteredProducts = filteredProducts.slice(0, parseInt(limit));
    }

    return NextResponse.json(filteredProducts);
}
