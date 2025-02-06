import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { FiHeart, FiShoppingBag, FiUser } from "react-icons/fi";
import { MegaMenu } from "./MegaMenu";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { hideBackdrop, showBackdrop } from "@redux/slices/backdropSlice";
import { cn } from "@utils/cn";
import {
  saveUser,
  selectAccessToken,
  selectIsRemembered,
  selectUser,
} from "@redux/slices/authSlice";
import { IoMdClose } from "react-icons/io";
import { Tooltip } from "@mui/material";
import CartList from "@components/cartList/CartList";

import {
  selectCartTotalAmount,
  selectCartTotalItems,
} from "@redux/slices/cartSlice";
import { formatPrice } from "@utils/format";
import { authStorage } from "@utils/authStorage";
import { useGetUserQuery } from "@services/userApi";

const Header = () => {
  const user = useAppSelector(selectUser);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useAppDispatch();

  const [isOpenCartSidebar, setIsOpenCartSidebar] = useState(false);

  const toggleCartSidebar = () => setIsOpenCartSidebar(!isOpenCartSidebar);

  const totalCount = useAppSelector(selectCartTotalItems);
  const totalAmount = useAppSelector(selectCartTotalAmount);

  const accessToken =
    useAppSelector(selectAccessToken) ?? authStorage.getAuthData()?.accessToken;

  const { data, isSuccess, refetch } = useGetUserQuery(undefined, {
    skip: !accessToken,
  });

  useEffect(() => {
    if (accessToken) {
      refetch();
    }
  }, [accessToken, refetch]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(saveUser(data));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isOpenCartSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpenCartSidebar]);

  return (
    <header className="relative bg-white z-50">
      {/* Top Bar */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <svg
                width="94"
                height="23"
                viewBox="0 0 94 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.73931 18.9287H4.13467L3.56113 22.3807H0.357666L4.36349 0.619159H7.51049L11.5163 22.3807H8.31285L7.73931 18.9287ZM7.19549 15.509L5.9355 7.70725L4.67551 15.509H7.19549Z"
                  fill="black"
                ></path>
                <path
                  d="M24.9276 22.3807H21.7241L20.0927 13.6458H18.6633V22.3807H15.5163V0.619159H20.2651C21.6201 0.619159 22.7256 1.0551 23.5844 1.92376C24.5383 2.87637 25.0138 4.22295 25.0138 5.96349V8.29497C25.0138 10.0581 24.5383 11.4144 23.5844 12.367C23.4507 12.5123 23.2991 12.6479 23.1268 12.7706L24.9306 22.3775L24.9276 22.3807ZM21.8638 5.96672C21.8638 5.24015 21.7212 4.72347 21.4359 4.41347C21.1892 4.16482 20.797 4.03888 20.2621 4.03888H18.6603V10.226H20.2621C20.797 10.226 21.1863 10.1001 21.4359 9.85145C21.7212 9.56082 21.8638 9.04414 21.8638 8.2982V5.96672Z"
                  fill="black"
                ></path>
                <path
                  d="M32.1608 0.619159H29.0138V22.3807H32.1608V0.619159Z"
                  fill="black"
                ></path>
                <path
                  d="M40.9095 22.631C39.5366 22.631 38.4312 22.208 37.5902 21.3555C36.6363 20.3609 36.1608 19.0046 36.1608 17.2835V14.4547H39.3078V17.2835C39.3078 18.0294 39.4504 18.5493 39.7357 18.8367C39.9824 19.0853 40.3746 19.2113 40.9095 19.2113C41.4444 19.2113 41.8545 19.0853 42.0833 18.8367C42.3686 18.5687 42.5113 18.0488 42.5113 17.2835V15.9143C42.5113 14.9617 42.1576 14.1318 41.4534 13.4278C41.3018 13.2825 40.9006 13.0144 40.2528 12.6205C39.3554 12.1038 38.6986 11.6453 38.2796 11.2513C37.5931 10.5893 37.0672 9.83046 36.7076 8.98118C36.345 8.1319 36.1638 7.22126 36.1638 6.24604V5.71645C36.1638 3.99529 36.6392 2.63902 37.5931 1.64443C38.4312 0.795151 39.5396 0.368896 40.9125 0.368896C42.2854 0.368896 43.3909 0.795151 44.2319 1.64443C45.1858 2.63902 45.6612 3.99529 45.6612 5.71645V7.61199H42.5142V5.71645C42.5142 4.95113 42.3716 4.43123 42.0863 4.16321C41.8575 3.91456 41.4652 3.78862 40.9125 3.78862C40.3598 3.78862 39.9883 3.91456 39.7387 4.16321C39.4534 4.45384 39.3108 4.97051 39.3108 5.71645V6.24604C39.3108 7.19866 39.6644 8.01887 40.3687 8.70024C40.5589 8.86492 40.9303 9.11357 41.4831 9.44618C42.4756 10.0274 43.1621 10.5021 43.5424 10.8767C44.954 12.2459 45.6583 13.9219 45.6583 15.911V17.2802C45.6583 19.0014 45.1798 20.3577 44.2289 21.3522C43.3909 22.2015 42.2824 22.6278 40.9095 22.6278"
                  fill="black"
                ></path>
                <path
                  d="M59.2152 4.03888H56.0117V22.3807H52.8647V4.03888H49.6612V0.619159H59.2152V4.03888Z"
                  fill="black"
                ></path>
                <path
                  d="M66.3622 0.619159H63.2152V22.3807H66.3622V0.619159Z"
                  fill="black"
                ></path>
                <path
                  d="M80.145 22.3807H78.3144L73.5092 11.3433V22.3807H70.3622V0.619159H72.1927L76.998 11.6243V0.619159H80.145V22.3807Z"
                  fill="black"
                ></path>
                <path
                  d="M88.8937 22.6294C87.5208 22.6294 86.4153 22.2031 85.5743 21.3539C84.6204 20.3593 84.145 19.003 84.145 17.2818V5.71807C84.145 3.9969 84.6204 2.64064 85.5743 1.64605C86.4153 0.796767 87.5208 0.370512 88.8937 0.370512C90.2666 0.370512 91.3721 0.796767 92.2131 1.64605C93.167 2.64064 93.6424 3.9969 93.6424 5.71807V17.2818C93.6424 19.003 93.164 20.3593 92.2131 21.3539C91.3751 22.2031 90.2666 22.6294 88.8937 22.6294ZM88.8937 3.79024C88.3588 3.79024 87.9695 3.91617 87.7199 4.16482C87.4346 4.45545 87.292 4.97212 87.292 5.71807V17.2818C87.292 18.0278 87.4346 18.5445 87.7199 18.8351C87.9665 19.0837 88.3588 19.2097 88.8937 19.2097C89.4286 19.2097 89.8387 19.0837 90.0675 18.8351C90.3528 18.5671 90.4954 18.0472 90.4954 17.2818V5.71807C90.4954 4.95275 90.3528 4.43285 90.0675 4.16482C89.8387 3.91617 89.4464 3.79024 88.8937 3.79024Z"
                  fill="black"
                ></path>
              </svg>
            </Link>

            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium hover:text-gray-600">
                Home
              </Link>
              <Link
                to={"/collection"}
                className="static group py-6"
                onMouseEnter={() =>
                  dispatch(
                    showBackdrop({
                      isVisible: true,
                    })
                  )
                }
                onMouseLeave={() => {
                  dispatch(hideBackdrop());
                }}
              >
                <button className="text-sm font-medium hover:text-gray-600 flex items-center">
                  Shop
                  <svg
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <MegaMenu />
              </Link>
              <Link
                to="/our-story"
                className="text-sm font-medium hover:text-gray-600"
              >
                Our Story
              </Link>
              <Link
                to="/blog"
                className="text-sm font-medium hover:text-gray-600"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium hover:text-gray-600"
              >
                Contact Us
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Tooltip title="Tìm kiếm">
                  <div>
                    <CgSearch className="w-5 h-5" />
                  </div>
                </Tooltip>
              </button>

              {/* Wishlist */}
              <Link
                to="/user/wishlists"
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <Tooltip title="Yêu thích">
                  <div>
                    <FiHeart className="w-5 h-5" />
                  </div>
                </Tooltip>

                {user && user?.totalFavoriteProducts > 0 && (
                  <div className="absolute bg-black w-[9px] h-[9px] top-1 right-1 flex items-center justify-center rounded-full"></div>
                )}
              </Link>

              {/* Cart */}

              <div
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer relative"
                onClick={toggleCartSidebar}
              >
                <Tooltip title="Giỏ hàng">
                  <div>
                    <FiShoppingBag className="w-5 h-5" />
                  </div>
                </Tooltip>

                {totalCount > 0 && (
                  <div className="absolute bg-black w-[9px] h-[9px] top-1 right-1 flex items-center justify-center rounded-full"></div>
                )}
              </div>

              {/* Login */}
              {!user ? (
                <Link
                  to="/account/login"
                  className="hidden lg:block px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800"
                >
                  Login
                </Link>
              ) : (
                <Link
                  to="/user/profile"
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Tooltip title="Tài khoản">
                    <div>
                      <FiUser className="w-5 h-5" />
                    </div>
                  </Tooltip>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className={cn("fixed inset-0 z-50 bg-black bg-opacity-50")}>
          <div className="container mx-auto px-4 pt-20">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center border-b gap-1 pb-2 border-gray-200">
                <CgSearch className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full p-2 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="w-[40px] h-[40px] text-[30px] transition-all duration-300 flex items-center justify-center hover:bg-gray-100 rounded-full"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpenCartSidebar ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleCartSidebar}
      >
        <div
          className={`fixed top-0 right-0 h-full w-[85vw] md:w-[50vw] lg:w-[40vw] xl:w-[40vw] bg-white transform transition-transform duration-300 flex flex-col ${
            isOpenCartSidebar ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cart Sidebar Header */}
          <div className="flex-none flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-medium">Giỏ hàng</h2>
            <button
              onClick={toggleCartSidebar}
              className="p-2 text-2xl"
              aria-label="Close Cart Sidebar"
            >
              <IoMdClose />
            </button>
          </div>

          {/* Cart Sidebar Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
            <CartList />
          </div>

          {/* Cart Sidebar Actions */}
          <div className="flex-none p-4 bg-white border-t">
            <div className="flex items-center justify-between mb-4 py-2 font-semibold text-xl">
              <span>Tổng tiền</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex gap-4">
              <Link to={"/shopping-cart"} className="flex-1">
                <button
                  className="flex-1 py-3 px-4 border rounded-md text-center w-full h-full"
                  onClick={toggleCartSidebar}
                >
                  Xem giỏ hàng
                </button>
              </Link>
              <button
                className="flex-1 py-3 px-4 bg-black text-white rounded-md text-center"
                onClick={toggleCartSidebar}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
