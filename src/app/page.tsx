"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const HomePage = () => {
  const { user } = useUser(); // useUser() fetches user data client-side

  return (
    <div>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <div className="p-4">
        <h1 className="text-xl font-bold">This is the home page</h1>
        {user && <p>Welcome, {user.firstName}!</p>}
      </div>
    </div>
  );
};

export default HomePage;
