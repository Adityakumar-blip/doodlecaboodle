import React, { createContext, useContext, useState, useEffect } from "react";

// Define the User type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  preferences: {
    theme: string;
    notifications: boolean;
  };
}

// Define the context value type
interface UserContextType {
  user: any | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  loading: boolean;
  isAuthenticated: boolean;
}

// Create User Context with default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// User Provider Component
const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Storage utility with localStorage fallback
  const storage = {
    getItem: (key: string): string | null => {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.warn("localStorage not available:", error);
        return null;
      }
    },
    setItem: (key: string, value: string): void => {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.warn("Could not save to localStorage:", error);
      }
    },
    removeItem: (key: string): void => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn("Could not remove from localStorage:", error);
      }
    },
  };

  // Load user from localStorage on component mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = storage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser) as User;
          console.log("parsed user", parsedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        // Clear corrupted data
        storage.removeItem("userData");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = (userData: User) => {
    setUser(userData);
    storage.setItem("userData", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    storage.removeItem("userData");
  };

  // Update user function
  const updateUser = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    storage.setItem("userData", JSON.stringify(updatedUser));
  };

  const value: UserContextType = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
