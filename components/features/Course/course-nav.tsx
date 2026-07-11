import Link from "next/link";
import { CurriculumIcon } from "@/components/ui/icons";
type route = {
  name: string;
  href?: string;
  icon: React.ReactNode;
  onClick?: () => void;
}
interface CourseNavProps {
    className?: string;
    routes: route[];
}
export default function CourseNav({ routes }: CourseNavProps) {
  return (
    <nav className="flex items-center justify-start gap-2">
      {routes.map((route) => (
        <Link onClick={route.onClick} key={route.name} href={route.href ?? ""} aria-label={route.name} className="flex h-10 w-10 ring-1 ring-gray-400 bg-black/5 rounded-full items-center justify-center">
          {route.icon}
        </Link>
      ))}
    </nav>
  );
}