'use client';

import React, {useState, useContext} from 'react';
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

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useContext(CartContext);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  const avatarFallbackName = "Test User"
  return (
    <header className="bg-secondary p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.push('/')}>
          ShopWave
        </Button>
        <Button variant="ghost" onClick={() => router.push('/categories')}>
          Categories
        </Button>
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
            <Icons.shoppingCart className="h-6 w-6 cursor-pointer" />
            {cartItems.length > 0 && (
              <span className="cart-count-badge">{cartItems.length}</span>
            )}
          </Link>
        </div>

      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://picsum.photos/id/11/50/50" alt="Avatar" />
            <AvatarFallback>{avatarFallbackName[0]}{avatarFallbackName[1]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem>
          <Icons.user className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
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
