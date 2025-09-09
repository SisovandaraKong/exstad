import { ColumnDef } from "@tanstack/react-table";
import { Enrollment } from "@/types/enrollment";
import { UserProfileCell } from "./user-profile-cell";

export const enrollmentColumns: ColumnDef<Enrollment>[] = [
  {
    accessorKey: "id",
    header: "#",
    size: 60,
    cell: ({ row }) => (
      <div className="text-center font-medium text-gray-400">{1}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <UserProfileCell
        avatar={row.original.avatar}
        name={row.original.englishName}
        title={row.original.email}
      />
    ),
  },
  {
    accessorKey: "khmerName",
    header: "Khmer name",
    size: 120,
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "currentAddress",
    header: "Current Address",
  },
  {
    accessorKey: "isPaid",
    header: "Payment Status",
    cell: ({ row }) => {
      const paid = row.original.isPaid;
      return (
        <div className="flex justify-center items-center">
          <div
            className={`inline-flex items-center rounded-sm px-2 py-1 text-sm ${
              paid
                ? "text-[#1E7D34] bg-[#E6F4EA]"
                : "text-[#B25E00] bg-[#FFF4E5]"
            }`}
          >
            {paid ? "Paid" : "UnPaid"}
          </div>
        </div>
      );
    },
  },
];
