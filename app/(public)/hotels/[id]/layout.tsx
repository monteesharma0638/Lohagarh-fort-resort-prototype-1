export default async function HotelLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="hotel-detail-page">
      {children}
    </div>
  );
}
