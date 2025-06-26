import Link from 'next/link';

// Placeholder order data
const orders = [
  {
    id: 'order_1',
    date: '2024-06-01',
    total: '$120.00',
  },
  {
    id: 'order_2',
    date: '2024-05-15',
    total: '$80.00',
  },
];

export default function AccountOrderHistoryPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border rounded p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">Order placed: {order.date}</div>
              <div className="text-gray-500">Total: {order.total}</div>
            </div>
            <Link href={`/account/orders/${order.id}`} className="text-blue-600 hover:underline">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 