import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { createGroup } from '../../api/groups';
import toast from 'react-hot-toast';
import { Tag, Users, Clock } from 'lucide-react';

const DealCard = () => {
  const { suggestedDeal } = useChat();
  const [loading, setLoading] = useState(false);

  if (!suggestedDeal) return null;

  const handleCreate = async () => {
    setLoading(true);
    try {
      // API call matching Backend Schema
      await createGroup({
        productName: suggestedDeal.productName,
        category: suggestedDeal.category || 'electronics',
        originalPrice: suggestedDeal.price * 1.2,
        currentPrice: suggestedDeal.price,
        targetPrice: suggestedDeal.price,
        targetMembers: suggestedDeal.targetMembers,
        dealExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      });
      toast.success("Group Created Successfully! 🚀");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deal-card animate-in">
      <div className="deal-header">
        <span className="badge-ai"><Tag size={12}/> AI Suggested</span>
        <span className="badge-discount">20% OFF</span>
      </div>
      
      <h2>{suggestedDeal.productName}</h2>
      
      <div className="price-row">
        <span className="old-price">${Math.round(suggestedDeal.price * 1.2)}</span>
        <span className="new-price">${suggestedDeal.price}</span>
      </div>

      <div className="deal-stats">
        <div className="stat">
          <Users size={16} /> <span>{suggestedDeal.targetMembers} Members</span>
        </div>
        <div className="stat">
          <Clock size={16} /> <span>24h Left</span>
        </div>
      </div>

      <button onClick={handleCreate} disabled={loading} className="btn btn-full btn-gradient">
        {loading ? "Creating..." : "Launch Group Buy 🚀"}
      </button>
    </div>
  );
};
export default DealCard;
