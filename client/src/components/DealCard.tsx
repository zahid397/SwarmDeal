'use client';

import { useChat } from '@/context/ChatContext';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Tag, Users, Timer, ArrowRight, Sparkles, TrendingDown } from 'lucide-react';

export default function DealCard() {
  const { suggestedDeal } = useChat();
  const [loading, setLoading] = useState(false);

  // যদি AI কোনো ডিল না দেয়, তাহলে কার্ড দেখাবে না (Hidden)
  if (!suggestedDeal) return null;

  const handleCreateGroup = async () => {
    setLoading(true);
    try {
      // ✅ 1. Backend Schema অনুযায়ী ডাটা পাঠানো হচ্ছে
      await api.post('/groups/create', {
        productName: suggestedDeal.productName,
        category: suggestedDeal.category || 'electronics',
        originalPrice: suggestedDeal.originalPrice || suggestedDeal.price * 1.2, // Fake original for demo
        currentPrice: suggestedDeal.price,
        targetPrice: suggestedDeal.price,
        targetMembers: suggestedDeal.targetMembers,
        // ✅ 2. 24 ঘণ্টা সময় দেওয়া হচ্ছে ডিল এক্সপায়ার হওয়ার জন্য
        dealExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        description: `AI generated group buy for ${suggestedDeal.productName}`
      });

      toast.success('Group Created Successfully! 🚀');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  // Savings Calculation
  const original = suggestedDeal.originalPrice || suggestedDeal.price * 1.2;
  const savings = Math.round(((original - suggestedDeal.price) / original) * 100);

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Badge */}
      <div className="bg-purple-600/20 border-b border-purple-500/20 p-3 flex justify-between items-center">
        <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
          <Sparkles size={16} />
          <span>AI Suggested Deal</span>
        </div>
        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-bold border border-green-500/30">
          {savings}% OFF
        </span>
      </div>

      <div className="p-6">
        {/* Product Title */}
        <h2 className="text-2xl font-bold text-white mb-1 leading-tight">
          {suggestedDeal.productName}
        </h2>
        <p className="text-gray-400 text-sm mb-6">Category: {suggestedDeal.category || 'General'}</p>

        {/* Price Section */}
        <div className="flex items-end gap-3 mb-6">
          <div>
            <p className="text-gray-500 text-sm line-through mb-0.5">
              ${Math.round(original)}
            </p>
            <p className="text-4xl font-extrabold text-white tracking-tight">
              ${suggestedDeal.price}
            </p>
          </div>
          <div className="flex items-center gap-1 text-green-400 text-sm font-medium mb-2 bg-green-400/10 px-2 py-1 rounded">
            <TrendingDown size={16} />
            <span>Save ${Math.round(original - suggestedDeal.price)}</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-md text-blue-400">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Target Group</p>
              <p className="font-bold text-white">{suggestedDeal.targetMembers} People</p>
            </div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex items-center gap-3">
            <div className="bg-orange-500/20 p-2 rounded-md text-orange-400">
              <Timer size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Expires In</p>
              <p className="font-bold text-white">24 Hours</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleCreateGroup}
          disabled={loading}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
        >
          <span className="relative z-10 flex justify-center items-center gap-2">
            {loading ? (
              'Creating Group...'
            ) : (
              <>
                Launch Group Buy <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
