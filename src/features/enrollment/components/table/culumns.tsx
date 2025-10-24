import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Enrollment } from "@/types/enrollment";
import { ColumnDef } from "@tanstack/react-table";
import { BadgeDollarSign } from "lucide-react";
import { UserProfileCell } from "./user-profile-cell";

export const enrollmentColumns: ColumnDef<Enrollment>[] = [
  {
    accessorKey: "id",
    header: "#",
    size: 120,
    cell: ({ row }) => (
      <div className="font-medium text-gray-400">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <UserProfileCell
        name={row.original.englishName}
        title={row.original.email}
      />
    ),
  },
  {
    accessorKey: "khmerName",
    header: "Khmer name",
    size: 140,
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "currentAddress",
    header: "Address",
  },
  {
    accessorKey: "isPaid",
    header: "Status",
    cell: ({ row }) => {
      const paid = row.original.isPaid;
      return (
        <div
          className={`inline-flex items-center rounded-sm px-2 py-1 text-sm ${
            paid ? "text-[#1E7D34] bg-[#E6F4EA]" : "text-[#B25E00] bg-[#FFF4E5]"
          }`}
        >
          {paid ? "Paid" : "Unpaid"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const i = row.original;
      return (
        <Tooltip disableHoverableContent={i.isPaid}>
          <TooltipTrigger>
            <Button variant={"ghost"} disabled={i.isPaid}>
              <BadgeDollarSign />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to process payment</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
];
