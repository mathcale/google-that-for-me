import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void | boolean {
	const disposable: vscode.Disposable = vscode.commands.registerCommand('extension.googleThatForMe', () => {
    const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

    if (typeof editor === 'undefined') return false;

    const selectedText: string = editor.document.getText(editor.selection);

    if (selectedText === '') {
      vscode.window.showWarningMessage('You need to select some text before running this command!');
      return false;
    }

    const selectionAsQS: string = selectedText.toLowerCase().trim().replace(/\s/gm, '+');
    const googleSearchUrl: string = `https://www.google.com/search?q=${selectionAsQS}`;

    vscode.env.openExternal(vscode.Uri.parse(googleSearchUrl));
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
