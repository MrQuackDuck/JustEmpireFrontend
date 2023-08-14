import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {
  constructor(private loadingService : LoadingService) { }

  loadImages() {
    this.loadingService.enableLoading();

    const imagePaths = 
    [
      '../../assets/images/characters/NotFound.png',
      '../../assets/images/svg/cross-1.svg',
      '../../assets/images/svg/search_icon.svg',
      '../assets/images/svg/back.svg',
      '../assets/images/svg/filter.svg',

      '../../assets/images/admin/stats.svg',
      '../../assets/images/admin/manageArticles.svg',
      '../../assets/images/admin/manageServices.svg',
      '../../assets/images/admin/manageCategories.svg',
      '../../assets/images/admin/image.svg',
      '../../assets/images/admin/manageUsers.svg',
      '../../assets/images/admin/approvements.svg',
      '../../assets/images/admin/logout.svg'
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
        }
      };
    };

    imagePaths.forEach((path) => {
      loadImage(path);
    });
  }
}
