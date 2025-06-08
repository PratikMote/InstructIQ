import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <SignUp />
    </section>
  );
}
