"use client";
import React from "react";
import Link from "next/link";
import Extension from "@/components/extension";

const page = () => {
	return (
		<div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
			<main className="container mx-auto px-4 py-12">
				<section className="text-center mb-16">
					<h2 className="text-4xl font-bold text-gray-800 mb-4">
						Discover Free Food Near You
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Connect with local food providers or find hungry
						customers. FoodAlert brings fresh food options right to
						your fingertips!
					</p>
				</section>

				{/* Added background container */}
				<div className="relative max-w-4xl mx-auto">
					{/* Content */}
					<div className="relative z-10 grid md:grid-cols-2 gap-8 p-6">
						{/* Consumer Card */}
						<div className="bg-white rounded-lg shadow-lg overflow-hidden backdrop-blur-sm">
							<div className="p-6">
								<h3 className="text-2xl font-bold text-gray-800 mb-3">
									Are you a Consumer?
								</h3>
								<p className="text-gray-600 mb-6">
									Discover local food deals, special offers,
									and fresh meals delivered to your doorstep.
								</p>
								<button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
									<Link href="/login">Get In</Link>
								</button>
							</div>
						</div>

						{/* Provider Card */}
						<div className="bg-white rounded-lg shadow-lg overflow-hidden backdrop-blur-sm">
							<div className="p-6">
								<h3 className="text-2xl font-bold text-gray-800 mb-3">
									Are you a Provider?
								</h3>
								<p className="text-gray-600 mb-6">
									Reach more customers, reduce food waste, and
									grow your food business with our platform.
								</p>
								<button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
									<Link href="/login">Get In</Link>
								</button>
							</div>
						</div>
					</div>
				</div>

				<Extension />
			</main>
		</div>

		

		
	);
};

export default page;
