import { Injectable } from '@angular/core';
import { ArticleRepositoryService } from './article-repository.service';
import { ServiceRepositoryService } from './service-repository.service';
import { ServiceCategoryRepositoryService } from './service-category-repository.service';
import { ServiceVersionRepositoryService } from './service-version-repository.service';
import { ServiceImageRepositoryService } from './service-image-repository.service';
import { Postable } from '../model/postable';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApprovementsService {
  constructor(private articleRepository : ArticleRepositoryService,
  private serviceRepository : ServiceRepositoryService,
  private serviceCategoryRepository : ServiceCategoryRepositoryService,
  private serviceVersionRepository : ServiceVersionRepositoryService,
  private serviceImageRepository : ServiceImageRepositoryService) { }

  getAll(): Observable<Postable[]> {
    const articleObservable = this.articleRepository.getQueued();
    const serviceObservable = this.serviceRepository.getQueued();
    const serviceCategoryObservable = this.serviceCategoryRepository.getQueued();
    const serviceVersionObservable = this.serviceVersionRepository.getQueued();
    const serviceImageObservable = this.serviceImageRepository.getQueued();
  
    return forkJoin([
      articleObservable,
      serviceObservable,
      serviceCategoryObservable,
      serviceVersionObservable,
      serviceImageObservable
    ]).pipe(
      map(([articles, services, serviceCategories, serviceVersions, serviceImages]) => {
        const result: Postable[] = [...articles, ...services, ...serviceCategories, ...serviceVersions, ...serviceImages];
        return result.sort(function(a, b){
          if (a.publishDate.toString() > b.publishDate.toString()) { return -1; }
          if (a.publishDate.toString() < b.publishDate.toString()) { return 1; }
          return 0;
      });
      })
    );
  }

  getCount(): Observable<number> {
    const articleObservable = this.articleRepository.getQueuedCount();
    const serviceObservable = this.serviceRepository.getQueuedCount();
    const serviceCategoryObservable = this.serviceCategoryRepository.getQueuedCount();
    const serviceVersionObservable = this.serviceVersionRepository.getQueuedCount();
    const serviceImageObservable = this.serviceImageRepository.getQueuedCount();
  
    return forkJoin([
      articleObservable,
      serviceObservable,
      serviceCategoryObservable,
      serviceVersionObservable,
      serviceImageObservable
    ]).pipe(
      map(([articles, services, serviceCategories, serviceVersions, serviceImages]) => {
        const result: number = articles + services + serviceCategories + serviceVersions + serviceImages;
        return result;
      })
    );
  }
  
}
