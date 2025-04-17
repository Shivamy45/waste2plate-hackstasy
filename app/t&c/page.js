import React from 'react'

const page = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-pink-600">Waste2Plate Terms & Conditions</h1>
      <p className="mb-6 text-sm text-gray-500">Last Updated: 17 March 2023</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Introduction</h2>
        <p>
          By using the Waste2Plate Application, you agree to all terms & conditions
          and acknowledge your responsibility to check for updates regularly. If you do not
          agree with these terms, please do not use the Application.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Use of the Application</h2>
        <p>
          The app provides alerts about free food available on university campuses to
          reduce food waste and address hunger.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Conditions</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Eligibility:</strong> Must be 18 or older.</li>
          <li><strong>Rules:</strong> Follow all posted rules and event host instructions.</li>
          <li><strong>Inherent Risks:</strong> You assume all risks including allergies, dietary issues, and foodborne illness.</li>
          <li><strong>Accuracy:</strong> Hosts are responsible for alert accuracy. Waste2Plate is not liable for inaccuracies.</li>
          <li><strong>Privacy:</strong> Your data is handled according to our Privacy Policy.</li>
          <li><strong>Governing Law:</strong> Governed by laws of Florida, USA.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Disclaimer & Liability</h2>
        <p>
          The app is provided “as is.” Waste2Plate disclaims all warranties and is not liable
          for any damages arising from use.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Indemnification</h2>
        <p>
          You agree to defend and hold harmless Waste2Plate and its affiliates from any claims
          or liabilities related to your use of the Application.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Intellectual Property</h2>
        <p>
          All app content belongs to Waste2Plate. You may not use or reproduce content without
          permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Privacy Policy</h2>
        <p>
          Your personal data (e.g., email, name) is used to provide services and improve the app.
          Data may be shared with service providers and affiliates under certain conditions.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Security</h2>
        <p>
          We strive to protect your data but cannot guarantee 100% security over the internet.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Children’s Privacy</h2>
        <p>
          The service is not intended for users under 13. If such data is found, it will be deleted.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Changes</h2>
        <p>
          Terms and the privacy policy may change. Continued use means you accept these updates.
        </p>
      </section>

      <footer className="text-sm text-gray-600 mt-10">
        <p>
          Built on open-source Odoo CE and uses Pexels for imagery under the Pexels License.
        </p>
      </footer>
    </div>
  )
}

export default page
