"use client";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Script from "next/script";

const foodAlertSchema = z.object({
	giveawayName: z.string().min(1, "Required"),
	orgName: z.string().min(1, "Required"),
	city: z.string().min(1, "Required"),
	address: z.string().min(1, "Required"),
	description: z.string().min(1, "Required"),
	foodType: z.enum(["veg", "nonVeg"]),
	startTime: z.string().min(1, "Required"),
	endTime: z.string().min(1, "Required"),
	slots: z.coerce.number().min(1, "Must be at least 1"),
});


export default function FoodAlertForm() {
	const [query, setQuery] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [predictions, setPredictions] = useState([]);
	const [location, setLocation] = useState(null);
	const [apiError, setApiError] = useState(null);
	const autocompleteService = useRef(null);
	const inputRef = useRef(null);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(foodAlertSchema),
	});
	const [coordinates, setCoordinates] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendCoordinatesToBackend = (lat, lng) => {
		// Implement your backend communication logic here
		console.log(`Sending coordinates to backend: ${lat}, ${lng}`);
	};

	const getLocation = () => {
		if (!navigator.geolocation) {
			setError("Geolocation is not supported by your browser");
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
				switch (error.code) {
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


	const handleCitySelect = (place) => {
		setQuery(place.description);
		setValue("city", place.description);
		setShowSuggestions(false);
	};

	const handleClickOutside = (e) => {
		if (inputRef.current && !inputRef.current.contains(e.target)) {
			setShowSuggestions(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	const onSubmit = async (data) => {
		try {
			await addDoc(collection(db, "food_alerts"), {
				...data,
				location, // Add location data
				createdAt: serverTimestamp(),
				status: "available",
			});
			//alert("Giveaway submitted successfully!");
			toast("Giveaway submitted successfully!");
			reset();
			setQuery("");
			setPredictions([]);
		} catch (error) {
			console.error("Error adding document: ", error);
			//alert("Error submitting the giveaway.");
			toast("Error submitting the giveaway.");
		}
	};

	return (
		<>
			<Script
				src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=Function.prototype`}
				strategy="afterInteractive"
				defer
				onError={(e) => {
					console.error("Failed to load Google Maps script:", e);
					setApiError("Failed to load Google Maps");
				}}
			/>
			<div className="text-black p-6 rounded-xl shadow-lg max-w-2xl mx-auto border-2 border-black">
				<ToastContainer
					position="top-right"
					autoClose={1000}
					hideProgressBar={false}
					newestOnTop={true}
					closeOnClick={false}
					rtl={false}
					theme="dark"
					transition={Slide}
				/>
				<h2 className="text-center text-2xl mb-4 font-bold">
					Food Giveaway Page
				</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label className="text-lg">Name</Label>
							<Input
								className="border-black text-black"
								{...register("giveawayName")}
							/>
							<p className="text-red-500 text-sm">
								{errors.giveawayName?.message}
							</p>
						</div>
						<div>
							<Label className="text-lg">Organizer</Label>
							<Input
								className="border-black text-black"
								{...register("orgName")}
							/>
							<p className="text-red-500 text-sm">
								{errors.orgName?.message}
							</p>
						</div>
					</div>

					<div>
						<Label className="text-lg">Address</Label>
						<Input
							className="border-black text-black"
							{...register("address")}
						/>
						<p className="text-red-500 text-sm">
							{errors.address?.message}
						</p>
					</div>

					<div>
						<Label className="text-lg">Food Type</Label>
						<RadioGroup
							className="flex space-x-4"
							onValueChange={(val) => setValue("foodType", val)}>
							<RadioGroupItem value="veg" id="veg" />
							<Label htmlFor="veg">Veg</Label>
							<RadioGroupItem value="nonVeg" id="nonVeg" />
							<Label htmlFor="nonVeg">Non-Veg</Label>
						</RadioGroup>
						<p className="text-red-500 text-sm">
							{errors.foodType?.message}
						</p>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label className="text-lg">Start Time</Label>
							<Input
								type="time"
								className="border-black text-black"
								{...register("startTime")}
							/>
						</div>
						<div>
							<Label className="text-lg">End Time</Label>
							<Input
								type="time"
								className="border-black text-black"
								{...register("endTime")}
							/>
						</div>
					</div>

					<div>
						<Label className="text-lg">No. of Slots Available</Label>
						<Input
							type="number"
							className="border-black text-black"
							{...register("slots")}
							min={1}
						/>
					</div>

					<Button
						type="submit"
						className="w-full bg-white cursor-pointer text-black border-2 border-black hover:bg-gray-300">
						{!isSubmitting ? "Start GiveAway" : "Starting..."}
					</Button>
				</form>
			</div>
		</>
	);
}
