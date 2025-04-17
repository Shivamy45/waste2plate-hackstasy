"use client";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useState } from "react";
import { auth, db } from "../firebase/config";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginForm() {
	const [isSignup, setIsSignup] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("giver");
	const router = useRouter();

	const handleSubmit = async () => {
		try {
			let userCredential;
			if (isSignup) {
				userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);

				// store role in Firestore
				await setDoc(doc(db, "users", userCredential.user.uid), {
					email,
					role,
				});
			} else {
				userCredential = await signInWithEmailAndPassword(
					auth,
					email,
					password
				);
			}

			// Fetch role to redirect
			const userRef = doc(db, "users", userCredential.user.uid);
			const userSnap = await getDoc(userRef);
			const userData = userSnap.data();

			// Redirect based on role
			if (userData?.role === "giver") {
				router.push("/dashboard");
			} else {
				router.push("/user-page");
			}
		} catch (err) {
			//alert(err.message);
			toast(err.message);
		}
	};

	return (
		<div className="p-4 border rounded w-full max-w-sm space-y-4">
			<h2 className="text-lg font-semibold">
				{isSignup ? "Sign Up" : "Login"}
			</h2>
			
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
			<input
				type="email"
				placeholder="Email"
				className="border p-2 w-full"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				className="border p-2 w-full"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			{isSignup && (
				<div className="space-y-2">
					<p className="text-sm font-medium">Select Role:</p>
					<label className="flex items-center gap-2">
						<input
							type="radio"
							value="giver"
							checked={role === "giver"}
							onChange={() => setRole("giver")}
						/>
						Giver (Restaurant, Store)
					</label>
					<label className="flex items-center gap-2">
						<input
							type="radio"
							value="receiver"
							checked={role === "receiver"}
							onChange={() => setRole("receiver")}
						/>
						Receiver (Needy)
					</label>
				</div>
			)}

			<button
				className="bg-blue-600 text-white w-full p-2"
				onClick={handleSubmit}>
				{isSignup ? "Sign Up" : "Login"}
			</button>

			<p className="text-center text-sm">
				{isSignup ? "Already have an account?" : "New here?"}{" "}
				<button
					className="text-blue-600 underline"
					onClick={() => setIsSignup(!isSignup)}>
					{isSignup ? "Login" : "Sign Up"}
				</button>
			</p>
		</div>
	);
}
