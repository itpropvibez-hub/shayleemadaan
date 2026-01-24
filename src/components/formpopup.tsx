import React, { useState }  from 'react'
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";


const propertyTypes = ["Residential", "Commercial", "Industrial", "Land"];

const formpopup = () => {
      const [open, setOpen] = useState(false);  
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
      
  // Logic for Time Slots
  const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9 AM to 8 PM

  return (
    <div>
       <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="link" className="text-primary p-0 h-auto mt-2 text-base font-semibold group/link">
              View Number <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Book Your Appointmnet now</DialogTitle>
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
        </Dialog>
    </div>
  )
}

export default formpopup
