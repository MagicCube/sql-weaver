export class AssistantStore {
  question: string | null = null;
  state: AssistantState = AssistantState.Idle;

  async ask(question: string) {
    this.question = question;
    this.state = AssistantState.Thinking;
  }
}

export enum AssistantState {
  Idle,
  Thinking,
  Responding,
  Finished,
}
