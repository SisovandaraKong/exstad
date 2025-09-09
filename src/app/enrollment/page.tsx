"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { universitiesData, University } from "@/data/universities";
import SelectGender from "@/components/select/SelectGender";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

const universities: University[] = universitiesData;

export default function EnrollmentPage() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01")
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  return (
    <div className="max-w-7xl grid grid-cols-2 gap-16 mt-8 mx-auto min-h-screen bg-background p-4 rounded-md">
      {/* First Column */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 h-20">
          <h1 className="text-sm">Full Name (en)</h1>
          <Input placeholder="Tong Bora" className="h-full bg-whitesmoke" />
        </div>

        <div>
          <SelectGender />
        </div>

        <div className="flex flex-col gap-2 h-20">
          <h1 className="text-sm">Date of Birth</h1>
          <div className="flex flex-col gap-3">
            <div className="relative h-13 flex gap-2">
              <Input
                id="date"
                value={value}
                placeholder="June 01, 2025"
                className="h-full bg-whitesmoke"
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setValue(e.target.value);
                  if (isValidDate(date)) {
                    setDate(date);
                    setMonth(date);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="date-picker"
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-8 -translate-y-1/2"
                  >
                    <CalendarIcon className="size-3.5" />
                    <span className="sr-only">Select date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-xs overflow-hidden p-0"
                  align="end"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    className="w-xs"
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(date) => {
                      setDate(date);
                      setValue(formatDate(date));
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 h-20">
          <h1 className="text-sm">Grade (Bacll)</h1>
          <div className="h-full">
            <Select>
              <SelectTrigger className="w-full h-full bg-whitesmoke py-6">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="h-full bg-whitesmoke">
                <SelectGroup>
                  <SelectLabel>Select Grade</SelectLabel>
                  <SelectItem
                    className="focus:bg-primary hover:bg-primary-hover text-foreground focus:text-white"
                    value="Grade A"
                  >
                    Grade A
                  </SelectItem>
                  <SelectItem
                    className="focus:bg-primary hover:bg-primary-hover text-foreground focus:text-white"
                    value="Grade B"
                  >
                    Grade B
                  </SelectItem>
                  <SelectItem
                    className="focus:bg-primary hover:bg-primary-hover text-foreground focus:text-white"
                    value="Grade C"
                  >
                    Grade C
                  </SelectItem>
                  <SelectItem
                    className="focus:bg-primary hover:bg-primary-hover text-foreground focus:text-white"
                    value="Grade D"
                  >
                    Grade D
                  </SelectItem>
                  <SelectItem
                    className="focus:bg-primary hover:bg-primary-hover text-foreground focus:text-white"
                    value="Other"
                  >
                    Other
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2 h-20">
          <h1 className="text-sm">Gender</h1>
          <div className="h-full">
            <Select>
              <SelectTrigger className="w-full h-full bg-whitesmoke py-6">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="h-full bg-whitesmoke">
                <SelectGroup>
                  <SelectLabel>Select Gender</SelectLabel>
                  {universities.map((university) => (
                    <SelectItem
                      key={university.uuid}
                      className="focus:bg-primary hover:bg-primary-hover text-foreground focus:text-white"
                      value={university.englishName}
                    >
                      {university.englishName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* Second Column */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 h-20">
          <h1 className="text-sm">Full Name (kh)</h1>
          <Input placeholder="តុង បូរា" className="h-full bg-whitesmoke" />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </div>
  );
}
