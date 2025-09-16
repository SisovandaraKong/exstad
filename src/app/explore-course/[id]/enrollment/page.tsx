"use client";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { universitiesData, University } from "@/data/universities";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { currentAddressData } from "@/data/currentAddress";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  CloudUpload,
  Paperclip,
} from "lucide-react"; 
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import * as React from "react";
import { educationQualificationData } from "@/data/educationQualification";
import { PhoneInput } from "@/components/ui/phone-input";
import { openingProgramData } from "@/data/openingProgramData";

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

const universities: University[] = universitiesData;

const formSchema = z.object({
  englishName: z.string().min(1, "English name is required"),
  khmerName: z.string().min(1, "Khmer name is required"),
  openingProgramUuid: z.string().min(1, "Opening program is required"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.date().min(1, "Date of birth is required"),
  currentAddress: z.string().min(1, "Current address is required"),
  grade: z.string().min(1, "Grade is required"),
  university: z.string().min(1, "University is required"),
  avatar: z.string().optional(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  educationQualification: z
    .string()
    .min(1, "Education qualification is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  howLongProgramming: z.string().optional(),
  howDoYouKnewISTAD: z.string().optional(),
  ifBachelorDegree: z.string().optional(),
  request: z.string().optional(),
  extra: z.record(z.string(), z.any()).optional(),
});

export default function EnrollmentPage({
  params,
}: {
  params: Promise<{ id: string }>; 
}) {
  // State
  const [addressOpen, setAddressOpen] = React.useState(false);
  const [universityOpen, setUniversityOpen] = React.useState(false);
  const [dobOpen, setDobOpen] = React.useState(false);
  const [files, setFiles] = React.useState<File[] | null>(null);
  const [openingProgramOpen, setOpeningProgramOpen] = React.useState(false);
  const [programId, setProgramId] = React.useState<string>("");

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  // Form setup
  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      englishName: "",
      khmerName: "",
      gender: "",
      university: "",
      currentAddress: "",
      avatar: "",
      phoneNumber: "",
      educationQualification: "",
      howLongProgramming: "",
      howDoYouKnewISTAD: "",
      ifBachelorDegree: "",
      grade: "",
      openingProgramUuid: programId,
      email: "",
      request: "",
      dob: new Date(),
    },
  });

  React.useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setProgramId(resolvedParams.id);
        form.setValue("openingProgramUuid", resolvedParams.id);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };

    resolveParams();
  }, [params, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const extra: Record<string, string> = {};

      // Put howLongProgramming in extra object
      if (values.grade) {
        extra.grade = values.grade;
      }
      if (values.howLongProgramming) {
        extra.howLongProgramming = values.howLongProgramming;
      }
      if (values.howDoYouKnewISTAD) {
        extra.howDoYouKnewISTAD = values.howDoYouKnewISTAD;
      }
      if (values.ifBachelorDegree) {
        extra.ifBachelorDegree = values.ifBachelorDegree;
      }
      if (values.request) {
        extra.request = values.request;
      }

      const enrollmentData = {
        englishName: values.englishName,
        khmerName: values.khmerName,
        openingProgramUuid: values.openingProgramUuid,
        dob: values.dob,
        university: values.university,
        currentAddress: values.currentAddress,
        avatar: files,
        phoneNumber: values.phoneNumber,
        educationQualification: values.educationQualification,
        email: values.email,
        extra: Object.keys(extra).length > 0 ? extra : undefined,
      };

      toast.success("Registration Successful!");

      console.log("Form Values:", values);
      console.log("Enrollment Data:", enrollmentData);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="max-w-7xl mx-auto bg-background sm:p-8 p-4 rounded-md m-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-16 mt-8">
            {/* First Column */}
            <div className="flex flex-col gap-6">
              {/* English Name */}
              <FormField
                control={form.control}
                name="englishName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name (en)
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full py-7 bg-whitesmoke"
                        placeholder="Tong Bora"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender Selection */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Gender <span className="text-red-600">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full py-7 bg-whitesmoke">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date of Birth <span className="text-red-600">*</span>
                    </FormLabel>
                    <Popover open={dobOpen} onOpenChange={setDobOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full py-7 bg-whitesmoke justify-between font-normal hover:bg-whitesmoke"
                          >
                            {field.value ? (
                              formatDate(field.value)
                            ) : (
                              <span className="text-muted-foreground">
                                2005-06-01
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            field.onChange(date);
                            setDobOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Grade  */}
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Grade (Bac II) <span className="text-red-600">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full py-7 bg-whitesmoke">
                          <SelectValue placeholder="Select Grade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Grade</SelectLabel>
                          <SelectItem value="Grade A">Grade A</SelectItem>
                          <SelectItem value="Grade B">Grade B</SelectItem>
                          <SelectItem value="Grade C">Grade C</SelectItem>
                          <SelectItem value="Grade D">Grade D</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* University - UPDATED TO COMBOBOX */}
              <FormField
                control={form.control}
                name="university"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      University<span className="text-red-600">*</span>
                    </FormLabel>
                    <Popover
                      open={universityOpen}
                      onOpenChange={setUniversityOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={universityOpen}
                            className={cn(
                              "w-full py-7 bg-whitesmoke justify-between font-normal hover:bg-whitesmoke",
                              field.value
                                ? "text-accent-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? universities.find(
                                  (university) =>
                                    university.englishName === field.value
                                )?.englishName
                              : "Select University"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className=" max-w-xl min-w-sm p-0"
                        align="end"
                      >
                        <Command>
                          <CommandInput
                            placeholder="Search university..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No university found.</CommandEmpty>
                            <CommandGroup>
                              {universities.map((university) => (
                                <CommandItem
                                  key={university.uuid}
                                  value={university.englishName}
                                  onSelect={(currentValue) => {
                                    field.onChange(
                                      currentValue === field.value
                                        ? ""
                                        : currentValue
                                    );
                                    setUniversityOpen(false);
                                  }}
                                >
                                  {university.englishName}
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      field.value === university.englishName
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Extra Information (How long have you been learning programming?) */}
              <FormField
                control={form.control}
                name="howLongProgramming"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      How long have you been learning programming?
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full py-7 bg-whitesmoke">
                          <SelectValue placeholder="Select month or year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select</SelectLabel>
                          <SelectItem value="Less than 3 months">
                            Less than 3 months
                          </SelectItem>
                          <SelectItem value="Less than 6 months">
                            Less than 6 months
                          </SelectItem>
                          <SelectItem value="Less than 12 months">
                            Less than 12 months
                          </SelectItem>
                          <SelectItem value="More than 1 year">
                            More than 1 year
                          </SelectItem>
                          <SelectItem value="Never">Never</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Extra Information (How do you know ISTAD?) */}
              <FormField
                control={form.control}
                name="howDoYouKnewISTAD"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How do you know ISTAD?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Message..."
                        className="resize-none w-full sm:py-10 py-8 bg-whitesmoke"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Extra Information (If ISTAD have bachelor degree) */}
              <FormField
                control={form.control}
                name="ifBachelorDegree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="leading-5">
                      ISTAD will create IT bachelor degree course from next year
                      for BacII student. Would you like to recommend someone
                      this course? What is your reason?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Message..."
                        className="resize-none w-full sm:py-10 py-8 bg-whitesmoke"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Opening Program */}
              <FormField
                control={form.control}
                name="openingProgramUuid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Opening Program
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <Popover
                      open={openingProgramOpen}
                      onOpenChange={setOpeningProgramOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openingProgramOpen}
                            className={cn(
                              "w-full py-7 bg-whitesmoke justify-between font-normal hover:bg-whitesmoke",
                              field.value
                                ? "text-accent-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? openingProgramData.find(
                                  (program) => program.uuid === field.value
                                )?.title
                              : "Select opening program"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="!w-full min-w-[300px] max-h-[200px] p-0"
                        align="end"
                      >
                        <Command>
                          <CommandInput
                            placeholder="Search program..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No program found.</CommandEmpty>
                            <CommandGroup>
                              {openingProgramData.map((program) => (
                                <CommandItem
                                  key={program.uuid}
                                  value={program.title}
                                  onSelect={(currentValue) => {
                                    const selectedProgram =
                                      openingProgramData.find(
                                        (p) => p.title === currentValue
                                      );

                                    field.onChange(
                                      selectedProgram?.uuid === field.value
                                        ? ""
                                        : selectedProgram?.uuid || ""
                                    );
                                    setOpeningProgramOpen(false);
                                  }}
                                >
                                  {program.title}
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      field.value === program.uuid
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Second Column */}
            <div className="flex flex-col gap-6">
              {/* Full Name (kh) */}
              <FormField
                control={form.control}
                name="khmerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name (kh) <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="តុង បូរា"
                        className="py-7 bg-whitesmoke font-koh"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Current Address - UPDATED TO COMBOBOX */}
              <FormField
                control={form.control}
                name="currentAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Current Address
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <Popover open={addressOpen} onOpenChange={setAddressOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={addressOpen}
                            className={cn(
                              "w-full py-7 bg-whitesmoke justify-between font-normal hover:bg-whitesmoke",
                              field.value
                                ? "text-accent-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? currentAddressData.find(
                                  (address) =>
                                    address.englishName === field.value
                                )?.englishName
                              : "Select current address"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="!w-full min-w-[300px] max-h-[200px] p-0"
                        align="end"
                      >
                        <Command>
                          <CommandInput
                            placeholder="Search address"
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No address found.</CommandEmpty>
                            <CommandGroup>
                              {currentAddressData.map((address) => (
                                <CommandItem
                                  key={address.uuid}
                                  value={address.englishName}
                                  onSelect={(currentValue) => {
                                    field.onChange(
                                      currentValue === field.value
                                        ? ""
                                        : currentValue
                                    );
                                    setAddressOpen(false);
                                  }}
                                >
                                  {address.englishName}
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      field.value === address.englishName
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="77 815 896"
                        {...field}
                        value={field.value}
                        defaultCountry="KH"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Education Qualification */}
              <FormField
                control={form.control}
                name="educationQualification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Education Qualification{" "}
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full py-7 bg-whitesmoke">
                          <SelectValue placeholder="Select education qualification" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            Select Education Qualification
                          </SelectLabel>
                          {educationQualificationData.map((qualification) => (
                            <SelectItem
                              key={qualification.uuid}
                              value={qualification.educationQualification}
                            >
                              {qualification.educationQualification}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full py-7 bg-whitesmoke"
                        placeholder="tongbora.official@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Any Request */}
              {/* Extra Information (How do you know ISTAD?) */}
              <FormField
                control={form.control}
                name="request"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any request to ISTAD?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Message..."
                        className="resize-none w-full sm:py-10 py-8 bg-whitesmoke"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Upload Image */}
              <FormField
                control={form.control}
                name="avatar"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Picture File</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={files}
                        onValueChange={setFiles}
                        dropzoneOptions={dropZoneConfig}
                        className="relative bg-background rounded-lg p-2"
                      >
                        <FileInput
                          id="fileInput"
                          className="outline-dashed outline-1 outline-slate-500"
                        >
                          <div className="flex items-center justify-center flex-col p-8 w-full ">
                            <CloudUpload className="text-gray-500 w-10 h-10" />
                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              &nbsp; or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF
                            </p>
                          </div>
                        </FileInput>
                        <FileUploaderContent>
                          {files &&
                            files.length > 0 &&
                            files.map((file, i) => (
                              <FileUploaderItem key={i} index={i}>
                                <Paperclip className="h-4 w-4 stroke-current" />
                                <span>{file.name}</span>
                              </FileUploaderItem>
                            ))}
                        </FileUploaderContent>
                      </FileUploader>
                    </FormControl>
                    <FormDescription>Select a file to upload.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button
              type="submit"
              className="max-w-md text-primary border-primary hover:bg-primary/10 px-8"
              variant="outline"
            >
              Enroll Now
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
