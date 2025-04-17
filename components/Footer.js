import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className="bg-white fixed bottom-0 text-gray-800 px-5 py-3 w-full">
			<div className="flex items-center justify-between">
				<div className="flex justify-center items-center">
					<Image
						src="/logo.png"
						alt="Waste2Plate Logo"
						width={120}
						height={60}
					/>
				</div>
				<div>
					<ul className="flex gap-4">
						<li className="mr-3">
							<span>
								&copy; Waste2Plate. All rights reserved.
							</span>
						</li>
						<li>
							<Link href="https://github.com">Github</Link>
						</li>
						<li>
							<Link href="https://linkedin.com">LinkedIn</Link>
						</li>
						<li>
							<Link href="https://instagram.com">Instagram</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
