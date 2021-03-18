export class Resources {

    static get Constants(): any {
        return {
            SHARE: {
                VALIDITY: 4320, // 60m * 24h * 3d = 4320 minutes
                HASH: {
                    SALT: 'Bonjour.help NotAlonee$',
                    LENGTH: 4,
                    ALPHABET: 'abcdefghijklmnpqrstuvwxyz123456789'
                }
            },
            CIRCLE: {
                MAX_CONNECTIONS: 3,
                REMINDER: {
                    DEFAULT_TIME: 10,
                    DEFAULT_NEXT_DAY: 1,
                    DEFAULT_ALARM_AT: 30
                }
            },
            GOOGLE: {
                ANALYTICS: {
                    TRACKER: {
                        VIEW: {
                            HOME: 'home',
                            ABOUT: 'about',
                            CREATE_CIRCLE: 'create_circle',
                            EDIT_CIRCLE: 'edit_circle',
                            SHARE_CIRCLE: 'share_circle',
                            CREATE_USER: 'create_user',
                            INTRO: 'intro',
                            EMERGENCY: 'emergency',
                            DONE: 'done',
                            SIGN_IN: 'sign_in',
                            SCHEDULE: 'schedule',
                            SETTINGS: 'settings'
                        },
                        EVENT: {
                            CATEGORY: {
                                INTRO: 'intro',
                                SHARE: 'share',
                                SETTINGS: 'settings'
                            },
                            ACTION: {
                                NAVIGATE: 'navigate',
                                SKIP: 'skip',
                                SHARE_LINK: 'share_link',
                                SIGN_OUT: 'sign_out',
                                DELETE_ACCOUNT: 'delete_account'
                            }
                        }
                    }
                }
            },
            SENTRY: {
                DSN: 'https://0ded18e8a1c840479171f3e44b9a837c@sentry.io/5178282'
            },
            BRANCH: {
                URL: 'https://notalone.app.link/?$invite='
            }
        };
    }

}
