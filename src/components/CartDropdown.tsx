interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDropdown({ isOpen: _isOpen, onClose: _onClose }: CartDropdownProps) {
  return <div>Cart functionality is now handled by Shopify integration.</div>;
} 