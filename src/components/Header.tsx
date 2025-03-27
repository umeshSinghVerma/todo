"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Calendar, BarChart2, User } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

export default function Header() {
    const pathname = usePathname()

    return (
        <header className="border-b bg-white">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/dashboard" className="font-bold text-xl">
                    Just Todo
                </Link>

                <nav className="flex items-center space-x-1">
                    <Button asChild variant={pathname === "/" ? "default" : "ghost"} size="sm">
                        <Link href="/" className="flex items-center">
                            <Home className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                    </Button>

                    <Button asChild variant={pathname === "/calendar" ? "default" : "ghost"} size="sm">
                        <Link href="/calendar" className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">Calendar</span>
                        </Link>
                    </Button>

                    <Button asChild variant={pathname === "/summary" ? "default" : "ghost"} size="sm">
                        <Link href="/summary" className="flex items-center">
                            <BarChart2 className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">Summary</span>
                        </Link>
                    </Button>
                </nav>
                <div>
                    <SignedOut>
                        <SignInButton>
                            <Button variant="default">Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    )
}

