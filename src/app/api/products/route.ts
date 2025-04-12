import { NextResponse } from 'next/server';

const products = [
    {
        "id": 1,
        "name": "Luxurious Red Lipstick",
        "price": 25.99,
        "description": "A bold and long-lasting lipstick for the perfect red pout.",
        "imageUrl": "https://picsum.photos/id/237/200/300",
        "category": "Lipsticks"
    },
    {
        "id": 2,
        "name": "Hydrating Face Mask",
        "price": 12.50,
        "description": "Deeply moisturizes and rejuvenates skin for a radiant complexion.",
        "imageUrl": "https://picsum.photos/id/238/200/300",
        "category": "Face Masks"
    },
    {
        "id": 3,
        "name": "Precision Black Eyeliner",
        "price": 18.75,
        "description": "Create sharp and defined lines with this smudge-proof eyeliner.",
        "imageUrl": "https://picsum.photos/id/239/200/300",
        "category": "Eyeliners"
    },
    {
        "id": 4,
        "name": "Shimmering Nail Polish Set",
        "price": 32.00,
        "description": "A collection of vibrant and chip-resistant nail polishes with a shimmering finish.",
        "imageUrl": "https://picsum.photos/id/240/200/300",
        "category": "Nail Polishes"
    },
    {
        "id": 5,
        "name": "Velvet Touch Blush",
        "price": 22.50,
        "description": "Add a natural flush of color to your cheeks with this silky smooth blush.",
        "imageUrl": "https://picsum.photos/id/241/200/300",
        "category": "Blushes"
    },
    {
        "id": 6,
        "name": "Flawless Finish Foundation",
        "price": 39.99,
        "description": "Achieve a smooth and even complexion with this lightweight foundation.",
        "imageUrl": "https://picsum.photos/id/242/200/300",
        "category": "Foundations"
    },
    {
        "id": 7,
        "name": "Brightening Concealer",
        "price": 19.25,
        "description": "Instantly conceal dark circles and imperfections with this creamy concealer.",
        "imageUrl": "https://picsum.photos/id/243/200/300",
        "category": "Concealers"
    },
    {
        "id": 8,
        "name": "Radiant Bronzer",
        "price": 28.00,
        "description": "Create a sun-kissed glow with this blendable and buildable bronzer.",
        "imageUrl": "https://picsum.photos/id/244/200/300",
        "category": "Bronzers"
    },
    {
        "id": 9,
        "name": "Luminous Highlighter",
        "price": 24.75,
        "description": "Add a touch of radiance to your complexion with this shimmering highlighter.",
        "imageUrl": "https://picsum.photos/id/245/200/300",
        "category": "Highlighters"
    },
    {
        "id": 10,
        "name": "Long-Lasting Setting Spray",
        "price": 15.50,
        "description": "Keep your makeup in place all day with this weightless setting spray.",
        "imageUrl": "https://picsum.photos/id/246/200/300",
        "category": "Setting Sprays"
    },
    {
        "id": 11,
        "name": "Matte Liquid Lipstick",
        "price": 27.99,
        "description": "A highly pigmented liquid lipstick that dries to a comfortable matte finish.",
        "imageUrl": "https://picsum.photos/id/247/200/300",
        "category": "Lipsticks"
    },
    {
        "id": 12,
        "name": "Detoxifying Clay Mask",
        "price": 13.00,
        "description": "Draws out impurities and minimizes pores for clearer skin.",
        "imageUrl": "https://picsum.photos/id/248/200/300",
        "category": "Face Masks"
    },
    {
        "id": 13,
        "name": "Waterproof Gel Eyeliner",
        "price": 20.00,
        "description": "A long-wearing gel eyeliner that glides on smoothly and stays put.",
        "imageUrl": "https://picsum.photos/id/249/200/300",
        "category": "Eyeliners"
    },
    {
        "id": 14,
        "name": "Holographic Nail Polish",
        "price": 35.00,
        "description": "Create a mesmerizing effect with this color-shifting holographic nail polish.",
        "imageUrl": "https://picsum.photos/id/250/200/300",
        "category": "Nail Polishes"
    },
    {
        "id": 15,
        "name": "Baked Mineral Blush",
        "price": 25.00,
        "description": "A natural-looking blush with a subtle shimmer for a healthy glow.",
        "imageUrl": "https://picsum.photos/id/251/200/300",
        "category": "Blushes"
    },
    {
        "id": 16,
        "name": "Full Coverage Cream Foundation",
        "price": 42.00,
        "description": "A luxurious cream foundation that provides full coverage with a dewy finish.",
        "imageUrl": "https://picsum.photos/id/252/200/300",
        "category": "Foundations"
    },
    {
        "id": 17,
        "name": "Color Correcting Concealer Palette",
        "price": 22.00,
        "description": "A palette of color correcting concealers to neutralize discoloration and even out skin tone.",
        "imageUrl": "https://picsum.photos/id/253/200/300",
        "category": "Concealers"
    },
    {
        "id": 18,
        "name": "Contour Bronzer Stick",
        "price": 30.00,
        "description": "A creamy bronzer stick for sculpting and defining your facial features.",
        "imageUrl": "https://picsum.photos/id/254/200/300",
        "category": "Bronzers"
    },
    {
        "id": 19,
        "name": "Iridescent Body Highlighter",
        "price": 26.00,
        "description": "A shimmering body highlighter to add a luminous glow to your skin.",
        "imageUrl": "https://picsum.photos/id/255/200/300",
        "category": "Highlighters"
    },
    {
        "id": 20,
        "name": "Makeup Finishing Spray",
        "price": 17.00,
        "description": "A fine mist that sets your makeup and extends its wear time.",
        "imageUrl": "https://picsum.photos/id/256/200/300",
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
