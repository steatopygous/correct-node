CLI that checks whether the current Node version matches the one in package.json or a .nvmrc file.

# Installation

npm install -g @steatopygous/correct-node

# Usage

Running

```
correct-node
```

will either exit with a zero status or exit with a status of -1 and print an error message.

The intended use is within scripts contained in the **package.json** of an application, to make sure that the current Node matches the one with which the application has been built and tested.  For example

```json
{
  "scripts": {
    "dev": "correct-node && webpack-dev-server"
  }
}
```

# What It Does

The current Node version is checked using the [semver](https://github.com/npm/node-semver) NPM module.

If the current folder contains a **package.json** file containing an **engines** specification for the node version, like

```json
{
  "engines": {
    "node": ">= 1.2.3 <4.5.6"
  }
}
```

that is used.  Otherwise, if there is a **.nvmrc** file it is used.

Having both is considered an error.

