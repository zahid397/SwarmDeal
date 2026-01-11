import ChatBox from '@/components/ChatBox';
import DealCard from '@/components/DealCard';
export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div><h1 className="text-4xl font-bold mb-4">SwarmDeal</h1><DealCard /></div>
      <div><ChatBox /></div>
    </div>
  );
}
