import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className=" bg-[#392B60] text-white flex items-center mt-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <h1 className=" text-3xl md:text-5xl font-bold text-white mb-6">
          StockPilot: <span className="text-[#e5857b]">Inventory Mastery</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-base md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto"
        >
          Revolutionize your inventory management with real-time tracking, intelligent insights, and seamless control.
        </motion.p>

        <div className="flex justify-center space-x-6">
          <Link to="/inventory">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#e5857b] text-white md:px-8 md:py-3 px-4 py-2 rounded-lg shadow-lg hover:bg-[#e5867be0] transition flex items-center"
            >
              <BarChart className="mr-2" /> Manage Inventory
            </motion.button>
          </Link>

          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-[#e5857b] text-white md:px-8 md:py-3 px-5 py-[6px] rounded-lg hover:bg-[#e5867be0] transition flex items-center"
            >
              <Warehouse className="mr-2" /> Learn More
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Rest of the component remains the same */}
    </div>
  );
};

export default HomePage;