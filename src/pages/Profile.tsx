
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { User, Package, CreditCard, Heart, LogOut, Mail, Phone, MapPin } from "lucide-react";

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
}

interface RentalItem {
  id: number;
  name: string;
  image: string;
  startDate: string;
  endDate: string;
  price: number;
  status: "active" | "completed" | "pending";
}

const mockRentals: RentalItem[] = [
  {
    id: 1,
    name: "Modern Lounge Chair",
    image: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=80&w=2272&auto=format&fit=crop",
    startDate: "2023-03-10",
    endDate: "2023-04-10",
    price: 39.99,
    status: "active"
  },
  {
    id: 3,
    name: "MacBook Pro 16\"",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2626&auto=format&fit=crop",
    startDate: "2023-02-15",
    endDate: "2023-03-15",
    price: 149.99,
    status: "active"
  },
  {
    id: 6,
    name: "Bestseller Book Collection",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop",
    startDate: "2023-01-20",
    endDate: "2023-02-20",
    price: 9.99,
    status: "completed"
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    address: "",
    profileImage: ""
  });

  // Check if user is logged in and get user data
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      
      if (!loggedIn) {
        // Redirect to login if not logged in
        navigate("/login");
        return;
      }
      
      // Get current user data from localStorage
      const currentUserData = localStorage.getItem("currentUser");
      if (currentUserData) {
        try {
          const parsedUserData = JSON.parse(currentUserData);
          setUserData(parsedUserData);
        } catch (error) {
          console.error("Error parsing user data:", error);
          // Handle corrupted data by logging out
          handleLogout();
        }
      } else {
        // No user data found, redirect to login
        handleLogout();
      }
    };
    
    checkLoginStatus();
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    toast.success("Successfully logged out");
    navigate("/login");
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <nav className="mb-8">
            <ol className="flex items-center text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li className="mx-2 text-muted-foreground">/</li>
              <li className="font-medium">Profile</li>
            </ol>
          </nav>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={userData.profileImage} alt={userData.name} />
                    <AvatarFallback className="bg-primary text-white text-lg">
                      {getInitials(userData.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-medium">{userData.name}</h2>
                    <p className="text-sm text-muted-foreground">Customer</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <nav className="space-y-1">
                  <Link to="/profile" className="flex items-center space-x-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium">
                    <User className="h-5 w-5" />
                    <span>My Profile</span>
                  </Link>
                  <Link to="/profile" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                    <Package className="h-5 w-5" />
                    <span>My Rentals</span>
                  </Link>
                  <Link to="/wishlist" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                    <Heart className="h-5 w-5" />
                    <span>Wishlist</span>
                  </Link>
                  <Link to="/profile" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                    <CreditCard className="h-5 w-5" />
                    <span>Payment Methods</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </aside>
            
            {/* Main Content */}
            <div className="flex-1">
              <Tabs defaultValue="profile">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="rentals">My Rentals</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{userData.name}</p>
                          <p className="text-sm text-muted-foreground">Full Name</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{userData.email}</p>
                          <p className="text-sm text-muted-foreground">Email Address</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{userData.phone}</p>
                          <p className="text-sm text-muted-foreground">Phone Number</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{userData.address}</p>
                          <p className="text-sm text-muted-foreground">Shipping Address</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end">
                    <Button className="rounded-full">
                      Edit Profile
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="rentals" className="space-y-6">
                  <h2 className="text-xl font-medium mb-4">Current & Past Rentals</h2>
                  
                  {mockRentals.length > 0 ? (
                    <div className="space-y-4">
                      {mockRentals.map((rental) => (
                        <Card key={rental.id} className={`overflow-hidden ${
                          rental.status === "completed" ? "bg-muted/50" : ""
                        }`}>
                          <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-32 sm:h-32 h-48 overflow-hidden">
                              <img 
                                src={rental.image} 
                                alt={rental.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <CardContent className="flex-1 p-4">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                <div>
                                  <h3 className="font-medium">{rental.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {rental.startDate} to {rental.endDate}
                                  </p>
                                  <p className="mt-2">${rental.price.toFixed(2)}/week</p>
                                </div>
                                
                                <div className="mt-3 sm:mt-0 sm:text-right">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    rental.status === "active" 
                                      ? "bg-green-100 text-green-800" 
                                      : rental.status === "completed" 
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}>
                                    {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                                  </span>
                                  
                                  <div className="mt-4 space-x-2">
                                    <Button variant="outline" size="sm" className="rounded-full">
                                      View Details
                                    </Button>
                                    
                                    {rental.status === "active" && (
                                      <Button size="sm" className="rounded-full">
                                        Extend Rental
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg border">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No rentals yet</h3>
                      <p className="text-muted-foreground mt-1 mb-6">
                        You haven't rented any items yet.
                      </p>
                      <Link to="/">
                        <Button className="rounded-full">
                          Browse Products
                        </Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
