export const generateOrderEmailHTML = (order: any, user: any) => {
  const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;
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

              <td>${item.title ?? "Custom Order"}</td>
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

export const generateThankYouEmailHTML = (order: any, user: any) => {
  const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;
  const orderUrl = `${window.location.origin}/order/${order.orderId}`;

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #4CAF50;">🛍 Thank You for Your Purchase!</h2>
      <p>Hi <strong>${user.name}</strong>,</p>
      <p>Thank you for buying <strong>${
        order.items[0]?.title || "XYZ"
      }</strong> from us!</p>
      <p>We’re excited to let you know that your order has been confirmed and we’re getting it ready with love and care. 💝</p>
      
      <hr style="margin: 20px 0;">
      
      <h3>🧾 Order Summary</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Order ID:</strong> ${order.orderId}</li>
        <li><strong>Amount Paid:</strong> ${formatCurrency(order.total)}</li>
      </ul>
      
      <p style="margin: 20px 0;">
        👉 <a href="${
          order.viewOrderUrl || "#"
        }" style="color: #2196F3; text-decoration: none;">View Order Details</a>
      </p>
      
      <p>If you have any questions or need help, feel free to reach out to our support team:</p>
      <ul>
        <li>Email: <a href="mailto:doodlecaboodle08@gmail.com">doodlecaboodle08@gmail.com</a></li>
        <li>Phone: <a href="tel:+917985315979">+91 7985315979</a></li>
      </ul>
      
      <p>We're always happy to assist!</p>
      
      <p style="margin-top: 30px;">Warm regards,<br><strong>Team doodle Caboodle</strong></p>
    </div>
  `;
};
