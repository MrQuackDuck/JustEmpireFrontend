import { AfterViewInit, Component} from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { LoadingService } from '../services/loading.service';
import { TitleService } from '../services/title-service.service';
import { TranslateService } from '../services/translate.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})


export class IndexComponent implements AfterViewInit {
  constructor(private loadingService : LoadingService, private translateService : TranslateService,
    private titleService : TitleService, public language : LanguageService) {}

  imagesLoaded: boolean = false;

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

      '../../assets/images/svg/block-1-left-background.svg',
      '../../assets/images/characters/1.png',
      '../../assets/images/svg/block-1-right-background.svg',
      '../../assets/images/svg/block-2-right-background.svg',
      '../../assets/images/characters/2.png',
      '../../assets/images/svg/block-3-left-background.svg',
      '../../assets/images/characters/3.png',
      '../../assets/images/svg/block-3-right-background.svg',
      '../../assets/images/svg/block-4-right-background.svg',
      '../../assets/images/characters/4.png',
      '../../assets/images/svg/block-5-left-background.svg',
      '../../assets/images/characters/5.png'
    ];
    const imagesToLoad = imagePaths.length;
    let loadedImages = 0;

    const loadImage = (src: string) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        loadedImages++;
        if (loadedImages === imagesToLoad) {
          this.loadingService.disableLoading()
          this.imagesLoaded = true;
        }
      };
    };

    imagePaths.forEach((path) => {
      loadImage(path);
    });
  }

  ngAfterViewInit() {
    this.titleService.setTitle(this.translateService.translate('HOME'));

    this.loadingService.enableLoading()

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        })
    })
    
    const hiddenRightShortElements = document.querySelectorAll('.hidden-right-short');
    const hiddenRightLongElements = document.querySelectorAll('.hidden-right-long');
    const hiddenLeftShortElements = document.querySelectorAll('.hidden-left-short');
    const hiddenLeftLongElements = document.querySelectorAll('.hidden-left-long');
    hiddenRightShortElements.forEach((el) => observer.observe(el));
    hiddenRightLongElements.forEach((el) => observer.observe(el));
    hiddenLeftShortElements.forEach((el) => observer.observe(el));
    hiddenLeftLongElements.forEach((el) => observer.observe(el));
    
    this.loadImages()

    window.onload = function() {
        document.body.style.display = "block";
    }
  }
}