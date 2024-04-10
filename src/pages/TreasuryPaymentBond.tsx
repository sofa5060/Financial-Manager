import BondForm from "@/components/Treasury/Dialogs/BondForm";
import { Button } from "@/components/ui/button";

const TreasuryPaymentBond = () => {
  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          New Treasury / <span className="text-primary">Payment Bond</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline">Print Entry</Button>
        </div>
      </div>
      <div className="mt-7 ml-2">
        <BondForm type="add" bondType="payment" />
      </div>
    </div>
  );
};
export default TreasuryPaymentBond;
