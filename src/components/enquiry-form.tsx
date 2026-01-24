"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { SuccessModal } from "./successmodal";

const propertyTypes = ["Residential", "Commercial", "Land"];

export default function ContactSection1() {
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
    <div className="max-w-2xl mx-auto p-6 bg-background border rounded-xl shadow-sm space-y-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-primary">Request a Callback</h3>
          <p className="text-foreground/70 text-sm">Fill in your details and I'll get back to you.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4 md:col-span-2">
            <div className="space-y-2 md:grid grid-cols-2 gap-4">
                {/* Name Field */}
                    <div className="space-y-1">
                      <Input 
                        {...register("name", { required: "Name is required" })} 
                        placeholder="Your Name" 
                        className={errors.name ? "border-red-500" : "bg-muted/30"} 
                      />
                      {errors.name && <p className="text-xs text-red-500">{errors.name.message as string}</p>}
                    </div>
                    <div className="space-y-1">
                  <Input {...register("phone", { required: "Phone is required" })} placeholder="Mobile Number" type="tel" className="bg-muted/30" />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone.message as string}</p>}
                </div>
            {/* Email Field */}
                    <div className="space-y-1 col-span-2 ">
                      <Input 
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })} 
                        placeholder="Email Address" 
                        type="email" 
                        className={errors.email ? "border-red-500" : "bg-muted/30"} 
                      />
                      {errors.email && <p className="text-xs text-red-500">{errors.email.message as string}</p>}
                    </div>    
             </div>
          </div>

          {/* Property Checkboxes */}

          <div className="space-y-3 md:col-span-2">
            <p className="text-sm font-semibold">Property Interest</p>
            <div className="flex flex-wrap gap-4">
              {propertyTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    onCheckedChange={(checked) => {
  // Ensure we start with an array even if it's currently null/undefined
  const current = selectedTypes || []; 

  const next = checked 
    ? [...current, type] 
    : current.filter((t: string) => t !== type);

  // Set the value and tell the form it's "dirty" so it validates
  setValue("propertyPlan", next, { shouldValidate: true, shouldDirty: true });
}}

                  />

                  <label htmlFor={type} className="text-sm font-medium leading-none cursor-pointer">{type}</label>

                </div>

              ))}

            </div>

          </div>

          <Input {...register("budget")} placeholder="Estimated Budget" className="bg-muted/30" />

          {/* Time Slot Select */}

          <div className="space-y-1">

            <select {...register("timeSlot")} className="flex h-10 w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">

              {Array.from({ length: 12 }, (_, i) => i + 9).map((hour) => {

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

          <div className="md:col-span-2">

            <Textarea {...register("remarks")} placeholder="Describe your requirement..." className="bg-muted/30 min-h-[100px]" />

          </div>

          <Button type="submit" disabled={isSubmitting} className="md:col-span-2 w-full py-6 text-lg">
            {isSubmitting ? "Sending..." : "Submit Request"}
          </Button>
        </form>

<SuccessModal 
        isOpen={isModalOpen} 
        onClose={setIsModalOpen} 
      />
      
      </div>
    </div>
  );
}

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { Loader2 } from "lucide-react";
// import { useState } from "react";

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   phone: z.string().optional(),
//   message: z.string().min(10, {
//     message: "Message must be at least 10 characters.",
//   }),
// });

// export function EnquiryForm() {
//   const { toast } = useToast();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//       message: "I'd like to book a free consultation.",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true);
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 2000));
    
//     console.log(values);
    
//     toast({
//       title: "Consultation Request Sent!",
//       description: "Thank you for your message. I will get back to you shortly.",
//     });
    
//     form.reset();
//     setIsSubmitting(false);
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid grid-cols-1 gap-6">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Full Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="John Doe" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email Address</FormLabel>
//                 <FormControl>
//                   <Input placeholder="john.doe@example.com" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone Number (Optional)</FormLabel>
//                 <FormControl>
//                   <Input placeholder="+1 234 567 890" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <FormField
//           control={form.control}
//           name="message"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Message</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Tell me more about what you're looking for..."
//                   className="min-h-[120px]"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
//           {isSubmitting ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Submitting...
//             </>
//           ) : (
//             'Submit Request'
//           )}
//         </Button>
//       </form>
//     </Form>
//   );
// }