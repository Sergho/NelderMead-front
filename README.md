# NelderMead App

**NelderMead** is a desktop application on NodeJS that allows analyzing an n-dimensional function and finding its local extremum.  
The correct operation of the application is ensured by the use of the Nelder-Mead algorithm, which is implemented as a separate [project](https://github.com/sdanils/NelderMead_dll) in C++ and linked to the current repository as a dynamic library (`.so` or `.dll`).

## Dependencies

- cmake - `3.10+`
- NodeJS - `18.20.4+`
- npm - `10.7.0+`

## How to run

There are 3 ways to launch application:

- **Development mode** is used to quickly launch app and check its behavior in browser during development process
- **Production mode** is used to launch desktop app with full functionality. It can be used as end use case, but it will be dependent from current environment
- **Running as application** is a way to compile project and use it as native OS application
  Nevertheless, there are common actions for all ways of running:

### Install dependencies

Run a command to install all npm dependencies:

```bash
npm install
```

### Building backend

First of all build backend using npm script:

```bash
npm run backend:build
```

### Development mode

If you'd like to run NelderMead app in development mode, you can use command:

```bash
npm run dev
```

It will launch server and client parts of application
Then you can follow the link given in output (default is `http://localhost:3000`) and use app

### Production mode

If you'd like to run NelderMead app in production mode, you firstly have to build it:

```bash
npm run build
```

And then launch the builded version:

```bash
npm run launch
```

It will also launch server and client parts of application, but it all will be wrapped into desktop application

### As application

If you'd like to run NelderMead app as application, you also have to build it:

```bash
npm run build
```

But instead of launching it you should compile it in snap package

```bash
npm run compile
```

After that, you will have a completed snap package at `./dist/*.snap`
Finally, install this package on your system with `--dangerous` flag, for example:

```bash
sudo snap install nelder-mead_1.0.0_amd64.snap --dangerous
```

> It is planned to expand package system and OS support list

## Also

If you are interested, also check similar to NelderMead project:

- [NelderMead_dll](https://github.com/sdanils/NelderMead_dll) - NelderMead backend on C++
- [TestNelderMead](https://github.com/SashimiYURL/TestNelderMead) - NelderMead testing app on C#
