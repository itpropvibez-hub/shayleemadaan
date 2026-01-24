"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const propertyTypes = ["Residential", "Commercial", "Industrial", "Land"];

export default function ContactSection() {
  const [open, setOpen] = useState(false);
  
  // Logic for Time Slots
  const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9 AM to 8 PM

  const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const { 
    register, 
    handleSubmit, 
    setValue, 
    watch, 
    reset, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      propertyPlan: [] as string[],
      timeSlot: "3 PM",
      budget: "",
      remarks: ""
    }
  });
    
    const selectedTypes = watch("propertyPlan");
  
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      // Stringify objects/arrays so the backend can parse them easily
      formData.append(key, typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]);
    });
    
    try {
      const response = await fetch('/api/callback', {
        method: 'POST',
        body: formData, // Send the FormData directly
      });
  
      const result = await response.json();
  
      if (result.success) {
        setIsModalOpen(true);
        reset();
      } else {
        alert("Error: " + (result.error || "Failed to send."));
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* WhatsApp Section */}
      <div>
        <h3 className="text-xl font-semibold text-primary">Direct WhatsApp</h3>
        <p className="text-foreground/70 mt-1">For a quick response, chat with me directly.</p>
        <Button variant="link" asChild className="text-primary p-0 h-auto mt-2 text-base font-semibold group/link">
          <Link href="https://wa.me/9871424020" target="_blank">
            Start a Chat <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </Button>
      </div>

      <Separator />

      {/* Callback Section */}
      <div>
        <h3 className="text-xl font-semibold text-primary">Give Me a Call</h3>
        <p className="text-foreground/70 mt-1">Prefer to talk? I'm available during business hours.</p>
        <Button variant="link" asChild className="text-primary p-0 h-auto mt-2 text-base font-semibold group/link">
  <Link href="tel:+919871424020">
    View my Number 
    {/* <span className="hidden group-hover/link:inline-block transition-all">
      +91 98714 24020
    </span> */}
    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
  </Link>
</Button>
     </div>
    </div>
  );
}