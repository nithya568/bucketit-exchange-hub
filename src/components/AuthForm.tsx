
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

// Define form schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type AuthFormProps = {
  type: "login" | "register";
};

export const AuthForm = ({ type }: AuthFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Create form
  const form = useForm({
    resolver: zodResolver(type === "login" ? loginSchema : registerSchema),
    defaultValues: type === "login"
      ? { email: "", password: "", rememberMe: false }
      : { name: "", email: "", password: "", confirmPassword: "", terms: false },
  });

  // Form submission handler
  const onSubmit = (values: any) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      if (type === "login") {
        // In a real app, we would validate credentials with an API
        // For now, check if the user exists in localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u: any) => u.email === values.email);
        
        if (user && user.password === values.password) {
          localStorage.setItem("currentUser", JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone || "+1 (555) 123-4567",
            address: user.address || "123 Main St, Apt 4B, New York, NY 10001",
            profileImage: ""
          }));
          localStorage.setItem("isLoggedIn", "true");
          toast.success("Successfully logged in");
          navigate("/profile");
        } else {
          toast.error("Invalid email or password");
          return;
        }
      } else {
        // Registration
        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        
        // Check if email already exists
        if (users.some((user: any) => user.email === values.email)) {
          toast.error("Email already in use");
          return;
        }
        
        // Create new user object
        const newUser = {
          id: Date.now(),
          name: values.name,
          email: values.email,
          password: values.password,
          phone: "+1 (555) 123-4567", // Default values
          address: "123 Main St, Apt 4B, New York, NY 10001",
          profileImage: ""
        };
        
        // Add to users array and save
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        
        // Set current user and logged in state
        localStorage.setItem("currentUser", JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          address: newUser.address,
          profileImage: ""
        }));
        localStorage.setItem("isLoggedIn", "true");
        
        toast.success("Account created successfully");
        navigate("/profile");
      }
    }, 1500);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg border shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        {type === "login" ? "Sign In" : "Create an Account"}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {type === "register" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {type === "register" && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {type === "login" ? (
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal cursor-pointer">
                      Remember me
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Button variant="link" className="p-0 h-auto text-sm font-normal">
                Forgot password?
              </Button>
            </div>
          ) : (
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal cursor-pointer">
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          )}

          <Button
            type="submit"
            className="w-full rounded-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                {type === "login" ? "Signing in..." : "Creating account..."}
              </>
            ) : (
              <>{type === "login" ? "Sign In" : "Create Account"}</>
            )}
          </Button>

          <div className="text-center text-sm">
            {type === "login" ? (
              <p>
                Don't have an account?{" "}
                <a href="/register" className="text-primary hover:underline font-medium">
                  Create one
                </a>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-primary hover:underline font-medium">
                  Sign In
                </a>
              </p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
