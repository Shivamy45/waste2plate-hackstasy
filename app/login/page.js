"use client";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../firebase/config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function LoginPage() {
	const [isSignup, setIsSignup] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("giver");
	const router = useRouter();

	const handleSubmit = async () => {
		try {
			let userCredential;

			if (isSignup) {
				// Signup flow
				userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				await setDoc(doc(db, "users", userCredential.user.uid), {
					email,
					role,
				});
			} else {
				// Login flow
				userCredential = await signInWithEmailAndPassword(
					auth,
					email,
					password
				);
			}

			// Get user role from Firestore
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
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
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
			<div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
				<h1 className="text-2xl font-bold text-center">
					{isSignup ? "Sign Up" : "Login"}
				</h1>

				<input
					type="email"
					placeholder="Email"
					className="border p-2 w-full rounded"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					className="border p-2 w-full rounded"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				{isSignup && (
					<div className="space-y-2">
						<label className="block text-sm font-medium">
							Select Role:
						</label>
						<label className="flex items-center gap-2">
							<input
								type="radio"
								name="role"
								value="giver"
								checked={role === "giver"}
								onChange={() => setRole("giver")}
							/>
							Giver (Restaurant, Store)
						</label>
						<label className="flex items-center gap-2">
							<input
								type="radio"
								name="role"
								value="receiver"
								checked={role === "receiver"}
								onChange={() => setRole("receiver")}
							/>
							Receiver (Needy Individual)
						</label>
					</div>
				)}

				<button
					onClick={handleSubmit}
					className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition">
					{isSignup ? "Sign Up" : "Login"}
				</button>

				<p className="text-sm text-center">
					{isSignup
						? "Already have an account?"
						: "Don't have an account?"}{" "}
					<button
						onClick={() => setIsSignup(!isSignup)}
						className="text-blue-600 underline">
						{isSignup ? "Login here" : "Sign up here"}
					</button>
				</p>
			</div>
		</div>
	);
}
