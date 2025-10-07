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
    cell: ({ row }) => (
      <div className="font-medium text-gray-400">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <UserProfileCell
        name={row.original.englishName + " - " + row.original.khmerName}
        title={row.original.email}
      />
    ),
  },
  {
    accessorKey: "university",
    header: "University",
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
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
    enablePinning: true,
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
    enablePinning: true,
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const i = row.original;
      return (
        <Tooltip disableHoverableContent={i.isPaid}>
          <TooltipTrigger asChild>
            <Button
              className={`transition-colors duration-300 ease-in-out cursor-pointer ${
                i.isPaid ? "" : "text-[#B25E00] bg-[#FFF4E5]"
              }`}
              variant={"ghost"}
              disabled={i.isPaid}
            >
              <BadgeDollarSign />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {i.isPaid
                ? "Payment already processed"
                : "Click to process payment"}
            </p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
];
