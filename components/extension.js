import React from 'react';

const Extension = () => {
  return (
    <div className="bg-orange-50 text-gray-800 min-h-screen p-4 dow-lg overflow-hidden backdrop-blur-sm shadow-lg">
      {/* Main quote */}
      <div className="border-2 border-orange-300 bg-white rounded-lg p-6 mb-8 shadow-lg">
        <h1 className="text-3xl font-handwriting text-center">
          "You hate food waste. So do we. Let's fix it together."
        </h1>
      </div>

      {/* Four steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="border-2 border-orange-300 bg-white rounded-lg p-4 shadow-lg">
          <h3 className="text-center font-handwriting mb-4 text-xl">SIGN UP</h3>
          <p className="font-handwriting text-base">
            Whether you're a student, a professional, or just someone who cares about reducing food waste, join us and save food.
          </p>
        </div>

        <div className="border-2 border-orange-300 bg-white rounded-lg p-4 shadow-lg">
          <h3 className="text-center font-handwriting mb-4 text-xl">VERIFY EMAILS</h3>
          <p className="font-handwriting text-base">
            Check your inbox to confirm your email and activate your account. Once verified, you'll start receiving updates on available free food near you.
          </p>
        </div>

        <div className="border-2 border-orange-300 bg-white rounded-lg p-4 shadow-lg">
          <h3 className="text-center font-handwriting mb-4 text-xl">RECEIVE ALERTS</h3>
          <p className="font-handwriting text-base">
            Set up email and mobile notifications to get real-time updates on available free food in your area.
          </p>
        </div>

        <div className="border-2 border-orange-300 bg-white rounded-lg p-4 shadow-lg">
          <h3 className="text-center font-handwriting mb-4 text-xl">PICKUP FOOD</h3>
          <p className="font-handwriting text-base">
            End food waste by picking up free food at or by collecting surplus food from participating locations, events, and businesses.
          </p>
        </div>
      </div>

      {/* Help end hunger section */}
      <div className="border-2 border-orange-300 bg-white mx-auto max-w-md p-6 mb-8 shadow-lg">
        <h2 className="text-2xl font-handwriting text-center">HELP SAVE FOOD TODAY</h2>
      </div>
    </div>
  );
};

// Add this to your CSS to simulate handwritten font
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');

  .font-handwriting {
    font-family: 'Caveat', cursive;
  }
`;

export default Extension;