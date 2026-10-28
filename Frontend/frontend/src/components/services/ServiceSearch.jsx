import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

function ServiceSearch({ value, onChange, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex max-w-4xl flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm sm:flex-row"
    >
      <div className="flex min-h-14 flex-1 items-center gap-3 rounded-xl bg-white px-4">
        <Search className="h-5 w-5 shrink-0 text-slate-400" />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for a service..."
          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      <Button
        type="submit"
        className="h-14 rounded-xl bg-indigo-600 px-8 hover:bg-indigo-700"
      >
        Search
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}

export default ServiceSearch;