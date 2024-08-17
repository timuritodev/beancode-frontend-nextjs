export interface ISubcription {
  email: string;
}

export interface ISubcriptionState {
  status: "idle" | "success" | "loading" | "failed";
  error: unknown;
  data: ISubcription;
}
