import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private loadingService : LoadingService) { }

  ngOnInit(): void {
    this.loadingService.enableLoading();
    
    this.loadingService.disableLoading();
    this.loadImages()
  }

  imagesLoaded : boolean = false;

  isLoading() : boolean {
    return this.loadingService.isLoading();
  }

  loadImages() {
    const imagePaths = 
    [
      '../../assets/images/svg/block-1-topwave.svg',
      '../../assets/images/svg/block-2-left-topwave.svg',
      '../../assets/images/svg/block-2-left-bottomwave.svg',
      '../../assets/images/svg/block-4-left-topwave.svg',
      '../../assets/images/svg/block-4-left-bottomwave.svg',
      '../../assets/images/svg/block-3-right-bottomwave.svg',
      '../../assets/images/svg/block-5-right-topwave.svg',
      '../../assets/images/svg/block-2-left-topwave.svg',
      '../../assets/images/characters/NotFound.png',
      '../../assets/images/svg/cross-1.svg',
      '../../assets/images/svg/search_icon.svg',

      '../../assets/images/admin/stats.svg',
      '../../assets/images/admin/manageArticles.svg',
      '../../assets/images/admin/manageServices.svg',
      '../../assets/images/admin/manageCategories.svg',
      '../../assets/images/admin/manageUsers.svg',
      '../../assets/images/admin/approvements.svg'
    ];
    const imagesToLoad = imagePaths.length;
    let loadedImages = 0;

    const loadImage = (src: string) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        loadedImages++;
        if (loadedImages === imagesToLoad) {
          this.loadingService.disableLoading();
          this.imagesLoaded = true;
        }
      };
    };

    imagePaths.forEach((path) => {
      loadImage(path);
    });
  }
  
  title = 'JustEmpire | Home';
}
