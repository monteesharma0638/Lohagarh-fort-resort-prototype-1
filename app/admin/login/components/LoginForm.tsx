"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { redirect } from 'next/navigation';

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin");
    const {mutate: loginMutate, isPending} = useMutation({
        mutationFn: async () => {
            const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, role })
            });
        },
        onSuccess: () => {
            redirect("/admin/dashboard");
        }
    })

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
          <form onSubmit={() => loginMutate()} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  placeholder="admin@lohagarh.com" 
                  className="pl-10 h-11 transition-all focus-visible:ring-primary/20 focus-visible:border-primary"
                  required
                  data-testid="input-email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <span className="text-xs text-primary hover:underline cursor-pointer">Forgot password?</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  className="pl-10 h-11 transition-all focus-visible:ring-primary/20 focus-visible:border-primary"
                  required
                  data-testid="input-password"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Simulate Role (Mockup Only)</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Select a role to preview the different access levels once logged in.</p>
            </div>

            <Button type="submit" className="w-full h-11 font-medium mt-2 shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 transition-all" data-testid="button-login">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
  )
}
