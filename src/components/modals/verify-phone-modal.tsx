"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "../spinner";
import { useVerifyPhoneCode, useVerifyPhone } from "@/api/auth";
import { toast } from "sonner";

interface VerifyPhoneModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function VerifyPhoneModal({
  open,
  setOpen,
}: VerifyPhoneModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutate: sendCode, isPending: sendingCode } = useVerifyPhoneCode();
  const { mutate: verifyPhone, isPending: verifyingPhone } = useVerifyPhone();

  const resetState = () => {
    setStep(1);
    setPhone("");
    setCode("");
    setError(null);
  };

  const handleClose = () => {
    resetState();
    setOpen(false);
  };

  const handleSendCode = () => {
    setError(null);
    sendCode(
      { phone },
      {
        onSuccess: () => {
          toast.success("Please enter the code sent to your phone");
          setStep(2);
        },
        onError: (err: any) => {
          setError(err?.message || "Failed to send code. Please try again.");
        },
      }
    );
  };

  const handleVerifyCode = () => {
    setError(null);
    verifyPhone(
      { phone, code },
      {
        onSuccess: () => {
          toast.success("Phone number successfully verified!");
          setTimeout(() => {
            handleClose();
          }, 1500);
        },
        onError: (err: any) => {
          setError(err?.message || "Invalid code. Please try again.");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[95%] sm:w-[80%] md:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Your Phone Number</DialogTitle>
          <DialogDescription className="my-2">
            {step === 1
              ? "Enter your phone number to receive a verification code."
              : "Enter the verification code sent to your phone."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1234567890"
                required
                disabled={sendingCode || verifyingPhone}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter the code"
                required
                disabled={sendingCode || verifyingPhone}
              />
            </div>
          </div>
        )}

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <div className="mt-6 flex justify-end gap-2">
          {step === 2 && (
            <Button
              variant="outline"
              onClick={() => {
                setStep(1);
                setError(null);
              }}
              disabled={sendingCode || verifyingPhone}
            >
              Back
            </Button>
          )}

          <Button
            onClick={step === 1 ? handleSendCode : handleVerifyCode}
            disabled={
              sendingCode || verifyingPhone || (step === 1 ? !phone : !code)
            }
          >
            {sendingCode || verifyingPhone ? (
              <Spinner />
            ) : step === 1 ? (
              "Send Code"
            ) : (
              "Verify"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
