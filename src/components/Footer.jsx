import logo from "../assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto py-4 px-4 md:py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href=""
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-12" alt="CiptaKerja Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              CiptaKerja
            </span>
          </a>
          <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="" className="hover:underline">
            CiptaKerja™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};