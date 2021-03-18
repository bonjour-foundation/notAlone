import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class IntroService {

    constructor(private storage: Storage) {
    }

    introShown(): Promise<boolean> {
        return this.storage.get('bonjour_circle_intro_shown');
    }

    setIntroShown(): Promise<boolean> {
        return this.storage.set('bonjour_circle_intro_shown', true);
    }

    introTipsStateShown(): Promise<boolean> {
        return this.storage.get('bonjour_circle_intro_tips_state_shown');
    }

    setIntroTipsStateShown(): Promise<boolean> {
        return this.storage.set('bonjour_circle_intro_tips_state_shown', true);
    }

    introTipsCreateCircleShown(): Promise<boolean> {
        return this.storage.get('bonjour_circle_intro_tips_create_circle_shown');
    }

    setIntroTipsCreateCircleShown(): Promise<boolean> {
        return this.storage.set('bonjour_circle_intro_tips_create_circle_shown', true);
    }

    introTipsEditCircleShown(): Promise<boolean> {
        return this.storage.get('bonjour_circle_intro_tips_edit_circle_shown');
    }

    setIntroTipsEditCircleShown(): Promise<boolean> {
        return this.storage.set('bonjour_circle_intro_tips_edit_circle_shown', true);
    }
}
