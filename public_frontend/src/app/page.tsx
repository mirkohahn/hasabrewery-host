import { redirect } from "next/navigation";

export default function HomePage() {
  // Automatically redirect to the login page
  redirect("/login");
}
