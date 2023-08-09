// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const sha256 = require('js-sha256').sha256
const { v4: uuidv4 } = require('uuid');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "logtag" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('logtag.logTag', function () {
		// The code you place here will be executed every time your command is executed
		insertText(generateTag())
	});

	context.subscriptions.push(disposable);
}

function generateTag() {
	return `<${sha256(uuidv4()).slice(0, 8)}>`
}

function insertText(text) {
  var editor = vscode.window.activeTextEditor;
  editor.edit(
    edit => editor.selections.forEach(
      selection => {
        edit.delete(selection);
        edit.insert(selection.start, text);
      }
    )
  );
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
