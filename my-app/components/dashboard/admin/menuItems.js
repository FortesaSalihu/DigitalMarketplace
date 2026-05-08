// data/menuItems.js
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RateReviewIcon from "@mui/icons-material/RateReview";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ShareIcon from "@mui/icons-material/Share";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

export const menuItems = [
  {
    id: "home",
    label: "Home",
    icon: <HomeIcon />,
    path: "/dashboard/admin",
  },
  {
    id: "categories",
    label: "Manage Categories",
    icon: <CategoryIcon />,

    children: [
      //  { label: "Create", path: "/dashboard/admin/categories/create" },
      { label: "Categories", path: "/dashboard/admin/categories/list" },
      { label: "SubCategories", path: "/dashboard/admin/subcategories/list" },
    ],
  },
  {
    id: "orders",
    label: "Manage Orders",
    icon: <ShoppingCartIcon />,

    children: [{ label: "Orders", path: "/dashboard/admin/orders" }],
  },
  {
    id: "reviews",
    label: "Product Review",
    icon: <RateReviewIcon />,
    // path: "/dashboard/admin/reviews",

    children: [
      { label: "Pending", path: "/dashboard/admin/item-reviews/pending" },
      { label: "Approved", path: "/dashboard/admin/item-reviews/approved" },
      {
        label: "Soft Rejected",
        path: "/dashboard/admin/item-reviews/soft_rejected",
      },
      {
        label: "Hard Rejected",
        path: "/dashboard/admin/item-reviews/hard_rejected",
      },
      {
        label: "Resubmitted",
        path: "/dashboard/admin/item-reviews/resubmitted",
      },
    ],
  },
  {
    id: "kyc",
    label: "KYC",
    icon: <BadgeIcon />,

    children: [
      { label: "Kyc", path: "/dashboard/admin/kyc" },
      { label: "Kyc Request", path: "/dashboard/admin/kyc-request" },
    ],
  },
  {
    id: "withdrawals",
    label: "Withdraw Requests",
    icon: <AccountBalanceWalletIcon />,
    children: [
      { label: "Pending", path: "/dashboard/admin/withdrawals/pending" },
      { label: "Completed", path: "/dashboard/admin/withdrawals/completed" },
    ],
  },
  {
    id: "withdraw-methods",
    label: "Withdraw Methods",
    icon: <CreditCardIcon />,
    path: "/dashboard/admin/withdraw-methods/list",
  },

  {
    id: "Featured Creater",
    label: "Featured Creater",
    icon: <ViewModuleIcon />,
    path: "/dashboard/admin/featured-creater",
  },

  {
    id: "featured product",
    label: "Featured Product",
    icon: <BadgeIcon />,
    path: "/dashboard/admin/featured-product",
  },

  {
    id: "highlight product",
    label: "HighlightProduct",
    icon: <ViewModuleIcon />,
    path: "/dashboard/admin/highlight-product",
  },

  {
    id: "sections",
    label: "Sections",
    icon: <ViewModuleIcon />,
    path: "/dashboard/admin/sections",
  },
  {
    id: "social-links",
    label: "Social Links",
    icon: <ShareIcon />,
    path: "/dashboard/admin/social-links",
  },
  {
    id: "banner",
    label: "Banner",
    icon: <WallpaperIcon />,
    path: "/dashboard/admin/banner",
  },
  {
    id: "pages",
    label: "Page Builder",
    icon: <WebAssetIcon />,
    children: [
      { label: "All Pages", path: "/dashboard/admin/pages" },
      { label: "Create Page", path: "/dashboard/admin/pages/create" },
    ],
  },
  {
    id: "subscribers",
    label: "Subscribers",
    icon: <PeopleIcon />,
    path: "/dashboard/admin/subscribers",
  },
  {
    id: "access",
    label: "Access Management",
    icon: <SecurityIcon />,
    children: [{ label: "Roles", path: "/dashboard/admin/access/roles" }],
  },
  {
    id: "payment",
    label: "Payment Setting",
    icon: <PaymentIcon />,
    path: "/dashboard/admin/payment-settings",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    children: [{ label: "Profile", path: "/dashboard/admin/settings/profile" }],
  },
  {
    id: "wipe-database",
    label: "Wipe Database",
    icon: <DeleteSweepIcon />,
    path: "/dashboard/admin/wipe-database",
    dangerous: true,
  },

  {
    id: "logout",
    label: "Logout",
    icon: <PaymentIcon />,
    path: "/dashboard/admin/logout",
  },
];
