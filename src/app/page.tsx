"use client";

import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const HomePage = () => {
  const { user } = useUser(); // useUser() fetches user data client-side

  return (
    <div>
    </div>
  );
};

export default HomePage;
