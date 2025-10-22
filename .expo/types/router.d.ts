/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(protected)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(public)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(public)'}/sign-up` | `/sign-up`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(protected)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(public)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(public)'}/sign-up` | `/sign-up`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(protected)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(public)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(public)'}/sign-up${`?${string}` | `#${string}` | ''}` | `/sign-up${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(protected)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(public)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(public)'}/sign-up` | `/sign-up`; params?: Router.UnknownInputParams; };
    }
  }
}
