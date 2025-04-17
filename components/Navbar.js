"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaBell } from "react-icons/fa";
import { useRouter } from "next/navigation";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    // Function to navigate to the home page when the logo is clicked
    const navigateHome = () => {
        router.push("/");
    };

    return (
		<nav className="flex items-center justify-between px-5 py-2">
			{/* Logo Section */}
			<div>
				<Image
					onClick={navigateHome}
					src="/logo.png"
					alt="Logo"
					width={120}
					height={80}
					className="cursor-pointer"
				/>
			</div>

			{/* Navigation Menu */}
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link href="/" legacyBehavior passHref>
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}>
								Home
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="https://chat.whatsapp.com/HnCutFbUzJ4LUlkbRiF1Qz" legacyBehavior passHref>
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}>
								Join Us
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<a href="/faq.pdf"
          download>
							FAQs
							
						</a>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/t&c" legacyBehavior passHref>
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}>
								Terms & Condition
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			{/* Notification Icon */}
			<div className="flex gap-4 justify-center items-center">
				<div className="rounded-3xl p-2 cursor-pointer border-2">
					<FaBell size={21} />
				</div>
				<button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
					<Link href="/login">Login</Link>
				</button>
			</div>
		</nav>
	);
};

export default Navbar;