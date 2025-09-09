import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserProfileCell({
  avatar,
  name,
  title,
}: {
  avatar: string;
  name: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
        <AvatarFallback className="bg-gray-700 text-white font-semibold">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-semibold text-white">{name}</span>
        <span className="text-sm text-gray-400">{title}</span>
      </div>
    </div>
  );
}
