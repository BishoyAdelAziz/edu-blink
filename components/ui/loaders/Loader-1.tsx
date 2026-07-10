interface Loader1Props {
  className?: string;
}

export default function Loader1({ className }: Loader1Props) {
  return (
    <div className={` ${className} w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin`}></div>
  );
}