import CurrencyConverter from "../components/CurrencyConverter";
import TransferHistory from "../components/TransferHistory";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <CurrencyConverter />
      <TransferHistory />
    </div>
  );
}
