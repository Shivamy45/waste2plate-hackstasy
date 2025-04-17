// app/api/distance/route.js
export async function POST(req) {
	const body = await req.json();
	const { origin, destination } = body;

	const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Secure API key in .env

	const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (data?.rows?.[0]?.elements?.[0]?.status === "OK") {
			return new Response(
				JSON.stringify({
					distance: data.rows[0].elements[0].distance.text,
				}),
				{ status: 200 }
			);
		} else {
			return new Response("Failed to fetch distance", { status: 500 });
		}
	} catch (error) {
		console.error("Server error:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
