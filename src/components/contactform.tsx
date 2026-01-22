"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Textarea } from "@/components/ui/textarea";

const propertyTypes = ["Residential", "Commercial", "Industrial", "Land"];

export default function ContactSection() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm();
  
  // Logic for Time Slots
  const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9 AM to 8 PM
  const selectedTypes = watch("propertyPlan") || [];

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
        {/* <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="link" className="text-primary p-0 h-auto mt-2 text-base font-semibold group/link">
              View Number <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Request a Callback</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <Input {...register("name", { required: true })} placeholder="Full Name" />
              <Input {...register("phone", { required: true })} placeholder="Mobile Number" type="tel" />
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Property Plan</p>
                <div className="grid grid-cols-2 gap-2">
                  {propertyTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={type} 
                        onCheckedChange={(checked) => {
                          const current = selectedTypes;
                          const next = checked ? [...current, type] : current.filter((t: string) => t !== type);
                          setValue("propertyPlan", next);
                        }}
                      />
                      <label htmlFor={type} className="text-sm">{type}</label>
                    </div>
                  ))}
                </div>
              </div>

              <Input {...register("budget")} placeholder="Budget (e.g. $500k - $1M)" />

              <div className="space-y-2">
                <p className="text-sm font-medium">Preferred Time Slot</p>
                <select {...register("timeSlot")} className="w-full p-2 border rounded-md text-sm">
                  {hours.map((hour) => {
                    const isBusy = hour < 15;
                    const label = hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
                    return (
                      <option key={hour} value={label} disabled={isBusy}>
                        {label} {isBusy ? "(Busy)" : ""}
                      </option>
                    );
                  })}
                </select>
              </div>

              <Textarea {...register("remarks")} placeholder="Additional Remarks" />

              <Button type="submit" className="w-full">Submit Request</Button>
            </form>
          </DialogContent>
        </Dialog> */}
      </div>
    </div>
  );
}