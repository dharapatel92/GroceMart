import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  success(message: string) {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: message,
    });
  }

  error(message: string) {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  }
}
