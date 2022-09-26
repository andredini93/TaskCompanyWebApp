import { Component } from '@angular/core';
import { Company } from '../models/company';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {

  company: Company = new Company();

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {

      this.company = this.route.snapshot.data['company'];
  }
}
