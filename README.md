# CRDT-MD-Editor

[![License](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)

React Typescript CRDT based Collaborative Markdown Editor.

This app aims to show a collaborative text editing application using two eventual consitency backends: revision-based and CRDT-based.
This demo shows that with a revision based approach, the user
loses updates, either if updates are executed concurrently online, or if
multiple users edit the document offline. To have an adequate semantics, the
user needs to provide custom, non-trivial, code to merge the updates executed
by each user. With the CRDT-based backend, update convergence is available
out-of-the-box.

The current demo is implemented on top of PouchDB which offers replication and
offline support, but can be easily ported on other equivalent backends.
Later we will implement our backend without any third-party dependencies.

## Setup guide

0.**Requirements**

For the next steps, you will need the following software:

- Make sure you have the latest version of Node.js: [see official installation guide](https://nodejs.org/en/download/);
- The project uses Git to download some required dependencies: [follow the official install guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

1.**Install Project dependencies**

Go to project root directory and:

```shell
npm install
```

## Run the standalone application

After, following Setup Guide above, running the app is as easy as:

```shell
npm start
```

## (BETA/WIP) Use CRDT-MD-Editor React Component in another project

The React Component is built to be easily included in other web apps,
you may want to simply contain the editor inside your website or blog.

1.**Install the npm package to your React project**

```shell
npm install crdt-md-editor --save
```

2.**Choose the Editor instance you want to use**

CRDT-MD-Editor offers two possibilities,

- `CollabMarkdownEditor` Component: The lightweight version with minimal UI, and minimal JS backend. The easiest way to include a collaborative markdown textarea to your app;
- `RichCollabMarkdownEditor` Component: The complete version with Rich UI, buttons toolbar, configurable UI and backend API ported to the Edge App.

3.**Include the component in your .tsx and enjoy!**

```typescript
import './App.css';
import CollabMarkdownEditor from './Components/CollabMarkdownEditor';

function App() {
  return (
    <div className="App">
      <CollabMarkdownEditor />
    </div>
  );
}

export default App;
```

## (BETA/WIP) Build for server production-ready deployment

```shell
npm install

# and enable CORS in CouchDB using the fetched script
# If your CouchDB instance is password protected, use -u <user> -p <password> options:
node node_modules/add-cors-to-couchdb/bin.js

# Then build the app using:
REACT_APP_SERVERURL="http://${MY_SERVER_ADDR}:5984/${MY_DBNAME}" \
REACT_APP_OFFLINE_FIRST=any \
npm run build
# Note: REACT_APP_OFFLINE_FIRST=any Enables Service Workers to run application offline
```

The `build` directory will now contain a static JS you can deploy in your server.

## Replication support

If you want to run with cross-replica synchronization, just run a CouchDB Server, [see CouchDB's installation guide](https://docs.couchdb.org/en/stable/install/index.html)
