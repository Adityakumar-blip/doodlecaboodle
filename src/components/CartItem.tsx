interface CartItem {
  id: string;
  artworkId: string;
  title: string;
  artistName: string;
  price: number;
  quantity: number;
  size: {
    name: string;
    width: number;
    height: number;
    length: number;
    unit: string;
    priceAdjustment: number;
  };
  uploadedImageUrl: string;
  timestamp: number;
}

const CartItem = ({
  item,
  removeFromCart,
}: {
  item: CartItem;
  removeFromCart: (id: string) => Promise<void>;
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
          <img
            src={item.uploadedImageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-sm font-poppins font-medium text-gray-900">
            {item.title}
          </h4>
          <p className="text-xs text-gray-500">{item.artistName}</p>
          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
          {item.size?.name && (
            <p className="text-xs text-gray-500">Size: {item.size.name}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end space-y-1">
        <span className="text-sm font-medium">
          ₹{(item.price * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-xs text-pastel-pink hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
