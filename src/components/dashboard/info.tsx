"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useGetAuth } from "@/api/auth";
import VerifyEmailModal from "../modals/verify-email-modal";
import VerifyPhoneModal from "../modals/verify-phone-modal";

const VerifiedBannerInfo = () => {
  const [emailModal, setEmailModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);

  const { data: user } = useGetAuth();
  const isUserVerified =
    user?.emailVerifiedAt !== null || user?.phoneVerifiedAt !== null;

  return (
    <div>
      {!isUserVerified && (
        <div className="rounded-lg border border-[#8CC200] p-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm text-[#556B00]">
              To activate your store, please verify your email and phone number.
            </p>

            <div className="flex flex-row items-center gap-4">
              <Button
                type="button"
                onClick={() => setEmailModal(true)}
                className="inline-flex rounded-sm items-center justify-center whitespace-nowrap bg-[#ADF802] px-3 py-1.5 text-sm font-medium text-black shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8CC200] focus-visible:ring-offset-2"
              >
                Verify Email
              </Button>

              <Button
                type="button"
                onClick={() => setPhoneModal(true)}
                className="inline-flex rounded-sm items-center justify-center whitespace-nowrap bg-[#ADF802] px-3 py-1.5 text-sm font-medium text-black shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8CC200] focus-visible:ring-offset-2"
              >
                Verify Phone
              </Button>
            </div>
          </div>
        </div>
      )}

      <VerifyEmailModal open={emailModal} setOpen={setEmailModal} />
      <VerifyPhoneModal open={phoneModal} setOpen={setPhoneModal} />
    </div>
  );
};

export default VerifiedBannerInfo;
