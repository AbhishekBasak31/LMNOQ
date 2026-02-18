import mongoose from "mongoose";

const SCHEMA = mongoose.Schema;

const PolicyHighlightSchema = new SCHEMA({
  iconName: { type: String, required: true }, // e.g., "Calendar", "RefreshCcw"
  title: { type: String, required: true },
  desc: { type: String, required: true },
  colorClass: { type: String, default: "text-blue-600" } // Tailwind color for the icon
});

const PolicyExceptionSchema = new SCHEMA({
  indexNumber: { type: String }, // e.g., "01"
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const RefundPolicySchema = new SCHEMA({
  // Header Section
  pageTitle: { type: String, default: "Refund Policy" },
  pageSubtitle: { type: String },
  tagline: { type: String, default: "Billing Transparency" },

  // Policy Highlights (The 3-column grid)
  highlights: [PolicyHighlightSchema],

  // Detailed Sections
  subscriptionCancellationText: { type: String },
  
  // Exceptions (The numbered list)
  exceptions: [PolicyExceptionSchema],

  // Support/CTA Section
  supportTitle: { type: String, default: "Need a manual review?" },
  supportDesc: { type: String },
  supportButtonText: { type: String, default: "CONTACT BILLING SUPPORT" }

}, { timestamps: true });

export const RefundPolicy = mongoose.model("RefundPolicy", RefundPolicySchema);