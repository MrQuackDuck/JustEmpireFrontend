import { Component, OnInit } from '@angular/core';
import { ImageLoaderService } from './services/image-loader.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private imageLoader : ImageLoaderService, public loadingService : LoadingService) { }

  ngOnInit(): void {
    this.imageLoader.loadImages()
  }

  imagesLoaded : boolean = false;
  
  title = 'JustEmpire | Home';
}
