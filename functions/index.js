const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.updateFoodAlertStatus = functions.pubsub
	.schedule("every 10 minutes")
	.onRun(async () => {
		const now = new Date();

		try {
			const snapshot = await db.collection("food_alerts").get();
			const batch = db.batch();

			snapshot.forEach((doc) => {
				const data = doc.data();
				const alertTime = new Date(data.timestamp);

				let newStatus =
					alertTime > now
						? "unavailable"
						: alertTime < now
						? "expired"
						: "available";

				if (data.status !== newStatus) {
					batch.update(doc.ref, { status: newStatus });
				}
			});

			await batch.commit();
			console.log("✅ Food alert statuses updated.");
		} catch (error) {
			console.error("🔥 Error updating food alerts:", error);
		}

		return null;
	});
