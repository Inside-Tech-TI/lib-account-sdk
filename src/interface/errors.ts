export class HttpError extends Error {
  public messages?: string[];
  public data?: any;
  constructor(public status: number, messages?: string[] | string) {
    let messagesList: string[] = [];
    if (messages) {
      messagesList = Array.isArray(messages) ? messages : [messages];
    }
    super(messagesList.join(", ") || "HttpError");
  }
}
