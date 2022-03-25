import PhoneIcon from '@heroicons/react/solid/PhoneIcon';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="h-full bg-gray-100">
      <Head />
      <body className="h-full">
        <div className="min-h-full">
          <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex items-center flex-shrink-0 text-white uppercase">
                    <PhoneIcon className="h-8 w-8 " />
                    <h1 className="p-5">google-libphonenumber</h1>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {/*<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->*/}
                      <a
                        href="#"
                        className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                        aria-current="page"
                      >
                        isValid
                      </a>

                      <a
                        href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Parse
                      </a>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6"></div>
                </div>
              </div>
            </div>
          </nav>

          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">Examples</h1>
            </div>
          </header>
          <main>
            <Main />
          </main>
        </div>

        <NextScript />
      </body>
    </Html>
  );
}
