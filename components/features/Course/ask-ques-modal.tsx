import SubmitButton from "@/components/ui/form/submit-button";
import TextBoxInput from "@/components/ui/form/text-box-input";
import Modal from "@/components/ui/Modal";
import { useForm } from "react-hook-form";

export default function AskQuesModal({id}:{id:string}){
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            question: "",
        },
    })
    const onSubmit = (data: any) => {
        console.log(data);
    }
    return (
        <Modal id={id} >
            <div className="bg-zinc-200 min-w-[40vw] max-h-[90vh] flex flex-col items-center justify-center rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full p-6 bg-secondary text-white rounded-2xl">
                    <TextBoxInput className="bg-white text-black p-5"  label="Question" name="question" register={register} errors={errors} placeHolder="Ask your question here" />
                    <SubmitButton ariaLabel="Ask Question" isLoading={false} text="Ask Question" disabled={false} type="submit"  />
                </form>
            </div>
        </Modal>
    )
}