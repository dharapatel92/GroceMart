import { Routes } from "@angular/router";
import { Error404Component } from "./errors/error404/error404.component";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "product" },
  {
    path: `auth/login`,
    loadComponent: () =>
      import("./auth/components/login/login.component").then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: `auth/register`,
    loadComponent: () =>
      import("./auth/components/register/register.component").then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: `auth/forgot-password`,
    loadComponent: () =>
      import(
        "./auth/components/forgot-password/forgot-password.component"
      ).then((m) => m.ForgotPasswordComponent),
  },
  {
    path: `auth/reset-password/:email`,
    loadComponent: () =>
      import("./auth/components/reset-password/reset-password.component").then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: "product",
    loadComponent: () =>
      import("./layout/app.layout.component").then((m) => m.AppLayoutComponent),
    children: [
      {
        path: ``,
        loadComponent: () =>
          import("./product/product-list/product-list.component").then(
            (m) => m.ProductListComponent
          ),
      },
      {
        path: `product-view/:id`,
        loadComponent: () =>
          import("./product/product-view/product-view.component").then(
            (m) => m.ProductViewComponent
          ),
      },
      {
        path: `product-new`,
        loadComponent: () =>
          import(
            "./product/product-add-update/product-add-update.component"
          ).then((m) => m.ProductAddUpdateComponent),
      },
      {
        path: `product-edit/:id`,
        loadComponent: () =>
          import(
            "./product/product-add-update/product-add-update.component"
          ).then((m) => m.ProductAddUpdateComponent),
      },
      {
        path: `checkout`,
        loadComponent: () =>
          import(
            "./product/checkout/checkout.component"
          ).then((m) => m.CheckoutComponent),
      },
      {
        path: `order-history`,
        loadComponent: () =>
          import(
            "./product/order-history/order-history.component"
          ).then((m) => m.OrderHistoryComponent),
      },
      {
        path: `order-summary`,
        loadComponent: () =>
          import(
            "./product/order-summary/order-summary.component"
          ).then((m) => m.OrderSummaryComponent),
      },
    ],
  },
  {
    path: "categories",
    loadComponent: () =>
      import("./layout/app.layout.component").then((m) => m.AppLayoutComponent),
    children: [
      {
        path: ``,
        loadComponent: () =>
          import("./category/category.component").then(
            (m) => m.CategoryComponent
          ),
      },
      {
        path: `add-category`,
        loadComponent: () =>
          import("./category/add-category/add-category.component").then(
            (m) => m.AddCategoryComponent
          ),
      },
      {
        path: `edit-category/:id`,
        loadComponent: () =>
          import("./category/add-category/add-category.component").then(
            (m) => m.AddCategoryComponent
          ),
      },
    ],
  },
  {
    path: "users",
    loadComponent: () =>
      import("./layout/app.layout.component").then((m) => m.AppLayoutComponent),
    children: [
      {
        path: ``,
        loadComponent: () =>
          import("./users/users.component").then((m) => m.UsersComponent),
      },
      {
        path: `edit-user/:userId`,
        loadComponent: () =>
          import("./users/add-users/add-users.component").then(
            (m) => m.AddUsersComponent
          ),
      },
    ],
  },
  {
    path: "profile",
    loadComponent: () =>
      import("./layout/app.layout.component").then((m) => m.AppLayoutComponent),
    children: [
      {
        path: ``,
        loadComponent: () =>
          import("./profile/profile.component").then((m) => m.ProfileComponent),
      },
    ],
  },
  {
    path: "contact-us",
    loadComponent: () =>
      import("./layout/app.layout.component").then((m) => m.AppLayoutComponent),
    children: [
      {
        path: ``,
        loadComponent: () =>
          import("./contact-us/contact-us.component").then(
            (m) => m.ContactUsComponent
          ),
      },
    ],
  },
  {
    path: "about-us",
    loadComponent: () =>
      import("./layout/app.layout.component").then((m) => m.AppLayoutComponent),
    children: [
      {
        path: ``,
        loadComponent: () =>
          import("./about-us/about-us.component").then(
            (m) => m.AboutUsComponent
          ),
      },
    ],
  },
  { path: "**", component: Error404Component },
];
