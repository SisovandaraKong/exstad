"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { provinceData, Province } from "@/data/provinceData";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { currentAddressData } from "@/data/currentAddress";
import { educationQualificationData } from "@/data/educationQualification";
import { universitiesData, University } from "@/data/universities";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  CloudUpload,
  Paperclip,
} from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  useGetAllOpeningProgramsQuery,
  useGetOpeningProgramBySlugQuery,
} from "@/components/program/openingProgramApi";
import { useCreateDocumentMutation } from "@/features/document/documentApi";
import { useCreateEnrollmentMutation } from "@/features/enrollment/enrollmentApi";
import { useSendTelegramMessageMutation } from "@/features/telegram/telegramApi";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { enrollmentMessageFormatter } from "@/services/enrollment-message-formatter";
import { useGetClassesByOpeningProgramUuidQuery } from "@/features/class/classApi";

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
const provinces: Province[] = provinceData;

const formSchema = z.object({
  englishName: z.string().min(1, "English name is required"),
  khmerName: z.string().min(1, "Khmer name is required"),
  openingProgramUuid: z.string().min(1, "Opening program is required"),
  classUuid: z.string().min(1, "Class is required"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.date().min(1, "Date of birth is required"),
  currentAddress: z.string().min(1, "Current address is required"),
  grade: z.string().min(1, "Grade is required"),
  university: z.string().min(1, "University is required"),
  avatar: z.string().optional(),
  province: z.string().optional(),
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

export default function EnrollmentPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const t = useTranslations();
  // State
  const [addressOpen, setAddressOpen] = React.useState(false);
  const [provinceOpen, setProvinceOpen] = React.useState(false);
  const [universityOpen, setUniversityOpen] = React.useState(false);
  const [dobOpen, setDobOpen] = React.useState(false);
  const [files, setFiles] = React.useState<File[] | null>(null);
  const [openingProgramOpen, setOpeningProgramOpen] = React.useState(false);

  // Fetch opening program by slug
  const {
    data: openingProgram,
    isLoading,
    isError,
  } = useGetOpeningProgramBySlugQuery({ slug });
  console.log("Opening Program:", openingProgram);

  const [selectedProgramUuid, setSelectedProgramUuid] = React.useState(
    openingProgram?.uuid ?? ""
  );

  const { data } = useGetClassesByOpeningProgramUuidQuery(selectedProgramUuid);
  const classes = data?.classes ?? [];
  console.log("data", data);
  console.log("Classes:", classes);

  // get all opening program for course selection
  const { data: openingPrograms } = useGetAllOpeningProgramsQuery();

  // Enrollment mutation
  const [createEnrollment, { isLoading: isSubmitting }] =
    useCreateEnrollmentMutation();

  // Document upload mutation
  const [createDocument] = useCreateDocumentMutation();

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
      province: "",
      phoneNumber: "",
      educationQualification: "",
      howLongProgramming: "",
      howDoYouKnewISTAD: "",
      ifBachelorDegree: "",
      grade: "",
      openingProgramUuid: openingProgram?.uuid || "",
      classUuid: "",
      email: "",
      request: "",
      dob: new Date(),
    },
  });

  // Set openingProgramUuid when openingProgram is loaded
  React.useEffect(() => {
    if (openingProgram?.uuid) {
      form.setValue("openingProgramUuid", openingProgram.uuid);
    }
  }, [openingProgram, form]);

  const [sendTelegramMessage] = useSendTelegramMessageMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let avatarUri = "";
      // Upload document first if file exists
      if (files && files.length > 0) {
        const file = files[0];
        const documentPayload = {
          programSlug:
            openingProgram?.programName.replaceAll(" ", "-").toLowerCase() ??
            "",
          gen: openingProgram?.generation ?? 1,
          documentType: "avatar",
          filename: "null",
          file,
        };
        const document = await createDocument(documentPayload).unwrap();
        console.log("Uploaded document:", document);
        avatarUri = document.uri;
        form.setValue("avatar", avatarUri);
      }

      const extra: Record<string, string> = {};
      if (values.grade) extra.grade = values.grade;
      if (values.howLongProgramming)
        extra.howLongProgramming = values.howLongProgramming;
      if (values.howDoYouKnewISTAD)
        extra.howDoYouKnewISTAD = values.howDoYouKnewISTAD;
      if (values.ifBachelorDegree)
        extra.ifBachelorDegree = values.ifBachelorDegree;
      if (values.request) extra.request = values.request;

      const enrollmentData = {
        englishName: values.englishName,
        khmerName: values.khmerName,
        openingProgramUuid: values.openingProgramUuid,
        classUuid: values.classUuid,
        amount: 5.0,
        dob:
          values.dob instanceof Date
            ? values.dob.toISOString().slice(0, 10)
            : values.dob,
        university: values.university,
        currentAddress: values.currentAddress,
        avatar: avatarUri,
        province: values.province,
        phoneNumber: values.phoneNumber,
        educationQualification: values.educationQualification,
        email: values.email,
        extra: Object.keys(extra).length > 0 ? extra : undefined,
        gender: values.gender,
      };

      const enroll = await createEnrollment(enrollmentData).unwrap();
      console.log("Enrollment successful:", enroll);
      toast.success("Registration Successful!");

      const message = enrollmentMessageFormatter(enroll);

      const threadId = Number(
        process.env.NEXT_PUBLIC_TELEGRAM_ENROLLMENT_THREAD_ID || 0
      );
      console.log(threadId);
      await sendTelegramMessage({
        message: message,
        photoUrl: enrollmentData.avatar || undefined,
        threadId: threadId || undefined,
      });

      form.reset();
      setFiles(null);
    } catch (error) {
      toast.error("Failed to submit the form. Please try again." + error);
    }
  }

  if (isLoading) return <div>Loading program...</div>;
  if (isError || !openingProgram) return <div>Program not found.</div>;

  return (
    <div className="flex flex-col max-w-7xl mx-auto gap-6">
      <div className="mx-auto bg-background rounded-md mt-10 p-4 w-full">
        <h1 className="font-d2 font-bold text-3xl text-center text-primary dark:text-white">
          {t("enrollment")}
        </h1>
      </div>
      <div className=" mx-auto bg-background sm:p-8 rounded-md mb-16">
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
                        {t("full-name-en")}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full py-7 bg-whitesmoke font-inter"
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
                        {t("gender")} <span className="text-red-600">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                        {t("dob")} <span className="text-red-600">*</span>
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

                {/* Province */}
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Place of Birth
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <Popover
                        open={provinceOpen}
                        onOpenChange={setProvinceOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={provinceOpen}
                              className={cn(
                                "w-full py-7 bg-whitesmoke justify-between font-normal hover:bg-whitesmoke",
                                field.value
                                  ? "text-accent-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? provinces.find(
                                    (province) =>
                                      province.englishName === field.value
                                  )?.englishName
                                : "Select province"}
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
                              <CommandEmpty>No province found.</CommandEmpty>
                              <CommandGroup>
                                {provinces.map((province) => (
                                  <CommandItem
                                    key={province.uuid}
                                    value={province.englishName}
                                    onSelect={(currentValue) => {
                                      field.onChange(
                                        currentValue === field.value
                                          ? ""
                                          : currentValue
                                      );
                                      setAddressOpen(false);
                                    }}
                                  >
                                    {province.englishName}
                                    <Check
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        field.value === province.englishName
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

                {/* Grade  */}
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("grade")} <span className="text-red-600">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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

                {/* University - ComboBox */}
                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("university")}{" "}
                        <span className="text-red-600">*</span>
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
                        {t("how-long-have-you-been-learning-programming")}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                      <FormLabel>{t("how-do-you-know-istad")}</FormLabel>
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
                        {t(
                          "istad-will-create-it-bacchelor-degree-course-from-next-year"
                        )}
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
                        {t("opening-program")}
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
                                ? openingPrograms?.find(
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
                                {openingPrograms?.map((program) => (
                                  <CommandItem
                                    key={program.uuid}
                                    value={program.title}
                                    onSelect={() => {
                                      field.onChange(
                                        program.uuid === field.value
                                          ? ""
                                          : program.uuid
                                      );
                                      setSelectedProgramUuid(program.uuid);
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

                {/* Class Selection */}
                <FormField
                  control={form.control}
                  name="classUuid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shift</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full py-7 bg-whitesmoke">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a shift" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls.uuid} value={cls.uuid}>
                              {cls.shift.toUpperCase()}{" "}
                              {cls.isWeekend ? "(Sat - Sun)" : "(Mon - Fri)"} |{" "}
                              {cls.startTime} - {cls.endTime}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        {t("full-name-kh")}{" "}
                        <span className="text-red-600">*</span>
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

                {/* Current Address - ComboBox */}
                <FormField
                  control={form.control}
                  name="currentAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("current-address")}
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
                        {t("phone-number")}{" "}
                        <span className="text-red-600">*</span>
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
                        {t("education-qualification")}{" "}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                        {t("email")} <span className="text-red-600">*</span>
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
                <FormField
                  control={form.control}
                  name="request"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("any-request")}</FormLabel>
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
                      <FormLabel>{t("picture-file")}</FormLabel>
                      <FormControl>
                        <FileUploader
                          value={files}
                          onValueChange={setFiles}
                          dropzoneOptions={{
                            maxFiles: 5,
                            maxSize: 1024 * 1024 * 4,
                            multiple: true,
                          }}
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
                      {/* <FormDescription>Select a file to upload.</FormDescription> */}
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
                className="max-w-md cursor-pointer text-white border-primary dark:hover:bg-primary/90  px-8 bg-primary"
                // variant="outline"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("enroll-now") + "..." : t("enroll-now")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
