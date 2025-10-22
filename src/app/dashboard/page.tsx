"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session, isPending, error } = authClient.useSession();

  return (
    <section className="flex flex-col py-24">
      <div className="mx-auto max-w-4xl">
        {isPending ? (
          <p>Loading session...</p>
        ) : error ? (
          <p className="text-rose-500">
            Error loading session: {error.message}
          </p>
        ) : session ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">
              Welcome, {session.user.name}!
            </h1>
            <p className="mb-4">You are logged in as {session.user.email}.</p>
            <Button onClick={() => authClient.signOut()}>Sign Out</Button>
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
    </section>
  );
}
