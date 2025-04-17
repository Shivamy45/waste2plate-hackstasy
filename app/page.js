"use client";
import React ,{useState,useEffect}from "react";
import Link from "next/link";
import Extension from "@/components/extension";

const page = () => {
	const [coordinates, setCoordinates] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

  const sendCoordinatesToBackend = (lat, lng) => {
    // Implement your backend communication logic here
    console.log(`Sending coordinates to backend: ${lat}, ${lng}`);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Set coordinates in state
        setCoordinates({ lat, lng });
        
        // Call the function that will be used to communicate with backend
        sendCoordinatesToBackend(lat, lng);
        
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setError("Location permission denied");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information unavailable");
            break;
          case error.TIMEOUT:
            setError("Location request timed out");
            break;
          default:
            setError("An unknown error occurred");
        }
      },
      { enableHighAccuracy: true }
    );
  };

  // Use useEffect to call getLocation when the component mounts
  useEffect(() => {
    getLocation();
  }, []);
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
