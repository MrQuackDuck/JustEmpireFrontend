import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { TranslateService } from './services/translate.service';
import * as CookieConsent from 'vanilla-cookieconsent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(public loadingService : LoadingService, private translateService : TranslateService) { }

  ngAfterViewInit(): void {
    let cookieConsentConfig = {        
        // consent was given
        onConsent: function () {},
    
        // user changed his/her preferences
        onChange: function () {},
    
        categories: {
            necessary: {
                enabled: true,  // this category is enabled by default
                readOnly: true  // this category cannot be disabled
            },
            analytics: {
                enabled: false,
                readOnly: false,
    
                // Delete specific cookies when the user opts-out of this category
                autoClear: {
                    cookies: [
                        { name: /^_ga/, },  // regex: match all cookies starting with '_ga'
                        { name: '_gid', },   // string: exact cookie name
                    ]
                }
            }
        },

        guiOptions: {
          consentModal: {
            layout: 'cloud' as CookieConsent.ConsentModalLayout,
            position: 'bottom right' as CookieConsent.ConsentModalPosition,
            flipButtons: false,
            equalWeightButtons: true
          },
          preferencesModal: {},
          
        },
    
        language: {
            default: 'en',
    
            translations: {
                en: {
                    consentModal: {
                        title: this.translateService.translate('WE_USE_COOKIES'),
                        description: this.translateService.translate('COOKIE_WARNING'),
                        acceptAllBtn: this.translateService.translate('ALLOW_COOKIES'),
                        acceptNecessaryBtn: this.translateService.translate('DENY'),
                        showPreferencesBtn: this.translateService.translate('MANAGE_INDIVIDUAL_PREFERENCES')
                    },
                    preferencesModal: {
                        title: this.translateService.translate('MANAGE_COOKIE_PREFERENCES'),
                        acceptAllBtn: this.translateService.translate('ACCEPT_ALL'),
                        acceptNecessaryBtn: this.translateService.translate('REJECT_ALL'),
                        savePreferencesBtn: this.translateService.translate('SAVE'),
                        closeIconLabel: this.translateService.translate('CLOSE_MODAL'),
                        sections: [
                            {
                                title: this.translateService.translate('STRICTLY_NECESSARY_COOKIES'),
                                description: this.translateService.translate('STRICTLY_NECESSARY_COOKIES_DESCRIPTION'),
    
                                //this field will generate a toggle linked to the 'necessary' category
                                linkedCategory: 'necessary'
                            },
                            {
                                title: this.translateService.translate('PERFORMANCE_AND_ANALYTICS'),
                                description: this.translateService.translate('PERFORMANCE_AND_ANALYTICS_DESCRIPTION'),
                                linkedCategory: 'analytics'
                            },
                            {
                                title: this.translateService.translate('MORE_INFORMATION'),
                                description: this.translateService.translate('MORE_INFORMATION_DESCRIPTION')
                            }
                        ]
                    }
                }
            }
        }
    }

    CookieConsent.run(cookieConsentConfig); 
  }

  ngOnInit() : void { }
}