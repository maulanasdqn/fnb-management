import { Icon } from "@iconify/react/dist/iconify.js";
import { clsx } from "clsx";

const Num = (props: { value: number; isActive?: boolean }) => {
  const className = clsx(
    "rounded-lg cursor-pointer p-2 w-8 flex items-center justify-center text-sm",
    {
      "bg-primary-400 hover:bg-primary-600 text-white": props.isActive,
      "bg-white hover:bg-primary-100 border border-primary-400 text-primary-400": !props.isActive,
    },
  );
  return <div className={className}>{props.value}</div>;
};

export const Pagination = () => {
  return (
    <div className="flex items-center p-2 justify-between gap-x-4 bg-white select-none">
      <select className="w-fit p-2 border-grey-100 border text-grey-400 text-sm focus:outline-none focus:ring-0 focus-visible:ring-0 bg-white placeholder-grey-400 rounded-lg">
        <option value="10">5</option>
        <option value="10">10</option>
        <option value="10">15</option>
        <option value="10">20</option>
      </select>
      <div className="w-fit flex items-center gap-x-2">
        <Icon
          icon="mdi:chevron-left"
          className="h-fit w-fit bg-grey-50 p-1 rounded-lg cursor-pointer text-primary-400 text-xl"
        />
        <div className="flex items-center gap-2">
          <Num value={1} />
          <Num isActive value={2} />
          <Num value={3} />
          <Num value={4} />
          <Num value={5} />
        </div>
        <Icon
          icon="mdi:chevron-right"
          className="h-fit w-fit bg-grey-50 p-1 rounded-lg cursor-pointer text-primary-400 text-xl"
        />
      </div>
    </div>
  );
};