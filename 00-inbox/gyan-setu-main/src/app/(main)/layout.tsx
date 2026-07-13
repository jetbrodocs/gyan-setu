import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <AppShell
      user={{
        name: user.name,
        membershipTier: user.membershipTier,
      }}
    >
      {children}
    </AppShell>
  );
}
