import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState, useEffect } from "react";

interface UserDetails {
  name: string;
  email: string;
  senderPhone: string;
  receiverPhone: string;
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
}

const CheckoutForm = ({
  userDetails,
  setUserDetails,
  onProceed,
  loading,
}: {
  userDetails: UserDetails;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
  onProceed: () => Promise<void>;
  loading: boolean;
}) => {
  const [error, setError] = useState<string | null>(null);
  console.log("user details", userDetails);
  // Debounce function to limit API calls
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch city and state from Zippopotam.us API
  const fetchLocation = async (pincode: string) => {
    if (!pincode || pincode.length !== 6) {
      setError(null);
      return;
    }

    try {
      const response = await fetch(`http://api.zippopotam.us/in/${pincode}`);
      if (response.ok) {
        const data = await response.json();
        if (data.places && data.places.length > 0) {
          setUserDetails({
            ...userDetails,
            address: {
              ...userDetails.address,
              city: data.places[0]["place name"],
              state: data.places[0].state,
              pincode,
            },
          });
          setError(null);
        } else {
          setError("Invalid pincode");
        }
      } else {
        setError("Invalid pincode");
      }
    } catch (err) {
      setError("Error fetching location");
    }
  };

  // Debounced version of fetchLocation
  const debouncedFetchLocation = debounce(fetchLocation, 500);

  // Handle pincode change
  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPincode = e.target.value;
    setUserDetails({
      ...userDetails,
      address: { ...userDetails.address, pincode: newPincode },
    });
    debouncedFetchLocation(newPincode);
  };

  // Validate form
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;
    return (
      userDetails.name.trim().length >= 2 &&
      emailRegex.test(userDetails.email) &&
      phoneRegex.test(userDetails.senderPhone) &&
      userDetails.address.line1.trim().length >= 5 &&
      userDetails.address.city.trim().length >= 2 &&
      userDetails.address.state.trim().length >= 2 &&
      pincodeRegex.test(userDetails.address.pincode) &&
      userDetails.address.country === "India"
    );
  };

  console.log(validateForm());

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Shipping Details</h3>
      <div className="space-y-2">
        <Label htmlFor="pincode">Pincode</Label>
        <Input
          id="pincode"
          value={userDetails.address.pincode}
          onChange={handlePincodeChange}
          placeholder="400001"
        />
        {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
      </div>
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={userDetails.address.city}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              address: { ...userDetails.address, city: e.target.value },
            })
          }
          placeholder="Mumbai"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Input
          id="state"
          value={userDetails.address.state}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              address: { ...userDetails.address, state: e.target.value },
            })
          }
          placeholder="Maharashtra"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address Line 1</Label>
        <Input
          id="address"
          value={userDetails.address.line1}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              address: { ...userDetails.address, line1: e.target.value },
            })
          }
          placeholder="123 Main Street"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={userDetails.name}
          onChange={(e) =>
            setUserDetails({ ...userDetails, name: e.target.value })
          }
          placeholder="John Doe"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
          placeholder="john.doe@example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="senderPhone">Sender Phone</Label>
        <Input
          id="senderPhone"
          value={userDetails.senderPhone}
          onChange={(e) =>
            setUserDetails({ ...userDetails, senderPhone: e.target.value })
          }
          placeholder="Enter Sender's Phone"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="receiverPhone">Receiver Phone</Label>
        <Input
          id="receiverPhone"
          value={userDetails.receiverPhone}
          onChange={(e) =>
            setUserDetails({ ...userDetails, receiverPhone: e.target.value })
          }
          placeholder="Enter Receiver's Phone"
        />
      </div>
      <Button
        className="w-full bg-primary hover:bg-primary/90 text-white"
        onClick={onProceed}
        disabled={!validateForm() || loading}
      >
        {loading ? "Processing..." : "Proceed to Payment"}
      </Button>
    </div>
  );
};

export default CheckoutForm;
