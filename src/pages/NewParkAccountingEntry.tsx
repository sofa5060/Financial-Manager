import EntryForm from "@/components/Entries/Dialogs/EntryForm";
import { Button } from "@/components/ui/button";

const NewParkAccountEntry = () => {
  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h1 className="font-semibold text-2xl">
          New Accounting Entry / <span className="text-primary">Park</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline">Print Entry</Button>
        </div>
      </div>
      <div className="mt-7 ml-2">
        <EntryForm type="add" />
      </div>
    </div>
  );
};
export default NewParkAccountEntry;
