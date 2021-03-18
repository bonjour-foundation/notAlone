import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements as deckGoCore } from
      '@deckdeckgo/core/dist/loader';
import { defineCustomElements as deckGoSlide } from
      '@deckdeckgo/slide-title/dist/loader';

deckGoCore(window);
deckGoSlide(window);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
