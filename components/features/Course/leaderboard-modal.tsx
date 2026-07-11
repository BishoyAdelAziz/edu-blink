import Modal from "@/components/ui/Modal";
interface Props {
    id: string;
    lessonName: string;
}

const generateCheer = (percentage: number): string => {
  if (percentage === 100) {
    return `عاش يا بطل !!، انت حرفيا كسرت الـ ليدر بورد و أفضل بنسبة ${percentage}%`;
  }

  if (percentage >= 50 && percentage < 100) {
    return `كويس! انت في منتصف الطريق بنسبة ${percentage}%`;
  }

  if (percentage >=  20 && percentage < 50) {
    return `شد شوية ! لسه عندك فرصة تحسن وضعك`;
  }

  return `وضعك الحالي ${percentage}%`;
};
export default function LeaderBoardModal({id, lessonName}:Props){
 return (
    <Modal id={id}>
        <div dir="rtl" className="flex flex-col gap-4 min-w-[40vw] items-stretch justify-center max-h-[90vh] bg-white rounded-2xl p-4 overflow-y-auto">
        <h3 className="text-center text-lg font-bold">{lessonName}</h3>
            <p>{generateCheer(30)}</p>
            <div className="h-20 w-full bg-gray-200 rounded-full ring-1 ring-secondary"></div>
            <div className="h-20 w-full bg-gray-200 rounded-full ring-1 ring-secondary"></div>
            <div className="h-20 w-full bg-gray-200 rounded-full ring-1 ring-secondary"></div>
            <div className="h-20 w-full bg-gray-200 rounded-full ring-1 ring-secondary"></div>
            <div className="h-20 w-full bg-gray-200 rounded-full ring-1 ring-secondary"></div>
        </div>
    </Modal>
 )
}