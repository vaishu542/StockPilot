import React from 'react';
import { motion } from 'framer-motion';
import {
    Database,
    BarChart2,
    Truck,
    Layers,
    Award,
    Target
} from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-[#392B60] text-white py-16">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-4"
            >
                <div className="text-center mb-16 ">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        About <span className="text-[#e5857b]">StockPilot</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Empowering businesses with cutting-edge inventory management solutions that transform complexity into clarity.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="bg-[#4a4066] p-8 rounded-xl shadow-lg"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#e5857b] mb-6 flex items-center">
                            <Layers className="mr-4 text-[#e5867be8]" /> Our Mission
                        </h2>
                        <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                        StockPilot is dedicated to simplifying inventory management through intelligent technology. We believe in providing businesses with powerful, intuitive tools that enable precise tracking, optimization, and strategic decision-making.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="bg-[#4a4066] p-8 rounded-xl shadow-lg"
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#e5857b] mb-6 flex items-center">
                            <Target className="mr-4 text-[#e5857b]" /> Our Vision
                        </h2>
                        <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                            To revolutionize inventory management by creating a platform that seamlessly integrates advanced analytics, real-time tracking, and user-friendly design, enabling businesses of all sizes to optimize their supply chain.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-16 grid md:grid-cols-3 gap-8"
                >
                    <div className="bg-[#4a4066] p-6 rounded-xl shadow-md text-center">
                        <Database className="mx-auto text-[#e5857b] mb-4" size={60} />
                        <h3 className="text-xl font-semibold text-[#e5857b] mb-2">Comprehensive Data</h3>
                        <p className="text-gray-200">Advanced tracking and recording of inventory data</p>
                    </div>

                    <div className="bg-[#4a4066] p-6 rounded-xl shadow-md text-center">
                        <BarChart2 className="mx-auto text-[#e5857b] mb-4" size={60} />
                        <h3 className="text-xl font-semibold text-[#e5857b] mb-2">Smart Analytics</h3>
                        <p className="text-gray-200">Powerful insights and predictive reporting</p>
                    </div>

                    <div className="bg-[#4a4066] p-6 rounded-xl shadow-md text-center">
                        <Truck className="mx-auto text-[#e5857b] mb-4" size={60} />
                        <h3 className="text-xl font-semibold text-[#e5857b] mb-2">Supply Chain</h3>
                        <p className="text-gray-200">Streamlined inventory and logistics management</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default About;