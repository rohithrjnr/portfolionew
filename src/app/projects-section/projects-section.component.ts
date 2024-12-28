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
  isPopupVisible: boolean = false;
  isOnlyoneGit: boolean = false;

  // Function to open the popup and set repository links
  openSourceCodePopup(frontendRepo: string, backendRepo: string): void {
    this.frontendRepo = frontendRepo;
    this.backendRepo = backendRepo;
  
    if (!backendRepo) { // If only the frontend repository exists
      this.isOnlyoneGit = true;
      window.open(frontendRepo, '_blank'); // Open the frontend repo in a new tab
    } else {
      this.isOnlyoneGit = false;
      this.isPopupVisible = true; // Show the popup to select between frontend and backend repos
    }
  }
  // Function to close the popup
  closeSourceCodePopup(): void {
    this.isPopupVisible = false; // Hide the popup
  }
}
