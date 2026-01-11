'use client';

// ✅ FIX: Absolute Path Imports
import { useChat } from '@/context/ChatContext';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Users, Timer, ArrowRight, Sparkles, TrendingDown } from 'lucide-react';

export default function DealCard() {
  const { suggestedDeal } = useChat();
  const [loading, setLoading] = useState(false);

  if (!suggestedDeal) return null;

  const handleCreateGroup = async () => {
    setLoading(true);
    try {
      await api.post('/groups/create', {
        productName: suggestedDeal.productName,
        category: suggestedDeal.category || 'electronics',
        originalPrice: suggestedDeal.originalPrice || suggestedDeal.price * 1.2,
        currentPrice: suggestedDeal.price,
        targetPrice: suggestedDeal.price,
        targetMembers: suggestedDeal.targetMembers,
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

  const original = suggestedDeal.originalPrice || suggestedDeal.price * 1.2;
  const savings = Math.round(((original - suggestedDeal.price) / original) * 100);

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
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
        <h2 className="text-2xl font-bold text-white mb-1 leading-tight">{suggestedDeal.productName}</h2>
        <div className="flex items-end gap-3 mb-6">
          <div>
            <p className="text-gray-500 text-sm line-through mb-0.5">${Math.round(original)}</p>
            <p className="text-4xl font-extrabold text-white tracking-tight">${suggestedDeal.price}</p>
          </div>
        </div>
        <button
          onClick={handleCreateGroup}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg"
        >
          {loading ? 'Creating...' : 'Launch Group Buy'}
        </button>
      </div>
    </div>
  );
}
