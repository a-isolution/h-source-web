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
import { useVerifyEmailCode, useVerifyEmail } from "@/api/auth"; // Update with your actual hook import paths
import { toast } from "sonner";

interface VerifyEmailModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function VerifyEmailModal({
  open,
  setOpen,
}: VerifyEmailModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutate: sendCode, isPending: sendingCode } = useVerifyEmailCode();
  const { mutate: verifyEmail, isPending: verifyingEmail } = useVerifyEmail();

  const resetState = () => {
    setStep(1);
    setEmail("");
    setCode("");
    setError(null);
  };

  const handleClose = () => {
    resetState();
    setOpen(false);
  };

  const handleSendEmail = () => {
    setError(null);
    sendCode(
      { email },
      {
        onSuccess: () => {
          toast.success("Please enter the code sent to your email");
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
    verifyEmail(
      { email, code },
      {
        onSuccess: () => {
          toast.success("Email successfully verified!");
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
          <DialogTitle>Verify Your Email</DialogTitle>
          <DialogDescription className="my-2">
            {step === 1
              ? "Enter your email address to receive a verification code."
              : "Enter the verification code sent to your email."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={sendingCode || verifyingEmail}
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
                disabled={sendingCode || verifyingEmail}
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
              disabled={sendingCode || verifyingEmail}
            >
              Back
            </Button>
          )}

          <Button
            onClick={step === 1 ? handleSendEmail : handleVerifyCode}
            disabled={
              sendingCode || verifyingEmail || (step === 1 ? !email : !code)
            }
          >
            {sendingCode || verifyingEmail ? (
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
