"use client";
import FoodAlertCard from "@/components/FoodAlertCard";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDistance } from "geolib";

const Page = () => {
	const [alerts, setAlerts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [userLocation, setUserLocation] = useState(null);

	// Auth listener
	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			console.log(currentUser);
		});
		return () => unsubscribe();
	}, []);

	// Update user location in Firestore
	const updateUserLocation = (latitude, longitude) => {
		if (!user?.uid) return;

		const userDocRef = doc(db, "users", user.uid);
		updateDoc(userDocRef, {
			location: { latitude, longitude },
		})
			.then(() => console.log("User location updated"))
			.catch((error) => console.error("Error updating location:", error));
	};

	// Get user's current location
	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setUserLocation({ latitude, longitude });
					updateUserLocation(latitude, longitude);
				},
				(error) => console.error("Error getting location:", error),
				{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
			);
		}
	}, []);
	// Fetch food alerts and calculate distances
	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, "food_alerts"),
			(snapshot) => {
				const fetchedAlerts = snapshot.docs
					.map((doc) => {
						const data = doc.data();
						let distance = null;

						if (userLocation && data.location) {
							try {
								const distInMeters = getDistance(userLocation, {
									latitude: data.location.latitude,
									longitude: data.location.longitude,
								});
								distance = distInMeters / 1000; // km
							} catch (err) {
								console.error("Distance calc error:", err);
							}
						}

						return {
							id: doc.id,
							...data,
							distance,
						};
					})
					.filter((alert) => {
						const now = new Date();
						console.log(alert.distance, alert.status);
						return (
							alert.distance !== null &&
							alert.distance <= 5 &&
							alert.status === "available"
						);
					});


				setAlerts(fetchedAlerts);
				setLoading(false);
			},
			(error) => {
				console.error("Error fetching food alerts:", error);
				setLoading(false);
			}
		);
		return () => unsubscribe();
	}, [userLocation]);

	if (loading) return <p className="text-center mt-10">Loading...</p>;

	return (
		<div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{alerts.length === 0 ? (
				<p className="col-span-full text-center">
					No food alerts available.
				</p>
			) : (
				alerts.map((alert) => (
					<FoodAlertCard
						key={alert.id}
						alert={alert}
						userLocation={userLocation}
					/>
				))
			)}
		</div>
	);
};

export default Page;
