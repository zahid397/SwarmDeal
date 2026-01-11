'use client';
import { useChat } from '@/context/ChatContext';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
export default function DealCard() {
  const { suggestedDeal } = useChat();
  if (!suggestedDeal) return null;
  const createGroup = async () => {
    try {
      await api.post('/groups/create', {
        productName: suggestedDeal.productName,
        category: suggestedDeal.category || 'electronics',
        originalPrice: suggestedDeal.price * 1.2,
        currentPrice: suggestedDeal.price,
        targetPrice: suggestedDeal.price,
        targetMembers: suggestedDeal.targetMembers,
        dealExpiresAt: new Date(Date.now() + 86400000)
      });
      toast.success('Group Created!');
    } catch { toast.error('Creation Failed'); }
  };
  return (
    <div className="p-4 bg-gray-800 rounded-xl border border-purple-500 mt-4">
      <h3 className="text-xl font-bold">{suggestedDeal.productName}</h3>
      <p className="text-green-400 font-bold text-2xl">${suggestedDeal.price}</p>
      <button onClick={createGroup} className="w-full mt-4 py-2 bg-purple-600 rounded">Create Group</button>
    </div>
  );
}
