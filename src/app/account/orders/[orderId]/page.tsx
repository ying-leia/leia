import Link from 'next/link';

// Placeholder order details data
const order = {
  id: 'order_1',
  date: '2024-06-01',
  total: '$120.00',
  items: [
    { name: 'Product A', quantity: 2, price: '$40.00' },
    { name: 'Product B', quantity: 1, price: '$40.00' },
  ],
  invoiceUrl: 'https://stripe.com/invoice/sample.pdf', // Placeholder
};

export default function OrderDetailsPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Link href="/account" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Order History</Link>
      <h1 className="text-2xl font-bold mb-2">Order Details</h1>
      <div className="mb-4 text-gray-700">Order placed: {order.date}</div>
      <div className="mb-4 text-gray-700">Order total: {order.total}</div>
      <h2 className="text-xl font-semibold mb-2">Items</h2>
      <ul className="mb-6">
        {order.items.map((item, idx) => (
          <li key={idx} className="border-b py-2 flex justify-between">
            <span>{item.name} (x{item.quantity})</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
      <a
        href={order.invoiceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Invoice (PDF)
      </a>
    </div>
  );
} 