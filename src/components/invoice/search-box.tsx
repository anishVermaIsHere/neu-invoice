import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import Form from "next/form";


const SearchBox = ({ query }: { query?: string }) => {
  return (
    <Form action="/dashboard/invoices" scroll={false}>
    
    <div className="flex items-center gap-2">
      <Input
        type="search"
        name="query"
        defaultValue={query}
        className="w-full sm:w-[350px]"
        placeholder="Search invoices..."
      />
      <Button
        type="submit"
        className="py-2"
      >
        <Icons.search className="w-6 h-6" />
      </Button>
    </div>
    </Form>
  );
};

export default SearchBox;
