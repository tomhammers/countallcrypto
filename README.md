Anonymous cryptocurrency portfolio web app, with the main priority being privacy. www.countallcrypto.com

* No sign ups or registration.
* No tracking of any kind.
* Can save portfolio anonymously on server for convienience, only as a user opt in.

## Features:

* Supports more then 2000 crypto assets (application uses [CryptoCompare API](https://www.cryptocompare.com/))
* Portfolio is saved in Browser's cache, and should work offline (other then getting new prices off course).
* Import Ethereum address to automatically add Ethereum and ERC20 tokens to portfolio.
* Export and Import portfolios, useful when you need to clear the browser's cache or to import portfolio on other devices.
* Display Options allow user to hide balances / chart or switch the way assets are layed out.

## ToDo

* Mobile Optimizations.
* Vastly improve test coverage.
* About / Info / Contact etc pages.
* Improve styling and UI (any help?).
* Asset breakdowns: clicking / tapping on asset should give the user some nice data.
* Add more display options.
* Support more FIAT currencies.
* Support price data from other API's.

## Running the app locally

* Install the latest version of [NodeJS](https://nodejs.org/en/).
* Clone / download the repository.
* In root directory:

### `npm install`

### `npm run build-theme`

### `cd client`

### `npm install`

### `npm run build`

### `cd ..`

### `npm start`

(really should automate this)

If interested in development, run the development environment instead of running npm start:

### `npm run dev`
