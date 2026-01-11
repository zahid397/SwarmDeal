Deal/DealCard.jsx

import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { createGroup } from '../../api/groups';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';

const DealCard = () => {
const { suggestedDeal } = useChat();
const [loading, setLoading] = useState(false);

if (!suggestedDeal) return null;

const handleCreate = async () => {
setLoading(true);
try {
await createGroup({
productName: suggestedDeal.productName,
category: suggestedDeal.category || 'general',
originalPrice: suggestedDeal.price * 1.2,
currentPrice: suggestedDeal.price,
targetPrice: suggestedDeal.price,
targetMembers: suggestedDeal.targetMembers,
dealExpiresAt: new Date(Date.now() + 86400000)
});
toast.success("Group Created Successfully!");
} catch {
toast.error("Failed to create group");
} finally {
setLoading(false);
}
};

return (
<div className="deal-card">
<div className="deal-header">
<span className="badge">AI Suggestion</span>
<h3>{suggestedDeal.productName}</h3>
</div>
<div className="deal-body">
<div className="price-section">
<span className="price">{formatCurrency(suggestedDeal.price)}</span>
<span className="members">{suggestedDeal.targetMembers} Members needed</span>
</div>
</div>
<button onClick={handleCreate} disabled={loading} className="btn btn-full">
{loading ? "Creating..." : "Launch Group Buy"}
</button>
</div>
);
};
export default DealCard;
