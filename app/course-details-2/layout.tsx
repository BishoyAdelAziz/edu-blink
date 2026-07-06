export default function CourseDetails2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="">
    <header className="flex p-10 items-center justify-start gap-3 bg-primary ">
        <p className="cursor-pointer" >Home</p> {">"} <p className="cursor-pointer">courses</p> {">"} <p className="font-semibold cursor-pointer">course details </p>
    </header>
    {children}</main>;
}