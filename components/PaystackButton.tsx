"use client";

import dynamic from "next/dynamic";
import React from "react";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

interface PayButtonProps {
  email: string;
  amount: number;
  project: string;
  downloadLink: string;
}

export default function PaystackButtonComponent({
  email,
  amount,
  project,
  downloadLink,
}: PayButtonProps) {
  const publicKey = "pk_live_25e0ec236f6b8552f9783fbe80aa35dbd471ac6f";

  const componentProps = {
    email,
    amount: amount * 100,
    metadata: {
      custom_fields: [
        {
          display_name: "Project Name",
          variable_name: "project_name",
          value: project,
        },
      ],
    },
    publicKey,
    text: "Buy Project",
    onSuccess: () => {
      alert("✅ Payment successful! Your download will start now.");
      window.location.href = downloadLink; // redirect to file
    },
    onClose: () => alert("❌ Transaction cancelled."),
  };

  return (
    <PaystackButton
      {...componentProps}
      className="px-6 py-3 bg-green-600 rounded-lg text-white hover:bg-green-700"
    />
  );
}
