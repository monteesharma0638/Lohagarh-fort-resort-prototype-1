"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin =  async (e: any) => {
      e.preventDefault();
      console.log("email, password, role", email, password);
      await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      }).then(res => res.json())
      .then((response) => {
        if(response.error) {
          Swal.fire({
            title: "Unable to login",
            text: response.error,
            icon: "error"
          })
        }
        else {
          Swal.fire({
            title: "Login Successfull",
            text: "Welcome to Lohagarh Group",
            icon: "success",
            showConfirmButton: false,
            timer: 1000
          })
          router.push("/admin/dashboard");
          router.refresh();
        }
      }).catch((err: any) => {
        Swal.fire({
          title: "Unable to Login.",
          text: err.message,
          icon: "error"
        })
      });
    }

  return (
      <Card className="w-[400px] shadow-xl border-border/50 bg-background/80 backdrop-blur-xl animate-in zoom-in-95 duration-500">
        <CardHeader className="space-y-3 pb-6 text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-heading text-2xl font-bold tracking-tight">Lohagarh Admin</CardTitle>
          <CardDescription>Enter your credentials to access the panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleLogin(e)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  placeholder="admin@lohagarh.com" 
                  className="pl-10 h-11 transition-all focus-visible:ring-primary/20 focus-visible:border-primary"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  data-testid="input-email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  className="pl-10 h-11 transition-all focus-visible:ring-primary/20 focus-visible:border-primary"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  data-testid="input-password"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 font-medium mt-2 shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 transition-all" data-testid="button-login">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
  )
}
