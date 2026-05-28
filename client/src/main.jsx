import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
} from "@clerk/clerk-react";

import App from "./App";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <ClerkProvider publishableKey={clerkPubKey}>

      <SignedOut>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <SignIn />
        </div>
      </SignedOut>

      <SignedIn>
        <App />
      </SignedIn>

    </ClerkProvider>

  </React.StrictMode>
);