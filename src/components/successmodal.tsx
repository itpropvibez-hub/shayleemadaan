"use client";

import React from "react";
import { CheckCircle2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] p-8 border-none shadow-2xl">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Icon Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 scale-150 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative bg-green-500 p-4 rounded-full shadow-lg">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Text Section */}
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-3xl font-bold text-slate-900">
              Thank You!
            </DialogTitle>
            <DialogDescription className="text-base text-slate-600 leading-relaxed">
              Your request has been received. 
              <span className="block font-medium text-primary mt-1">
                We'll call you back soon!
              </span>
            </DialogDescription>
          </DialogHeader>

          {/* Action Button */}
          <Button 
            onClick={() => onClose(false)} 
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-xl text-lg font-semibold transition-all hover:scale-[1.02]"
          >
            Great, thanks!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}