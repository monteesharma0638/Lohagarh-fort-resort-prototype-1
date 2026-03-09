import { Table, TableBody, TableHead } from "@/components/ui/table";
import { getHotel } from "@/lib/db"
import UpdatePage from "./components/UpdatePage";

export default async function page({params}: any) {
  const { id } = await params;
  const hotel = await getHotel(id);
  console.log("🚀 ~ page ~ hotel:", hotel);

  if(!hotel) return <div> Hotel not found </div>;

  return (
    <div>
        <UpdatePage hotel={hotel} />
    </div>
  )
}
