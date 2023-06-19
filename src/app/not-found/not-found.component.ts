import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  constructor(private route:ActivatedRoute, private router : Router, private loadingService : LoadingService) { }

    @Input()
    show404 : boolean = true;

    imagePath : string;

    ngOnInit() {
      this.loadingService.disableLoading();

      if (this.route.snapshot.url[0].path.toLowerCase() !== this.route.snapshot.url[0].path)
      this.router.navigate([this.route.snapshot.url[0].path.toLowerCase()]);

      this.imagePath = '/src/assets/images/characters/NotFound.png';
    }
}
