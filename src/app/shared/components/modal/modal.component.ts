import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() isOpen = false; // Control modal visibility
  @Output() onClose = new EventEmitter<void>();

  // Close modal on background click
  closeModal() {
    this.onClose.emit();
  }

  // Prevent closing when clicking inside modal content
  onModalContentClick(event: Event) {
    event.stopPropagation();
  }
}
