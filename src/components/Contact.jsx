import React from 'react';

const Contact = () => {
    return (
        <section className="py-10 flex items-center justify-center min-h-screen bg-[#392B60]">
            <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
                    <h2 className="text-indigo-600 font-manrope text-3xl md:text-4xl font-semibold leading-10 mb-8 text-center">
                        Send Us A Message
                    </h2>
                    <form className="space-y-6">
                        <input
                            type="text"
                            className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-4"
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-4"
                            placeholder="Email"
                        />
                        <input
                            type="tel"
                            className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-4"
                            placeholder="Phone"
                        />
                        <textarea
                            rows="1"
                            className="w-full text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-4"
                            placeholder="Message"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-300 hover:bg-indigo-800 bg-indigo-600 shadow-sm"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
