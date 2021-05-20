export default (draft, action) => {
  switch (action.type) {
    case 'login':
      draft.isLoggedIn = true;
      draft.fetchingUserData = false;
      draft.user = action.payload;
      return;

    case 'logout':
      draft.logoutReqCount += 1;
      return;

    case 'logoutSuccess':
      draft.isLoggedIn = false;
      draft.fetchingUserData = false;
      draft.user = {
        wishlist: [],
        cart: []
      };
      return;

    case 'addItemToWishlist':
      draft.addWishlistItemId = action.payload;
      return;

    case 'removeItemFromWishlist':
      draft.removeWishlistItemId = action.payload;
      return;

    case 'updateWishlist':
      draft.user.wishlist = action.payload;
      return;

    case 'updateCart':
      draft.user.cart = action.payload;
      return;

    case 'openSideNav':
      draft.isSideNavOpen = true;
      return;

    case 'closeSideNav':
      draft.isSideNavOpen = false;
      return;

    case 'openSearch':
      draft.isSearchOpen = true;
      return;

    case 'closeSearch':
      draft.isSearchOpen = false;
      return;

    case 'searching':
      draft.searching = true;
      return;

    case 'appLoaded':
      draft.isLoading = false;
      return;

    case 'processing':
      draft.isProcessing = action.payload;
      return;

    default:
      return draft;
  }
};
