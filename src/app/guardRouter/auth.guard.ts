import { CanActivateFn, Router } from "@angular/router";
import {  inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);

    return new Promise(resolve => {
            if (true) {
                console.log("dentro do auth.guard");
                resolve(true);
            } else {
                router.navigate(['/']);
                resolve(false)
            }
        })
}