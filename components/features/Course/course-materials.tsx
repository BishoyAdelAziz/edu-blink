import { MaterialStatsGrid, type MaterialStatProps } from "@/components/ui/material-stat";
import { BooksIcon, ClockIcon, LanguagesIcon, StudentsIcon } from "@/components/ui/icons";

const defaultMaterials: MaterialStatProps[] = [
  {
    icon: <ClockIcon />,
    label: "Duration:",
    value: "3 weeks",
  },
  {
    icon: <BooksIcon />,
    label: "Lessons:",
    value: "10",
  },
  {
    icon: <StudentsIcon />,
    label: "Enrolled:",
    value: "100",
  },
  {
    icon: <LanguagesIcon />,
    label: "Languages:",
    value: "English",
  },
];

type CourseMaterialsProps = {
  title?: string;
  items?: MaterialStatProps[];
};

export default function CourseMaterials({
  title = "Course Materials",
  items = defaultMaterials,
}: CourseMaterialsProps) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-5 rounded-md bg-white p-5 pt-5">
      <h2 className="text-lg font-semibold tracking-widest">{title}</h2>
      <MaterialStatsGrid items={items} />
    </div>
  );
}
