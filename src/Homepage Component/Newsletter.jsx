import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("text-green-600");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter a valid email.");
      setColor("text-red-600");
    } else {
      setMessage("✅ Thank you for subscribing!");
      setColor("text-green-600");
      setEmail("");
    }
  };

  return (
    <section className="text-center p-8 bg-blue-300 rounded-lg max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold">Subscribe to Our Travel Newsletter</h2>
      <p className="text-gray-600 mt-2">
        Get exclusive deals and travel tips directly to your inbox!
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 justify-center mt-4"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-2/3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-orange-600"
        >
          Subscribe
        </button>
      </form>

      {message && (
        <p className={`${color} font-semibold mt-4`}>{message}</p>
      )}
    </section>
  );
}
