import AppExplorer from "@/components/AppExplorer";
import { getRisingApps } from "@/lib/data";

export default function RisingPage() {
  const rising = getRisingApps();

  return (
    <AppExplorer
      initialApps={rising}
      title="Rising Stars"
      subtitle="Newly surfaced mobile apps with rapid 24h category climbing velocity."
      defaultSort="momentum"
    />
  );
}
