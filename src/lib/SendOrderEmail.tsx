export const generateOrderEmailHTML = (order: any, user: any) => {
  const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;
  console.log("order details", order);
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>New Order Received: ${order.orderId}</h2>
      <p><strong>Date:</strong> ${new Date(
        order.timestamp
      ).toLocaleString()}</p>
      
      <h3>Customer Details</h3>
      <ul>
        <li><strong>Name:</strong> ${user.name}</li>
        <li><strong>Email:</strong> ${user.email}</li>
        <li><strong>Phone:</strong> ${user.phone}</li>
        <li><strong>Address:</strong> ${user.address.line1}, ${
    user.address.city
  }, ${user.address.state} - ${user.address.pincode}, ${
    user.address.country
  }</li>
      </ul>

      <h3>Items</h3>
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items
            .map(
              (item) => `
            <tr>
              <td>
  <a href="${item.uploadedImageUrl}" target="_blank" rel="noopener noreferrer">
    <img src="${item.uploadedImageUrl}" alt="${
                item.title
              }" width="50" height="50"/>
  </a>
</td>

              <td>${item.title}</td>
              <td>${item.quantity}</td>
              <td>${formatCurrency(item.price)}</td>
              <td>${formatCurrency(item.price * item.quantity)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <h3>Summary</h3>
      <ul>
        <li><strong>Subtotal:</strong> ${formatCurrency(order.total)}</li>
        ${
          order.couponCode
            ? `<li><strong>Coupon:</strong> ${order.couponCode}</li>`
            : ""
        }
        ${
          order.personalNote
            ? `<li><strong>Note:</strong> ${order.personalNote}</li>`
            : ""
        }
      </ul>

      <p><strong>Payment Status:</strong> ${order.status}</p>
    </div>
  `;
};
