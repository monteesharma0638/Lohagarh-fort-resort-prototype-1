"use client";
import LoginForm from "./components/LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 w-full h-[40vh] bg-gradient-to-b from-primary/10 to-transparent -z-10" />
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-blue-500/5 blur-3xl -z-10" />
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
      {/* <LoginForm /> */}
    </div>
  );
}