import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./auctions/auction-list/auction-list')
                .then(m => m.AuctionListComponent)
    },
    {
        path: 'auctions/:id',
        loadComponent: () =>
            import('./auction-detail/auction-detail')
                .then(m => m.AuctionDetailComponent)
    },
    {
        path: 'auctions/create',
        loadComponent: () =>
            import('./auctions/auction-create/auction-create').then(m => m.AuctionCreateComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];