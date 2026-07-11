export const MODAL_OPEN_EVENT = "modal:open";
export const ASK_QUESTION_MODAL_ID = "ask-question-modal";
export const EXAM_MODAL_ID = "exam-modal";
export const LEADER_BOARD_MODAL_ID = "leader-board-modal";
  export function getModalElement(id: string) {
  return document.getElementById(id);
}

export function openModal(id: string) {
  const modal = getModalElement(id);
  if (!modal) return;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";

  modal.dispatchEvent(
    new CustomEvent(MODAL_OPEN_EVENT, { bubbles: false }),
  );
}

export function openAskQuestionModal(){
  openModal(ASK_QUESTION_MODAL_ID);
}

export function closeModal(id: string) {
  const modal = getModalElement(id);
  if (!modal) return;

  modal.classList.remove("flex");
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}
export function handleLeaderBoardModalOpen(){
  openModal(LEADER_BOARD_MODAL_ID);
}