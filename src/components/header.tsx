'use client';

import React, {useState, useContext, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Icons} from '@/components/icons';
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CartContext } from '@/context/CartContext';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { WishlistContext } from '@/context/WishlistContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { signOut} from "firebase/auth";
import {useToast} from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const categories = [
    {
        id: 1,
        name: 'Lipsticks',
        imageUrl: 'https://m.media-amazon.com/images/I/71w3oGhZMYL._AC_UF400,400_QL80_.jpg',
        subcategories: ['Matte', 'Glossy', 'Long-lasting']
    },
    {
        id: 2,
        name: 'Face Masks',
        imageUrl: 'https://m.media-amazon.com/images/I/71z3kpMAYsL._AC_SY450_.jpg',
        subcategories: ['Hydrating', 'Clay', 'Sheet Masks']
    },
    {
        id: 3,
        name: 'Eyeliners',
        imageUrl: 'https://m.media-amazon.com/images/I/71pWzhdypcL._AC_UL640_QL65_ML3_.jpg',
        subcategories: ['Liquid', 'Pencil', 'Gel']
    },
    {
        id: 4,
        name: 'Nail Polishes',
        imageUrl: 'https://m.media-amazon.com/images/I/61sbMiUnoGL._AC_UL480_QL65_ML3_.jpg',
        subcategories: ['Shimmer', 'Matte', 'Gel']
    },
    {
        id: 5,
        name: 'Blushes',
        imageUrl: 'https://m.media-amazon.com/images/I/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
        subcategories: ['Powder', 'Cream', 'Liquid']
    },
    {
        id: 6,
        name: 'Foundations',
        imageUrl: 'https://m.media-amazon.com/images/I/51eg5OLwL5L._AC_UL640_QL65_ML3_.jpg',
        subcategories: ['Liquid', 'Cream', 'Powder']
    },
    {
        id: 7,
        name: 'Concealers',
        imageUrl: 'https://m.media-amazon.com/images/I/61pHnJ96oPL._AC_UL640_QL65_ML3_.jpg',
        subcategories: ['Liquid', 'Cream', 'Stick']
    },
    {
        id: 8,
        name: 'Bronzers',
        imageUrl: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SX679_.jpg',
        subcategories: ['Powder', 'Cream', 'Stick']
    },
    {
        id: 9,
        name: 'Highlighters',
        imageUrl: 'https://m.media-amazon.com/images/I/71HblAHs5xL._AC_UY879_-2.jpg',
        subcategories: ['Powder', 'Cream', 'Liquid']
    },
    {
        id: 10,
        name: 'Setting Sprays',
        imageUrl: 'https://m.media-amazon.com/images/I/71z3kpMAYsL._AC_UY226_.jpg',
        subcategories: ['Matte', 'Dewy', 'Long-lasting']
    },
];

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
    const isMobile = useIsMobile();
    const { authUser, loading, signOut: authSignOut,googleSignIn } = useAuth();
    const { toast } = useToast()
    const [authError, setAuthError] = useState<Error | null>(null);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      router.push(`/search?q=${searchQuery}`);
    }
  };

    useEffect(() => {
        if (loading) {
            return; // Do nothing while loading
        }
        if (!authUser) {
            // Redirect to signin page if not authenticated
            return;
        }
    }, [authUser, loading, router]);

    useEffect(() => {
        if (authError) {
            toast({
                variant: "destructive",
                title: "Auth Error",
                description: authError.message
            })
        }
    }, [authError, toast]);

  const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            toast({
                title: "Google Sign-in successful!",
                description: "You have successfully signed in with Google.",
            });
            router.push('/profile');
        } catch (error: any) {
            setAuthError(error);
            toast({
                variant: "destructive",
                title: "Google Sign-in error",
                description: error.message
            });
        }
    };


  const handleSignOut = async () => {
    try {
      await authSignOut();
      toast({
          title: "Signed out",
          description: "You have been signed out successfully",
      })
      router.push('/');
    } catch (error: any) {
        setAuthError(error);
        toast({
            variant: "destructive",
            title: "Sign out error",
            description: error.message
        })
    }
  };

  const avatarFallbackName = "Test User"
  return (
    <header className="bg-[#A04E95] p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-4 text-white">
          {isMobile ? (
              <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-white">
                          <Icons.menu className="h-5 w-5" />
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64">
                      <div className="py-4">
                          <Button variant="ghost" onClick={() => router.push('/')} className="w-full justify-start">
                              ShopWave
                          </Button>
                          <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="text-white w-full justify-start">
                                      Categories
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56" align="start" forceMount>
                                  <DropdownMenuItem onClick={() => router.push('/categories')}>
                                      All Categories
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {categories.map(category => (
                                      <DropdownMenuItem key={category.id} onClick={() => router.push(`/category/${category.name}`)}>
                                          {category.name}
                                      </DropdownMenuItem>
                                  ))}
                              </DropdownMenuContent>
                          </DropdownMenu>
                          <Button variant="ghost" onClick={() => router.push('/buy-now')} className="w-full justify-start">
                              Buy Now
                          </Button>
                      </div>
                  </SheetContent>
              </Sheet>
          ) : (
              <>
                  <Button variant="ghost" onClick={() => router.push('/')}>
                      ShopWave
                  </Button>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="text-white">
                              Categories
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start" forceMount>
                          <DropdownMenuItem onClick={() => router.push('/categories')}>
                              All Categories
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {categories.map(category => (
                              <DropdownMenuItem key={category.id} onClick={() => router.push(`/category/${category.name}`)}>
                                  {category.name}
                              </DropdownMenuItem>
                          ))}
                      </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="ghost" onClick={() => router.push('/buy-now')}>
                      Buy Now
                  </Button>
              </>
          )}
      </div>

      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-64"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
       {/* Cart Icon with Badge */}
       <div className="relative">
          <Link href="/cart">
            <Icons.shoppingCart className="h-6 w-6 cursor-pointer text-white" />
            {cartItems.length > 0 && (
              <span className="cart-count-badge">{cartItems.length}</span>
            )}
          </Link>
        </div>

         {/* Wishlist Icon */}
         <div className="relative">
           <Link href="/wishlist">
             <Heart className="h-6 w-6 cursor-pointer text-white" />
             {wishlistItems.length > 0 && (
               <span className="cart-count-badge">{wishlistItems.length}</span>
             )}
           </Link>
         </div>

      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Avatar className="h-8 w-8">
            {authUser ? (
                <AvatarImage src={authUser.photoURL || "https://picsum.photos/id/11/50/50"} alt={authUser.displayName || "Avatar"} />
            ) : null}
            <AvatarFallback>{avatarFallbackName[0]}{avatarFallbackName[1]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
          {loading ? (
              <DropdownMenuItem>Loading...</DropdownMenuItem>
          ) : authUser ? (
              <>
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                      <Icons.user className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem onClick={handleGoogleSignIn}>
                         <span>Sign In with Google</span>
                     </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                      <Icons.logout className="mr-2 h-4 w-4"/>
                      <span>Sign Out</span>
                  </DropdownMenuItem>
              </>
          ) : (
              <>
                  <DropdownMenuItem onClick={() => router.push('/signin')}>
                      <Icons.user className="mr-2 h-4 w-4" />
                      <span>Sign In</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/signup')}>
                      <Icons.add className="mr-2 h-4 w-4" />
                      <span>Sign Up</span>
                  </DropdownMenuItem>
              </>
          )}

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icons.settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icons.share className="mr-2 h-4 w-4" />
          <span>Share</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icons.help className="mr-2 h-4 w-4" />
          <span>Help</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
         <DropdownMenuItem>
          <Icons.externalLink className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
         <DropdownMenuItem disabled>
          <Icons.trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </header>
  );
};

export default Header;
