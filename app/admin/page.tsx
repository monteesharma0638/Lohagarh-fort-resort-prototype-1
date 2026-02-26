import { redirect } from "next/navigation";

export default function page() {
  redirect('/admin/login');

  return (
    <div>Can't redirect to /admin/login. Please go to /admin/login.</div>
  )
}
