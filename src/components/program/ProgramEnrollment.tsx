import { enrollments } from "@/data/enrollments";
import { enrollmentColumns } from "@/features/enrollment/components/table/culumns";
import { EnrollmentDataTable } from "@/features/enrollment/components/table/data-table";
import React from "react";

export default function ProgramEnrollment() {
  return (
    <div className="p-6">
      <EnrollmentDataTable data={enrollments} columns={enrollmentColumns} />
    </div>
  );
}
