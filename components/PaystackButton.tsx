"use client";

import dynamic from "next/dynamic";

// Fix "window is not defined"
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

interface PayButtonProps {
  email: string;
  amount: number;
  project: string;
  downloadLink: string;
  disabled?: boolean; // 👈 ADDED
}

export default function PaystackButtonComponent({
  email,
  amount,
  project,
  downloadLink,
  disabled = false, // 👈 ADDED
}: PayButtonProps) {
  const publicKey =
    process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ||
    "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

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
    text: disabled ? "Enter Email" : "Buy Now",
    onSuccess: () => {
      alert("Payment successful!");
      window.location.href = downloadLink;
    },
    onClose: () => alert("Transaction closed"),
  };

  return (
    <PaystackButton
      {...componentProps}
      disabled={disabled}
      className={`w-full px-4 py-2 rounded-lg text-white font-semibold transition
        ${
          disabled
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }
      `}
    />
  );
}
