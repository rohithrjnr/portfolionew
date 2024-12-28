import { Component } from '@angular/core';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.css']
})
export class ProjectsSectionComponent {
  // Variables to store repository links for the popup
  frontendRepo: string = '';
  backendRepo: string = '';
  isPopupVisible: boolean = false; // Tracks whether the popup is visible or not

  // Function to open the popup and set repository links
  openSourceCodePopup(frontendRepo: string, backendRepo: string): void {
    this.frontendRepo = frontendRepo;
    this.backendRepo = backendRepo;
    this.isPopupVisible = true; // Show the popup
  }

  // Function to close the popup
  closeSourceCodePopup(): void {
    this.isPopupVisible = false; // Hide the popup
  }
}
