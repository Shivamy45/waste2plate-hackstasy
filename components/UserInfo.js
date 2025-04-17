"use client";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function UserInfo() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
		});

		return () => unsubscribe(); // cleanup
	}, []);

	const handleLogout = async () => {
		await signOut(auth);
		alert("Logged out!");
	};

	if (!user) return <div>Please log in</div>;

	return (
		<div className="p-4 border rounded max-w-md space-y-2">
			<p>
				Welcome, <strong>{user.displayName || user.email}</strong>
			</p>
			<button
				onClick={handleLogout}
				className="bg-gray-700 text-white px-4 py-2 rounded">
				Logout
			</button>
		</div>
	);
}
