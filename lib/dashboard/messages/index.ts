export type { Message, MessageSender, MessageStore } from "./types";

// Swap this export for a real backend-backed store (same MessageStore
// shape) once messaging has an actual API to talk to.
export { localMessageStore as messageStore } from "./localMessageStore";
