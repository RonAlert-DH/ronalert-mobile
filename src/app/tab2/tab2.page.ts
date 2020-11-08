import { Component } from '@angular/core';
import { WarningService } from "../services/warning.service";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  warnings;
  room;

  constructor(private warningService: WarningService) {}

  ngAfterViewInit() {
    this.getWarnings();
  }

  getWarnings(): void {
    this.warningService
      .getAllWarnings("9E9C13B6-3FC6-4875-BD37-B9511DE0B082")
      .pipe(first())
      .subscribe(
        (data) => {
          //console.log(data);
          this.warnings = data;
        },
        (error) => {}
      );
  }

}
